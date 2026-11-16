// Datos de la página "Casos de estudio".
// Para agregar un caso nuevo, añade un objeto aquí: la página lo muestra solo.

const REPO = "https://github.com/Sergio262001/portafolio-proyectos/tree/main";

export const CASOS = [
  {
    id: "ux-01",
    tipo: "UX/UI",
    titulo: "Constructor visual de formularios",
    problema:
      "Armar formularios con reglas condicionales es lento y propenso a errores, y casi nunca se puede probar el resultado antes de publicarlo.",
    solucion:
      "Un constructor donde se arrastran campos, se definen reglas del tipo «mostrar solo si…» y se simula el formulario completo, con validación, antes de publicarlo.",
    puntos: [
      "Arrastrar y soltar, con alternativa completa por teclado (botones y Alt + flechas)",
      "Reglas condicionales encadenadas, con detección de ciclos",
      "Deshacer y rehacer ilimitado (Ctrl+Z / Ctrl+Y)",
      "Modo simulación con validación, datos de prueba y vista móvil",
      "10 pruebas automáticas de la lógica de reglas",
    ],
    etiquetas: ["JavaScript", "Accesibilidad", "Prototipo funcional"],
    demo: "ux-01",
    repo: `${REPO}/ux-01-constructor-formularios`,
  },
  {
    id: "ux-02",
    tipo: "UX/UI",
    titulo: "Panel de simulación de escenarios",
    problema:
      "Los paneles muestran el estado actual, pero decidir exige comparar varios escenarios con muchos parámetros a la vez.",
    solucion:
      "Un panel donde se mueven los parámetros y el resultado se recalcula al instante. Se guardan hasta tres escenarios y se comparan lado a lado.",
    puntos: [
      "Parámetros con deslizador y campo numérico sincronizados",
      "Series distinguibles por color y por patrón de línea, no solo por color",
      "Gráfico navegable con teclado (← → Home End) y vista de tabla equivalente",
      "Comparación con la mejor opción de cada métrica marcada con ★ y texto accesible",
      "10 pruebas automáticas del modelo de simulación",
    ],
    etiquetas: ["JavaScript", "Visualización de datos", "Accesibilidad"],
    demo: "ux-02",
    repo: `${REPO}/ux-02-panel-escenarios`,
  },
  {
    id: "devops-01",
    tipo: "DevOps",
    titulo: "Plataforma de entrega progresiva con GitOps",
    problema:
      "Desplegar cambios a mano, sin pruebas automáticas ni forma rápida de volver atrás, es lento y arriesgado.",
    solucion:
      "Un flujo en el que cada cambio se prueba, se empaqueta, se firma y llega a producción de forma gradual, con rollback automático si las métricas empeoran.",
    puntos: [
      "API de ejemplo con pruebas y contenedor multietapa que corre sin permisos de administrador",
      "Despliegue canary (20 % → 50 % → 100 %) con análisis de errores y latencia",
      "Infraestructura como código con Terraform y sincronización GitOps con Argo CD",
      "Políticas como código que bloquean configuraciones inseguras",
      "SBOM y firma de imágenes, reglas de SLO, runbooks y simulacro de incidente",
    ],
    etiquetas: ["Kubernetes", "Terraform", "GitHub Actions", "Argo CD"],
    estado:
      "Estado: la API, su imagen de contenedor y la sintaxis de los manifiestos están verificadas en local. La infraestructura está definida como código, pero aún no se ha desplegado en un clúster real.",
    pipeline: [
      ["Commit", "Cambio en git"],
      ["Pruebas", "Tests y lint"],
      ["Políticas", "Conftest / OPA"],
      ["Imagen", "Build + SBOM"],
      ["Firma", "cosign"],
      ["GitOps", "Argo CD sincroniza"],
      ["Canary", "20 % → 50 % → 100 %"],
    ],
    repo: `${REPO}/devops-01-plataforma-entrega`,
  },
];
