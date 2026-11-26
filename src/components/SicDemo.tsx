import { useState, useEffect, useRef } from 'react';
import {
  Activity,
  ChevronRight,
  Cpu,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  Square,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import BreSimulator from './BreSimulator';
import DimSimulator from './DimSimulator';
import type { Lang, Translation } from '../i18n';

export type LabTab = 'dim' | 'bre' | 'sic';

interface SicDemoProps {
  activeTab: LabTab;
  onTabChange: (tab: LabTab) => void;
  lang: Lang;
  t: Translation;
}

const META = 3200;
const INTERVAL_MS = 3500;

interface HoraData {
  start: string;
  end: string;
  hem: number;
  goe: number;
  df: number;
  cam: number;
  eventType: 'ok' | 'warn' | 'bad';
  isBreak?: boolean;
}

const HORAS: HoraData[] = [
  { start: '07:00', end: '08:00', hem: 215, goe: 118, df: 91, cam: 7, eventType: 'ok' },
  { start: '08:00', end: '09:00', hem: 232, goe: 122, df: 92, cam: 7, eventType: 'ok' },
  { start: '09:00', end: '10:00', hem: 190, goe: 88, df: 86, cam: 6, eventType: 'bad' },
  { start: '10:00', end: '11:00', hem: 244, goe: 132, df: 91, cam: 7, eventType: 'warn' },
  { start: '11:00', end: '12:00', hem: 224, goe: 112, df: 91, cam: 7, eventType: 'ok' },
  { start: '12:00', end: '12:30', hem: 0, goe: 0, df: 91, cam: 7, eventType: 'warn', isBreak: true },
  { start: '12:30', end: '13:30', hem: 206, goe: 104, df: 88, cam: 6, eventType: 'warn' },
  { start: '13:30', end: '14:30', hem: 252, goe: 138, df: 95, cam: 8, eventType: 'ok' },
  { start: '14:30', end: '15:00', hem: 126, goe: 68, df: 95, cam: 8, eventType: 'ok' },
];

const EQUIPAMENTOS = ['CB-01', 'CB-02', 'CB-03', 'CB-04', 'CB-05', 'CB-06', 'CB-07', 'CB-08'];
const DOWN_HORAS: Record<number, string[]> = { 2: ['CB-03'], 6: ['CB-03'] };

const LOCALE_MAP: Record<Lang, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
  zh: 'zh-CN',
};

export default function SicDemo({ activeTab, onTabChange, lang, t }: SicDemoProps) {
  const ts = t.sic;
  const locale = LOCALE_MAP[lang];

  const [playing, setPlaying] = useState(false);
  const [horaAtual, setHoraAtual] = useState(3);
  const [cdSec, setCdSec] = useState(0);
  const timerRef = useRef<number | null>(null);
  const cdRef = useRef<number | null>(null);

  const stopAllTimers = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (cdRef.current) {
      clearInterval(cdRef.current);
      cdRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopAllTimers();
  }, []);

  const stopSim = () => {
    setPlaying(false);
    stopAllTimers();
    setCdSec(0);
  };

  const startSim = () => {
    if (horaAtual >= HORAS.length) return;
    setPlaying(true);
    setCdSec(Math.ceil(INTERVAL_MS / 1000));

    if (cdRef.current) clearInterval(cdRef.current);
    cdRef.current = window.setInterval(() => {
      setCdSec((s) => (s > 1 ? s - 1 : Math.ceil(INTERVAL_MS / 1000)));
    }, 1000);

    setHoraAtual((prev) => Math.min(HORAS.length, prev + 1));

    timerRef.current = window.setInterval(() => {
      setHoraAtual((prev) => {
        const next = prev + 1;
        if (next >= HORAS.length) {
          stopSim();
          return HORAS.length;
        }
        return next;
      });
    }, INTERVAL_MS);
  };

  const toggleSim = () => {
    if (horaAtual >= HORAS.length) return;
    if (playing) {
      stopSim();
    } else {
      startSim();
    }
  };

  const stepOneHour = () => {
    if (horaAtual >= HORAS.length) return;
    stopSim();
    setHoraAtual((prev) => Math.min(HORAS.length, prev + 1));
  };

  const resetSim = () => {
    stopSim();
    setHoraAtual(0);
  };

  let prodAcum = 0;
  let hemAcum = 0;
  let goeAcum = 0;
  const allEvents: { ev: string; type: 'ok' | 'warn' | 'bad' }[] = [];
  const chartData: { name: string; HEM: number; GOE: number }[] = [];

  for (let i = 0; i < horaAtual; i++) {
    const hr = HORAS[i];
    if (!hr.isBreak) {
      prodAcum += hr.hem + hr.goe;
      hemAcum += hr.hem;
      goeAcum += hr.goe;
    }

    chartData.push({
      name: hr.start,
      HEM: hr.hem,
      GOE: hr.goe,
    });

    const evList = ts.events[i] || [];
    evList.forEach((ev) => {
      allEvents.unshift({ ev, type: hr.eventType });
    });
  }

  const currentH = horaAtual > 0 ? HORAS[horaAtual - 1] : HORAS[0];
  const nextH = HORAS[Math.min(horaAtual, HORAS.length - 1)];

  const nonBreak = HORAS.slice(0, horaAtual).filter((x) => !x.isBreak).length;
  const totalNonBreak = HORAS.filter((x) => !x.isBreak).length;
  const ritmoMedio = nonBreak > 0 ? prodAcum / nonBreak : 0;
  const horasRestantes = totalNonBreak - nonBreak;
  const estimativa = Math.round(prodAcum + ritmoMedio * horasRestantes);
  const aderGlobal = nonBreak > 0 ? Math.round((prodAcum / ((META / totalNonBreak) * nonBreak)) * 100) : 0;
  const pctMeta = Math.min(100, Math.round((prodAcum / META) * 100));

  const df = horaAtual > 0 ? currentH.df : 91;
  const cam = horaAtual > 0 ? currentH.cam : 7;
  const downs = DOWN_HORAS[horaAtual - 1] || [];

  return (
    <section className="section" id="lab">
      <div className="sec-header reveal">
        <div className="sec-kicker">{t.lab.kicker}</div>
        <h2 className="sec-title">{t.lab.title}</h2>
        <p className="sec-subtitle">{t.lab.subtitle}</p>
      </div>

      <div className="lab-tabs reveal" role="tablist" aria-label={t.lab.ariaTabs}>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'dim'}
          className={`lab-tab ${activeTab === 'dim' ? 'active' : ''}`}
          onClick={() => onTabChange('dim')}
        >
          <Cpu size={15} />
          {t.lab.tabDim}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'bre'}
          className={`lab-tab ${activeTab === 'bre' ? 'active' : ''}`}
          onClick={() => onTabChange('bre')}
        >
          <ShieldCheck size={15} />
          {t.lab.tabBre}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'sic'}
          className={`lab-tab ${activeTab === 'sic' ? 'active' : ''}`}
          onClick={() => onTabChange('sic')}
        >
          <Activity size={15} />
          {t.lab.tabSic}
        </button>
      </div>

      <div className="reveal">
        {activeTab === 'dim' ? (
          <DimSimulator lang={lang} />
        ) : activeTab === 'bre' ? (
          <BreSimulator t={t} />
        ) : (
          <div className="lab-shell">
            <div className="lab-bar">
              <div className="lab-bar-lead">
                <span className={`beacon-dot ${playing ? 'live' : ''}`} aria-hidden="true" />
                <div>
                  <div className="lab-bar-title">{ts.title}</div>
                  <div className="lab-bar-sub">{ts.subtitle}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="sic-clock">
                  {horaAtual >= HORAS.length ? '15:00' : nextH.start}
                </div>
                <div className="lab-bar-sub">{ts.shiftWindow(horaAtual, HORAS.length)}</div>
              </div>
            </div>

            <div className="sic-kpi-strip">
              <div className="sic-kpi">
                <div className="sic-kpi-lbl">{ts.kpiAccum}</div>
                <div className="sic-kpi-val">{prodAcum.toLocaleString(locale)}</div>
                <div className="sic-kpi-u">{ts.tons}</div>
              </div>
              <div className="sic-kpi">
                <div className="sic-kpi-lbl">{ts.kpiProj}</div>
                <div
                  className="sic-kpi-val"
                  style={{
                    color: horaAtual === 0 ? 'var(--text-muted)' : estimativa >= META ? 'var(--ok)' : 'var(--danger)',
                  }}
                >
                  {horaAtual === 0 ? '0' : estimativa.toLocaleString(locale)}
                </div>
                <div
                  className="sic-kpi-u"
                  style={{
                    color: horaAtual === 0 ? 'var(--text-dim)' : estimativa >= META ? 'var(--ok)' : 'var(--danger)',
                  }}
                >
                  {horaAtual === 0
                    ? ts.waitingData
                    : `${estimativa >= META ? '+' : ''}${(estimativa - META).toLocaleString(locale)} ${ts.vsTarget}`}
                </div>
              </div>
              <div className="sic-kpi">
                <div className="sic-kpi-lbl">{ts.kpiAdherence}</div>
                <div
                  className="sic-kpi-val"
                  style={{
                    color:
                      horaAtual === 0
                        ? 'var(--text-muted)'
                        : aderGlobal >= 95
                        ? 'var(--ok)'
                        : aderGlobal >= 82
                        ? 'var(--warn)'
                        : 'var(--danger)',
                  }}
                >
                  {horaAtual === 0 ? '0' : aderGlobal}%
                </div>
                <div className="sic-kpi-u">{ts.toHourlyTarget}</div>
              </div>
              <div className="sic-kpi">
                <div className="sic-kpi-lbl">{ts.kpiPa}</div>
                <div className="sic-kpi-val">{df}%</div>
                <div className="sic-kpi-u">{ts.activeFleet}</div>
              </div>
              <div className="sic-kpi">
                <div className="sic-kpi-lbl">{ts.kpiTrucks}</div>
                <div className="sic-kpi-val">{cam} / 8</div>
                <div className="sic-kpi-u">{ts.operating}</div>
              </div>
            </div>

            <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                  {ts.targetProgress}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text)' }}>
                  {pctMeta}% {ts.completed}
                </div>
              </div>
              <div className="sic-progress-track">
                <div
                  className="sic-progress-fill"
                  style={{
                    width: `${pctMeta}%`,
                  }}
                />
              </div>
            </div>

            <div className="sic-body">
              <div className="sic-main-col">
                {horaAtual > 0 && (
                  <div style={{ height: '185px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,162,75,0.12)" vertical={false} />
                        <XAxis dataKey="name" stroke="#8f8c83" fontSize={11} tick={{ fontFamily: 'JetBrains Mono, monospace' }} />
                        <YAxis stroke="#8f8c83" fontSize={11} tick={{ fontFamily: 'JetBrains Mono, monospace' }} />
                        <Tooltip
                          cursor={{ fill: 'rgba(201, 162, 75, 0.08)' }}
                          contentStyle={{
                            backgroundColor: '#111318',
                            border: '1px solid rgba(201, 162, 75, 0.32)',
                            borderRadius: '6px',
                            fontSize: '11.5px',
                            fontFamily: 'JetBrains Mono, monospace',
                            color: '#f3f1eb',
                          }}
                        />
                        <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }} />
                        <Bar dataKey="HEM" stackId="a" fill="#d6b15c" />
                        <Bar dataKey="GOE" stackId="a" fill="#8b7040" radius={[3, 3, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                <div className="sic-table-wrap">
                  <table className="sic-table">
                    <thead>
                      <tr>
                        <th className="sic-td-h" style={{ color: 'var(--text-muted)' }}>{ts.colWindow}</th>
                        <th className="sic-td-h" style={{ textAlign: 'center', color: 'var(--accent-signal)' }}>HEM</th>
                        <th className="sic-td-h" style={{ textAlign: 'center', color: 'var(--accent)' }}>GOE</th>
                        <th className="sic-td-h" style={{ textAlign: 'center', color: 'var(--text)' }}>{ts.colTotal}</th>
                        <th className="sic-td-h" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{ts.colStatus}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {HORAS.map((hr, idx) => {
                        let statusStr = '...';
                        let statusColor = 'var(--text-dim)';
                        let rowClass = 'sic-tr-future';
                        const label = `${hr.start} ${ts.timeSep} ${hr.end}`;

                        if (idx < horaAtual) {
                          rowClass = 'sic-tr-done';
                          if (!hr.isBreak) {
                            const tot = hr.hem + hr.goe;
                            const adH = (tot / (META / totalNonBreak)) * 100;
                            statusStr = adH >= 85 ? ts.statusOk : adH >= 70 ? ts.statusWarn : ts.statusDev;
                            statusColor = adH >= 85 ? 'var(--ok)' : adH >= 70 ? 'var(--warn)' : 'var(--danger)';
                          }
                        } else if (idx === horaAtual) {
                          rowClass = 'sic-tr-active';
                        }

                        if (hr.isBreak) {
                          return (
                            <tr key={hr.start} className={rowClass}>
                              <td className="sic-td-h" style={{ color: 'var(--warn)' }}>{label}</td>
                              <td className="sic-td" colSpan={4} style={{ color: 'var(--warn)', fontSize: '11px' }}>
                                {ts.breakLabel}
                              </td>
                            </tr>
                          );
                        }

                        const show = idx < horaAtual;
                        return (
                          <tr key={hr.start} className={rowClass}>
                            <td className="sic-td-h">{label}</td>
                            <td className="sic-td">{show ? hr.hem.toLocaleString(locale) : '...'}</td>
                            <td className="sic-td">{show ? hr.goe.toLocaleString(locale) : '...'}</td>
                            <td className="sic-td" style={{ color: 'var(--text)', fontWeight: 600 }}>
                              {show ? (hr.hem + hr.goe).toLocaleString(locale) : '...'}
                            </td>
                            <td className="sic-td" style={{ color: statusColor }}>
                              {statusStr}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="sic-side-col">
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase' }}>
                    {ts.lithoTitle}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontFamily: 'var(--font-mono)', fontSize: '11.5px' }}>
                        <span style={{ color: 'var(--accent-signal)' }}>{ts.hematite}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{hemAcum.toLocaleString(locale)} t</span>
                      </div>
                      <div style={{ height: '6px', background: 'rgba(201,162,75,0.14)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${Math.min(100, (hemAcum / (META * 0.65)) * 100)}%`,
                            background: 'var(--accent-signal)',
                            transition: 'width 0.5s ease',
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontFamily: 'var(--font-mono)', fontSize: '11.5px' }}>
                        <span style={{ color: 'var(--accent)' }}>{ts.goethite}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{goeAcum.toLocaleString(locale)} t</span>
                      </div>
                      <div style={{ height: '6px', background: 'rgba(201,162,75,0.14)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${Math.min(100, (goeAcum / (META * 0.45)) * 100)}%`,
                            background: '#7d6940',
                            transition: 'width 0.5s ease',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase' }}>
                    {ts.fleetTitle}
                  </div>
                  <div className="equip-grid">
                    {EQUIPAMENTOS.map((eq) => {
                      const isDown = downs.includes(eq);
                      return (
                        <div key={eq} className={`equip ${isDown ? 'equip-down' : 'equip-ok'}`}>
                          <span className="equip-pip" aria-hidden="true" />
                          <span>{eq}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase' }}>
                    {ts.eventsTitle}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '72px' }}>
                    {allEvents.length === 0 ? (
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{ts.eventsEmpty}</div>
                    ) : (
                      allEvents.slice(0, 4).map((e, i) => (
                        <div key={`${e.ev}-${i}`} className={`alerta-${e.type}`}>
                          {e.ev}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lab-footer">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={toggleSim}
                  disabled={horaAtual >= HORAS.length}
                  className="btn-primary"
                  style={{
                    opacity: horaAtual >= HORAS.length ? 0.5 : 1,
                    cursor: horaAtual >= HORAS.length ? 'default' : 'pointer',
                  }}
                >
                  {horaAtual >= HORAS.length ? (
                    <>
                      <Square size={13} /> {ts.btnDone}
                    </>
                  ) : playing ? (
                    <>
                      <Pause size={13} /> {ts.btnPause}
                    </>
                  ) : (
                    <>
                      <Play size={13} /> {horaAtual === 0 ? ts.btnStart : ts.btnAuto}
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={stepOneHour}
                  disabled={horaAtual >= HORAS.length}
                  className="btn-secondary"
                  style={{
                    opacity: horaAtual >= HORAS.length ? 0.45 : 1,
                    cursor: horaAtual >= HORAS.length ? 'default' : 'pointer',
                  }}
                >
                  {ts.btnStep}
                  <ChevronRight size={14} />
                </button>

                <button
                  type="button"
                  onClick={resetSim}
                  className="btn-secondary"
                  style={{ padding: '11px 12px' }}
                  title={ts.resetTitle}
                  aria-label={ts.resetTitle}
                >
                  <RotateCcw size={14} />
                </button>

                {playing && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    {ts.nextWindowIn(cdSec)}
                  </span>
                )}
              </div>

              <div className="lab-footer-note">{ts.footerNote}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
