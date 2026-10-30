import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { en, pt } from './translations.js';

const SiteContext = createContext(null);
export const useSite = () => useContext(SiteContext);

function initialLanguage() {
  try {
    const saved = localStorage.getItem('site_lang');
    if (saved === 'pt' || saved === 'en') return saved;
  } catch { /* Storage can be disabled in private browsing. */ }
  return (navigator.language || 'pt').toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

export function SiteProvider({ children }) {
  const [language, setLanguage] = useState(initialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [floatingVisible, setFloatingVisible] = useState(false);
  const menuRef = useRef(null);
  const t = key => (language === 'en' ? en[key] : pt[key]) ?? pt[key] ?? key;

  useEffect(() => {
    document.documentElement.classList.add('js');
    const breakpoint = window.matchMedia('(min-width: 761px)');
    const closeMenu = () => setMenuOpen(false);
    breakpoint.addEventListener('change', closeMenu);
    return () => breakpoint.removeEventListener('change', closeMenu);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR';
    const dict = language === 'en' ? en : pt;
    document.title = dict.page_title;
    document.querySelector('meta[name="description"]').content = dict.page_description;
    try { localStorage.setItem('site_lang', language); } catch { /* Optional preference. */ }
  }, [language]);

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
    }}>
      {children}
    </SiteContext.Provider>
  );
}
