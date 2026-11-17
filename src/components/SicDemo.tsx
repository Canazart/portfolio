import { useState, useEffect, useRef } from 'react';
import {
  Activity,
  ChevronRight,
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

export type LabTab = 'bre' | 'sic';

interface SicDemoProps {
  activeTab: LabTab;
  onTabChange: (tab: LabTab) => void;
}

const META = 3200;
const INTERVAL_MS = 3500;

interface HoraData {
  label: string;
  hem: number;
  goe: number;
  df: number;
  cam: number;
  eventos: string[];
  isBreak?: boolean;
}

const HORAS: HoraData[] = [
  { label: '07:00–08:00', hem: 215, goe: 118, df: 91, cam: 7, eventos: ['Turno A iniciado · Frota sincronizada no MineTrack'] },
  { label: '08:00–09:00', hem: 232, goe: 122, df: 92, cam: 7, eventos: ['Produção acima da meta horária (354 t)'] },
  { label: '09:00–10:00', hem: 190, goe: 88, df: 86, cam: 6, eventos: ['CB-03 em manutenção corretiva · Rebalanceamento de fila'] },
  { label: '10:00–11:00', hem: 244, goe: 132, df: 91, cam: 7, eventos: ['Recuperação de ritmo · Frente Sul em alta produtividade'] },
  { label: '11:00–12:00', hem: 224, goe: 112, df: 91, cam: 7, eventos: ['Ritmo estabilizado dentro da aderência'] },
  { label: '12:00–12:30', hem: 0, goe: 0, df: 91, cam: 7, eventos: ['Intervalo operacional de almoço'], isBreak: true },
  { label: '12:30–13:30', hem: 206, goe: 104, df: 88, cam: 6, eventos: ['Retomada pós-almoço · CB-03 em inspeção final'] },
  { label: '13:30–14:30', hem: 252, goe: 138, df: 95, cam: 8, eventos: ['Frota completa (8/8) · Pico produtivo do turno'] },
  { label: '14:30–15:00', hem: 126, goe: 68, df: 95, cam: 8, eventos: ['Fechamento de turno acima da meta projetada'] },
];

const EQUIPAMENTOS = ['CB-01', 'CB-02', 'CB-03', 'CB-04', 'CB-05', 'CB-06', 'CB-07', 'CB-08'];
const DOWN_HORAS: Record<number, string[]> = { 2: ['CB-03'], 6: ['CB-03'] };

export default function SicDemo({ activeTab, onTabChange }: SicDemoProps) {
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
      name: hr.label.split('–')[0],
      HEM: hr.hem,
      GOE: hr.goe,
    });

    hr.eventos.forEach((ev) => {
      const lower = ev.toLowerCase();
      const type =
        lower.includes('manutenção') || lower.includes('desvio')
          ? 'bad'
          : lower.includes('recup') || lower.includes('retomada') || lower.includes('almoço')
          ? 'warn'
          : 'ok';
      allEvents.unshift({ ev, type });
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
        <div className="sec-label">DEMONSTRAÇÕES INTERATIVAS</div>
        <h2 className="sec-title">
          Lab Operacional <span>ao Vivo</span>
        </h2>
        <p className="sec-subtitle">
          Teste diretamente no navegador os dois sistemas construídos para o CCO da Bemisa: o motor editável de{' '}
          <strong>Auditoria Heurística de Frota (Custom BRE · R0–R7)</strong> e o simulador horário de{' '}
          <strong>Short Interval Control (SIC)</strong>.
        </p>
      </div>

      <div className="lab-tabs reveal" role="tablist" aria-label="Selecionar demonstração">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'bre'}
          className={`lab-tab ${activeTab === 'bre' ? 'active' : ''}`}
          onClick={() => onTabChange('bre')}
        >
          <ShieldCheck size={14} />
          CUSTOM BRE · AUDITORIA R0–R7
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'sic'}
          className={`lab-tab ${activeTab === 'sic' ? 'active' : ''}`}
          onClick={() => onTabChange('sic')}
        >
          <Activity size={14} />
          SIC · CONTROLE HORÁRIO
        </button>
      </div>

      <div className="reveal">
        {activeTab === 'bre' ? (
          <BreSimulator />
        ) : (
          <div className="lab-shell">
            <div className="ca ca-tl" />
            <div className="ca ca-tr" />
            <div className="ca ca-bl" />
            <div className="ca ca-br" />

            {/* HEADER */}
            <div className="sic-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 180 200"
                  style={{ filter: 'drop-shadow(0 0 6px var(--accent-glow))' }}
                >
                  <polygon points="90,10 160,50 90,90 20,50" fill="var(--accent)" opacity="0.5" />
                  <polygon points="20,50 90,90 90,170 20,130" fill="var(--accent2)" opacity="0.32" />
                  <polygon points="160,50 90,90 90,170 160,130" fill="var(--accent)" opacity="0.22" />
                </svg>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '16px',
                      fontWeight: 700,
                      letterSpacing: '2px',
                      color: 'var(--accent-bright)',
                    }}
                  >
                    SHORT INTERVAL CONTROL (SIC)
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9.5px',
                      letterSpacing: '1.5px',
                      color: 'var(--text-muted)',
                    }}
                  >
                    SIMULAÇÃO DE TURNO COM DADOS FICTÍCIOS · CCO MINA PEDRA BRANCA
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    letterSpacing: '2px',
                    lineHeight: 1,
                  }}
                >
                  {horaAtual >= HORAS.length ? '15:00' : nextH.label.split('–')[0]}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9.5px',
                    letterSpacing: '1.5px',
                    color: 'var(--accent)',
                  }}
                >
                  TURNO A · JANELA {horaAtual} / {HORAS.length}
                </div>
              </div>
            </div>

            {/* KPI STRIP */}
            <div className="sic-kpi-strip">
              <div className="sic-kpi">
                <div className="sic-kpi-lbl">PRODUÇÃO ACUM.</div>
                <div className="sic-kpi-val">{prodAcum.toLocaleString('pt-BR')}</div>
                <div className="sic-kpi-u">toneladas</div>
              </div>
              <div className="sic-kpi">
                <div className="sic-kpi-lbl">PROJEÇÃO TURNO</div>
                <div
                  className="sic-kpi-val"
                  style={{
                    color: horaAtual === 0 ? 'var(--text-muted)' : estimativa >= META ? '#6ee7b7' : '#fda4af',
                  }}
                >
                  {horaAtual === 0 ? '—' : estimativa.toLocaleString('pt-BR')}
                </div>
                <div
                  className="sic-kpi-u"
                  style={{
                    color: horaAtual === 0 ? 'var(--text-dim)' : estimativa >= META ? '#6ee7b7' : '#fda4af',
                  }}
                >
                  {horaAtual === 0
                    ? 'aguardando dados'
                    : `${estimativa >= META ? '+' : ''}${(estimativa - META).toLocaleString('pt-BR')} t vs meta`}
                </div>
              </div>
              <div className="sic-kpi">
                <div className="sic-kpi-lbl">ADERÊNCIA</div>
                <div
                  className="sic-kpi-val"
                  style={{
                    color:
                      horaAtual === 0
                        ? 'var(--text-muted)'
                        : aderGlobal >= 95
                        ? '#6ee7b7'
                        : aderGlobal >= 82
                        ? '#fbbf24'
                        : '#fda4af',
                  }}
                >
                  {horaAtual === 0 ? '0' : aderGlobal}%
                </div>
                <div className="sic-kpi-u">à meta horária</div>
              </div>
              <div className="sic-kpi">
                <div className="sic-kpi-lbl">DISP. FÍSICA</div>
                <div className="sic-kpi-val" style={{ color: 'var(--accent-bright)' }}>
                  {df}%
                </div>
                <div className="sic-kpi-u">frota ativa</div>
              </div>
              <div className="sic-kpi">
                <div className="sic-kpi-lbl">CAMINHÕES</div>
                <div className="sic-kpi-val" style={{ color: 'var(--text-main)' }}>
                  {cam} / 8
                </div>
                <div className="sic-kpi-u">em operação</div>
              </div>
            </div>

            {/* META PROGRESS BAR */}
            <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px', color: 'var(--text-muted)' }}>
                  PROGRESSO DA META DO TURNO · 3.200 t
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '1.5px', color: 'var(--accent-bright)' }}>
                  {pctMeta}% concluído
                </div>
              </div>
              <div style={{ height: '7px', background: 'rgba(148,163,184,0.14)', borderRadius: '999px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${pctMeta}%`,
                    background:
                      pctMeta >= 85
                        ? 'linear-gradient(90deg, var(--accent2), #34d399)'
                        : pctMeta >= 55
                        ? 'linear-gradient(90deg, var(--accent2), var(--accent-bright))'
                        : 'linear-gradient(90deg, #d97706, #fbbf24)',
                    transition: 'width 0.7s ease',
                  }}
                />
              </div>
            </div>

            {/* BODY */}
            <div className="sic-body">
              <div className="sic-main-col">
                {horaAtual > 0 && (
                  <div style={{ height: '185px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 6, right: 6, left: -18, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" vertical={false} />
                        <XAxis dataKey="name" stroke="#849bb3" fontSize={10} tick={{ fontFamily: 'JetBrains Mono, monospace' }} />
                        <YAxis stroke="#849bb3" fontSize={10} tick={{ fontFamily: 'JetBrains Mono, monospace' }} />
                        <Tooltip
                          cursor={{ fill: 'rgba(20, 184, 212, 0.08)' }}
                          contentStyle={{
                            backgroundColor: '#091220',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontFamily: 'JetBrains Mono, monospace',
                            color: '#f1f6fb',
                          }}
                        />
                        <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'JetBrains Mono, monospace' }} />
                        <Bar dataKey="HEM" stackId="a" fill="var(--accent)" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="GOE" stackId="a" fill="var(--amber)" radius={[3, 3, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                <div className="sic-table-wrap">
                  <table className="sic-table">
                    <thead>
                      <tr>
                        <th className="sic-td-h" style={{ color: 'var(--text-muted)' }}>JANELA</th>
                        <th className="sic-td-h" style={{ textAlign: 'center', color: 'var(--accent-bright)' }}>HEM</th>
                        <th className="sic-td-h" style={{ textAlign: 'center', color: '#fbbf24' }}>GOE</th>
                        <th className="sic-td-h" style={{ textAlign: 'center', color: 'var(--text-main)' }}>TOTAL</th>
                        <th className="sic-td-h" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {HORAS.map((hr, idx) => {
                        let statusStr = '·';
                        let statusColor = 'var(--text-dim)';
                        let rowClass = 'sic-tr-future';

                        if (idx < horaAtual) {
                          rowClass = 'sic-tr-done';
                          if (!hr.isBreak) {
                            const tot = hr.hem + hr.goe;
                            const adH = (tot / (META / totalNonBreak)) * 100;
                            statusStr = adH >= 85 ? '✔ OK' : adH >= 70 ? '▲ ALERTA' : '✖ DESVIO';
                            statusColor = adH >= 85 ? '#6ee7b7' : adH >= 70 ? '#fbbf24' : '#fda4af';
                          }
                        } else if (idx === horaAtual) {
                          rowClass = 'sic-tr-active';
                        }

                        if (hr.isBreak) {
                          return (
                            <tr key={hr.label} className={rowClass}>
                              <td className="sic-td-h" style={{ color: '#fbbf24' }}>{hr.label}</td>
                              <td className="sic-td" colSpan={4} style={{ color: '#fbbf24', letterSpacing: '1.5px', fontSize: '10px' }}>
                                INTERVALO DE ALMOÇO
                              </td>
                            </tr>
                          );
                        }

                        const show = idx < horaAtual;
                        return (
                          <tr key={hr.label} className={rowClass}>
                            <td className="sic-td-h">{hr.label}</td>
                            <td className="sic-td">{show ? hr.hem.toLocaleString('pt-BR') : '·'}</td>
                            <td className="sic-td">{show ? hr.goe.toLocaleString('pt-BR') : '·'}</td>
                            <td className="sic-td" style={{ fontWeight: 600 }}>
                              {show ? (hr.hem + hr.goe).toLocaleString('pt-BR') : '·'}
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
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px', color: 'var(--accent-bright)', marginBottom: '12px' }}>
                    PRODUÇÃO ACUMULADA POR LITOLOGIA
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontFamily: 'var(--font-mono)', fontSize: '10.5px' }}>
                        <span style={{ color: 'var(--accent-bright)' }}>HEMATITA (HEM)</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{hemAcum.toLocaleString('pt-BR')} t</span>
                      </div>
                      <div style={{ height: '7px', background: 'rgba(148,163,184,0.14)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${Math.min(100, (hemAcum / (META * 0.65)) * 100)}%`,
                            background: 'linear-gradient(90deg, var(--accent2), var(--accent-bright))',
                            transition: 'width 0.7s ease',
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontFamily: 'var(--font-mono)', fontSize: '10.5px' }}>
                        <span style={{ color: '#fbbf24' }}>GOETITA (GOE)</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{goeAcum.toLocaleString('pt-BR')} t</span>
                      </div>
                      <div style={{ height: '7px', background: 'rgba(148,163,184,0.14)', borderRadius: '999px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${Math.min(100, (goeAcum / (META * 0.45)) * 100)}%`,
                            background: 'linear-gradient(90deg, #d97706, #fbbf24)',
                            transition: 'width 0.7s ease',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px', color: 'var(--accent-bright)', marginBottom: '12px' }}>
                    STATUS DA FROTA (8 UNIDADES)
                  </div>
                  <div className="equip-grid">
                    {EQUIPAMENTOS.map((eq) => (
                      <div key={eq} className={`equip ${downs.includes(eq) ? 'equip-down' : 'equip-ok'}`}>
                        {eq}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px', color: 'var(--accent-bright)', marginBottom: '10px' }}>
                    LOG DE OCORRÊNCIAS DO CCO
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '72px' }}>
                    {allEvents.length === 0 ? (
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                        Clique em &quot;Iniciar Turno&quot; ou &quot;+1 Janela&quot; para simular...
                      </div>
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

            {/* FOOTER CONTROLS */}
            <div className="sic-footer">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={toggleSim}
                  disabled={horaAtual >= HORAS.length}
                  className="btn-primary"
                  style={{
                    padding: '10px 18px',
                    fontSize: '13px',
                    opacity: horaAtual >= HORAS.length ? 0.5 : 1,
                    cursor: horaAtual >= HORAS.length ? 'default' : 'pointer',
                  }}
                >
                  {horaAtual >= HORAS.length ? (
                    <>
                      <Square size={13} /> TURNO ENCERRADO
                    </>
                  ) : playing ? (
                    <>
                      <Pause size={13} /> PAUSAR
                    </>
                  ) : (
                    <>
                      <Play size={13} /> {horaAtual === 0 ? 'INICIAR TURNO' : 'SIMULAR AUTO'}
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={stepOneHour}
                  disabled={horaAtual >= HORAS.length}
                  className="btn-secondary"
                  style={{
                    padding: '10px 14px',
                    opacity: horaAtual >= HORAS.length ? 0.45 : 1,
                    cursor: horaAtual >= HORAS.length ? 'default' : 'pointer',
                  }}
                >
                  +1 JANELA
                  <ChevronRight size={14} />
                </button>

                <button
                  type="button"
                  onClick={resetSim}
                  className="btn-ghost"
                  style={{ padding: '10px 12px' }}
                  title="Reiniciar simulação"
                  aria-label="Reiniciar simulação"
                >
                  <RotateCcw size={14} />
                </button>

                {playing && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-bright)' }}>
                    PRÓXIMA EM {cdSec}s
                  </span>
                )}
              </div>

              <div className="sic-footer-note">● SIC SIMULADO · DADOS FICTÍCIOS</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
