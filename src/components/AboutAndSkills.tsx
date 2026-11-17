import type { CSSProperties } from 'react';
import { Award, Cpu, Database, GraduationCap, ShieldCheck } from 'lucide-react';

export function About() {
  return (
    <section className="section" id="about">
      <div className="sec-header reveal">
        <div className="sec-label">PERFIL PROFISSIONAL</div>
        <h2 className="sec-title">
          Sobre <span>mim</span>
        </h2>
      </div>

      <div className="about-grid">
        <div className="about-text reveal">
          <p>
            Graduando em <strong>Engenharia de Minas (UEMG — 8° Período)</strong> e{' '}
            <strong>Técnico em Mineração</strong>, foco minha atuação na convergência entre excelência
            operacional e transformação digital no setor mineral.
          </p>
          <p>
            Atualmente, integro o <strong>Centro de Controle Operacional (CCO) da Bemisa — Mina Pedra Branca</strong>{' '}
            como <strong>Técnico de Sala de Controle I</strong>, onde atuei diretamente na implantação do sistema
            de despacho <strong>MineTrack (Sodep)</strong>. Minha rotina abrange desde a parametrização técnica
            de frotas e frentes de lavra até a estruturação de indicadores críticos de performance (
            <strong>DF, UT, produtividade e tempo de ciclo</strong>), garantindo a integridade dos dados e a
            confiabilidade do sistema.
          </p>
          <p>
            Em paralelo à operação em tempo real, desenvolvo ferramentas digitais próprias em{' '}
            <strong>JavaScript (ES6+), HTML5, CSS3 e Python</strong> — incluindo o sistema{' '}
            <strong>Short Interval Control (SIC)</strong> e o{' '}
            <strong>Algoritmo de Validação Heurística e Auditoria de Frota (Custom BRE)</strong>, reduzindo a
            auditoria diária do CCO a frações de segundo com proteção contratual e estatística.
          </p>
          <p>
            Experiências anteriores na <strong>ArcelorMittal Brasil</strong> (Supply Chain via SAP MM/NetWeaver),{' '}
            <strong>PH Intralogística</strong> (Operações e Power BI) e <strong>Construtora Helmo</strong>{' '}
            (CAPEX/OPEX) complementam uma visão integrada entre operação, manutenção e gestão de custos.
          </p>

          <div className="about-highlights">
            <span className="about-chip">GESTÃO DE FROTAS</span>
            <span className="about-chip">SALAS DE CONTROLE (CCO)</span>
            <span className="about-chip">GESTÃO DE STAKEHOLDERS</span>
            <span className="about-chip">JAVASCRIPT ES6+ · CSS3</span>
            <span className="about-chip">MINERAÇÃO 4.0</span>
          </div>
        </div>

        <div className="skills-card reveal">
          <div className="skills-card-title">MATRIZ DE PROFICIÊNCIA</div>
          <div className="skills-list">
            <SkillRow name="CONTROLE OPERACIONAL (CCO)" pct="100%" level="PRINCIPAL" color="var(--accent-bright)" />
            <SkillRow name="DESPACHO FMS · MINETRACK (SODEP)" pct="96%" level="PRINCIPAL" color="var(--accent-bright)" />
            <SkillRow name="JAVASCRIPT (ES6+) · HTML5 · CSS3" pct="88%" level="AVANÇADO" color="var(--emerald)" />
            <SkillRow name="ANÁLISE DE DADOS · POWER BI · EXCEL" pct="85%" level="AVANÇADO" color="var(--emerald)" />
            <SkillRow name="SAP MM · NETWEAVER" pct="78%" level="AVANÇADO" color="var(--text-secondary)" />
            <SkillRow name="PYTHON · KDD · DATA MINING" pct="72%" level="INTERMEDIÁRIO+" color="var(--amber)" />
            <SkillRow name="QGIS · ARCGIS · AUTOCAD" pct="65%" level="INTERMEDIÁRIO" color="var(--text-muted)" />
            <SkillRow name="INGLÊS · FRANCÊS TÉCNICO" pct="75%" level="PROFISSIONAL" color="var(--text-secondary)" />
          </div>
        </div>
      </div>
    </section>
  );
}

interface SkillRowProps {
  name: string;
  pct: string;
  level: string;
  color: string;
}

function SkillRow({ name, pct, level, color }: SkillRowProps) {
  return (
    <div className="skill-row">
      <div className="skill-head">
        <div className="skill-name">{name}</div>
        <div className="skill-level" style={{ color }}>
          {level}
        </div>
      </div>
      <div className="skill-bar">
        <div className="skill-fill" style={{ '--w': pct } as CSSProperties} />
      </div>
    </div>
  );
}

export function Skills() {
  const stack = [
    'MINETRACK · SODEP',
    'SHORT INTERVAL CONTROL (SIC)',
    'BUSINESS RULE ENGINE (BRE)',
    'JAVASCRIPT ES6+',
    'HTML5 · CSS3',
    'REGEX · UNIX TIMESTAMPS',
    'PYTHON · KDD',
    'POWER BI',
    'EXCEL AVANÇADO',
    'SAP MM',
    'SAP NETWEAVER',
    'QGIS · ARCGIS',
    'AUTOCAD',
    'SIEG',
    'NR-12',
    'RESPONSIBLESTEEL',
  ];

  return (
    <section className="section" id="skills">
      <div className="sec-header reveal">
        <div className="sec-label">COMPETÊNCIAS</div>
        <h2 className="sec-title">
          Áreas de <span>Atuação</span>
        </h2>
      </div>

      <div className="comp-grid reveal">
        <div className="comp-block">
          <div className="comp-name">
            <ShieldCheck size={19} />
            OPERAÇÕES DE MINA
          </div>
          <ul className="comp-list">
            <li>Controle de Frota em Tempo Real (FMS)</li>
            <li>Short Interval Control (SIC)</li>
            <li>Aderência ao Plano de Lavra &amp; Curto Prazo</li>
            <li>Monitoramento Integrado Pit-to-Plant</li>
            <li>Gestão de Down-time e Garantia Técnica</li>
            <li>Interface Operação · Manutenção · Stakeholders</li>
          </ul>
        </div>

        <div className="comp-block">
          <div className="comp-name">
            <Cpu size={19} />
            SISTEMAS &amp; ENGENHARIA DIGITAL
          </div>
          <ul className="comp-list">
            <li>MineTrack (Sodep) — Implantação &amp; Parametrização</li>
            <li>Business Rule Engine (BRE) Client-Side</li>
            <li>JavaScript (ES6+), Regex &amp; Unix Timestamps</li>
            <li>HTML5, CSS3 &amp; Dashboards Operacionais</li>
            <li>Python (KDD &amp; Diagnósticos Automatizados)</li>
            <li>SAP MM / NetWeaver · QGIS · AutoCAD</li>
          </ul>
        </div>

        <div className="comp-block">
          <div className="comp-name">
            <Database size={19} />
            ANÁLISE &amp; GESTÃO
          </div>
          <ul className="comp-list">
            <li>KPIs Operacionais (DF, UT, Produtividade, Ciclo)</li>
            <li>Auditoria Algorítmica de Apontamentos</li>
            <li>Microsoft Power BI &amp; Excel Avançado</li>
            <li>Supply Chain de Recursos Minerários e MRO</li>
            <li>Controle Orçamentário CAPEX / OPEX</li>
            <li>Conformidade Fiscal (CFOP e Tributos)</li>
          </ul>
        </div>
      </div>

      <div className="sec-label reveal" style={{ marginBottom: '18px' }}>
        FERRAMENTAS &amp; TECNOLOGIAS
      </div>
      <div className="tools-wrap reveal">
        {stack.map((item) => (
          <span key={item} className="tool">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

export function Education() {
  const certifications = [
    { name: 'Implementing a Software Automation Strategy', by: 'SKILLSOFT' },
    { name: 'Software Product Management: Mapping & Planning', by: 'SKILLSOFT' },
    { name: 'Gestão de Projetos de Software', by: 'IFRS' },
    { name: 'ResponsibleSteel — Padrão Internacional de Mineração', by: 'ARCELORMITTAL' },
    { name: 'NR-12 — Segurança em Máquinas e Equipamentos', by: 'CERTIFICAÇÃO TÉCNICA' },
    { name: 'Cybersecurity Awareness Programme', by: 'ARCELORMITTAL' },
    { name: 'Inglês & Francês — Leitura Técnica Profissional', by: 'IFRS' },
  ];

  return (
    <section className="section" id="education">
      <div className="sec-header reveal">
        <div className="sec-label">FORMAÇÃO ACADÊMICA &amp; CREDENCIAIS</div>
        <h2 className="sec-title">
          Educação &amp; <span>Certificações</span>
        </h2>
      </div>

      <div className="form-grid reveal">
        <article className="form-card">
          <div className="form-top">
            <div className="form-inst" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <GraduationCap size={15} />
              UEMG — UNIVERSIDADE DO ESTADO DE MINAS GERAIS
            </div>
            <span className="form-pill">8° PERÍODO</span>
          </div>
          <h3 className="form-degree">Bacharelado em Engenharia de Minas</h3>
          <div className="form-period">MAR 2023 — DEZ 2027 · EM ANDAMENTO</div>
          <p className="form-desc">
            Formação com foco em gestão estratégica e técnica de toda a cadeia mineral, com ênfase em lavra,
            geologia aplicada e planejamento de mina. Competências em eficiência operacional e análise de dados
            industriais consolidadas na ArcelorMittal e aplicadas diariamente na Bemisa no monitoramento
            integrado pit-to-plant.
          </p>
          <div className="form-progress-wrap">
            <div className="form-progress-meta">
              <span>PROGRESSO DA GRADUAÇÃO</span>
              <span style={{ color: 'var(--accent-bright)' }}>8 / 10 PERÍODOS (80%)</span>
            </div>
            <div className="form-progress-track">
              <div className="form-progress-fill" style={{ width: '80%' }} />
            </div>
          </div>
        </article>

        <article className="form-card">
          <div className="form-top">
            <div className="form-inst" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <GraduationCap size={15} />
              CENTRO EDUCACIONAL ROBERTO PORTO
            </div>
            <span className="form-pill done">CONCLUÍDO</span>
          </div>
          <h3 className="form-degree">Ensino Técnico em Mineração</h3>
          <div className="form-period">AGO 2022 — JUL 2024 · FORMAÇÃO TÉCNICA</div>
          <p className="form-desc">
            Formação técnica voltada para operações de lavra, beneficiamento mineral e gestão de recursos.
            Desenvolvimento de competências em análise de dados operacionais para controle de produção e custos,
            além de domínio em AutoCAD e caracterização de minérios em laboratório.
          </p>
          <div className="form-progress-wrap">
            <div className="form-progress-meta">
              <span>HABILITAÇÃO TÉCNICA</span>
              <span style={{ color: '#6ee7b7' }}>100% CONCLUÍDO</span>
            </div>
            <div className="form-progress-track">
              <div
                className="form-progress-fill"
                style={{ width: '100%', background: 'linear-gradient(90deg, #059669, #34d399)' }}
              />
            </div>
          </div>
        </article>
      </div>

      <div className="sec-label reveal" style={{ marginBottom: '18px' }}>
        CERTIFICAÇÕES ({certifications.length})
      </div>
      <div className="certs-grid reveal">
        {certifications.map((cert) => (
          <div key={cert.name} className="cert-card">
            <div className="cert-left">
              <Award size={16} className="cert-icon" />
              <div className="cert-name">{cert.name}</div>
            </div>
            <span className="cert-by">{cert.by}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
