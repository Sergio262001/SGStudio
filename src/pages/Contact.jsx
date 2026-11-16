import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { PERFIL } from "../data/perfil";

const subir = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

export default function Contact() {
  const { links, contacto } = PERFIL;
  const canales = [
    contacto.email && { titulo: "Correo", texto: contacto.email, href: `mailto:${contacto.email}`, externo: false, principal: true },
    { titulo: "LinkedIn", texto: "Escríbeme o revisa mi perfil", href: links.linkedin, externo: true, principal: !contacto.email },
    { titulo: "GitHub", texto: "Código de todos mis proyectos", href: links.github, externo: true },
    contacto.telefono && { titulo: "WhatsApp", texto: contacto.telefono, href: `https://wa.me/57${contacto.telefono.replace(/\D/g, "")}`, externo: true },
  ].filter(Boolean);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
      <Helmet>
        <title>Contacto | SG Studio</title>
        <meta name="description" content="Contacto para oportunidades como DevOps Junior o proyectos web." />
      </Helmet>

      <section className="section section-tight">
        <div className="container">
          <h1>Hablemos</h1>
          <p className="section-intro">Para oportunidades como DevOps Junior o proyectos web. Respondo rápido.</p>

          <motion.div className="contact-cards" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
            {canales.map((c) => (
              <motion.a
                key={c.titulo}
                href={c.href}
                className={`card contact-card glow ${c.principal ? "contact-main" : ""}`}
                target={c.externo ? "_blank" : undefined}
                rel={c.externo ? "noopener noreferrer" : undefined}
                variants={subir}
              >
                <strong>{c.titulo} {c.externo && <span aria-hidden="true">↗</span>}</strong>
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

          <div className="cta-band cta-small">
            <h2>¿Necesitas una web para tu negocio?</h2>
            <p>Landing pages, menús digitales con QR y tiendas online.</p>
            <div className="hero-actions">
              <Link to="/servicios" className="btn btn-outline btn-lg">Ver servicios y precios</Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
