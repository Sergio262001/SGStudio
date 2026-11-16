import { Link } from "react-router-dom";
import PrototypeViewer from "./PrototypeViewer";
import Wireframe from "./Wireframe";
import Resumen30 from "./Resumen30";
import Tabs from "./Tabs";

// Caso de estudio UX/UI: poco texto, lo importante a la vista y el proceso en pestañas.
export default function UxCase({ caso }) {
  const tabs = [
    {
      titulo: "Problema",
      contenido: (
        <ul className="pain-list">
          {caso.dolores.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      ),
    },
    {
      titulo: "Flujo",
      contenido: (
        <ol className="ux-flow">
          {caso.flujo.map((paso) => (
            <li key={paso}>{paso}</li>
          ))}
        </ol>
      ),
    },
    {
      titulo: "Boceto → diseño",
      contenido: (
        <div className="ux-compare">
          <figure>
            <Wireframe tipo={caso.wireframe} />
            <figcaption>Wireframe</figcaption>
          </figure>
          <figure>
            <img src={caso.capturas.app} alt={`Diseño final de ${caso.titulo}`} loading="lazy" />
            <figcaption>Diseño final</figcaption>
          </figure>
        </div>
      ),
    },
    {
      titulo: "Decisiones",
      contenido: (
        <div className="ux-decisions">
          {caso.decisiones.map(([t, d]) => (
            <div key={t} className="ux-decision">
              <strong>{t}</strong>
              <p>{d}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      titulo: "Validación",
      contenido: (
        <>
          <ul className="check-list">
            {caso.validacion.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
          <p className="ux-next">{caso.siguiente}</p>
        </>
      ),
    },
  ];

  return (
    <article className="case" aria-labelledby={`t-${caso.id}`}>
      <header className="case-head">
        <span className="pill">{caso.etiqueta}</span>
        <h1 id={`t-${caso.id}`}>{caso.titulo}</h1>
        <p className="case-sub">{caso.subtitulo}</p>
        <ul className="chip-row" aria-label="Rol y herramientas">
          <li className="chip chip-strong">{caso.rol}</li>
          {caso.herramientas.map((h) => (
            <li key={h} className="chip">{h}</li>
          ))}
        </ul>
        <div className="case-actions">
          <Link to={`/ver/${caso.id}`} className="btn btn-primary">
            ▶ Abrir el proyecto
          </Link>
          <a className="btn btn-outline" href={caso.repo} target="_blank" rel="noopener noreferrer">
            Código ↗
          </a>
        </div>
      </header>

      <Resumen30 items={caso.resumen30} />

      <section className="case-block" aria-label="Prototipo">
        <PrototypeViewer caso={caso} />
      </section>

      <section className="case-block" aria-labelledby={`p-${caso.id}`}>
        <h2 id={`p-${caso.id}`} className="case-h2">Cómo lo resolví</h2>
        <Tabs label="Proceso de diseño" tabs={tabs} />
      </section>
    </article>
  );
}
