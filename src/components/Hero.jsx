import { useEffect, useState } from 'react';
import { useSite } from '../SiteContext.jsx';
import { GITHUB_URL, LINKEDIN_URL, Lines } from './ui.jsx';
import HalftoneAngel from './HalftoneAngel.jsx';
import HalftoneLight from './HalftoneLight.jsx';
import PhotoAscii from './PhotoAscii.jsx';

function useSaoPauloClock() {
  const format = () => new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 20000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Hero() {
  const { t, cvUrl } = useSite();
  const time = useSaoPauloClock();
  return (
    <section className="hero">
      <HalftoneLight />
      <div className="container hero-meta" aria-hidden="true">
        <p className="meta-red"><Lines text={t('hero_meta_left')} /></p>
        <p>SP, BR — {time}</p>
        <p className="meta-right"><Lines text={t('hero_meta_right')} /> <span className="meta-star">✦</span></p>
      </div>

      <div className="hero-stage">
        <p className="hero-word" aria-hidden="true">{t('hero_word')}</p>
        <PhotoAscii />
        <HalftoneAngel className="hero-angel" />

        <div className="container hero-grid">
          <div className="hero-intro">
            <p className="hand hero-hello">{t('hero_hello')}</p>
            <h1 className="hero-name">João <br />Vitor</h1>
            <p className="hero-role">{t('hero_role')}</p>
            <p className="hero-text">{t('hero_text')}</p>
            <div className="hero-actions">
              <a className="btn btn-red" href="#contato">{t('hero_btn_contact')}<i className="bx bx-right-arrow-alt" aria-hidden="true"></i></a>
              <a className="btn btn-outline" href="#projetos">{t('hero_btn_projects')}</a>
            </div>
            <p className="hero-links">
              <span>{t('hero_recruiter')}</span>
              <a href={cvUrl} target="_blank" rel="noopener noreferrer"><i className="bx bx-download" aria-hidden="true"></i>{t('hero_cv')}</a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><i className="bx bxl-linkedin" aria-hidden="true"></i>LinkedIn</a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"><i className="bx bxl-github" aria-hidden="true"></i>GitHub</a>
            </p>
          </div>

          <aside className="hero-side">
            <p className="hero-note"><span className="hero-rdx-logo" role="img" aria-label="RDX"></span><span>{t('hero_note')}</span></p>
            <ul className="hero-stats" aria-label={t('stats_label')}>
              <li><strong>2</strong><span><Lines text={t('stat_live')} /></span></li>
              <li><strong>2023</strong><span><Lines text={t('stat_since')} /></span></li>
              <li><strong>100%</strong><span><Lines text={t('stat_remote')} /></span></li>
            </ul>
          </aside>
        </div>
      </div>

      <div className="container hero-foot">
        <p><i className="bx bx-globe" aria-hidden="true"></i>{t('hero_available')}</p>
        <a href="#servicos" className="scroll-cue" aria-label={t('nav_services')}><i className="bx bx-down-arrow-alt" aria-hidden="true"></i></a>
      </div>
    </section>
  );
}
