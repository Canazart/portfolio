import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import { About, Education } from './components/AboutAndSkills';
import { Experience, Projects } from './components/ExperienceAndProjects';
import SicDemo from './components/SicDemo';
import type { LabTab } from './components/SicDemo';
import { Contact, Footer } from './components/Contact';
import { TRANSLATIONS } from './i18n';
import type { Lang } from './i18n';

const SECTION_IDS = ['about', 'experience', 'projects', 'lab', 'education', 'contact'];

function getInitialLang(): Lang {
  try {
    const saved = window.localStorage.getItem('portfolio_lang');
    if (saved === 'pt' || saved === 'en' || saved === 'es' || saved === 'zh') {
      return saved;
    }
  } catch {
    // ignore storage errors
  }
  return 'pt';
}

function App() {
  const [activeSection, setActiveSection] = useState('');
  const [labTab, setLabTab] = useState<LabTab>('bre');
  const [lang, setLang] = useState<Lang>(getInitialLang);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    document.title = t.pageTitle;
    try {
      window.localStorage.setItem('portfolio_lang', lang);
    } catch {
      // ignore storage errors
    }
  }, [lang, t.htmlLang, t.pageTitle]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));

    const handleScroll = () => {
      let current = '';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Nav activeSection={activeSection} lang={lang} onLangChange={setLang} t={t} />
      <main>
        <Hero t={t} />
        <div className="divider" />
        <About t={t} />
        <div className="divider" />
        <Experience t={t} />
        <div className="divider" />
        <Projects onOpenLabTab={setLabTab} t={t} />
        <div className="divider" />
        <SicDemo activeTab={labTab} onTabChange={setLabTab} lang={lang} t={t} />
        <div className="divider" />
        <Education t={t} />
      </main>
      <div className="divider" />
      <Contact t={t} />
      <Footer t={t} />
    </>
  );
}

export default App;
