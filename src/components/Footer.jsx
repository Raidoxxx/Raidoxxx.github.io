import { useSite } from '../SiteContext.jsx';
import { EMAIL, GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL } from './ui.jsx';

export default function Footer() {
  const { t } = useSite();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">João Vitor<span className="logo-dot" aria-hidden="true"></span></p>
          <p className="footer-tagline">{t('footer_tagline')}</p>
          <blockquote className="footer-verse">
            <p>“{t('footer_verse')}”</p>
            <cite>{t('footer_verse_reference')}</cite>
          </blockquote>
        </div>
        <div>
          <h2>{t('footer_nav')}</h2>
          <ul>
            <li><a href="#servicos">{t('nav_services')}</a></li>
            <li><a href="#projetos">{t('nav_projects')}</a></li>
            <li><a href="#processo">{t('nav_process')}</a></li>
            <li><a href="#sobre">{t('nav_about')}</a></li>
          </ul>
        </div>
        <div>
          <h2>{t('footer_contact')}</h2>
          <ul>
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">(13) 98136-5553</a></li>
            <li>{t('footer_location')}</li>
          </ul>
        </div>
        <div>
          <h2>{t('footer_social')}</h2>
          <div className="footer-social">
            <a className="ring" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="bx bxl-linkedin" aria-hidden="true"></i></a>
            <a className="ring" href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="bx bxl-github" aria-hidden="true"></i></a>
            <a className="ring" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="bx bxl-whatsapp" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} João Vitor Gomes Martins</p>
        <a href="#inicio">{t('footer_top')} ↑</a>
      </div>
    </footer>
  );
}
