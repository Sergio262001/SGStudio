// Motor del simulador: genera la línea de tiempo de un despliegue (sin DOM, se prueba con node --test).
// Reproduce el flujo real del proyecto: CI → políticas → imagen firmada → Argo CD → canary con análisis.

export const STAGES = [
  { id: "commit", nombre: "Commit", detalle: "git push a main", dur: 700 },
  { id: "pruebas", nombre: "Pruebas", detalle: "Tests y lint", dur: 1400 },
  { id: "politicas", nombre: "Políticas", detalle: "Seguridad (OPA)", dur: 1000 },
  { id: "imagen", nombre: "Imagen", detalle: "Build + SBOM", dur: 1400 },
  { id: "firma", nombre: "Firma", detalle: "cosign", dur: 700 },
  { id: "gitops", nombre: "Argo CD", detalle: "Sincroniza", dur: 1000 },
  { id: "canary20", nombre: "Canary 20 %", detalle: "Analiza métricas", peso: 20, analisis: true },
  { id: "canary50", nombre: "Canary 50 %", detalle: "Analiza métricas", peso: 50, analisis: true },
  { id: "prod", nombre: "Producción", detalle: "100 % nueva versión", peso: 100, dur: 900 },
];

export const UMBRAL = { errores: 1, latencia: 300 }; // % de errores 5xx y p95 en ms
export const CHEQUEOS = 4; // chequeos por paso canary
export const LIMITE_FALLOS = 1; // se aborta al superar este número de chequeos fallidos
const INTERVALO = 650; // ms entre chequeos en la animación
export const SEGUNDOS_POR_CHEQUEO = 30; // equivalente real (interval: 30s en gitops/rollouts)

export function textoDuracion(seg) {
  if (seg < 60) return `${seg} segundos`;
  const min = seg / 60;
  return `${Number.isInteger(min) ? min : min.toFixed(1).replace(".", ",")} ${min === 1 ? "minuto" : "minutos"}`;
}

export const ESCENARIOS = {
  ok: {
    nombre: "Cambio correcto",
    descripcion: "Todo sale bien y llega a producción poco a poco.",
  },
  produccion: {
    nombre: "Error en producción",
    descripcion: "Pasa las pruebas, pero falla con tráfico real.",
    fallaEn: "canary20",
  },
  prueba: {
    nombre: "Prueba que falla",
    descripcion: "Un test detecta el error antes de construir.",
    fallaEn: "pruebas",
    mensaje: "1 de 6 pruebas falló: /readyz responde 500",
  },
  politica: {
    nombre: "Configuración insegura",
    descripcion: "Las políticas bloquean un contenedor como root.",
    fallaEn: "politicas",
    mensaje: "Bloqueado: el contenedor se ejecuta como root",
  },
};

// Generador pseudoaleatorio con semilla: mismas entradas → misma simulación (útil para pruebas).
export function rng(seed = 7) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const entre = (r, min, max) => min + r() * (max - min);
const redondear = (n, d = 2) => Math.round(n * 10 ** d) / 10 ** d;

function metrica(r, mala) {
  return mala
    ? { errores: redondear(entre(r, 2.2, 6.5)), latencia: Math.round(entre(r, 320, 520)) }
    : { errores: redondear(entre(r, 0.1, 0.6)), latencia: Math.round(entre(r, 110, 190)) };
}

/**
 * Devuelve la línea de tiempo de eventos: [{ t, tipo, ... }] ordenada por t (ms a velocidad normal).
 * Tipos: etapa (estado: curso|ok|falla|omitida), log, trafico, chequeo, metrica, fin.
 */
export function simular(escenarioId = "ok", semilla = 7) {
  const esc = ESCENARIOS[escenarioId] ?? ESCENARIOS.ok;
  const r = rng(semilla);
  const ev = [];
  let t = 0;
  const push = (e) => ev.push({ t, ...e });
  const log = (texto, nivel = "info") => push({ tipo: "log", texto, nivel });

  log(`Nuevo cambio: v1.4 · escenario «${esc.nombre}»`);

  for (let i = 0; i < STAGES.length; i++) {
    const s = STAGES[i];
    push({ tipo: "etapa", etapa: s.id, estado: "curso" });

    if (!s.analisis) {
      t += s.dur;
      if (esc.fallaEn === s.id) {
        push({ tipo: "etapa", etapa: s.id, estado: "falla" });
        log(esc.mensaje, "error");
        for (const resto of STAGES.slice(i + 1)) push({ tipo: "etapa", etapa: resto.id, estado: "omitida" });
        log("Nada llegó a producción. Los usuarios siguen en v1.3.", "ok");
        push({ tipo: "fin", resultado: "bloqueado", etapa: s.id, expuestos: 0 });
        return ev;
      }
      if (s.peso) push({ tipo: "trafico", canary: s.peso });
      push({ tipo: "etapa", etapa: s.id, estado: "ok" });
      log(mensajeOk(s.id));
      continue;
    }

    // Paso canary: mover tráfico y analizar métricas
    push({ tipo: "trafico", canary: s.peso });
    log(`${s.peso} % del tráfico pasa a v1.4. Analizando métricas…`);
    const mala = esc.fallaEn === s.id;
    let fallos = 0;
    for (let n = 1; n <= CHEQUEOS; n++) {
      t += INTERVALO;
      const m = metrica(r, mala);
      push({ tipo: "metrica", ...m });
      const ok = m.errores < UMBRAL.errores && m.latencia < UMBRAL.latencia;
      if (!ok) fallos++;
      push({ tipo: "chequeo", etapa: s.id, n, ok, ...m });
      if (fallos > LIMITE_FALLOS) {
        push({ tipo: "etapa", etapa: s.id, estado: "falla" });
        log(`Errores ${m.errores} % (máx. ${UMBRAL.errores} %) · p95 ${m.latencia} ms (máx. ${UMBRAL.latencia} ms)`, "error");
        log("Rollback automático: 100 % del tráfico vuelve a v1.3.", "warn");
        t += 400;
        push({ tipo: "trafico", canary: 0 });
        for (const resto of STAGES.slice(i + 1)) push({ tipo: "etapa", etapa: resto.id, estado: "omitida" });
        // En el proyecto real cada chequeo ocurre cada 30 s (interval del AnalysisTemplate).
        const duracionReal = textoDuracion(n * SEGUNDOS_POR_CHEQUEO);
        log(`Solo el ${s.peso} % de los usuarios vio el fallo, durante ${duracionReal} (tiempo real).`, "ok");
        push({ tipo: "fin", resultado: "rollback", etapa: s.id, expuestos: s.peso, duracionReal });
        return ev;
      }
    }
    push({ tipo: "etapa", etapa: s.id, estado: "ok" });
    log(`Análisis superado: ${CHEQUEOS - fallos} de ${CHEQUEOS} chequeos dentro del umbral.`);
  }

  log("v1.4 está en producción para el 100 % de los usuarios.", "ok");
  push({ tipo: "fin", resultado: "exito", etapa: "prod", expuestos: 100 });
  return ev;
}

function mensajeOk(id) {
  return {
    commit: "Cambio recibido en main.",
    pruebas: "6 de 6 pruebas superadas.",
    politicas: "Manifiestos seguros: sin root, con límites de memoria.",
    imagen: "Imagen construida y SBOM generado.",
    firma: "Imagen firmada: se despliega por digest.",
    gitops: "Argo CD aplicó el cambio desde git.",
    prod: "Despliegue completo.",
  }[id];
}

export const duracion = (eventos) => eventos[eventos.length - 1].t;
