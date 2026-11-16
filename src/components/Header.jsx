import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        
        {/* LOGO */}
        <div className="brand">
                  <img
          src={`${import.meta.env.BASE_URL}img/logos/logoSG.png`}
          alt="SG Studio logo"
          className="brand-logo"
        />

        </div>  

        {/* NAV */}
        <nav className="main-nav" aria-label="Navegación principal">
          <NavLink to="/" end className={({ isActive }) =>
            "nav-link" + (isActive ? " nav-link-active" : "")
          }>
            Inicio
          </NavLink>

          <NavLink to="/proyectos" className={({ isActive }) =>
            "nav-link" + (isActive ? " nav-link-active" : "")
          }>
            Proyectos
          </NavLink>

          <NavLink to="/servicios" className={({ isActive }) =>
            "nav-link" + (isActive ? " nav-link-active" : "")
          }>
            Servicios
          </NavLink>

          <NavLink to="/sobre-mi" className={({ isActive }) =>
            "nav-link" + (isActive ? " nav-link-active" : "")
          }>
            Sobre mí
          </NavLink>

          <NavLink to="/contacto" className={({ isActive }) =>
            "nav-link nav-link-cta" + (isActive ? " nav-link-active" : "")
          }>
            Contacto
          </NavLink>
        </nav>

      </div>
    </header>
  );
}

