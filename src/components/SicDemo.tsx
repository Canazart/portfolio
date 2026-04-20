import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Square } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const META = 3200;
const INTERVAL_MS = 5000;
const HORAS = [
  { label: '07:00-08:00', hem: 210, goe: 115, df: 91, cam: 7, eventos: [] },
  { label: '08:00-09:00', hem: 230, goe: 120, df: 91, cam: 7, eventos: ['Produção dentro da meta horária'] },
  { label: '09:00-10:00', hem: 195, goe: 90, df: 88, cam: 6, eventos: ['CB-03 em manutenção corretiva'], warn: true },
  { label: '10:00-11:00', hem: 240, goe: 130, df: 91, cam: 7, eventos: ['Recuperação de ritmo após parada'] },
  { label: '11:00-12:00', hem: 220, goe: 110, df: 91, cam: 7, eventos: [] },
  { label: '12:00-12:30', hem: 0, goe: 0, df: 91, cam: 7, eventos: ['Intervalo de almoço, operação suspensa'], isBreak: true },
  { label: '12:30-13:30', hem: 200, goe: 100, df: 88, cam: 6, eventos: ['Retomada pós-almoço'] },
  { label: '13:30-14:30', hem: 245, goe: 135, df: 94, cam: 8, eventos: ['Frota completa, ritmo máximo'] },
  { label: '14:30-15:00', hem: 115, goe: 65, df: 94, cam: 8, eventos: ['Encerramento de turno'] },
];

const EQUIPAMENTOS = ['CB-01', 'CB-02', 'CB-03', 'CB-04', 'CB-05', 'CB-06', 'CB-07', 'CB-08'];
const DOWN_HORAS: Record<number, string[]> = { 2: ['CB-03'], 6: ['CB-03'] };

export default function SicDemo() {
  const [playing, setPlaying] = useState(false);
  const [horaAtual, setHoraAtual] = useState(0);
  const [cdSec, setCdSec] = useState(0);
  const timerRef = useRef<number | null>(null);
  const cdRef = useRef<number | null>(null);

  useEffect(() => {
    return () => stopAllTimers();
  }, []);

  const stopAllTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (cdRef.current) clearInterval(cdRef.current);
  };

  const step = (currentHora: number) => {
    if (currentHora >= HORAS.length) {
      stopSim();
      return;
    }
    
    // Configura o countdown
    setCdSec(INTERVAL_MS / 1000);
    if (cdRef.current) clearInterval(cdRef.current);
    cdRef.current = window.setInterval(() => {
      setCdSec(s => (s > 0 ? s - 1 : 0));
    }, 1000);

    setHoraAtual(currentHora + 1);
  };

  const startSim = () => {
    if (horaAtual >= HORAS.length) return;
    setPlaying(true);
    step(horaAtual);
    timerRef.current = window.setInterval(() => {
      setHoraAtual(prev => {
        const next = prev + 1;
        if (next >= HORAS.length) {
          stopSim();
          return prev;
        }
        setCdSec(INTERVAL_MS / 1000);
        return next;
      });
    }, INTERVAL_MS);
  };

  const pauseSim = () => {
    setPlaying(false);
    stopAllTimers();
  };

  const stopSim = () => {
    setPlaying(false);
    stopAllTimers();
    setCdSec(0);
  };

  const toggleSim = () => {
    if (horaAtual >= HORAS.length) return;
    playing ? pauseSim() : startSim();
  };

  const resetSim = () => {
    stopSim();
    setHoraAtual(0);
  };

  // Computando KPIs acumulados até horaAtual
  let prodAcum = 0;
  let hemAcum = 0;
  let goeAcum = 0;
  let allEvents: { ev: string, type: string }[] = [];
  const chartData = [];

  for (let i = 0; i < horaAtual; i++) {
    const h = HORAS[i];
    if (!h.isBreak) {
      prodAcum += h.hem + h.goe;
      hemAcum += h.hem;
      goeAcum += h.goe;
    }
    
    chartData.push({
      name: h.label.split('-')[0],
      HEM: h.hem,
      GOE: h.goe
    });

    h.eventos.forEach(ev => {
      const type = ev.toLowerCase().includes('manutenção') || ev.toLowerCase().includes('desvio') ? 'bad' 
                 : ev.toLowerCase().includes('recup') || ev.toLowerCase().includes('retomada') ? 'warn' 
                 : 'ok';
      allEvents.unshift({ ev, type }); // unshift to keep recent at top
    });
  }

  const h = horaAtual > 0 ? HORAS[horaAtual - 1] : HORAS[0];
  const nextH = HORAS[Math.min(horaAtual, HORAS.length - 1)];
  
  const nonBreak = HORAS.slice(0, horaAtual).filter(x => !x.isBreak).length;
  const totalNonBreak = HORAS.filter(x => !x.isBreak).length;
  const ritmoMedio = nonBreak > 0 ? prodAcum / nonBreak : 0;
  const horasRestantes = totalNonBreak - nonBreak;
  const estimativa = Math.round(prodAcum + (ritmoMedio * horasRestantes));
  const aderGlobal = nonBreak > 0 ? Math.round((prodAcum / ((META / 8) * nonBreak)) * 100) : 0;
  const pctMeta = Math.min(100, Math.round((prodAcum / META) * 100));

  const df = horaAtual > 0 ? h.df : 91;
  const cam = horaAtual > 0 ? h.cam : 7;
  const downs = DOWN_HORAS[horaAtual - 1] || [];

  return (
    <section className="section" id="sic-demo">
      <div className="sec-label reveal">DEMONSTRAÇÃO INTERATIVA</div>
      <h2 className="sec-title reveal">SIC ao <span>Vivo</span></h2>
      <p className="reveal" style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '-36px', marginBottom: '48px', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '2px' }}>SIMULAÇÃO COM DADOS FICTÍCIOS · AVANCE O TURNO HORA A HORA</p>

      <div className="reveal" style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
        <div className="ca ca-tl"></div><div className="ca ca-tr"></div><div className="ca ca-bl"></div><div className="ca ca-br"></div>

        {/* HEADER */}
        <div style={{ background: 'var(--bg-color)', borderBottom: '1px solid var(--border)', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="22" height="22" viewBox="0 0 180 200" style={{ filter: 'drop-shadow(0 0 4px rgba(20,184,212,0.4))' }}>
              <polygon points="90,10 160,50 90,90 20,50" fill="rgba(20, 184, 212, 0.35)" />
              <polygon points="20,50 90,90 90,170 20,130" fill="rgba(12, 154, 184, 0.2)" />
              <polygon points="160,50 90,90 90,170 160,130" fill="rgba(20, 184, 212, 0.15)" />
            </svg>
            <div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '14px', fontWeight: 700, letterSpacing: '3px', color: 'var(--accent2)' }}>SHORT INTERVAL CONTROL</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', letterSpacing: '2px', color: 'var(--muted2)' }}>SISTEMA DE INFORMAÇÃO DE CONTROLE · SIMULAÇÃO</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '22px', fontWeight: 700, color: 'var(--accent2)', letterSpacing: '3px' }}>
              {nextH?.label.split('-')[0] || "15:00"}
            </div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', letterSpacing: '2px', color: 'var(--muted2)' }}>TURNO A · HORA {Math.max(1, Math.min(horaAtual, HORAS.length))} / {HORAS.length}</div>
          </div>
        </div>

        {/* KPI STRIP */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '1px', background: 'var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="sic-kpi">
            <div className="sic-kpi-lbl">PRODUÇÃO ACUM.</div>
            <div className="sic-kpi-val">{prodAcum.toLocaleString('pt-BR')}</div>
            <div className="sic-kpi-u">toneladas</div>
          </div>
          <div className="sic-kpi">
            <div className="sic-kpi-lbl">ESTIMATIVA FINAL</div>
            <div className="sic-kpi-val" style={{ color: estimativa >= META ? 'var(--accent2)' : horaAtual === 0 ? 'var(--muted)' : '#e07070' }}>{horaAtual === 0 ? '—' : estimativa.toLocaleString('pt-BR')}</div>
            <div className="sic-kpi-u" style={{ color: estimativa >= META ? 'var(--accent)' : horaAtual === 0 ? 'var(--muted2)' : '#e07070' }}>{horaAtual === 0 ? 'aguardando dados' : `${estimativa >= META ? '+' : ''}${(estimativa - META).toLocaleString('pt-BR')} t vs meta`}</div>
          </div>
          <div className="sic-kpi">
            <div className="sic-kpi-lbl">ADERÊNCIA GLOBAL</div>
            <div className="sic-kpi-val" style={{ color: aderGlobal >= 90 ? 'var(--accent2)' : aderGlobal >= 75 ? 'var(--yellow)' : horaAtual === 0 ? 'var(--accent2)' : '#e07070' }}>{horaAtual === 0 ? '0' : aderGlobal}%</div>
            <div className="sic-kpi-u">à meta horária</div>
          </div>
          <div className="sic-kpi">
            <div className="sic-kpi-lbl">DISP. FÍSICA</div>
            <div className="sic-kpi-val">{df}%</div>
            <div className="sic-kpi-u">frota ativa</div>
          </div>
          <div className="sic-kpi">
            <div className="sic-kpi-lbl">CAMINHÕES</div>
            <div className="sic-kpi-val" style={{ color: 'var(--accent2)' }}>{cam} / 8</div>
            <div className="sic-kpi-u">disponíveis</div>
          </div>
        </div>

        {/* METABAR */}
        <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', letterSpacing: '3px', color: 'var(--muted2)' }}>PROGRESSO DA META · 3.200 t</div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', letterSpacing: '2px', color: 'var(--muted)' }}>{pctMeta}% concluído</div>
          </div>
          <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ height: '100%', width: `${pctMeta}%`, background: pctMeta >= 90 ? 'linear-gradient(90deg,var(--accent),var(--accent2))' : pctMeta >= 70 ? 'linear-gradient(90deg,#dba520,#f0c840)' : 'linear-gradient(90deg,#e03e3e,#f06060)', transition: 'width 1s ease' }}></div>
            {horaAtual > 0 && <div style={{ position: 'absolute', top: -3, left: `${Math.min(100, (estimativa / META) * 100)}%`, width: '2px', height: '12px', background: estimativa >= META ? 'var(--accent2)' : '#e07070', transition: 'left 1s ease' }}></div>}
          </div>
        </div>

        {/* CORPO */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0' }}>
          {/* TABELA E GRAFICO */}
          <div style={{ padding: '20px 24px', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* CHART */}
            {horaAtual > 0 && (
              <div style={{ height: '180px', width: '100%' }}>
                <ResponsiveContainer width={"100%"} height={"100%"}>
                  <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="name" stroke="var(--muted2)" fontSize={10} tick={{fontFamily: "'Share Tech Mono', monospace"}} />
                    <YAxis stroke="var(--muted2)" fontSize={10} tick={{fontFamily: "'Share Tech Mono', monospace"}} />
                    <Tooltip cursor={{ fill: 'var(--border2)' }} contentStyle={{ backgroundColor: 'var(--panel)', border: '1px solid var(--border)', fontSize: '11px', fontFamily: "'Share Tech Mono', monospace" }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontFamily: "'Share Tech Mono', monospace", color: 'var(--muted2)' }} />
                    <Bar dataKey="HEM" stackId="a" fill="var(--accent)" />
                    <Bar dataKey="GOE" stackId="a" fill="var(--accent2)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Share Tech Mono', monospace", fontSize: '10px' }}>
              <thead>
                <tr>
                  <th className="sic-td-h" style={{ color: 'var(--muted2)' }}>HORA</th>
                  <th className="sic-td-h" style={{ textAlign: 'center', color: 'var(--accent)' }}>HEM</th>
                  <th className="sic-td-h" style={{ textAlign: 'center', color: 'var(--accent2)' }}>GOE</th>
                  <th className="sic-td-h" style={{ textAlign: 'center', color: 'var(--text-main)' }}>TOTAL</th>
                  <th className="sic-td-h" style={{ textAlign: 'center', color: 'var(--muted2)' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {HORAS.map((hr, idx) => {
                  let statusStr = "·", statusColor = "var(--muted2)";
                  let classN = "sic-tr-future";
                  if (idx < horaAtual) {
                    classN = "sic-tr-done";
                    if (!hr.isBreak) {
                      const tot = hr.hem + hr.goe;
                      const adH = (tot / (META / 8)) * 100;
                      statusStr = adH >= 90 ? '✔ OK' : adH >= 75 ? '▲ BAIXO' : '✖ DESVIO';
                      statusColor = adH >= 90 ? 'var(--accent2)' : adH >= 75 ? 'var(--yellow)' : '#e07070';
                    }
                  } else if (idx === horaAtual) {
                    classN = "sic-tr-active";
                  }

                  if (hr.isBreak) {
                    return (
                      <tr key={idx} className={classN}>
                        <td className="sic-td-h" style={{ color: 'var(--yellow)' }}>{hr.label}</td>
                        <td className="sic-td" colSpan={4} style={{ color: 'var(--yellow)', letterSpacing: '2px', fontSize: '9px' }}>INTERVALO</td>
                      </tr>
                    );
                  }
                  
                  const show = idx < horaAtual;
                  return (
                    <tr key={idx} className={classN}>
                      <td className="sic-td-h">{hr.label}</td>
                      <td className="sic-td">{show ? hr.hem.toLocaleString('pt-BR') : '·'}</td>
                      <td className="sic-td">{show ? hr.goe.toLocaleString('pt-BR') : '·'}</td>
                      <td className="sic-td" style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>{show ? (hr.hem + hr.goe).toLocaleString('pt-BR') : '·'}</td>
                      <td className="sic-td" style={{ color: statusColor }}>{statusStr}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* LITOLOGIA */}
            <div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', letterSpacing: '3px', color: 'var(--accent)', marginBottom: '12px' }}>PRODUÇÃO ACUM. POR LITOLOGIA</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: 'var(--accent)', letterSpacing: '2px' }}>HEMATITA</span>
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: 'var(--muted)' }}>{hemAcum.toLocaleString('pt-BR')} t</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.min(100, (hemAcum / (META * 0.65)) * 100)}%`, background: 'var(--accent)', transition: 'width 1s ease' }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: 'var(--accent2)', letterSpacing: '2px' }}>GOETITA</span>
                    <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: 'var(--muted)' }}>{goeAcum.toLocaleString('pt-BR')} t</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.min(100, (goeAcum / (META * 0.45)) * 100)}%`, background: 'var(--accent2)', transition: 'width 1s ease' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* FROTA */}
            <div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', letterSpacing: '3px', color: 'var(--accent)', marginBottom: '12px' }}>STATUS DA FROTA</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '6px' }}>
                {EQUIPAMENTOS.map(eq => (
                  <div key={eq} className={`equip ${downs.includes(eq) ? 'equip-down' : 'equip-ok'}`}>{eq}</div>
                ))}
              </div>
            </div>

            {/* EVENTOS */}
            <div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', letterSpacing: '3px', color: 'var(--accent)', marginBottom: '10px' }}>OCORRÊNCIAS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minHeight: '48px' }}>
                {allEvents.length === 0 ? (
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: 'var(--muted2)', letterSpacing: '1px' }}>Aguardando início do turno...</div>
                ) : (
                  allEvents.slice(0, 4).map((e, i) => (
                    <div key={i} className={`alerta-${e.type}`} style={{ animation: 'fadeInDown .3s ease' }}>{e.ev}</div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER CONTROLS */}
        <div style={{ background: 'var(--bg-color)', borderTop: '1px solid var(--border)', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={toggleSim} style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: '13px', letterSpacing: '3px', padding: '10px 24px', background: horaAtual >= HORAS.length ? 'var(--muted2)' : 'var(--accent)', color: '#050c06', border: 'none', borderRadius: '2px', cursor: horaAtual >= HORAS.length ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'background .2s' }}>
              {horaAtual >= HORAS.length ? <><Square size={14} /> TURNO ENCERRADO</>
               : playing ? <><Pause size={14} /> PAUSAR</> 
               : <><Play size={14} /> {horaAtual === 0 ? "INICIAR TURNO" : "CONTINUAR"}</>}
            </button>
            <button onClick={resetSim} style={{ padding: '8px 12px', background: 'transparent', color: 'var(--muted)', border: '1px solid var(--border2)', borderRadius: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <RotateCcw size={14} />
            </button>
            
            {playing && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '12px' }}>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', letterSpacing: '2px', color: 'var(--muted2)' }}>PRÓXIMA HORA EM</div>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '16px', fontWeight: 700, color: 'var(--accent2)' }}>{cdSec}s</div>
              </div>
            )}
          </div>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', letterSpacing: '2px', color: 'var(--muted2)' }}>● SIC SIMULADO · DADOS FICTÍCIOS · FINS DEMONSTRATIVOS</div>
        </div>
      </div>
    </section>
  );
}
