import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

export default function Projects() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>Proyectos | SG Studio</title>
        <meta name="description" content="Explora los proyectos de desarrollo web moderno creados por SG Studio." />
      </Helmet>
      <section className="section">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            Proyectos destacados
          </motion.h1>
          <motion.p 
            className="section-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
           Proyectos personales y freelance donde aplico diseño, frontend y buenas prácticas para resolver necesidades reales.
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
            {/* Proyecto 1 */}
            <motion.article 
              className="card project-card glow"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <h2>WEB Hipnosis para sanar</h2>

              <div className="project-image">
                <img
                  src={`${import.meta.env.BASE_URL}img/proyectos/PROYECTO1.png`}
                  alt="WEB Hipnosis para sanar"
                  style={{ width: '100%', borderRadius: '12px', marginBottom: '16px' }}
                />
              </div>

              {/* Espacio para link */}
              <a href="https://sergio262001.github.io/HipnosisParaSanar1/index.html" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Ver proyecto
              </a>
            </motion.article>
            

            {/* Proyecto 2 */}
            <motion.article 
              className="card project-card glow"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <h2>E-commerce Great Value</h2>

              <div className="project-image">
                <img
                  src={`${import.meta.env.BASE_URL}img/proyectos/PROYECTO2.png`}
                  alt="E-commerce minimalista"
                  style={{ width: '100%', borderRadius: '12px', marginBottom: '16px' }}
                />
              </div>

             <a href="https://sergio262001.github.io/furniture/pages/livingroom/livingroom.html" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Ver proyecto
              </a>
            </motion.article>

            {/* Proyecto 3 */}
            <motion.article 
              className="card project-card glow"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <h2>Blog academico</h2>

              <div className="project-image">
                <img
                  src={`${import.meta.env.BASE_URL}img/proyectos/PROYECTO3.png`}
                  alt="Landing page de alto rendimiento"
                  style={{ width: '100%', borderRadius: '12px', marginBottom: '16px' }}
                />
              </div>

              <a href="https://conacedum.com/" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Ver proyecto
              </a>
            </motion.article>

            {/* Proyecto 4 */}
            <motion.article 
              className="card project-card glow"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <h2>Proyecto experimental</h2>

              <div className="project-image">
                <img
                  src={`${import.meta.env.BASE_URL}img/proyectos/PROYECTO4.png`}
                  alt="Proyecto experimental"
                  style={{ width: '100%', borderRadius: '12px', marginBottom: '16px' }}
                />
              </div>

             <a href="https://sergio262001.github.io/SGpacks/" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Ver proyecto
              </a>
            </motion.article>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
