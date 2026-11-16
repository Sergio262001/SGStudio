// Datos del perfil: una sola fuente para Inicio, Sobre mí, CV, Contacto y pie de página.
// Correo, teléfono y ciudad NO se publican aquí a propósito (datos privados).
// Si decides mostrarlos, completa `contacto` y aparecerán en Contacto y en el CV.

export const PERFIL = {
  nombre: "Sergio Gil",
  rol: "DevOps Junior · Desarrollador web",
  frase: "Automatizo, despliego y diseño productos web que funcionan.",
  resumen:
    "Desarrollador web en transición a DevOps, con experiencia como webmaster en el sector público. Construyo pipelines de CI/CD, trabajo con contenedores e infraestructura como código, y aporto una base sólida en UX/UI y frontend.",
  // Experiencia destacada en la portada (sin «actualmente»: sigue siendo cierta después de terminar)
  actual: { cargo: "Webmaster", lugar: "Ministerio de Salud y Protección Social" },

  links: {
    github: "https://github.com/Sergio262001",
    linkedin: "https://www.linkedin.com/in/sergio-gil",
    web: "https://sergio262001.github.io/SGStudio/",
    repoProyectos: "https://github.com/Sergio262001/portafolio-proyectos",
  },

  contacto: {
    email: null,
    telefono: null,
    ciudad: null,
  },

  habilidades: [
    {
      grupo: "DevOps y nube",
      items: ["Docker", "GitHub Actions (CI/CD)", "AWS (iniciando)", "Linux y Bash (aprendiendo)", "Kubernetes (básico)", "Terraform (básico)", "Argo CD · GitOps"],
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
        "Publicación y actualización de contenidos del portal web institucional, de alcance nacional, en SharePoint.",
        "Soporte y mantenimiento del sitio web.",
      ],
    },
    {
      cargo: "Desarrollador web y diseñador UX/UI",
      lugar: "SG Studio · Freelance",
      periodo: "Actualidad",
      logros: [
        "Menús digitales con QR para restaurantes, cafés y bares, con panel de administración.",
        "Landing pages, sitios informativos y tiendas online para negocios y marcas personales.",
        "Publicación en GitHub Pages y Firebase Hosting, con control de versiones en Git.",
        "Autenticación y datos con Firebase y Supabase.",
      ],
    },
  ],

  proyectosCv: [
    {
      nombre: "Plataforma de entrega progresiva con GitOps",
      detalle: "Pipeline en GitHub Actions con pruebas, políticas OPA, SBOM y firma de imágenes; despliegue canary con Argo Rollouts y rollback automático; infraestructura en Terraform.",
    },
    {
      nombre: "Canary Lab",
      detalle: "Simulador web interactivo que muestra cómo cada capa del pipeline detiene un cambio defectuoso.",
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

  // Recorrido para «Sobre mí» (de lo creativo a lo técnico)
  camino: [
    { etapa: "Publicidad y mercadeo", texto: "Entender a las personas y los negocios.", anio: "2024" },
    { etapa: "Diseño gráfico y UX/UI", texto: "Diseñar interfaces claras y accesibles.", anio: "2024–2025" },
    { etapa: "Desarrollo web freelance", texto: "Construir y publicar sitios para clientes reales.", anio: "Actualidad" },
    { etapa: "Webmaster · Ministerio de Salud", texto: "Mantener un portal público de alcance nacional.", anio: "2026" },
    { etapa: "DevOps", texto: "Automatizar pruebas, seguridad y despliegues.", anio: "2026" },
  ],
};
