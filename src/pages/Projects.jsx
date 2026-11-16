import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { CATEGORIAS, PROYECTOS } from "../data/proyectos";
import ProjectCard from "../components/proyectos/ProjectCard";

export default function Projects() {
  const [params, setParams] = useSearchParams();
  const cat = CATEGORIAS.some((c) => c.id === params.get("cat")) ? params.get("cat") : "todos";
  const lista = PROYECTOS.filter((p) => cat === "todos" || p.cat === cat);
  const elegir = (id) => setParams(id === "todos" ? {} : { cat: id }, { replace: true });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
      <Helmet>
        <title>Proyectos | SG Studio</title>
        <meta name="description" content="Proyectos de DevOps, prototipos navegables de UX/UI y sitios web publicados." />
      </Helmet>

      <section className="section section-tight">
        <div className="container">
          <h1>Proyectos</h1>
          <p className="section-intro">Ábrelos aquí mismo. Cada uno tiene su caso de estudio.</p>

          <div className="filtros" role="group" aria-label="Filtrar proyectos por tipo">
            {CATEGORIAS.map((c) => (
              <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => elegir(c.id)}>
                {c.label}
                <span className="filtro-n">{c.id === "todos" ? PROYECTOS.length : PROYECTOS.filter((p) => p.cat === c.id).length}</span>
              </button>
            ))}
          </div>
          <p className="sr-only" role="status">{`${lista.length} proyectos`}</p>

          <motion.div
            key={cat}
            className="grid-3 proj-grid"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {lista.map((p) => (
              <ProjectCard key={p.titulo} p={p} />
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
