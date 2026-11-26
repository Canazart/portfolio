export type Lang = 'pt' | 'en' | 'es' | 'zh';

export interface ExpRole {
  title: string;
  period: string;
  current?: boolean;
  bullets: string[];
}

export interface ExpCompany {
  period: string;
  location: string;
  sublocation?: string;
  company: string;
  roleTitle?: string;
  bullets?: string[];
  subroles?: ExpRole[];
}

export interface CaseStudy {
  meta: string;
  title: string;
  badge: string;
  badgeType: 'prod' | 'dev';
  problemLabel: string;
  problem: string;
  approachLabel: string;
  approach: string;
  resultLabel: string;
  result: string;
  tags: string[];
  actionLabel?: string;
  actionTab?: 'dim' | 'bre' | 'sic';
}

export interface Translation {
  htmlLang: string;
  pageTitle: string;
  nav: {
    about: string;
    experience: string;
    projects: string;
    demos: string;
    education: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    photoAlt: string;
    location: string;
    role: string;
    summary: string;
    ctaProjects: string;
    ctaDemos: string;
    facts: { label: string; value: string; sub: string }[];
  };
  about: {
    kicker: string;
    title: string;
    paragraphs: string[];
    focusAria: string;
    focusGroups: { title: string; desc: string }[];
  };
  experience: {
    kicker: string;
    title: string;
    items: ExpCompany[];
  };
  projects: {
    kicker: string;
    title: string;
    subtitle: string;
    items: CaseStudy[];
  };
  lab: {
    kicker: string;
    title: string;
    subtitle: string;
    ariaTabs: string;
    tabDim: string;
    tabBre: string;
    tabSic: string;
  };
  bre: {
    title: string;
    subtitle: string;
    falsePositivesFiltered: string;
    introPrefix: string;
    introMiddle: string;
    introSuffix: string;
    presets: { completo: string; d1: string; garantia: string };
    textareaAria: string;
    runBtn: string;
    resetBtn: string;
    kpiRecords: string;
    kpiProductive: string;
    kpiJustified: string;
    kpiRealIdle: string;
    kpiUnvalidated: string;
    filterAll: string;
    cols: {
      num: string;
      equip: string;
      interval: string;
      unix: string;
      state: string;
      reason: string;
      cls: string;
      verdict: string;
      ruleDetail: string;
    };
    emptyReason: string;
    timeSep: string;
    rulesSummary: string;
    rulesJust: string;
    rulesIdle: string;
    rulesProd: string;
    rulesWindowsLabel: string;
    rulesWindowsVal: string;
    rulesTolLabel: string;
    rulesLongIdleLabel: string;
    showMore: (remaining: number) => string;
    showLess: string;
    footerNote: string;
    clsLabels: { PROD: string; JUST: string; OCIO: string; DESCONHECIDO: string; VAZIO: string };
    statusLabels: {
      OK: string;
      HERDADO: string;
      SUPRIMIDO: string;
      ALERTA: string;
      ERRO: string;
      DESCARTADO: string;
    };
    logParse: (total: number, valid: number) => string;
    logTax: (prod: number, just: number, ocio: number, vazio: number, unk: number) => string;
    logDone: (filtered: number, ms: string) => string;
    rules: {
      r0Parse: string;
      r0ParseDet: string;
      r0Zero: string;
      r0ZeroDet: string;
      r1Overlap: string;
      r1OverlapDet: (equip: string, prevEnd: string) => string;
      r2Long: string;
      r2LongDet: (hours: string) => string;
      r3Inherit: string;
      r3InheritDet: (motivo: string) => string;
      r4Match: string;
      r4MatchOk: string;
      r4ProdMismatch: (reasonPart: string) => string;
      r4IdleMismatch: (motivo: string) => string;
      r5Just: string;
      r5JustDet: (motivo: string) => string;
      r6Tax: string;
      r6TaxDet: (motivo: string) => string;
      r7Win: string;
      r7WinDet: (inter: number, liq: number, tol: number) => string;
      r7Tol: string;
      r7TolDet: (dur: number, tol: number) => string;
      r3NoReason: string;
      r3NoReasonDet: (liq: number) => string;
      r7Idle: string;
      r7IdleDet: (liq: number, motivo: string, inter: number) => string;
    };
  };
  sic: {
    title: string;
    subtitle: string;
    shiftWindow: (curr: number, total: number) => string;
    kpiAccum: string;
    tons: string;
    kpiProj: string;
    waitingData: string;
    vsTarget: string;
    kpiAdherence: string;
    toHourlyTarget: string;
    kpiPa: string;
    activeFleet: string;
    kpiTrucks: string;
    operating: string;
    targetProgress: string;
    completed: string;
    colWindow: string;
    colTotal: string;
    colStatus: string;
    breakLabel: string;
    statusOk: string;
    statusWarn: string;
    statusDev: string;
    lithoTitle: string;
    hematite: string;
    goethite: string;
    fleetTitle: string;
    eventsTitle: string;
    eventsEmpty: string;
    btnDone: string;
    btnPause: string;
    btnStart: string;
    btnAuto: string;
    btnStep: string;
    resetTitle: string;
    nextWindowIn: (sec: number) => string;
    footerNote: string;
    events: string[][];
    timeSep: string;
  };
  education: {
    kicker: string;
    title: string;
    degrees: { inst: string; degree: string; period: string; desc: string }[];
    certsKicker: string;
    certs: { name: string; by: string }[];
    stackKicker: string;
    stackCols: { title: string; items: string[] }[];
  };
  contact: {
    title: string;
    note: string;
    copyEmail: string;
    copied: string;
    footerPlace: string;
  };
}

export const LANG_OPTIONS: { code: Lang; label: string }[] = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'zh', label: '中文' },
];

export const TRANSLATIONS: Record<Lang, Translation> = {
  pt: {
    htmlLang: 'pt-BR',
    pageTitle: 'Leonardo Canazart | Engenharia de Minas e Controle Operacional',
    nav: {
      about: 'Sobre',
      experience: 'Experiência',
      projects: 'Projetos',
      demos: 'Demonstrações',
      education: 'Formação',
      contact: 'Contato',
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
    },
    hero: {
      photoAlt: 'Foto de perfil de Leonardo Canazart',
      location: 'João Monlevade, MG',
      role: 'Técnico de Sala de Controle I na Bemisa; graduando em Engenharia de Minas pela Universidade do Estado de Minas Gerais.',
      summary:
        'Atuo no acompanhamento de operações de mina em tempo real, na gestão de indicadores de frota e produção e no desenvolvimento de aplicações internas com integração via API para auditoria de apontamentos e controle de turno, com estudos voltados à aplicação de Machine Learning na rotina mineral.',
      ctaProjects: 'Ver projetos',
      ctaDemos: 'Demonstrações interativas',
      facts: [
        { label: 'Atuação atual', value: 'Bemisa, Mina Pedra Branca', sub: 'Centro de Controle Operacional' },
        { label: 'Formação', value: 'Engenharia de Minas, 9º período', sub: 'Universidade do Estado de Minas Gerais' },
        { label: 'Foco técnico', value: 'Despacho, APIs e análise de dados', sub: 'Auditoria de frota e estudos em Machine Learning' },
      ],
    },
    about: {
      kicker: 'Perfil',
      title: 'Sobre',
      paragraphs: [
        'Sou graduando em Engenharia de Minas pela Universidade do Estado de Minas Gerais (9º período) e Técnico em Mineração, com rotina voltada para controle operacional, integridade de dados e automação no setor mineral.',
        'Desde dezembro de 2025 integro o Centro de Controle Operacional da Bemisa, na Mina Pedra Branca, onde participei da implantação do sistema de despacho e passei a atuar como Técnico de Sala de Controle I. O trabalho vai da parametrização de frotas e frentes de lavra ao acompanhamento diário de disponibilidade física, utilização e produtividade, em interface direta com operação, planejamento de curto prazo e manutenção.',
        'Para resolver gargalos da rotina de sala de controle, desenvolvo ferramentas em JavaScript e Python com foco em integração via API, automação de fluxos de dados, controle horário de turno e auditoria de apontamentos de frota. Em paralelo, venho aprofundando estudos para futuras aplicações de Machine Learning voltadas à operação de mina, como previsão de quedas de produtividade e detecção antecipada de anomalias em ciclos de transporte.',
      ],
      focusAria: 'Frentes de atuação',
      focusGroups: [
        {
          title: 'Operação de mina e sala de controle',
          desc: 'Despacho de frota em tempo real, aderência ao plano de lavra, análise de tempo de ciclo, gestão de paradas e acompanhamento de indicadores operacionais.',
        },
        {
          title: 'Integração de dados, APIs e automação',
          desc: 'Consumo e integração de dados operacionais via API, ferramentas internas de controle por intervalo curto, motores de auditoria em JavaScript e painéis em Power BI.',
        },
        {
          title: 'Estudos em Machine Learning na mineração',
          desc: 'Pesquisa e prototipagem em Python (KDD) voltadas a modelos preditivos de produtividade, classificação de gargalos de carregamento e apoio estatístico à decisão de turno.',
        },
      ],
    },
    experience: {
      kicker: 'Trajetória',
      title: 'Experiência profissional',
      items: [
        {
          period: 'dez 2025 a atual',
          location: 'João Monlevade, MG',
          sublocation: 'Mina Pedra Branca',
          company: 'Bemisa',
          subroles: [
            {
              title: 'Técnico de Sala de Controle I',
              period: 'ago 2026 a atual',
              current: true,
              bullets: [
                'Gestão e controle da operação de mina em tempo real via sistema de despacho (FMS).',
                'Monitoramento de KPIs operacionais e identificação de desvios de produção e produtividade.',
                'Interface com planejamento de curto prazo e manutenção para tratamento de inconsistências e otimização da frota.',
                'Suporte à implantação, parametrização e evolução do sistema MineTrack.',
                'Arquitetura e desenvolvimento da Engine de Dimensionamento de Frota 8×4 & Cronoanálise integrada à API REST (MineTrack/SODEP) via Cloudflare Workers e motor de referência em Python/NumPy, em parceria com o Planejamento de Curto Prazo (>97% de aderência histórica).',
                'Desenvolvimento do Algoritmo de Validação Heurística e Auditoria de Frota, aplicado à validação de apontamentos operacionais.',
                'Evolução da ferramenta de Short Interval Control (SIC) para acompanhamento operacional e suporte à decisão.',
              ],
            },
            {
              title: 'Operador de Sala de Controle',
              period: 'dez 2025 a ago 2026; 9 meses',
              bullets: [
                'Gestão em tempo real da operação via sistema de despacho, garantindo aderência ao plano de lavra.',
                'Monitoramento de DF, UT, produtividade e tempo de ciclo, com foco em identificação rápida de desvios.',
                'Participação na implantação do MineTrack, incluindo parametrização de frota e frentes de lavra.',
                'Interface com operação e manutenção para tratamento de inconsistências e alocação da frota.',
                'Criação da ferramenta inicial de Short Interval Control (SIC) para acompanhamento de turno.',
              ],
            },
          ],
        },
        {
          period: 'jan 2025 a dez 2025',
          location: 'João Monlevade, MG',
          sublocation: '1 ano',
          company: 'ArcelorMittal Brasil',
          roleTitle: 'Estagiário em Supply Chain, MRO e Recursos Minerários',
          bullets: [
            'Suporte ao planejamento e gestão da cadeia de suprimentos, com foco no abastecimento de sinterização e alto forno.',
            'Apoio no controle de fluxo e estoque de matérias primas críticas, como minério de ferro, calcário, areia, coque e magnesita.',
            'Execução de lançamentos e conferências em SAP MM e NetWeaver, garantindo integridade de pesagem, movimentação de materiais e validação de parâmetros fiscais (CFOP e tributos).',
          ],
        },
        {
          period: 'jul 2024 a jan 2025',
          location: 'João Monlevade, MG',
          sublocation: '7 meses',
          company: 'PH Intralogística e Serviços',
          roleTitle: 'Aprendiz de Operações',
          bullets: [
            'Controle operacional e logístico de transporte e limpeza industrial mecanizada em ambiente siderúrgico.',
            'Monitoramento de KPIs de frota, disponibilidade de ativos e produtividade por meio de análise de dados em Power BI.',
            'Execução de checklists de equipamentos pesados e interface com frentes de serviço para otimização de recursos e conformidade de segurança.',
          ],
        },
        {
          period: 'mar 2024 a jul 2024',
          location: 'João Monlevade, MG',
          sublocation: '5 meses',
          company: 'Construtora Helmo',
          roleTitle: 'Estagiário Técnico, Administrativo Financeiro',
          bullets: [
            'Processamento de lançamentos fiscais e conciliação contábil em obras de infraestrutura.',
            'Monitoramento e controle de custos operacionais (OPEX) e de capital (CAPEX) para suporte à gestão orçamentária.',
          ],
        },
      ],
    },
    projects: {
      kicker: 'Estudos de caso',
      title: 'Projetos desenvolvidos',
      subtitle: 'Sistemas e análises construídos a partir de problemas reais da rotina operacional na mineração.',
      items: [
        {
          meta: 'ago 2026 a atual; associado à Bemisa',
          title: 'Engine de Dimensionamento de Frota 8×4 & Cronoanálise — Integração API REST',
          badge: 'Projeto aplicado',
          badgeType: 'prod',
          problemLabel: 'Problema',
          problem:
            'O dimensionamento mensal de caminhões 8×4 e a cronoanálise de ciclo dependiam de extrações e rateios manuais em planilhas, sujeitos a distorções por dias parciais, outliers de velocidade e rateio impreciso de paradas operacionais como Pare e Siga.',
          approachLabel: 'Arquitetura & engenharia de dados',
          approach:
            'Aplicação analítica single-file (HTML5/CSS3/Vanilla JS, ~120 KB, zero dependências de servidor) e motor de referência em Python/NumPy integrados à API REST do MineTrack/SODEP via proxy CORS em Cloudflare Workers: ingestão assíncrona em lotes (Promise.all) sobre /fato-producao e /fato-apontamento com fallback UTF-8/Windows-1252 e deduplicação por chave composta; detecção automática de dias fechados (cobertura ≥ 75%), limpeza de outliers via IQR e mediana; motor matemático L04–L44 (DF, UF, RO, UG, UE, EO, rateio proporcional de Pare e Siga, produtividade t/h e frota necessária 8×4); gráficos SVG nativos, radar GPS e exportação client-side em .xlsx (OpenXML) e .csv.',
          resultLabel: 'Validação e resultado',
          result:
            'Desenvolvido em parceria com a Engenharia de Planejamento de Curto Prazo e homologado contra 4 fechamentos mensais históricos consecutivos, atingindo >97% de aderência no dimensionamento e eliminando distorções de rateio manual em planilhas.',
          tags: [
            'JavaScript ES6+',
            'Python / NumPy',
            'API REST (SODEP)',
            'Cloudflare Workers',
            'Estatística (IQR)',
            'Dimensionamento 8×4',
            'SVG / OpenXML (.xlsx)',
          ],
          actionLabel: 'Abrir simulador de Dimensionamento',
          actionTab: 'dim',
        },
        {
          meta: 'ago 2026 a atual; associado à Bemisa',
          title: 'Algoritmo de Validação Heurística e Auditoria de Frota (Custom BRE)',
          badge: 'Projeto aplicado',
          badgeType: 'prod',
          problemLabel: 'Problema',
          problem:
            'Sistemas de gestão de frota geram alto volume de apontamentos sem inteligência contextual, o que exigia revisão manual diária e produzia falsos positivos em viradas de turno, intervalos e paradas prolongadas.',
          approachLabel: 'Abordagem técnica',
          approach:
            'Aplicação client side em JavaScript (ES6+), HTML5 e CSS3 atuando como motor de regras de negócio: parsing tabular, taxonomia via Regex, cálculo de interseções temporais em Unix Timestamps, memória interdiária (D-1) para herança de justificativas e descarte de equipamentos ociosos de longo prazo.',
          resultLabel: 'Resultado',
          result:
            'Auditoria diária reduzida a frações de segundo sem falsos positivos, com rastreabilidade exata das horas efetivas da frota, protegendo a validação e o faturamento de contratos de garantia técnica.',
          tags: ['JavaScript ES6+', 'Regex', 'Unix Timestamps', 'Auditoria de Frota', 'Regras de Negócio'],
          actionLabel: 'Abrir simulador BRE',
          actionTab: 'bre',
        },
        {
          meta: 'jan 2026 a atual; associado à Bemisa',
          title: 'Short Interval Control (SIC): Sistema de Controle Operacional',
          badge: 'Projeto aplicado',
          badgeType: 'prod',
          problemLabel: 'Problema',
          problem:
            'O acompanhamento de produção em janelas curtas dependia de consolidações manuais, atrasando a identificação de desvios de ritmo por frente de lavra, litologia e equipamento durante o turno.',
          approachLabel: 'Abordagem técnica',
          approach:
            'Ferramenta web integrada aos dados de despacho e preparada para consumo automatizado via API, com cálculo de tonelagem por litologia e tipo de equipamento, controle de metas horárias, registro estruturado de paradas, painéis de KPIs e timeline produtiva por hora e turno.',
          resultLabel: 'Resultado',
          result:
            'Redução de rotinas manuais de controle na sala de operação da Mina Pedra Branca e maior agilidade na tomada de decisão ao longo do turno.',
          tags: ['Short Interval Control', 'Integração via API', 'JavaScript', 'KPIs de Turno', 'Litologia'],
          actionLabel: 'Abrir simulador SIC',
          actionTab: 'sic',
        },
        {
          meta: 'nov 2025 a atual',
          title: 'Análise de Produção em Mina com Python (KDD) e Estudos em Machine Learning',
          badge: 'Em desenvolvimento',
          badgeType: 'dev',
          problemLabel: 'Problema',
          problem:
            'Bases históricas de despacho acumulam padrões recorrentes de gargalos de carregamento, ciclos anômalos e indisponibilidades que passam despercebidos em análises pontuais de turno.',
          approachLabel: 'Abordagem técnica',
          approach:
            'Pipeline de KDD (Knowledge Discovery in Databases) em Python sobre registros históricos e bases extraídas via API, estruturando limpeza, engenharia de atributos e detecção estatística de desvios.',
          resultLabel: 'Estudos e aplicações futuras',
          result:
            'Estudos aplicados de Machine Learning para operação de mina, mirando modelos preditivos de queda de produtividade, detecção automática de anomalias de ciclo e estimativa de impacto no custo hora máquina.',
          tags: ['Python', 'KDD', 'Machine Learning', 'Integração via API', 'Ciclos de Transporte'],
        },
      ],
    },
    lab: {
      kicker: 'Demonstrações interativas',
      title: 'Ferramentas em execução',
      subtitle: 'Simulações funcionais com dados operacionais dos três sistemas desenvolvidos para a rotina de sala de controle e planejamento de curto prazo.',
      ariaTabs: 'Selecionar demonstração',
      tabDim: 'Dimensionamento 8×4 & Cronoanálise',
      tabBre: 'Auditoria de Frota (Custom BRE)',
      tabSic: 'Controle Horário (SIC)',
    },
    bre: {
      title: 'Motor de Validação Heurística e Auditoria de Frota (regras R0 a R7)',
      subtitle: 'Planilha editável; conversão para Unix Timestamps, classificação por Regex e memória interdiária',
      falsePositivesFiltered: 'falsos positivos filtrados',
      introPrefix: 'Edite as linhas abaixo usando',
      introMiddle: 'ou tabulação no formato',
      introSuffix: 'e execute a auditoria, ou carregue um cenário de teste:',
      presets: {
        completo: 'Cenário completo (14 linhas)',
        d1: 'Virada de dia (D-1) e turno',
        garantia: 'Conflitos e garantia técnica',
      },
      textareaAria: 'Planilha de apontamentos de frota',
      runBtn: 'Executar auditoria',
      resetBtn: 'Restaurar exemplo',
      kpiRecords: 'Registros',
      kpiProductive: 'Produtivo',
      kpiJustified: 'Justificado',
      kpiRealIdle: 'Ocioso real',
      kpiUnvalidated: 'Não validado',
      filterAll: 'TODOS',
      cols: {
        num: '#',
        equip: 'Equip.',
        interval: 'Intervalo',
        unix: 'Unix (t0)',
        state: 'Estado',
        reason: 'Motivo',
        cls: 'Classe',
        verdict: 'Veredito',
        ruleDetail: 'Regra e detalhe',
      },
      emptyReason: 'vazio',
      timeSep: 'a',
      rulesSummary: 'Ver padrões Regex e parâmetros do motor',
      rulesJust: 'Justificável:',
      rulesIdle: 'Ocioso:',
      rulesProd: 'Produtivo:',
      rulesWindowsLabel: 'Janelas obrigatórias:',
      rulesWindowsVal: '06:45 a 07:15, 11:30 a 12:30 e 18:45 a 19:15',
      rulesTolLabel: 'Tolerância líquida:',
      rulesLongIdleLabel: 'Inatividade prolongada:',
      showMore: (remaining) => `Exibir mais (+${remaining} registros)`,
      showLess: 'Mostrar menos',
      footerNote: 'Execução client side em JavaScript (ES6+); dados fictícios para demonstração.',
      clsLabels: {
        PROD: 'Produtivo',
        JUST: 'Justificável',
        OCIO: 'Ocioso',
        DESCONHECIDO: 'Não reconhecido',
        VAZIO: 'Vazio',
      },
      statusLabels: {
        OK: 'OK',
        HERDADO: 'HERDADO',
        SUPRIMIDO: 'SUPRIMIDO',
        ALERTA: 'ALERTA',
        ERRO: 'ERRO',
        DESCARTADO: 'DESCARTADO',
      },
      logParse: (t, v) => `Parsing tabular: ${t} registros lidos; ${v} intervalos Unix válidos`,
      logTax: (p, j, o, v, u) =>
        `Taxonomia Regex: ${p} produtivos, ${j} justificáveis, ${o} ociosos, ${v} vazios, ${u} não reconhecidos`,
      logDone: (f, ms) => `Regras R0 a R7 aplicadas: ${f} falsos positivos ou ruídos filtrados; concluído em ${ms} ms`,
      rules: {
        r0Parse: 'R0, Parsing',
        r0ParseDet: 'Data ou hora fora do formato DD/MM/AAAA e HH:MM.',
        r0Zero: 'R0, Duração nula',
        r0ZeroDet: 'Horário de início e fim idênticos.',
        r1Overlap: 'R1, Sobreposição',
        r1OverlapDet: (eq, end) => `Inicia antes do término do registro anterior de ${eq} (${end}).`,
        r2Long: 'R2, Inatividade prolongada',
        r2LongDet: (h) => `${h} h contínuas; descartado das métricas para evitar distorção estatística.`,
        r3Inherit: 'R3, Memória interdiária',
        r3InheritDet: (m) => `Continuidade exata em Unix Timestamp; herdou "${m}" do registro anterior.`,
        r4Match: 'R4, Estado e motivo',
        r4MatchOk: 'Estado produtivo coerente com o motivo informado.',
        r4ProdMismatch: (rp) => `Estado Produtivo incompatível com motivo ${rp}.`,
        r4IdleMismatch: (m) => `Estado Ocioso incompatível com motivo produtivo "${m}".`,
        r5Just: 'R5, Parada justificável',
        r5JustDet: (m) => `Motivo "${m}" reconhecido pela taxonomia como justificável.`,
        r6Tax: 'R6, Taxonomia Regex',
        r6TaxDet: (m) => `"${m}" não corresponde a nenhum padrão da taxonomia.`,
        r7Win: 'R7, Janela obrigatória',
        r7WinDet: (inter, liq, tol) =>
          `${inter} min dentro de troca de turno ou almoço; líquido ${liq} min (limite ${tol} min); alerta suprimido.`,
        r7Tol: 'R7, Tolerância',
        r7TolDet: (dur, tol) => `${dur} min dentro da tolerância operacional de ${tol} min.`,
        r3NoReason: 'R3, Sem justificativa',
        r3NoReasonDet: (liq) => `${liq} min ociosos sem motivo e sem registro anterior contínuo para herdar.`,
        r7Idle: 'R7, Ociosidade real',
        r7IdleDet: (liq, m, inter) =>
          `${liq} min líquidos de ociosidade ("${m}")${inter ? `, já descontados ${inter} min de janela obrigatória` : ''}.`,
      },
    },
    sic: {
      title: 'Short Interval Control (SIC), simulação de turno',
      subtitle: 'Acompanhamento horário de produção por litologia, meta e frota',
      shiftWindow: (c, t) => `Turno A; janela ${c} de ${t}`,
      kpiAccum: 'Produção acum.',
      tons: 'toneladas',
      kpiProj: 'Projeção turno',
      waitingData: 'aguardando dados',
      vsTarget: 't vs meta',
      kpiAdherence: 'Aderência',
      toHourlyTarget: 'à meta horária',
      kpiPa: 'Disp. física',
      activeFleet: 'frota ativa',
      kpiTrucks: 'Caminhões',
      operating: 'em operação',
      targetProgress: 'Progresso da meta do turno: 3.200 t',
      completed: 'concluído',
      colWindow: 'Janela',
      colTotal: 'Total',
      colStatus: 'Status',
      breakLabel: 'Intervalo de almoço',
      statusOk: 'OK',
      statusWarn: 'Alerta',
      statusDev: 'Desvio',
      lithoTitle: 'Produção acumulada por litologia',
      hematite: 'Hematita (HEM)',
      goethite: 'Goetita (GOE)',
      fleetTitle: 'Status da frota (8 unidades)',
      eventsTitle: 'Registro de ocorrências',
      eventsEmpty: 'Use "Iniciar turno" ou "Avançar 1 janela" para acompanhar a simulação.',
      btnDone: 'Turno encerrado',
      btnPause: 'Pausar',
      btnStart: 'Iniciar turno',
      btnAuto: 'Simular automático',
      btnStep: 'Avançar 1 janela',
      resetTitle: 'Reiniciar simulação',
      nextWindowIn: (s) => `Próxima janela em ${s}s`,
      footerNote: 'Simulação com dados fictícios.',
      timeSep: 'a',
      events: [
        ['Turno A iniciado; frota sincronizada'],
        ['Produção acima da meta horária (354 t)'],
        ['CB-03 em manutenção corretiva; rebalanceamento de fila'],
        ['Recuperação de ritmo na Frente Sul'],
        ['Ritmo estabilizado dentro da meta'],
        ['Intervalo operacional de almoço'],
        ['Retomada após almoço; CB-03 em inspeção final'],
        ['Frota completa (8/8); maior produtividade do turno'],
        ['Fechamento de turno acima da meta projetada'],
      ],
    },
    education: {
      kicker: 'Base técnica',
      title: 'Formação, certificações e ferramentas',
      degrees: [
        {
          inst: 'Universidade do Estado de Minas Gerais',
          degree: 'Bacharelado em Engenharia de Minas',
          period: 'mar 2023 a dez 2027; 9º período em andamento',
          desc: 'Formação voltada para lavra, geologia aplicada, planejamento de mina e gestão da cadeia mineral, aliando base analítica de engenharia à prática em operações e análise de dados industriais.',
        },
        {
          inst: 'Centro Educacional Roberto Porto',
          degree: 'Ensino Técnico em Mineração',
          period: 'ago 2022 a jul 2024; concluído',
          desc: 'Formação técnica em lavra, beneficiamento e controle de produção e custos, com prática em AutoCAD e caracterização de minérios em laboratório.',
        },
      ],
      certsKicker: 'Certificações',
      certs: [
        { name: 'Implementing a Software Automation Strategy', by: 'Skillsoft' },
        { name: 'Software Product Management: Mapping & Planning', by: 'Skillsoft' },
        { name: 'Gestão de Projetos de Software', by: 'IFRS' },
        { name: 'ResponsibleSteel: Padrão Internacional de Mineração', by: 'ArcelorMittal' },
        { name: 'NR-12: Segurança em Máquinas e Equipamentos', by: 'Certificação Técnica' },
        { name: 'Cybersecurity Awareness Programme', by: 'ArcelorMittal' },
        { name: 'Inglês e Francês: Leitura Técnica Profissional', by: 'IFRS' },
      ],
      stackKicker: 'Competências e ferramentas',
      stackCols: [
        {
          title: 'Operação e engenharia',
          items: [
            'Gestão de frota e despacho (MineTrack)',
            'Short Interval Control (SIC)',
            'KPIs de mina: DF, UT, produtividade e ciclo',
            'Aderência ao plano de lavra e curto prazo',
            'QGIS, ArcGIS e AutoCAD',
          ],
        },
        {
          title: 'Dados, APIs e Machine Learning',
          items: [
            'JavaScript (ES6+), HTML5 e CSS3',
            'Integração com APIs REST e fluxos de dados',
            'Python, KDD e estudos em Machine Learning',
            'Expressões regulares e Unix Timestamps',
            'Microsoft Power BI e Excel avançado',
          ],
        },
        {
          title: 'Gestão e sistemas corporativos',
          items: [
            'Gestão de stakeholders e interface operacional',
            'SAP MM e NetWeaver',
            'Controle de custos OPEX e CAPEX',
            'Conformidade fiscal (CFOP e tributos)',
            'Inglês e francês para leitura técnica',
          ],
        },
      ],
    },
    contact: {
      title: 'Contato',
      note: 'Disponível para conversas técnicas sobre operações de mina, controle operacional, integração de dados e projetos na área mineral.',
      copyEmail: 'Copiar e-mail',
      copied: 'Copiado',
      footerPlace: 'João Monlevade, MG; 2026',
    },
  },

  en: {
    htmlLang: 'en',
    pageTitle: 'Leonardo Canazart | Mining Engineering and Operational Control',
    nav: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      demos: 'Demos',
      education: 'Education',
      contact: 'Contact',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      photoAlt: 'Profile photo of Leonardo Canazart',
      location: 'João Monlevade, Minas Gerais, Brazil',
      role: 'Control Room Technician I at Bemisa; Mining Engineering undergraduate at the State University of Minas Gerais.',
      summary:
        'I work in real-time open-pit mine control, fleet and production KPI monitoring, and internal web applications with API integration for fleet log auditing and shift control, alongside ongoing studies in Machine Learning applied to mining operations.',
      ctaProjects: 'View projects',
      ctaDemos: 'Interactive demos',
      facts: [
        { label: 'Current role', value: 'Bemisa, Pedra Branca Mine', sub: 'Operational Control Center (OCC)' },
        { label: 'Education', value: 'Mining Engineering, 9th semester', sub: 'State University of Minas Gerais' },
        { label: 'Technical focus', value: 'Dispatch, APIs, and data analytics', sub: 'Fleet auditing and Machine Learning studies' },
      ],
    },
    about: {
      kicker: 'Profile',
      title: 'About',
      paragraphs: [
        'I am a 9th-semester Mining Engineering undergraduate at the State University of Minas Gerais and a certified Mining Technician, focused on operational control, data integrity, and workflow automation in mining.',
        'Since December 2025 I have been part of the Operational Control Center at Bemisa (Pedra Branca Mine), where I supported the deployment of the fleet management system and advanced to Control Room Technician I. My daily work spans fleet and mining-face parameterization, tracking physical availability, utilization, and productivity, and coordinating directly with operations, short-term mine planning, and maintenance.',
        'To solve recurring bottlenecks in control room routines, I build tools in JavaScript and Python focused on API integration, automated data pipelines, hourly shift tracking, and algorithmic fleet log auditing. In parallel, I am deepening my studies in future Machine Learning applications for mine operations, including productivity drop forecasting and early anomaly detection in haulage cycles.',
      ],
      focusAria: 'Core focus areas',
      focusGroups: [
        {
          title: 'Mine operations and control room',
          desc: 'Real-time fleet dispatch, mine plan compliance, haulage cycle analysis, downtime tracking, and operational KPI management.',
        },
        {
          title: 'Data integration, APIs, and automation',
          desc: 'Operational data consumption via API, Short Interval Control tools, client-side JavaScript audit engines, and Power BI dashboards.',
        },
        {
          title: 'Machine Learning studies for mining',
          desc: 'Research and prototyping in Python (KDD) aimed at predictive productivity models, loading bottleneck classification, and statistical shift support.',
        },
      ],
    },
    experience: {
      kicker: 'Career',
      title: 'Professional experience',
      items: [
        {
          period: 'Dec 2025 to present',
          location: 'João Monlevade, MG',
          sublocation: 'Pedra Branca Mine',
          company: 'Bemisa',
          subroles: [
            {
              title: 'Control Room Technician I',
              period: 'Aug 2026 to present',
              current: true,
              bullets: [
                'Real-time mine operation management and control via Fleet Management System (FMS).',
                'Monitoring operational KPIs and identifying production and productivity deviations.',
                'Direct interface with short-term mine planning and maintenance to resolve data inconsistencies and optimize fleet allocation.',
                'Support for deployment, parameterization, and continuous improvement of MineTrack.',
                'Architected and built the 8×4 Fleet Sizing & Time-Motion Engine integrated with the MineTrack/SODEP REST API via Cloudflare Workers and a Python/NumPy reference engine, in partnership with Short-Term Mine Planning (>97% historical adherence).',
                'Development of the Heuristic Validation and Fleet Audit Algorithm (Custom BRE) for auditing operational logs.',
                'Ongoing development of the Short Interval Control (SIC) tool for hourly tracking and decision support.',
              ],
            },
            {
              title: 'Control Room Operator',
              period: 'Dec 2025 to Aug 2026; 9 months',
              bullets: [
                'Real-time operational dispatch via FMS, ensuring adherence to the mine plan.',
                'Monitoring physical availability (PA), utilization (UT), productivity, and cycle time to detect deviations early.',
                'Participation in MineTrack implementation, including fleet and mining face parameterization.',
                'Coordination with field operations and maintenance to resolve inconsistencies and optimize equipment allocation.',
                'Built the initial Short Interval Control (SIC) tool for shift monitoring.',
              ],
            },
          ],
        },
        {
          period: 'Jan 2025 to Dec 2025',
          location: 'João Monlevade, MG',
          sublocation: '1 year',
          company: 'ArcelorMittal Brasil',
          roleTitle: 'Supply Chain Intern, MRO and Mineral Resources',
          bullets: [
            'Supported supply chain planning and management focused on sinter plant and blast furnace replenishment.',
            'Assisted with flow and inventory control of critical raw materials, including iron ore, limestone, sand, coke, and magnesite.',
            'Executed postings and reconciliations in SAP MM and NetWeaver, ensuring weighing integrity, material movement accuracy, and tax compliance (CFOP and taxes).',
          ],
        },
        {
          period: 'Jul 2024 to Jan 2025',
          location: 'João Monlevade, MG',
          sublocation: '7 months',
          company: 'PH Intralogística e Serviços',
          roleTitle: 'Operations Apprentice',
          bullets: [
            'Operational and logistical control of transport and mechanized industrial cleaning in a steelmaking environment.',
            'Tracked fleet KPIs, asset availability, and productivity through data analysis in Power BI.',
            'Conducted heavy equipment checklists and coordinated with service fronts for resource optimization and safety compliance.',
          ],
        },
        {
          period: 'Mar 2024 to Jul 2024',
          location: 'João Monlevade, MG',
          sublocation: '5 months',
          company: 'Construtora Helmo',
          roleTitle: 'Technical Intern, Finance and Administration',
          bullets: [
            'Processed tax postings and accounting reconciliations for infrastructure projects.',
            'Monitored operational (OPEX) and capital (CAPEX) costs to support budget management.',
          ],
        },
      ],
    },
    projects: {
      kicker: 'Case studies',
      title: 'Selected projects',
      subtitle: 'Systems and analytical pipelines built to solve real operational bottlenecks in mining.',
      items: [
        {
          meta: 'Aug 2026 to present; associated with Bemisa',
          title: '8×4 Fleet Sizing & Time-Motion Engine — REST API Integration',
          badge: 'Applied project',
          badgeType: 'prod',
          problemLabel: 'Problem',
          problem:
            'Monthly 8×4 haul truck sizing and cycle time-motion analysis relied on manual spreadsheet exports and allocations, prone to distortion from partial days, speed outliers, and imprecise stop-and-go allocation.',
          approachLabel: 'Architecture & data engineering',
          approach:
            'Single-file analytical web app (HTML5/CSS3/Vanilla JS, ~120 KB, zero server dependencies) and Python/NumPy reference engine integrated directly with the MineTrack/SODEP REST API via a Cloudflare Worker CORS proxy: parallel batch ingestion (Promise.all) over /fato-producao and /fato-apontamento with UTF-8/Windows-1252 fallback and composite-key deduplication; closed-day detection (≥75% coverage), IQR outlier cleaning and median cycle modeling; 37-line mathematical sizing engine (L04–L44) computing PA/DF, UF, RO, UG, UE, EO, proportional Stop-and-Go allocation, weighted t/h productivity, and required 8×4 trucks; native SVG charts, GPS radar, and client-side .xlsx (OpenXML) and .csv export.',
          resultLabel: 'Validation & outcome',
          result:
            'Built in partnership with Short-Term Mine Planning Engineering and validated against 4 consecutive historical monthly closings, achieving >97% sizing adherence and eliminating manual spreadsheet distortions.',
          tags: [
            'JavaScript ES6+',
            'Python / NumPy',
            'REST API (SODEP)',
            'Cloudflare Workers',
            'Statistics (IQR)',
            '8×4 Fleet Sizing',
            'SVG / OpenXML (.xlsx)',
          ],
          actionLabel: 'Open Fleet Sizing simulator',
          actionTab: 'dim',
        },
        {
          meta: 'Aug 2026 to present; associated with Bemisa',
          title: 'Heuristic Validation and Fleet Audit Algorithm (Custom BRE)',
          badge: 'Applied project',
          badgeType: 'prod',
          problemLabel: 'Problem',
          problem:
            'Mining fleet management systems generate high volumes of raw status logs without contextual awareness, requiring daily manual review and producing false positives across shift changes, breaks, and prolonged downtime.',
          approachLabel: 'Technical approach',
          approach:
            'Client-side Business Rule Engine built in JavaScript (ES6+), HTML5, and CSS3: tabular parsing, Regex taxonomy classification, exact temporal intersection math via Unix Timestamps, inter-day memory (D-1) to inherit continuous justifications, and filtering of long-term idle assets.',
          resultLabel: 'Outcome',
          result:
            'Daily control room auditing reduced to fractions of a second with zero false positives, delivering exact traceability of effective fleet hours and protecting technical warranty billing.',
          tags: ['JavaScript ES6+', 'Regex', 'Unix Timestamps', 'Fleet Auditing', 'Business Rules'],
          actionLabel: 'Open BRE simulator',
          actionTab: 'bre',
        },
        {
          meta: 'Jan 2026 to present; associated with Bemisa',
          title: 'Short Interval Control (SIC): Operational Control System',
          badge: 'Applied project',
          badgeType: 'prod',
          problemLabel: 'Problem',
          problem:
            'Tracking short-interval production relied on manual spreadsheet consolidation, delaying detection of rate deviations by mining face, lithology, and equipment during active shifts.',
          approachLabel: 'Technical approach',
          approach:
            'Web application integrated with dispatch data and structured for automated API ingestion, featuring automated tonnage calculation by lithology and equipment class, hourly target tracking, structured downtime logging, KPI dashboards, and shift timelines.',
          resultLabel: 'Outcome',
          result:
            'Reduced manual control routines at the Pedra Branca Mine control room and accelerated operational response throughout each shift.',
          tags: ['Short Interval Control', 'API Integration', 'JavaScript', 'Shift KPIs', 'Lithology'],
          actionLabel: 'Open SIC simulator',
          actionTab: 'sic',
        },
        {
          meta: 'Nov 2025 to present',
          title: 'Mine Production Analysis with Python (KDD) and Machine Learning Studies',
          badge: 'In development',
          badgeType: 'dev',
          problemLabel: 'Problem',
          problem:
            'Historical dispatch databases accumulate recurring loading bottlenecks, anomalous haulage cycles, and unplanned downtime patterns that go unnoticed in single-shift reviews.',
          approachLabel: 'Technical approach',
          approach:
            'KDD (Knowledge Discovery in Databases) pipeline in Python over historical records and API-extracted datasets, covering data cleaning, feature engineering, and statistical deviation detection.',
          resultLabel: 'Studies and future applications',
          result:
            'Applied Machine Learning studies for mining operations, targeting predictive models for productivity drops, automated haul-cycle anomaly detection, and machine-hour cost impact estimates.',
          tags: ['Python', 'KDD', 'Machine Learning', 'API Integration', 'Haulage Cycles'],
        },
      ],
    },
    lab: {
      kicker: 'Interactive demos',
      title: 'Live tools',
      subtitle: 'Functional browser simulations with sample data for all three operational control and short-term planning systems.',
      ariaTabs: 'Select demo',
      tabDim: '8×4 Fleet Sizing & Time-Motion',
      tabBre: 'Fleet Audit Engine (Custom BRE)',
      tabSic: 'Hourly Shift Control (SIC)',
    },
    bre: {
      title: 'Heuristic Validation and Fleet Audit Engine (Rules R0 to R7)',
      subtitle: 'Editable sheet; Unix Timestamp conversion, Regex classification, and inter-day memory',
      falsePositivesFiltered: 'false positives filtered',
      introPrefix: 'Edit the rows below using',
      introMiddle: 'or tab delimiters in the format',
      introSuffix: 'and run the audit, or load a preset scenario:',
      presets: {
        completo: 'Full scenario (14 rows)',
        d1: 'Inter-day (D-1) and shift change',
        garantia: 'Conflicts and technical warranty',
      },
      textareaAria: 'Fleet status log spreadsheet',
      runBtn: 'Run audit',
      resetBtn: 'Reset sample',
      kpiRecords: 'Records',
      kpiProductive: 'Productive',
      kpiJustified: 'Justified',
      kpiRealIdle: 'True idle',
      kpiUnvalidated: 'Unvalidated',
      filterAll: 'ALL',
      cols: {
        num: '#',
        equip: 'Unit',
        interval: 'Interval',
        unix: 'Unix (t0)',
        state: 'State',
        reason: 'Reason',
        cls: 'Class',
        verdict: 'Verdict',
        ruleDetail: 'Rule and detail',
      },
      emptyReason: 'empty',
      timeSep: 'to',
      rulesSummary: 'Inspect Regex patterns and engine parameters',
      rulesJust: 'Justifiable:',
      rulesIdle: 'Idle:',
      rulesProd: 'Productive:',
      rulesWindowsLabel: 'Mandatory windows:',
      rulesWindowsVal: '06:45 to 07:15, 11:30 to 12:30, and 18:45 to 19:15',
      rulesTolLabel: 'Net tolerance:',
      rulesLongIdleLabel: 'Prolonged inactivity:',
      showMore: (remaining) => `Show more (+${remaining} records)`,
      showLess: 'Show less',
      footerNote: 'Executed client-side in JavaScript (ES6+); sample data for demonstration.',
      clsLabels: {
        PROD: 'Productive',
        JUST: 'Justifiable',
        OCIO: 'Idle',
        DESCONHECIDO: 'Unrecognized',
        VAZIO: 'Empty',
      },
      statusLabels: {
        OK: 'OK',
        HERDADO: 'INHERITED',
        SUPRIMIDO: 'SUPPRESSED',
        ALERTA: 'ALERT',
        ERRO: 'ERROR',
        DESCARTADO: 'DISCARDED',
      },
      logParse: (t, v) => `Tabular parsing: ${t} records read; ${v} valid Unix intervals`,
      logTax: (p, j, o, v, u) =>
        `Regex taxonomy: ${p} productive, ${j} justifiable, ${o} idle, ${v} empty, ${u} unrecognized`,
      logDone: (f, ms) => `Rules R0 to R7 applied: ${f} false positives or noise filtered; completed in ${ms} ms`,
      rules: {
        r0Parse: 'R0, Parsing',
        r0ParseDet: 'Date or time outside DD/MM/YYYY and HH:MM format.',
        r0Zero: 'R0, Zero duration',
        r0ZeroDet: 'Start and end timestamps are identical.',
        r1Overlap: 'R1, Time overlap',
        r1OverlapDet: (eq, end) => `Starts before the previous log of ${eq} ended (${end}).`,
        r2Long: 'R2, Prolonged inactivity',
        r2LongDet: (h) => `${h} continuous hours; excluded from KPIs to avoid statistical distortion.`,
        r3Inherit: 'R3, Inter-day memory',
        r3InheritDet: (m) => `Exact Unix continuity; inherited "${m}" from the previous record.`,
        r4Match: 'R4, State and reason',
        r4MatchOk: 'Productive state matches the logged reason.',
        r4ProdMismatch: (rp) => `Productive state conflicts with reason ${rp}.`,
        r4IdleMismatch: (m) => `Idle state conflicts with productive reason "${m}".`,
        r5Just: 'R5, Justifiable stop',
        r5JustDet: (m) => `Reason "${m}" matched as a justifiable stop.`,
        r6Tax: 'R6, Regex taxonomy',
        r6TaxDet: (m) => `"${m}" does not match any taxonomy pattern.`,
        r7Win: 'R7, Mandatory window',
        r7WinDet: (inter, liq, tol) =>
          `${inter} min inside shift change or meal break; net ${liq} min (limit ${tol} min); alert suppressed.`,
        r7Tol: 'R7, Tolerance',
        r7TolDet: (dur, tol) => `${dur} min within the ${tol} min operational tolerance.`,
        r3NoReason: 'R3, Missing reason',
        r3NoReasonDet: (liq) => `${liq} idle min with no reason and no continuous prior record to inherit.`,
        r7Idle: 'R7, True idleness',
        r7IdleDet: (liq, m, inter) =>
          `${liq} net idle min ("${m}")${inter ? `, after deducting ${inter} min of mandatory window` : ''}.`,
      },
    },
    sic: {
      title: 'Short Interval Control (SIC), shift simulation',
      subtitle: 'Hourly production tracking by lithology, target, and fleet status',
      shiftWindow: (c, t) => `Shift A; window ${c} of ${t}`,
      kpiAccum: 'Accum. output',
      tons: 'metric tons',
      kpiProj: 'Shift forecast',
      waitingData: 'waiting for data',
      vsTarget: 't vs target',
      kpiAdherence: 'Compliance',
      toHourlyTarget: 'to hourly target',
      kpiPa: 'Availability',
      activeFleet: 'active fleet',
      kpiTrucks: 'Haul trucks',
      operating: 'operating',
      targetProgress: 'Shift target progress: 3,200 t',
      completed: 'completed',
      colWindow: 'Window',
      colTotal: 'Total',
      colStatus: 'Status',
      breakLabel: 'Meal break',
      statusOk: 'OK',
      statusWarn: 'Alert',
      statusDev: 'Deviation',
      lithoTitle: 'Accumulated output by lithology',
      hematite: 'Hematite (HEM)',
      goethite: 'Goethite (GOE)',
      fleetTitle: 'Fleet status (8 units)',
      eventsTitle: 'Control room log',
      eventsEmpty: 'Click "Start shift" or "Next window" to run the simulation.',
      btnDone: 'Shift complete',
      btnPause: 'Pause',
      btnStart: 'Start shift',
      btnAuto: 'Auto simulate',
      btnStep: 'Next window',
      resetTitle: 'Reset simulation',
      nextWindowIn: (s) => `Next window in ${s}s`,
      footerNote: 'Simulation using sample data.',
      timeSep: 'to',
      events: [
        ['Shift A started; fleet synchronized'],
        ['Output above hourly target (354 t)'],
        ['CB-03 under corrective maintenance; queue rebalanced'],
        ['Rate recovery at South Face'],
        ['Production rate stabilized on target'],
        ['Scheduled operational meal break'],
        ['Post-break ramp-up; CB-03 in final inspection'],
        ['Full fleet active (8/8); peak shift productivity'],
        ['Shift closed above projected target'],
      ],
    },
    education: {
      kicker: 'Technical background',
      title: 'Education, certifications, and tools',
      degrees: [
        {
          inst: 'State University of Minas Gerais (UEMG)',
          degree: 'B.Sc. in Mining Engineering',
          period: 'Mar 2023 to Dec 2027; 9th semester in progress',
          desc: 'Focused on mining operations, applied geology, mine planning, and mineral value-chain management, combining engineering fundamentals with industrial data analysis.',
        },
        {
          inst: 'Centro Educacional Roberto Porto',
          degree: 'Technical Degree in Mining',
          period: 'Aug 2022 to Jul 2024; completed',
          desc: 'Technical training in extraction, mineral processing, and production and cost control, including AutoCAD and laboratory ore characterization.',
        },
      ],
      certsKicker: 'Certifications',
      certs: [
        { name: 'Implementing a Software Automation Strategy', by: 'Skillsoft' },
        { name: 'Software Product Management: Mapping & Planning', by: 'Skillsoft' },
        { name: 'Software Project Management', by: 'IFRS' },
        { name: 'ResponsibleSteel: International Mining Standard', by: 'ArcelorMittal' },
        { name: 'NR-12: Machinery and Equipment Safety', by: 'Technical Certification' },
        { name: 'Cybersecurity Awareness Programme', by: 'ArcelorMittal' },
        { name: 'English and French: Professional Technical Reading', by: 'IFRS' },
      ],
      stackKicker: 'Skills and tools',
      stackCols: [
        {
          title: 'Operations and engineering',
          items: [
            'Fleet dispatch and management (MineTrack)',
            'Short Interval Control (SIC)',
            'Mine KPIs: PA, UT, productivity, and cycle time',
            'Mine plan compliance and short-term interface',
            'QGIS, ArcGIS, and AutoCAD',
          ],
        },
        {
          title: 'Data, APIs, and Machine Learning',
          items: [
            'JavaScript (ES6+), HTML5, and CSS3',
            'REST API integration and data workflows',
            'Python, KDD, and Machine Learning studies',
            'Regular expressions and Unix Timestamps',
            'Microsoft Power BI and advanced Excel',
          ],
        },
        {
          title: 'Management and enterprise systems',
          items: [
            'Stakeholder management and operational interface',
            'SAP MM and NetWeaver',
            'OPEX and CAPEX cost tracking',
            'Tax and fiscal compliance (CFOP)',
            'Technical reading in English and French',
          ],
        },
      ],
    },
    contact: {
      title: 'Contact',
      note: 'Open to technical discussions on mine operations, operational control, data integration, and mineral industry projects.',
      copyEmail: 'Copy email',
      copied: 'Copied',
      footerPlace: 'João Monlevade, MG, Brazil; 2026',
    },
  },

  es: {
    htmlLang: 'es',
    pageTitle: 'Leonardo Canazart | Ingeniería de Minas y Control Operacional',
    nav: {
      about: 'Perfil',
      experience: 'Experiencia',
      projects: 'Proyectos',
      demos: 'Demostraciones',
      education: 'Formación',
      contact: 'Contacto',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
    },
    hero: {
      photoAlt: 'Foto de perfil de Leonardo Canazart',
      location: 'João Monlevade, Minas Gerais, Brasil',
      role: 'Técnico de Sala de Control I en Bemisa; estudiante de Ingeniería de Minas en la Universidad del Estado de Minas Gerais.',
      summary:
        'Trabajo en el seguimiento de operaciones mineras en tiempo real, en la gestión de indicadores de flota y producción y en el desarrollo de aplicaciones internas con integración mediante API para auditoría de registros y control de turno, junto con estudios orientados a la aplicación de Machine Learning en la operación minera.',
      ctaProjects: 'Ver proyectos',
      ctaDemos: 'Demostraciones interactivas',
      facts: [
        { label: 'Cargo actual', value: 'Bemisa, Mina Pedra Branca', sub: 'Centro de Control Operacional (CCO)' },
        { label: 'Formación', value: 'Ingeniería de Minas, 9.º semestre', sub: 'Universidad del Estado de Minas Gerais' },
        { label: 'Enfoque técnico', value: 'Despacho, APIs y análisis de datos', sub: 'Auditoría de flota y estudios en Machine Learning' },
      ],
    },
    about: {
      kicker: 'Perfil',
      title: 'Sobre mí',
      paragraphs: [
        'Soy estudiante de 9.º semestre de Ingeniería de Minas en la Universidad del Estado de Minas Gerais y Técnico en Minería, con enfoque en control operacional, integridad de datos y automatización en el sector mineral.',
        'Desde diciembre de 2025 formo parte del Centro de Control Operacional de Bemisa, en la Mina Pedra Branca, donde participé en la implementación del sistema de despacho y ascendí a Técnico de Sala de Control I. Mi rutina abarca desde la parametrización de flotas y frentes de explotación hasta el seguimiento diario de disponibilidad física, utilización y productividad, en coordinación directa con operación, planificación de corto plazo y mantenimiento.',
        'Para resolver cuellos de botella de la sala de control, desarrollo herramientas en JavaScript y Python orientadas a la integración vía API, automatización de flujos de datos, control horario de turno y auditoría algorítmica de flota. En paralelo, profundizo estudios para futuras aplicaciones de Machine Learning en operaciones mineras, como predicción de caídas de productividad y detección temprana de anomalías en ciclos de acarreo.',
      ],
      focusAria: 'Áreas principales',
      focusGroups: [
        {
          title: 'Operación minera y sala de control',
          desc: 'Despacho de flota en tiempo real, cumplimiento del plan de minado, análisis de tiempo de ciclo, gestión de paradas y control de KPIs operacionales.',
        },
        {
          title: 'Integración de datos, APIs y automatización',
          desc: 'Consumo e integración de datos operacionales mediante API, herramientas de control por intervalo corto, motores de auditoría en JavaScript y tableros en Power BI.',
        },
        {
          title: 'Estudios de Machine Learning en minería',
          desc: 'Investigación y prototipado en Python (KDD) orientados a modelos predictivos de productividad, clasificación de cuellos de botella de carguío y soporte estadístico de turno.',
        },
      ],
    },
    experience: {
      kicker: 'Trayectoria',
      title: 'Experiencia profesional',
      items: [
        {
          period: 'dic 2025 a actual',
          location: 'João Monlevade, MG',
          sublocation: 'Mina Pedra Branca',
          company: 'Bemisa',
          subroles: [
            {
              title: 'Técnico de Sala de Control I',
              period: 'ago 2026 a actual',
              current: true,
              bullets: [
                'Gestión y control de la operación minera en tiempo real mediante sistema de despacho (FMS).',
                'Monitoreo de KPIs operacionales e identificación de desvíos de producción y productividad.',
                'Interfaz directa con planificación de corto plazo y mantenimiento para corregir inconsistencias y optimizar la flota.',
                'Soporte a la implementación, parametrización y evolución del sistema MineTrack.',
                'Arquitectura y desarrollo del Motor de Dimensionamiento de Flota 8×4 y Cronoanálisis integrado a la API REST (MineTrack/SODEP) mediante Cloudflare Workers y motor de referencia en Python/NumPy, en asociación con Planificación de Corto Plazo (>97% de adherencia histórica).',
                'Desarrollo del Algoritmo de Validación Heurística y Auditoría de Flota para validar registros operacionales.',
                'Evolución de la herramienta de Short Interval Control (SIC) para seguimiento horario y soporte a la decisión.',
              ],
            },
            {
              title: 'Operador de Sala de Control',
              period: 'dic 2025 a ago 2026; 9 meses',
              bullets: [
                'Gestión en tiempo real de la operación mediante despacho, asegurando adherencia al plan de minado.',
                'Monitoreo de DF, UT, productividad y tiempo de ciclo para identificar desvíos rápidamente.',
                'Participación en la implementación de MineTrack, incluyendo parametrización de flota y frentes de explotación.',
                'Coordinación con operación y mantenimiento para tratamiento de inconsistencias y asignación de equipos.',
                'Desarrollo inicial de la herramienta de Short Interval Control (SIC) para seguimiento de turno.',
              ],
            },
          ],
        },
        {
          period: 'ene 2025 a dic 2025',
          location: 'João Monlevade, MG',
          sublocation: '1 año',
          company: 'ArcelorMittal Brasil',
          roleTitle: 'Practicante de Supply Chain, MRO y Recursos Minerales',
          bullets: [
            'Soporte a la planificación y gestión de la cadena de suministro para el abastecimiento de sinterización y alto horno.',
            'Apoyo en el control de flujo e inventario de materias primas críticas, como mineral de hierro, caliza, arena, coque y magnesita.',
            'Registro y verificación en SAP MM y NetWeaver, asegurando integridad de pesaje, movimiento de materiales y validación fiscal (CFOP e impuestos).',
          ],
        },
        {
          period: 'jul 2024 a ene 2025',
          location: 'João Monlevade, MG',
          sublocation: '7 meses',
          company: 'PH Intralogística e Serviços',
          roleTitle: 'Aprendiz de Operaciones',
          bullets: [
            'Control operacional y logístico de transporte y limpieza industrial mecanizada en entorno siderúrgico.',
            'Monitoreo de KPIs de flota, disponibilidad de activos y productividad mediante análisis de datos en Power BI.',
            'Ejecución de checklists de equipos pesados e interfaz con frentes de servicio para optimizar recursos y cumplir estándares de seguridad.',
          ],
        },
        {
          period: 'mar 2024 a jul 2024',
          location: 'João Monlevade, MG',
          sublocation: '5 meses',
          company: 'Construtora Helmo',
          roleTitle: 'Practicante Técnico, Administración y Finanzas',
          bullets: [
            'Procesamiento de asientos fiscales y conciliación contable en proyectos de infraestructura.',
            'Monitoreo y control de costos operacionales (OPEX) y de capital (CAPEX) para soporte presupuestario.',
          ],
        },
      ],
    },
    projects: {
      kicker: 'Casos de estudio',
      title: 'Proyectos desarrollados',
      subtitle: 'Sistemas y análisis creados a partir de desafíos reales de la operación minera.',
      items: [
        {
          meta: 'ago 2026 a actual; asociado a Bemisa',
          title: 'Motor de Dimensionamiento de Flota 8×4 y Cronoanálisis — Integración API REST',
          badge: 'Proyecto aplicado',
          badgeType: 'prod',
          problemLabel: 'Problema',
          problem:
            'El dimensionamiento mensual de camiones 8×4 y el cronoanálisis de ciclo dependían de extracciones y prorrateos manuales en hojas de cálculo, expuestos a distorsiones por días parciales, valores atípicos de velocidad y asignación imprecisa de paradas operacionales.',
          approachLabel: 'Arquitectura e ingeniería de datos',
          approach:
            'Aplicación analítica single-file (HTML5/CSS3/Vanilla JS, ~120 KB, cero dependencias de servidor) y motor de referencia en Python/NumPy integrados a la API REST de MineTrack/SODEP mediante proxy CORS en Cloudflare Workers: ingesta asíncrona en lotes (Promise.all) sobre /fato-producao y /fato-apontamento con fallback UTF-8/Windows-1252 y deduplicación por clave compuesta; detección de días cerrados (cobertura ≥ 75%), limpieza de outliers vía IQR y mediana; motor matemático L04–L44 (DF, UF, RO, UG, UE, EO, prorrateo de Pare y Siga, productividad t/h y flota requerida 8×4); gráficos SVG nativos, radar GPS y exportación client-side en .xlsx (OpenXML) y .csv.',
          resultLabel: 'Validación y resultado',
          result:
            'Desarrollado en conjunto con Ingeniería de Planificación de Corto Plazo y homologado frente a 4 cierres mensuales históricos consecutivos, alcanzando >97% de adherencia en el dimensionamiento y eliminando distorsiones manuales.',
          tags: [
            'JavaScript ES6+',
            'Python / NumPy',
            'API REST (SODEP)',
            'Cloudflare Workers',
            'Estadística (IQR)',
            'Dimensionamiento 8×4',
            'SVG / OpenXML (.xlsx)',
          ],
          actionLabel: 'Abrir simulador de Dimensionamiento',
          actionTab: 'dim',
        },
        {
          meta: 'ago 2026 a actual; asociado a Bemisa',
          title: 'Algoritmo de Validación Heurística y Auditoría de Flota (Custom BRE)',
          badge: 'Proyecto aplicado',
          badgeType: 'prod',
          problemLabel: 'Problema',
          problem:
            'Los sistemas de gestión de flota generan altos volúmenes de registros sin contexto operacional, exigiendo revisión manual diaria y produciendo falsos positivos en cambios de turno, descansos y paradas prolongadas.',
          approachLabel: 'Enfoque técnico',
          approach:
            'Aplicación client side en JavaScript (ES6+), HTML5 y CSS3 como motor de reglas de negocio: análisis tabular, taxonomía por Regex, cálculo exacto de intersecciones temporales con Unix Timestamps, memoria interdiaria (D-1) para heredar justificaciones y descarte de inactividad prolongada.',
          resultLabel: 'Resultado',
          result:
            'Auditoría diaria reducida a fracciones de segundo sin falsos positivos, garantizando trazabilidad exacta de horas efectivas de flota y protegiendo la validación de contratos de garantía técnica.',
          tags: ['JavaScript ES6+', 'Regex', 'Unix Timestamps', 'Auditoría de Flota', 'Reglas de Negocio'],
          actionLabel: 'Abrir simulador BRE',
          actionTab: 'bre',
        },
        {
          meta: 'ene 2026 a actual; asociado a Bemisa',
          title: 'Short Interval Control (SIC): Sistema de Control Operacional',
          badge: 'Proyecto aplicado',
          badgeType: 'prod',
          problemLabel: 'Problema',
          problem:
            'El control de producción en intervalos cortos dependía de consolidaciones manuales, retrasando la detección de desvíos de ritmo por frente de minado, litología y equipo durante el turno.',
          approachLabel: 'Enfoque técnico',
          approach:
            'Herramienta web integrada a los datos de despacho y preparada para consumo automatizado mediante API, con cálculo de tonelaje por litología y equipo, control de metas horarias, registro de paradas, tableros de KPIs y línea de tiempo por turno.',
          resultLabel: 'Resultado',
          result:
            'Reducción de controles manuales en la sala de operación de la Mina Pedra Branca y mayor agilidad en la toma de decisiones durante el turno.',
          tags: ['Short Interval Control', 'Integración API', 'JavaScript', 'KPIs de Turno', 'Litología'],
          actionLabel: 'Abrir simulador SIC',
          actionTab: 'sic',
        },
        {
          meta: 'nov 2025 a actual',
          title: 'Análisis de Producción Minera con Python (KDD) y Estudios en Machine Learning',
          badge: 'En desarrollo',
          badgeType: 'dev',
          problemLabel: 'Problema',
          problem:
            'Las bases históricas de despacho acumulan patrones recurrentes de cuellos de botella de carguío, ciclos anómalos e indisponibilidades que pasan desapercibidos en revisiones aisladas.',
          approachLabel: 'Enfoque técnico',
          approach:
            'Pipeline KDD (Knowledge Discovery in Databases) en Python sobre registros históricos y bases extraídas vía API, estructurando limpieza, ingeniería de atributos y detección estadística de desvíos.',
          resultLabel: 'Estudios y aplicaciones futuras',
          result:
            'Estudios aplicados de Machine Learning para operación minera orientados a modelos predictivos de caídas de productividad, detección automática de anomalías de ciclo y estimación del impacto en el costo hora máquina.',
          tags: ['Python', 'KDD', 'Machine Learning', 'Integración API', 'Ciclos de Acarreo'],
        },
      ],
    },
    lab: {
      kicker: 'Demostraciones interactivas',
      title: 'Herramientas en ejecución',
      subtitle: 'Simulaciones funcionales con datos operacionales de los tres sistemas desarrollados para sala de control y planificación de corto plazo.',
      ariaTabs: 'Seleccionar demostración',
      tabDim: 'Dimensionamiento 8×4 y Cronoanálisis',
      tabBre: 'Auditoría de Flota (Custom BRE)',
      tabSic: 'Control Horario (SIC)',
    },
    bre: {
      title: 'Motor de Validación Heurística y Auditoría de Flota (reglas R0 a R7)',
      subtitle: 'Planilla editable; conversión a Unix Timestamps, clasificación Regex y memoria interdiaria',
      falsePositivesFiltered: 'falsos positivos filtrados',
      introPrefix: 'Edite las filas abajo usando',
      introMiddle: 'o tabulación en el formato',
      introSuffix: 'y ejecute la auditoría, o cargue un escenario de prueba:',
      presets: {
        completo: 'Escenario completo (14 filas)',
        d1: 'Cambio de día (D-1) y turno',
        garantia: 'Conflictos y garantía técnica',
      },
      textareaAria: 'Planilla de registros de flota',
      runBtn: 'Ejecutar auditoría',
      resetBtn: 'Restaurar ejemplo',
      kpiRecords: 'Registros',
      kpiProductive: 'Productivo',
      kpiJustified: 'Justificado',
      kpiRealIdle: 'Ocioso real',
      kpiUnvalidated: 'No validado',
      filterAll: 'TODOS',
      cols: {
        num: '#',
        equip: 'Equipo',
        interval: 'Intervalo',
        unix: 'Unix (t0)',
        state: 'Estado',
        reason: 'Motivo',
        cls: 'Clase',
        verdict: 'Veredicto',
        ruleDetail: 'Regla y detalle',
      },
      emptyReason: 'vacío',
      timeSep: 'a',
      rulesSummary: 'Ver patrones Regex y parámetros del motor',
      rulesJust: 'Justificable:',
      rulesIdle: 'Ocioso:',
      rulesProd: 'Productivo:',
      rulesWindowsLabel: 'Ventanas obligatorias:',
      rulesWindowsVal: '06:45 a 07:15, 11:30 a 12:30 y 18:45 a 19:15',
      rulesTolLabel: 'Tolerancia neta:',
      rulesLongIdleLabel: 'Inactividad prolongada:',
      showMore: (remaining) => `Mostrar más (+${remaining} registros)`,
      showLess: 'Mostrar menos',
      footerNote: 'Ejecución client side en JavaScript (ES6+); datos ficticios de demostración.',
      clsLabels: {
        PROD: 'Productivo',
        JUST: 'Justificable',
        OCIO: 'Ocioso',
        DESCONHECIDO: 'No reconocido',
        VAZIO: 'Vacío',
      },
      statusLabels: {
        OK: 'OK',
        HERDADO: 'HEREDADO',
        SUPRIMIDO: 'SUPRIMIDO',
        ALERTA: 'ALERTA',
        ERRO: 'ERROR',
        DESCARTADO: 'DESCARTADO',
      },
      logParse: (t, v) => `Parsing tabular: ${t} registros leídos; ${v} intervalos Unix válidos`,
      logTax: (p, j, o, v, u) =>
        `Taxonomía Regex: ${p} productivos, ${j} justificables, ${o} ociosos, ${v} vacíos, ${u} no reconocidos`,
      logDone: (f, ms) => `Reglas R0 a R7 aplicadas: ${f} falsos positivos o ruido filtrados; completado en ${ms} ms`,
      rules: {
        r0Parse: 'R0, Parsing',
        r0ParseDet: 'Fecha u hora fuera del formato DD/MM/AAAA y HH:MM.',
        r0Zero: 'R0, Duración nula',
        r0ZeroDet: 'Horario de inicio y fin idénticos.',
        r1Overlap: 'R1, Solapamiento',
        r1OverlapDet: (eq, end) => `Inicia antes del fin del registro anterior de ${eq} (${end}).`,
        r2Long: 'R2, Inactividad prolongada',
        r2LongDet: (h) => `${h} h continuas; descartado de las métricas para evitar distorsión estadística.`,
        r3Inherit: 'R3, Memoria interdiaria',
        r3InheritDet: (m) => `Continuidad exacta en Unix Timestamp; heredó "${m}" del registro anterior.`,
        r4Match: 'R4, Estado y motivo',
        r4MatchOk: 'Estado productivo coherente con el motivo indicado.',
        r4ProdMismatch: (rp) => `Estado Productivo incompatible con motivo ${rp}.`,
        r4IdleMismatch: (m) => `Estado Ocioso incompatible con motivo productivo "${m}".`,
        r5Just: 'R5, Parada justificable',
        r5JustDet: (m) => `Motivo "${m}" reconocido por la taxonomía como justificable.`,
        r6Tax: 'R6, Taxonomía Regex',
        r6TaxDet: (m) => `"${m}" no coincide con ningún patrón de la taxonomía.`,
        r7Win: 'R7, Ventana obligatoria',
        r7WinDet: (inter, liq, tol) =>
          `${inter} min dentro de cambio de turno o almuerzo; neto ${liq} min (límite ${tol} min); alerta suprimida.`,
        r7Tol: 'R7, Tolerancia',
        r7TolDet: (dur, tol) => `${dur} min dentro de la tolerancia operacional de ${tol} min.`,
        r3NoReason: 'R3, Sin justificación',
        r3NoReasonDet: (liq) => `${liq} min ociosos sin motivo y sin registro previo continuo para heredar.`,
        r7Idle: 'R7, Ociosidad real',
        r7IdleDet: (liq, m, inter) =>
          `${liq} min netos de ociosidad ("${m}")${inter ? `, descontando ${inter} min de ventana obligatoria` : ''}.`,
      },
    },
    sic: {
      title: 'Short Interval Control (SIC), simulación de turno',
      subtitle: 'Seguimiento horario de producción por litología, meta y flota',
      shiftWindow: (c, t) => `Turno A; ventana ${c} de ${t}`,
      kpiAccum: 'Producción acum.',
      tons: 'toneladas',
      kpiProj: 'Proyección turno',
      waitingData: 'esperando datos',
      vsTarget: 't vs meta',
      kpiAdherence: 'Cumplimiento',
      toHourlyTarget: 'a la meta horaria',
      kpiPa: 'Disp. física',
      activeFleet: 'flota activa',
      kpiTrucks: 'Camiones',
      operating: 'en operación',
      targetProgress: 'Progreso de la meta del turno: 3.200 t',
      completed: 'completado',
      colWindow: 'Ventana',
      colTotal: 'Total',
      colStatus: 'Estado',
      breakLabel: 'Intervalo de almuerzo',
      statusOk: 'OK',
      statusWarn: 'Alerta',
      statusDev: 'Desvío',
      lithoTitle: 'Producción acumulada por litología',
      hematite: 'Hematita (HEM)',
      goethite: 'Goetita (GOE)',
      fleetTitle: 'Estado de la flota (8 unidades)',
      eventsTitle: 'Registro de eventos',
      eventsEmpty: 'Use "Iniciar turno" o "Avanzar 1 ventana" para ver la simulación.',
      btnDone: 'Turno finalizado',
      btnPause: 'Pausar',
      btnStart: 'Iniciar turno',
      btnAuto: 'Simular automático',
      btnStep: 'Avanzar 1 ventana',
      resetTitle: 'Reiniciar simulación',
      nextWindowIn: (s) => `Próxima ventana en ${s}s`,
      footerNote: 'Simulación con datos ficticios.',
      timeSep: 'a',
      events: [
        ['Turno A iniciado; flota sincronizada'],
        ['Producción sobre la meta horaria (354 t)'],
        ['CB-03 en mantenimiento correctivo; rebalanceo de cola'],
        ['Recuperación de ritmo en Frente Sur'],
        ['Ritmo estabilizado dentro de la meta'],
        ['Intervalo operacional de almuerzo'],
        ['Reanudación tras almuerzo; CB-03 en inspección final'],
        ['Flota completa (8/8); pico de productividad del turno'],
        ['Cierre de turno por encima de la meta proyectada'],
      ],
    },
    education: {
      kicker: 'Base técnica',
      title: 'Formación, certificaciones y herramientas',
      degrees: [
        {
          inst: 'Universidad del Estado de Minas Gerais (UEMG)',
          degree: 'Grado en Ingeniería de Minas',
          period: 'mar 2023 a dic 2027; 9.º semestre en curso',
          desc: 'Formación orientada a explotación minera, geología aplicada, planificación de mina y gestión de la cadena mineral, uniendo fundamentos de ingeniería con análisis de datos industriales.',
        },
        {
          inst: 'Centro Educacional Roberto Porto',
          degree: 'Técnico en Minería',
          period: 'ago 2022 a jul 2024; concluido',
          desc: 'Formación técnica en minado, beneficio y control de producción y costos, con práctica en AutoCAD y caracterización de minerales en laboratorio.',
        },
      ],
      certsKicker: 'Certificaciones',
      certs: [
        { name: 'Implementing a Software Automation Strategy', by: 'Skillsoft' },
        { name: 'Software Product Management: Mapping & Planning', by: 'Skillsoft' },
        { name: 'Gestión de Proyectos de Software', by: 'IFRS' },
        { name: 'ResponsibleSteel: Estándar Internacional de Minería', by: 'ArcelorMittal' },
        { name: 'NR-12: Seguridad en Máquinas y Equipos', by: 'Certificación Técnica' },
        { name: 'Cybersecurity Awareness Programme', by: 'ArcelorMittal' },
        { name: 'Inglés y Francés: Lectura Técnica Profesional', by: 'IFRS' },
      ],
      stackKicker: 'Competencias y herramientas',
      stackCols: [
        {
          title: 'Operación e ingeniería',
          items: [
            'Gestión de flota y despacho (MineTrack)',
            'Short Interval Control (SIC)',
            'KPIs de mina: DF, UT, productividad y ciclo',
            'Cumplimiento del plan de minado y corto plazo',
            'QGIS, ArcGIS y AutoCAD',
          ],
        },
        {
          title: 'Datos, APIs y Machine Learning',
          items: [
            'JavaScript (ES6+), HTML5 y CSS3',
            'Integración con APIs REST y flujos de datos',
            'Python, KDD y estudios en Machine Learning',
            'Expresiones regulares y Unix Timestamps',
            'Microsoft Power BI y Excel avanzado',
          ],
        },
        {
          title: 'Gestión y sistemas corporativos',
          items: [
            'Gestión de stakeholders e interfaz operacional',
            'SAP MM y NetWeaver',
            'Control de costos OPEX y CAPEX',
            'Conformidad fiscal (CFOP e impuestos)',
            'Lectura técnica en inglés y francés',
          ],
        },
      ],
    },
    contact: {
      title: 'Contacto',
      note: 'Disponible para conversaciones técnicas sobre operaciones mineras, control operacional, integración de datos y proyectos del sector mineral.',
      copyEmail: 'Copiar correo',
      copied: 'Copiado',
      footerPlace: 'João Monlevade, MG, Brasil; 2026',
    },
  },

  zh: {
    htmlLang: 'zh-CN',
    pageTitle: 'Leonardo Canazart | 采矿工程与运营控制',
    nav: {
      about: '简介',
      experience: '工作经历',
      projects: '项目案例',
      demos: '在线演示',
      education: '教育背景',
      contact: '联系方式',
      openMenu: '打开菜单',
      closeMenu: '关闭菜单',
    },
    hero: {
      photoAlt: 'Leonardo Canazart 个人照片',
      location: '巴西米纳斯吉拉斯州若昂蒙莱瓦迪 (João Monlevade, MG)',
      role: 'Bemisa 控制室技术员 I；米纳斯吉拉斯州立大学采矿工程专业在读本科生。',
      summary:
        '专注于露天矿山实时运营控制、车队与生产 KPI 监测，以及基于 API 集成的车队记录审计与班次控制工具开发，并持续开展面向矿山运营的机器学习应用研究。',
      ctaProjects: '查看项目',
      ctaDemos: '交互演示',
      facts: [
        { label: '当前职位', value: 'Bemisa，Pedra Branca 矿山', sub: '运营控制中心 (CCO)' },
        { label: '教育背景', value: '采矿工程，第 9 学期', sub: '米纳斯吉拉斯州立大学 (UEMG)' },
        { label: '技术方向', value: '矿山调度、API 集成与数据分析', sub: '车队审计与机器学习研究' },
      ],
    },
    about: {
      kicker: '个人简介',
      title: '关于我',
      paragraphs: [
        '我目前就读于米纳斯吉拉斯州立大学采矿工程专业（第 9 学期），并拥有采矿技术专业文凭，专注于矿业运营控制、数据完整性与流程自动化。',
        '自 2025 年 12 月起加入 Bemisa 的 Pedra Branca 矿山运营控制中心，参与矿山调度系统的落地部署，并晋升为控制室技术员 I。日常工作涵盖车队与采掘工作面参数配置、设备完好率 (DF)、利用率 (UT) 及生产率监控，并与现场生产、短期采矿计划及设备维护团队紧密协作。',
        '针对控制室日常痛点，我使用 JavaScript 与 Python 开发面向 API 数据集成、自动化数据流、按小时班次控制及车队记录启发式审计的内部工具。同时，我正深入研究机器学习在矿山运营中的未来应用，包括产能下滑预测与运输循环异常提前识别。',
      ],
      focusAria: '核心方向',
      focusGroups: [
        {
          title: '矿山运营与控制室管理',
          desc: '实时车队调度、采矿计划执行追踪、运输循环时间分析、停机管理与关键运营指标监控。',
        },
        {
          title: '数据集成、API 与自动化',
          desc: '通过 API 接入与整合运营数据，构建短周期控制工具、JavaScript 审计规则引擎及 Power BI 仪表板。',
        },
        {
          title: '矿山机器学习应用研究',
          desc: '基于 Python (KDD) 开展研究与原型验证，探索生产率预测模型、装载瓶颈识别与班次统计决策支持。',
        },
      ],
    },
    experience: {
      kicker: '职业经历',
      title: '工作经历',
      items: [
        {
          period: '2025年12月 至今',
          location: 'João Monlevade, MG',
          sublocation: 'Pedra Branca 矿山',
          company: 'Bemisa',
          subroles: [
            {
              title: '控制室技术员 I',
              period: '2026年8月 至今',
              current: true,
              bullets: [
                '通过矿山车队调度系统 (FMS) 实时管控露天采矿运营。',
                '监控运营 KPI，及时识别产量与生产率偏差。',
                '对接短期采矿计划与设备维护团队，处理数据异常并优化车队配置。',
                '支持 MineTrack 调度系统的部署、参数配置与持续优化。',
                '联合短期采矿计划团队架构并开发 8×4 矿卡车队配置与时动分析引擎，通过 Cloudflare Workers 直连 MineTrack/SODEP REST API 并配套 Python/NumPy 参考计算引擎（连续 4 个月历史月结验证拟合度 >97%）。',
                '开发启发式验证与车队审计引擎 (Custom BRE)，实现运营记录的自动化审计。',
                '持续迭代短周期控制 (SIC) 工具，支撑班次监控与现场决策。',
              ],
            },
            {
              title: '控制室操作员',
              period: '2025年12月 至 2026年8月；9个月',
              bullets: [
                '通过调度系统实时管理现场作业，保障采矿计划执行率。',
                '监控设备完好率 (DF)、利用率 (UT)、生产率及循环时间，快速定位偏差。',
                '参与 MineTrack 系统上线，包括车队与采掘工作面参数配置。',
                '协同生产与维护团队处理异常记录并优化设备调度。',
                '搭建初版短周期控制 (SIC) 工具用于班次生产追踪。',
              ],
            },
          ],
        },
        {
          period: '2025年1月 至 2025年12月',
          location: 'João Monlevade, MG',
          sublocation: '1年',
          company: 'ArcelorMittal Brasil',
          roleTitle: '供应链实习生，MRO 与矿产资源',
          bullets: [
            '支持供应链计划与管理，聚焦烧结与高炉工序的战略原料供应。',
            '协助管控铁矿石、石灰石、砂料、焦炭及菱镁矿等关键原料的流转与库存。',
            '在 SAP MM 与 NetWeaver 中执行单据录入与核对，确保称重、物料移动及税务参数 (CFOP) 准确合规。',
          ],
        },
        {
          period: '2024年7月 至 2025年1月',
          location: 'João Monlevade, MG',
          sublocation: '7个月',
          company: 'PH Intralogística e Serviços',
          roleTitle: '运营学徒',
          bullets: [
            '负责钢铁厂环境下的运输与机械化工业清扫运营及物流协调。',
            '借助 Power BI 数据分析监控车队 KPI、设备可用率与作业效率。',
            '执行重型设备点检并对接现场作业面，优化资源配置并确保安全合规。',
          ],
        },
        {
          period: '2024年3月 至 2024年7月',
          location: 'João Monlevade, MG',
          sublocation: '5个月',
          company: 'Construtora Helmo',
          roleTitle: '技术实习生，财务与行政',
          bullets: [
            '负责基础设施项目的税务凭证处理与财务对账。',
            '监控运营成本 (OPEX) 与资本支出 (CAPEX)，支持项目预算管理。',
          ],
        },
      ],
    },
    projects: {
      kicker: '项目案例',
      title: '代表性项目',
      subtitle: '围绕矿山控制室真实运营痛点构建的软件工具与数据分析流程。',
      items: [
        {
          meta: '2026年8月 至今；关联 Bemisa',
          title: '8×4 矿卡车队配置与时动分析引擎 — REST API 集成',
          badge: '已落地应用',
          badgeType: 'prod',
          problemLabel: '业务痛点',
          problem:
            '8×4 运输车队月度运力配置与循环时动分析此前依赖人工导出与电子表格分摊，易受非完整日数据、车速离群值及交通管制等待时间分摊失真影响。',
          approachLabel: '系统架构与数据工程',
          approach:
            '单文件分析型 Web 应用（HTML5/CSS3/Vanilla JS，约 120 KB，零服务端依赖）与 Python/NumPy 参考计算引擎，通过 Cloudflare Workers CORS 代理直连 MineTrack/SODEP 调度系统 REST API：基于 Promise.all 并发批量拉取 /fato-producao 与 /fato-apontamento，支持 UTF-8/Windows-1252 编码回退与复合键内存去重；自动识别完整结账日（车队日历工时覆盖率 ≥75%），采用四分位距 (IQR) 剔除重车/空车速度离群值并以中位数建模固定循环时长；构建 L04–L44（37 行）数学配置矩阵，自动计算 DF、UF、RO、UG、UE、EO、按班次/车次比例分摊交通管制耗时、加权生产率 (t/h) 及所需 8×4 矿卡数量；提供原生 SVG 图表、GPS 坐标散点雷达以及纯前端 .xlsx (OpenXML) 与 .csv 导出。',
          resultLabel: '验证与实际成效',
          result:
            '与短期采矿计划工程团队联合开发，经连续 4 个月历史月度结算数据对标核验，运力配置吻合度达 >97%，彻底消除人工表格分摊偏差。',
          tags: [
            'JavaScript ES6+',
            'Python / NumPy',
            'REST API (SODEP)',
            'Cloudflare Workers',
            '统计清洗 (IQR)',
            '8×4 车队运力配置',
            'SVG / OpenXML (.xlsx)',
          ],
          actionLabel: '打开车队配置模拟器',
          actionTab: 'dim',
        },
        {
          meta: '2026年8月 至今；关联 Bemisa',
          title: '启发式验证与车队审计引擎 (Custom BRE)',
          badge: '已落地应用',
          badgeType: 'prod',
          problemLabel: '业务痛点',
          problem:
            '矿山车队管理系统产生海量原始状态记录，但缺乏上下文判断能力，导致每日需人工复核，并在交接班、休息时段及长期停机时频繁产生误报。',
          approachLabel: '技术方案',
          approach:
            '基于 JavaScript (ES6+)、HTML5 与 CSS3 构建客户端业务规则引擎：支持表格数据解析、正则表达式状态分类、基于 Unix 时间戳的精确区间交集计算、跨日上下文记忆 (D-1) 继承及长期闲置设备过滤。',
          resultLabel: '实际成效',
          result:
            '控制室每日审计耗时缩短至毫秒级且消除误报，精确追踪车队有效工时，保障技术质保合同的核验与结算。',
          tags: ['JavaScript ES6+', '正则表达式', 'Unix 时间戳', '车队审计', '业务规则引擎'],
          actionLabel: '打开 BRE 模拟器',
          actionTab: 'bre',
        },
        {
          meta: '2026年1月 至今；关联 Bemisa',
          title: '短周期控制 (SIC)：矿山运营控制系统',
          badge: '已落地应用',
          badgeType: 'prod',
          problemLabel: '业务痛点',
          problem:
            '短周期产量监控此前依赖人工表格汇总，导致无法及时发现各采掘面、岩性及设备在班次内的节奏偏差。',
          approachLabel: '技术方案',
          approach:
            '与调度数据对接并支持通过 API 自动采集的 Web 应用，实现按岩性与设备类型自动统计产量、小时目标追踪、停机结构化记录、KPI 仪表板与班次时间线。',
          resultLabel: '实际成效',
          result:
            '显著减少 Pedra Branca 矿山控制室的人工汇总工作，提升班次内的现场响应与决策效率。',
          tags: ['短周期控制 (SIC)', 'API 集成', 'JavaScript', '班次 KPI', '岩性统计'],
          actionLabel: '打开 SIC 模拟器',
          actionTab: 'sic',
        },
        {
          meta: '2025年11月 至今',
          title: '基于 Python (KDD) 的矿山产量分析与机器学习研究',
          badge: '持续研发中',
          badgeType: 'dev',
          problemLabel: '业务痛点',
          problem:
            '历史调度数据库中隐藏着装载瓶颈、异常运输循环与重复性非计划停机模式，单班次复盘难以系统识别。',
          approachLabel: '技术方案',
          approach:
            '基于 Python 搭建 KDD（数据库知识发现）分析流程，对历史记录及通过 API 提取的数据集进行清洗、特征工程与统计异常检测。',
          resultLabel: '研究与未来应用',
          result:
            '开展面向矿山运营的机器学习应用研究，聚焦生产率下滑预测模型、运输循环异常自动识别以及单位机时成本影响评估。',
          tags: ['Python', 'KDD', '机器学习', 'API 集成', '运输循环分析'],
        },
      ],
    },
    lab: {
      kicker: '交互演示',
      title: '在线运行工具',
      subtitle: '基于示例数据的浏览器实时演示，可亲身体验三套控制室与短期计划工具的核心逻辑。',
      ariaTabs: '选择演示工具',
      tabDim: '8×4 车队配置与时动分析',
      tabBre: '车队审计引擎 (Custom BRE)',
      tabSic: '小时班次控制 (SIC)',
    },
    bre: {
      title: '启发式验证与车队审计引擎（规则 R0 至 R7）',
      subtitle: '可编辑表格；Unix 时间戳转换、正则分类与跨日上下文记忆',
      falsePositivesFiltered: '条误报已过滤',
      introPrefix: '可使用',
      introMiddle: '或制表符按格式',
      introSuffix: '编辑下方数据并运行审计，或直接加载预设场景：',
      presets: {
        completo: '完整场景（14 条记录）',
        d1: '跨日记忆 (D-1) 与交接班',
        garantia: '冲突检测与技术质保',
      },
      textareaAria: '车队记录数据表',
      runBtn: '运行审计',
      resetBtn: '恢复示例',
      kpiRecords: '记录数',
      kpiProductive: '生产工时',
      kpiJustified: '合理停机',
      kpiRealIdle: '真实闲置',
      kpiUnvalidated: '未通过校验',
      filterAll: '全部',
      cols: {
        num: '#',
        equip: '设备',
        interval: '时间段',
        unix: 'Unix (t0)',
        state: '状态',
        reason: '原因',
        cls: '分类',
        verdict: '判定',
        ruleDetail: '规则与说明',
      },
      emptyReason: '空',
      timeSep: '至',
      rulesSummary: '查看正则表达式规则与引擎参数',
      rulesJust: '合理停机：',
      rulesIdle: '闲置状态：',
      rulesProd: '生产状态：',
      rulesWindowsLabel: '规定窗口：',
      rulesWindowsVal: '06:45 至 07:15、11:30 至 12:30、18:45 至 19:15',
      rulesTolLabel: '净容差：',
      rulesLongIdleLabel: '长期闲置阈值：',
      showMore: (remaining) => `展开更多 (+${remaining} 条记录)`,
      showLess: '收起列表',
      footerNote: '基于 JavaScript (ES6+) 在浏览器端实时运行；演示使用虚构数据。',
      clsLabels: {
        PROD: '生产',
        JUST: '合理停机',
        OCIO: '闲置',
        DESCONHECIDO: '未识别',
        VAZIO: '空值',
      },
      statusLabels: {
        OK: '正常',
        HERDADO: '跨日继承',
        SUPRIMIDO: '已抑制误报',
        ALERTA: '告警',
        ERRO: '错误',
        DESCARTADO: '已剔除',
      },
      logParse: (t, v) => `表格解析：已读取 ${t} 条记录；${v} 条有效 Unix 时间区间`,
      logTax: (p, j, o, v, u) =>
        `正则分类：生产 ${p} 条、合理停机 ${j} 条、闲置 ${o} 条、空值 ${v} 条、未识别 ${u} 条`,
      logDone: (f, ms) => `规则 R0 至 R7 执行完成：过滤 ${f} 条误报或噪声；耗时 ${ms} ms`,
      rules: {
        r0Parse: 'R0，格式解析',
        r0ParseDet: '日期或时间不符合 DD/MM/AAAA 与 HH:MM 格式。',
        r0Zero: 'R0，零时长',
        r0ZeroDet: '开始时间与结束时间相同。',
        r1Overlap: 'R1，时间重叠',
        r1OverlapDet: (eq, end) => `开始时间早于设备 ${eq} 上一条记录的结束时间 (${end})。`,
        r2Long: 'R2，长期闲置',
        r2LongDet: (h) => `连续闲置 ${h} 小时；已从指标中剔除以防统计失真。`,
        r3Inherit: 'R3，跨日记忆',
        r3InheritDet: (m) => `Unix 时间戳无缝衔接；已从上一条记录继承原因 "${m}"。`,
        r4Match: 'R4，状态与原因校验',
        r4MatchOk: '生产状态与记录原因一致。',
        r4ProdMismatch: (rp) => `生产状态与原因 ${rp} 冲突。`,
        r4IdleMismatch: (m) => `闲置状态与生产类原因 "${m}" 冲突。`,
        r5Just: 'R5，合理停机',
        r5JustDet: (m) => `原因 "${m}" 匹配为合理停机类别。`,
        r6Tax: 'R6，正则分类',
        r6TaxDet: (m) => `"${m}" 未匹配任何已知运营分类。`,
        r7Win: 'R7，规定窗口交集',
        r7WinDet: (inter, liq, tol) =>
          `${inter} 分钟位于交接班或用餐时段；净时长 ${liq} 分钟（容差 ${tol} 分钟）；已自动抑制误报。`,
        r7Tol: 'R7，容差范围',
        r7TolDet: (dur, tol) => `${dur} 分钟处于 ${tol} 分钟运营容差内。`,
        r3NoReason: 'R3，缺少说明',
        r3NoReasonDet: (liq) => `闲置 ${liq} 分钟且无原因说明，亦无可继承的连续前序记录。`,
        r7Idle: 'R7，真实闲置',
        r7IdleDet: (liq, m, inter) =>
          `净闲置 ${liq} 分钟（"${m}"）${inter ? `，已扣除 ${inter} 分钟规定窗口` : ''}。`,
      },
    },
    sic: {
      title: '短周期控制 (SIC)，班次模拟',
      subtitle: '按岩性、班次目标与车队状态进行逐小时产量追踪',
      shiftWindow: (c, t) => `A 班；第 ${c} / ${t} 时段`,
      kpiAccum: '累计产量',
      tons: '吨',
      kpiProj: '班次预测',
      waitingData: '等待数据',
      vsTarget: '吨 对比目标',
      kpiAdherence: '目标达成率',
      toHourlyTarget: '对比小时目标',
      kpiPa: '设备完好率',
      activeFleet: '在运车队',
      kpiTrucks: '矿用卡车',
      operating: '运行中',
      targetProgress: '班次目标进度：3,200 吨',
      completed: '已完成',
      colWindow: '时段',
      colTotal: '合计',
      colStatus: '状态',
      breakLabel: '午休时段',
      statusOk: '正常',
      statusWarn: '预警',
      statusDev: '偏差',
      lithoTitle: '按岩性统计累计产量',
      hematite: '赤铁矿 (HEM)',
      goethite: '针铁矿 (GOE)',
      fleetTitle: '车队状态（8 台）',
      eventsTitle: '控制室事件记录',
      eventsEmpty: '点击“开始模拟”或“前进 1 时段”查看班次变化。',
      btnDone: '班次已结束',
      btnPause: '暂停',
      btnStart: '开始模拟',
      btnAuto: '自动推演',
      btnStep: '前进 1 时段',
      resetTitle: '重置模拟',
      nextWindowIn: (s) => `${s} 秒后进入下一时段`,
      footerNote: '使用虚构数据进行演示。',
      timeSep: '至',
      events: [
        ['A 班启动；车队已同步'],
        ['小时产量高于目标 (354 吨)'],
        ['CB-03 进入故障维修；已重新平衡排队'],
        ['南工作面生产节奏恢复'],
        ['产量稳定在目标区间内'],
        ['计划内午休停机'],
        ['午休后复产；CB-03 处于最终检查'],
        ['全车队投入运行 (8/8)；达到本班峰值效率'],
        ['本班收官产量高于预期目标'],
      ],
    },
    education: {
      kicker: '技术背景',
      title: '教育背景、证书与技术栈',
      degrees: [
        {
          inst: '米纳斯吉拉斯州立大学 (UEMG)',
          degree: '采矿工程学士学位',
          period: '2023年3月 至 2027年12月；第 9 学期在读',
          desc: '聚焦采矿作业、应用地质、矿山规划与矿产价值链管理，将工程分析基础与工业数据实践相结合。',
        },
        {
          inst: 'Centro Educacional Roberto Porto',
          degree: '采矿技术专业文凭',
          period: '2022年8月 至 2024年7月；已毕业',
          desc: '系统学习采矿、选矿及生产与成本控制技术，具备 AutoCAD 绘图与实验室矿石表征实践经验。',
        },
      ],
      certsKicker: '专业证书',
      certs: [
        { name: 'Implementing a Software Automation Strategy', by: 'Skillsoft' },
        { name: 'Software Product Management: Mapping & Planning', by: 'Skillsoft' },
        { name: '软件项目管理 (Gestão de Projetos de Software)', by: 'IFRS' },
        { name: 'ResponsibleSteel 国际可持续采矿标准', by: 'ArcelorMittal' },
        { name: 'NR-12 机械与设备安全认证', by: '技术认证' },
        { name: 'Cybersecurity Awareness Programme', by: 'ArcelorMittal' },
        { name: '英语与法语：专业技术阅读', by: 'IFRS' },
      ],
      stackKicker: '核心能力与工具',
      stackCols: [
        {
          title: '矿山运营与工程',
          items: [
            '车队调度与管理 (MineTrack)',
            '短周期控制 (SIC)',
            '矿山指标：完好率 DF、利用率 UT、生产率与循环时间',
            '采矿计划执行与短期计划协同',
            'QGIS、ArcGIS 与 AutoCAD',
          ],
        },
        {
          title: '数据、API 与机器学习',
          items: [
            'JavaScript (ES6+)、HTML5 与 CSS3',
            'REST API 集成与数据流自动化',
            'Python、KDD 与机器学习研究',
            '正则表达式与 Unix 时间戳处理',
            'Microsoft Power BI 与高级 Excel',
          ],
        },
        {
          title: '管理与企业系统',
          items: [
            '利益相关方协调与跨部门对接',
            'SAP MM 与 NetWeaver',
            'OPEX 与 CAPEX 成本控制',
            '税务合规核验 (CFOP)',
            '英语与法语专业技术阅读',
          ],
        },
      ],
    },
    contact: {
      title: '联系方式',
      note: '欢迎就矿山运营、控制室管理、API 数据集成及矿业项目进行技术交流。',
      copyEmail: '复制邮箱',
      copied: '已复制',
      footerPlace: '巴西 João Monlevade, MG；2026',
    },
  },
};
