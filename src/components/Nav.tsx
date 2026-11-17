import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LANG_OPTIONS } from '../i18n';
import type { Lang, Translation } from '../i18n';

interface NavProps {
  activeSection: string;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
  t: Translation;
}

export default function Nav({ activeSection, lang, onLangChange, t }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: '#about', id: 'about', label: t.nav.about },
    { href: '#experience', id: 'experience', label: t.nav.experience },
    { href: '#projects', id: 'projects', label: t.nav.projects },
    { href: '#lab', id: 'lab', label: t.nav.demos },
    { href: '#education', id: 'education', label: t.nav.education },
    { href: '#contact', id: 'contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <a className="nav-brand" href="#">
          Leonardo Canazart<span>.</span>
        </a>

        <div className={`nav-links ${isOpen ? 'mobile-open' : ''}`}>
          {links.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={activeSection === item.id ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}

          <div className="lang-switch" role="group" aria-label="Language selector">
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.code}
                type="button"
                className={`lang-btn ${lang === opt.code ? 'active' : ''}`}
                onClick={() => {
                  onLangChange(opt.code);
                  setIsOpen(false);
                }}
                aria-pressed={lang === opt.code}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  );
}
