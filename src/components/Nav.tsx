import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export type ThemeMode = 'cyan' | 'gold';

interface NavProps {
  activeSection: string;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

const LINKS = [
  { href: '#solutions', id: 'solutions', label: 'SOLUÇÕES' },
  { href: '#about', id: 'about', label: 'PERFIL' },
  { href: '#experience', id: 'experience', label: 'EXPERIÊNCIA' },
  { href: '#projects', id: 'projects', label: 'PROJETOS' },
  { href: '#lab', id: 'lab', label: 'LAB AO VIVO', highlight: true },
  { href: '#skills', id: 'skills', label: 'COMPETÊNCIAS' },
  { href: '#education', id: 'education', label: 'FORMAÇÃO' },
  { href: '#contact', id: 'contact', label: 'CONTATO' },
];

export default function Nav({ activeSection, theme, onToggleTheme }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <a className="nav-brand" href="#" aria-label="Leonardo Canazart — Início">
        <svg
          width="30"
          height="30"
          viewBox="0 0 180 200"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 0 8px var(--accent-glow))' }}
        >
          <polygon points="90,10 160,50 90,90 20,50" fill="var(--accent-bright)" opacity="0.38" />
          <polygon points="20,50 90,90 90,170 20,130" fill="var(--accent)" opacity="0.26" />
          <polygon points="160,50 90,90 90,170 160,130" fill="var(--accent2)" opacity="0.2" />
          <polygon
            points="90,10 160,50 160,130 90,170 20,130 20,50"
            fill="none"
            stroke="var(--accent-bright)"
            strokeWidth="4.5"
          />
        </svg>
        <div className="nav-brand-text">
          <span className="nav-brand-name">CANAZART</span>
          <span className="nav-brand-role">CCO · MINERAÇÃO 4.0</span>
        </div>
      </a>

      <div className={`nav-links ${isOpen ? 'mobile-open' : ''}`}>
        {LINKS.map((item) => {
          const classes = [
            item.highlight ? 'nav-highlight' : '',
            activeSection === item.id ? 'active' : '',
          ]
            .filter(Boolean)
            .join(' ');
          return (
            <a
              key={item.id}
              href={item.href}
              className={classes}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          );
        })}

        <button
          type="button"
          className="theme-pill"
          onClick={onToggleTheme}
          title="Alternar paleta entre CCO Ciano (padrão) e Mina Ouro"
          aria-label="Alternar paleta de cores"
        >
          <span className="theme-dot" />
          {theme === 'cyan' ? 'CCO' : 'MINA'}
        </button>
      </div>

      <button
        type="button"
        className="mobile-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        {isOpen ? <X size={22} color="var(--accent-bright)" /> : <Menu size={22} color="var(--accent-bright)" />}
      </button>
    </nav>
  );
}
