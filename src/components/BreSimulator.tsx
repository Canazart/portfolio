import type { CSSProperties } from 'react';
import { useState } from 'react';
import { Code, Play, RotateCcw, ShieldCheck, Terminal } from 'lucide-react';

type AuditStatus = 'OK' | 'HERDADO' | 'SUPRIMIDO' | 'ALERTA' | 'ERRO' | 'DESCARTADO';
type RegexClass = 'PROD' | 'JUST' | 'OCIO' | 'DESCONHECIDO' | 'VAZIO';

interface AuditRow {
  id: number;
  equip: string;
  data: string;
  ini: string;
  fim: string;
  estado: string;
  motivo: string;
  t0: number;
  t1: number;
  valido: boolean;
  cls: RegexClass;
  status: AuditStatus;
  regra: string;
  detalhe: string;
}

/* ── TAXONOMIA REGEX DO MOTOR ── */
const RX = {
  JUST: /(manuten|abastec|refei|almo[cç]|troca de turno|chuva|detona|libera[cç]|pneu|borrach)/i,
  OCIO: /(aguard|fila|sem (operador|escala|frente|caminh)|ocios|parad[oa])/i,
  PROD: /(carreg|transp|basc|escav|viagem|desmonte)/i,
};

const CLS_LABEL: Record<RegexClass, string> = {
  PROD: 'Produtivo',
  JUST: 'Justificável',
  OCIO: 'Ocioso',
  DESCONHECIDO: 'Não reconhecido',
  VAZIO: 'Vazio',
};

/* Janelas obrigatórias (minutos do dia): troca de turno (06:45-07:15, 18:45-19:15) e almoço (11:30-12:30) */
const JANELAS: [number, number][] = [
  [405, 435],
  [690, 750],
  [1125, 1155],
];
const TOLERANCIA_MIN = 15;
const LIMITE_PROLONGADA_MIN = 720; // 12h

const STATUS_COR: Record<AuditStatus, string> = {
  OK: '#34d399',
  HERDADO: '#38bdf8',
  SUPRIMIDO: '#a78bfa',
  ALERTA: '#fb923c',
  ERRO: '#fb7185',
  DESCARTADO: '#94a3b8',
};

const STATUS_LIST: AuditStatus[] = ['OK', 'HERDADO', 'SUPRIMIDO', 'ALERTA', 'ERRO', 'DESCARTADO'];

const PRESET_COMPLETO = `Equip;Data;Início;Fim;Estado;Motivo
CB-02;09/11/2026;22:00;00:00;Ocioso;Manutenção corretiva - freio
CB-02;10/11/2026;00:00;06:30;Ocioso;
CB-01;10/11/2026;07:00;11:30;Produtivo;Transporte HEM
CB-01;10/11/2026;11:30;12:30;Ocioso;Aguardando operador
CB-03;10/11/2026;07:00;07:20;Ocioso;Aguardando frente
CB-03;10/11/2026;08:00;09:10;Ocioso;Fila na britagem
ES-01;10/11/2026;07:15;10:00;Produtivo;Carregamento
ES-01;10/11/2026;09:30;11:00;Produtivo;Carregamento
CB-01;10/11/2026;13:00;14:00;Produtivo;Manutenção preventiva
CB-02;10/11/2026;14:00;14:00;Produtivo;Transporte HEM
CB-03;10/11/2026;14:00;15:30;Ocioso;xyz
CB-01;10/11/2026;15:00;15:40;Ocioso;Abastecimento
CB-01;10/11/2026;16:00;17:00;Ocioso;
CB-04;10/11/2026;00:00;20:00;Ocioso;Equipamento parado - sem escala`;

const PRESET_D1_TURNO = `Equip;Data;Início;Fim;Estado;Motivo
CB-02;09/11/2026;21:30;00:00;Ocioso;Manutenção corretiva - sistema hidráulico
CB-02;10/11/2026;00:00;07:00;Ocioso;
CB-05;10/11/2026;06:48;07:18;Ocioso;Aguardando operador
CB-05;10/11/2026;11:30;12:30;Ocioso;Aguardando frente
CB-06;10/11/2026;18:45;19:15;Ocioso;Parado troca de turno`;

const PRESET_GARANTIA = `Equip;Data;Início;Fim;Estado;Motivo
ES-01;10/11/2026;07:00;10:30;Produtivo;Carregamento
ES-01;10/11/2026;10:00;11:30;Produtivo;Carregamento
CB-07;10/11/2026;08:00;09:20;Ocioso;Fila na britagem
CB-07;10/11/2026;13:00;14:15;Produtivo;Manutenção preventiva
CB-07;10/11/2026;14:30;15:30;Ocioso;
CB-08;10/11/2026;00:00;18:00;Ocioso;Sem escala - reserva de pátio`;

function parseTs(data: string, hora: string): number {
  const d = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(data);
  const h = /^(\d{1,2}):(\d{2})$/.exec(hora);
  if (!d || !h) return NaN;
  return Date.UTC(+d[3], +d[2] - 1, +d[1], +h[1], +h[2]) / 1000;
}

function fmtTs(ts: number): string {
  const s = new Date(ts * 1000).toISOString();
  return `${s.slice(8, 10)}/${s.slice(5, 7)} ${s.slice(11, 16)}`;
}

function classify(motivo: string): RegexClass {
  if (!motivo) return 'VAZIO';
  if (RX.JUST.test(motivo)) return 'JUST';
  if (RX.OCIO.test(motivo)) return 'OCIO';
  if (RX.PROD.test(motivo)) return 'PROD';
  return 'DESCONHECIDO';
}

/* Interseção temporal exata (em minutos) entre [t0, t1] e as janelas obrigatórias */
function calcIntersecaoMin(t0: number, t1: number): number {
  let total = 0;
  for (let day = Math.floor(t0 / 86400); day <= Math.floor(t1 / 86400); day++) {
    for (const [a, b] of JANELAS) {
      const ini = Math.max(t0, day * 86400 + a * 60);
      const fim = Math.min(t1, day * 86400 + b * 60);
      if (fim > ini) total += (fim - ini) / 60;
    }
  }
  return total;
}

function runBreAudit(text: string) {
  const tStart = performance.now();
  const rows: AuditRow[] = [];

  text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .forEach((line, idx) => {
      const cols = line.split(/\t|;/).map((x) => x.trim());
      if (idx === 0 && /equip/i.test(cols[0])) return;
      const [equip = '', data = '', ini = '', fim = '', estado = '', motivo = ''] = cols;
      const t0 = parseTs(data, ini);
      let t1 = parseTs(data, fim);
      const r: AuditRow = {
        id: rows.length + 1,
        equip,
        data,
        ini,
        fim,
        estado,
        motivo,
        t0,
        t1,
        valido: true,
        cls: classify(motivo),
        status: 'OK',
        regra: '',
        detalhe: '',
      };

      if (Number.isNaN(t0) || Number.isNaN(t1)) {
        r.valido = false;
        r.status = 'ERRO';
        r.regra = 'R0 · Parsing';
        r.detalhe = 'Data ou hora fora do formato DD/MM/AAAA e HH:MM.';
      } else if (t1 === t0) {
        r.valido = false;
        r.status = 'ERRO';
        r.regra = 'R0 · Duração nula';
        r.detalhe = 'Timestamp de início e fim idênticos (0 min).';
      } else {
        if (t1 < t0) t1 += 86400; // virada de meia-noite
        r.t1 = t1;
      }

      rows.push(r);
    });

  const sorted = rows
    .filter((r) => r.valido)
    .sort((a, b) => a.equip.localeCompare(b.equip) || a.t0 - b.t0);

  const lastByEquip: Record<string, { t1: number; cls: RegexClass; motivo: string }> = {};

  for (const r of sorted) {
    const durMin = (r.t1 - r.t0) / 60;
    const prev = lastByEquip[r.equip];
    const apply = (status: AuditStatus, regra: string, detalhe: string) => {
      r.status = status;
      r.regra = regra;
      r.detalhe = detalhe;
    };
    let motivoEfetivo = r.motivo;

    if (prev && r.t0 < prev.t1) {
      apply(
        'ERRO',
        'R1 · Sobreposição',
        `Inicia antes do término do registro anterior de ${r.equip} (${fmtTs(prev.t1)}).`
      );
    } else if (durMin > LIMITE_PROLONGADA_MIN) {
      apply(
        'DESCARTADO',
        'R2 · Inatividade prolongada',
        `${(durMin / 60).toFixed(1)} h contínuas (> 12 h): descartado para não poluir DF/UT.`
      );
    } else if (!r.motivo && prev && prev.t1 === r.t0 && prev.cls === 'JUST') {
      r.cls = 'JUST';
      motivoEfetivo = prev.motivo;
      apply(
        'HERDADO',
        'R3 · Memória interdiária',
        `Continuidade exata em Unix Timestamp: herdou "${prev.motivo}" do dia/turno anterior.`
      );
    } else if (/^prod/i.test(r.estado)) {
      if (r.cls === 'PROD') {
        apply('OK', 'R4 · Estado × motivo', 'Estado produtivo coerente com o apontamento.');
      } else {
        apply(
          'ERRO',
          'R4 · Estado × motivo',
          `Estado Produtivo incompatível com motivo ${r.motivo ? `"${r.motivo}" (${CLS_LABEL[r.cls]})` : 'vazio'}.`
        );
      }
    } else if (r.cls === 'PROD') {
      apply('ERRO', 'R4 · Estado × motivo', `Estado Ocioso incompatível com motivo produtivo "${r.motivo}".`);
    } else if (r.cls === 'JUST') {
      apply('OK', 'R5 · Justificável', `Motivo "${r.motivo}" validado pela taxonomia como parada justificável.`);
    } else if (r.cls === 'DESCONHECIDO') {
      apply('ERRO', 'R6 · Taxonomia Regex', `"${r.motivo}" não corresponde a nenhuma categoria operacional.`);
    } else {
      const inter = calcIntersecaoMin(r.t0, r.t1);
      const liq = durMin - inter;
      if (liq <= TOLERANCIA_MIN) {
        if (inter > 0) {
          apply(
            'SUPRIMIDO',
            'R7 · Janela obrigatória',
            `${inter} min em troca de turno/almoço (líquido ${liq} min ≤ ${TOLERANCIA_MIN} min): falso positivo suprimido.`
          );
        } else {
          apply('OK', 'R7 · Tolerância', `${durMin} min dentro da tolerância operacional (${TOLERANCIA_MIN} min).`);
        }
      } else if (r.cls === 'VAZIO') {
        apply(
          'ERRO',
          'R3 · Sem justificativa',
          `${liq} min ociosos sem motivo e sem registro anterior contínuo para herdar.`
        );
      } else {
        apply(
          'ALERTA',
          'R7 · Ociosidade real',
          `${liq} min líquidos de ociosidade ("${r.motivo}")${inter ? `, já descontados ${inter} min de janela obrigatória` : ''}.`
        );
      }
    }

    lastByEquip[r.equip] = {
      t1: Math.max(prev?.t1 ?? 0, r.t1),
      cls: r.cls,
      motivo: motivoEfetivo,
    };
  }

  const sumHours = (pred: (r: AuditRow) => boolean) =>
    rows.filter((r) => r.valido && pred(r)).reduce((acc, r) => acc + (r.t1 - r.t0) / 3600, 0);

  const countStatus = (s: AuditStatus) => rows.filter((r) => r.status === s).length;
  const countCls = (c: RegexClass) => rows.filter((r) => r.cls === c).length;
  const ms = Math.max(0.12, performance.now() - tStart);
  const falsosEvitados = countStatus('HERDADO') + countStatus('SUPRIMIDO') + countStatus('DESCARTADO');

  return {
    rows: sorted.concat(rows.filter((r) => !r.valido)),
    countStatus,
    ms,
    falsosEvitados,
    prodH: sumHours((r) => r.status === 'OK' && r.cls === 'PROD'),
    justH: sumHours(
      (r) => r.status === 'HERDADO' || r.status === 'SUPRIMIDO' || (r.status === 'OK' && r.cls === 'JUST')
    ),
    ociH: sumHours((r) => r.status === 'ALERTA'),
    naoValH: sumHours((r) => r.status === 'ERRO' || r.status === 'DESCARTADO'),
    log: [
      `Parsing tabular: ${rows.length} apontamentos lidos (${rows.filter((r) => r.valido).length} intervalos Unix válidos)`,
      `Taxonomia Regex: ${countCls('PROD')} produtivos · ${countCls('JUST')} justificáveis · ${countCls('OCIO')} ociosos · ${countCls('VAZIO')} vazios · ${countCls('DESCONHECIDO')} inválidos`,
      `Motor Heurístico R0–R7: ${falsosEvitados} falsos positivos/ruídos filtrados (D-1 + janelas + inatividade >12h)`,
      `Auditoria concluída client-side em ${ms.toFixed(2)} ms`,
    ],
  };
}

export default function BreSimulator() {
  const [text, setText] = useState(PRESET_COMPLETO);
  const [activePreset, setActivePreset] = useState<'completo' | 'd1' | 'garantia'>('completo');
  const [res, setRes] = useState(() => runBreAudit(PRESET_COMPLETO));
  const [filtro, setFiltro] = useState<AuditStatus | 'TODOS'>('TODOS');

  const handleRun = () => {
    setRes(runBreAudit(text));
    setFiltro('TODOS');
  };

  const loadPreset = (key: 'completo' | 'd1' | 'garantia', content: string) => {
    setActivePreset(key);
    setText(content);
    setRes(runBreAudit(content));
    setFiltro('TODOS');
  };

  const visibleRows = res.rows.filter((r) => filtro === 'TODOS' || r.status === filtro);
  const fmtH = (n: number) => `${n.toFixed(1)} h`;

  return (
    <div className="lab-shell">
      <div className="ca ca-tl" />
      <div className="ca ca-tr" />
      <div className="ca ca-bl" />
      <div className="ca ca-br" />

      {/* HEADER */}
      <div className="sic-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ShieldCheck size={22} color="var(--accent-bright)" />
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
              CUSTOM BRE — AUDITORIA HEURÍSTICA DE FROTA (R0–R7)
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9.5px',
                letterSpacing: '1.5px',
                color: 'var(--text-muted)',
              }}
            >
              PLANILHA EDITÁVEL · UNIX TIMESTAMPS · REGEX TAXONOMY · MEMÓRIA INTERDIÁRIA D-1
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span className="exp-badge active" style={{ fontSize: '10px' }}>
            ⚡ {res.ms.toFixed(2)} ms
          </span>
          <span className="exp-badge promo" style={{ fontSize: '10px' }}>
            {res.falsosEvitados} FALSOS POSITIVOS EVITADOS
          </span>
        </div>
      </div>

      {/* BODY */}
      <div className="bre-body">
        <div className="bre-intro-bar">
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            Edite ou cole apontamentos abaixo (separador <code>;</code> ou tabulação:{' '}
            <code>Equip;Data;Início;Fim;Estado;Motivo</code>) e execute o motor em tempo real — ou teste um cenário
            pronto:
          </p>
          <div className="bre-presets">
            <button
              type="button"
              className={`bre-preset-btn ${activePreset === 'completo' ? 'active' : ''}`}
              onClick={() => loadPreset('completo', PRESET_COMPLETO)}
            >
              Cenário Completo (14 linhas)
            </button>
            <button
              type="button"
              className={`bre-preset-btn ${activePreset === 'd1' ? 'active' : ''}`}
              onClick={() => loadPreset('d1', PRESET_D1_TURNO)}
            >
              Memória D-1 &amp; Turno
            </button>
            <button
              type="button"
              className={`bre-preset-btn ${activePreset === 'garantia' ? 'active' : ''}`}
              onClick={() => loadPreset('garantia', PRESET_GARANTIA)}
            >
              Garantia Técnica &amp; Conflitos
            </button>
          </div>
        </div>

        <textarea
          className="bre-ta"
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          aria-label="Planilha de apontamentos do FMS"
        />

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button type="button" className="btn-primary" style={{ padding: '11px 20px', fontSize: '13px' }} onClick={handleRun}>
            <Play size={13} strokeWidth={2.5} />
            EXECUTAR AUDITORIA R0–R7
          </button>
          <button
            type="button"
            className="btn-ghost"
            style={{ padding: '11px 16px' }}
            onClick={() => loadPreset('completo', PRESET_COMPLETO)}
          >
            <RotateCcw size={13} />
            RESTAURAR EXEMPLO
          </button>
        </div>

        {/* TERMINAL EXECUTION LOG */}
        <div className="bre-log-box">
          <div className="bre-log-title">
            <Terminal size={12} />
            LOG DO PIPELINE HEURÍSTICO
          </div>
          {res.log.map((line, i) => (
            <div key={i} className="bre-log-line">
              <span style={{ color: 'var(--accent)' }}>&gt;</span> {line}
            </div>
          ))}
        </div>

        {/* KPI STRIP */}
        <div className="bre-kpis-grid">
          <div className="bre-stat">
            <div className="bre-stat-lbl">REGISTROS</div>
            <div className="bre-stat-val">{res.rows.length}</div>
          </div>
          <div className="bre-stat">
            <div className="bre-stat-lbl">PRODUTIVO</div>
            <div className="bre-stat-val" style={{ color: STATUS_COR.OK }}>
              {fmtH(res.prodH)}
            </div>
          </div>
          <div className="bre-stat">
            <div className="bre-stat-lbl">JUSTIFICADO / D-1</div>
            <div className="bre-stat-val" style={{ color: STATUS_COR.SUPRIMIDO }}>
              {fmtH(res.justH)}
            </div>
          </div>
          <div className="bre-stat">
            <div className="bre-stat-lbl">OCIOSO REAL</div>
            <div className="bre-stat-val" style={{ color: STATUS_COR.ALERTA }}>
              {fmtH(res.ociH)}
            </div>
          </div>
          <div className="bre-stat">
            <div className="bre-stat-lbl">NÃO VALIDADO</div>
            <div className="bre-stat-val" style={{ color: STATUS_COR.ERRO }}>
              {fmtH(res.naoValH)}
            </div>
          </div>
        </div>

        {/* STATUS FILTER CHIPS */}
        <div className="bre-chips">
          {(['TODOS', ...STATUS_LIST] as const).map((status) => {
            const count = status === 'TODOS' ? res.rows.length : res.countStatus(status);
            return (
              <button
                key={status}
                type="button"
                className={`bre-chip ${filtro === status ? 'on' : ''}`}
                style={
                  status !== 'TODOS'
                    ? ({ '--c': STATUS_COR[status] } as CSSProperties)
                    : undefined
                }
                onClick={() => setFiltro(status)}
              >
                {status} · {count}
              </button>
            );
          })}
        </div>

        {/* FULL AUDIT TABLE */}
        <div className="bre-tbl-wrap">
          <table className="bre-tbl">
            <thead>
              <tr>
                <th>#</th>
                <th>Equip.</th>
                <th>Intervalo</th>
                <th>Unix (t0)</th>
                <th>Estado</th>
                <th>Motivo</th>
                <th>Classe</th>
                <th>Veredito</th>
                <th>Regra &amp; Diagnóstico</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((r) => (
                <tr key={r.id}>
                  <td className="mono" style={{ color: 'var(--text-dim)' }}>{r.id}</td>
                  <td className="mono" style={{ color: 'var(--accent-bright)', fontWeight: 600 }}>{r.equip}</td>
                  <td className="mono" style={{ whiteSpace: 'nowrap' }}>
                    {r.data.slice(0, 5)} {r.ini}–{r.fim}
                  </td>
                  <td className="mono" style={{ color: 'var(--text-dim)' }}>
                    {r.valido ? r.t0 : '—'}
                  </td>
                  <td>{r.estado}</td>
                  <td>{r.motivo || <em style={{ color: 'var(--text-dim)' }}>vazio</em>}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{CLS_LABEL[r.cls]}</td>
                  <td>
                    <span
                      className="bre-tag"
                      style={{ '--c': STATUS_COR[r.status] } as CSSProperties}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <strong style={{ color: 'var(--text-main)', fontSize: '12px' }}>{r.regra}</strong>
                    <div className="bre-det">{r.detalhe}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* REGEX & RULES INSPECTOR */}
        <details className="bre-rules">
          <summary>
            <Code size={13} />
            INSPECIONAR EXPRESSÕES REGEX &amp; REGRAS DO MOTOR (R0–R7)
          </summary>
          <div className="bre-rules-content">
            <div>
              <strong>RX.JUST:</strong> {String(RX.JUST)}
            </div>
            <div>
              <strong>RX.OCIO:</strong> {String(RX.OCIO)}
            </div>
            <div>
              <strong>RX.PROD:</strong> {String(RX.PROD)}
            </div>
            <div style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>
              <strong>Janelas obrigatórias:</strong> 06:45–07:15 · 11:30–12:30 · 18:45–19:15 &nbsp;|&nbsp;{' '}
              <strong>Tolerância líquida:</strong> {TOLERANCIA_MIN} min &nbsp;|&nbsp;{' '}
              <strong>Descarte de inatividade:</strong> &gt; {LIMITE_PROLONGADA_MIN / 60} h
            </div>
          </div>
        </details>
      </div>

      {/* FOOTER */}
      <div className="sic-footer">
        <div className="sic-footer-note">
          ● MOTOR EXECUTADO REALMENTE NO NAVEGADOR EM JAVASCRIPT ES6+ · DADOS ILUSTRATIVOS
        </div>
        <div className="sic-footer-note" style={{ color: 'var(--accent-bright)' }}>
          AUDITORIA ALGORÍTMICA · PROTEÇÃO DE GARANTIA TÉCNICA
        </div>
      </div>
    </div>
  );
}
