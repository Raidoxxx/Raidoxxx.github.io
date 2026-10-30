import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { en, pt } from './translations.js';
import { PROFILE_COPY, PROFILE_IDS, PROFILE_LABELS, PROFILES, profileFromSearch } from './profiles.js';

const SiteContext = createContext(null);
export const useSite = () => useContext(SiteContext);
export const THEMES = ['white', 'purple', 'blue'];

function initialTheme() {
  try {
    const saved = localStorage.getItem('site_theme');
    if (THEMES.includes(saved)) return saved;
  } catch { /* Optional preference. */ }
  return 'blue';
}

function initialLanguage() {
  try {
    const saved = localStorage.getItem('site_lang');
    if (saved === 'pt' || saved === 'en') return saved;
  } catch { /* Storage can be disabled in private browsing. */ }
  return (navigator.language || 'pt').toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

export function SiteProvider({ children }) {
  const [profile, updateProfile] = useState(() => profileFromSearch(window.location.search));
  const [language, setLanguage] = useState(initialLanguage);
  const [theme, setTheme] = useState(initialTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [floatingVisible, setFloatingVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(() => profileFromSearch(window.location.search) === 'freelance' ? 'opt_other' : 'opt_job');
  const menuRef = useRef(null);
  const dict = { ...(language === 'en' ? en : pt), ...PROFILE_LABELS[language], ...PROFILE_COPY[profile][language] };
  const t = key => dict[key] ?? pt[key] ?? key;
  const cvUrl = PROFILES[profile].cv;
  const whatsappUrl = `https://wa.me/5513981365553?text=${encodeURIComponent(t('whatsapp_freelance'))}`;

  const setProfile = value => {
    if (!PROFILE_IDS.includes(value)) return;
    const url = new URL(window.location.href);
    url.searchParams.set('perfil', value);
    window.history.pushState(null, '', url);
    updateProfile(value);
    setSelectedService(value === 'freelance' ? 'opt_other' : 'opt_job');
    setMenuOpen(false);
  };

  useEffect(() => {
    const restore = () => {
      const value = profileFromSearch(window.location.search);
      updateProfile(value);
      setSelectedService(value === 'freelance' ? 'opt_other' : 'opt_job');
    };
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const colors = { white: '#f8fafc', purple: '#130d21', blue: '#090f20' };
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', colors[theme]);
    try { localStorage.setItem('site_theme', theme); } catch { /* Optional preference. */ }
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.add('js');
    const breakpoint = window.matchMedia('(min-width: 1025px)');
    const closeMenu = () => setMenuOpen(false);
    breakpoint.addEventListener('change', closeMenu);
    return () => breakpoint.removeEventListener('change', closeMenu);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
    document.title = (PROFILE_COPY[profile][language].page_title ?? (language === 'en' ? en : pt).page_title);
    document.querySelector('meta[name="description"]').content = PROFILE_COPY[profile][language].page_description ?? (language === 'en' ? en : pt).page_description;
    try { localStorage.setItem('site_lang', language); } catch { /* Optional preference. */ }
  }, [language, profile]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setFloatingVisible(true);
      return;
    }
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-15% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => navObserver.observe(section));

    const visibleSections = new Set();
    const floatingObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) visibleSections.add(entry.target);
        else visibleSections.delete(entry.target);
      });
      setFloatingVisible(visibleSections.size === 0);
    });
    document.querySelectorAll('.hero, #contato').forEach(section => floatingObserver.observe(section));
    return () => {
      navObserver.disconnect();
      floatingObserver.disconnect();
    };
  }, []);

  const handlePreviewError = event => {
    const preview = event.currentTarget.closest('.project-preview');
    preview.dataset.fallback = preview.closest('.project-card').querySelector('h3').textContent;
    preview.classList.add('preview-unavailable');
  };

  return (
    <SiteContext.Provider value={{
      t, language, toggleLanguage: () => setLanguage(value => value === 'pt' ? 'en' : 'pt'),
      menuOpen, setMenuOpen, menuRef, activeSection, floatingVisible, handlePreviewError,
      selectedService, setSelectedService,
      theme, setTheme,
      profile, setProfile, cvUrl, whatsappUrl,
    }}>
      {children}
    </SiteContext.Provider>
  );
}
