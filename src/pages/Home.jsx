import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="section hero">
      <div className="container hero-grid">
        <div className="hero-text">
          <p className="pill">Disponible para proyectos web · Freelance</p>
          <h1>
            Diseño y desarrollo sitios web{" "}
            <span className="accent">modernos, enfocados en experiencia y funcionalidad.</span>
          </h1>
          <p className="hero-subtitle">
           Soy Desarrollador Frontend Jr con formación en diseño gráfico. 
           Creo páginas web para negocios y marcas personales usando HTML, 
           CSS y JavaScript, apoyándome en Figma y la Suite Adobe para lograr 
           interfaces cuidadas. Actualmente sigo aprendiendo React y uso IA 
           como apoyo para mejorar mi código y acelerar el aprendizaje.
          </p>

          <div className="hero-actions">
            <Link to="/proyectos" className="btn btn-primary">
              Ver proyectos
            </Link>
            <Link to="/contacto" className="btn btn-outline">
              Hablemos de tu web
            </Link>
          </div>

          <ul className="hero-highlights">
            <li>Diseño UI/UX + desarrollo frontend</li>
            <li>Webs para negocios y marcas personales</li>
            <li>IA como apoyo para código</li>
          </ul>
        </div>

        <div className="hero-panel">
          <div className="hero-card glow-card glow">
            <h2 className="glow-title">Stack actual</h2>
            <ul>
              <li>HTML · CSS · JavaScript</li>
              <li>React (en aprendizaje) · Vite</li>
              <li>Firebase (Auth · Hosting)</li>
              <li>Git · GitHub</li>
              <li>MongoDB</li>
              <li>Figma</li>
            </ul>
          </div>

          <div className="hero-card hero-card-secondary glow-card glow">
            <h3 className="glow-title">¿Qué puedo hacer por tu proyecto?</h3>
            <p>
              Diseño y desarrollo páginas web para marcas y negocios: landing pages, sitios informativos 
              y catálogos sencillos. Me enfoco en un diseño claro, estructura responsive y una experiencia 
              de usuario cuidada. Si el proyecto lo requiere, puedo integrar autenticación o funciones básicas 
              con Firebase.
            </p>
          

          </div>
        </div>
      </div>
    </section>
  );
}
