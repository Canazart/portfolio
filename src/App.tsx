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

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const target = e.target as HTMLElement | null;
      const card = target?.closest('.spotlight-card') as HTMLElement | null;
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        card.style.setProperty('--my', `${e.clientY - rect.top}px`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    handleScroll();

    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <>
      <div className="ambient-scene" aria-hidden="true">
        <div className="ambient-grid" />
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
      </div>

      <Nav activeSection={activeSection} lang={lang} onLangChange={setLang} t={t} />
      <main className="page-main">
        <Hero t={t} />
        <div className="divider" aria-hidden="true">
          <span className="divider-node" />
        </div>
        <About t={t} />
        <div className="divider" aria-hidden="true">
          <span className="divider-node" />
        </div>
        <Experience t={t} />
        <div className="divider" aria-hidden="true">
          <span className="divider-node" />
        </div>
        <Projects onOpenLabTab={setLabTab} t={t} />
        <div className="divider" aria-hidden="true">
          <span className="divider-node" />
        </div>
        <SicDemo activeTab={labTab} onTabChange={setLabTab} lang={lang} t={t} />
        <div className="divider" aria-hidden="true">
          <span className="divider-node" />
        </div>
        <Education t={t} />
      </main>
      <div className="divider" aria-hidden="true">
        <span className="divider-node" />
      </div>
      <Contact t={t} />
      <Footer t={t} />
    </>
  );
}

export default App;
