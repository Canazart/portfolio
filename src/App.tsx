import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import type { ThemeMode } from './components/Nav';
import Hero from './components/Hero';
import Solutions from './components/Solutions';
import { About, Skills, Education } from './components/AboutAndSkills';
import { Experience, Projects } from './components/ExperienceAndProjects';
import SicDemo from './components/SicDemo';
import type { LabTab } from './components/SicDemo';
import { Contact, Footer } from './components/Contact';

const SECTION_IDS = ['solutions', 'about', 'experience', 'projects', 'lab', 'skills', 'education', 'contact'];

function App() {
  const [scrollPct, setScrollPct] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [labTab, setLabTab] = useState<LabTab>('bre');
  const [theme, setTheme] = useState<ThemeMode>('cyan');

  useEffect(() => {
    if (theme === 'gold') {
      document.documentElement.setAttribute('data-theme', 'gold');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [theme]);

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
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);

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
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} aria-hidden="true" />
      <div className="scanline" aria-hidden="true" />
      <Nav
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === 'cyan' ? 'gold' : 'cyan'))}
      />
      <main>
        <Hero />
        <div className="divider" />
        <Solutions />
        <div className="divider" />
        <About />
        <div className="divider" />
        <Experience />
        <div className="divider" />
        <Projects onOpenLabTab={setLabTab} />
        <div className="divider" />
        <SicDemo activeTab={labTab} onTabChange={setLabTab} />
        <div className="divider" />
        <Skills />
        <div className="divider" />
        <Education />
      </main>
      <div className="divider" />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
