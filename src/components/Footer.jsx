import { Link } from "react-router-dom";
import { Escribeme } from "./Correo";
import { PERFIL } from "../data/perfil";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-main">© {new Date().getFullYear()} {PERFIL.nombre}</p>
        <p className="footer-sub">DevOps Junior · Desarrollo web · UX/UI</p>
        <nav className="footer-links" aria-label="Enlaces del pie de página">
          <Escribeme className="">Correo</Escribeme>
          <a href={PERFIL.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href={PERFIL.links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <Link to="/cv">CV</Link>
        </nav>
      </div>
    </footer>
  );
}
