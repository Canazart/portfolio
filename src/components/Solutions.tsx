export default function Solutions() {
  return (
    <section className="section" id="solutions">
      <div className="sec-label reveal">O QUE CONSTRUO & O QUE ME MOVE</div>
      <h2 className="sec-title reveal">Soluções & <span>Interesses</span></h2>

      <div className="sol-grid reveal">
        <div className="sol-card">
          <div className="sol-name">AUTOMAÇÃO OPERACIONAL</div>
          <div className="sol-desc">Desenvolvimento de ferramentas web que automatizam o registro, análise e visualização de dados de produção em tempo real , eliminando planilhas manuais e reduzindo o tempo de resposta a desvios operacionais.</div>
        </div>
        <div className="sol-card" style={{ borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
          <div className="sol-name">INTELIGÊNCIA DE FROTA</div>
          <div className="sol-desc">Integração entre sistemas FMS e dashboards próprios para análise de ciclos de transporte, disponibilidade física e produtividade por frente, litologia e turno , com foco em decisão baseada em dados.</div>
        </div>
        <div className="sol-card">
          <div className="sol-name">MINERAÇÃO 4.0</div>
          <div className="sol-desc">Interesse na convergência entre engenharia de minas e tecnologia: digitalização de operações, sistemas de despacho de próxima geração, IoT embarcado em equipamentos e otimização do plano de lavra por dados.</div>
        </div>
      </div>

      <div className="sol-bottom reveal">
        <div className="sol-box">
          <div className="sol-box-label">INTERESSES TÉCNICOS</div>
          <div className="int-item"><div className="int-dot"></div><div className="int-text">Sistemas de despacho e FMS de próxima geração</div></div>
          <div className="int-item"><div className="int-dot"></div><div className="int-text">Algoritmos de otimização de rota e alocação de frota</div></div>
          <div className="int-item"><div className="int-dot"></div><div className="int-text">Dashboards operacionais e visualização de dados em tempo real</div></div>
          <div className="int-item"><div className="int-dot"></div><div className="int-text">Geoprocessamento aplicado ao planejamento de lavra</div></div>
          <div className="int-item"><div className="int-dot"></div><div className="int-text">Integração de dados operacionais e ERP em ambiente mineiro</div></div>
        </div>
        <div className="sol-box" style={{ borderTopColor: 'var(--accent2)' }}>
          <div className="sol-box-label">VISÃO DE CARREIRA</div>
          <div style={{ fontSize: '14px', lineHeight: '1.9', color: 'var(--text-muted)' }}>
            Atuar na interseção entre <strong style={{ color: 'var(--accent2)', fontWeight: 500 }}>engenharia de minas, operação de CCO e desenvolvimento de sistemas</strong> , construindo pontes entre o chão de mina e a inteligência de dados.
            <br/><br/>
            Meu objetivo é ser o profissional que não apenas opera sistemas críticos, mas que os <strong style={{ color: 'var(--accent2)', fontWeight: 500 }}>entende profundamente o suficiente para criá-los e evoluí-los</strong>, tornando operações mineiras mais eficientes, digitais e orientadas por dados.
          </div>
        </div>
      </div>
    </section>
  );
}
