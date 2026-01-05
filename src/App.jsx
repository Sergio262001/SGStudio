import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <div className="app-root">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Projects />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/sobre-mi" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
