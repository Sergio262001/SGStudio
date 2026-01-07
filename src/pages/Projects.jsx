export default function Projects() {
  return (
    <section className="section">
      <div className="container">
        <h1>Proyectos destacados</h1>
        <p className="section-intro">
          Una selección de proyectos que combinan frontend, backend y
          despliegues en la nube. La idea es mostrar cómo resuelvo problemas
          reales con soluciones técnicas claras.
        </p>

        <div className="grid-3">
          <article className="card project-card glow">
            <h2>Panel de monitoreo en AWS</h2>

            <div className="project-image">
            <img
              src={`${import.meta.env.BASE_URL}img/proyectos/PROYECTO1.png`}
            />
          </div>
        </div>

            <p>
              Dashboard para visualizar métricas de infraestructura y costos,
              integrando servicios de AWS y visualizaciones personalizadas.
            </p>
            <ul className="project-meta">
              <li>React · Vite</li>
              <li>AWS Lambda · API Gateway</li>
              <li>CloudWatch · S3</li>
            </ul>
          </article>

          <article className="card project-card glow">
            <h2>E‑commerce minimalista</h2>
            <p>
              Frontend rápido con React y backend en Node.js, manejo de
              autenticación, carrito, pasarela de pagos y panel de administración.
            </p>
            <ul className="project-meta">
              <li>React · React Router</li>
              <li>Node.js · Express</li>
              <li>PostgreSQL · Stripe</li>
            </ul>
          </article>

          <article className="card project-card glow">
            <h2>Landing page de alto rendimiento</h2>
            <p>
              Página optimizada para conversión, animaciones suaves y puntuación
              alta en Lighthouse (performance, accesibilidad y SEO).
            </p>
            <ul className="project-meta">
              <li>Vite · React</li>
              <li>CSS moderno</li>
              <li>Optimización de assets</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
