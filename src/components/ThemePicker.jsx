import { useEffect, useRef, useState } from 'react';
import { THEMES, useSite } from '../SiteContext.jsx';

export default function ThemePicker() {
  const { t, theme, setTheme } = useSite();
  const [open, setOpen] = useState(false);
  const pickerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const dismiss = event => {
      if (!pickerRef.current?.contains(event.target)) setOpen(false);
    };
    const escape = event => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  return (
    <div className="theme-picker" ref={pickerRef} onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <button className="theme-toggle" type="button" ref={buttonRef}
        onClick={() => setOpen(value => !value)} aria-expanded={open}
        aria-controls="theme-options" aria-label={`${t('theme_choose')}: ${t(`theme_${theme}`)}`}
        title={t('theme_choose')}>
        <i className="bx bx-palette" aria-hidden="true"></i>
      </button>
      {open && <div className="theme-options" id="theme-options" role="group" aria-label={t('theme_choose')}>
        <p>{t('theme_choose')}</p>
        {THEMES.map(option => (
          <button type="button" key={option} aria-pressed={theme === option} onClick={() => {
            setTheme(option);
            setOpen(false);
            buttonRef.current?.focus();
          }}>
            <span className={`theme-swatch swatch-${option}`} aria-hidden="true"></span>
            {t(`theme_${option}`)}
            {theme === option && <i className="bx bx-check" aria-hidden="true"></i>}
          </button>
        ))}
      </div>}
    </div>
  );
}
