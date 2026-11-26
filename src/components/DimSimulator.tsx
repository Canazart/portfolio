import { useMemo, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Download,
  RotateCcw,
} from 'lucide-react';
import type { Lang } from '../i18n';

type Col6 =
  | 'Goethita'
  | 'Itabirito'
  | 'Estéril'
  | 'Mov. Aux.'
  | 'Benef. Goethita'
  | 'Benef. Itabirito';
type ColAll = Col6 | 'Total';
type MacroGroup = 'Goethita' | 'Itabirito' | 'Estéril' | 'Mov. Aux.' | 'Benef.';
type ScenarioKey = 'padrao' | 'chuvoso' | 'pico';

const GRUPOS_5: MacroGroup[] = ['Goethita', 'Itabirito', 'Estéril', 'Mov. Aux.', 'Benef.'];
const COLUNAS_6: Col6[] = [
  'Goethita',
  'Itabirito',
  'Estéril',
  'Mov. Aux.',
  'Benef. Goethita',
  'Benef. Itabirito',
];
const TIPOS_MANUT = new Set(['Manutenção Corretiva', 'Manutenção Preventiva', 'Manutenção Operacional']);
const TIPOS_PROD = new Set(['Operando', 'Serviço Auxiliar', 'Atraso Operacional']);
const TIPOS_DISP = new Set([
  'Operando',
  'Serviço Auxiliar',
  'Atraso Operacional',
  'Improdutiva Interna',
  'Improdutiva Externa',
]);

interface ProdRecord {
  dtRegistroTurno: string;
  dtRegistroIni: string;
  nomeEquipamento: string;
  nomeTipoEquipamento: string;
  nomeOperacao: string;
  nomeLitologia: string;
  nomeCava: string;
  nomeOrigem: string;
  nomeDestino: string;
  massa: number;
  velocidadeMediaCheio: number;
  velocidadeMediaVazio: number;
  dmtMovCheio: number;
  dmtMovVazio: number;
}

interface AponRecord {
  dtRegistroTurno: string;
  dtRegistro: string;
  nomeEquipamento: string;
  nomeTipoEquipamento: string;
  nomeEstado: string;
  nomeTipoEstado: string;
  tempoMinuto: number;
}

interface ScenarioConfig {
  massas_t: { Goethita: number; Itabirito: number; Estéril: number };
  dmts_km: Record<Col6, number>;
  precipitacao_mm: number;
  mauTempoMinDia: number;
  speedFactor: number;
  manutMinDia: number;
  pareSigaMin: number;
}

const SCENARIOS: Record<ScenarioKey, ScenarioConfig> = {
  padrao: {
    massas_t: { Goethita: 42000, Itabirito: 31000, Estéril: 78000 },
    dmts_km: {
      Goethita: 2.4,
      Itabirito: 2.65,
      Estéril: 1.95,
      'Mov. Aux.': 3.1,
      'Benef. Goethita': 1.45,
      'Benef. Itabirito': 1.15,
    },
    precipitacao_mm: 95,
    mauTempoMinDia: 12,
    speedFactor: 1.0,
    manutMinDia: 185,
    pareSigaMin: 14,
  },
  chuvoso: {
    massas_t: { Goethita: 42000, Itabirito: 31000, Estéril: 78000 },
    dmts_km: {
      Goethita: 2.75,
      Itabirito: 2.95,
      Estéril: 2.25,
      'Mov. Aux.': 3.4,
      'Benef. Goethita': 1.6,
      'Benef. Itabirito': 1.25,
    },
    precipitacao_mm: 240,
    mauTempoMinDia: 46,
    speedFactor: 0.88,
    manutMinDia: 230,
    pareSigaMin: 24,
  },
  pico: {
    massas_t: { Goethita: 48500, Itabirito: 36000, Estéril: 90000 },
    dmts_km: {
      Goethita: 2.5,
      Itabirito: 2.7,
      Estéril: 2.05,
      'Mov. Aux.': 3.15,
      'Benef. Goethita': 1.5,
      'Benef. Itabirito': 1.15,
    },
    precipitacao_mm: 110,
    mauTempoMinDia: 15,
    speedFactor: 1.03,
    manutMinDia: 175,
    pareSigaMin: 16,
  },
};

const BASE_PREMISES = {
  neblina_h_mes: 1.0,
  detonacao_min_dia: 17.0,
  manut_acesso: {
    Goethita: 0,
    Itabirito: 0,
    Estéril: 18,
    'Mov. Aux.': 0,
    'Benef. Goethita': 0,
    'Benef. Itabirito': 0,
  } as Record<Col6, number>,
  deslocamento: {
    Goethita: 18.0,
    Itabirito: 16.5,
    Estéril: 19.0,
    'Mov. Aux.': 15.0,
    'Benef. Goethita': 13.5,
    'Benef. Itabirito': 13.5,
  } as Record<Col6, number>,
};

type RowType = 'int' | 'dec' | 'pct';

const LINHAS_SPEC: [string, string, Record<Lang, string>, RowType, boolean][] = [
  ['R04_Dias', 'L04', { pt: 'Dias Calendário', en: 'Calendar Days', es: 'Días Calendario', zh: '日历天数' }, 'int', false],
  ['R06_Massa', 'L06', { pt: 'Massa Planejada (t)', en: 'Planned Tonnage (t)', es: 'Masa Planificada (t)', zh: '计划运量 (t)' }, 'dec', true],
  ['R07_DMT', 'L07', { pt: 'DMT (km)', en: 'Haul Distance DMT (km)', es: 'DMT (km)', zh: '平均运距 DMT (km)' }, 'dec', true],
  ['R09_Horas_Calendario', 'L09', { pt: 'Horas Calendário', en: 'Calendar Hours', es: 'Horas Calendario', zh: '日历工时' }, 'dec', false],
  ['R10_Horas_Manutencao', 'L10', { pt: 'Horas Manutenção', en: 'Maintenance Hours', es: 'Horas Mantenimiento', zh: '维护工时' }, 'dec', false],
  ['R11_Horas_Disponivel', 'L11', { pt: 'Horas Disponível', en: 'Available Hours', es: 'Horas Disponibles', zh: '可用工时' }, 'dec', false],
  ['R12_Horas_Trabalhadas', 'L12', { pt: 'Horas Trabalhadas', en: 'Worked Hours', es: 'Horas Trabajadas', zh: '有效作业工时' }, 'dec', false],
  ['R13_Horas_Improdutivas', 'L13', { pt: 'Horas Improdutivas', en: 'Unproductive Hours', es: 'Horas Improductivas', zh: '非生产工时' }, 'dec', false],
  ['R16_UF', 'L16', { pt: 'UF — Utilização Física (%)', en: 'UF — Physical Utilization (%)', es: 'UF — Utilización Física (%)', zh: 'UF 物理利用率 (%)' }, 'pct', true],
  ['R17_DF', 'L17', { pt: 'DF — Disponibilidade Física (%)', en: 'PA — Physical Availability (%)', es: 'DF — Disponibilidad Física (%)', zh: 'DF 物理完好率 (%)' }, 'pct', true],
  ['R18_RO', 'L18', { pt: 'RO — Rendimento Operacional (%)', en: 'RO — Operational Yield (%)', es: 'RO — Rendimiento Operacional (%)', zh: 'RO 综合运营效率 (%)' }, 'pct', true],
  ['R19_Carga_Med', 'L19', { pt: 'Carga Média — Mediana (t)', en: 'Median Payload (t)', es: 'Carga Media — Mediana (t)', zh: '单车中位载重 (t)' }, 'dec', false],
  ['R20_Veloc_Cheio', 'L20', { pt: 'Veloc. Cheio — IQR (km/h)', en: 'Loaded Speed — IQR (km/h)', es: 'Veloc. Lleno — IQR (km/h)', zh: '重车车速 IQR (km/h)' }, 'dec', false],
  ['R21_Veloc_Vazio', 'L21', { pt: 'Veloc. Vazio — IQR (km/h)', en: 'Empty Speed — IQR (km/h)', es: 'Veloc. Vacío — IQR (km/h)', zh: '空车车速 IQR (km/h)' }, 'dec', false],
  ['R22_Km_Ch_Vz', 'L22', { pt: 'Relação Km Cheio / Vazio', en: 'Loaded / Empty Km Ratio', es: 'Relación Km Lleno / Vacío', zh: '重空运距比' }, 'dec', false],
  ['R23_Precipitacao_mm', 'L23', { pt: 'Precipitação (mm)', en: 'Precipitation (mm)', es: 'Precipitación (mm)', zh: '降雨量 (mm)' }, 'dec', false],
  ['R24_Mau_Tempo', 'L24', { pt: 'Mau Tempo (min/dia)', en: 'Weather Delay (min/day)', es: 'Mal Tiempo (min/día)', zh: '恶劣天气 (min/d)' }, 'dec', false],
  ['R25_Neblina', 'L25', { pt: 'Neblina (min/dia)', en: 'Fog (min/day)', es: 'Neblina (min/día)', zh: '大雾停机 (min/d)' }, 'dec', false],
  ['R26_Refeicao', 'L26', { pt: 'Refeição e Lanche (min/dia)', en: 'Meal Break (min/day)', es: 'Comida y Refrigerio (min/día)', zh: '用餐休息 (min/d)' }, 'dec', false],
  ['R27_Troca_Turno', 'L27', { pt: 'Troca de Turno (min/dia)', en: 'Shift Change (min/day)', es: 'Cambio de Turno (min/día)', zh: '交接班 (min/d)' }, 'dec', false],
  ['R28_Abastecimento', 'L28', { pt: 'Abastecimento (min/dia)', en: 'Refueling (min/day)', es: 'Abastecimiento (min/día)', zh: '加油耗时 (min/d)' }, 'dec', false],
  ['R29_Checklist', 'L29', { pt: 'Checklist (min/dia)', en: 'Inspection Checklist (min/day)', es: 'Checklist (min/día)', zh: '点检耗时 (min/d)' }, 'dec', false],
  ['R30_Detonacao', 'L30', { pt: 'Detonação (min/dia)', en: 'Blasting (min/day)', es: 'Voladura (min/día)', zh: '爆破避炮 (min/d)' }, 'dec', false],
  ['R31_Manut_Acesso', 'L31', { pt: 'Manut. Acesso (min/dia)', en: 'Road Maintenance (min/day)', es: 'Manten. Acceso (min/día)', zh: '道路维护 (min/d)' }, 'dec', false],
  ['R32_Deslocamento', 'L32', { pt: 'Deslocamento Lavra (min/dia)', en: 'Pit Travel (min/day)', es: 'Desplazamiento Mina (min/día)', zh: '采场调动 (min/d)' }, 'dec', false],
  ['R33_Diversos', 'L33', { pt: 'Diversos (min/dia)', en: 'Miscellaneous (min/day)', es: 'Diversos (min/día)', zh: '其他停机 (min/d)' }, 'dec', false],
  ['R34_H_Improd_Dia', 'L34', { pt: 'Horas Improdutivas (h/dia)', en: 'Unproductive Hours (h/day)', es: 'Horas Improductivas (h/día)', zh: '日均非生产工时 (h/d)' }, 'dec', true],
  ['R35_Manobra_Carga', 'L35', { pt: 'Manobra Carreg. (min)', en: 'Loading Spot Time (min)', es: 'Maniobra Carga (min)', zh: '装车对位 (min)' }, 'dec', false],
  ['R36_Carregamento', 'L36', { pt: 'Carregamento (min)', en: 'Loading Time (min)', es: 'Carguío (min)', zh: '装载耗时 (min)' }, 'dec', false],
  ['R37_Manobra_Basc', 'L37', { pt: 'Manobra Bascul. (min)', en: 'Dumping Spot Time (min)', es: 'Maniobra Descarga (min)', zh: '卸载对位 (min)' }, 'dec', false],
  ['R38_Basculando', 'L38', { pt: 'Basculando (min)', en: 'Dumping Time (min)', es: 'Descarga (min)', zh: '翻斗卸载 (min)' }, 'dec', false],
  ['R39_Fila_Carga', 'L39', { pt: 'Fila Carga (min)', en: 'Loading Queue (min)', es: 'Cola Carga (min)', zh: '装车排队 (min)' }, 'dec', false],
  ['R40_Fila_Descarga', 'L40', { pt: 'Fila Descarga (min)', en: 'Dumping Queue (min)', es: 'Cola Descarga (min)', zh: '卸载排队 (min)' }, 'dec', false],
  ['R41_Pare_Siga', 'L41', { pt: 'Pare e Siga Rateado (min/viag)', en: 'Pro-rata Stop & Go (min/trip)', es: 'Pare y Siga Prorrateado (min/viaje)', zh: '交通管制分摊 (min/次)' }, 'dec', false],
  ['R42_Tempos_Fixos_h', 'L42', { pt: 'Tempos Fixos de Ciclo (h)', en: 'Fixed Cycle Time (h)', es: 'Tiempos Fijos de Ciclo (h)', zh: '固定循环耗时 (h)' }, 'dec', true],
  ['R43_Prod_th', 'L43', { pt: 'Produtividade Ponderada (t/h)', en: 'Weighted Productivity (t/h)', es: 'Productividad Ponderada (t/h)', zh: '加权小时生产率 (t/h)' }, 'dec', true],
  ['R44_Caminhoes_8x4', 'L44', { pt: 'Frota 8×4 Necessária (un.)', en: 'Required 8×4 Fleet (units)', es: 'Flota 8×4 Necesaria (un.)', zh: '所需 8×4 矿卡数 (台)' }, 'dec', true],
];

function parseIso(txt: string): Date {
  return new Date(txt.replace(' ', 'T'));
}

const turnoPeloHorario = (dt: Date) => (dt.getHours() >= 7 && dt.getHours() < 19 ? 'T1' : 'T2');

function mapMacro(op: string, lito: string): MacroGroup {
  if (op === 'BENEF') return 'Benef.';
  if (op === 'AUX') return 'Mov. Aux.';
  if (op === 'EST') return 'Estéril';
  if (lito === 'GOETHITA') return 'Goethita';
  return 'Itabirito';
}

function mediana(vals: number[], padrao = 0): number {
  if (!vals.length) return padrao;
  const s = [...vals].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

function quantile(sorted: number[], q: number): number {
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  return sorted[base + 1] !== undefined ? sorted[base] + rest * (sorted[base + 1] - sorted[base]) : sorted[base];
}

function iqrCleanMean(vals: number[]): number {
  if (!vals.length) return 0;
  if (vals.length < 4) return mediana(vals);
  const s = [...vals].sort((a, b) => a - b);
  const q1 = quantile(s, 0.25);
  const q3 = quantile(s, 0.75);
  const iqr = q3 - q1;
  const limpa = s.filter((v) => v >= q1 - 1.5 * iqr && v <= q3 + 1.5 * iqr);
  return limpa.length ? limpa.reduce((a, b) => a + b, 0) / limpa.length : mediana(s);
}

const r2 = (v: number) => Math.round(v * 100) / 100;
const r4 = (v: number) => Math.round(v * 10000) / 10000;

function generateSyntheticDataset(cfg: ScenarioConfig): { prod: ProdRecord[]; apon: AponRecord[] } {
  const prod: ProdRecord[] = [];
  const apon: AponRecord[] = [];
  const fleet = ['TR-01', 'TR-02', 'TR-03', 'TR-04', 'TR-05', 'TR-06', 'TR-07', 'TR-08', 'TR-09', 'TR-10'];
  const routes: [string, string, string, string, number][] = [
    ['LAVRA', 'GOETHITA', 'Frente Norte 1', 'Britagem Primária', cfg.dmts_km.Goethita * 1000],
    ['LAVRA', 'ITABIRITO', 'Frente Sul 2', 'Pátio Homogeneização', cfg.dmts_km.Itabirito * 1000],
    ['EST', 'ESTERIL', 'Bancada Leste', 'Pilha de Estéril', cfg.dmts_km.Estéril * 1000],
    ['AUX', 'MOV_AUX', 'Pátio Intermediário', 'Alimentação Planta', cfg.dmts_km['Mov. Aux.'] * 1000],
    ['BENEF', 'BENEF_GOE', 'Pilha Produto A', 'Expedição', cfg.dmts_km['Benef. Goethita'] * 1000],
  ];

  for (let d = 1; d <= 12; d++) {
    const ds = `2026-10-${String(d).padStart(2, '0')}`;
    for (let u = 0; u < fleet.length; u++) {
      const unit = fleet[u];
      const [op, lito, orig, dest, dmtBase] = routes[(d + u) % routes.length];
      const cava = (d + u) % 3 === 0 ? 'CAVA 2' : 'CAVA 1';
      for (let k = 0; k < 7; k++) {
        const hr = 7 + k * 2;
        prod.push({
          dtRegistroTurno: `${ds} 00:00:00`,
          dtRegistroIni: `${ds} ${String(hr).padStart(2, '0')}:15:00`,
          nomeEquipamento: unit,
          nomeTipoEquipamento: 'Transporte',
          nomeOperacao: op,
          nomeLitologia: lito,
          nomeCava: cava,
          nomeOrigem: orig,
          nomeDestino: dest,
          massa: 30.2 + ((k + d) % 4) * 0.75,
          velocidadeMediaCheio: (12.0 + ((k + d) % 4) * 0.85) * cfg.speedFactor,
          velocidadeMediaVazio: (16.0 + ((k + d) % 4) * 1.05) * cfg.speedFactor,
          dmtMovCheio: dmtBase + (k % 3) * 70,
          dmtMovVazio: dmtBase + (k % 2) * 55,
        });
        apon.push({
          dtRegistroTurno: `${ds} 00:00:00`,
          dtRegistro: `${ds} ${String(hr).padStart(2, '0')}:04:00`,
          nomeEquipamento: unit,
          nomeTipoEquipamento: 'Transporte',
          nomeEstado: 'Manobra no Carregamento',
          nomeTipoEstado: 'Operando',
          tempoMinuto: 1.15,
        });
        apon.push({
          dtRegistroTurno: `${ds} 00:00:00`,
          dtRegistro: `${ds} ${String(hr).padStart(2, '0')}:06:00`,
          nomeEquipamento: unit,
          nomeTipoEquipamento: 'Transporte',
          nomeEstado: 'Carregando',
          nomeTipoEstado: 'Operando',
          tempoMinuto: 3.05,
        });
        apon.push({
          dtRegistroTurno: `${ds} 00:00:00`,
          dtRegistro: `${ds} ${String(hr).padStart(2, '0')}:10:00`,
          nomeEquipamento: unit,
          nomeTipoEquipamento: 'Transporte',
          nomeEstado: 'Fila no Carregamento',
          nomeTipoEstado: 'Atraso Operacional',
          tempoMinuto: 2.3,
        });
        apon.push({
          dtRegistroTurno: `${ds} 00:00:00`,
          dtRegistro: `${ds} ${String(hr).padStart(2, '0')}:32:00`,
          nomeEquipamento: unit,
          nomeTipoEquipamento: 'Transporte',
          nomeEstado: 'Basculando',
          nomeTipoEstado: 'Operando',
          tempoMinuto: 1.2,
        });
      }
      apon.push({
        dtRegistroTurno: `${ds} 00:00:00`,
        dtRegistro: `${ds} 12:00:00`,
        nomeEquipamento: unit,
        nomeTipoEquipamento: 'Transporte',
        nomeEstado: 'Refeição Lanche',
        nomeTipoEstado: 'Improdutiva Interna',
        tempoMinuto: 60,
      });
      apon.push({
        dtRegistroTurno: `${ds} 00:00:00`,
        dtRegistro: `${ds} 22:00:00`,
        nomeEquipamento: unit,
        nomeTipoEquipamento: 'Transporte',
        nomeEstado: 'Refeição Lanche',
        nomeTipoEstado: 'Improdutiva Interna',
        tempoMinuto: 60,
      });
      apon.push({
        dtRegistroTurno: `${ds} 00:00:00`,
        dtRegistro: `${ds} 06:50:00`,
        nomeEquipamento: unit,
        nomeTipoEquipamento: 'Transporte',
        nomeEstado: 'Troca de Turno',
        nomeTipoEstado: 'Improdutiva Interna',
        tempoMinuto: 34,
      });
      apon.push({
        dtRegistroTurno: `${ds} 00:00:00`,
        dtRegistro: `${ds} 15:20:00`,
        nomeEquipamento: unit,
        nomeTipoEquipamento: 'Transporte',
        nomeEstado: 'Pare e Siga / Acesso Bloqueado',
        nomeTipoEstado: 'Atraso Operacional',
        tempoMinuto: cfg.pareSigaMin,
      });
      if (cfg.mauTempoMinDia > 0) {
        apon.push({
          dtRegistroTurno: `${ds} 00:00:00`,
          dtRegistro: `${ds} 16:40:00`,
          nomeEquipamento: unit,
          nomeTipoEquipamento: 'Transporte',
          nomeEstado: 'Mau Tempo / Chuva',
          nomeTipoEstado: 'Improdutiva Externa',
          tempoMinuto: cfg.mauTempoMinDia,
        });
      }
      apon.push({
        dtRegistroTurno: `${ds} 00:00:00`,
        dtRegistro: `${ds} 14:00:00`,
        nomeEquipamento: unit,
        nomeTipoEquipamento: 'Transporte',
        nomeEstado: 'Movimentando Cheio',
        nomeTipoEstado: 'Operando',
        tempoMinuto: 930 - cfg.mauTempoMinDia,
      });
      apon.push({
        dtRegistroTurno: `${ds} 00:00:00`,
        dtRegistro: `${ds} 01:00:00`,
        nomeEquipamento: unit,
        nomeTipoEquipamento: 'Transporte',
        nomeEstado: 'Manutenção Corretiva',
        nomeTipoEstado: 'Manutenção Corretiva',
        tempoMinuto: d % 4 === 0 ? cfg.manutMinDia + 55 : cfg.manutMinDia,
      });
    }
  }
  return { prod, apon };
}

function runSizingEngine(
  scenarioKey: ScenarioKey,
  modo: 'plano' | 'auto',
  regraDf: 'tipo_estado' | 'palavra_chave',
  cavaFilter: '' | 'CAVA 1' | 'CAVA 2'
) {
  const cfg = SCENARIOS[scenarioKey];
  const { prod: prodRaw, apon: aponRaw } = generateSyntheticDataset(cfg);
  const diasMes = 30;

  const prodMes = prodRaw
    .filter((p) => !cavaFilter || p.nomeCava === cavaFilter)
    .map((p) => {
      const dtIni = parseIso(p.dtRegistroIni);
      return {
        ...p,
        dt_ini: dtIni,
        dia_norm: p.dtRegistroTurno.slice(0, 10),
        turno: turnoPeloHorario(dtIni),
        lito_cat: mapMacro(p.nomeOperacao, p.nomeLitologia),
      };
    });

  const allowedByCava = cavaFilter
    ? new Set(prodMes.map((p) => `${p.nomeEquipamento}|${p.dia_norm}|${p.turno}`))
    : null;

  const aponMes = aponRaw
    .map((a) => {
      const dtIni = parseIso(a.dtRegistro);
      return {
        ...a,
        dt_ini: dtIni,
        dia_norm: a.dtRegistroTurno.slice(0, 10),
        turno: turnoPeloHorario(dtIni),
      };
    })
    .filter((a) => !allowedByCava || allowedByCava.has(`${a.nomeEquipamento}|${a.dia_norm}|${a.turno}`));

  let dispH = 0;
  let manH = 0;
  let prodH = 0;
  let opH = 0;
  for (const a of aponMes) {
    const h = a.tempoMinuto / 60;
    if (TIPOS_DISP.has(a.nomeTipoEstado)) dispH += h;
    if (TIPOS_MANUT.has(a.nomeTipoEstado)) manH += h;
    if (TIPOS_PROD.has(a.nomeTipoEstado)) prodH += h;
    if (a.nomeTipoEstado === 'Operando') opH += h;
  }
  const calH = dispH + manH;
  const cronoAll = {
    DF: calH > 0 ? dispH / calH : 0,
    UG: dispH > 0 ? prodH / dispH : 0,
    UE: dispH > 0 ? opH / dispH : 0,
    EO: prodH > 0 ? opH / prodH : 0,
  };

  const minutos: Record<string, number> = {};
  const unitsByDay: Record<string, Set<string>> = {};
  for (const a of aponMes) {
    minutos[a.dia_norm] = (minutos[a.dia_norm] || 0) + a.tempoMinuto;
    (unitsByDay[a.dia_norm] ||= new Set()).add(a.nomeEquipamento);
  }
  const todosDias = new Set(Object.keys(minutos));
  const diasFechados = new Set(
    Object.keys(minutos).filter((d) => unitsByDay[d].size > 0 && minutos[d] / (unitsByDay[d].size * 1440) >= 0.75)
  );
  const diasCalc = diasFechados.size > 0 ? diasFechados : todosDias;

  let massas: Record<Col6, number>;
  let dmts: Record<Col6, number>;
  if (modo === 'plano') {
    const scale = cavaFilter === 'CAVA 2' ? 0.35 : cavaFilter === 'CAVA 1' ? 0.65 : 1;
    const goe = cfg.massas_t.Goethita * scale;
    const ita = cfg.massas_t.Itabirito * scale;
    const est = cfg.massas_t.Estéril * scale;
    massas = {
      Goethita: goe,
      Itabirito: ita,
      Estéril: est,
      'Mov. Aux.': (goe + ita + est) * 0.03 + 10000 * scale,
      'Benef. Goethita': goe,
      'Benef. Itabirito': ita,
    };
    dmts = { ...cfg.dmts_km };
  } else {
    const fator = diasMes / Math.max(diasCalc.size, 1);
    const acum: Record<string, number> = {};
    for (const p of prodMes) acum[p.lito_cat] = (acum[p.lito_cat] || 0) + p.massa;
    const goe = r2((acum.Goethita || 0) * fator);
    const ita = r2((acum.Itabirito || 0) * fator);
    const est = r2((acum.Estéril || 0) * fator);
    massas = {
      Goethita: goe,
      Itabirito: ita,
      Estéril: est,
      'Mov. Aux.': r2((goe + ita + est) * 0.03 + 10000),
      'Benef. Goethita': goe,
      'Benef. Itabirito': ita,
    };
    const num: Record<string, number> = {};
    const den: Record<string, number> = {};
    for (const p of prodMes) {
      const d = p.dmtMovCheio / 1000;
      num[p.lito_cat] = (num[p.lito_cat] || 0) + p.massa * d;
      den[p.lito_cat] = (den[p.lito_cat] || 0) + p.massa;
    }
    dmts = {
      Goethita: den.Goethita ? r4(num.Goethita / den.Goethita) : cfg.dmts_km.Goethita,
      Itabirito: den.Itabirito ? r4(num.Itabirito / den.Itabirito) : cfg.dmts_km.Itabirito,
      Estéril: den.Estéril ? r4(num.Estéril / den.Estéril) : cfg.dmts_km.Estéril,
      'Mov. Aux.': den['Mov. Aux.'] ? r4(num['Mov. Aux.'] / den['Mov. Aux.']) : cfg.dmts_km['Mov. Aux.'],
      'Benef. Goethita': den['Benef.'] ? r4(num['Benef.'] / den['Benef.']) : cfg.dmts_km['Benef. Goethita'],
      'Benef. Itabirito': cfg.dmts_km['Benef. Itabirito'],
    };
  }

  let totMin = 0;
  let manMin = 0;
  for (const a of aponMes) {
    totMin += a.tempoMinuto;
    if (regraDf === 'tipo_estado') {
      if (TIPOS_MANUT.has(a.nomeTipoEstado)) manMin += a.tempoMinuto;
    } else if (a.nomeEstado.toLowerCase().includes('manuten')) {
      manMin += a.tempoMinuto;
    }
  }
  const df = totMin > 0 ? r4((totMin - manMin) / totMin) : 0.85;

  const carga: Record<string, number> = {};
  const vCh: Record<string, number> = {};
  const vVz: Record<string, number> = {};
  const kmCv: Record<string, number> = {};
  const gCarga = mediana(prodMes.map((p) => p.massa), 31);
  const gVch = iqrCleanMean(prodMes.map((p) => p.velocidadeMediaCheio)) || 12.5;
  const gVvz = iqrCleanMean(prodMes.map((p) => p.velocidadeMediaVazio)) || 16.5;

  for (const g of GRUPOS_5) {
    const ps = prodMes.filter((p) => p.lito_cat === g);
    carga[g] = r2(ps.length ? mediana(ps.map((p) => p.massa)) : gCarga);
    vCh[g] = r2(ps.length ? iqrCleanMean(ps.map((p) => p.velocidadeMediaCheio)) : gVch);
    vVz[g] = r2(ps.length ? iqrCleanMean(ps.map((p) => p.velocidadeMediaVazio)) : gVvz);
    kmCv[g] = r2(mediana(ps.map((p) => p.dmtMovCheio / (p.dmtMovVazio || 1)), 1.0));
  }

  const tabela: Record<ColAll, Record<string, number>> = {
    Goethita: {},
    Itabirito: {},
    Estéril: {},
    'Mov. Aux.': {},
    'Benef. Goethita': {},
    'Benef. Itabirito': {},
    Total: {},
  };

  const neb = r2((BASE_PREMISES.neblina_h_mes * 60) / diasMes);
  const det = BASE_PREMISES.detonacao_min_dia;

  for (const col of COLUNAS_6) {
    const g: MacroGroup = col.startsWith('Benef.') ? 'Benef.' : (col as MacroGroup);
    const massa = massas[col];
    const dmt = dmts[col];
    const mac = BASE_PREMISES.manut_acesso[col];
    const dsl = BASE_PREMISES.deslocamento[col];
    const ref = 120;
    const troca = 34;
    const abast = 12;
    const check = 8;
    const divers = 10;
    const hImpDia = (cfg.mauTempoMinDia + neb + ref + troca + abast + check + det + mac + dsl + divers) / 60;
    const uf = df > 0 ? Math.max(0.2, 1 - hImpDia / (24 * df)) : 0;
    const ps = r2(col === 'Benef. Itabirito' ? cfg.pareSigaMin / 14 : cfg.pareSigaMin / 7);
    const mc = 1.15;
    const car = 3.05;
    const mb = 0.85;
    const bas = 1.2;
    const fc = 2.3;
    const fd = 0.9;
    const tFixo = (mc + car + mb + bas + fc + fd + ps) / 60;
    const denomT = tFixo + dmt / (vCh[g] || 1) + dmt / (vVz[g] || 1) / (kmCv[g] || 1);
    const prodTh = denomT > 0 ? carga[g] / denomT : 0;
    const nCb = uf * df * prodTh * diasMes * 24 > 0 ? massa / (uf * df * prodTh * diasMes * 24) : 0;
    const hCal = 24 * diasMes * nCb;
    const hMan = hCal - hCal * df;
    tabela[col] = {
      R04_Dias: diasMes,
      R06_Massa: massa,
      R07_DMT: dmt,
      R09_Horas_Calendario: hCal,
      R10_Horas_Manutencao: hMan,
      R11_Horas_Disponivel: hCal - hMan,
      R12_Horas_Trabalhadas: prodTh > 0 ? massa / prodTh : 0,
      R13_Horas_Improdutivas: hImpDia * nCb * diasMes,
      R16_UF: uf,
      R17_DF: df,
      R18_RO: df * uf,
      R19_Carga_Med: carga[g],
      R20_Veloc_Cheio: vCh[g],
      R21_Veloc_Vazio: vVz[g],
      R22_Km_Ch_Vz: kmCv[g],
      R23_Precipitacao_mm: cfg.precipitacao_mm,
      R24_Mau_Tempo: cfg.mauTempoMinDia,
      R25_Neblina: neb,
      R26_Refeicao: ref,
      R27_Troca_Turno: troca,
      R28_Abastecimento: abast,
      R29_Checklist: check,
      R30_Detonacao: det,
      R31_Manut_Acesso: mac,
      R32_Deslocamento: dsl,
      R33_Diversos: divers,
      R34_H_Improd_Dia: hImpDia,
      R35_Manobra_Carga: mc,
      R36_Carregamento: car,
      R37_Manobra_Basc: mb,
      R38_Basculando: bas,
      R39_Fila_Carga: fc,
      R40_Fila_Descarga: fd,
      R41_Pare_Siga: ps,
      R42_Tempos_Fixos_h: tFixo,
      R43_Prod_th: prodTh,
      R44_Caminhoes_8x4: nCb,
    };
  }

  const somaKeys = new Set([
    'R06_Massa',
    'R09_Horas_Calendario',
    'R10_Horas_Manutencao',
    'R11_Horas_Disponivel',
    'R12_Horas_Trabalhadas',
    'R13_Horas_Improdutivas',
    'R44_Caminhoes_8x4',
  ]);
  const pesoCb = COLUNAS_6.reduce((s, c) => s + tabela[c].R44_Caminhoes_8x4, 0);
  const massaTot = COLUNAS_6.reduce((s, c) => s + tabela[c].R06_Massa, 0);
  for (const k of Object.keys(tabela.Goethita)) {
    if (k === 'R04_Dias') tabela.Total[k] = diasMes;
    else if (somaKeys.has(k)) tabela.Total[k] = COLUNAS_6.reduce((s, c) => s + tabela[c][k], 0);
    else if (k === 'R07_DMT') {
      tabela.Total[k] =
        massaTot > 0 ? COLUNAS_6.reduce((s, c) => s + tabela[c].R06_Massa * tabela[c][k], 0) / massaTot : 0;
    } else {
      tabela.Total[k] =
        pesoCb > 0 ? COLUNAS_6.reduce((s, c) => s + tabela[c].R44_Caminhoes_8x4 * tabela[c][k], 0) / pesoCb : 0;
    }
  }

  const cavas = {
    'CAVA 1': { v: 0, m: 0, dSum: 0, dW: 0, vc: [] as number[], vv: [] as number[] },
    'CAVA 2': { v: 0, m: 0, dSum: 0, dW: 0, vc: [] as number[], vv: [] as number[] },
  };
  for (const p of prodMes) {
    const key = p.nomeCava as 'CAVA 1' | 'CAVA 2';
    const c = cavas[key];
    if (!c) continue;
    const dC = p.dmtMovCheio / 1000;
    c.v++;
    c.m += p.massa;
    c.dSum += dC * p.massa;
    c.dW += p.massa;
    c.vc.push(p.velocidadeMediaCheio);
    c.vv.push(p.velocidadeMediaVazio);
  }

  return {
    tabela,
    cronoAll,
    viagens: prodMes.length,
    apontamentos: aponMes.length,
    diasFechados: diasFechados.size,
    diasTotais: todosDias.size,
    cavas,
  };
}

const UI_TEXT: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    adherenceBadge: string;
    fullDashboardBtn: string;
    scenarioLabel: string;
    scenDefault: string;
    scenRain: string;
    scenPeak: string;
    modeLabel: string;
    modePlan: string;
    modeAuto: string;
    dfRuleLabel: string;
    dfOfficial: string;
    dfLegacy: string;
    cavaLabel: string;
    cavaAll: string;
    cava1: string;
    cava2: string;
    resetBtn: string;
    exportCsvBtn: string;
    sourceNote: string;
    kpiDf: string;
    kpiUg: string;
    kpiUe: string;
    kpiEo: string;
    kpiProd: string;
    kpiTrips: string;
    kpiClosedDays: (closed: number, total: number) => string;
    kpiFleet: string;
    kpiTrucksSub: string;
    cycleTitle: string;
    cycleLegLoad: string;
    cycleLegQueue: string;
    cycleLegStopGo: string;
    cycleLegMove: string;
    cavaTitle: string;
    cavaMass: string;
    cavaTrips: string;
    cavaDmt: string;
    cavaSpeed: string;
    matrixTitle: string;
    matrixSubtitle: string;
    colLine: string;
    colIndicator: string;
    showFullMatrix: (hidden: number) => string;
    showSummaryMatrix: string;
    footerNote: string;
  }
> = {
  pt: {
    title: 'Engine de Dimensionamento de Frota 8×4 & Cronoanálise (L04–L44)',
    subtitle: 'Simulação com dados fictícios · Arquitetura API REST + Cloudflare Workers · Limpeza IQR e Mediana',
    adherenceBadge: '>97% aderência histórica',
    fullDashboardBtn: 'Abrir painel completo',
    scenarioLabel: 'Cenário',
    scenDefault: 'Operação Padrão (Seco)',
    scenRain: 'Período Chuvoso (+DMT)',
    scenPeak: 'Pico de Produção (+15%)',
    modeLabel: 'Modo',
    modePlan: 'Plano Mensal (L06)',
    modeAuto: 'Projeção Automática',
    dfRuleLabel: 'Regra DF',
    dfOfficial: 'Oficial (tipo_estado)',
    dfLegacy: 'Legado Planilha',
    cavaLabel: 'Cava',
    cavaAll: 'Todas as cavas',
    cava1: 'Cava 1',
    cava2: 'Cava 2',
    resetBtn: 'Restaurar',
    exportCsvBtn: 'Exportar CSV',
    sourceNote: 'Base demonstrativa fictícia (12 dias fechados · frota simulada TR-01 a TR-10 · Cava 1 / Cava 2)',
    kpiDf: 'Disponibilidade (DF)',
    kpiUg: 'Utilização Global (UG)',
    kpiUe: 'Utilização Efetiva (UE)',
    kpiEo: 'Eficiência Oper. (EO)',
    kpiProd: 'Produtividade (L43)',
    kpiTrips: 'Viagens / Dias Fech.',
    kpiClosedDays: (c, t) => `${c}/${t} dias ≥75% cob.`,
    kpiFleet: 'Frota 8×4 Necessária (L44)',
    kpiTrucksSub: 'Caminhões 8×4 dimensionados',
    cycleTitle: 'Decomposição do Ciclo por Rota (min/viagem — GMG)',
    cycleLegLoad: 'Carga/Basc',
    cycleLegQueue: 'Filas/Manobra',
    cycleLegStopGo: 'Pare & Siga',
    cycleLegMove: 'Movimento (Ch/Vz)',
    cavaTitle: 'Comparativo Operacional por Cava (IQR & DMT)',
    cavaMass: 'Massa',
    cavaTrips: 'Viagens',
    cavaDmt: 'DMT Média',
    cavaSpeed: 'Vel. Cheio / Vazio',
    matrixTitle: 'Matriz Matemática de Dimensionamento (L04–L44)',
    matrixSubtitle: 'Dados fictícios · cálculo ponderado por litologia e operação',
    colLine: 'Linha',
    colIndicator: 'Indicador',
    showFullMatrix: (n) => `Exibir matriz completa (+${n} linhas L04–L44)`,
    showSummaryMatrix: 'Mostrar apenas resumo (9 linhas principais)',
    footerNote:
      'Simulação client-side com dados fictícios (Goethita, Itabirito, Cava 1, Cava 2). Em produção, integra-se via proxy Cloudflare Workers à API REST do despacho.',
  },
  en: {
    title: '8×4 Fleet Sizing & Time-Motion Engine (L04–L44)',
    subtitle: 'Sample simulation · REST API + Cloudflare Workers architecture · IQR Outlier Cleaning & Median',
    adherenceBadge: '>97% historical adherence',
    fullDashboardBtn: 'Open full BI panel',
    scenarioLabel: 'Scenario',
    scenDefault: 'Standard Dry Shift',
    scenRain: 'Rainy Season (+DMT)',
    scenPeak: 'Peak Production (+15%)',
    modeLabel: 'Mode',
    modePlan: 'Monthly Plan (L06)',
    modeAuto: 'Auto Projection',
    dfRuleLabel: 'PA/DF Rule',
    dfOfficial: 'Official (state_type)',
    dfLegacy: 'Legacy Spreadsheet',
    cavaLabel: 'Pit',
    cavaAll: 'All pits',
    cava1: 'Pit 1',
    cava2: 'Pit 2',
    resetBtn: 'Reset',
    exportCsvBtn: 'Export CSV',
    sourceNote: 'Synthetic sample dataset (12 closed days · simulated fleet TR-01 to TR-10 · Pit 1 / Pit 2)',
    kpiDf: 'Physical Avail. (PA/DF)',
    kpiUg: 'Global Util. (UG)',
    kpiUe: 'Effective Util. (UE)',
    kpiEo: 'Oper. Efficiency (EO)',
    kpiProd: 'Productivity (L43)',
    kpiTrips: 'Trips / Closed Days',
    kpiClosedDays: (c, t) => `${c}/${t} days ≥75% cov.`,
    kpiFleet: 'Required 8×4 Fleet (L44)',
    kpiTrucksSub: 'Sized 8×4 haul trucks',
    cycleTitle: 'GMG Cycle Time Decomposition by Route (min/trip)',
    cycleLegLoad: 'Load/Dump',
    cycleLegQueue: 'Queue/Spot',
    cycleLegStopGo: 'Stop & Go',
    cycleLegMove: 'Travel (Load/Empty)',
    cavaTitle: 'Pit Operational Comparison (IQR & Haul Distance)',
    cavaMass: 'Tonnage',
    cavaTrips: 'Trips',
    cavaDmt: 'Mean DMT',
    cavaSpeed: 'Loaded / Empty Speed',
    matrixTitle: 'Mathematical Fleet Sizing Matrix (L04–L44)',
    matrixSubtitle: 'Sample data · weighted calculation across lithology and operation groups',
    colLine: 'Row',
    colIndicator: 'Indicator',
    showFullMatrix: (n) => `Show full matrix (+${n} rows L04–L44)`,
    showSummaryMatrix: 'Show summary only (9 key rows)',
    footerNote:
      'Client-side simulation with synthetic data (Goethite, Itabirite, Pit 1, Pit 2). Production integrates via Cloudflare Workers proxy with dispatch REST API.',
  },
  es: {
    title: 'Motor de Dimensionamiento de Flota 8×4 y Cronoanálisis (L04–L44)',
    subtitle: 'Simulación con datos ficticios · Arquitectura API REST + Cloudflare Workers · Limpieza IQR',
    adherenceBadge: '>97% adherencia histórica',
    fullDashboardBtn: 'Abrir panel completo',
    scenarioLabel: 'Escenario',
    scenDefault: 'Operación Estándar (Seco)',
    scenRain: 'Temporada Lluviosa (+DMT)',
    scenPeak: 'Pico de Producción (+15%)',
    modeLabel: 'Modo',
    modePlan: 'Plan Mensual (L06)',
    modeAuto: 'Proyección Automática',
    dfRuleLabel: 'Regla DF',
    dfOfficial: 'Oficial (tipo_estado)',
    dfLegacy: 'Legado Planilla',
    cavaLabel: 'Tajo',
    cavaAll: 'Todos los tajos',
    cava1: 'Tajo 1',
    cava2: 'Tajo 2',
    resetBtn: 'Restaurar',
    exportCsvBtn: 'Exportar CSV',
    sourceNote: 'Base demostrativa ficticia (12 días cerrados · flota simulada TR-01 a TR-10 · Tajo 1 / Tajo 2)',
    kpiDf: 'Disponibilidad (DF)',
    kpiUg: 'Utilización Global (UG)',
    kpiUe: 'Utilización Efectiva (UE)',
    kpiEo: 'Eficiencia Oper. (EO)',
    kpiProd: 'Productividad (L43)',
    kpiTrips: 'Viajes / Días Cerr.',
    kpiClosedDays: (c, t) => `${c}/${t} días ≥75% cob.`,
    kpiFleet: 'Flota 8×4 Necesaria (L44)',
    kpiTrucksSub: 'Camiones 8×4 dimensionados',
    cycleTitle: 'Descomposición del Ciclo por Ruta (min/viaje — GMG)',
    cycleLegLoad: 'Carga/Desc',
    cycleLegQueue: 'Colas/Maniobra',
    cycleLegStopGo: 'Pare y Siga',
    cycleLegMove: 'Movimiento (Ll/Vc)',
    cavaTitle: 'Comparativo Operacional por Tajo (IQR y DMT)',
    cavaMass: 'Masa',
    cavaTrips: 'Viajes',
    cavaDmt: 'DMT Media',
    cavaSpeed: 'Vel. Lleno / Vacío',
    matrixTitle: 'Matriz Matemática de Dimensionamiento (L04–L44)',
    matrixSubtitle: 'Datos ficticios · cálculo ponderado por litología y operación',
    colLine: 'Línea',
    colIndicator: 'Indicador',
    showFullMatrix: (n) => `Mostrar matriz completa (+${n} líneas L04–L44)`,
    showSummaryMatrix: 'Mostrar resumen (9 líneas principales)',
    footerNote:
      'Simulación client-side con datos ficticios (Goethita, Itabirito, Tajo 1, Tajo 2). En producción integra la API REST mediante proxy en Cloudflare Workers.',
  },
  zh: {
    title: '8×4 矿卡车队运力配置与时动分析引擎 (L04–L44)',
    subtitle: '虚构示例数据演示 · REST API + Cloudflare Workers 架构 · IQR 离群清洗与中位数',
    adherenceBadge: '>97% 历史月结吻合度',
    fullDashboardBtn: '打开完整 BI 看板',
    scenarioLabel: '场景',
    scenDefault: '标准旱季工况',
    scenRain: '雨季长运距工况',
    scenPeak: '产能高峰 (+15%)',
    modeLabel: '模式',
    modePlan: '月度计划基准 (L06)',
    modeAuto: '自动外推预测',
    dfRuleLabel: '完好率规则',
    dfOfficial: '官方标准 (tipo_estado)',
    dfLegacy: '传统关键字',
    cavaLabel: '采场',
    cavaAll: '全部采场',
    cava1: '1号采场',
    cava2: '2号采场',
    resetBtn: '重置',
    exportCsvBtn: '导出 CSV',
    sourceNote: '虚构示例数据集（12 个完整结账日 · 模拟车队 TR-01 至 TR-10 · 1号/2号采场）',
    kpiDf: '物理完好率 (DF)',
    kpiUg: '综合利用率 (UG)',
    kpiUe: '有效利用率 (UE)',
    kpiEo: '运营效率 (EO)',
    kpiProd: '加权生产率 (L43)',
    kpiTrips: '车次 / 完整日',
    kpiClosedDays: (c, t) => `${c}/${t} 天覆盖率 ≥75%`,
    kpiFleet: '所需 8×4 矿卡数 (L44)',
    kpiTrucksSub: '模型计算的 8×4 矿卡配置',
    cycleTitle: '各路线 GMG 循环耗时分解 (分钟/车次)',
    cycleLegLoad: '装卸作业',
    cycleLegQueue: '排队/对位',
    cycleLegStopGo: '交通管制',
    cycleLegMove: '重空行驶',
    cavaTitle: '采场运营对比 (IQR 车速与平均运距)',
    cavaMass: '总运量',
    cavaTrips: '总车次',
    cavaDmt: '平均运距',
    cavaSpeed: '重车 / 空车速度',
    matrixTitle: '车队运力配置数学矩阵 (L04–L44)',
    matrixSubtitle: '虚构示例数据 · 按岩性与作业类型加权计算',
    colLine: '行号',
    colIndicator: '指标名称',
    showFullMatrix: (n) => `展开完整 37 行矩阵 (+${n} 行 L04–L44)`,
    showSummaryMatrix: '仅显示核心摘要 (9 行关键指标)',
    footerNote: '基于虚构示例数据在浏览器端实时计算；生产环境通过 Cloudflare Workers 代理直连调度 REST API。',
  },
};

const LOCALE_MAP: Record<Lang, string> = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
  zh: 'zh-CN',
};

interface DimSimulatorProps {
  lang: Lang;
}

export default function DimSimulator({ lang }: DimSimulatorProps) {
  const ui = UI_TEXT[lang];
  const locale = LOCALE_MAP[lang];

  const [scenario, setScenario] = useState<ScenarioKey>('padrao');
  const [modo, setModo] = useState<'plano' | 'auto'>('plano');
  const [regraDf, setRegraDf] = useState<'tipo_estado' | 'palavra_chave'>('tipo_estado');
  const [cavaFilter, setCavaFilter] = useState<'' | 'CAVA 1' | 'CAVA 2'>('');
  const [showAllRows, setShowAllRows] = useState(false);

  const res = useMemo(
    () => runSizingEngine(scenario, modo, regraDf, cavaFilter),
    [scenario, modo, regraDf, cavaFilter]
  );

  const handleReset = () => {
    setScenario('padrao');
    setModo('plano');
    setRegraDf('tipo_estado');
    setCavaFilter('');
    setShowAllRows(false);
  };

  const handleExportCsv = () => {
    const rows = ['cenario;linha;indicador;coluna;valor'];
    for (const col of [...COLUNAS_6, 'Total'] as ColAll[]) {
      for (const [k, ln, labelMap] of LINHAS_SPEC) {
        rows.push(`${scenario};${ln};${labelMap[lang]};${col};${(res.tabela[col][k] || 0).toFixed(6)}`);
      }
    }
    const blob = new Blob(['\uFEFF' + rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `dimensionamento_simulacao_${scenario}.csv`;
    a.click();
  };

  const fmtNum = (v: number) =>
    Number(v || 0).toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtPct = (v: number) =>
    `${(Number(v || 0) * 100).toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

  const visibleSpec = showAllRows ? LINHAS_SPEC : LINHAS_SPEC.filter(([, , , , isSummary]) => isSummary);
  const hiddenRowsCount = LINHAS_SPEC.length - LINHAS_SPEC.filter(([, , , , isSummary]) => isSummary).length;

  const maxCic = Math.max(
    ...COLUNAS_6.map((c) => {
      const t = res.tabela[c];
      return (
        (t.R42_Tempos_Fixos_h +
          t.R07_DMT / (t.R20_Veloc_Cheio || 1) +
          t.R07_DMT / (t.R21_Veloc_Vazio || 1) / (t.R22_Km_Ch_Vz || 1)) *
        60
      );
    }),
    1
  );

  const totCavaMass = res.cavas['CAVA 1'].m + res.cavas['CAVA 2'].m || 1;
  const mean = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);

  return (
    <div className="lab-shell">
      <div className="lab-bar">
        <div className="lab-bar-lead">
          <span className="beacon-dot" aria-hidden="true" />
          <div>
            <div className="lab-bar-title">{ui.title}</div>
            <div className="lab-bar-sub">{ui.subtitle}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="case-badge prod">{ui.adherenceBadge}</span>
        </div>
      </div>

      <div className="bre-body">
        <div className="dim-toolbar">
          <div className="dim-controls-group">
            <label className="dim-ctrl">
              <span>{ui.scenarioLabel}</span>
              <select value={scenario} onChange={(e) => setScenario(e.target.value as ScenarioKey)}>
                <option value="padrao">{ui.scenDefault}</option>
                <option value="chuvoso">{ui.scenRain}</option>
                <option value="pico">{ui.scenPeak}</option>
              </select>
            </label>

            <label className="dim-ctrl">
              <span>{ui.modeLabel}</span>
              <select value={modo} onChange={(e) => setModo(e.target.value as 'plano' | 'auto')}>
                <option value="plano">{ui.modePlan}</option>
                <option value="auto">{ui.modeAuto}</option>
              </select>
            </label>

            <label className="dim-ctrl">
              <span>{ui.dfRuleLabel}</span>
              <select
                value={regraDf}
                onChange={(e) => setRegraDf(e.target.value as 'tipo_estado' | 'palavra_chave')}
              >
                <option value="tipo_estado">{ui.dfOfficial}</option>
                <option value="palavra_chave">{ui.dfLegacy}</option>
              </select>
            </label>

            <label className="dim-ctrl">
              <span>{ui.cavaLabel}</span>
              <select
                value={cavaFilter}
                onChange={(e) => setCavaFilter(e.target.value as '' | 'CAVA 1' | 'CAVA 2')}
              >
                <option value="">{ui.cavaAll}</option>
                <option value="CAVA 1">{ui.cava1}</option>
                <option value="CAVA 2">{ui.cava2}</option>
              </select>
            </label>
          </div>

          <div className="dim-actions-group">
            <button
              type="button"
              className="btn-secondary"
              onClick={handleReset}
              style={{ padding: '8px 13px', fontSize: '12.5px' }}
            >
              <RotateCcw size={13} />
              <span>{ui.resetBtn}</span>
            </button>

            <button
              type="button"
              className="btn-primary"
              onClick={handleExportCsv}
              style={{ padding: '8px 15px', fontSize: '12.5px' }}
            >
              <Download size={14} />
              <span>{ui.exportCsvBtn}</span>
            </button>
          </div>
        </div>

        <div className="bre-log-box" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ color: 'var(--accent-signal)' }}>&gt;</span>{' '}
            <strong>{ui.sourceNote}</strong>
          </div>
          <div style={{ color: 'var(--text-muted)' }}>
            {res.viagens.toLocaleString(locale)} viagens · {res.apontamentos.toLocaleString(locale)} apontamentos
          </div>
        </div>

        <div className="dim-kpis-grid">
          <div className="bre-stat">
            <div className="bre-stat-lbl">{ui.kpiDf}</div>
            <div className="bre-stat-val" style={{ color: '#dfc076' }}>
              {fmtPct(res.cronoAll.DF)}
            </div>
            <div className="sic-kpi-u">L17: {fmtPct(res.tabela.Total.R17_DF)}</div>
          </div>

          <div className="bre-stat">
            <div className="bre-stat-lbl">{ui.kpiUg}</div>
            <div className="bre-stat-val" style={{ color: '#94a7b8' }}>
              {fmtPct(res.cronoAll.UG)}
            </div>
            <div className="sic-kpi-u">L16 UF: {fmtPct(res.tabela.Total.R16_UF)}</div>
          </div>

          <div className="bre-stat">
            <div className="bre-stat-lbl">{ui.kpiUe}</div>
            <div className="bre-stat-val" style={{ color: '#b88e62' }}>
              {fmtPct(res.cronoAll.UE)}
            </div>
            <div className="sic-kpi-u">L18 RO: {fmtPct(res.tabela.Total.R18_RO)}</div>
          </div>

          <div className="bre-stat">
            <div className="bre-stat-lbl">{ui.kpiEo}</div>
            <div className="bre-stat-val">{fmtPct(res.cronoAll.EO)}</div>
            <div className="sic-kpi-u">UE / UG</div>
          </div>

          <div className="bre-stat">
            <div className="bre-stat-lbl">{ui.kpiProd}</div>
            <div className="bre-stat-val" style={{ color: '#dfc076' }}>
              {fmtNum(res.tabela.Total.R43_Prod_th)}
            </div>
            <div className="sic-kpi-u">t/h ponderada</div>
          </div>

          <div className="bre-stat">
            <div className="bre-stat-lbl">{ui.kpiTrips}</div>
            <div className="bre-stat-val">{res.viagens.toLocaleString(locale)}</div>
            <div className="sic-kpi-u">{ui.kpiClosedDays(res.diasFechados, res.diasTotais)}</div>
          </div>

          <div className="bre-stat dim-stat-highlight">
            <div className="bre-stat-lbl">{ui.kpiFleet}</div>
            <div className="bre-stat-val" style={{ color: 'var(--accent-bright)' }}>
              {fmtNum(res.tabela.Total.R44_Caminhoes_8x4)}
            </div>
            <div className="sic-kpi-u">{ui.kpiTrucksSub}</div>
          </div>
        </div>

        <div className="dim-visual-grid">
          <div className="dim-panel">
            <div className="dim-panel-title">{ui.cycleTitle}</div>
            <div className="dim-legend">
              <span>
                <i style={{ background: '#dfc076' }} />
                {ui.cycleLegLoad}
              </span>
              <span>
                <i style={{ background: '#b88e62' }} />
                {ui.cycleLegQueue}
              </span>
              <span>
                <i style={{ background: '#c4624a' }} />
                {ui.cycleLegStopGo}
              </span>
              <span>
                <i style={{ background: '#94a7b8' }} />
                {ui.cycleLegMove}
              </span>
            </div>
            <div className="dim-bars-list">
              {COLUNAS_6.map((c) => {
                const t = res.tabela[c];
                const cb = t.R36_Carregamento + t.R38_Basculando;
                const fm = t.R35_Manobra_Carga + t.R37_Manobra_Basc + t.R39_Fila_Carga + t.R40_Fila_Descarga;
                const ps = t.R41_Pare_Siga;
                const mv =
                  (t.R07_DMT / (t.R20_Veloc_Cheio || 1) +
                    t.R07_DMT / (t.R21_Veloc_Vazio || 1) / (t.R22_Km_Ch_Vz || 1)) *
                  60;
                const totMin = cb + fm + ps + mv;
                return (
                  <div key={c} className="dim-cycle-row">
                    <span className="dim-cycle-lbl">{c}</span>
                    <div
                      className="dim-stacked-track"
                      title={`${ui.cycleLegLoad}: ${cb.toFixed(1)}m | ${ui.cycleLegQueue}: ${fm.toFixed(1)}m | ${ui.cycleLegStopGo}: ${ps.toFixed(1)}m | ${ui.cycleLegMove}: ${mv.toFixed(1)}m`}
                    >
                      <div style={{ width: `${(cb / maxCic) * 100}%`, background: '#dfc076' }} />
                      <div style={{ width: `${(fm / maxCic) * 100}%`, background: '#b88e62' }} />
                      <div style={{ width: `${(ps / maxCic) * 100}%`, background: '#c4624a' }} />
                      <div style={{ width: `${(mv / maxCic) * 100}%`, background: '#94a7b8' }} />
                    </div>
                    <span className="dim-cycle-val">{totMin.toFixed(1)} min</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="dim-panel">
            <div className="dim-panel-title">{ui.cavaTitle}</div>
            <div className="dim-cava-cards">
              {(['CAVA 1', 'CAVA 2'] as const).map((nome) => {
                const c = res.cavas[nome];
                const pct = (c.m / totCavaMass) * 100;
                const dmt = c.dW > 0 ? c.dSum / c.dW : 0;
                const vcM = mean(c.vc);
                const vvM = mean(c.vv);
                const accent = nome === 'CAVA 1' ? '#dfc076' : '#94a7b8';
                const label = nome === 'CAVA 1' ? ui.cava1 : ui.cava2;
                return (
                  <div key={nome} className="dim-cava-card">
                    <div className="dim-cava-head">
                      <strong>{label}</strong>
                      <span style={{ color: accent, fontFamily: 'var(--font-mono)', fontSize: '11.5px' }}>
                        {pct.toFixed(1)}%
                      </span>
                    </div>
                    <div className="sic-progress-track" style={{ height: '5px', marginBottom: '10px' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${pct.toFixed(1)}%`,
                          background: accent,
                          borderRadius: '999px',
                        }}
                      />
                    </div>
                    <div className="dim-cava-metrics">
                      <div>
                        <span>{ui.cavaMass}</span>
                        <b>{Math.round(c.m).toLocaleString(locale)} t</b>
                      </div>
                      <div>
                        <span>{ui.cavaTrips}</span>
                        <b>{c.v.toLocaleString(locale)}</b>
                      </div>
                      <div>
                        <span>{ui.cavaDmt}</span>
                        <b>{dmt.toFixed(2)} km</b>
                      </div>
                      <div>
                        <span>{ui.cavaSpeed}</span>
                        <b>
                          {vcM.toFixed(1)} / {vvM.toFixed(1)} km/h
                        </b>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bre-tbl-wrap">
          <div className="dim-matrix-head">
            <div>
              <strong style={{ color: 'var(--text)', fontSize: '13px' }}>{ui.matrixTitle}</strong>
              <span style={{ color: 'var(--text-muted)', fontSize: '12px', marginLeft: '10px' }}>
                {ui.matrixSubtitle}
              </span>
            </div>
          </div>

          <table className="bre-tbl dim-tbl">
            <thead>
              <tr>
                <th>{ui.colLine}</th>
                <th>{ui.colIndicator}</th>
                {COLUNAS_6.map((c) => (
                  <th key={c} style={{ textAlign: 'right' }}>
                    {c}
                  </th>
                ))}
                <th style={{ textAlign: 'right', color: 'var(--accent-bright)' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {visibleSpec.map(([key, ln, labelMap, tipo, isSummary]) => {
                const isHighlight = key === 'R44_Caminhoes_8x4';
                return (
                  <tr
                    key={key}
                    className={isHighlight ? 'dim-row-highlight' : isSummary ? 'dim-row-summary' : ''}
                  >
                    <td className="mono" style={{ color: 'var(--accent-signal)' }}>
                      {ln}
                    </td>
                    <td
                      style={{
                        color: isHighlight ? 'var(--accent-bright)' : 'var(--text)',
                        fontWeight: isSummary ? 500 : 400,
                      }}
                    >
                      {labelMap[lang]}
                    </td>
                    {([...COLUNAS_6, 'Total'] as ColAll[]).map((col) => {
                      const val = res.tabela[col][key] || 0;
                      const formatted =
                        tipo === 'int' ? Math.round(val).toString() : tipo === 'pct' ? fmtPct(val) : fmtNum(val);
                      return (
                        <td
                          key={col}
                          className="mono"
                          style={{
                            textAlign: 'right',
                            fontWeight: col === 'Total' || isHighlight ? 600 : 400,
                            color:
                              isHighlight
                                ? 'var(--accent-bright)'
                                : col === 'Total'
                                ? 'var(--text)'
                                : 'var(--text-secondary)',
                          }}
                        >
                          {formatted}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="bre-expand-bar">
            <button
              type="button"
              className="bre-expand-btn"
              onClick={() => setShowAllRows((s) => !s)}
            >
              {showAllRows ? (
                <>
                  <span>{ui.showSummaryMatrix}</span>
                  <ChevronUp size={14} />
                </>
              ) : (
                <>
                  <span>{ui.showFullMatrix(hiddenRowsCount)}</span>
                  <ChevronDown size={14} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="lab-footer">
        <div className="lab-footer-note">{ui.footerNote}</div>
      </div>
    </div>
  );
}
