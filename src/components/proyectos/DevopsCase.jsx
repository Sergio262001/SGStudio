import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PrototypeViewer from "./PrototypeViewer";
import Resumen30 from "./Resumen30";
import Tabs from "./Tabs";

// Caso de estudio DevOps: simulador primero, flujo visual y detalle en pestañas.
export default function DevopsCase({ caso }) {
  const tabs = [
    {
      titulo: "Qué incluye",
      contenido: (
        <div className="ux-decisions">
          {caso.puntos.map(([t, d]) => (
            <div key={t} className="ux-decision">
              <strong>{t}</strong>
              <p>{d}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      titulo: "Tecnologías",
      contenido: (
        <ul className="chip-row chip-row-lg">
          {caso.herramientas.map((h) => (
            <li key={h} className="chip">{h}</li>
          ))}
        </ul>
      ),
    },
    {
      titulo: "Estado",
      contenido: <p className="ux-next">{caso.estado}</p>,
    },
  ];

  return (
    <article className="case" aria-labelledby={`t-${caso.id}`}>
      <header className="case-head">
        <span className="pill">{caso.etiqueta}</span>
        <h1 id={`t-${caso.id}`}>{caso.titulo}</h1>
        <p className="case-sub">{caso.subtitulo}</p>
        <div className="case-actions">
          <Link to={`/ver/${caso.id}`} className="btn btn-primary">
            ▶ Probar el simulador
          </Link>
          <a className="btn btn-outline" href={caso.repo} target="_blank" rel="noopener noreferrer">
            Código ↗
          </a>
        </div>
      </header>

      <Resumen30 items={caso.resumen30} />

      <section className="case-block" aria-labelledby="h-flujo">
        <h2 id="h-flujo" className="case-h2">Así viaja un cambio</h2>
        <motion.ol
          className="flow-line"
          aria-label="Pasos del flujo de entrega"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {caso.pipeline.map(([nombre, detalle], i) => (
            <motion.li key={nombre} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>
              <span className="flow-dot" aria-hidden="true">{i + 1}</span>
              <strong>{nombre}</strong>
              <span>{detalle}</span>
            </motion.li>
          ))}
        </motion.ol>
      </section>

      <section className="case-block" aria-label="Simulador">
        <PrototypeViewer caso={caso} />
      </section>

      <section className="case-block" aria-labelledby="h-detalle">
        <h2 id="h-detalle" className="case-h2">En detalle</h2>
        <Tabs label="Detalle del proyecto" tabs={tabs} />
      </section>
    </article>
  );
}
