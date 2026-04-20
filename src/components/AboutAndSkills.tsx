export function About() {
  return (
    <section className="section" id="about">
      <div className="sec-label reveal">PERFIL PROFISSIONAL</div>
      <h2 className="sec-title reveal">Sobre <span>mim</span></h2>

      <div className="about-grid">
        <div className="about-text reveal">
          <p>Graduando em <strong>Engenharia de Minas (UEMG)</strong> e Técnico em Mineração, com atuação direta no <strong>Centro de Controle Operacional (CCO)</strong> da Bemisa , Mina Pedra Branca, desde dezembro de 2025.</p>
          <p>Minha atuação combina dois eixos complementares: a <strong>operação técnica em CCO</strong> , controle de frota em tempo real, aderência ao plano de lavra, análise de KPIs (DF, UT, produtividade) , e o <strong>desenvolvimento de soluções digitais</strong> voltadas à inteligência operacional.</p>
          <p>Participei de forma bastante significativa na <strong>implantação do sistema de despacho MineTrack (Sodep)</strong>, incluindo infraestrutura embarcada, parametrização de frentes, litologias e regras operacionais. Em paralelo, desenvolvo ferramentas próprias em HTML/CSS/JS para controle em curtos intervalos de tempo (SIC).</p>
          <p>Experiências anteriores na <strong>ArcelorMittal</strong> (Supply Chain via SAP) e na <strong>Construtora Helmo</strong> (CAPEX/OPEX) complementam uma visão integrada de operação, manutenção e gestão de custos.</p>
        </div>

        <div className="skills-list reveal">
          <SkillRow name="CONTROLE OPERACIONAL (CCO)" pct="100%" level="PRINCIPAL" color="var(--accent)" />
          <SkillRow name="SISTEMA DE DESPACHO (FMS)" pct="100%" level="PRINCIPAL" color="var(--accent)" />
          <SkillRow name="SAP (MM / NetWeaver)" pct="75%" level="AVANÇADO" color="var(--muted)" />
          <SkillRow name="HTML · CSS · JAVASCRIPT" pct="75%" level="AVANÇADO" color="var(--muted)" />
          <SkillRow name="QGIS · ArcGIS" pct="55%" level="INTERMEDIÁRIO" color="var(--muted2)" />
          <SkillRow name="INGLÊS · FRANCÊS" pct="75%" level="PROFISSIONAL" color="var(--muted)" />
        </div>
      </div>
    </section>
  );
}

function SkillRow({ name, pct, level, color }: { name: string, pct: string, level: string, color: string }) {
  return (
    <div className="skill-row">
      <div className="skill-name">{name}</div>
      <div className="skill-bar"><div className="skill-fill" style={{ '--w': pct } as React.CSSProperties}></div></div>
      <div className="skill-level" style={{ color }}>{level}</div>
    </div>
  );
}

export function Skills() {
  return (
    <section className="section" id="skills">
      <div className="sec-label reveal">COMPETÊNCIAS</div>
      <h2 className="sec-title reveal">Áreas de <span>Atuação</span></h2>

      <div className="comp-grid reveal">
        <div className="comp-block">
          <div className="comp-name">OPERAÇÕES DE MINA</div>
          <div className="comp-items">Controle de Frota (FMS)<br/>Short Interval Control<br/>Plano de Lavra<br/>Pit-to-Plant<br/>Mina a Céu Aberto<br/>Gestão de Down-time</div>
        </div>
        <div className="comp-block" style={{ borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
          <div className="comp-name">SISTEMAS & TECNOLOGIA</div>
          <div className="comp-items">MineTrack (Sodep)<br/>SAP MM / NetWeaver<br/>HTML · CSS · JavaScript<br/>Excel Avançado / Power BI<br/>QGIS · ArcGIS<br/>Plataforma Sieg</div>
        </div>
        <div className="comp-block">
          <div className="comp-name">ANÁLISE & GESTÃO</div>
          <div className="comp-items">KPIs Operacionais (DF, UT)<br/>CAPEX / OPEX<br/>Supply Chain<br/>Gestão de Projetos<br/>Budget vs. Actual<br/>Dashboards Operacionais</div>
        </div>
      </div>

      <div className="sec-label reveal" style={{ marginBottom: '20px' }}>FERRAMENTAS & TECNOLOGIAS</div>
      <div className="tools-wrap reveal">
        {[
          'MINETRACK · SODEP', 'SAP MM', 'SAP NETWEAVER', 'HTML', 'CSS', 'JAVASCRIPT',
          'EXCEL AVANÇADO', 'POWER BI', 'QGIS', 'ARCGIS', 'SIEG', 'NR-12', 'RESPONSIBLESTEEL'
        ].map(t => <span key={t} className="tool">{t}</span>)}
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section className="section">
      <div className="sec-label reveal">FORMAÇÃO</div>
      <h2 className="sec-title reveal">Educação & <span>Certificações</span></h2>

      <div className="form-grid reveal">
        <div className="form-card">
          <div className="form-inst">UEMG , UNIVERSIDADE DO ESTADO DE MINAS GERAIS</div>
          <div className="form-degree">Bacharelado em Engenharia de Minas</div>
          <div className="form-period">MAR 2023 , DEZ 2027 · EM ANDAMENTO</div>
        </div>
        <div className="form-card">
          <div className="form-inst">CENTRO EDUCACIONAL ROBERTO PORTO</div>
          <div className="form-degree">Técnico em Mineração</div>
          <div className="form-period">AGO 2022 , JUL 2024 · CONCLUÍDO</div>
        </div>
      </div>

      <div className="sec-label reveal" style={{ marginBottom: '4px' }}>CERTIFICAÇÕES</div>
      <div className="certs reveal">
        <CertRow name="Implementing a Software Automation Strategy" by="SKILLSOFT" />
        <CertRow name="Software Product Management: Mapping & Planning" by="SKILLSOFT" />
        <CertRow name="Gestão de Projetos de Software" by="IFRS" />
        <CertRow name="ResponsibleSteel , Padrão Internacional de Mineração" by="ARCELORMITTAL" />
        <CertRow name="NR-12 , Segurança em Máquinas e Equipamentos" by="CERTIFICAÇÃO TÉCNICA" />
        <CertRow name="Cybersecurity Awareness Programme" by="ARCELORMITTAL" />
        <CertRow name="Inglês & Francês , Leitura Técnica Profissional" by="IFRS" />
      </div>
    </section>
  );
}

function CertRow({ name, by }: { name: string, by: string }) {
  return (
    <div className="cert-row">
      <div className="cert-dot"></div>
      <div className="cert-name">{name}</div>
      <div className="cert-by">{by}</div>
    </div>
  );
}
