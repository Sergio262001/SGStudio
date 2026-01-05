export default function Services() {
  return (
    <section className="section">
      <div className="container">
        <h1>Servicios</h1>
        <p className="section-intro">
          Diseño y desarrollo soluciones web claras, funcionales y bien
          presentadas. Trabajo con marcas personales, negocios y proyectos
          que necesitan una presencia digital moderna y fácil de usar.
        </p>

        <div className="grid-3">
          {/* Servicio 1 */}
          <article className="card glow">
            <h2 className="glow-title">Diseño y desarrollo web</h2>
            <ul className="bullets">
              <li>Landing pages y sitios informativos.</li>
              <li>Webs para marcas personales y negocios.</li>
              <li>Diseño visual enfocado en claridad y experiencia de usuario.</li>
            </ul>
          </article>

          {/* Servicio 2 */}
          <article className="card glow">
            <h2 className="glow-title">Frontend y maquetación responsive</h2>
            <ul className="bullets">
              <li>Maquetación en HTML, CSS y JavaScript.</li>
              <li>Diseño responsive para desktop y mobile.</li>
              <li>Estructura clara y código ordenado.</li>
            </ul>
          </article>

          {/* Servicio 3 */}
          <article className="card glow">
            <h2 className="glow-title">Integraciones básicas y soporte</h2>
            <ul className="bullets">
              <li>Autenticación básica con Firebase.</li>
              <li>Hosting y publicación de sitios web.</li>
              <li>Ajustes, mejoras visuales y soporte inicial.</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
