import { useEffect, useRef } from 'react';
import { decodeMap } from '../angel.js';
import { MAP_H, MAP_W } from '../angel-map.js';

const CELL = 5; // halftone screen pitch, in CSS pixels
const COLOR = '#f3eee2';

/* Static halftone print of the angel, drawn once (and again on resize). */
export default function HalftoneAngel({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const density = decodeMap();
    const sample = (x, y) => {
      // Bilinear lookup in the density map.
      const fx = Math.min(MAP_W - 1.001, Math.max(0, x));
      const fy = Math.min(MAP_H - 1.001, Math.max(0, y));
      const x0 = Math.floor(fx), y0 = Math.floor(fy);
      const tx = fx - x0, ty = fy - y0;
      const i = y0 * MAP_W + x0;
      const top = density[i] * (1 - tx) + density[i + 1] * tx;
      const bottom = density[i + MAP_W] * (1 - tx) + density[i + MAP_W + 1] * tx;
      return top * (1 - ty) + bottom * ty;
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = COLOR;
      ctx.beginPath();
      const scale = MAP_W / rect.width;
      for (let cy = CELL / 2; cy < rect.height; cy += CELL) {
        for (let cx = CELL / 2; cx < rect.width; cx += CELL) {
          const tone = Math.min(1, sample(cx * scale, cy * scale) * 1.35);
          const dot = (CELL / 2) * 1.25 * Math.sqrt(tone);
          if (dot < 0.4) continue;
          ctx.moveTo(cx + dot, cy);
          ctx.arc(cx, cy, dot, 0, Math.PI * 2);
        }
      }
      ctx.fill();
    };

    draw();
    const resizeObserver = new ResizeObserver(draw);
    resizeObserver.observe(canvas);
    return () => resizeObserver.disconnect();
  }, []);

  return <canvas className={className} ref={canvasRef} aria-hidden="true" style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}></canvas>;
}
