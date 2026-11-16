import PrototypeViewer from "./PrototypeViewer";
import Wireframe from "./Wireframe";

// Caso UX/UI completo: reto → prototipo → proceso (problema, flujo, boceto, decisiones, validación).
export default function UxCase({ caso, numero }) {
  const tituloId = `t-${caso.id}`;

  return (
    <article className="card ux-case" aria-labelledby={tituloId}>
      <header className="ux-head">
        <span className="pill">Caso UX/UI · {String(numero).padStart(2, "0")}</span>
        <h3 id={tituloId}>{caso.titulo}</h3>
        <p className="ux-sub">{caso.subtitulo}</p>
        <dl className="ux-meta">
          <div>
            <dt>Mi rol</dt>
            <dd>{caso.rol}</dd>
          </div>
          <div>
            <dt>Herramientas</dt>
            <dd>{caso.herramientas.join(" · ")}</dd>
          </div>
        </dl>
      </header>

      <div className="ux-split">
        <div className="ux-box">
          <h4>El reto</h4>
          <p>{caso.reto}</p>
        </div>
        <div className="ux-box ux-box-accent">
          <h4>La solución</h4>
          <p>{caso.solucion}</p>
        </div>
      </div>

      <PrototypeViewer caso={caso} />

      <h4 className="ux-process-title">El proceso</h4>
      <ol className="ux-process">
        <li>
          <h5>Entender el problema</h5>
          <ul className="bullets">
            {caso.dolores.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </li>

        <li>
          <h5>Flujo de la persona usuaria</h5>
          <ol className="ux-flow">
            {caso.flujo.map((paso) => (
              <li key={paso}>{paso}</li>
            ))}
          </ol>
        </li>

        <li>
          <h5>Del boceto al diseño final</h5>
          <div className="ux-compare">
            <figure>
              <Wireframe tipo={caso.wireframe} />
              <figcaption>Wireframe de baja fidelidad</figcaption>
            </figure>
            <figure>
              <img src={caso.capturas.escritorio} alt={`Diseño final de ${caso.titulo}`} loading="lazy" />
              <figcaption>Diseño final, funcionando</figcaption>
            </figure>
          </div>
        </li>

        <li>
          <h5>Decisiones de diseño</h5>
          <div className="ux-decisions">
            {caso.decisiones.map(([titulo, texto]) => (
              <div key={titulo} className="ux-decision">
                <strong>{titulo}</strong>
                <p>{texto}</p>
              </div>
            ))}
          </div>
        </li>

        <li>
          <h5>Validación</h5>
          <ul className="bullets">
            {caso.validacion.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
          <p className="ux-next">{caso.siguiente}</p>
        </li>
      </ol>

      <div className="ux-actions">
        <a className="btn btn-outline" href={caso.repo} target="_blank" rel="noopener noreferrer">
          Ver código y documentación
        </a>
      </div>
    </article>
  );
}
