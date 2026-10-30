import { useEffect, useRef } from 'react';
import { createAngelRenderer } from '../angel.js';

const AUTO_SPEED = 0.45; // radians per second
const FRAME_MS = 1000 / 30;

/* Winged figure drawn in ASCII, rotating in 3D. Drag to spin it. */
export default function AsciiAngel({ label, hint }) {
  const figureRef = useRef(null);
  const preRef = useRef(null);

  useEffect(() => {
    const figure = figureRef.current;
    const pre = preRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Fewer, larger characters on narrow screens.
    const narrow = window.matchMedia('(max-width: 560px)');
    let render;

    let angle = 0; // starts facing front, exactly as in the reference
    let spin = 0; // extra angular velocity from dragging, decays over time
    let dragging = false;
    let lastX = 0;
    let visible = true;
    let raf = 0;
    let last = performance.now();
    let elapsed = 0;

    const draw = () => { pre.textContent = render(angle, reduceMotion ? 0 : Math.sin(elapsed * 1.4) * 0.025); };
    const setup = () => {
      const cols = narrow.matches ? 72 : 100;
      render = createAngelRenderer(cols, Math.round(cols * 0.78));
      pre.style.setProperty('--cols', cols);
      draw();
    };
    setup();
    narrow.addEventListener('change', setup);

    const tick = now => {
      raf = requestAnimationFrame(tick);
      const dt = now - last;
      if (dt < FRAME_MS) return;
      last = now;
      if (!visible || dragging) return;
      const seconds = Math.min(dt, 100) / 1000;
      elapsed += seconds;
      angle += (AUTO_SPEED + spin) * seconds;
      spin *= Math.pow(0.12, seconds);
      draw();
    };
    if (!reduceMotion) raf = requestAnimationFrame(tick);

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; })
      : null;
    observer?.observe(figure);

    const onDown = event => {
      dragging = true;
      lastX = event.clientX;
      spin = 0;
      figure.setPointerCapture(event.pointerId);
    };
    const onMove = event => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      lastX = event.clientX;
      angle += dx * 0.012;
      spin = dx * 0.9;
      draw();
    };
    const onUp = () => { dragging = false; };
    figure.addEventListener('pointerdown', onDown);
    figure.addEventListener('pointermove', onMove);
    figure.addEventListener('pointerup', onUp);
    figure.addEventListener('pointercancel', onUp);

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      narrow.removeEventListener('change', setup);
      figure.removeEventListener('pointerdown', onDown);
      figure.removeEventListener('pointermove', onMove);
      figure.removeEventListener('pointerup', onUp);
      figure.removeEventListener('pointercancel', onUp);
    };
  }, []);

  return (
    <figure className="ascii ascii-angel" ref={figureRef} role="img" aria-label={label}>
      <pre ref={preRef} aria-hidden="true"></pre>
      <figcaption className="ascii-hint" aria-hidden="true">↔ {hint}</figcaption>
    </figure>
  );
}
