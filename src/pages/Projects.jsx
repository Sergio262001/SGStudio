import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { CATEGORIAS, PROYECTOS } from "../data/proyectos";

const aparecer = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const cat = CATEGORIAS.some((c) => c.id === params.get("cat")) ? params.get("cat") : "todos";
  const lista = PROYECTOS.filter((p) => cat === "todos" || p.cat === cat);

  const elegir = (id) => setParams(id === "todos" ? {} : { cat: id }, { replace: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Proyectos | SG Studio</title>
        <meta
          name="description"
          content="Prototipos web navegables de UX/UI, sitios web publicados y un proyecto DevOps."
        />
      </Helmet>

      <section className="section">
        <div className="container">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            Proyectos
          </motion.h1>
          <p className="section-intro">
            Prototipos web navegables de UX/UI, sitios publicados y un proyecto de DevOps. Abre cualquiera con
            «Ver proyecto», o lee cómo lo resolví en «Caso de estudio».
          </p>

          <div className="filtros" role="group" aria-label="Filtrar proyectos por tipo">
            {CATEGORIAS.map((c) => (
              <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => elegir(c.id)}>
                {c.label}
              </button>
            ))}
          </div>

          <p className="sr-only" role="status">
            {`${lista.length} proyectos`}
          </p>

          <motion.div
            key={cat}
            className="grid-3 proj-grid"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          >
            {lista.map((p) => (
              <motion.article key={p.titulo} className="card project-card glow" variants={aparecer}>
                <span className={`pill card-pill card-pill-${p.cat}`}>{p.etiqueta}</span>
                <h2>{p.titulo}</h2>

                <div className="project-image">
                  <img src={p.imagen} alt={p.alt} loading="lazy" />
                </div>

                {p.resumen && <p className="project-desc">{p.resumen}</p>}

                <div className="card-buttons">
                  <a href={p.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    {p.urlTexto ?? "Ver proyecto"}
                  </a>
                  {p.caso && (
                    <Link to={`/proyectos/${p.caso}`} className="btn btn-outline">
                      Caso de estudio
                    </Link>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
