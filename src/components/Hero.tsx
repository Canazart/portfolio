import { ArrowUpRight, ChevronRight } from 'lucide-react';
import profileImg from '../assets/profile.png';
import type { Translation } from '../i18n';

interface HeroProps {
  t: Translation;
}

export default function Hero({ t }: HeroProps) {
  return (
    <div className="hero-wrap">
      <svg
        className="hero-topo"
        viewBox="0 0 1200 540"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g fill="none" stroke="rgba(201, 162, 75, 0.35)" strokeWidth="1">
          <path d="M520,-20 C680,70 760,150 960,115 C1080,95 1160,140 1240,110" />
          <path d="M460,40 C660,130 780,220 980,180 C1100,155 1170,205 1250,180" />
          <path d="M410,110 C640,205 790,295 1000,250 C1120,225 1180,280 1260,260" />
          <path d="M560,210 C740,280 860,360 1040,320 C1140,298 1190,340 1260,328" />
          <path d="M680,310 C820,370 930,425 1080,395 C1160,380 1200,415 1260,405" />
        </g>
      </svg>

      <header className="hero">
        <div className="hero-head">
          <img
            src={profileImg}
            alt={t.hero.photoAlt}
            className="hero-photo"
            width={140}
            height={140}
          />
          <div>
            <div className="hero-location">{t.hero.location}</div>
            <h1 className="hero-name">Leonardo Canazart</h1>
            <p className="hero-role">{t.hero.role}</p>
          </div>
        </div>

        <p className="hero-summary">{t.hero.summary}</p>

        <div className="hero-actions">
          <a className="btn-primary" href="#projects">
            {t.hero.ctaProjects}
            <ChevronRight size={15} />
          </a>
          <a className="btn-secondary" href="#lab">
            {t.hero.ctaDemos}
          </a>
          <a
            className="btn-link"
            href="https://www.linkedin.com/in/canazart"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
            <ArrowUpRight size={14} />
          </a>
          <a
            className="btn-link"
            href="https://github.com/Canazart"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
            <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="hero-facts">
          {t.hero.facts.map((fact) => (
            <div key={fact.label}>
              <div className="hero-fact-label">{fact.label}</div>
              <div className="hero-fact-value">{fact.value}</div>
              <div className="hero-fact-sub">{fact.sub}</div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}
