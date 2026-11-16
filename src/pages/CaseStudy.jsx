import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link, Navigate, useParams } from "react-router-dom";
import { CASOS } from "../data/proyectos";
import UxCase from "../components/proyectos/UxCase";
import DevopsCase from "../components/proyectos/DevopsCase";

export default function CaseStudy() {
  const { id } = useParams();
  const caso = CASOS[id];
  if (!caso) return <Navigate to="/proyectos" replace />;

  const { data } = caso;
  const volver = caso.tipo === "ux" ? "/proyectos?cat=ux" : "/proyectos?cat=devops";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <Helmet>
        <title>{`${data.titulo} | Caso de estudio | SG Studio`}</title>
        <meta name="description" content={data.resumen} />
      </Helmet>

      <section className="section">
        <div className="container">
          <nav aria-label="Ruta de navegación" className="breadcrumb">
            <Link to={volver}>← Volver a proyectos</Link>
          </nav>
          {caso.tipo === "ux" ? <UxCase caso={data} /> : <DevopsCase caso={data} />}
        </div>
      </section>
    </motion.div>
  );
}
