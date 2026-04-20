export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="sec-label reveal">TRAJETÓRIA</div>
      <h2 className="sec-title reveal">Experiência <span>Profissional</span></h2>

      <div className="exp-wrap">
        <div className="exp-item reveal">
          <div className="exp-meta">
            <span>DEZ 2025 , PRESENTE</span>
            <span className="exp-badge active">● EM ATIVIDADE</span>
          </div>
          <div className="exp-company">BEMISA HOLDING S.A.</div>
          <div className="exp-role">OPERADOR DE SALA DE CONTROLE (CRO) , MINA PEDRA BRANCA</div>
          <ul className="exp-list">
            <li>Implantação completa do sistema de despacho MineTrack (Sodep): infraestrutura embarcada, parametrização de frotas, frentes de lavra, litologias e rotas operacionais.</li>
            <li>Gerenciamento em tempo real do fluxo produtivo pit-to-plant, garantindo aderência ao plano de lavra e metas de produtividade.</li>
            <li>Monitoramento de KPIs de frota (DF, UT, produtividade) e gestão técnica de indisponibilidades e desvios operacionais.</li>
            <li>Interface com equipes de operação, manutenção e fornecedor Sodep para resolução de inconsistências e evolução contínua do sistema.</li>
            <li>Desenvolvimento do Sistema de Informação de Controle (SIC) integrado ao MineTrack, com dashboards operacionais em HTML/CSS/JS.</li>
          </ul>
        </div>

        <div className="exp-item reveal">
          <div className="exp-meta">
            <span>JAN 2025 , DEZ 2025</span>
            <span className="exp-badge">ENCERRADO</span>
          </div>
          <div className="exp-company">ARCELORMITTAL BRASIL</div>
          <div className="exp-role">ESTAGIÁRIO EM SUPRIMENTOS , MRO E MATÉRIA-PRIMA</div>
          <ul className="exp-list">
            <li>Suporte ao planejamento e gestão da cadeia de suprimentos com foco no abastecimento de sinterização e alto forno.</li>
            <li>Controle de estoques críticos (minério de ferro, calcário, coque) via SAP MM e NetWeaver.</li>
            <li>Validação de parâmetros fiscais (CFOP e tributos) e integridade de dados de pesagem e movimentação de materiais.</li>
          </ul>
        </div>

        <div className="exp-item reveal">
          <div className="exp-meta">
            <span>JUL 2024 , JAN 2025</span>
            <span className="exp-badge">ENCERRADO</span>
          </div>
          <div className="exp-company">PH INTRALOGÍSTICA</div>
          <div className="exp-role">ASSISTENTE DE OPERAÇÕES , LOGÍSTICA SIDERÚRGICA</div>
          <ul className="exp-list">
            <li>Controle operacional e logístico de transporte de gusa e escória em ambiente de alto forno.</li>
            <li>Monitoramento de KPIs de frota, disponibilidade de ativos e produtividade por análise técnica de dados.</li>
            <li>Execução de checklists de equipamentos pesados e interface com frentes de serviço para otimização de recursos.</li>
          </ul>
        </div>

        <div className="exp-item reveal">
          <div className="exp-meta">
            <span>MAR 2024 , JUL 2024</span>
            <span className="exp-badge">ENCERRADO</span>
          </div>
          <div className="exp-company">CONSTRUTORA HELMO</div>
          <div className="exp-role">ESTAGIÁRIO TÉCNICO , CONTROLADORIA</div>
          <ul className="exp-list">
            <li>Gestão de custos de infraestrutura: CAPEX, OPEX e análise de desvios orçamentários (budget vs. actual).</li>
            <li>Processamento de medições de serviços e lançamentos financeiros via Sieg e Excel.</li>
            <li>Monitoramento de obrigações financeiras e fluxo de caixa de projetos de infraestrutura.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Project() {
  return (
    <section className="section" id="project">
      <div className="sec-label reveal">PROJETO DESTAQUE</div>
      <h2 className="sec-title reveal">Short Interval <span>Control</span></h2>

      <div className="proj-card reveal">
        <div className="ca ca-tl"></div><div className="ca ca-tr"></div><div className="ca ca-bl"></div><div className="ca ca-br"></div>
        <div className="proj-inner">
          <div className="proj-info">
            <div className="proj-tech">⬡ &nbsp;HTML · CSS · JAVASCRIPT</div>
            <div className="proj-title">SIC , Sistema de Controle por Intervalo</div>
            <div className="proj-sub">INTEGRADO AO MINETRACK · CCO BEMISA</div>
            <p className="proj-desc">Sistema web de Short Interval Control desenvolvido do zero e integrado ao sistema de despacho MineTrack (Sodep), permitindo monitoramento da produção em janelas horárias com rastreamento por litologia, frente e equipamento. Inclui importação automatizada de dados via paste, cálculo em tempo real de KPIs, registro estruturado de paradas e desvios, dashboards operacionais e auto-save. Ferramenta em uso ativo no CCO da Mina Pedra Branca.</p>
            <div className="proj-tags">
              {['SHORT INTERVAL CONTROL', 'MINETRACK INTEGRATION', 'KPI DASHBOARD', 'REAL-TIME MONITORING', 'FLEET MANAGEMENT', 'PIT-TO-PLANT'].map(t => (
                <span key={t} className="proj-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="proj-visual">
            <div className="mock-strip">
              <div className="mock-row">
                <div className="mock-cell"><div className="mock-lbl">PRODUÇÃO ACUM.</div><div className="mock-val" style={{ color: 'var(--accent2)' }}>2.840<span style={{ fontSize: '11px', color: 'var(--muted)' }}> t</span></div></div>
                <div className="mock-cell"><div className="mock-lbl">META TURNO</div><div className="mock-val" style={{ color: 'var(--text)' }}>3.200<span style={{ fontSize: '11px', color: 'var(--muted)' }}> t</span></div></div>
                <div className="mock-cell"><div className="mock-lbl">ADERÊNCIA</div><div className="mock-val" style={{ color: 'var(--yellow)' }}>88<span style={{ fontSize: '11px', color: 'var(--muted)' }}> %</span></div></div>
              </div>
              <div className="mock-row">
                <div className="mock-cell"><div className="mock-lbl">DISP. FÍSICA</div><div className="mock-val">91<span style={{ fontSize: '11px', color: 'var(--muted)' }}> %</span></div></div>
                <div className="mock-cell"><div className="mock-lbl">UTIL. FÍSICA</div><div className="mock-val">84<span style={{ fontSize: '11px', color: 'var(--muted)' }}> %</span></div></div>
                <div className="mock-cell"><div className="mock-lbl">CAMINHÕES ATI.</div><div className="mock-val">6<span style={{ fontSize: '11px', color: 'var(--muted)' }}> / 8</span></div></div>
              </div>
            </div>
            <div className="mock-bars">
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '7px', letterSpacing: '3px', color: 'var(--muted2)', marginBottom: '4px' }}>PRODUÇÃO POR LITOLOGIA</div>
              <div className="mock-bar-row"><div className="mock-bar-lbl">HEM</div><div className="mock-bar-track"><div className="mock-bar-fill" style={{ '--w': '78%', background: '#cc3a2a' } as React.CSSProperties}></div></div><div className="mock-bar-pct">78%</div></div>
              <div className="mock-bar-row"><div className="mock-bar-lbl">OPE</div><div className="mock-bar-track"><div className="mock-bar-fill" style={{ '--w': '56%', background: '#d4882a' } as React.CSSProperties}></div></div><div className="mock-bar-pct">56%</div></div>
              <div className="mock-bar-row"><div className="mock-bar-lbl">ISA</div><div className="mock-bar-track"><div className="mock-bar-fill" style={{ '--w': '42%', background: '#7a9e88' } as React.CSSProperties}></div></div><div className="mock-bar-pct">42%</div></div>
            </div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '7px', letterSpacing: '2px', color: 'var(--muted2)' }}>● MINETRACK IMPORTADO &nbsp;·&nbsp; ● AUTO-SAVE ATIVO</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function KDD() {
  return (
    <section className="section" id="kdd">
      <div className="sec-label reveal">PROJETO EM DESENVOLVIMENTO</div>
      <h2 className="sec-title reveal">Análise e Otimização <span>com Python</span></h2>

      <div className="proj-card reveal" style={{ opacity: .93 }}>
        <div className="ca ca-tl"></div><div className="ca ca-tr"></div><div className="ca ca-bl"></div><div className="ca ca-br"></div>
        <div style={{ position: 'absolute', top: '20px', right: '20px', fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', letterSpacing: '3px', padding: '5px 12px', border: '1px solid var(--accent)', borderRadius: '2px', color: 'var(--accent)', background: 'var(--accent-glow)', zIndex: 2 }}>◐ EM DESENVOLVIMENTO</div>

        <div style={{ padding: '40px 48px' }}>
          <div className="proj-tech" style={{ color: 'var(--accent)' }}>⬡ &nbsp;PYTHON · KDD · DATA MINING</div>
          <div className="proj-title">KDD Aplicado à Operação de Mina</div>
          <div className="proj-sub" style={{ color: 'var(--accent)', opacity: .8 }}>KNOWLEDGE DISCOVERY IN DATABASES · NOV 2025 · PRESENTE</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', marginTop: '28px' }}>
            <div>
              <p className="proj-desc" style={{ marginBottom: '12px' }}>Projeto de análise operacional baseado no processo KDD (Knowledge Discovery in Databases), aplicado sobre dados históricos de despacho de mina. O objetivo central é automatizar a identificação de padrões ocultos na operação · ciclos anômalos de transporte, frentes com baixa produtividade recorrente, equipamentos com alta taxa de indisponibilidade não planejada · que passariam despercebidos em análises manuais.</p>
              <p className="proj-desc" style={{ marginBottom: '12px' }}>Cada padrão identificado é diretamente traduzido em impacto de custo operacional: tempo improdutivo de frota representa custo hora-máquina desperdiçado, gargalos no ciclo de carregamento reduzem a tonelagem por turno e aumentam o custo unitário de movimentação. O sistema estrutura esses diagnósticos de forma automatizada, eliminando a dependência de análise manual e permitindo respostas mais rápidas a desvios recorrentes.</p>
              <p className="proj-desc" style={{ marginBottom: '24px' }}>A evolução prevista inclui modelos preditivos capazes de antecipar quedas de produtividade antes que ocorram, com base em variáveis históricas como composição de frota, condições de turno e sequência de frentes lavradas.</p>
              <div className="proj-tags">
                <span className="proj-tag" style={{ borderColor: 'var(--border-focus)', color: 'var(--accent)' }}>PYTHON</span>
                <span className="proj-tag" style={{ borderColor: 'var(--border-focus)', color: 'var(--accent)' }}>KDD</span>
                <span className="proj-tag" style={{ borderColor: 'var(--border-focus)', color: 'var(--accent)' }}>DATA MINING</span>
                <span className="proj-tag" style={{ borderColor: 'var(--border-focus)', color: 'var(--accent)' }}>PADRÕES OPERACIONAIS</span>
                <span className="proj-tag" style={{ borderColor: 'var(--border-focus)', color: 'var(--accent)' }}>ANÁLISE DE CUSTO</span>
                <span className="proj-tag" style={{ borderColor: 'var(--border-focus)', color: 'var(--accent)' }}>MODELOS PREDITIVOS</span>
                <span className="proj-tag" style={{ borderColor: 'var(--border-focus)', color: 'var(--accent)' }}>AUTOMAÇÃO DE DIAGNÓSTICOS</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', letterSpacing: '3px', color: 'var(--muted2)', marginBottom: '14px' }}>EXEMPLO DE ANÁLISE (PYTHON)</div>
                <div style={{ background: '#1e1e1e', border: '1px solid #333', borderRadius: '6px', padding: '16px', fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', textAlign: 'left' }}>
                  <div style={{ color: 'var(--muted)', marginBottom: '8px' }}># Analisando ciclos anômalos na frota de transporte</div>
                  <span style={{ color: '#569cd6' }}>import</span> <span style={{ color: '#d4d4d4' }}>pandas</span> <span style={{ color: '#569cd6' }}>as</span> <span style={{ color: '#d4d4d4' }}>pd</span><br />
                  <span style={{ color: '#4ec9b0' }}>df_fms</span> <span style={{ color: '#d4d4d4' }}>= pd.read_sql(</span><span style={{ color: '#ce9178' }}>"SELECT * FROM minetrack_cycles WHERE status='DOWN'"</span><span style={{ color: '#d4d4d4' }}>)</span><br />
                  <span style={{ color: '#4ec9b0' }}>anomalias</span> <span style={{ color: '#d4d4d4' }}>= detectar_gargalo(df_fms, tempo_limite=</span><span style={{ color: '#b5cea8' }}>45</span><span style={{ color: '#d4d4d4' }}>)</span><br /><br />
                  <span style={{ color: '#c586c0' }}>print</span><span style={{ color: '#d4d4d4' }}>(</span><span style={{ color: '#d4d4d4' }}>f</span><span style={{ color: '#ce9178' }}>"Ociosidade reduzida: &#x7B;</span><span style={{ color: '#9cdcfe' }}>anomalias.impacto_caixa</span><span style={{ color: '#ce9178' }}>&#x7D; M$"</span><span style={{ color: '#d4d4d4' }}>)</span>
                </div>
              </div>

              <div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', letterSpacing: '3px', color: 'var(--muted2)', marginBottom: '14px' }}>ROADMAP DO PROJETO</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent-glow)', flexShrink: 0 }}></div><div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', letterSpacing: '1px', color: 'var(--text-muted)' }}>Coleta e estruturação de dados históricos</div></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent-glow)', flexShrink: 0 }}></div><div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', letterSpacing: '1px', color: 'var(--text-muted)' }}>Pré-processamento e limpeza dos dados</div></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, animation: 'kdd-pulse 1.5s ease-in-out infinite' }}></div><div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', letterSpacing: '1px', color: 'var(--accent)' }}>Mineração e identificação de padrões ← atual</div></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: .38 }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', border: '1px solid var(--border)', flexShrink: 0 }}></div><div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', letterSpacing: '1px', color: 'var(--muted)' }}>Modelos preditivos de produtividade</div></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: .38 }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', border: '1px solid var(--border)', flexShrink: 0 }}></div><div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', letterSpacing: '1px', color: 'var(--muted)' }}>Automação de diagnósticos operacionais</div></div>
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', letterSpacing: '3px', color: 'var(--muted2)', marginBottom: '14px' }}>IMPACTOS ESPERADOS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ background: 'var(--panel2)', border: '1px solid var(--border)', borderRadius: '3px', padding: '10px 14px', borderLeft: '2px solid var(--accent)' }}><div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', letterSpacing: '2px', color: 'var(--accent)', marginBottom: '3px' }}>REDUÇÃO DE CUSTO UNITÁRIO</div><div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Identificação de ciclos anômalos que elevam o custo hora-máquina por tonelagem movida</div></div>
                  <div style={{ background: 'var(--panel2)', border: '1px solid var(--border)', borderRadius: '3px', padding: '10px 14px', borderLeft: '2px solid var(--accent)' }}><div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', letterSpacing: '2px', color: 'var(--accent)', marginBottom: '3px' }}>ELIMINAÇÃO DE GARGALOS RECORRENTES</div><div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Diagnóstico automático de frentes e equipamentos com padrões sistemáticos de baixo desempenho</div></div>
                  <div style={{ background: 'var(--panel2)', border: '1px solid var(--border)', borderRadius: '3px', padding: '10px 14px', borderLeft: '2px solid var(--accent)' }}><div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', letterSpacing: '2px', color: 'var(--accent)', marginBottom: '3px' }}>ANTECIPAÇÃO DE DESVIOS</div><div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Modelos preditivos para antecipar quedas de produtividade antes que gerem impacto no resultado do turno</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
