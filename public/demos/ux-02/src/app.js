import { PARAMS, DEFAULTS, PRESETS, clampParams, simulate, summarize, bestIndexes, niceScale } from "./model.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
// useGrouping "always": en español, Intl omite el separador en números de 4 cifras (1200); así se ve 1.200.
const int = new Intl.NumberFormat("es", { maximumFractionDigits: 0, useGrouping: "always" });
const dec = new Intl.NumberFormat("es", { maximumFractionDigits: 1, useGrouping: "always" });
const compact = new Intl.NumberFormat("es", { notation: "compact", maximumFractionDigits: 1 });
const money = (n) => `${n < 0 ? "−" : ""}$${int.format(Math.abs(n))}`;
const moneyShort = (n) => `${n < 0 ? "−" : ""}$${compact.format(Math.abs(n))}`;

const METRICS = {
  acumulado: { label: "Acumulado", get: (r) => r.acumulado, fmt: money, axis: moneyShort },
  neto: { label: "Neto mensual", get: (r) => r.neto, fmt: money, axis: moneyShort },
  unidades: { label: "Unidades", get: (r) => r.unidades, fmt: (n) => int.format(n), axis: (n) => compact.format(n) },
};

// Cada serie se distingue por color y por patrón de línea (no solo por color).
const STYLES = [
  { name: "Actual", color: "var(--s-actual)", dash: "", width: 3.2 },
  { name: "A", color: "var(--s-a)", dash: "9 5", width: 2.6 },
  { name: "B", color: "var(--s-b)", dash: "2 5", width: 2.8 },
  { name: "C", color: "var(--s-c)", dash: "12 4 2 4", width: 2.6 },
];

const KEY = "ux02-panel-escenarios";
const state = { params: { ...DEFAULTS }, saved: [], metric: "acumulado", view: "chart", cursor: null };

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (raw?.params) state.params = clampParams(raw.params);
    if (Array.isArray(raw?.saved)) {
      state.saved = raw.saved
        .filter((s) => ["A", "B", "C"].includes(s?.name))
        .slice(0, 3)
        .map((s) => ({ name: s.name, params: clampParams(s.params) }));
    }
  } catch { /* sin almacenamiento: la página funciona igual */ }
}
function persist() {
  try { localStorage.setItem(KEY, JSON.stringify({ params: state.params, saved: state.saved })); } catch { /* ignorar */ }
}

const statusEl = $("#status");
function say(msg) { statusEl.textContent = ""; requestAnimationFrame(() => (statusEl.textContent = msg)); }

// ---------- Parámetros ----------

function buildParams() {
  $("#params").innerHTML = Object.entries(PARAMS)
    .map(([key, s]) => `
      <div class="param">
        <div class="param-head">
          <label for="n-${key}">${s.label}</label>
          <span class="unit">${s.unit}</span>
        </div>
        <div class="param-row">
          <input type="range" id="r-${key}" data-param="${key}" min="${s.min}" max="${s.max}" step="${s.step}"
            aria-label="${s.label} (deslizador)" />
          <input type="number" id="n-${key}" data-param="${key}" min="${s.min}" max="${s.max}" step="${s.step}" inputmode="decimal" />
        </div>
      </div>`)
    .join("");
  $("#presets").innerHTML = Object.keys(PRESETS).map((n) => `<button type="button" data-preset="${n}">${n}</button>`).join("");
  $("#metrics").innerHTML = Object.entries(METRICS)
    .map(([k, m]) => `<button type="button" data-metric="${k}" aria-pressed="${k === state.metric}">${m.label}</button>`)
    .join("");
  syncInputs();
}

function syncInputs(except) {
  for (const key of Object.keys(PARAMS)) {
    for (const input of $$(`[data-param="${key}"]`)) if (input !== except) input.value = state.params[key];
  }
}

// ---------- Cálculo y dibujo ----------

let scheduled = false;
function schedule() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => { scheduled = false; update(); });
}

function allSeries() {
  const current = state.params;
  const rows = simulate(current);
  const list = [{ name: "Actual", style: STYLES[0], params: clampParams(current), rows, sum: summarize(rows, current) }];
  for (const s of state.saved) {
    const r = simulate(s.params);
    list.push({ name: s.name, style: STYLES[["A", "B", "C"].indexOf(s.name) + 1], params: s.params, rows: r, sum: summarize(r, s.params), saved: true });
  }
  return list;
}

let series = [];
function update() {
  series = allSeries();
  renderKpis(series[0].sum);
  renderLegend();
  renderMain();
  renderCompare();
  const full = state.saved.length >= 3;
  $("#btn-save").disabled = full;
  $("#save-hint").textContent = full ? "Ya hay 3 escenarios guardados. Elimina uno para guardar otro." : `Guardados: ${state.saved.length} de 3.`;
}

function renderKpis(sum) {
  const cards = [
    ["Mes de equilibrio", sum.mesEquilibrio ? `Mes ${sum.mesEquilibrio}` : "Fuera del horizonte", false],
    ["Llega a capacidad", sum.mesCapacidad ? `Mes ${sum.mesCapacidad}` : "No llega", false],
    ["Acumulado final", money(sum.acumuladoFinal), sum.acumuladoFinal < 0],
    ["Unidades finales", int.format(sum.unidadesFinal), false],
  ];
  $("#kpis").innerHTML = cards
    .map(([k, v, neg]) => `<div class="kpi"><div class="k">${k}</div><div class="v ${neg ? "neg" : ""}">${v}</div></div>`)
    .join("");
}

function legendSwatch(style) {
  return `<svg viewBox="0 0 36 10" aria-hidden="true"><line x1="1" y1="5" x2="35" y2="5" style="stroke:${style.color}" stroke-width="${style.width}" stroke-dasharray="${style.dash}" stroke-linecap="round"/></svg>`;
}

function renderLegend() {
  $("#legend").innerHTML = series
    .map((s) => `<span class="legend-item">${legendSwatch(s.style)}${s.saved ? `Escenario ${s.name}` : "Actual"}</span>`)
    .join("");
}

function renderMain() {
  $$("[data-view]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.view === state.view)));
  $$("[data-metric]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.metric === state.metric)));
  if (state.view === "table") {
    $("#chart-wrap").innerHTML = tableHTML();
    $("#readout").textContent = "";
  } else {
    $("#chart-wrap").innerHTML = chartHTML();
    updateCursor();
  }
}

// ---------- Gráfico ----------

const W = 760, H = 340, L = 64, R = 16, T = 14, B = 38;
let ctx = null;

function chartHTML() {
  const m = METRICS[state.metric];
  const maxMes = Math.max(...series.map((s) => s.rows.length));
  const values = series.flatMap((s) => s.rows.map(m.get));
  const { min, max, ticks } = niceScale(Math.min(0, ...values), Math.max(0, ...values));
  const x = (mes) => L + ((mes - 1) / Math.max(1, maxMes - 1)) * (W - L - R);
  const y = (v) => T + (1 - (v - min) / (max - min)) * (H - T - B);
  ctx = { maxMes, x, y, m };

  const step = maxMes <= 12 ? 1 : maxMes <= 36 ? 3 : maxMes <= 60 ? 6 : 12;
  const xTicks = [];
  for (let mes = 1; mes <= maxMes; mes++) if (mes === 1 || mes % step === 0) xTicks.push(mes);

  const grid = ticks
    .map((t) => `<line class="gridline" x1="${L}" x2="${W - R}" y1="${y(t)}" y2="${y(t)}"/><text x="${L - 8}" y="${y(t) + 4}" text-anchor="end">${m.axis(t)}</text>`)
    .join("");
  const xAxis = xTicks
    .map((t) => `<line class="axis" x1="${x(t)}" x2="${x(t)}" y1="${H - B}" y2="${H - B + 5}"/><text x="${x(t)}" y="${H - B + 20}" text-anchor="middle">${t}</text>`)
    .join("");
  const lines = [...series].reverse() // "Actual" se dibuja al final, encima de las demás
    .map((s) => {
      const pts = s.rows.map((r) => `${x(r.mes).toFixed(1)},${y(m.get(r)).toFixed(1)}`).join(" ");
      return `<polyline points="${pts}" fill="none" style="stroke:${s.style.color}" stroke-width="${s.style.width}" stroke-dasharray="${s.style.dash}" stroke-linejoin="round" stroke-linecap="round"/>`;
    })
    .join("");

  return `
    <svg class="chart" id="chart" viewBox="0 0 ${W} ${H}" role="img" tabindex="0"
         aria-labelledby="c-title c-desc">
      <title id="c-title">${m.label} por mes</title>
      <desc id="c-desc">Gráfico de líneas con ${series.length} ${series.length === 1 ? "serie" : "series"}. Con el gráfico enfocado, usa las flechas izquierda y derecha para leer los valores de cada mes. La vista Tabla muestra los mismos datos.</desc>
      ${grid}
      <line class="axis" x1="${L}" x2="${W - R}" y1="${y(0)}" y2="${y(0)}"/>
      <line class="axis" x1="${L}" x2="${L}" y1="${T}" y2="${H - B}"/>
      ${xAxis}
      <text x="${(L + W - R) / 2}" y="${H - 4}" text-anchor="middle">Mes</text>
      ${lines}
      <g id="cursor-g"></g>
    </svg>`;
}

function updateCursor() {
  const g = $("#cursor-g");
  const readout = $("#readout");
  if (!g || !ctx) return;
  if (state.cursor === null) {
    g.innerHTML = "";
    readout.textContent = "Pasa el puntero por el gráfico, o enfócalo y usa ← → para ver los valores de cada mes.";
    return;
  }
  const { x, y, m, maxMes } = ctx;
  const mes = Math.min(maxMes, Math.max(1, state.cursor));
  const dots = series
    .map((s) => s.rows[mes - 1])
    .map((r, i) => (r ? `<circle cx="${x(mes)}" cy="${y(m.get(r))}" r="5" style="stroke:${series[i].style.color}" fill="var(--bg)" stroke-width="2.5"/>` : ""))
    .join("");
  g.innerHTML = `<line class="cursor" x1="${x(mes)}" x2="${x(mes)}" y1="${T}" y2="${H - B}"/>${dots}`;
  readout.innerHTML =
    `<b>Mes ${mes}</b> · ` +
    series.map((s) => `${s.saved ? "Escenario " + s.name : "Actual"}: ${s.rows[mes - 1] ? m.fmt(m.get(s.rows[mes - 1])) : "—"}`).join(" · ");
}

function tableHTML() {
  const m = METRICS[state.metric];
  const maxMes = Math.max(...series.map((s) => s.rows.length));
  const head = series.map((s) => `<th scope="col">${s.saved ? "Escenario " + s.name : "Actual"}</th>`).join("");
  const body = Array.from({ length: maxMes }, (_, i) =>
    `<tr><th scope="row">Mes ${i + 1}</th>${series.map((s) => `<td>${s.rows[i] ? m.fmt(m.get(s.rows[i])) : "—"}</td>`).join("")}</tr>`).join("");
  return `<div class="scroll"><table><caption class="sr-only">${m.label} por mes</caption><thead><tr><th scope="col">Mes</th>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}

// ---------- Comparación ----------

function renderCompare() {
  const best = bestIndexes(series.map((s) => s.sum));
  const head = series
    .map((s) => `<th scope="col">${s.saved ? `Escenario ${s.name}<button type="button" class="del" data-del="${s.name}" aria-label="Eliminar escenario ${s.name}">✕</button>` : "Actual"}</th>`)
    .join("");

  const row = (label, cells, bestIdx = null) =>
    `<tr><th scope="row">${label}</th>${cells.map((c, i) => `<td class="${bestIdx === i ? "best" : ""}">${c}${bestIdx === i ? '<span class="sr-only"> (mejor)</span>' : ""}</td>`).join("")}</tr>`;
  const mesOrNo = (v, no) => (v ? `Mes ${v}` : no);

  const rows = [
    row("Mes de equilibrio", series.map((s) => mesOrNo(s.sum.mesEquilibrio, "Fuera del horizonte")), best.mesEquilibrio),
    row("Llega a capacidad", series.map((s) => mesOrNo(s.sum.mesCapacidad, "No llega"))),
    row("Acumulado final", series.map((s) => money(s.sum.acumuladoFinal)), best.acumuladoFinal),
    row("Unidades finales", series.map((s) => int.format(s.sum.unidadesFinal)), best.unidadesFinal),
    row("Pico neto mensual", series.map((s) => money(s.sum.picoNeto))),
    ...Object.entries(PARAMS).map(([k, spec]) =>
      row(`<span style="color:var(--soft)">${spec.label}</span>`, series.map((s) => `${dec.format(s.params[k])}${spec.unit === "%" ? "%" : ""}`))),
  ].join("");

  $("#compare").innerHTML = series.length === 1
    ? `<p class="empty">Guarda el escenario actual (botón «Guardar escenario») y cambia los parámetros para compararlos aquí.</p>
       <table><thead><tr><th scope="col">Métrica</th>${head}</tr></thead><tbody>${rows}</tbody></table>`
    : `<table><caption class="sr-only">Comparación de escenarios. Las celdas con ★ son las mejores de su fila.</caption><thead><tr><th scope="col">Métrica</th>${head}</tr></thead><tbody>${rows}</tbody></table>`;
}

// ---------- Eventos ----------

$("#params").addEventListener("input", (e) => {
  const key = e.target.dataset.param;
  if (!key) return;
  const n = Number(e.target.value);
  if (e.target.value === "" || !Number.isFinite(n)) return; // mientras se escribe, no se pisa el valor
  state.params[key] = n;
  syncInputs(e.target);
  schedule();
});

// Al salir del campo numérico, se corrige al rango permitido.
$("#params").addEventListener("change", () => {
  state.params = clampParams(state.params);
  syncInputs();
  persist();
  schedule();
});

document.addEventListener("click", (e) => {
  const preset = e.target.closest("[data-preset]");
  if (preset) {
    state.params = clampParams(PRESETS[preset.dataset.preset]);
    syncInputs(); persist(); update();
    say(`Parámetros del escenario ${preset.dataset.preset}`);
    return;
  }
  const metric = e.target.closest("[data-metric]");
  if (metric) { state.metric = metric.dataset.metric; renderMain(); return; }
  const view = e.target.closest("[data-view]");
  if (view) { state.view = view.dataset.view; renderMain(); return; }
  const del = e.target.closest("[data-del]");
  if (del) {
    state.saved = state.saved.filter((s) => s.name !== del.dataset.del);
    persist(); update();
    say(`Escenario ${del.dataset.del} eliminado`);
    $("#btn-save").focus();
  }
});

$("#btn-save").addEventListener("click", () => {
  const name = ["A", "B", "C"].find((n) => !state.saved.some((s) => s.name === n));
  if (!name) return;
  state.saved.push({ name, params: clampParams(state.params) });
  persist(); update();
  say(`Escenario ${name} guardado`);
});

$("#btn-reset").addEventListener("click", () => {
  state.params = { ...DEFAULTS };
  syncInputs(); persist(); update();
  say("Parámetros restablecidos");
});

// Cursor del gráfico: puntero y teclado
document.addEventListener("pointermove", (e) => {
  const svg = e.target.closest?.("#chart");
  if (!svg || !ctx) return;
  const rect = svg.getBoundingClientRect();
  const px = ((e.clientX - rect.left) / rect.width) * W;
  const mes = Math.round(1 + ((px - L) / (W - L - R)) * (ctx.maxMes - 1));
  state.cursor = Math.min(ctx.maxMes, Math.max(1, mes));
  updateCursor();
});

document.addEventListener("pointerleave", (e) => {
  if (e.target.closest?.("#chart") && document.activeElement?.id !== "chart") { state.cursor = null; updateCursor(); }
}, true);

document.addEventListener("keydown", (e) => {
  if (e.target.id !== "chart" || !ctx) return;
  const keys = { ArrowLeft: -1, ArrowRight: 1 };
  if (e.key in keys) {
    e.preventDefault();
    state.cursor = Math.min(ctx.maxMes, Math.max(1, (state.cursor ?? 0) + keys[e.key]));
  } else if (e.key === "Home") { e.preventDefault(); state.cursor = 1; }
  else if (e.key === "End") { e.preventDefault(); state.cursor = ctx.maxMes; }
  else return;
  updateCursor();
});

load();
buildParams();
update();
