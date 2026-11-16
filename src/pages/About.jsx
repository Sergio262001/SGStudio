import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { PERFIL } from "../data/perfil";

const IMG = `${import.meta.env.BASE_URL}img/certificado/`;
const CERTIFICADOS = [
  { title: "Diseño UX/UI Avanzado", org: "Coderhouse", status: "Finalizado", image: `${IMG}certificado-ux.png` },
  { title: "JavaScript", org: "Coderhouse", status: "Cursando", image: `${IMG}certificado-js.webp` },
  { title: "React", org: "Coderhouse", status: "Cursando", image: `${IMG}certificado-react.png` },
  { title: "Tendencias de marketing digital", org: "Los Libertadores", status: "Finalizado", image: `${IMG}certificado-uni1.PNG` },
  { title: "Spin-Off y proyectos de base tecnológica", org: "Los Libertadores", status: "Finalizado", image: `${IMG}certificado-uni2.PNG` },
];

const subir = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

function ModalCertificado({ cert, onClose }) {
  const cerrar = useRef(null);
  useEffect(() => {
    const previo = document.activeElement;
    cerrar.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previo?.focus?.(); // devolver el foco a la tarjeta que abrió el modal
    };
  }, [onClose]);

  return (
    <motion.div className="modal-overlay" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
      >
        <div className="modal-header">
          <div>
            <h2 className="modal-title" id="modal-title">{cert.title}</h2>
            <p className="modal-sub">{cert.org} · {cert.status}</p>
          </div>
          <button ref={cerrar} className="modal-close" type="button" onClick={onClose} aria-label="Cerrar (Esc)">✕</button>
        </div>
        <div className="modal-content">
          <img className="modal-image" src={cert.image} alt={`Certificado: ${cert.title}`} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const [abierto, setAbierto] = useState(null);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
      <Helmet>
        <title>Sobre mí | SG Studio</title>
        <meta name="description" content={PERFIL.resumen} />
      </Helmet>

      <section className="section section-tight">
        <div className="container">
          <h1>Sobre mí</h1>
          <p className="section-intro about-lead">{PERFIL.resumen}</p>

          {/* Recorrido */}
          <h2 className="section-title">Mi camino</h2>
          <motion.ol className="timeline" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
            {PERFIL.camino.map((c, i) => (
              <motion.li key={c.etapa} className={i === PERFIL.camino.length - 1 ? "timeline-now" : ""} variants={subir}>
                <span className="timeline-year">{c.anio}</span>
                <strong>{c.etapa}</strong>
                <span>{c.texto}</span>
              </motion.li>
            ))}
          </motion.ol>

          {/* Habilidades */}
          <h2 className="section-title">Habilidades</h2>
          <div className="skills-grid">
            {PERFIL.habilidades.map((h) => (
              <div key={h.grupo} className="card skill-group">
                <h3>{h.grupo}</h3>
                <ul className="chip-row">
                  {h.items.map((i) => (
                    <li key={i} className="chip">{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Certificados */}
          <h2 className="section-title">Certificados</h2>
          <div className="certs-grid">
            {CERTIFICADOS.map((cert) => (
              <button key={cert.title} type="button" className="cert-card glow" onClick={() => setAbierto(cert)}>
                <div className="cert-thumb">
                  <img src={cert.image} alt="" loading="lazy" />
                </div>
                <div className="cert-body">
                  <h3>{cert.title}</h3>
                  <p className="cert-org">{cert.org} · <span className="cert-status">{cert.status}</span></p>
                  <span className="cert-cta">Ver certificado →</span>
                </div>
              </button>
            ))}
          </div>

          <div className="cta-band cta-small">
            <h2>¿Quieres el detalle?</h2>
            <div className="hero-actions">
              <Link to="/cv" className="btn btn-primary btn-lg">Ver mi CV</Link>
              <Link to="/proyectos" className="btn btn-outline btn-lg">Ver proyectos</Link>
            </div>
          </div>

          <AnimatePresence>{abierto && <ModalCertificado cert={abierto} onClose={() => setAbierto(null)} />}</AnimatePresence>
        </div>
      </section>
    </motion.div>
  );
}
