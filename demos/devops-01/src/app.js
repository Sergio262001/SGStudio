// Interfaz del simulador: reproduce la línea de tiempo del motor con animaciones.
import { STAGES, ESCENARIOS, UMBRAL, CHEQUEOS, simular } from "./pipeline.js";

const $ = (s) => document.querySelector(s);
const ICONO = { pendiente: "", curso: "", ok: "✓", falla: "✕", omitida: "–" };
const ESTADO_TXT = { pendiente: "pendiente", curso: "en curso", ok: "superada", falla: "falló", omitida: "omitida" };

// Dentro del portafolio (iframe) el enlace «← Portafolio» sobra: el visor ya tiene su botón de volver.
if (window.self !== window.top) document.querySelectorAll("[data-solo-fuera]").forEach((el) => (el.hidden = true));

let velocidad = 1;
let corrida = 0; // identifica la ejecución actual para cancelar temporizadores viejos
let timers = [];
let muestras = { errores: [], latencia: [] };
let inicio = 0;

// ---------- Construcción inicial ----------

$("#escenarios").innerHTML = Object.entries(ESCENARIOS)
  .map(([id, e], i) => `
    <label class="esc">
      <input type="radio" name="escenario" value="${id}" ${i === 0 ? "checked" : ""} />
      <span><strong>${e.nombre}</strong><small>${e.descripcion}</small></span>
    </label>`)
  .join("");

function pintarPipeline() {
  $("#pipeline").innerHTML = STAGES.map((s, i) => `
    <li class="stage" id="st-${s.id}" data-estado="pendiente" aria-label="${i + 1}. ${s.nombre}: pendiente">
      <span class="ico" aria-hidden="true"></span>
      <strong>${s.nombre}</strong>
      <small>${s.detalle}</small>
    </li>`).join("");
}

// ---------- Actualizaciones ----------

function etapa(id, estado) {
  const el = $(`#st-${id}`);
  const s = STAGES.find((x) => x.id === id);
  el.dataset.estado = estado;
  el.querySelector(".ico").textContent = ICONO[estado];
  el.setAttribute("aria-label", `${STAGES.indexOf(s) + 1}. ${s.nombre}: ${ESTADO_TXT[estado]}`);
}

function trafico(canary) {
  $("#bar-canary").style.flexBasis = `${canary}%`;
  $("#bar-stable").style.flexBasis = `${100 - canary}%`;
  $("#traffic-text").textContent =
    canary === 0 ? "100 % en v1.3 (estable)" : canary === 100 ? "100 % en v1.4 (nueva)" : `${100 - canary} % en v1.3 · ${canary} % en v1.4`;
}

function spark(id, valores, max, limite) {
  const svg = $(`#${id} .spark`);
  const y = (v) => 36 - Math.min(1, v / max) * 34 - 1;
  svg.querySelector(".limit").setAttribute("y1", y(limite));
  svg.querySelector(".limit").setAttribute("y2", y(limite));
  const n = Math.max(2, valores.length);
  svg.querySelector("polyline").setAttribute("points", valores.map((v, i) => `${(i / (n - 1)) * 120},${y(v)}`).join(" "));
}

function metrica({ errores, latencia }) {
  muestras.errores.push(errores);
  muestras.latencia.push(latencia);
  $("#v-err").textContent = `${errores.toLocaleString("es")} %`;
  $("#v-lat").textContent = `${latencia} ms`;
  $("#m-err").classList.toggle("alto", errores >= UMBRAL.errores);
  $("#m-lat").classList.toggle("alto", latencia >= UMBRAL.latencia);
  spark("m-err", muestras.errores, 8, UMBRAL.errores);
  spark("m-lat", muestras.latencia, 600, UMBRAL.latencia);
}

function log(texto, nivel, t) {
  const li = document.createElement("li");
  const seg = ((t - inicio) / 1000).toFixed(1);
  li.innerHTML = `<time>${seg}s</time><span class="${nivel}"></span>`;
  li.querySelector("span").textContent = texto;
  $("#log").append(li);
  $("#log").scrollTop = $("#log").scrollHeight;
}

function resultado(fin) {
  const box = $("#result");
  const txt = {
    exito: ["🚀", "v1.4 está en producción", "Pasó todas las capas de seguridad y llegó al 100 % de los usuarios de forma gradual."],
    rollback: ["↩", "Rollback automático", `El análisis detectó el fallo con solo el ${fin.expuestos} % del tráfico expuesto durante ${fin.duracionReal}. Nadie tuvo que intervenir.`],
    bloqueado: ["🛡", "Bloqueado antes de producción", `La etapa «${STAGES.find((s) => s.id === fin.etapa).nombre}» detuvo el cambio. Ningún usuario lo vio.`],
  }[fin.resultado];
  box.className = `result ${fin.resultado}`;
  box.innerHTML = `<span class="big-ico" aria-hidden="true">${txt[0]}</span><div><strong>${txt[1]}</strong><p>${txt[2]}</p></div>`;
  box.hidden = false;
}

// ---------- Ejecución ----------

function reiniciar() {
  corrida++;
  timers.forEach(clearTimeout);
  timers = [];
  muestras = { errores: [], latencia: [] };
  pintarPipeline();
  trafico(0);
  $("#v-err").textContent = "—";
  $("#v-lat").textContent = "—";
  $("#m-err").classList.remove("alto");
  $("#m-lat").classList.remove("alto");
  spark("m-err", [], 8, UMBRAL.errores);
  spark("m-lat", [], 600, UMBRAL.latencia);
  $("#checks").textContent = "Sin análisis en curso.";
  $("#log").innerHTML = "";
  $("#result").hidden = true;
}

function bloquear(activo) {
  $("#btn-run").disabled = activo;
  document.querySelectorAll('input[name="escenario"]').forEach((r) => (r.disabled = activo));
  $("#btn-run").textContent = activo ? "Desplegando…" : "▶ Desplegar de nuevo";
}

function desplegar() {
  reiniciar();
  const id = document.querySelector('input[name="escenario"]:checked').value;
  const eventos = simular(id, Math.floor(Math.random() * 1e6));
  const mia = corrida;
  inicio = 0;
  bloquear(true);

  for (const e of eventos) {
    timers.push(setTimeout(() => {
      if (mia !== corrida) return;
      switch (e.tipo) {
        case "etapa": etapa(e.etapa, e.estado); break;
        case "trafico": trafico(e.canary); break;
        case "metrica": metrica(e); break;
        case "chequeo":
          $("#checks").textContent = `Chequeo ${e.n} de ${CHEQUEOS}: ${e.ok ? "dentro del umbral ✓" : "fuera del umbral ✕"}`;
          break;
        case "log": log(e.texto, e.nivel, e.t); break;
        case "fin": resultado(e); bloquear(false); $("#result").focus?.(); break;
      }
    }, e.t / velocidad));
  }
}

// ---------- Eventos ----------

$("#btn-run").addEventListener("click", desplegar);
document.querySelectorAll("[data-speed]").forEach((b) =>
  b.addEventListener("click", () => {
    velocidad = Number(b.dataset.speed);
    document.querySelectorAll("[data-speed]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
  }),
);
document.addEventListener("change", (e) => {
  if (e.target.name === "escenario") {
    reiniciar();
    $("#btn-run").textContent = "▶ Desplegar v1.4";
  }
});

reiniciar();
