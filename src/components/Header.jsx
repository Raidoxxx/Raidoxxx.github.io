import { useSite } from '../SiteContext.jsx';
import ThemePicker from './ThemePicker.jsx';
import { PROFILE_IDS } from '../profiles.js';

const LINKS = [
  ['servicos', 'nav_services'],
  ['projetos', 'nav_projects'],
  ['processo', 'nav_process'],
  ['sobre', 'nav_about'],
  ['faq', null],
];

export default function Header() {
  const { t, language, toggleLanguage, menuOpen, setMenuOpen, menuRef, activeSection, profile, setProfile } = useSite();
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <a className="logo" href="#inicio" aria-label="João Vitor — início">
          <span className="logo-name">João Vitor<span className="logo-dot" aria-hidden="true"></span></span>
          <span className="logo-sub" aria-hidden="true">full stack dev</span>
        </a>
        <nav id="mainNav" aria-label={t('nav_label')} className={menuOpen ? 'is-open' : ''} onClick={() => setMenuOpen(false)}>
          <ul className="nav-list">
            {LINKS.map(([id, key]) => (
              <li key={id}>
                <a href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}>{key ? t(key) : 'FAQ'}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn-red btn-sm header-cta" href="#contato">{t('header_cta')}<i className="bx bx-right-arrow-alt" aria-hidden="true"></i></a>
        <label className="profile-picker">
          <span className="sr-only">{t('profile_label')}</span>
          <select value={profile} onChange={event => setProfile(event.target.value)}>
            {PROFILE_IDS.map(id => <option value={id} key={id}>{t(`profile_${id}`)}</option>)}
          </select>
        </label>
        <button className="lang-toggle" type="button" onClick={toggleLanguage} aria-label={t('lang_switch')}>{language === 'pt' ? 'EN' : 'PT'}</button>
        <ThemePicker />
        <button className="menu-toggle" id="menuToggle" type="button" aria-controls="mainNav" ref={menuRef} onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={t(menuOpen ? 'menu_close' : 'menu_open')}>
          <i className={`bx ${menuOpen ? 'bx-x' : 'bx-menu'}`} aria-hidden="true"></i>
        </button>
      </div>
    </header>
  );
}
