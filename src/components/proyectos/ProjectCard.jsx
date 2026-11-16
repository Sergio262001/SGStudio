import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const aparecer = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

// Tarjeta de proyecto. Los proyectos propios se abren DENTRO del portafolio (visor);
// los sitios de clientes se abren aparte, y el ícono ↗ lo avisa.
export default function ProjectCard({ p, as = "h2" }) {
  const Titulo = as;
  const imagen = (
    <div className="project-image">
      <img src={p.imagen} alt="" loading="lazy" />
      {p.ver && <span className="project-play" aria-hidden="true">▶</span>}
    </div>
  );

  return (
    <motion.article className={`card project-card glow project-${p.cat}`} variants={aparecer}>
      <span className={`pill card-pill card-pill-${p.cat}`}>{p.etiqueta}</span>
      <Titulo className="project-title">{p.titulo}</Titulo>

      {p.ver ? (
        <Link to={p.ver} className="project-image-link" tabIndex={-1} aria-hidden="true">
          {imagen}
        </Link>
      ) : (
        <a href={p.url} className="project-image-link" target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
          {imagen}
        </a>
      )}

      {p.resumen && <p className="project-desc">{p.resumen}</p>}

      <div className="card-buttons">
        {p.ver ? (
          <Link to={p.ver} className="btn btn-primary">
            Ver proyecto
          </Link>
        ) : (
          <a href={p.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer" aria-label={`Ver ${p.titulo} (se abre en otra pestaña)`}>
            Ver sitio ↗
          </a>
        )}
        {p.caso && (
          <Link to={`/proyectos/${p.caso}`} className="btn btn-outline">
            Caso de estudio
          </Link>
        )}
      </div>
    </motion.article>
  );
}
