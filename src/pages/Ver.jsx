import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useParams } from "react-router-dom";
import { CASOS, demoUrl } from "../data/proyectos";

// Visor de proyecto: abre el prototipo DENTRO del portafolio, con barra para volver.
export default function Ver() {
  const { id } = useParams();
  const p = CASOS[id];
  const [vista, setVista] = useState("escritorio");
  if (!p) return <Navigate to="/proyectos" replace />;
  const src = demoUrl(p.demo);

  return (
    <div className="viewer">
      <Helmet>
        <title>{`${p.titulo} | SG Studio`}</title>
        <meta name="description" content={p.resumen} />
      </Helmet>

      <div className="viewer-bar">
        <Link to="/proyectos" className="btn btn-outline viewer-back">
          ← Proyectos
        </Link>
        <div className="viewer-title">
          <h1>{p.titulo}</h1>
          <span>{p.etiqueta}</span>
        </div>
        <div className="viewer-tools">
          <div className="proto-seg" role="group" aria-label="Tamaño de pantalla">
            {[
              ["escritorio", "Escritorio"],
              ["movil", "Móvil"],
            ].map(([v, label]) => (
              <button key={v} type="button" aria-pressed={vista === v} onClick={() => setVista(v)}>
                {label}
              </button>
            ))}
          </div>
          <Link to={`/proyectos/${p.id}`} className="btn btn-outline">
            Caso de estudio
          </Link>
          <a href={src} target="_blank" rel="noopener noreferrer" className="viewer-ext" aria-label="Abrir en pantalla completa (pestaña nueva)">
            ↗
          </a>
        </div>
      </div>

      <div className="viewer-stage">
        <div className={`viewer-frame viewer-${vista}`}>
          <iframe key={vista} title={`Proyecto: ${p.titulo}`} src={src} sandbox="allow-scripts allow-same-origin allow-modals" />
        </div>
      </div>
    </div>
  );
}
