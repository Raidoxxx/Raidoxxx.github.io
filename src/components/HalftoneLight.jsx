import { useEffect, useRef } from 'react';

const CELL = 7; // halftone screen pitch, in CSS pixels
const FPS = 12;
const COLOR = '#f3eee2';

// Beams fanning out from the light toward the lower left: angle (deg, 0 = right,
// 90 = down), half-width (deg), strength, reach (in light radii).
const BEAMS = [
  [150, 1.5, 0.95, 1.7],
  [161, 0.8, 0.6, 1.3],
  [141, 2.4, 0.55, 1.15],
  [129, 1.1, 0.5, 1.05],
  [172, 1.0, 0.42, 0.95],
  [116, 2.8, 0.36, 0.85],
  [102, 1.3, 0.4, 0.9],
];

function hash(i) {
  const x = Math.sin(i * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

/* A sun in the top-right corner drawn as a halftone screen: each dot grows
   with the light intensity under it, like the printed reference. */
export default function HalftoneLight() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    let last = 0;
    let visible = true;

    const draw = time => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = COLOR;
      const sx = width + 30; // just past the top-right corner
      const sy = -30;
      const radius = Math.min(Math.max(width * 0.55, 320), 760);
      const t = time / 1000;
      const beams = BEAMS.map(([angle, spread, strength, reach], i) => [
        ((angle + Math.sin(t * 0.35 + i) * 0.6) * Math.PI) / 180,
        (spread * Math.PI) / 180,
        strength * (0.82 + 0.18 * Math.sin(t * 0.8 + i * 1.7)),
        reach,
      ]);
      const cols = Math.ceil(width / CELL);
      const rows = Math.ceil(height / CELL);
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        const cy = r * CELL + CELL / 2;
        for (let c = 0; c < cols; c++) {
          const cx = c * CELL + CELL / 2;
          const dx = cx - sx;
          const dy = cy - sy;
          const d = Math.hypot(dx, dy) / radius;
          if (d > 1.75) continue;
          let light = 1.4 * Math.exp(-((d / 0.24) ** 2)) + 0.32 * Math.exp(-((d / 0.42) ** 1.8));
          const theta = Math.atan2(dy, dx);
          for (const [angle, spread, strength, reach] of beams) {
            const off = (theta - angle) / spread;
            if (off > -3 && off < 3) light += 0.7 * strength * Math.exp(-off * off) * Math.exp(-d / reach);
          }
          light *= 0.75 + 0.5 * hash(r * 977 + c); // paper grain
          if (light < 0.1) continue;
          const dot = (CELL / 2) * 1.3 * Math.sqrt(Math.min(1, light));
          if (dot < 0.45) continue;
          ctx.moveTo(cx + dot, cy);
          ctx.arc(cx, cy, dot, 0, Math.PI * 2);
        }
      }
      ctx.fill();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const tick = now => {
      raf = requestAnimationFrame(tick);
      if (!visible || now - last < 1000 / FPS) return;
      last = now;
      draw(now);
    };
    if (!reduceMotion) raf = requestAnimationFrame(tick);

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; })
      : null;
    observer?.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      observer?.disconnect();
    };
  }, []);

  return <canvas className="hero-light" ref={canvasRef} aria-hidden="true"></canvas>;
}
