import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function Services() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Servicios | SG Studio</title>
        <meta name="description" content="Nuestros servicios: Landing pages, E-commerce, y maquetación web a medida." />
      </Helmet>
      <section className="section">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            Servicios adaptados a tu negocio
          </motion.h1>
          <motion.p 
            className="section-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Ya sea que necesites una presentación rápida, una tienda online, o un aliado para programar tus diseños, tengo un paquete para ti.
          </motion.p>

          <motion.div 
            className="grid-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.3 }
              }
            }}
          >
            {/* Servicio 1 */}
            <motion.article 
              className="card glow"
              style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <div>
                <h2 className="glow-title">Presencia Digital Estática</h2>
                <p className="muted" style={{ marginBottom: "1rem" }}>Ideal para iniciar</p>
                <ul className="bullets">
                  <li>Landing Pages (Páginas de aterrizaje).</li>
                  <li>Portafolios, menús de restaurantes o catálogos estáticos.</li>
                  <li>Diseño moderno, rápido y adaptado a celulares.</li>
                  <li>SEO básico y optimización de carga.</li>
                </ul>
              </div>
              <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <p style={{ margin: 0, fontWeight: "600", color: "var(--text-main)" }}>Entre $250.000 y $350.000 COP</p>
              </div>
            </motion.article>

            {/* Servicio 2 */}
            <motion.article 
              className="card glow"
              style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <div>
                <h2 className="glow-title">Webs Avanzadas y E-commerce</h2>
                <p className="muted" style={{ marginBottom: "1rem" }}>Potencia tu negocio</p>
                <ul className="bullets">
                  <li>Tiendas online sencillas o E-commerce.</li>
                  <li>Páginas con base de datos (Firebase).</li>
                  <li>Registro y autenticación de usuarios.</li>
                  <li>Panel de administración básico si se requiere.</li>
                </ul>
              </div>
              <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <p style={{ margin: 0, fontWeight: "600", color: "var(--text-main)" }}>De $600.000 a $2.000.000 COP</p>
              </div>
            </motion.article>

            {/* Servicio 3 */}
            <motion.article 
              className="card glow"
              style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <div>
                <h2 className="glow-title">Cotiza tu Proyecto</h2>
                <p className="muted" style={{ marginBottom: "1rem" }}>Ideas y desarrollos a la medida</p>
                <ul className="bullets">
                  <li>Funcionalidades personalizadas o integraciones específicas.</li>
                  <li>Maquetación de diseños propios de Figma a código web.</li>
                  <li>Soporte, rediseños o mantenimiento de tu sitio web actual.</li>
                </ul>
              </div>
              <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <p style={{ margin: 0, fontWeight: "600", color: "var(--text-main)" }}>Cotización a medida</p>
              </div>
            </motion.article>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
