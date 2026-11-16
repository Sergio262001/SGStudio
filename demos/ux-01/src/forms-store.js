// Formularios guardados por la persona. Usa el almacenamiento del navegador si está disponible,
// y si no (modo privado, iframe sin permisos), funciona igual en memoria durante la visita.
const KEY = "formix-formularios";
let memory = [];

function read() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (Array.isArray(v)) memory = v;
  } catch { /* sin almacenamiento */ }
  return memory;
}

function write(all) {
  memory = all;
  try { localStorage.setItem(KEY, JSON.stringify(all)); } catch { /* sin almacenamiento */ }
}

export const newId = () => `f${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export function listForms() {
  return read().slice().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getForm(id) {
  return read().find((f) => f.id === id) ?? null;
}

export function saveForm({ id, name, fields }) {
  const all = read().slice();
  const record = { id: id ?? newId(), name: name.trim() || "Formulario sin título", fields, updatedAt: Date.now() };
  const i = all.findIndex((f) => f.id === record.id);
  if (i >= 0) all[i] = record;
  else all.push(record);
  write(all);
  return record;
}

export function deleteForm(id) {
  const all = read();
  const removed = all.find((f) => f.id === id) ?? null;
  write(all.filter((f) => f.id !== id));
  return removed;
}

export function restoreForm(record) {
  if (record) write([...read().filter((f) => f.id !== record.id), record]);
}
