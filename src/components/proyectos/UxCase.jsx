import PrototypeViewer from "./PrototypeViewer";
import Wireframe from "./Wireframe";

const BASE = import.meta.env.BASE_URL;

// Caso de estudio UX/UI (página de detalle): reto → prototipo navegable → proceso.
export default function UxCase({ caso }) {
  return (
    <article className="card ux-case" aria-labelledby={`t-${caso.id}`}>
      <header className="ux-head">
        <span className="pill">Caso de estudio · UX/UI</span>
        <h1 id={`t-${caso.id}`}>{caso.titulo}</h1>
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
        <div className="ux-actions ux-actions-top">
          <a className="btn btn-primary" href={`${BASE}demos/${caso.demo}/index.html`} target="_blank" rel="noopener noreferrer">
            Ver proyecto en pantalla completa
          </a>
          <a className="btn btn-outline" href={caso.repo} target="_blank" rel="noopener noreferrer">
            Ver código y documentación
          </a>
        </div>
      </header>

      <div className="ux-split">
        <div className="ux-box">
          <h2>El reto</h2>
          <p>{caso.reto}</p>
        </div>
        <div className="ux-box ux-box-accent">
          <h2>La solución</h2>
          <p>{caso.solucion}</p>
        </div>
      </div>

      <h2 className="ux-process-title">Prototipo navegable</h2>
      <p className="muted ux-hint">Recorre todas sus páginas desde el menú del prototipo, en vista de escritorio o de móvil.</p>
      <PrototypeViewer caso={caso} />

      <h2 className="ux-process-title">El proceso</h2>
      <ol className="ux-process">
        <li>
          <h3>Entender el problema</h3>
          <ul className="bullets">
            {caso.dolores.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </li>

        <li>
          <h3>Flujo de la persona usuaria</h3>
          <ol className="ux-flow">
            {caso.flujo.map((paso) => (
              <li key={paso}>{paso}</li>
            ))}
          </ol>
        </li>

        <li>
          <h3>Del boceto al diseño final</h3>
          <div className="ux-compare">
            <figure>
              <Wireframe tipo={caso.wireframe} />
              <figcaption>Wireframe de baja fidelidad</figcaption>
            </figure>
            <figure>
              <img src={caso.capturas.app} alt={`Diseño final de ${caso.titulo}`} loading="lazy" />
              <figcaption>Diseño final, funcionando</figcaption>
            </figure>
          </div>
        </li>

        <li>
          <h3>Decisiones de diseño</h3>
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
          <h3>Validación</h3>
          <ul className="bullets">
            {caso.validacion.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
          <p className="ux-next">{caso.siguiente}</p>
        </li>
      </ol>
    </article>
  );
}
