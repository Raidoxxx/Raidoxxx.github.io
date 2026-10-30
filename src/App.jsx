import { SiteProvider, useSite } from './SiteContext.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Projects from './components/Projects.jsx';
import Process from './components/Process.jsx';
import About from './components/About.jsx';
import FAQ from './components/FAQ.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import { Tapes, Tear, WHATSAPP_URL } from './components/ui.jsx';

function Portfolio() {
  const { t, floatingVisible } = useSite();
  const tapeItems = ['svc_1_title', 'svc_2_title', 'svc_3_title', 'svc_4_title', 'svc_5_title', 'svc_6_title'].map(t);
  return (
    <>
      <a className="skip-link" href="#inicio">{t('skip_link')}</a>
      <div className="grain" aria-hidden="true"></div>
      <Header />
      <main id="inicio" tabIndex={-1}>
        <Hero />
        <Tapes items={tapeItems} />
        <Tear from="ink" to="paper" seed={3} />
        <Services />
        <Tear from="paper" to="ink" seed={11} />
        <Projects />
        <Tear from="ink" to="paper" seed={23} />
        <Process />
        <Tear from="paper" to="graphite" seed={31} />
        <About />
        <Tear from="graphite" to="paper" seed={42} />
        <FAQ />
        <Tear from="paper" to="ink" seed={57} />
        <Contact />
      </main>
      <Footer />
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label={t('wa_float')} className={'wa-float' + (floatingVisible ? ' is-visible' : '')}><i className="bx bxl-whatsapp" aria-hidden="true"></i></a>
    </>
  );
}

export default function App() {
  return <SiteProvider><Portfolio /></SiteProvider>;
}
