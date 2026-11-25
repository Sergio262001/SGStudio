import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Terminal from "../components/Terminal";
import ProjectCard from "../components/proyectos/ProjectCard";
import { Escribeme } from "../components/Correo";
import { PERFIL } from "../data/perfil";
import { DESTACADOS_INICIO } from "../data/proyectos";

const AREAS = [
  {
    icono: "∞",
    titulo: "DevOps",
    texto: "Pipelines que prueban, aseguran y despliegan solos.",
    chips: ["Docker", "GitHub Actions", "AWS", "Terraform"],
  },
  {
    icono: "</>",
    titulo: "Desarrollo web",
    texto: "Sitios rápidos y responsivos, publicados con Git.",
    chips: ["JavaScript", "React", "Firebase", "Supabase"],
  },
  {
    icono: "◐",
    titulo: "UX/UI",
    texto: "Interfaces claras, accesibles y probadas.",
    chips: ["Figma", "Prototipos", "WCAG"],
  },
];

const subir = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } };

export default function Home() {
  const destacados = DESTACADOS_INICIO;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <Helmet>
        <title>Sergio Gil · DevOps Junior y desarrollador web</title>
        <meta name="description" content={`${PERFIL.rol}. ${PERFIL.frase}`} />
      </Helmet>

      {/* ---------- Hero ---------- */}
      <section className="section hero">
        <div className="container hero-grid">
          <motion.div className="hero-text" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.p className="pill" variants={subir}>
              DevOps Junior · Bogotá, Colombia
            </motion.p>
            <motion.h1 variants={subir}>
              Hola, soy Sergio.
              <br />
              <span className="accent">DevOps Junior</span> y desarrollador web.
            </motion.h1>
            <motion.p className="hero-subtitle" variants={subir}>
              {PERFIL.frase} Vengo del diseño: cuido cómo se ve y cómo funciona.
            </motion.p>
            <motion.dl className="hero-facts" variants={subir}>
              <div>
                <dt>Experiencia</dt>
                <dd>{PERFIL.actual.cargo} · {PERFIL.actual.lugar}</dd>
              </div>
              <div>
                <dt>Ubicación</dt>
                <dd>{PERFIL.ubicacion}</dd>
              </div>
            </motion.dl>
            <motion.div className="hero-actions" variants={subir}>
              <Link to="/proyectos" className="btn btn-primary btn-lg">
                Ver proyectos
              </Link>
              <Escribeme />
              <Link to="/cv" className="btn btn-outline btn-lg">
                Ver mi CV
              </Link>
            </motion.div>
            <motion.p className="hero-links" variants={subir}>
              <a href={PERFIL.links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a href={PERFIL.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </motion.p>
          </motion.div>

          <motion.div className="hero-panel" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.5 }}>
            <Terminal />
          </motion.div>
        </div>
      </section>

      {/* ---------- Lo que hago ---------- */}
      <section className="section section-tight" aria-labelledby="h-hago">
        <div className="container">
          <h2 id="h-hago" className="section-title">Lo que hago</h2>
          <motion.div className="grid-3" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            {AREAS.map((a) => (
              <motion.article key={a.titulo} className="card area-card glow" variants={subir}>
                <span className="area-ico" aria-hidden="true">{a.icono}</span>
                <h3>{a.titulo}</h3>
                <p>{a.texto}</p>
                <ul className="chip-row" aria-label={`Herramientas de ${a.titulo}`}>
                  {a.chips.map((c) => (
                    <li key={c} className="chip">{c}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- Proyectos destacados ---------- */}
      <section className="section section-tight" aria-labelledby="h-dest">
        <div className="container">
          <div className="section-head">
            <h2 id="h-dest" className="section-title">Proyectos destacados</h2>
            <Link to="/proyectos" className="link-arrow">Ver todos →</Link>
          </div>
          <motion.div className="grid-3" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            {destacados.map((p) => (
              <ProjectCard key={p.titulo} p={p} as="h3" />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- Llamado a la acción ---------- */}
      <section className="section section-tight">
        <div className="container">
          <motion.div className="cta-band" initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
            <h2>¿Hablamos?</h2>
            <p>Automatizo con cuidado por el detalle y por quien usa el producto.</p>
            <div className="hero-actions">
              <Escribeme className="btn btn-primary btn-lg" />
              <Link to="/cv" className="btn btn-outline btn-lg">Ver mi CV</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
