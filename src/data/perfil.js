// Datos del perfil: una sola fuente para Inicio, Sobre mí, CV, Contacto y pie de página.
// El teléfono NO se publica a propósito (evita llamadas y mensajes de spam).
// El correo se arma al ejecutar la página, para que los robots que recolectan correos no lo lean tal cual.

export const PERFIL = {
  nombre: "Sergio Gil",
  rol: "DevOps Junior · Desarrollador web",
  frase: "Automatizo, despliego y diseño productos web que funcionan.",
  resumen:
    "Desarrollador web y diseñador UX/UI en transición a DevOps, con experiencia como webmaster en el sector público. Automatizo pruebas y despliegues con GitHub Actions y Docker, y publico mis proyectos con demos en vivo. Busco mi primer rol como DevOps Junior.",
  // Experiencia destacada en la portada (sin «actualmente»: sigue siendo cierta después de terminar)
  actual: { cargo: "Webmaster", lugar: "Ministerio de Salud y Protección Social" },

  links: {
    github: "https://github.com/Sergio262001",
    linkedin: "https://www.linkedin.com/in/sergio-gil",
    web: "https://sergio262001.github.io/SGStudio/",
    repoProyectos: "https://github.com/Sergio262001/portafolio-proyectos",
  },

  contacto: {
    email: ["sagilt26", "gmail.com"].join("@"),
    telefono: null,
    ciudad: "Bogotá",
  },
  // Lo primero que filtran los reclutadores: dónde estás y cómo puedes trabajar
  ubicacion: "Bogotá, Colombia · Presencial, híbrido o remoto",

  habilidades: [
    {
      grupo: "DevOps y nube (en formación)",
      items: ["Docker", "GitHub Actions (CI/CD)", "AWS", "Linux y Bash", "Terraform", "Kubernetes", "Argo CD · GitOps", "Prometheus"],
    },
    {
      grupo: "Portales web",
      items: ["SharePoint", "Gestión de contenidos", "Mantenimiento de sitios institucionales"],
    },
    {
      grupo: "Desarrollo web",
      items: ["HTML", "CSS", "JavaScript", "React (aprendiendo)", "Vite", "Git y GitHub"],
    },
    {
      grupo: "Datos y hosting",
      items: ["Firebase (Auth · Hosting)", "Supabase", "MongoDB (básico)", "GitHub Pages"],
    },
    {
      grupo: "Diseño y UX/UI",
      items: ["Figma", "Adobe Ps · Ai · Pr", "Accesibilidad WCAG", "Prototipado"],
    },
  ],

  experiencia: [
    {
      cargo: "Webmaster",
      lugar: "Ministerio de Salud y Protección Social",
      periodo: "2026",
      logros: [
        "Gestión y publicación de contenidos del portal institucional, de alcance nacional, en SharePoint.",
        "Soporte y mantenimiento del sitio web institucional.",
      ],
    },
    {
      cargo: "Desarrollador web y diseñador UX/UI",
      lugar: "SG Studio · Freelance",
      periodo: "Actualidad",
      logros: [
        "Diseño y desarrollo de menús digitales con QR para restaurantes, cafés y bares, con panel de administración.",
        "Desarrollo de landing pages, sitios informativos y tiendas online para negocios y marcas personales.",
        "Despliegue en GitHub Pages y Firebase Hosting, con control de versiones en Git.",
        "Panel administrativo de FreshCo: productos, contenidos, base de datos y WhatsApp.",
      ],
    },
  ],

  proyectosCv: [
    {
      nombre: "Pa'l Toque (pal-toque.com)",
      detalle: "Tienda online en producción de camisetas para conciertos: preventas por edición, pasarela de pagos, rastreo de pedidos y chat de atención automatizado con IA.",
    },
    {
      nombre: "Plataforma de entrega progresiva con GitOps",
      detalle: "Pipeline CI/CD en GitHub Actions con pruebas, políticas OPA, SBOM y firma de imágenes, que despliega con canary y rollback automático (Argo Rollouts); infraestructura en Terraform. Incluye Canary Lab, un simulador web interactivo del flujo.",
    },
    {
      nombre: "Formix y Escenaria",
      detalle: "Prototipos web navegables de UX/UI, accesibles (WCAG 2.2) y con pruebas automatizadas.",
    },
  ],

  formacion: [
    { titulo: "Profesional en Diseño Gráfico", lugar: "Fundación Universitaria Los Libertadores", periodo: "2025" },
    { titulo: "Profesional en Publicidad y Mercadeo", lugar: "Fundación Universitaria Los Libertadores", periodo: "2024" },
  ],

  cursos: [
    { titulo: "Diseño UX/UI Avanzado", lugar: "Coderhouse", periodo: "2024" },
    { titulo: "JavaScript", lugar: "Coderhouse", periodo: "En curso · 2026" },
    { titulo: "React", lugar: "Coderhouse", periodo: "En curso · 2026" },
    { titulo: "AWS Cloud Practitioner", lugar: "AWS Skill Builder", periodo: "Iniciando · 2026" },
  ],

  idiomas: [
    { idioma: "Español", nivel: "Nativo" },
    { idioma: "Inglés", nivel: "Básico" },
  ],

  // Recorrido para «Sobre mí» (de lo creativo a lo técnico)
  camino: [
    { etapa: "Publicidad y mercadeo", texto: "Entender a las personas y los negocios.", anio: "2024" },
    { etapa: "Diseño gráfico y UX/UI", texto: "Diseñar interfaces claras y accesibles.", anio: "2024–2025" },
    { etapa: "Desarrollo web freelance", texto: "Construir y publicar sitios para clientes reales.", anio: "Actualidad" },
    { etapa: "Webmaster · Ministerio de Salud", texto: "Mantener un portal público de alcance nacional.", anio: "2026" },
    { etapa: "DevOps", texto: "Automatizar pruebas, seguridad y despliegues.", anio: "2026" },
  ],
};
