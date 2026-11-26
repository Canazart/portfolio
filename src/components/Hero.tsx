import { ArrowUpRight, ChevronRight } from 'lucide-react';
import profileImg from '../assets/profile.png';
import type { Translation } from '../i18n';

interface HeroProps {
  t: Translation;
}

export default function Hero({ t }: HeroProps) {
  return (
    <div className="hero-wrap">
      <div className="hero-glow" aria-hidden="true" />
      <svg
        className="hero-topo"
        viewBox="0 0 1440 680"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="topoGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c9a24b" stopOpacity="0.06" />
            <stop offset="50%" stopColor="#e2bf6e" stopOpacity="0.48" />
            <stop offset="100%" stopColor="#c9a24b" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="topoPulse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e2bf6e" stopOpacity="0" />
            <stop offset="50%" stopColor="#f0d58c" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e2bf6e" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#topoGold)" strokeWidth="1.1" className="topo-lines-group">
          <path d="M520,-30 C710,65 820,155 1040,112 C1185,84 1290,145 1470,102" />
          <path d="M440,35 C660,132 805,222 1035,176 C1180,146 1285,205 1470,168" />
          <path d="M360,108 C615,205 785,295 1030,246 C1175,216 1280,278 1470,248" />
          <path d="M480,198 C700,276 850,358 1065,314 C1200,286 1295,338 1470,322" />
          <path d="M610,296 C790,362 925,428 1110,394 C1225,372 1315,418 1470,404" />
          <path d="M740,392 C885,442 1005,498 1165,472 C1265,455 1340,492 1470,480" />
          <path d="M870,486 C990,524 1095,568 1225,550 C1310,538 1375,568 1470,558" />
        </g>
        {/* Luminous animated telemetry scan pulses gliding along the pit contours */}
        <g
          fill="none"
          stroke="#f2d996"
          strokeWidth="1.8"
          strokeLinecap="round"
          className="topo-scan-group"
        >
          <path
            className="topo-scan topo-scan-1"
            d="M440,35 C660,132 805,222 1035,176 C1180,146 1285,205 1470,168"
          />
          <path
            className="topo-scan topo-scan-2"
            d="M480,198 C700,276 850,358 1065,314 C1200,286 1295,338 1470,322"
          />
          <path
            className="topo-scan topo-scan-3"
            d="M740,392 C885,442 1005,498 1165,472 C1265,455 1340,492 1470,480"
          />
          <path
            className="topo-scan topo-scan-4"
            d="M520,-30 C710,65 820,155 1040,112 C1185,84 1290,145 1470,102"
          />
        </g>
        {/* Pulsing elevation benchmark nodes with radar rings */}
        <g className="topo-nodes-group">
          <circle cx="1035" cy="176" r="4" className="topo-node-ring" />
          <circle cx="1035" cy="176" r="2.8" className="topo-node" />

          <circle cx="1065" cy="314" r="4" className="topo-node-ring topo-node-delay" />
          <circle cx="1065" cy="314" r="2.8" className="topo-node topo-node-delay" />

          <circle cx="1165" cy="472" r="4" className="topo-node-ring topo-node-delay-2" />
          <circle cx="1165" cy="472" r="2.6" className="topo-node topo-node-delay-2" />
        </g>
      </svg>

      <header className="hero">
        <div className="hero-head hero-anim-1">
          <div className="hero-photo-frame">
            <img
              src={profileImg}
              alt={t.hero.photoAlt}
              className="hero-photo"
              width={140}
              height={140}
            />
          </div>
          <div>
            <div className="hero-location">
              <span className="beacon-dot" aria-hidden="true" />
              <span>{t.hero.location}</span>
            </div>
            <h1 className="hero-name">Leonardo Canazart</h1>
            <p className="hero-role">{t.hero.role}</p>
          </div>
        </div>

        <p className="hero-summary hero-anim-2">{t.hero.summary}</p>

        <div className="hero-actions hero-anim-3">
          <a className="btn-primary" href="#projects">
            <span>{t.hero.ctaProjects}</span>
            <ChevronRight size={15} className="btn-icon-shift" />
          </a>
          <a className="btn-secondary" href="#lab">
            <span>{t.hero.ctaDemos}</span>
          </a>
          <a
            className="btn-link"
            href="https://www.linkedin.com/in/canazart"
            target="_blank"
            rel="noreferrer"
          >
            <span>LinkedIn</span>
            <ArrowUpRight size={14} className="btn-icon-diag" />
          </a>
          <a
            className="btn-link"
            href="https://github.com/Canazart"
            target="_blank"
            rel="noreferrer"
          >
            <span>GitHub</span>
            <ArrowUpRight size={14} className="btn-icon-diag" />
          </a>
        </div>

        <div className="hero-facts hero-anim-4">
          {t.hero.facts.map((fact) => (
            <div key={fact.label} className="hero-fact-card spotlight-card">
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
