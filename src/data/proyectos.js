// Contenido de la página Proyectos: sitios publicados (se abren aparte).
// Para agregar un proyecto, añade un objeto a la lista.
// Los prototipos de práctica (Canary Lab, Formix, Escenaria) se guardaron en la rama
// «respaldo-con-proyectos-demo» y en el repositorio portafolio-proyectos.

const BASE = import.meta.env.BASE_URL;
const img = (archivo) => `${BASE}img/proyectos/${archivo}`;

export const PROYECTOS = [
  {
    titulo: "Pa'l Toque · Tienda online",
    etiqueta: "En producción",
    resumen: "Tienda de camisetas para conciertos en Bogotá con preventas por edición.",
    destacados: ["Pasarela de pagos", "Rastreo de pedidos", "Chat con IA"],
    imagen: img("paltoque-card.jpg"),
    url: "https://pal-toque.com/",
  },
  {
    titulo: "FreshCo · Tienda de ropa",
    etiqueta: "En producción",
    resumen: "Tienda online de ropa urbana con panel administrativo, acceso por correo o Google.",
    destacados: ["Gestión de productos", "Base de datos", "Atención por WhatsApp"],
    imagen: img("freshco-card.jpg"),
    url: "https://freshco-design.com/",
    urlTexto: "Ver tienda",
  },
  {
    titulo: "Web Hipnosis para sanar",
    etiqueta: "Sitio web",
    resumen: "Sitio de una terapeuta de hipnosis RTT®: terapias, historias de transformación y preguntas frecuentes.",
    destacados: ["Página por terapia", "Preguntas frecuentes", "Contacto por WhatsApp"],
    imagen: img("PROYECTO1.png"),
    url: "https://sergio262001.github.io/HipnosisParaSanar1/index.html",
  },
  {
    titulo: "E-commerce Great Value",
    etiqueta: "Sitio web",
    resumen: "Catálogo en línea de una tienda de muebles en Ohio (Estados Unidos).",
    destacados: ["Filtros de catálogo", "Carrito de compras", "Contacto por WhatsApp"],
    imagen: img("PROYECTO2.png"),
    url: "https://sergio262001.github.io/furniture/pages/livingroom/livingroom.html",
  },
  {
    titulo: "Blog académico · Colectivo Narrativas",
    etiqueta: "Sitio web",
    resumen: "Sitio de un colectivo de investigación de la Universidad Pedagógica Nacional.",
    destacados: ["Producción académica", "Proyectos de investigación", "Seminarios doctorales"],
    imagen: img("PROYECTO3.png"),
    url: "https://conacedum.com/",
  },
].map((p) => ({ cat: "web", ...p }));

// Proyectos de la portada. Pa'l Toque ya está en la vitrina de arriba, así que no se repite.
export const DESTACADOS_INICIO = PROYECTOS.slice(1, 4);
