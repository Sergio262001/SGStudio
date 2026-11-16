import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { PERFIL } from "../data/perfil";

const sinProtocolo = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

// Hoja de vida en una columna, con texto real (la leen bien los filtros ATS) y lista para imprimir.
export default function CV() {
  const { links, contacto } = PERFIL;
  const datos = [
    contacto.ciudad,
    contacto.telefono,
    contacto.email,
    sinProtocolo(links.linkedin),
    sinProtocolo(links.github),
    sinProtocolo(links.web),
  ].filter(Boolean);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
      <Helmet>
        <title>CV · Sergio Gil · DevOps Junior | SG Studio</title>
        <meta name="description" content={`Hoja de vida de ${PERFIL.nombre}: ${PERFIL.rol}.`} />
      </Helmet>

      <section className="section section-tight">
        <div className="container cv-wrap">
          <div className="cv-toolbar no-print">
            <h1 className="sr-only">Hoja de vida</h1>
            <button type="button" className="btn btn-primary btn-lg" onClick={() => window.print()}>
              ⬇ Descargar PDF
            </button>
            <Link to="/contacto" className="btn btn-outline btn-lg">Contactar</Link>
            <p className="cv-hint">En el diálogo de impresión elige «Guardar como PDF».</p>
          </div>

          <article className="cv" aria-label={`Hoja de vida de ${PERFIL.nombre}`}>
            <header className="cv-head">
              <h2 className="cv-name">{PERFIL.nombre}</h2>
              <p className="cv-role">{PERFIL.rol}</p>
              <p className="cv-contact">{datos.join("  ·  ")}</p>
            </header>

            <section>
              <h3>Perfil</h3>
              <p>{PERFIL.resumen}</p>
            </section>

            <section>
              <h3>Habilidades</h3>
              <dl className="cv-skills">
                {PERFIL.habilidades.map((h) => (
                  <div key={h.grupo}>
                    <dt>{h.grupo}</dt>
                    <dd>{h.items.join(" · ")}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section>
              <h3>Proyectos</h3>
              <ul className="cv-list">
                {PERFIL.proyectosCv.map((p) => (
                  <li key={p.nombre}>
                    <strong>{p.nombre}.</strong> {p.detalle}
                  </li>
                ))}
              </ul>
              <p className="cv-note">Demos y código: {sinProtocolo(links.web)} · {sinProtocolo(links.repoProyectos)}</p>
            </section>

            <section>
              <h3>Experiencia</h3>
              {PERFIL.experiencia.map((e) => (
                <div key={e.cargo} className="cv-item">
                  <div className="cv-item-head">
                    <strong>{e.cargo}</strong>
                    <span>{e.periodo}</span>
                  </div>
                  <p className="cv-place">{e.lugar}</p>
                  <ul className="cv-list">
                    {e.logros.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <section>
              <h3>Formación</h3>
              {PERFIL.formacion.map((f) => (
                <div key={f.titulo} className="cv-item cv-item-row">
                  <div>
                    <strong>{f.titulo}</strong>
                    <p className="cv-place">{f.lugar}</p>
                  </div>
                  <span>{f.periodo}</span>
                </div>
              ))}
            </section>

            <section>
              <h3>Cursos</h3>
              {PERFIL.cursos.map((c) => (
                <div key={c.titulo} className="cv-item cv-item-row">
                  <div>
                    <strong>{c.titulo}</strong>
                    <p className="cv-place">{c.lugar}</p>
                  </div>
                  <span>{c.periodo}</span>
                </div>
              ))}
            </section>
          </article>
        </div>
      </section>
    </motion.div>
  );
}
