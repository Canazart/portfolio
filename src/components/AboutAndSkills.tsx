import type { Translation } from '../i18n';

interface SectionProps {
  t: Translation;
}

export function About({ t }: SectionProps) {
  return (
    <section className="section" id="about">
      <div className="sec-header reveal">
        <div className="sec-kicker">{t.about.kicker}</div>
        <h2 className="sec-title">{t.about.title}</h2>
      </div>

      <div className="about-grid">
        <div className="about-text reveal">
          {t.about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <aside className="focus-panel spotlight-card reveal stagger-2" aria-label={t.about.focusAria}>
          {t.about.focusGroups.map((g, idx) => (
            <div key={g.title} className="focus-group">
              <div className="focus-head">
                <span className="focus-num">{String(idx + 1).padStart(2, '0')}</span>
                <div className="focus-title">{g.title}</div>
              </div>
              <div className="focus-desc">{g.desc}</div>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

export function Education({ t }: SectionProps) {
  return (
    <section className="section" id="education">
      <div className="sec-header reveal">
        <div className="sec-kicker">{t.education.kicker}</div>
        <h2 className="sec-title">{t.education.title}</h2>
      </div>

      <div className="edu-grid reveal">
        {t.education.degrees.map((d) => (
          <article key={d.inst} className="edu-card spotlight-card">
            <div className="edu-inst">{d.inst}</div>
            <h3 className="edu-degree">{d.degree}</h3>
            <div className="edu-period">{d.period}</div>
            <p className="edu-desc">{d.desc}</p>
          </article>
        ))}
      </div>

      <div className="sec-kicker reveal" style={{ marginBottom: '14px' }}>
        {t.education.certsKicker}
      </div>
      <div className="certs-list reveal">
        {t.education.certs.map((cert) => (
          <div key={cert.name} className="cert-item">
            <div className="cert-name">
              <span className="cert-dot" aria-hidden="true" />
              <span>{cert.name}</span>
            </div>
            <span className="cert-by">{cert.by}</span>
          </div>
        ))}
      </div>

      <div className="sec-kicker reveal" style={{ marginBottom: '14px' }}>
        {t.education.stackKicker}
      </div>
      <div className="stack-grid reveal">
        {t.education.stackCols.map((col, idx) => (
          <div key={col.title} className={`stack-col spotlight-card stagger-${(idx % 3) + 1}`}>
            <div className="stack-col-title">{col.title}</div>
            <ul className="stack-list">
              {col.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
