import { motion } from "framer-motion";

const aparecer = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

// Tarjeta de proyecto: abre el sitio publicado en otra pestaña (el ícono ↗ lo avisa).
export default function ProjectCard({ p, as = "h2" }) {
  const Titulo = as;

  return (
    <motion.article className={`card project-card glow project-${p.cat}`} variants={aparecer}>
      <span className={`pill card-pill card-pill-${p.cat}`}>{p.etiqueta}</span>
      <Titulo className="project-title">{p.titulo}</Titulo>

      <a href={p.url} className="project-image-link" target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
        <div className="project-image">
          <img src={p.imagen} alt="" loading="lazy" />
        </div>
      </a>

      {p.resumen && <p className="project-desc">{p.resumen}</p>}

      {p.destacados && (
        <motion.ul
          className="lo-mejor"
          aria-label="Lo mejor del proyecto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
        >
          {p.destacados.map((d) => (
            <motion.li key={d} variants={{ hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1 } }}>
              {d}
            </motion.li>
          ))}
        </motion.ul>
      )}

      <div className="card-buttons">
        <a href={p.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer" aria-label={`Ver ${p.titulo} (se abre en otra pestaña)`}>
          {p.urlTexto ?? "Ver sitio"} ↗
        </a>
      </div>
    </motion.article>
  );
}
