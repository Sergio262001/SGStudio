// Wireframes de baja fidelidad dibujados con CSS: muestran la estructura antes del diseño final.

const Lines = ({ n, short }) =>
  Array.from({ length: n }, (_, i) => <span key={i} className={`wf-line ${short && i % 2 ? "short" : ""}`} />);

function WireframeFormularios() {
  return (
    <div className="wf" role="img" aria-label="Wireframe: barra superior con deshacer y modos; tres columnas con campos disponibles, el formulario y el panel de propiedades con reglas.">
      <div className="wf-bar">
        <span className="wf-line short" />
        <span className="wf-pill" />
        <span className="wf-pill" />
        <span className="wf-pill accent" />
      </div>
      <div className="wf-cols wf-3">
        <div className="wf-col">
          <Lines n={1} short />
          {[0, 1, 2, 3].map((i) => <span key={i} className="wf-btn" />)}
        </div>
        <div className="wf-col">
          <Lines n={1} short />
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`wf-card ${i === 1 ? "sel" : ""}`}>
              <span className="wf-line" />
              <span className="wf-chips">
                <i />
                <i className={i % 2 ? "accent" : ""} />
              </span>
            </span>
          ))}
        </div>
        <div className="wf-col">
          <Lines n={1} short />
          <span className="wf-input" />
          <span className="wf-input" />
          <span className="wf-group">
            <span className="wf-input" />
            <span className="wf-input" />
          </span>
        </div>
      </div>
    </div>
  );
}

function WireframeEscenarios() {
  return (
    <div className="wf" role="img" aria-label="Wireframe: columna de parámetros con deslizadores a la izquierda; a la derecha cuatro indicadores, el gráfico de líneas y la tabla de comparación.">
      <div className="wf-bar">
        <span className="wf-line" />
      </div>
      <div className="wf-cols wf-side">
        <div className="wf-col">
          <span className="wf-chips">
            <i />
            <i />
            <i />
          </span>
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="wf-slider">
              <span className="wf-line short" />
              <span className="wf-track" />
            </span>
          ))}
          <span className="wf-btn accent" />
        </div>
        <div className="wf-col">
          <span className="wf-kpis">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="wf-chart">
            <svg viewBox="0 0 200 70" preserveAspectRatio="none" aria-hidden="true">
              <polyline points="0,62 40,58 80,48 120,36 160,22 200,8" />
              <polyline points="0,64 40,61 80,56 120,50 160,44 200,38" className="dash" />
            </svg>
          </span>
          <Lines n={3} />
        </div>
      </div>
    </div>
  );
}

export default function Wireframe({ tipo }) {
  return tipo === "ux-02" ? <WireframeEscenarios /> : <WireframeFormularios />;
}
