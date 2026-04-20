import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <a className="nav-logo" href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <svg width="28" height="28" viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 8px rgba(20,184,212,0.5))' }}>
          <polygon points="90,10 160,50 90,90 20,50" fill="rgba(20, 184, 212, 0.35)" />
          <polygon points="20,50 90,90 90,170 20,130" fill="rgba(12, 154, 184, 0.25)" />
          <polygon points="160,50 90,90 90,170 160,130" fill="rgba(20, 184, 212, 0.18)" />
          <polygon points="90,10 160,50 160,130 90,170 20,130 20,50" fill="none" stroke="#14b8d4" strokeWidth="4" />
        </svg>
      </a>
      <div className={`nav-links ${isOpen ? 'mobile-open' : ''}`}>
        <a href="#about" onClick={() => setIsOpen(false)}>PERFIL</a>
        <a href="#solutions" onClick={() => setIsOpen(false)}>SOLUÇÕES</a>
        <a href="#experience" onClick={() => setIsOpen(false)}>EXPERIÊNCIA</a>
        <a href="#project" onClick={() => setIsOpen(false)}>PROJETO</a>
        <a href="#sic-demo" style={{ color: 'var(--accent)' }} onClick={() => setIsOpen(false)}>DEMO SIC</a>
        <a href="#kdd" onClick={() => setIsOpen(false)}>KDD</a>
        <a href="#skills" onClick={() => setIsOpen(false)}>COMPETÊNCIAS</a>
        <a href="#contact" onClick={() => setIsOpen(false)}>CONTATO</a>
      </div>
      <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} color="var(--accent)" /> : <Menu size={24} color="var(--accent)" />}
      </button>
    </nav>
  );
}
