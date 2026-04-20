import { useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Solutions from './components/Solutions';
import { About, Skills, Education } from './components/AboutAndSkills';
import { Experience, Project, KDD } from './components/ExperienceAndProjects';
import SicDemo from './components/SicDemo';
import { Contact, Footer } from './components/Contact';

function App() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { 
        if(e.isIntersecting) { 
          e.target.classList.add('visible'); 
          obs.unobserve(e.target); 
        } 
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div className="scanline"></div>
      <Nav />
      <main>
        <Hero />
        <div className="divider"></div>
        <Solutions />
        <div className="divider"></div>
        <About />
        <div className="divider"></div>
        <Experience />
        <div className="divider"></div>
        <Project />
        <div className="divider"></div>
        <SicDemo />
        <div className="divider"></div>
        <KDD />
        <div className="divider"></div>
        <Skills />
        <div className="divider"></div>
        <Education />
      </main>
      <div className="divider"></div>
      <Contact />
      <Footer />
    </>
  );
}

export default App;
