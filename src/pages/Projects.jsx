export default function Projects() {
  return (
    <section className="section">
      <div className="container">
        <h1>Proyectos destacados</h1>
        <p className="section-intro">
         Proyectos personales y freelance donde aplico diseño, frontend y buenas prácticas para resolver necesidades reales,
        </p>

        <div className="grid-3">
          {/* Proyecto 1 */}
          <article className="card project-card glow">
            <h2>WEB Hipnosis para sanar</h2>

            <div className="project-image">
              <img
                src={`${import.meta.env.BASE_URL}img/proyectos/PROYECTO1.png`}
                alt="WEB Hipnosis para sanar"
              />
            </div>

            {/* Espacio para link */}
            <a href="https://sergio262001.github.io/HipnosisParaSanar1/index.html" className="btn btn-primary">
              Ver proyecto
            </a>
          </article>
          

          {/* Proyecto 2 */}
          <article className="card project-card glow">
            <h2>E-commerce Great Value</h2>

            <div className="project-image">
              <img
                src={`${import.meta.env.BASE_URL}img/proyectos/PROYECTO2.png`}
                alt="E-commerce minimalista"
              />
            </div>

           <a href="https://sergio262001.github.io/furniture/pages/livingroom/livingroom.html" className="btn btn-primary">
              Ver proyecto
            </a>
          </article>

          {/* Proyecto 3 */}
          <article className="card project-card glow">
            <h2>Blog academico</h2>

            <div className="project-image">
              <img
                src={`${import.meta.env.BASE_URL}img/proyectos/PROYECTO3.png`}
                alt="Landing page de alto rendimiento"
              />
            </div>

            <a href="https://conacedum.com/" className="btn btn-primary">
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

           <a href="https://sergio262001.github.io/SGpacks/" className="btn btn-primary">
              Ver proyecto
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
