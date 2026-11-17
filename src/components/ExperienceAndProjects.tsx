import type { CSSProperties } from 'react';
import { ArrowUpRight, Briefcase, Code, ShieldCheck, Terminal, TrendingUp } from 'lucide-react';
import type { LabTab } from './SicDemo';

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="sec-header reveal">
        <div className="sec-label">TRAJETÓRIA PROFISSIONAL</div>
        <h2 className="sec-title">
          Experiência <span>Profissional</span>
        </h2>
        <p className="sec-subtitle">
          Evolução contínua da gestão financeira e suprimentos siderúrgicos à operação estratégica em tempo real
          e desenvolvimento de sistemas no CCO da mineração.
        </p>
      </div>

      <div className="exp-wrap">
        {/* BEMISA — CAREER PROGRESSION */}
        <article className="exp-card featured reveal">
          <div className="exp-top">
            <div>
              <h3 className="exp-company">BEMISA HOLDING S.A.</h3>
              <div className="exp-loc">
                Mina Pedra Branca · João Monlevade, MG · Tempo integral (1 ano)
              </div>
            </div>
            <div className="exp-meta">
              <span className="exp-period">DEZ 2025 — O MOMENTO</span>
              <span className="exp-badge active">● EM ATIVIDADE</span>
              <span className="exp-badge promo">↑ PROMOÇÃO EM AGO 2026</span>
            </div>
          </div>

          <div className="exp-progression">
            {/* ROLE 1: TÉCNICO DE SALA DE CONTROLE I */}
            <div className="exp-step current">
              <div className="exp-step-head">
                <div className="exp-step-role">Técnico de Sala de Controle I</div>
                <span className="exp-period">AGO 2026 — O MOMENTO</span>
              </div>
              <ul className="exp-list">
                <li>
                  Gestão e controle da operação de mina em tempo real via sistema de despacho (<strong>FMS</strong>).
                </li>
                <li>
                  Monitoramento de KPIs operacionais e identificação ativa de desvios de produção e produtividade.
                </li>
                <li>
                  Interface direta com o <strong>planejamento de curto prazo</strong> e a <strong>manutenção</strong>{' '}
                  para tratamento de inconsistências e otimização da frota.
                </li>
                <li>
                  Suporte à implantação, parametrização avançada e evolução contínua do{' '}
                  <strong>MineTrack (Sodep)</strong>.
                </li>
                <li>
                  Desenvolvimento do{' '}
                  <strong>Algoritmo de Validação Heurística e Auditoria de Frota (Custom BRE)</strong>, aplicado à
                  validação e auditoria algorítmica de apontamentos operacionais.
                </li>
                <li>
                  Desenvolvimento e evolução da ferramenta de <strong>Short Interval Control (SIC)</strong> para
                  acompanhamento operacional e suporte à decisão.
                </li>
              </ul>
            </div>

            {/* ROLE 2: OPERADOR DE SALA DE CONTROLE */}
            <div className="exp-step">
              <div className="exp-step-head">
                <div className="exp-step-role" style={{ color: 'var(--text-main)' }}>
                  Operador de Sala de Controle
                </div>
                <span className="exp-period">DEZ 2025 — AGO 2026 · 9 MESES</span>
              </div>
              <ul className="exp-list">
                <li>
                  Gestão em tempo real da operação via sistema de despacho (FMS), garantindo aderência ao plano de
                  lavra.
                </li>
                <li>
                  Monitoramento de KPIs operacionais (<strong>DF, UT, produtividade e tempo de ciclo</strong>), com
                  foco na identificação rápida de desvios.
                </li>
                <li>
                  Participação ativa na implantação do <strong>MineTrack (Sodep)</strong>, incluindo parametrização
                  de frota e frentes de lavra.
                </li>
                <li>
                  Interface entre operação e manutenção para tratamento de inconsistências e otimização da frota.
                </li>
                <li>
                  Criação da ferramenta inicial de <strong>Short Interval Control (SIC)</strong> para acompanhamento
                  horário e suporte à decisão no CCO.
                </li>
              </ul>
            </div>
          </div>

          <div className="exp-tags">
            {[
              'Gestão de Frotas',
              'MineTrack (Sodep)',
              'Análise de Dados',
              'Short Interval Control',
              'Custom BRE',
              'Curto Prazo',
            ].map((t) => (
              <span key={t} className="exp-tag">
                {t}
              </span>
            ))}
          </div>
        </article>

        {/* ARCELORMITTAL */}
        <article className="exp-card reveal">
          <div className="exp-top">
            <div>
              <h3 className="exp-company">ARCELORMITTAL BRASIL</h3>
              <div className="exp-loc">João Monlevade, MG · Tempo integral (1 ano)</div>
            </div>
            <div className="exp-meta">
              <span className="exp-period">JAN 2025 — DEZ 2025</span>
              <span className="exp-badge">CONCLUÍDO</span>
            </div>
          </div>
          <div className="exp-role">Estagiário em Supply Chain | MRO e Recursos Minerários</div>
          <ul className="exp-list">
            <li>
              Suporte ao planejamento e gestão da cadeia de suprimentos (Supply Chain), com foco no abastecimento
              estratégico dos processos de <strong>sinterização e alto forno</strong>.
            </li>
            <li>
              Apoio no controle de fluxo e gestão de estoque de matérias-primas críticas —{' '}
              <strong>minério de ferro, calcário, areia, coque e magnesita</strong> — essenciais à produção de aço.
            </li>
            <li>
              Execução técnica de lançamentos e conferências via <strong>SAP MM e NetWeaver</strong>, garantindo
              integridade de dados de pesagem, movimentação de materiais e validação de parâmetros fiscais (CFOP e
              tributos).
            </li>
          </ul>
          <div className="exp-tags">
            {['SAP MM', 'SAP NetWeaver', 'Matéria-Prima', 'Supply Chain', 'Follow-up', 'Conformidade Fiscal'].map(
              (t) => (
                <span key={t} className="exp-tag">
                  {t}
                </span>
              )
            )}
          </div>
        </article>

        {/* PH INTRALOGÍSTICA */}
        <article className="exp-card reveal">
          <div className="exp-top">
            <div>
              <h3 className="exp-company">PH INTRALOGÍSTICA E SERVIÇOS</h3>
              <div className="exp-loc">João Monlevade, MG · Meio período (7 meses)</div>
            </div>
            <div className="exp-meta">
              <span className="exp-period">JUL 2024 — JAN 2025</span>
              <span className="exp-badge">CONCLUÍDO</span>
            </div>
          </div>
          <div className="exp-role">Aprendiz de Operações · Logística Siderúrgica</div>
          <ul className="exp-list">
            <li>
              Controle operacional e logístico de transporte e limpeza industrial mecanizada em ambiente
              siderúrgico.
            </li>
            <li>
              Monitoramento de KPIs de frota, disponibilidade de ativos e produtividade por meio de análise técnica
              de dados com <strong>Microsoft Power BI</strong>.
            </li>
            <li>
              Execução de checklists de equipamentos pesados e interface direta com frentes de serviço para
              otimização de recursos e conformidade com padrões de segurança e qualidade.
            </li>
          </ul>
          <div className="exp-tags">
            {['Coordenação de Equipe', 'Microsoft Power BI', 'KPIs de Frota', 'Segurança Operacional'].map((t) => (
              <span key={t} className="exp-tag">
                {t}
              </span>
            ))}
          </div>
        </article>

        {/* CONSTRUTORA HELMO */}
        <article className="exp-card reveal">
          <div className="exp-top">
            <div>
              <h3 className="exp-company">CONSTRUTORA HELMO</h3>
              <div className="exp-loc">João Monlevade, MG · Estágio (5 meses)</div>
            </div>
            <div className="exp-meta">
              <span className="exp-period">MAR 2024 — JUL 2024</span>
              <span className="exp-badge">CONCLUÍDO</span>
            </div>
          </div>
          <div className="exp-role">Estagiário Técnico | Administrativo Financeiro</div>
          <ul className="exp-list">
            <li>
              Processamento de lançamentos fiscais e conciliação contábil no setor de infraestrutura.
            </li>
            <li>
              Monitoramento e controle de custos operacionais (<strong>OPEX</strong>) e de capital (
              <strong>CAPEX</strong>), apoiando a gestão orçamentária e a análise de desvios.
            </li>
            <li>
              Organização de dados financeiros e suporte ao acompanhamento de medições e obrigações via Sieg e
              Excel.
            </li>
          </ul>
          <div className="exp-tags">
            {['Controle de Custos', 'CAPEX / OPEX', 'Análise Financeira', 'Conciliação Contábil'].map((t) => (
              <span key={t} className="exp-tag">
                {t}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

interface ProjectsProps {
  onOpenLabTab: (tab: LabTab) => void;
}

export function Projects({ onOpenLabTab }: ProjectsProps) {
  return (
    <section className="section" id="projects">
      <div className="sec-header reveal">
        <div className="sec-label">ENGENHARIA DE SOFTWARE APLICADA À MINERAÇÃO</div>
        <h2 className="sec-title">
          Projetos em <span>Destaque</span>
        </h2>
        <p className="sec-subtitle">
          Sistemas reais desenhados para eliminar gargalos operacionais no CCO — da auditoria heurística de
          apontamentos ao controle em tempo real e mineração de dados históricos.
        </p>
      </div>

      <div className="proj-stack">
        {/* PROJETO 1: CUSTOM BRE (NOVO DESTAQUE) */}
        <article className="proj-card reveal">
          <div className="ca ca-tl" />
          <div className="ca ca-tr" />
          <div className="ca ca-bl" />
          <div className="ca ca-br" />
          <div className="proj-inner">
            <div className="proj-info">
              <div className="proj-header-row">
                <span className="proj-tech">JAVASCRIPT (ES6+) · REGEX · UNIX TIMESTAMPS</span>
                <span className="proj-status prod">● EM PRODUÇÃO · BEMISA</span>
              </div>
              <h3 className="proj-title">Algoritmo de Validação Heurística e Auditoria de Frota (Custom BRE)</h3>
              <div className="proj-sub">BUSINESS RULE ENGINE · AGO 2026 — O MOMENTO · CCO MINA PEDRA BRANCA</div>

              <p className="proj-desc">
                Criado para sanar uma lacuna crítica nos sistemas de gestão de frota (FMS) da mineração, que geram
                altos volumes de dados mas carecem de inteligência contextual. Desenvolvi uma aplicação{' '}
                <strong>client-side</strong> que opera como um <strong>Business Rule Engine (BRE)</strong>,
                processando apontamentos brutos e entregando auditoria algorítmica imune a falsos positivos.
              </p>
              <p className="proj-desc">
                Construída integralmente em <strong>JavaScript (ES6+), HTML5 e CSS3</strong>, a ferramenta realiza
                parsing de dados tabulares, aplica taxonomias avançadas de <strong>Regex</strong> para categorizar
                dinamicamente estados produtivos, ociosos ou justificáveis e converte datas/horas para{' '}
                <strong>Unix Timestamps</strong> para calcular interseções temporais exatas — suprimindo alertas
                indevidos quando manutenções sobrepõem intervalos obrigatórios ou trocas de turno.
              </p>

              <div className="proj-impact-box">
                <strong>Impacto imediato:</strong> auditoria diária do CCO reduzida a{' '}
                <strong>frações de segundo</strong> com total confiabilidade, garantindo rastreabilidade exata das
                horas efetivas da frota e protegendo a validação e o faturamento dos contratos de garantia técnica.
              </div>

              <div className="proj-tags">
                {[
                  'CUSTOM BRE',
                  'HEURISTIC VALIDATION',
                  'UNIX TIMESTAMPS',
                  'REGEX TAXONOMY',
                  'D-1 CONTEXT MEMORY',
                  'FLEET AUDIT',
                ].map((t) => (
                  <span key={t} className="proj-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="proj-visual">
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '2.5px',
                  color: 'var(--accent-bright)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <ShieldCheck size={15} />
                ARQUITETURA DO MOTOR HEURÍSTICO
              </div>

              <div className="pipeline-list">
                <div className="pipeline-step">
                  <span className="pipeline-num">01</span>
                  <div>
                    <div className="pipeline-title">PARSING TABULAR &amp; TAXONOMIA REGEX</div>
                    <div className="pipeline-desc">
                      Ingestão de apontamentos brutos do FMS e classificação autônoma entre estados produtivos,
                      ociosos ou justificáveis.
                    </div>
                  </div>
                </div>
                <div className="pipeline-step">
                  <span className="pipeline-num">02</span>
                  <div>
                    <div className="pipeline-title">INTERSEÇÕES EM UNIX TIMESTAMPS</div>
                    <div className="pipeline-desc">
                      Base matemática absoluta que detecta sobreposição com intervalos obrigatórios e trocas de
                      turno, suprimindo falsos positivos.
                    </div>
                  </div>
                </div>
                <div className="pipeline-step">
                  <span className="pipeline-num">03</span>
                  <div>
                    <div className="pipeline-title">MEMÓRIA INTERDIÁRIA (D-1) &amp; BUFFERS</div>
                    <div className="pipeline-desc">
                      Consulta o último registro cronológico do dia anterior para herdar justificativas contínuas
                      em operações 24/7.
                    </div>
                  </div>
                </div>
                <div className="pipeline-step">
                  <span className="pipeline-num">04</span>
                  <div>
                    <div className="pipeline-title">FILTRO DE INATIVIDADE PROLONGADA</div>
                    <div className="pipeline-desc">
                      Descarta equipamentos ociosos de longo prazo para evitar poluição estatística das métricas de
                      garantia técnica.
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="#lab"
                onClick={() => onOpenLabTab('bre')}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '1.8px',
                  color: 'var(--accent-bright)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                TESTAR MOTOR BRE NO LAB AO VIVO
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </article>

        {/* PROJETO 2: SHORT INTERVAL CONTROL (SIC) */}
        <article className="proj-card reveal">
          <div className="ca ca-tl" />
          <div className="ca ca-tr" />
          <div className="ca ca-bl" />
          <div className="ca ca-br" />
          <div className="proj-inner">
            <div className="proj-info">
              <div className="proj-header-row">
                <span className="proj-tech">HTML5 · CSS3 · JAVASCRIPT · MINETRACK</span>
                <span className="proj-status prod">● EM PRODUÇÃO · BEMISA</span>
              </div>
              <h3 className="proj-title">Short Interval Control (SIC) — Sistema de Controle Operacional</h3>
              <div className="proj-sub">INTEGRADO AO DESPACHO · JAN 2026 — O MOMENTO · CCO MINA PEDRA BRANCA</div>

              <p className="proj-desc">
                Sistema de Informação de Controle baseado na metodologia de{' '}
                <strong>Short Interval Control (SIC)</strong>, desenvolvido do zero e aplicado ao CCO da Mina Pedra
                Branca. Integra dados operacionais do sistema de despacho (<strong>MineTrack / Sodep</strong>) para
                acompanhamento em tempo real da produção em janelas horárias.
              </p>
              <p className="proj-desc">
                Automatiza o cálculo de tonelagem por <strong>litologia e tipo de equipamento</strong>, realiza
                controle de metas, projeção de fechamento de turno, eficiência e registro estruturado de paradas
                operacionais — com dashboards de KPIs, timeline produtiva, consolidação por hora/turno e auto-save.
              </p>

              <div className="proj-tags" style={{ marginTop: '24px' }}>
                {[
                  'SHORT INTERVAL CONTROL',
                  'MINETRACK INTEGRATION',
                  'KPI DASHBOARD',
                  'TIMELINE PRODUTIVA',
                  'CONTROLE POR LITOLOGIA',
                  'PIT-TO-PLANT',
                ].map((t) => (
                  <span key={t} className="proj-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="proj-visual">
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '2.5px',
                  color: 'var(--accent-bright)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <TrendingUp size={15} />
                PREVIEW DE TELEMETRIA SIC
              </div>

              <div className="mock-strip">
                <div className="mock-row">
                  <div className="mock-cell">
                    <div className="mock-lbl">PRODUÇÃO ACUM.</div>
                    <div className="mock-val">
                      2.840<span style={{ fontSize: '12px', color: 'var(--text-muted)' }}> t</span>
                    </div>
                  </div>
                  <div className="mock-cell">
                    <div className="mock-lbl">META TURNO</div>
                    <div className="mock-val" style={{ color: 'var(--text-main)' }}>
                      3.200<span style={{ fontSize: '12px', color: 'var(--text-muted)' }}> t</span>
                    </div>
                  </div>
                  <div className="mock-cell">
                    <div className="mock-lbl">ADERÊNCIA</div>
                    <div className="mock-val" style={{ color: 'var(--amber)' }}>
                      88<span style={{ fontSize: '12px', color: 'var(--text-muted)' }}> %</span>
                    </div>
                  </div>
                </div>
                <div className="mock-row">
                  <div className="mock-cell">
                    <div className="mock-lbl">DISP. FÍSICA</div>
                    <div className="mock-val" style={{ color: '#6ee7b7' }}>
                      91<span style={{ fontSize: '12px', color: 'var(--text-muted)' }}> %</span>
                    </div>
                  </div>
                  <div className="mock-cell">
                    <div className="mock-lbl">UTIL. FÍSICA</div>
                    <div className="mock-val">
                      84<span style={{ fontSize: '12px', color: 'var(--text-muted)' }}> %</span>
                    </div>
                  </div>
                  <div className="mock-cell">
                    <div className="mock-lbl">FROTA ATIVA</div>
                    <div className="mock-val">
                      7<span style={{ fontSize: '12px', color: 'var(--text-muted)' }}> / 8</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mock-bars">
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9.5px',
                    letterSpacing: '2px',
                    color: 'var(--text-muted)',
                  }}
                >
                  PRODUÇÃO POR LITOLOGIA
                </div>
                <div className="mock-bar-row">
                  <div className="mock-bar-lbl">HEM</div>
                  <div className="mock-bar-track">
                    <div
                      className="mock-bar-fill"
                      style={{ '--w': '78%', background: 'linear-gradient(90deg, #0ea5c6, #38e2fa)' } as CSSProperties}
                    />
                  </div>
                  <div className="mock-bar-pct">78%</div>
                </div>
                <div className="mock-bar-row">
                  <div className="mock-bar-lbl">GOE</div>
                  <div className="mock-bar-track">
                    <div
                      className="mock-bar-fill"
                      style={{ '--w': '56%', background: 'linear-gradient(90deg, #d97706, #fbbf24)' } as CSSProperties}
                    />
                  </div>
                  <div className="mock-bar-pct">56%</div>
                </div>
                <div className="mock-bar-row">
                  <div className="mock-bar-lbl">EST</div>
                  <div className="mock-bar-track">
                    <div
                      className="mock-bar-fill"
                      style={{ '--w': '42%', background: 'linear-gradient(90deg, #059669, #34d399)' } as CSSProperties}
                    />
                  </div>
                  <div className="mock-bar-pct">42%</div>
                </div>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '1.5px',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                <span>● MINETRACK INTEGRADO · AUTO-SAVE</span>
                <a
                  href="#lab"
                  onClick={() => onOpenLabTab('sic')}
                  style={{ color: 'var(--accent-bright)', textDecoration: 'none' }}
                >
                  SIMULAR TURNO ↗
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* PROJETO 3: KDD COM PYTHON */}
        <article className="proj-card amber reveal">
          <div className="ca ca-tl" />
          <div className="ca ca-tr" />
          <div className="ca ca-bl" />
          <div className="ca ca-br" />
          <div className="proj-inner">
            <div className="proj-info">
              <div className="proj-header-row">
                <span className="proj-tech" style={{ color: '#fbbf24', borderColor: 'var(--amber-border)', background: 'var(--amber-bg)' }}>
                  PYTHON · KDD · DATA MINING
                </span>
                <span className="proj-status dev">◐ EM DESENVOLVIMENTO</span>
              </div>
              <h3 className="proj-title">Análise e Otimização de Produção em Mina com Python (KDD)</h3>
              <div className="proj-sub" style={{ color: '#fbbf24' }}>
                KNOWLEDGE DISCOVERY IN DATABASES · NOV 2025 — O MOMENTO
              </div>

              <p className="proj-desc">
                Desenvolvimento de um sistema de análise de despacho baseado em técnicas de{' '}
                <strong>KDD (Knowledge Discovery in Databases)</strong>, com foco na otimização da operação de mina
                a partir de dados históricos (não simultâneos).
              </p>
              <p className="proj-desc">
                Automatiza a descoberta de padrões ocultos — ciclos anômalos de transporte, frentes com baixa
                produtividade recorrente e equipamentos com alta indisponibilidade não planejada — traduzindo cada
                gargalo em impacto direto de custo hora-máquina e tonelagem movimentada.
              </p>
              <p className="proj-desc">
                <strong>Status atual:</strong> em evolução para <strong>modelos preditivos</strong> de
                produtividade e <strong>automação de diagnósticos operacionais</strong>.
              </p>

              <div className="proj-tags" style={{ marginTop: '24px' }}>
                {[
                  'PYTHON',
                  'KDD',
                  'DATA MINING',
                  'DIAGNÓSTICO AUTOMÁTICO',
                  'MODELOS PREDITIVOS',
                  'ANÁLISE DE CUSTO',
                ].map((t) => (
                  <span key={t} className="proj-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="proj-visual">
              <div className="code-terminal">
                <div className="code-terminal-bar">
                  <div className="code-dots">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Code size={12} />
                    kdd_fleet_diagnostics.py
                  </span>
                </div>
                <div className="code-body">
                  <div style={{ color: '#64748b' }}># Descoberta de ciclos anômalos em base histórica FMS</div>
                  <div>
                    <span style={{ color: '#38bdf8' }}>import</span> pandas <span style={{ color: '#38bdf8' }}>as</span> pd
                  </div>
                  <div>
                    <span style={{ color: '#34d399' }}>df_cycles</span> = pd.read_parquet(
                    <span style={{ color: '#fbbf24' }}>&quot;minetrack_history.parquet&quot;</span>)
                  </div>
                  <div>
                    <span style={{ color: '#34d399' }}>gargalos</span> = detectar_anomalias(df_cycles, z_thresh=
                    <span style={{ color: '#f472b6' }}>2.5</span>)
                  </div>
                  <div style={{ marginTop: '6px' }}>
                    <span style={{ color: '#c084fc' }}>print</span>(f
                    <span style={{ color: '#fbbf24' }}>
                      &quot;Gargalos críticos: &#123;len(gargalos)&#125; | Perda est.: &#123;gargalos.ton_lost:.0f&#125; t&quot;
                    </span>
                    )
                  </div>
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: '2.5px',
                    color: 'var(--text-muted)',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Terminal size={13} color="var(--amber)" />
                  ROADMAP KDD
                </div>
                <div className="roadmap-list">
                  <div className="roadmap-item">
                    <span className="rm-dot done" />
                    Coleta e estruturação de dados históricos de despacho
                  </div>
                  <div className="roadmap-item">
                    <span className="rm-dot done" />
                    Pré-processamento, higienização e engenharia de atributos
                  </div>
                  <div className="roadmap-item current">
                    <span className="rm-dot current" />
                    Mineração de padrões e detecção de gargalos ← atual
                  </div>
                  <div className="roadmap-item pending">
                    <span className="rm-dot pending" />
                    Modelos preditivos de queda de produtividade
                  </div>
                  <div className="roadmap-item pending">
                    <span className="rm-dot pending" />
                    Automação de diagnósticos operacionais por turno
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'var(--text-muted)',
                }}
              >
                <Briefcase size={13} color="var(--amber)" />
                FOCO: REDUÇÃO DE CUSTO HORA-MÁQUINA &amp; PREVISIBILIDADE
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
