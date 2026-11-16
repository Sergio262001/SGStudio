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
    titulo: "Formix · Constructor de formularios",
    resumen: "Sitio web navegable para crear formularios con preguntas que aparecen solo cuando hacen falta, con plantillas y modo simulación.",
    imagen: img("ux-01-card.jpg"),
    subtitulo: "Crear formularios con reglas condicionales y probarlos antes de publicarlos.",
    rol: "Investigación, diseño UX/UI y prototipado funcional",
    herramientas: ["HTML", "CSS", "JavaScript", "Accesibilidad WCAG 2.2"],
    reto:
      "Los equipos que arman formularios (soporte, RR. HH., ventas) necesitan preguntas que aparezcan solo en ciertos casos. Hoy esas reglas son difíciles de ver, y nadie puede probar el formulario hasta publicarlo.",
    solucion:
      "Formix, un sitio con inicio, plantillas, editor, «Mis formularios» y ayuda. El editor tiene tres zonas: campos disponibles, el formulario y sus propiedades. Las reglas se leen en lenguaje natural sobre cada campo, y un modo «Simular» permite usar el formulario real, con validación y vista móvil, antes de publicarlo.",
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
    flujo: ["Elige una plantilla", "Agrega campos", "Define reglas", "Simula el formulario", "Guarda en Mis formularios"],
    validacion: [
      "10 pruebas automáticas de la lógica de reglas y validación",
      "53 comprobaciones en navegador real: navegación entre páginas, plantillas, guardar, reordenar, deshacer, simular y móvil",
      "Revisión de accesibilidad: teclado, foco visible, mensajes para lectores de pantalla",
    ],
    siguiente: "Siguiente paso: pruebas de usabilidad con 5 personas que creen formularios en su trabajo.",
    wireframe: "ux-01",
    demo: "ux-01",
    url: "formix.app",
    capturas: { escritorio: img("ux-01-escritorio.jpg"), movil: img("ux-01-movil.jpg"), app: img("ux-01-app.jpg") },
    repo: `${REPO}/ux-01-constructor-formularios`,
  },
  {
    id: "ux-02",
    titulo: "Escenaria · Simulación de escenarios",
    resumen: "Sitio web navegable para comparar decisiones: panel interactivo, informe en lenguaje claro y explicación del modelo.",
    imagen: img("ux-02-card.jpg"),
    subtitulo: "Comparar decisiones moviendo parámetros y ver el resultado al instante.",
    rol: "Diseño UX/UI, visualización de datos y prototipado funcional",
    herramientas: ["HTML", "CSS", "JavaScript", "SVG", "Visualización accesible"],
    reto:
      "Para decidir, una persona necesita comparar escenarios: ¿qué pasa si crecemos más rápido pero gastamos más? Los paneles habituales muestran un solo estado y obligan a anotar cifras a mano para comparar.",
    solucion:
      "Escenaria, un sitio con inicio, panel, informe y explicación del modelo. En el panel, cada parámetro se ajusta con un deslizador o escribiendo el valor. Los resultados se recalculan al instante, y se pueden guardar hasta tres escenarios para verlos juntos en el gráfico y en una tabla que marca la mejor opción.",
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
    flujo: ["Elige un punto de partida", "Ajusta parámetros", "Guarda escenarios", "Compara en el panel", "Comparte el informe"],
    validacion: [
      "10 pruebas automáticas del modelo de simulación",
      "44 comprobaciones en navegador real: navegación, parámetros, escenarios, informe, teclado, tabla y móvil",
      "Fluido a ~60 cuadros por segundo con 120 meses y 4 escenarios",
    ],
    siguiente: "Siguiente paso: pruebas con personas que toman decisiones de presupuesto, midiendo tiempo y aciertos al comparar.",
    wireframe: "ux-02",
    demo: "ux-02",
    url: "escenaria.app",
    capturas: { escritorio: img("ux-02-escritorio.jpg"), movil: img("ux-02-movil.jpg"), app: img("ux-02-app.jpg") },
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
  resumen: "Cada cambio se prueba, se firma y llega a producción poco a poco, con vuelta atrás automática si algo falla.",
  imagen: img("devops-01-card.jpg"),
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

// Lista única para la cuadrícula de la página Proyectos (mismo formato de tarjeta para todos).
export const PROYECTOS = [
  ...UX.map((p) => ({ cat: "ux", etiqueta: "UX/UI · Prototipo navegable", titulo: p.titulo, resumen: p.resumen, imagen: p.imagen, alt: `Página de inicio de ${p.titulo}`, url: `${BASE}demos/${p.demo}/index.html`, caso: p.id })),
  ...WEB.map((p) => ({ cat: "web", etiqueta: "Desarrollo web", ...p })),
  { cat: "devops", etiqueta: "DevOps", titulo: DEVOPS.titulo, resumen: DEVOPS.resumen, imagen: DEVOPS.imagen, alt: "Diagrama del flujo de entrega", url: DEVOPS.repo, urlTexto: "Ver código", caso: DEVOPS.id },
];

export const CASOS = Object.fromEntries([...UX.map((p) => [p.id, { tipo: "ux", data: p }]), [DEVOPS.id, { tipo: "devops", data: DEVOPS }]]);
