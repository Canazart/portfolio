import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Code, Play, RotateCcw } from 'lucide-react';
import type { Translation } from '../i18n';

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

/* Multilingual regex supporting PT, EN, and ES operational log entries */
const RX = {
  JUST: /(manuten|manten|mainten|abastec|fuel|refei|almo[cç]|almuer|lunch|meal|troca de turno|cambio de turno|shift|chuva|lluvia|rain|detona|blast|libera[cç]|pneu|neumat|tire|borrach)/i,
  OCIO: /(aguard|esper|wait|fila|cola|queue|sem (operador|escala|frente|caminh)|sin (operador|escala|frente)|no (operator|schedule|face)|ocios|idle|standby|parad[oa])/i,
  PROD: /(carreg|cargu|load|transp|acarr|haul|basc|dump|escav|excav|viagem|viaje|trip|desmonte)/i,
};

const JANELAS: [number, number][] = [
  [405, 435],
  [690, 750],
  [1125, 1155],
];
const TOLERANCIA_MIN = 15;
const LIMITE_PROLONGADA_MIN = 720;

/* ISA-101 High-Performance Mining HMI — Mineral & Metallic Status Palette */
const STATUS_COR: Record<AuditStatus, string> = {
  OK: '#dfc076',
  HERDADO: '#94a7b8',
  SUPRIMIDO: '#b88e62',
  ALERTA: '#d9973b',
  ERRO: '#c4624a',
  DESCARTADO: '#7e7b73',
};

const STATUS_LIST: AuditStatus[] = ['OK', 'HERDADO', 'SUPRIMIDO', 'ALERTA', 'ERRO', 'DESCARTADO'];

const PRESET_COMPLETO = `Equip;Data;Início;Fim;Estado;Motivo
CB-02;09/11/2026;22:00;00:00;Ocioso;Manutenção corretiva, freio
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
CB-04;10/11/2026;00:00;20:00;Ocioso;Equipamento parado, sem escala`;

const PRESET_D1_TURNO = `Equip;Data;Início;Fim;Estado;Motivo
CB-02;09/11/2026;21:30;00:00;Ocioso;Manutenção corretiva, sistema hidráulico
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
CB-08;10/11/2026;00:00;18:00;Ocioso;Sem escala, reserva de pátio`;

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

function runBreAudit(text: string, tb: Translation['bre']) {
  const tStart = performance.now();
  const rows: AuditRow[] = [];

  text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .forEach((line, idx) => {
      const cols = line.split(/\t|;/).map((x) => x.trim());
      if (idx === 0 && /^(equip|unit|equipo)/i.test(cols[0])) return;
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
        r.regra = tb.rules.r0Parse;
        r.detalhe = tb.rules.r0ParseDet;
      } else if (t1 === t0) {
        r.valido = false;
        r.status = 'ERRO';
        r.regra = tb.rules.r0Zero;
        r.detalhe = tb.rules.r0ZeroDet;
      } else {
        if (t1 < t0) t1 += 86400;
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
      apply('ERRO', tb.rules.r1Overlap, tb.rules.r1OverlapDet(r.equip, fmtTs(prev.t1)));
    } else if (durMin > LIMITE_PROLONGADA_MIN) {
      apply('DESCARTADO', tb.rules.r2Long, tb.rules.r2LongDet((durMin / 60).toFixed(1)));
    } else if (!r.motivo && prev && prev.t1 === r.t0 && prev.cls === 'JUST') {
      r.cls = 'JUST';
      motivoEfetivo = prev.motivo;
      apply('HERDADO', tb.rules.r3Inherit, tb.rules.r3InheritDet(prev.motivo));
    } else if (/^prod/i.test(r.estado)) {
      if (r.cls === 'PROD') {
        apply('OK', tb.rules.r4Match, tb.rules.r4MatchOk);
      } else {
        const reasonPart = r.motivo ? `"${r.motivo}" (${tb.clsLabels[r.cls]})` : tb.emptyReason;
        apply('ERRO', tb.rules.r4Match, tb.rules.r4ProdMismatch(reasonPart));
      }
    } else if (r.cls === 'PROD') {
      apply('ERRO', tb.rules.r4Match, tb.rules.r4IdleMismatch(r.motivo));
    } else if (r.cls === 'JUST') {
      apply('OK', tb.rules.r5Just, tb.rules.r5JustDet(r.motivo));
    } else if (r.cls === 'DESCONHECIDO') {
      apply('ERRO', tb.rules.r6Tax, tb.rules.r6TaxDet(r.motivo));
    } else {
      const inter = calcIntersecaoMin(r.t0, r.t1);
      const liq = durMin - inter;
      if (liq <= TOLERANCIA_MIN) {
        if (inter > 0) {
          apply('SUPRIMIDO', tb.rules.r7Win, tb.rules.r7WinDet(inter, liq, TOLERANCIA_MIN));
        } else {
          apply('OK', tb.rules.r7Tol, tb.rules.r7TolDet(durMin, TOLERANCIA_MIN));
        }
      } else if (r.cls === 'VAZIO') {
        apply('ERRO', tb.rules.r3NoReason, tb.rules.r3NoReasonDet(liq));
      } else {
        apply('ALERTA', tb.rules.r7Idle, tb.rules.r7IdleDet(liq, r.motivo, inter));
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
      tb.logParse(rows.length, rows.filter((r) => r.valido).length),
      tb.logTax(countCls('PROD'), countCls('JUST'), countCls('OCIO'), countCls('VAZIO'), countCls('DESCONHECIDO')),
      tb.logDone(falsosEvitados, ms.toFixed(2)),
    ],
  };
}

interface BreSimulatorProps {
  t: Translation;
}

const INITIAL_VISIBLE_ROWS = 5;

export default function BreSimulator({ t }: BreSimulatorProps) {
  const tb = t.bre;
  const [text, setText] = useState(PRESET_COMPLETO);
  const [auditedText, setAuditedText] = useState(PRESET_COMPLETO);
  const [runCounter, setRunCounter] = useState(0);
  const [activePreset, setActivePreset] = useState<'completo' | 'd1' | 'garantia'>('completo');
  const [filtro, setFiltro] = useState<AuditStatus | 'TODOS'>('TODOS');
  const [showAllRows, setShowAllRows] = useState(false);

  const res = useMemo(() => {
    void runCounter;
    return runBreAudit(auditedText, tb);
  }, [auditedText, tb, runCounter]);

  const handleRun = () => {
    setAuditedText(text);
    setRunCounter((c) => c + 1);
    setFiltro('TODOS');
    setShowAllRows(false);
  };

  const loadPreset = (key: 'completo' | 'd1' | 'garantia', content: string) => {
    setActivePreset(key);
    setText(content);
    setAuditedText(content);
    setRunCounter((c) => c + 1);
    setFiltro('TODOS');
    setShowAllRows(false);
  };

  const visibleRows = res.rows.filter((r) => filtro === 'TODOS' || r.status === filtro);
  const hasMoreRows = visibleRows.length > INITIAL_VISIBLE_ROWS;
  const displayedRows = showAllRows ? visibleRows : visibleRows.slice(0, INITIAL_VISIBLE_ROWS);
  const hiddenCount = visibleRows.length - displayedRows.length;
  const fmtH = (n: number) => `${n.toFixed(1)} h`;

  return (
    <div className="lab-shell">
      <div className="lab-bar">
        <div className="lab-bar-lead">
          <span className="beacon-dot" aria-hidden="true" />
          <div>
            <div className="lab-bar-title">{tb.title}</div>
            <div className="lab-bar-sub">{tb.subtitle}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <span className="case-badge prod">
            <span className="badge-dot" aria-hidden="true" />
            {res.ms.toFixed(2)} ms
          </span>
          <span className="case-badge">
            {res.falsosEvitados} {tb.falsePositivesFiltered}
          </span>
        </div>
      </div>

      <div className="bre-body">
        <div className="bre-intro-bar">
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            {tb.introPrefix} <code>;</code> {tb.introMiddle}{' '}
            <code>Equip;Data;Início;Fim;Estado;Motivo</code> {tb.introSuffix}
          </p>
          <div className="bre-presets">
            <button
              type="button"
              className={`bre-preset-btn ${activePreset === 'completo' ? 'active' : ''}`}
              onClick={() => loadPreset('completo', PRESET_COMPLETO)}
            >
              {tb.presets.completo}
            </button>
            <button
              type="button"
              className={`bre-preset-btn ${activePreset === 'd1' ? 'active' : ''}`}
              onClick={() => loadPreset('d1', PRESET_D1_TURNO)}
            >
              {tb.presets.d1}
            </button>
            <button
              type="button"
              className={`bre-preset-btn ${activePreset === 'garantia' ? 'active' : ''}`}
              onClick={() => loadPreset('garantia', PRESET_GARANTIA)}
            >
              {tb.presets.garantia}
            </button>
          </div>
        </div>

        <textarea
          className="bre-ta"
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          aria-label={tb.textareaAria}
        />

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button type="button" className="btn-primary" onClick={handleRun}>
            <Play size={13} strokeWidth={2.4} />
            {tb.runBtn}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => loadPreset('completo', PRESET_COMPLETO)}
          >
            <RotateCcw size={13} />
            {tb.resetBtn}
          </button>
        </div>

        <div className="bre-log-box">
          {res.log.map((line, i) => (
            <div key={i}>
              <span style={{ color: 'var(--accent)' }}>&gt;</span> {line}
            </div>
          ))}
        </div>

        <div className="bre-kpis-grid">
          <div className="bre-stat">
            <div className="bre-stat-lbl">{tb.kpiRecords}</div>
            <div className="bre-stat-val">{res.rows.length}</div>
          </div>
          <div className="bre-stat">
            <div className="bre-stat-lbl">{tb.kpiProductive}</div>
            <div className="bre-stat-val" style={{ color: STATUS_COR.OK }}>
              {fmtH(res.prodH)}
            </div>
          </div>
          <div className="bre-stat">
            <div className="bre-stat-lbl">{tb.kpiJustified}</div>
            <div className="bre-stat-val" style={{ color: STATUS_COR.SUPRIMIDO }}>
              {fmtH(res.justH)}
            </div>
          </div>
          <div className="bre-stat">
            <div className="bre-stat-lbl">{tb.kpiRealIdle}</div>
            <div className="bre-stat-val" style={{ color: STATUS_COR.ALERTA }}>
              {fmtH(res.ociH)}
            </div>
          </div>
          <div className="bre-stat">
            <div className="bre-stat-lbl">{tb.kpiUnvalidated}</div>
            <div className="bre-stat-val" style={{ color: STATUS_COR.ERRO }}>
              {fmtH(res.naoValH)}
            </div>
          </div>
        </div>

        <div className="bre-chips">
          {(['TODOS', ...STATUS_LIST] as const).map((status) => {
            const count = status === 'TODOS' ? res.rows.length : res.countStatus(status);
            const label = status === 'TODOS' ? tb.filterAll : tb.statusLabels[status];
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
                onClick={() => {
                  setFiltro(status);
                  setShowAllRows(false);
                }}
              >
                {status !== 'TODOS' && <span className="status-dot" aria-hidden="true" />}
                <span>{label}</span>
                <span className="bre-chip-count">{count}</span>
              </button>
            );
          })}
        </div>

        <div className={`bre-tbl-card ${hasMoreRows && !showAllRows ? 'is-collapsed' : ''}`}>
          <div className="bre-tbl-wrap">
            <table className="bre-tbl">
              <thead>
                <tr>
                  <th>{tb.cols.num}</th>
                  <th>{tb.cols.equip}</th>
                  <th>{tb.cols.interval}</th>
                  <th>{tb.cols.unix}</th>
                  <th>{tb.cols.state}</th>
                  <th>{tb.cols.reason}</th>
                  <th>{tb.cols.cls}</th>
                  <th>{tb.cols.verdict}</th>
                  <th>{tb.cols.ruleDetail}</th>
                </tr>
              </thead>
              <tbody>
                {displayedRows.map((r) => (
                  <tr key={r.id}>
                    <td className="mono" style={{ color: 'var(--text-dim)' }}>{r.id}</td>
                    <td className="mono" style={{ color: 'var(--text)', fontWeight: 500 }}>{r.equip}</td>
                    <td className="mono" style={{ whiteSpace: 'nowrap' }}>
                      {r.data.slice(0, 5)} {r.ini} {tb.timeSep} {r.fim}
                    </td>
                    <td className="mono" style={{ color: 'var(--text-dim)' }}>
                      {r.valido ? r.t0 : 'n/a'}
                    </td>
                    <td>{r.estado}</td>
                    <td>{r.motivo || <em style={{ color: 'var(--text-dim)' }}>{tb.emptyReason}</em>}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{tb.clsLabels[r.cls]}</td>
                    <td>
                      <span
                        className="bre-tag"
                        style={{ '--c': STATUS_COR[r.status] } as CSSProperties}
                      >
                        <span className="status-dot" aria-hidden="true" />
                        {tb.statusLabels[r.status]}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: 'var(--text)', fontSize: '12.5px' }}>{r.regra}</strong>
                      <div className="bre-det">{r.detalhe}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {hasMoreRows && (
            <div className="bre-tbl-more-bar">
              <button
                type="button"
                className="bre-more-btn"
                onClick={() => setShowAllRows((prev) => !prev)}
                aria-expanded={showAllRows}
              >
                {showAllRows ? (
                  <>
                    <ChevronUp size={14} />
                    <span>{tb.showLess}</span>
                  </>
                ) : (
                  <>
                    <ChevronDown size={14} />
                    <span>{tb.showMore(hiddenCount)}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <details className="bre-rules">
          <summary>
            <Code size={13} />
            {tb.rulesSummary}
          </summary>
          <div className="bre-rules-content">
            <div>
              <strong>{tb.rulesJust}</strong> {String(RX.JUST)}
            </div>
            <div>
              <strong>{tb.rulesIdle}</strong> {String(RX.OCIO)}
            </div>
            <div>
              <strong>{tb.rulesProd}</strong> {String(RX.PROD)}
            </div>
            <div style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>
              <strong>{tb.rulesWindowsLabel}</strong> {tb.rulesWindowsVal};{' '}
              <strong>{tb.rulesTolLabel}</strong> {TOLERANCIA_MIN} min;{' '}
              <strong>{tb.rulesLongIdleLabel}</strong> &gt; {LIMITE_PROLONGADA_MIN / 60} h.
            </div>
          </div>
        </details>
      </div>

      <div className="lab-footer">
        <div className="lab-footer-note">{tb.footerNote}</div>
      </div>
    </div>
  );
}
