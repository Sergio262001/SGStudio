// Estado compartido entre el panel y el informe. Se guarda en el navegador si está disponible.
import { DEFAULTS, clampParams, simulate, summarize } from "./model.js";

const KEY = "ux02-panel-escenarios";
export const NOMBRES = ["A", "B", "C"];
export const state = { params: { ...DEFAULTS }, saved: [], metric: "acumulado", view: "chart", cursor: null };

export function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (raw?.params) state.params = clampParams(raw.params);
    if (Array.isArray(raw?.saved)) {
      state.saved = raw.saved
        .filter((s) => NOMBRES.includes(s?.name))
        .slice(0, 3)
        .map((s) => ({ name: s.name, params: clampParams(s.params) }));
    }
  } catch { /* sin almacenamiento: la página funciona igual */ }
}

export function persist() {
  try { localStorage.setItem(KEY, JSON.stringify({ params: state.params, saved: state.saved })); } catch { /* ignorar */ }
}

// Escenario actual + guardados, ya simulados y resumidos.
export function escenarios() {
  const lista = [{ name: "Actual", params: clampParams(state.params) }, ...state.saved];
  return lista.map((s) => {
    const rows = simulate(s.params);
    return { ...s, saved: s.name !== "Actual", rows, sum: summarize(rows, s.params) };
  });
}
