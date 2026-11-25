// Contenido de la página Proyectos, del visor y de los casos de estudio.
// Para agregar un proyecto, añade un objeto a la lista que corresponda.

const BASE = import.meta.env.BASE_URL;
const REPO = "https://github.com/Sergio262001/portafolio-proyectos/tree/main";
const img = (archivo) => `${BASE}img/proyectos/${archivo}`;
export const demoUrl = (demo) => `${BASE}demos/${demo}/index.html`;

export const CATEGORIAS = [
  { id: "todos", label: "Todos" },
  { id: "devops", label: "DevOps" },
  { id: "ux", label: "UX/UI" },
  { id: "web", label: "Desarrollo web" },
];

// ---------- DevOps ----------

export const DEVOPS = {
  id: "devops-01",
  tipo: "devops",
  etiqueta: "DevOps · Simulador interactivo",
  titulo: "Canary Lab · Entrega progresiva con GitOps",
  resumen: "Despliega un cambio y mira cómo las pruebas, la seguridad y el canary lo detienen si falla.",
  destacados: ["Rollback automático", "Pipeline CI/CD en verde", "Simulador interactivo"],
  subtitulo: "Cada cambio se prueba, se firma y llega a producción poco a poco, con rollback automático.",
  imagen: img("devops-01-card.jpg"),
  demo: "devops-01",
  url: "canary-lab.app",
  capturas: { escritorio: img("devops-01-escritorio.jpg"), movil: img("devops-01-movil.jpg") },
  resumen30: [
    ["El reto", "Desplegar a mano es lento y un error llega a todos los usuarios."],
    ["La solución", "Pipeline automático con pruebas, políticas, imagen firmada y despliegue gradual."],
    ["El resultado", "Si las métricas empeoran, vuelve solo a la versión anterior."],
  ],
  pipeline: [
    ["Pruebas", "Tests y lint"],
    ["Políticas", "OPA / Conftest"],
    ["Imagen", "Build + SBOM"],
    ["Firma", "cosign"],
    ["GitOps", "Argo CD"],
    ["Canary", "20 → 50 → 100 %"],
  ],
  puntos: [
    ["Contenedores", "API en Docker multietapa, sin permisos de administrador."],
    ["CI/CD", "GitHub Actions: pruebas, políticas, SBOM y firma de imágenes."],
    ["Infraestructura como código", "Terraform: red, clúster y registro por entornos."],
    ["Despliegue seguro", "Argo Rollouts: canary con análisis de errores y latencia."],
    ["Observabilidad", "Prometheus con SLO y alertas por presupuesto de error."],
    ["Operación", "Runbooks y simulacro de incidente documentados."],
  ],
  herramientas: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "Argo CD", "Prometheus", "OPA"],
  estado: "El pipeline pasa completo en GitHub Actions: pruebas, políticas, imagen con SBOM firmada y actualización GitOps. La infraestructura en la nube está definida en Terraform, pero aún no se ha desplegado.",
  repo: `${REPO}/devops-01-plataforma-entrega`,
};

// ---------- UX/UI ----------

export const UX = [
  {
    id: "ux-01",
    tipo: "ux",
    etiqueta: "UX/UI · Prototipo navegable",
    titulo: "Formix · Constructor de formularios",
    resumen: "Formularios con preguntas que aparecen solo cuando hacen falta. Con plantillas y modo simulación.",
    destacados: ["Reglas condicionales", "Modo simulación", "100 % con teclado"],
    subtitulo: "Crear formularios con reglas condicionales y probarlos antes de publicarlos.",
    rol: "UX/UI y prototipado",
    herramientas: ["HTML", "CSS", "JavaScript", "WCAG 2.2"],
    imagen: img("ux-01-card.jpg"),
    demo: "ux-01",
    url: "formix.app",
    capturas: { escritorio: img("ux-01-escritorio.jpg"), movil: img("ux-01-movil.jpg"), app: img("ux-01-app.jpg") },
    resumen30: [
      ["El reto", "Las reglas de un formulario no se ven y no se puede probar antes de publicar."],
      ["La solución", "Reglas visibles en cada campo y un modo «Simular» con el formulario real."],
      ["El resultado", "5 páginas navegables, 100 % usable con teclado y 63 pruebas automáticas."],
    ],
    dolores: [
      "Las reglas condicionales no se ven.",
      "No se puede probar antes de publicar.",
      "Reordenar solo con mouse excluye a quien usa teclado.",
    ],
    flujo: ["Elige plantilla", "Agrega campos", "Define reglas", "Simula", "Guarda"],
    decisiones: [
      ["Reglas visibles", "«Solo si Tipo es Reclamo» se lee sobre el campo."],
      ["Probar sin riesgo", "Simular valida igual que el formulario publicado."],
      ["Teclado primero", "Botones ↑ ↓ y Alt + flechas además de arrastrar."],
      ["Deshacer siempre", "Ctrl+Z / Ctrl+Y en todo el editor."],
    ],
    validacion: ["10 pruebas de la lógica", "53 comprobaciones en navegador", "Revisión de accesibilidad"],
    siguiente: "Siguiente paso: pruebas con 5 personas que crean formularios.",
    wireframe: "ux-01",
    repo: `${REPO}/ux-01-constructor-formularios`,
  },
  {
    id: "ux-02",
    tipo: "ux",
    etiqueta: "UX/UI · Prototipo navegable",
    titulo: "Escenaria · Simulación de escenarios",
    resumen: "Compara decisiones moviendo parámetros: panel interactivo, informe claro y modelo explicado.",
    destacados: ["Compara 3 escenarios", "Gráfico accesible", "Informe en PDF"],
    subtitulo: "Comparar decisiones moviendo parámetros y ver el resultado al instante.",
    rol: "UX/UI y visualización de datos",
    herramientas: ["HTML", "CSS", "JavaScript", "SVG"],
    imagen: img("ux-02-card.jpg"),
    demo: "ux-02",
    url: "escenaria.app",
    capturas: { escritorio: img("ux-02-escritorio.jpg"), movil: img("ux-02-movil.jpg"), app: img("ux-02-app.jpg") },
    resumen30: [
      ["El reto", "Comparar escenarios obliga a copiar cifras a una hoja aparte."],
      ["La solución", "Deslizadores con resultado al instante y hasta 3 escenarios lado a lado."],
      ["El resultado", "4 páginas navegables, gráfico accesible e informe imprimible."],
    ],
    dolores: [
      "Comparar exige copiar cifras a mano.",
      "Los gráficos dependen solo del color.",
      "No queda claro qué escenario es mejor.",
    ],
    flujo: ["Punto de partida", "Ajusta", "Guarda", "Compara", "Comparte informe"],
    decisiones: [
      ["Explorar y precisar", "Deslizador y campo numérico sincronizados."],
      ["Más que color", "Cada línea con color y patrón propio."],
      ["Gráfico con teclado", "← → recorren los meses; vista Tabla equivalente."],
      ["Decisión clara", "La mejor opción de cada fila lleva ★."],
    ],
    validacion: ["10 pruebas del modelo", "44 comprobaciones en navegador", "~60 fps con 120 meses"],
    siguiente: "Siguiente paso: pruebas con personas que deciden presupuestos.",
    wireframe: "ux-02",
    repo: `${REPO}/ux-02-panel-escenarios`,
  },
];

// ---------- Desarrollo web: sitios publicados (se abren aparte) ----------

export const WEB = [
  {
    titulo: "Pa'l Toque · Tienda online",
    etiqueta: "Desarrollo web · En producción",
    resumen: "Tienda de camisetas para conciertos en Bogotá con preventas por edición.",
    destacados: ["Pasarela de pagos", "Rastreo de pedidos", "Chat con IA"],
    imagen: img("paltoque-card.jpg"),
    alt: "Tienda Pa'l Toque con los diseños de la edición",
    url: "https://pal-toque.com/",
  },
  {
    titulo: "FreshCo · Tienda de ropa",
    etiqueta: "Desarrollo web · En producción",
    resumen: "Tienda online de ropa urbana con panel administrativo, acceso por correo o Google.",
    destacados: ["Gestión de productos", "Base de datos", "Atención por WhatsApp"],
    imagen: img("freshco-card.jpg"),
    alt: "Acceso al panel de FreshCo y catálogo de su tienda",
    url: "https://freshco-design.com/",
    urlTexto: "Ver tienda",
  },
  {
    titulo: "Web Hipnosis para sanar",
    resumen: "Sitio de una terapeuta de hipnosis RTT®: terapias, historias de transformación y preguntas frecuentes.",
    destacados: ["Página por terapia", "Preguntas frecuentes", "Contacto por WhatsApp"],
    imagen: img("PROYECTO1.png"),
    alt: "Captura de la web Hipnosis para sanar",
    url: "https://sergio262001.github.io/HipnosisParaSanar1/index.html",
  },
  {
    titulo: "E-commerce Great Value",
    resumen: "Catálogo en línea de una tienda de muebles en Ohio (Estados Unidos).",
    destacados: ["Filtros de catálogo", "Carrito de compras", "Contacto por WhatsApp"],
    imagen: img("PROYECTO2.png"),
    alt: "Captura del e-commerce de muebles",
    url: "https://sergio262001.github.io/furniture/pages/livingroom/livingroom.html",
  },
  {
    titulo: "Blog académico · Colectivo Narrativas",
    resumen: "Sitio de un colectivo de investigación de la Universidad Pedagógica Nacional.",
    destacados: ["Producción académica", "Proyectos de investigación", "Seminarios doctorales"],
    imagen: img("PROYECTO3.png"),
    alt: "Captura del blog académico",
    url: "https://conacedum.com/",
  },
];

// ---------- Listas derivadas ----------

const interno = (p, cat) => ({
  cat, etiqueta: p.etiqueta, titulo: p.titulo, resumen: p.resumen, destacados: p.destacados, imagen: p.imagen,
  alt: `Vista de ${p.titulo}`, ver: `/ver/${p.id}`, caso: p.id,
});

// Cuadrícula de Proyectos: mismo formato de tarjeta para todos.
export const PROYECTOS = [
  interno(DEVOPS, "devops"),
  ...UX.map((p) => interno(p, "ux")),
  ...WEB.map((p) => ({ cat: "web", etiqueta: "Desarrollo web", ...p, externo: true })),
];

// Proyectos que se pueden abrir dentro del visor y tienen caso de estudio.
export const CASOS = Object.fromEntries([DEVOPS, ...UX].map((p) => [p.id, p]));
export const DESTACADOS = [DEVOPS, ...UX];

// Proyectos de la portada: el simulador DevOps, la tienda real en producción y un prototipo UX.
export const DESTACADOS_INICIO = ["Canary Lab", "Pa'l Toque", "Formix"].map((t) => PROYECTOS.find((p) => p.titulo.startsWith(t)));
