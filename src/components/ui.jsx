import { useMemo } from 'react';

export const WHATSAPP_URL = 'https://wa.me/5513981365553';
export const EMAIL = 'suporterdx@gmail.com';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/jo%C3%A3ovitorgomesmartins/';
export const GITHUB_URL = 'https://github.com/Raidoxxx';

/* Highlighter-marker word, as in a hand-marked print. */
export function Mark({ children }) {
  return <mark className="mark">{children}</mark>;
}

/* Small uppercase label that opens each section. */
export function Kicker({ children, index }) {
  return (
    <p className="kicker">
      {index && <span className="kicker-index">{index}</span>}
      {children}
    </p>
  );
}

/* Renders "\n" in translation strings as line breaks. */
export function Lines({ text }) {
  return text.split('\n').map((line, i) => <span className="line" key={i}>{line}</span>);
}

function seededRandom(seed) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Ripped-paper seam between two sections of different colors. */
export function Tear({ from, to, seed = 7 }) {
  const path = useMemo(() => {
    const rand = seededRandom(seed);
    let d = 'M0,0 L0,18';
    for (let x = 0; x <= 1200; x += 10 + rand() * 22) {
      d += ` L${x.toFixed(1)},${(8 + rand() * 22).toFixed(1)}`;
    }
    return d + ' L1200,18 L1200,0 Z';
  }, [seed]);
  return (
    <div className={`tear tear-to-${to}`} aria-hidden="true">
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path d={path} className={`fill-${from}`} />
      </svg>
    </div>
  );
}

/* Two crossing tapes with scrolling words. */
export function Tapes({ items }) {
  const row = items.flatMap(item => [item, '✦']);
  const content = [...row, ...row, ...row];
  return (
    <div className="tapes" aria-hidden="true">
      <div className="tape tape-back"><div className="tape-track reverse">{content.map((w, i) => <span key={i}>{w}</span>)}</div></div>
      <div className="tape tape-front"><div className="tape-track">{content.map((w, i) => <span key={i}>{w}</span>)}</div></div>
    </div>
  );
}
