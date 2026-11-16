// Contenido de la página Proyectos.
// Para agregar un proyecto, añade un objeto a la lista que corresponda: la página lo muestra solo.

const BASE = import.meta.env.BASE_URL;
const REPO = "https://github.com/Sergio262001/portafolio-proyectos/tree/main";
const img = (archivo) => `${BASE}img/proyectos/${archivo}`;

export const CATEGORIAS = [
  { id: "todos", label: "Todos" },
  { id: "ux", label: "UX/UI" },
  { id: "web", label: "Desarrollo web" },
  { id: "devops", label: "DevOps" },
];

// ---------- UX/UI: casos completos con prototipo navegable ----------

export const UX = [
  {
    id: "ux-01",
    titulo: "Constructor visual de formularios",
    subtitulo: "Crear formularios con reglas condicionales y probarlos antes de publicarlos.",
    rol: "Investigación, diseño UX/UI y prototipado funcional",
    herramientas: ["HTML", "CSS", "JavaScript", "Accesibilidad WCAG 2.2"],
    reto:
      "Los equipos que arman formularios (soporte, RR. HH., ventas) necesitan preguntas que aparezcan solo en ciertos casos. Hoy esas reglas son difíciles de ver, y nadie puede probar el formulario hasta publicarlo.",
    solucion:
      "Un constructor de tres zonas: campos disponibles, el formulario y sus propiedades. Las reglas se leen en lenguaje natural sobre cada campo, y un modo «Simular» permite usar el formulario real, con validación y vista móvil, antes de publicarlo.",
    dolores: [
      "Las reglas condicionales no se ven: hay que abrir cada campo para entender el formulario.",
      "No hay forma de probar el resultado antes de publicarlo.",
      "Reordenar solo con el mouse deja fuera a quien usa teclado.",
      "Un error de configuración (una regla circular) rompe el formulario sin aviso.",
    ],
    decisiones: [
      ["Reglas visibles", "Cada campo muestra su regla en una etiqueta: «Solo si Tipo es igual a Reclamo»."],
      ["Probar antes de publicar", "El modo Simular usa el formulario real, con validación, datos de prueba y vista móvil."],
      ["Teclado primero", "Arrastrar y soltar, pero también botones ↑ ↓ y Alt + flechas para reordenar."],
      ["Errores que se entienden", "Las reglas circulares se marcan en el campo; al enviar, el foco va al primer error."],
      ["Sin miedo a equivocarse", "Deshacer y rehacer en todo momento (Ctrl+Z / Ctrl+Y)."],
    ],
    flujo: ["Agrega campos", "Define reglas", "Simula el formulario", "Corrige errores", "Publica"],
    validacion: [
      "10 pruebas automáticas de la lógica de reglas y validación",
      "19 comprobaciones en navegador real (agregar, reordenar, deshacer, simular, móvil)",
      "Revisión de accesibilidad: teclado, foco visible, mensajes para lectores de pantalla",
    ],
    siguiente: "Siguiente paso: pruebas de usabilidad con 5 personas que creen formularios en su trabajo.",
    wireframe: "ux-01",
    demo: "ux-01",
    url: "constructor-formularios.app",
    capturas: { escritorio: img("ux-01-escritorio.jpg"), movil: img("ux-01-movil.jpg") },
    repo: `${REPO}/ux-01-constructor-formularios`,
  },
  {
    id: "ux-02",
    titulo: "Panel de simulación de escenarios",
    subtitulo: "Comparar decisiones moviendo parámetros y ver el resultado al instante.",
    rol: "Diseño UX/UI, visualización de datos y prototipado funcional",
    herramientas: ["HTML", "CSS", "JavaScript", "SVG", "Visualización accesible"],
    reto:
      "Para decidir, una persona necesita comparar escenarios: ¿qué pasa si crecemos más rápido pero gastamos más? Los paneles habituales muestran un solo estado y obligan a anotar cifras a mano para comparar.",
    solucion:
      "Un panel donde cada parámetro se ajusta con un deslizador o escribiendo el valor. Los resultados se recalculan al instante, y se pueden guardar hasta tres escenarios para verlos juntos en el gráfico y en una tabla que marca la mejor opción.",
    dolores: [
      "Comparar escenarios exige copiar cifras a una hoja aparte.",
      "Los gráficos con varias líneas dependen solo del color y confunden.",
      "Los gráficos no se pueden leer con teclado ni con lector de pantalla.",
      "No queda claro cuál escenario es mejor en cada aspecto.",
    ],
    decisiones: [
      ["Explorar y precisar", "Deslizador para explorar, campo numérico para el valor exacto, siempre sincronizados."],
      ["Resultado primero", "Cuatro indicadores clave arriba: equilibrio, capacidad, acumulado y unidades."],
      ["Más que color", "Cada escenario tiene color y patrón de línea propios (continua, rayas, puntos)."],
      ["Gráfico accesible", "Se recorre mes a mes con las flechas, y la vista Tabla muestra los mismos datos."],
      ["Decisión clara", "En la comparación, la mejor opción de cada fila lleva ★ y el texto «mejor»."],
    ],
    flujo: ["Elige un punto de partida", "Ajusta parámetros", "Guarda el escenario", "Compara", "Decide"],
    validacion: [
      "10 pruebas automáticas del modelo de simulación",
      "20 comprobaciones en navegador real (parámetros, escenarios, teclado, tabla, móvil)",
      "Fluido a ~60 cuadros por segundo con 120 meses y 4 escenarios",
    ],
    siguiente: "Siguiente paso: pruebas con personas que toman decisiones de presupuesto, midiendo tiempo y aciertos al comparar.",
    wireframe: "ux-02",
    demo: "ux-02",
    url: "panel-escenarios.app",
    capturas: { escritorio: img("ux-02-escritorio.jpg"), movil: img("ux-02-movil.jpg") },
    repo: `${REPO}/ux-02-panel-escenarios`,
  },
];

// ---------- Desarrollo web: sitios publicados ----------

export const WEB = [
  {
    titulo: "Web Hipnosis para sanar",
    imagen: img("PROYECTO1.png"),
    alt: "Captura de la web Hipnosis para sanar",
    url: "https://sergio262001.github.io/HipnosisParaSanar1/index.html",
  },
  {
    titulo: "E-commerce Great Value",
    imagen: img("PROYECTO2.png"),
    alt: "Captura del e-commerce de muebles",
    url: "https://sergio262001.github.io/furniture/pages/livingroom/livingroom.html",
  },
  {
    titulo: "Blog académico",
    imagen: img("PROYECTO3.png"),
    alt: "Captura del blog académico",
    url: "https://conacedum.com/",
  },
  {
    titulo: "Proyecto experimental",
    imagen: img("PROYECTO4.png"),
    alt: "Captura del proyecto experimental",
    url: "https://sergio262001.github.io/SGpacks/",
  },
];

// ---------- DevOps ----------

export const DEVOPS = {
  id: "devops-01",
  titulo: "Plataforma de entrega progresiva con GitOps",
  subtitulo: "Cada cambio se prueba, se firma y llega a producción poco a poco, con vuelta atrás automática.",
  reto: "Desplegar a mano, sin pruebas automáticas ni forma rápida de volver atrás, es lento y arriesgado.",
  solucion:
    "Un flujo automático: pruebas, políticas de seguridad, imagen firmada y despliegue gradual que se detiene solo si aumentan los errores o la latencia.",
  puntos: [
    "API de ejemplo con pruebas y contenedor que corre sin permisos de administrador",
    "Despliegue canary (20 % → 50 % → 100 %) con análisis de errores y latencia",
    "Infraestructura como código con Terraform y sincronización GitOps con Argo CD",
    "Políticas como código que bloquean configuraciones inseguras",
    "SBOM y firma de imágenes, reglas de SLO, runbooks y simulacro de incidente",
  ],
  herramientas: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "Argo CD", "Prometheus"],
  pipeline: [
    ["Commit", "Cambio en git"],
    ["Pruebas", "Tests y lint"],
    ["Políticas", "Conftest / OPA"],
    ["Imagen", "Build + SBOM"],
    ["Firma", "cosign"],
    ["GitOps", "Argo CD sincroniza"],
    ["Canary", "20 % → 50 % → 100 %"],
  ],
  estado:
    "Estado: la API, su imagen de contenedor y la sintaxis de los manifiestos están verificadas. La infraestructura está definida como código, pero aún no se ha desplegado en un clúster real.",
  repo: `${REPO}/devops-01-plataforma-entrega`,
};
