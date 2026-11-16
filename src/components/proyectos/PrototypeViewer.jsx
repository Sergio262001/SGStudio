import { useState } from "react";

const BASE = import.meta.env.BASE_URL;

// Visor de prototipo: marco de navegador, vista escritorio/móvil y carga bajo demanda.
// Muestra una captura hasta que la persona pide usar el prototipo (la página carga rápido).
export default function PrototypeViewer({ caso }) {
  const [vista, setVista] = useState("escritorio");
  const [activo, setActivo] = useState(false);
  const src = `${BASE}demos/${caso.demo}/index.html`;

  return (
    <div className="proto">
      <div className="proto-toolbar">
        <div className="proto-seg" role="group" aria-label="Tamaño de pantalla del prototipo">
          {[
            ["escritorio", "Escritorio"],
            ["movil", "Móvil"],
          ].map(([id, label]) => (
            <button key={id} type="button" aria-pressed={vista === id} onClick={() => setVista(id)}>
              {label}
            </button>
          ))}
        </div>
        <a className="proto-link" href={src} target="_blank" rel="noopener noreferrer">
          Abrir en pantalla completa ↗
        </a>
      </div>

      <div className={`proto-device proto-${vista}`}>
        <div className="proto-chrome" aria-hidden="true">
          <span className="proto-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="proto-url">{caso.url}</span>
        </div>

        <div className="proto-screen">
          {activo ? (
            <iframe
              key={vista}
              title={`Prototipo interactivo: ${caso.titulo}`}
              src={src}
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
            <button type="button" className="proto-poster" onClick={() => setActivo(true)}>
              <img
                src={vista === "movil" ? caso.capturas.movil : caso.capturas.escritorio}
                alt={`Vista previa en ${vista === "movil" ? "móvil" : "escritorio"} de ${caso.titulo}`}
                loading="lazy"
              />
              <span className="proto-play">▶ Probar el prototipo</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
