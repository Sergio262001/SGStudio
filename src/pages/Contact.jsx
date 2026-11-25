import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Escribeme, CopiarCorreo, correo } from "../components/Correo";
import { PERFIL } from "../data/perfil";

const subir = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

export default function Contact() {
  const { links } = PERFIL;
  const otros = [
    { titulo: "LinkedIn", texto: "Mi perfil profesional", href: links.linkedin, externo: true },
    { titulo: "GitHub", texto: "El código de mis proyectos", href: links.github, externo: true },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
      <Helmet>
        <title>Contacto | Sergio Gil</title>
        <meta name="description" content="Contacto para oportunidades laborales como DevOps Junior." />
      </Helmet>

      <section className="section section-tight">
        <div className="container">
          <h1>Hablemos</h1>
          <p className="section-intro">Escríbeme por correo o LinkedIn y te respondo pronto.</p>

          <motion.div className="contact-cards" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
            {/* Canal principal: correo en un clic */}
            <motion.div className="card contact-card contact-main glow" variants={subir}>
              <strong>Correo</strong>
              <span className="contact-email">{correo()}</span>
              <div className="contact-actions">
                <Escribeme className="btn btn-primary btn-lg" />
                <CopiarCorreo />
              </div>
            </motion.div>

            {otros.map((c) => (
              <motion.a
                key={c.titulo}
                href={c.href}
                className="card contact-card glow"
                target="_blank"
                rel="noopener noreferrer"
                variants={subir}
              >
                <strong>{c.titulo} <span aria-hidden="true">↗</span></strong>
                <span>{c.texto}</span>
              </motion.a>
            ))}

            <motion.div variants={subir}>
              <Link to="/cv" className="card contact-card glow">
                <strong>Mi CV</strong>
                <span>Verlo o descargarlo en PDF</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
