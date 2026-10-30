// The winged figure from the design reference, lifted into 3D and rendered as
// ASCII with a z-buffer and Lambert shading (in the spirit of donut.c).
//
// The reference's glyph density (angel-map.js) gives the silhouette and the
// feather texture. The silhouette is "inflated" into a volume: thick along the
// body, thin on the wings, which also sweep backwards.

import { MAP_DATA, MAP_H, MAP_W } from './angel-map.js';

const RAMP = ' .,:;~^!?7JY5PGB#&@';
const LIGHT = normalize([-0.35, 0.4, 0.85]);

// Body axis traced on the map (pixels), head to the tip of the robe.
const AXIS = [[100, 66], [104, 110], [110, 145], [103, 187], [83, 233], [63, 262]];
const AXIS_X = 100;
const UNIT = MAP_H / 2; // map pixels per model unit

function normalize([x, y, z]) {
  const l = Math.hypot(x, y, z) || 1;
  return [x / l, y / l, z / l];
}

function seededRandom(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function distanceToAxis(x, y) {
  let best = Infinity;
  for (let i = 0; i < AXIS.length - 1; i++) {
    const [ax, ay] = AXIS[i];
    const [bx, by] = AXIS[i + 1];
    const dx = bx - ax, dy = by - ay;
    const t = Math.min(1, Math.max(0, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)));
    best = Math.min(best, Math.hypot(x - ax - t * dx, y - ay - t * dy));
  }
  return best;
}

export function decodeMap() {
  const raw = atob(MAP_DATA);
  const density = new Float32Array(raw.length);
  for (let i = 0; i < raw.length; i++) density[i] = raw.charCodeAt(i) / 255;
  return density;
}

// Two-pass chamfer distance from each inside cell to the silhouette edge.
function distanceField(mask) {
  const dist = new Float32Array(MAP_W * MAP_H);
  for (let i = 0; i < dist.length; i++) dist[i] = mask[i] ? 1e6 : 0;
  const at = (x, y) => (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H ? 0 : dist[y * MAP_W + x]);
  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      const i = y * MAP_W + x;
      if (!dist[i]) continue;
      dist[i] = Math.min(dist[i], at(x - 1, y) + 1, at(x, y - 1) + 1, at(x - 1, y - 1) + 1.414, at(x + 1, y - 1) + 1.414);
    }
  }
  for (let y = MAP_H - 1; y >= 0; y--) {
    for (let x = MAP_W - 1; x >= 0; x--) {
      const i = y * MAP_W + x;
      if (!dist[i]) continue;
      dist[i] = Math.min(dist[i], at(x + 1, y) + 1, at(x, y + 1) + 1, at(x + 1, y + 1) + 1.414, at(x - 1, y + 1) + 1.414);
    }
  }
  return dist;
}

function buildAngel() {
  const density = decodeMap();
  const mask = density.map(v => (v > 0.07 ? 1 : 0));
  const dist = distanceField(mask);

  // Front and back surfaces as height fields over the map.
  const front = new Float32Array(MAP_W * MAP_H);
  const back = new Float32Array(MAP_W * MAP_H);
  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      const i = y * MAP_W + x;
      const fromAxis = distanceToAxis(x, y);
      const bodyness = 1 - smoothstep(12, 30, fromAxis);
      const thickness = (0.26 + 0.74 * bodyness) * 0.026 * Math.sqrt(dist[i]);
      const sweep = -0.55 * Math.pow(smoothstep(10, 95, fromAxis), 1.4) * (y < 160 ? 1 : 0.4);
      const sway = 0.12 * Math.sin((y / MAP_H) * Math.PI * 1.6);
      front[i] = sweep + sway + thickness;
      back[i] = sweep + sway - thickness;
    }
  }

  const pos = [];
  const nrm = [];
  const albedo = [];
  const solidity = [];
  const rand = seededRandom(3);
  const slope = (field, x, y) => {
    const xl = Math.max(0, x - 1), xr = Math.min(MAP_W - 1, x + 1);
    const yu = Math.max(0, y - 1), yd = Math.min(MAP_H - 1, y + 1);
    const dzdx = (field[y * MAP_W + xr] - field[y * MAP_W + xl]) / ((xr - xl) / UNIT);
    const dzdy = (field[yu * MAP_W + x] - field[yd * MAP_W + x]) / ((yd - yu) / UNIT); // model Y points up
    return [dzdx, dzdy];
  };

  for (let y = 0; y < MAP_H; y++) {
    for (let x = 0; x < MAP_W; x++) {
      const i = y * MAP_W + x;
      if (!mask[i]) continue;
      const tone = density[i];
      const solid = Math.min(1, tone * 3.2);
      // Two jittered samples per cell keep the surface dense when seen edge-on.
      for (let s = 0; s < 2; s++) {
        const X = (x + rand() - 0.5 - AXIS_X) / UNIT;
        const Y = (UNIT - (y + rand() - 0.5)) / UNIT;
        const [fx, fy] = slope(front, x, y);
        const [bx, by] = slope(back, x, y);
        pos.push(X, Y, front[i]); nrm.push(...normalize([-fx, -fy, 1])); albedo.push(tone); solidity.push(solid);
        pos.push(X, Y, back[i]); nrm.push(...normalize([bx, by, -1])); albedo.push(tone); solidity.push(solid);
      }
      // Fill the rim between both surfaces so the side view stays closed.
      const gap = front[i] - back[i];
      if (dist[i] < 2.5 && gap > 0.012) {
        const steps = Math.ceil(gap / 0.012);
        for (let k = 1; k < steps; k++) {
          const X = (x - AXIS_X) / UNIT;
          const Y = (UNIT - y) / UNIT;
          const [fx, fy] = slope(front, x, y);
          pos.push(X, Y, back[i] + (gap * k) / steps); nrm.push(...normalize([-fx, -fy, 0.15])); albedo.push(tone); solidity.push(solid);
        }
      }
    }
  }

  return {
    pos: Float32Array.from(pos),
    nrm: Float32Array.from(nrm),
    albedo: Float32Array.from(albedo),
    solidity: Float32Array.from(solidity),
    count: albedo.length,
  };
}

let cachedModel = null;

export function createAngelRenderer(cols, rows) {
  const model = cachedModel ?? (cachedModel = buildAngel());
  const { pos, nrm, albedo, solidity, count } = model;
  const depth = new Float32Array(cols * rows);
  const shade = new Float32Array(cols * rows);
  const out = new Uint16Array(rows * (cols + 1));
  const codes = Array.from(RAMP, ch => ch.charCodeAt(0));
  const rand = seededRandom(7);
  const cellNoise = Float32Array.from({ length: cols * rows }, rand);
  const scale = rows / 2.1;
  const camera = 5;

  return function render(angle, lift = 0) {
    depth.fill(-Infinity);
    const ca = Math.cos(angle);
    const sa = Math.sin(angle);
    for (let i = 0; i < count; i++) {
      const k = i * 3;
      const x = pos[k], y = pos[k + 1], z = pos[k + 2];
      const x1 = x * ca + z * sa;
      const z1 = -x * sa + z * ca;
      const f = camera / (camera - z1);
      const col = Math.round(cols / 2 + (x1 * f * scale) / 0.6);
      const row = Math.round(rows / 2 - (y + lift) * f * scale);
      if (col < 0 || col >= cols || row < 0 || row >= rows) continue;
      const cell = row * cols + col;
      if (z1 <= depth[cell] || solidity[i] < cellNoise[cell]) continue;
      const nx = nrm[k], ny = nrm[k + 1], nz = nrm[k + 2];
      const lambert = Math.max(0, (nx * ca + nz * sa) * LIGHT[0] + ny * LIGHT[1] + (-nx * sa + nz * ca) * LIGHT[2]);
      depth[cell] = z1;
      shade[cell] = Math.min(1, Math.pow(albedo[i], 1.1) * 1.45 * (0.35 + 0.75 * lambert));
    }
    let o = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = r * cols + c;
        out[o++] = depth[cell] === -Infinity ? 32 : codes[1 + Math.min(codes.length - 2, Math.round(shade[cell] * (codes.length - 1.5)))];
      }
      out[o++] = 10;
    }
    return String.fromCharCode.apply(null, out);
  };
}
