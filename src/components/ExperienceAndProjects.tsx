import { ArrowDownRight } from 'lucide-react';
import type { LabTab } from './SicDemo';
import type { Translation } from '../i18n';

interface ExpProps {
  t: Translation;
}

export function Experience({ t }: ExpProps) {
  return (
    <section className="section" id="experience">
      <div className="sec-header reveal">
        <div className="sec-kicker">{t.experience.kicker}</div>
        <h2 className="sec-title">{t.experience.title}</h2>
      </div>

      <div className="exp-list-wrap">
        {t.experience.items.map((item, idx) => {
          const isCurrent = Boolean(item.subroles?.some((sr) => sr.current));
          return (
            <article key={item.company} className={`exp-row reveal stagger-${(idx % 3) + 1}`}>
              <div className="exp-meta-col">
                <div className="exp-period">{item.period}</div>
                <div className="exp-loc">{item.location}</div>
                {item.sublocation && <div className="exp-loc">{item.sublocation}</div>}
              </div>

              <div className="exp-timeline-rail" aria-hidden="true">
                <span className={`exp-node ${isCurrent ? 'current' : ''}`} />
              </div>

              <div className={`exp-card spotlight-card ${isCurrent ? 'is-current' : ''}`}>
                <h3 className="exp-company">{item.company}</h3>

                {item.subroles ? (
                  <div className="exp-subroles">
                    {item.subroles.map((sr) => (
                      <div key={sr.title} className="exp-subrole-item">
                        <div className="exp-subrole-head">
                          <div className={`exp-subrole-name ${sr.current ? 'current' : ''}`}>
                            {sr.current && <span className="beacon-dot beacon-sm" aria-hidden="true" />}
                            <span>{sr.title}</span>
                          </div>
                          <span className="exp-subrole-period">{sr.period}</span>
                        </div>
                        <ul className="exp-bullets">
                          {sr.bullets.map((b, bIdx) => (
                            <li key={bIdx}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {item.roleTitle && <div className="exp-role-title">{item.roleTitle}</div>}
                    {item.bullets && (
                      <ul className="exp-bullets">
                        {item.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

interface ProjectsProps {
  onOpenLabTab: (tab: LabTab) => void;
  t: Translation;
}

export function Projects({ onOpenLabTab, t }: ProjectsProps) {
  return (
    <section className="section" id="projects">
      <div className="sec-header reveal">
        <div className="sec-kicker">{t.projects.kicker}</div>
        <h2 className="sec-title">{t.projects.title}</h2>
        <p className="sec-subtitle">{t.projects.subtitle}</p>
      </div>

      <div className="case-list">
        {t.projects.items.map((item, idx) => (
          <article key={item.title} className={`case-card spotlight-card reveal stagger-${(idx % 3) + 1}`}>
            <div className="case-top">
              <div>
                <div className="case-meta">
                  <span className="case-num">{String(idx + 1).padStart(2, '0')}</span>
                  <span>{item.meta}</span>
                </div>
                <h3 className="case-title">{item.title}</h3>
              </div>
              <span className={`case-badge ${item.badgeType}`}>
                <span className="badge-dot" aria-hidden="true" />
                {item.badge}
              </span>
            </div>

            <div className="case-grid">
              <div>
                <div className="case-col-label">{item.problemLabel}</div>
                <p className="case-col-text">{item.problem}</p>
              </div>
              <div>
                <div className="case-col-label">{item.approachLabel}</div>
                <p className="case-col-text">{item.approach}</p>
              </div>
              <div>
                <div className="case-col-label">{item.resultLabel}</div>
                <p className="case-col-text">{item.result}</p>
              </div>
            </div>

            <div className="case-footer">
              <div className="tag-row" style={{ marginTop: 0 }}>
                {item.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              {item.actionLabel && item.actionTab && (
                <a
                  href="#lab"
                  className="case-action"
                  onClick={() => onOpenLabTab(item.actionTab!)}
                >
                  <span>{item.actionLabel}</span>
                  <ArrowDownRight size={15} className="case-action-icon" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
