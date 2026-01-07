export default function Projects() {
  return (
    <section className="section">
      <div className="container">
        <h1>Proyectos destacados</h1>
        <p className="section-intro">
          Una selección de proyectos que combinan frontend, backend y
          despliegues en la nube.
        </p>

        <div className="grid-3">
          {/* Proyecto 1 */}
          <article className="card project-card glow">
            <h2>Panel de monitoreo en AWS</h2>

            <div className="project-image">
              <img
                src={`${import.meta.env.BASE_URL}img/proyectos/PROYECTO1.png`}
                alt="Panel de monitoreo en AWS"
              />
            </div>

            {/* Espacio para link */}
            <a href="#" className="project-link">
              Ver proyecto
            </a>
          </article>

          {/* Proyecto 2 */}
          <article className="card project-card glow">
            <h2>E-commerce minimalista</h2>

            <div className="project-image">
              <img
                src={`${import.meta.env.BASE_URL}img/proyectos/PROYECTO2.png`}
                alt="E-commerce minimalista"
              />
            </div>

            <a href="#" className="project-link">
              Ver proyecto
            </a>
          </article>

          {/* Proyecto 3 */}
          <article className="card project-card glow">
            <h2>Landing page de alto rendimiento</h2>

            <div className="project-image">
              <img
                src={`${import.meta.env.BASE_URL}img/proyectos/PROYECTO3.png`}
                alt="Landing page de alto rendimiento"
              />
            </div>

            <a href="#" className="project-link">
              Ver proyecto
            </a>
          </article>

          {/* Proyecto 4 */}
          <article className="card project-card glow">
            <h2>Proyecto experimental</h2>

            <div className="project-image">
              <img
                src={`${import.meta.env.BASE_URL}img/proyectos/PROYECTO4.png`}
                alt="Proyecto experimental"
              />
            </div>

            <a href="#" className="project-link">
              Ver proyecto
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
