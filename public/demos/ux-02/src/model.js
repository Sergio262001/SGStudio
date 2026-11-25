// Modelo de simulación: sin DOM, para poder probarlo con node --test.
// Proyecta unidades mes a mes con crecimiento compuesto y un tope de capacidad.

export const PARAMS = Object.freeze({
  inicial:     { label: "Unidades iniciales",     min: 1,   max: 5000,   step: 1,   unit: "" },
  crecimiento: { label: "Crecimiento mensual",    min: 0,   max: 50,     step: 0.5, unit: "%" },
  margen:      { label: "Ingreso por unidad",     min: 1,   max: 1000,   step: 1,   unit: "$" },
  costoFijo:   { label: "Costo fijo mensual",     min: 0,   max: 100000, step: 100, unit: "$" },
  capacidad:   { label: "Capacidad máxima",       min: 10,  max: 50000,  step: 10,  unit: "" },
  meses:       { label: "Horizonte",              min: 3,   max: 120,    step: 1,   unit: "meses" },
});

export const DEFAULTS = Object.freeze({
  inicial: 100, crecimiento: 8, margen: 60, costoFijo: 4000, capacidad: 1500, meses: 24,
});

export const PRESETS = Object.freeze({
  Conservador: { inicial: 80,  crecimiento: 4,  margen: 55, costoFijo: 3500, capacidad: 1200, meses: 24 },
  Base:        { ...DEFAULTS },
  Agresivo:    { inicial: 150, crecimiento: 15, margen: 65, costoFijo: 7000, capacidad: 3000, meses: 24 },
});

// Fuerza cada parámetro a un número dentro de sus límites (los valores inválidos usan el valor por defecto).
export function clampParams(input) {
  const out = {};
  for (const [key, spec] of Object.entries(PARAMS)) {
    let n = Number(input?.[key]);
    if (!Number.isFinite(n)) n = DEFAULTS[key];
    n = Math.min(spec.max, Math.max(spec.min, n));
    out[key] = key === "meses" || key === "inicial" ? Math.round(n) : n;
  }
  return out;
}

export function simulate(raw) {
  const p = clampParams(raw);
  const rows = [];
  let units = Math.min(p.capacidad, p.inicial);
  let acumulado = 0;
  for (let mes = 1; mes <= p.meses; mes++) {
    if (mes > 1) units = Math.min(p.capacidad, units * (1 + p.crecimiento / 100));
    const ingreso = units * p.margen;
    const neto = ingreso - p.costoFijo;
    acumulado += neto;
    rows.push({ mes, unidades: units, ingreso, neto, acumulado });
  }
  return rows;
}

export function summarize(rows, raw) {
  const p = clampParams(raw);
  const first = (pred) => rows.find(pred)?.mes ?? null;
  const last = rows[rows.length - 1];
  return {
    mesEquilibrio: first((r) => r.neto >= 0),
    mesCapacidad: first((r) => r.unidades >= p.capacidad),
    acumuladoFinal: last.acumulado,
    unidadesFinal: last.unidades,
    picoNeto: Math.max(...rows.map((r) => r.neto)),
  };
}

// Para cada métrica comparable devuelve el índice del mejor escenario (o null si hay empate total).
export function bestIndexes(summaries) {
  const pick = (values, better) => {
    let best = null;
    values.forEach((v, i) => {
      if (v === null) return;
      if (best === null || better(v, values[best])) best = i;
    });
    const ties = values.filter((v) => v !== null && v === values[best]).length;
    return best !== null && ties < values.length ? best : null;
  };
  return {
    acumuladoFinal: pick(summaries.map((s) => s.acumuladoFinal), (a, b) => a > b),
    unidadesFinal: pick(summaries.map((s) => s.unidadesFinal), (a, b) => a > b),
    mesEquilibrio: pick(summaries.map((s) => s.mesEquilibrio), (a, b) => a < b),
  };
}

// Escala "bonita" para ejes: devuelve { min, max, ticks }.
export function niceScale(lo, hi, count = 5) {
  if (lo === hi) { hi = lo + 1; }
  const rawStep = (hi - lo) / Math.max(1, count - 1);
  const mag = 10 ** Math.floor(Math.log10(rawStep));
  const norm = rawStep / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10) * mag;
  const min = Math.floor(lo / step) * step;
  const max = Math.ceil(hi / step) * step;
  const ticks = [];
  for (let v = min; v <= max + step / 2; v += step) ticks.push(Math.round(v / step) * step);
  return { min, max, ticks };
}
