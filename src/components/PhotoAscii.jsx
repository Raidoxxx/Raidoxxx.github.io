import { useEffect, useRef } from 'react';
import { useSite } from '../SiteContext.jsx';

const CELL_WIDTH = 6;
const CELL_HEIGHT = 10;
const GLYPHS = ' .:-=+*#%@';
// The restored asset includes transparent headroom; match the CSS bottom crop.
const SOURCE_TOP = 150;

export default function PhotoAscii() {
  const { t, theme } = useSite();
  const frameRef = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    const image = imageRef.current;
    const canvas = canvasRef.current;
    const stage = frame.closest('.hero-stage');
    const context = canvas.getContext('2d');
    if (!context) return;

    const base = document.createElement('canvas');
    const ascii = document.createElement('canvas');
    const reveal = document.createElement('canvas');
    const sampler = document.createElement('canvas');
    const baseContext = base.getContext('2d');
    const asciiContext = ascii.getContext('2d');
    const revealContext = reveal.getContext('2d');
    const sampleContext = sampler.getContext('2d', { willReadFrequently: true });
    if (!baseContext || !asciiContext || !revealContext || !sampleContext) return;

    let width = 0;
    let height = 0;
    let samples;
    let pointer = null;
    let animation = 0;
    let ready = false;
    const hover = window.matchMedia('(hover: hover) and (pointer: fine)');

    const draw = () => {
      animation = 0;
      if (!ready) return;
      // Copy cached pixels 1:1, avoiding a second resample at fractional sizes.
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(base, 0, 0);
      context.restore();
      if (!pointer) return;

      const radius = Math.min(120, width * .27);
      const mask = context.createRadialGradient(pointer.x, pointer.y, radius * .65, pointer.x, pointer.y, radius);
      mask.addColorStop(0, '#000');
      mask.addColorStop(1, 'transparent');

      // Crossfade the original photo into the ASCII image inside the brush.
      context.globalCompositeOperation = 'destination-out';
      context.fillStyle = mask;
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = 'source-over';
      revealContext.clearRect(0, 0, Math.ceil(width), Math.ceil(height));
      revealContext.drawImage(ascii, 0, 0, width, height);
      revealContext.globalCompositeOperation = 'destination-in';
      revealContext.fillStyle = mask;
      revealContext.fillRect(0, 0, width, height);
      revealContext.globalCompositeOperation = 'source-over';
      context.drawImage(reveal, 0, 0, width, height);
    };

    const schedule = () => {
      if (!animation) animation = requestAnimationFrame(draw);
    };

    const prepare = () => {
      if (!image.complete || !image.naturalWidth) return;
      const bounds = frame.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      if (!width || !height) return;
      ready = false;
      pointer = null;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      for (const [surface, ctx] of [[canvas, context], [base, baseContext], [ascii, asciiContext], [reveal, revealContext]]) {
        surface.width = Math.round(width * dpr);
        surface.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      baseContext.filter = 'grayscale(1) contrast(1.12) brightness(.9)';
      const drawPortrait = (ctx, targetWidth, targetHeight) => ctx.drawImage(image, 0, SOURCE_TOP, image.naturalWidth, image.naturalHeight - SOURCE_TOP, 0, 0, targetWidth, targetHeight);
      drawPortrait(baseContext, width, height);
      sampler.width = Math.ceil(width / CELL_WIDTH);
      sampler.height = Math.ceil(height / CELL_HEIGHT);
      drawPortrait(sampleContext, sampler.width, sampler.height);
      try {
        samples = sampleContext.getImageData(0, 0, sampler.width, sampler.height).data;
      } catch {
        frame.removeAttribute('data-ascii-ready');
        return;
      }

      const styles = getComputedStyle(frame);
      asciiContext.fillStyle = styles.getPropertyValue('--ink').trim();
      asciiContext.fillRect(0, 0, width, height);
      // Keep the transparent outline: the brush never paints a rectangular box.
      asciiContext.globalCompositeOperation = 'destination-in';
      drawPortrait(asciiContext, width, height);
      asciiContext.globalCompositeOperation = 'source-over';
      asciiContext.font = `700 ${CELL_HEIGHT}px ui-monospace, monospace`;
      asciiContext.textBaseline = 'middle';
      asciiContext.textAlign = 'center';
      asciiContext.fillStyle = styles.getPropertyValue('--red-text').trim();

      for (let row = 0; row < sampler.height; row++) {
        for (let col = 0; col < sampler.width; col++) {
          const offset = (row * sampler.width + col) * 4;
          if (samples[offset + 3] < 100) continue;
          const luminance = (samples[offset] * .2126 + samples[offset + 1] * .7152 + samples[offset + 2] * .0722) / 255;
          const density = .2 + .8 * (theme === 'white' ? 1 - luminance : luminance);
          const glyph = GLYPHS[Math.min(GLYPHS.length - 1, Math.floor(density * GLYPHS.length))];
          asciiContext.fillText(glyph, (col + .5) * CELL_WIDTH, (row + .5) * CELL_HEIGHT);
        }
      }
      // Clip glyph edges to the person as well as the background.
      asciiContext.globalCompositeOperation = 'destination-in';
      drawPortrait(asciiContext, width, height);
      asciiContext.globalCompositeOperation = 'source-over';
      ready = true;
      draw();
      frame.setAttribute('data-ascii-ready', 'true');
    };

    const clear = () => {
      if (!pointer) return;
      pointer = null;
      schedule();
    };

    const move = event => {
      if (!ready || !hover.matches || event.pointerType === 'touch' || event.target.closest('a, button, input, select, textarea')) {
        clear();
        return;
      }
      const bounds = frame.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      if (x < 0 || y < 0 || x >= width || y >= height) {
        clear();
        return;
      }
      const col = Math.min(sampler.width - 1, Math.floor(x / CELL_WIDTH));
      const row = Math.min(sampler.height - 1, Math.floor(y / CELL_HEIGHT));
      if (samples[(row * sampler.width + col) * 4 + 3] < 100) {
        clear();
        return;
      }
      pointer = { x, y };
      schedule();
    };

    image.addEventListener('load', prepare);
    stage.addEventListener('pointermove', move, { passive: true });
    stage.addEventListener('pointerleave', clear);
    hover.addEventListener('change', clear);
    const observer = new ResizeObserver(prepare);
    observer.observe(frame);
    prepare();

    return () => {
      cancelAnimationFrame(animation);
      observer.disconnect();
      image.removeEventListener('load', prepare);
      stage.removeEventListener('pointermove', move);
      stage.removeEventListener('pointerleave', clear);
      hover.removeEventListener('change', clear);
      frame.removeAttribute('data-ascii-ready');
    };
  }, [theme]);

  return (
    <div className="hero-cutout" ref={frameRef}>
      <img ref={imageRef} src="/images/minha-foto-completa.png" alt={t('hero_photo_alt')} width="1054" height="1492" fetchPriority="high" decoding="async" />
      <canvas className="portrait-ascii" ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
