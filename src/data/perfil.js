// Datos del perfil: una sola fuente para Inicio, Sobre mí, CV, Contacto y pie de página.
// El teléfono NO se publica a propósito (evita llamadas y mensajes de spam).
// El correo se arma al ejecutar la página, para que los robots que recolectan correos no lo lean tal cual.

export const PERFIL = {
  nombre: "Sergio Gil",
  rol: "Desarrollador web y diseñador UX/UI",
  frase: "Diseño, desarrollo y publico sitios web que funcionan.",
  resumen:
    "Desarrollador web y diseñador UX/UI en transición a DevOps, con experiencia como webmaster en el sector público. Diseño y desarrollo sitios y tiendas online que publico con Git, GitHub Pages y Firebase.",
  // Experiencia destacada en la portada (sin «actualmente»: sigue siendo cierta después de terminar)
  actual: { cargo: "Webmaster", lugar: "Ministerio de Salud y Protección Social" },

  links: {
    github: "https://github.com/Sergio262001",
    linkedin: "https://www.linkedin.com/in/sergio-gil",
    web: "https://sergio262001.github.io/SGStudio/",
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
      grupo: "Portales web",
      items: ["SharePoint", "Gestión de contenidos", "Mantenimiento de sitios institucionales"],
    },
    {
      grupo: "Desarrollo web",
      items: ["HTML", "CSS", "JavaScript", "React", "Vite", "Git y GitHub"],
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
      ],
    },
  ],

  proyectosCv: [
    {
      nombre: "Pa'l Toque (pal-toque.com)",
      detalle: "Tienda online en producción de camisetas para conciertos: preventas por edición, pasarela de pagos, rastreo de pedidos y chat de atención automatizado con IA.",
    },
    {
      nombre: "FreshCo (freshco-design.com)",
      detalle: "Tienda online de ropa urbana con panel administrativo: productos, contenidos, base de datos y atención por WhatsApp.",
    },
    {
      nombre: "Sitios para clientes",
      detalle: "Hipnosis para sanar, e-commerce Great Value y el blog académico del Colectivo Narrativas.",
    },
  ],

  formacion: [
    { titulo: "Profesional en Diseño Gráfico", lugar: "Fundación Universitaria Los Libertadores", periodo: "2025" },
    { titulo: "Profesional en Publicidad y Mercadeo", lugar: "Fundación Universitaria Los Libertadores", periodo: "2024" },
  ],

  cursos: [
    { titulo: "Diseño UX/UI Avanzado", lugar: "Coderhouse", periodo: "2024" },
    { titulo: "JavaScript", lugar: "Coderhouse", periodo: "2026" },
    { titulo: "React", lugar: "Coderhouse", periodo: "2026" },
    { titulo: "AWS Certified Cloud Practitioner", lugar: "Udemy", periodo: "En curso · 2026" },
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
    { etapa: "En transición a DevOps", texto: "Formándome en la nube con el curso AWS Cloud Practitioner.", anio: "2026" },
  ],
};
