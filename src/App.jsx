import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import CaseStudy from "./pages/CaseStudy";
import Ver from "./pages/Ver";
import CV from "./pages/CV";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Al cambiar de página se vuelve arriba (si no, la página nueva abre a media altura).
function ScrollArriba() {
  const { pathname } = useLocation();
  // Con llaves: un efecto solo puede devolver una función de limpieza (o nada).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();

  // El salto al contenido usa foco (no un #ancla: con HashRouter cambiaría de ruta).
  const saltar = (e) => {
    e.preventDefault();
    document.getElementById("contenido")?.focus();
  };

  return (
    <div className="app-root">
      <a href="#contenido" className="skip-link" onClick={saltar}>
        Saltar al contenido
      </a>
      <ScrollArriba />
      <Header />

      <main id="contenido" tabIndex={-1}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/proyectos" element={<Projects />} />
            <Route path="/proyectos/:id" element={<CaseStudy />} />
            <Route path="/ver/:id" element={<Ver />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/casos" element={<Navigate to="/proyectos" replace />} />
            {/* Servicios se retiró (un solo público: reclutadores). Los enlaces viejos llevan a Contacto. */}
            <Route path="/servicios" element={<Navigate to="/contacto" replace />} />
            <Route path="/sobre-mi" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
