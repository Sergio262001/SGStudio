import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { CATEGORIAS, UX, WEB, DEVOPS } from "../data/proyectos";
import UxCase from "../components/proyectos/UxCase";

const aparecer = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function SeccionTitulo({ id, titulo, texto }) {
  return (
    <div className="proj-section-head">
      <h2 id={id}>{titulo}</h2>
      {texto && <p className="muted">{texto}</p>}
    </div>
  );
}

function DevopsCase() {
  return (
    <article className="card ux-case" aria-labelledby="t-devops">
      <header className="ux-head">
        <span className="pill">DevOps · 01</span>
        <h3 id="t-devops">{DEVOPS.titulo}</h3>
        <p className="ux-sub">{DEVOPS.subtitulo}</p>
      </header>

      <div className="ux-split">
        <div className="ux-box">
          <h4>El reto</h4>
          <p>{DEVOPS.reto}</p>
        </div>
        <div className="ux-box ux-box-accent">
          <h4>La solución</h4>
          <p>{DEVOPS.solucion}</p>
        </div>
      </div>

      <h4 className="ux-process-title">Así viaja un cambio hasta producción</h4>
      <ol className="pipeline" aria-label="Pasos del flujo de entrega">
        {DEVOPS.pipeline.map(([nombre, detalle]) => (
          <li key={nombre}>
            <strong>{nombre}</strong>
            <span>{detalle}</span>
          </li>
        ))}
      </ol>

      <h4 className="ux-process-title">Qué incluye</h4>
      <ul className="bullets">
        {DEVOPS.puntos.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <ul className="tag-list" aria-label="Tecnologías">
        {DEVOPS.herramientas.map((h) => (
          <li key={h} className="pill">{h}</li>
        ))}
      </ul>

      <p className="ux-next">{DEVOPS.estado}</p>

      <div className="ux-actions">
        <a className="btn btn-primary" href={DEVOPS.repo} target="_blank" rel="noopener noreferrer">
          Ver código en GitHub
        </a>
      </div>
    </article>
  );
}

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const cat = CATEGORIAS.some((c) => c.id === params.get("cat")) ? params.get("cat") : "todos";
  const ver = (id) => cat === "todos" || cat === id;

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
          content="Soluciones de UX/UI con prototipos web que puedes probar, sitios web publicados y un proyecto DevOps."
        />
      </Helmet>

      <section className="section">
        <div className="container">
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            Proyectos
          </motion.h1>
          <p className="section-intro">
            Soluciones de UX/UI con prototipos web que puedes probar aquí mismo, sitios web publicados y un proyecto
            de DevOps. Cada uno parte de un problema real.
          </p>

          <div className="filtros" role="group" aria-label="Filtrar proyectos por tipo">
            {CATEGORIAS.map((c) => (
              <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => elegir(c.id)}>
                {c.label}
              </button>
            ))}
          </div>

          {ver("ux") && (
            <section className="proj-section" aria-labelledby="sec-ux">
              <SeccionTitulo
                id="sec-ux"
                titulo="UX/UI · Soluciones con prototipo"
                texto="Del problema al prototipo navegable. Pulsa «Probar el prototipo» para usarlo en escritorio o en móvil."
              />
              <div className="ux-list">
                {UX.map((caso, i) => (
                  <UxCase key={caso.id} caso={caso} numero={i + 1} />
                ))}
              </div>
            </section>
          )}

          {ver("web") && (
            <section className="proj-section" aria-labelledby="sec-web">
              <SeccionTitulo
                id="sec-web"
                titulo="Desarrollo web"
                texto="Sitios personales y freelance publicados, donde aplico diseño, frontend y buenas prácticas."
              />
              <motion.div
                className="grid-3"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              >
                {WEB.map((p) => (
                  <motion.article key={p.titulo} className="card project-card glow" variants={aparecer}>
                    <h3 className="web-title">{p.titulo}</h3>
                    <div className="project-image">
                      <img src={p.imagen} alt={p.alt} loading="lazy" />
                    </div>
                    <a href={p.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                      Ver proyecto
                    </a>
                  </motion.article>
                ))}
              </motion.div>
            </section>
          )}

          {ver("devops") && (
            <section className="proj-section" aria-labelledby="sec-devops">
              <SeccionTitulo
                id="sec-devops"
                titulo="DevOps"
                texto="Automatización de pruebas, seguridad y despliegue."
              />
              <DevopsCase />
            </section>
          )}
        </div>
      </section>
    </motion.div>
  );
}
