import { useMemo, useState } from "react";

export default function About() {
  const certificates = useMemo(
    () => [
      {
        title: "Diseño UX/UI Avanzado",
        org: "Coderhouse",
        status: "Finalizado",
        desc: "Diseño de interfaces, UX, jerarquía visual y buenas prácticas.",
        image: "/img/certificado/certificado-ux.png",
      },
      {
        title: "Tendencias de marketing digital con certificaciones",
        org: "Fundación Universitaria Los Libertadores",
        status: "Finalizado",
        desc: "Seminario enfocado en tendencias y herramientas de marketing digital.",
        image: "/img/certificado/certificado-uni1.png",
      },
      {
        title: "Spin-Off y Proyectos Creativos de Base Tecnológica",
        org: "Fundación Universitaria Los Libertadores",
        status: "Finalizado",
        desc: "Seminario de innovación, emprendimiento y proyectos tecnológicos.",
        image: "/img/certificado/certificado-uni2.png",
      },
      {
        title: "JavaScript",
        org: "Coderhouse",
        status: "Cursando",
        desc: "Fundamentos, lógica, DOM y bases para proyectos frontend.",
        image: "/img/certificado/certificado-js.webp",
      },
      {
        title: "React",
        org: "Coderhouse",
        status: "Cursando",
        desc: "Componentes, props, state y estructura de proyectos modernos.",
        image: "/img/certificado/certificado-react.png",
      },
    ],
    []
  );

  const [openCert, setOpenCert] = useState(null);

  return (
    <section className="section">
      <div className="container">
        {/* TOP GRID: texto + foto */}
        <div className="about-grid">
          <div>
            <h1>Sobre mí</h1>

            <p>
              Soy <strong>Desarrollador Frontend Jr</strong> con formación en{" "}
              <strong>diseño gráfico</strong> y conocimientos en <strong>UX/UI</strong>.
              Me interesa especialmente el punto donde el diseño se convierte en algo
              funcional: cuando una idea visual pasa a ser una interfaz real que las
              personas pueden usar.
            </p>

            <p>
              Trabajo principalmente con <strong>HTML, CSS y JavaScript</strong>,
              creando páginas web claras, responsivas y bien estructuradas.
              Actualmente continúo aprendiendo <strong>React</strong>, aplicándolo
              en proyectos personales para fortalecer mis bases como frontend.
            </p>

            <p>
              Mi background en diseño me permite cuidar el detalle visual, la jerarquía,
              la tipografía y la experiencia de usuario, mientras sigo creciendo en el área técnica.
            </p>

            <h2 className="subheading">Cómo trabajo y cómo aprendo</h2>
            <ul className="bullets">
              <li>Diseño visual aplicado al desarrollo frontend.</li>
              <li>Maquetación responsive y estructura clara.</li>
              <li>Aprendizaje constante a través de proyectos reales.</li>
            </ul>
          </div>

          {/* FOTO */}
          <div className="about-photo card1 glow">
            <img
              src="/img/Sergio-Gil-fotoperfil.png"
              alt="Foto de perfil de Sergio Gil"
              loading="lazy"
            />
          </div>
        </div>

        {/* BOTTOM GRID: stack + ayuda */}
        <div className="about-bottom ">
          <div className="card glow">
            <h3>Stack actual</h3>
            <ul className="bullets">
              <li>HTML · CSS · JavaScript</li>
              <li>React (en aprendizaje) · Vite</li>
              <li>Firebase (Auth · Hosting)</li>
              <li>Git · GitHub</li>
              <li>Figma · Adobe Suite</li>
              <li>MongoDB (básico)</li>
            </ul>
          </div>

          <div className="card glow">
            <h3>En qué puedo ayudarte</h3>
            <ul className="bullets">
              <li>Landing pages y sitios informativos.</li>
              <li>Webs para marcas personales y negocios.</li>
              <li>Maquetación responsive y mejora visual.</li>
              <li>Integraciones básicas con Firebase.</li>
            </ul>
          </div>
        </div>

        {/* CERTIFICADOS */}
        <div className="certs-section">
          <h2>Certificados</h2>
          <p className="section-intro">
            Una selección de cursos y seminarios. (Click para ver el certificado.)
          </p>

          <div className="certs-grid">
            {certificates.map((cert) => (
              <button
                key={cert.title}
                type="button"
                className="cert-card glow"
                onClick={() => setOpenCert(cert)}
              >
                <div className="cert-thumb">
                  <img src={cert.image} alt={`Certificado: ${cert.title}`} loading="lazy" />
                </div>

                <div className="cert-body">
                  <h3>{cert.title}</h3>
                  <p className="cert-org">
                    {cert.org} · <span className="cert-status">{cert.status}</span>
                  </p>
                  <p className="cert-desc">{cert.desc}</p>
                  <span className="cert-cta">Ver certificado →</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* MODAL */}
        {openCert && (
          <div className="modal-overlay" onClick={() => setOpenCert(null)}>
            <div
              className="modal"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className="modal-header">
                <div>
                  <h3 className="modal-title">{openCert.title}</h3>
                  <p className="modal-sub">
                    {openCert.org} · {openCert.status}
                  </p>
                </div>

                <button
                  className="modal-close"
                  type="button"
                  onClick={() => setOpenCert(null)}
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>

              <div className="modal-content">
                <img
                  className="modal-image"
                  src={openCert.image}
                  alt={`Certificado: ${openCert.title}`}
                />
                <p className="modal-desc">{openCert.desc}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
