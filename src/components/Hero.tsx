import { Activity, ArrowUpRight, ChevronRight, Radio, Terminal } from 'lucide-react';

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-bg" />
      <div className="hero-dots" />
      <div className="hero-lines" />

      <div className="hero-inner">
        <div>
          <div className="hero-status-pill">
            <span className="status-dot" />
            EM ATIVIDADE · TÉCNICO DE SALA DE CONTROLE I · BEMISA
          </div>

          <div className="hero-eyebrow">
            ENGENHARIA DE MINAS (UEMG) · INTELIGÊNCIA OPERACIONAL · MINERAÇÃO 4.0
          </div>

          <h1 className="hero-name">
            LEONARDO
            <span>CANAZART</span>
          </h1>

          <p className="hero-lead">
            Graduando em <strong>Engenharia de Minas (8° Período · UEMG)</strong> e{' '}
            <strong>Técnico de Controle Operacional na Bemisa — Mina Pedra Branca</strong>. Uno operação de
            Centro de Controle Operacional (CCO), sistemas de despacho (<strong>MineTrack / Sodep</strong>) e
            desenvolvimento de sistemas próprios — de <strong>Short Interval Control (SIC)</strong> a motores de{' '}
            <strong>Auditoria Heurística de Frota (Custom BRE)</strong>.
          </p>

          <div className="hero-cta">
            <a className="btn-primary" href="#lab">
              <Terminal size={15} strokeWidth={2.4} />
              EXPLORAR LAB AO VIVO
            </a>
            <a className="btn-secondary" href="#contact">
              ENTRAR EM CONTATO
              <ChevronRight size={14} />
            </a>
            <a
              className="btn-ghost"
              href="https://www.linkedin.com/in/canazart"
              target="_blank"
              rel="noreferrer"
            >
              LINKEDIN
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="hero-metrics">
            <div className="hero-metric">
              <div className="hm-label">ATUAÇÃO ATUAL</div>
              <div className="hm-value">Bemisa</div>
              <div className="hm-sub">CCO · Pedra Branca</div>
            </div>
            <div className="hero-metric">
              <div className="hm-label">GRADUAÇÃO</div>
              <div className="hm-value">8° Per.</div>
              <div className="hm-sub">Eng. de Minas · UEMG</div>
            </div>
            <div className="hero-metric">
              <div className="hm-label">SISTEMAS PRÓPRIOS</div>
              <div className="hm-value">BRE + SIC</div>
              <div className="hm-sub">Em uso real no CCO</div>
            </div>
            <div className="hero-metric">
              <div className="hm-label">AUDITORIA BRE</div>
              <div className="hm-value">&lt; 1ms</div>
              <div className="hm-sub">0 falsos positivos</div>
            </div>
          </div>
        </div>

        <aside className="hero-telemetry" aria-label="Painel de Telemetria Operacional">
          <div className="ca ca-tl" />
          <div className="ca ca-tr" />
          <div className="ca ca-bl" />
          <div className="ca ca-br" />

          <div className="ht-header">
            <div className="ht-title">
              <Radio size={14} />
              CCO · TELEMETRIA DE PERFIL
            </div>
            <span className="ht-badge">ONLINE · PIT-TO-PLANT</span>
          </div>

          <div className="ht-visual">
            <svg
              width="210"
              height="168"
              viewBox="0 0 220 180"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: 'drop-shadow(0 0 16px var(--accent-glow))' }}
            >
              <polygon
                points="110,18 190,62 110,106 30,62"
                fill="var(--accent-glow)"
                stroke="var(--accent)"
                strokeWidth="1.2"
              />
              <polygon
                points="110,34 170,66 110,98 50,66"
                fill="none"
                stroke="var(--accent-bright)"
                strokeOpacity="0.35"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              {/* Live telemetry bars */}
              <rect x="86" y="48" width="11" height="44" rx="1.5" fill="var(--accent)" opacity="0.9">
                <animate attributeName="height" values="44;24;44" dur="3.2s" repeatCount="indefinite" />
                <animate attributeName="y" values="48;68;48" dur="3.2s" repeatCount="indefinite" />
              </rect>
              <rect x="105" y="34" width="11" height="58" rx="1.5" fill="var(--accent-bright)" opacity="0.9">
                <animate attributeName="height" values="58;38;58" dur="4s" repeatCount="indefinite" />
                <animate attributeName="y" values="34;54;34" dur="4s" repeatCount="indefinite" />
              </rect>
              <rect x="124" y="54" width="11" height="38" rx="1.5" fill="var(--amber)" opacity="0.85">
                <animate attributeName="height" values="38;52;38" dur="2.8s" repeatCount="indefinite" />
                <animate attributeName="y" values="54;40;54" dur="2.8s" repeatCount="indefinite" />
              </rect>

              {/* Fleet network nodes */}
              <path
                d="M46,136 L110,162 L174,128"
                fill="none"
                stroke="var(--border-focus)"
                strokeWidth="1.5"
              />
              <line x1="110" y1="106" x2="110" y2="162" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="46" y1="136" x2="46" y2="70" stroke="var(--border-focus)" strokeOpacity="0.5" strokeWidth="1" />
              <line x1="174" y1="128" x2="174" y2="70" stroke="var(--border-focus)" strokeOpacity="0.5" strokeWidth="1" />

              <circle cx="46" cy="136" r="5" fill="#10b981" />
              <circle cx="110" cy="162" r="6" fill="var(--accent-bright)" />
              <circle cx="174" cy="128" r="5" fill="var(--amber)" />
            </svg>
          </div>

          <div className="ht-rows">
            <div className="ht-row">
              <span className="ht-row-k">DESPACHO FMS</span>
              <span className="ht-row-v cyan">MineTrack · Sodep</span>
            </div>
            <div className="ht-row">
              <span className="ht-row-k">MOTOR BRE</span>
              <span className="ht-row-v emerald">Auditoria Heurística · ES6+</span>
            </div>
            <div className="ht-row">
              <span className="ht-row-k">CONTROLE SIC</span>
              <span className="ht-row-v cyan">Dashboards · DF · UT · Ciclo</span>
            </div>
            <div className="ht-row">
              <span className="ht-row-k">ANALYTICS &amp; ERP</span>
              <span className="ht-row-v amber">Python KDD · Power BI · SAP MM</span>
            </div>
          </div>

          <div className="ht-footer">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Activity size={12} color="var(--emerald)" />
              JOÃO MONLEVADE · MG
            </span>
            <span>MINERAÇÃO 4.0</span>
          </div>
        </aside>
      </div>
    </header>
  );
}
