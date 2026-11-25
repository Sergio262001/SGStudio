import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { PROYECTOS } from "../data/proyectos";
import ProjectCard from "../components/proyectos/ProjectCard";

export default function Projects() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
      <Helmet>
        <title>Proyectos | Sergio Gil</title>
        <meta name="description" content="Sitios web y tiendas online publicados por Sergio Gil." />
      </Helmet>

      <section className="section section-tight">
        <div className="container">
          <h1>Proyectos</h1>
          <p className="section-intro">Sitios y tiendas que diseñé y desarrollé. Cada uno se abre en vivo.</p>

          <motion.div
            className="grid-3 proj-grid"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {PROYECTOS.map((p) => (
              <ProjectCard key={p.titulo} p={p} />
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
