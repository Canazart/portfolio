import { LogIn } from 'lucide-react';

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-bg"></div>
      <div className="hero-dots"></div>
      <div className="hero-lines"></div>
      <div className="ca ca-tl"></div>
      <div className="ca ca-tr"></div>
      <div className="ca ca-bl"></div>
      <div className="ca ca-br"></div>

      <div className="hero-inner">
        <div className="hero-eyebrow">ENGENHARIA DE MINAS · INTELIGÊNCIA OPERACIONAL · MINERAÇÃO 4.0</div>

        <h1 className="hero-name">
          LEONARDO
          <span>CANAZART</span>
        </h1>

        <div className="hero-tagline">
          CENTRO DE CONTROLE OPERACIONAL · SISTEMAS DE DESPACHO · SOLUÇÕES DIGITAIS
        </div>

        <div className="hero-cards">
          <div className="hero-card">
            <div className="hc-label">soluções</div>
            <div className="hc-value">Dashboards<em>operacionais</em></div>
          </div>
          <div className="hero-card">
            <div className="hc-label">interesse</div>
            <div className="hc-value">Mineração<em>4.0 · Digital</em></div>
          </div>
          <div className="hero-card">
            <div className="hc-label">foco</div>
            <div className="hc-value">Decisão<em>baseada em dados</em></div>
          </div>
          <div className="hero-card">
            <div className="hc-label">perfil</div>
            <div className="hc-value" style={{ color: 'var(--accent2)' }}>Eng.<em>+ Desenvolvedor</em></div>
          </div>
        </div>

        <div className="hero-cta">
          <a className="btn-primary" href="#contact">
            <LogIn size={13} strokeWidth={2.5} />
            ENTRAR EM CONTATO
          </a>
          <a className="btn-ghost" href="https://www.linkedin.com/in/canazart" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
        </div>
      </div>

      <div className="hero-cube">
        <svg width="170" height="190" viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 12px rgba(20, 184, 212, 0.3))' }}>
          <polygon points="90,30 160,70 90,110 20,70" fill="rgba(20, 184, 212, 0.07)" stroke="#14b8d4" strokeWidth="1"/>
          
          {/* Data Bars */}
          <rect x="75" y="60" width="10" height="40" fill="#14b8d4" opacity="0.8">
            <animate attributeName="height" values="40;20;40" dur="3s" repeatCount="indefinite" />
            <animate attributeName="y" values="60;80;60" dur="3s" repeatCount="indefinite" />
          </rect>
          <rect x="95" y="40" width="10" height="60" fill="#0c9ab8" opacity="0.8">
            <animate attributeName="height" values="60;80;60" dur="4s" repeatCount="indefinite" />
            <animate attributeName="y" values="40;20;40" dur="4s" repeatCount="indefinite" />
          </rect>
          <rect x="115" y="70" width="10" height="30" fill="#dde6ee" opacity="0.3">
            <animate attributeName="height" values="30;50;30" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="y" values="70;50;70" dur="2.5s" repeatCount="indefinite" />
          </rect>


          {/* Network Nodes */}
          <circle cx="40" cy="130" r="4" fill="var(--accent)" />
          <circle cx="90" cy="160" r="5" fill="var(--accent2)" />
          <circle cx="140" cy="120" r="4" fill="var(--text-main)" />
          
          <path d="M40,130 L90,160 L140,120" fill="none" stroke="var(--border-focus)" strokeWidth="1.5" />
          <path d="M90,110 L90,160" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="2 2" opacity="0.5"/>
          
          {/* Connecting lines */}
          <line x1="40" y1="130" x2="40" y2="70" stroke="var(--border-focus)" strokeWidth="0.5" opacity="0.4" />
          <line x1="140" y1="120" x2="140" y2="70" stroke="var(--border-focus)" strokeWidth="0.5" opacity="0.4" />
        </svg>
        <div className="cube-label">GESTÃO DE FROTAS<br/>& ANÁLISE DE DADOS</div>
      </div>
    </header>
  );
}
