import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { CASOS } from "../data/casos";

const BASE = import.meta.env.BASE_URL;

function Demo({ caso }) {
  const [abierta, setAbierta] = useState(false);
  const src = `${BASE}demos/${caso.demo}/index.html`;
  const panelId = `demo-${caso.id}`;

  return (
    <>
      <div className="caso-actions">
        <button
          type="button"
          className="btn btn-primary"
          aria-expanded={abierta}
          aria-controls={panelId}
          onClick={() => setAbierta((v) => !v)}
        >
          {abierta ? "Cerrar demo" : "Probar la demo aquí"}
        </button>
        <a className="btn btn-outline" href={src} target="_blank" rel="noopener noreferrer">
          Abrir en pestaña nueva
        </a>
        <a className="btn btn-outline" href={caso.repo} target="_blank" rel="noopener noreferrer">
          Ver código
        </a>
      </div>

      {abierta && (
        <div className="demo-frame" id={panelId}>
          <iframe
            title={`Demo interactiva: ${caso.titulo}`}
            src={src}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      )}
    </>
  );
}

function Pipeline({ pasos }) {
  return (
    <ol className="pipeline" aria-label="Pasos del flujo de entrega">
      {pasos.map(([nombre, detalle]) => (
        <li key={nombre}>
          <strong>{nombre}</strong>
          <span>{detalle}</span>
        </li>
      ))}
    </ol>
  );
}

export default function Casos() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Casos de estudio | SG Studio</title>
        <meta
          name="description"
          content="Prototipos interactivos de UX/UI y un proyecto DevOps de entrega continua, con demos que funcionan en esta misma página."
        />
      </Helmet>

      <section className="section">
        <div className="container">
          <h1>Casos de estudio</h1>
          <p className="section-intro">
            Dos prototipos de UX/UI que puedes probar aquí mismo y un proyecto de DevOps. Cada uno parte de un
            problema concreto y tiene su código abierto.
          </p>

          <div className="casos">
            {CASOS.map((caso) => (
              <article key={caso.id} className="card caso" aria-labelledby={`t-${caso.id}`}>
                <span className="pill">{caso.tipo}</span>
                <h2 id={`t-${caso.id}`}>{caso.titulo}</h2>

                <div className="caso-cols">
                  <div>
                    <h3>El problema</h3>
                    <p className="muted">{caso.problema}</p>
                    <h3>La solución</h3>
                    <p className="muted">{caso.solucion}</p>
                    {caso.etiquetas && (
                      <ul className="project-meta" aria-label="Tecnologías">
                        {caso.etiquetas.map((e) => (
                          <li key={e} className="pill">{e}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div>
                    <h3>Qué incluye</h3>
                    <ul className="bullets">
                      {caso.puntos.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {caso.pipeline && <Pipeline pasos={caso.pipeline} />}
                {caso.estado && <p className="caso-estado">{caso.estado}</p>}

                {caso.demo ? (
                  <Demo caso={caso} />
                ) : (
                  <div className="caso-actions">
                    <a className="btn btn-primary" href={caso.repo} target="_blank" rel="noopener noreferrer">
                      Ver código en GitHub
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
