import { Activity, Cpu, Layers } from 'lucide-react';

export default function Solutions() {
  return (
    <section className="section" id="solutions">
      <div className="sec-header reveal">
        <div className="sec-label">O QUE CONSTRUO &amp; O QUE ME MOVE</div>
        <h2 className="sec-title">
          Soluções &amp; <span>Interesses</span>
        </h2>
        <p className="sec-subtitle">
          Convergência entre rigor analítico da engenharia de minas, gestão em tempo real no CCO e software
          aplicado à integridade de dados operacionais.
        </p>
      </div>

      <div className="sol-grid reveal">
        <article className="sol-card">
          <div className="sol-icon">
            <Cpu size={20} />
          </div>
          <h3 className="sol-name">AUDITORIA &amp; AUTOMAÇÃO</h3>
          <p className="sol-desc">
            Construção de motores de regras de negócio (Custom BRE) e ferramentas web que validam apontamentos
            brutos de frota em frações de segundo — eliminando planilhas manuais, falsos positivos e falhas de
            rastreabilidade contratual.
          </p>
        </article>

        <article className="sol-card">
          <div className="sol-icon">
            <Activity size={20} />
          </div>
          <h3 className="sol-name">INTELIGÊNCIA DE FROTA</h3>
          <p className="sol-desc">
            Integração entre sistemas de despacho (MineTrack / Sodep) e dashboards próprios de Short Interval
            Control (SIC) para acompanhar ciclos de transporte, DF, UT e produtividade por frente, litologia e
            turno.
          </p>
        </article>

        <article className="sol-card">
          <div className="sol-icon">
            <Layers size={20} />
          </div>
          <h3 className="sol-name">MINERAÇÃO 4.0 &amp; KDD</h3>
          <p className="sol-desc">
            Aplicação de técnicas de Data Mining e KDD em Python sobre bases históricas de despacho para
            identificar gargalos sistemáticos, otimizar aderência ao plano de lavra e evoluir para modelos
            preditivos de produtividade.
          </p>
        </article>
      </div>

      <div className="sol-bottom reveal">
        <div className="sol-box">
          <div className="sol-box-label">INTERESSES TÉCNICOS</div>
          <div className="int-item">
            <div className="int-dot" />
            <div className="int-text">Sistemas de despacho (FMS) de próxima geração e telemetria embarcada</div>
          </div>
          <div className="int-item">
            <div className="int-dot" />
            <div className="int-text">Motores heurísticos (BRE) para auditoria e integridade de dados operacionais</div>
          </div>
          <div className="int-item">
            <div className="int-dot" />
            <div className="int-text">Short Interval Control (SIC) e dashboards em tempo real para tomada de decisão</div>
          </div>
          <div className="int-item">
            <div className="int-dot" />
            <div className="int-text">Descoberta de conhecimento (KDD) e modelos preditivos aplicados à lavra</div>
          </div>
          <div className="int-item">
            <div className="int-dot" />
            <div className="int-text">Integração pit-to-plant entre operação de mina, manutenção e gestão de custos</div>
          </div>
        </div>

        <div className="sol-box vision">
          <div className="sol-box-label">VISÃO DE CARREIRA</div>
          <p className="vision-text">
            Atuar na interseção entre{' '}
            <strong>engenharia de minas, operação de CCO e desenvolvimento de sistemas</strong> — construindo
            pontes concretas entre o chão de mina e a inteligência de dados.
            <br />
            <br />
            Meu propósito é ir além de operar sistemas críticos: quero{' '}
            <strong>entendê-los profundamente o suficiente para auditá-los, criá-los e evoluí-los</strong>,
            elevando a performance mineira com confiabilidade estatística e resultados sustentáveis.
          </p>
        </div>
      </div>
    </section>
  );
}
