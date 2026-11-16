import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const ENLACES = [
  { to: "/", label: "Inicio", end: true },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/sobre-mi", label: "Sobre mí" },
  { to: "/cv", label: "CV" },
  { to: "/servicios", label: "Servicios" },
  { to: "/contacto", label: "Contacto", cta: true },
];

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const { pathname } = useLocation();

  // Al cambiar de página, el menú móvil se cierra
  useEffect(() => {
    setAbierto(false);
  }, [pathname]);

  return (
    <header className={`site-header ${abierto ? "menu-abierto" : ""}`}>
      <div className="container header-inner">
        <NavLink to="/" className="brand" aria-label="SG Studio, ir al inicio">
          <img src={`${import.meta.env.BASE_URL}img/logos/logoSG.png`} alt="" className="brand-logo" />
        </NavLink>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={abierto}
          aria-controls="menu-principal"
          onClick={() => setAbierto((v) => !v)}
        >
          <span className="menu-icon" aria-hidden="true" />
          {abierto ? "Cerrar" : "Menú"}
        </button>

        <nav className="main-nav" id="menu-principal" aria-label="Navegación principal">
          {ENLACES.map((e) => (
            <NavLink
              key={e.to}
              to={e.to}
              end={e.end}
              className={({ isActive }) => `nav-link${e.cta ? " nav-link-cta" : ""}${isActive ? " nav-link-active" : ""}`}
            >
              {e.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
