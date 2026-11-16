// Lógica pura del constructor: sin DOM, para poder probarla con node --test.

export const FIELD_TYPES = Object.freeze({
  text: "Texto",
  number: "Número",
  select: "Lista",
  checkbox: "Casilla",
});

export const OPERATORS = Object.freeze({
  equals: "es igual a",
  notEquals: "es distinto de",
  filled: "tiene valor",
});

export function newField(type, id) {
  const field = { id, type, label: `${FIELD_TYPES[type]} ${id}`, required: false, rule: null };
  if (type === "select") field.options = ["Opción 1", "Opción 2"];
  if (type === "number") Object.assign(field, { min: null, max: null });
  if (type === "text") field.minLength = null;
  return field;
}

function isEmpty(value) {
  return value === undefined || value === null || value === "" || value === false;
}

function ruleMatches(rule, value) {
  if (rule.op === "filled") return !isEmpty(value);
  const same = String(value ?? "") === String(rule.value ?? "");
  return rule.op === "notEquals" ? !same : same;
}

// Un campo es visible si no tiene regla o si su regla se cumple.
// Si el campo origen está oculto, su valor se ignora. Los ciclos no se quedan en bucle.
export function isVisible(field, fields, values, path = new Set()) {
  if (!field.rule) return true;
  const source = fields.find((f) => f.id === field.rule.fieldId);
  if (!source) return true; // regla huérfana: se ignora
  if (path.has(field.id)) return true; // ciclo: se corta aquí
  path.add(field.id);
  const sourceVisible = isVisible(source, fields, values, path);
  path.delete(field.id);
  return ruleMatches(field.rule, sourceVisible ? values[source.id] : undefined);
}

export function visibleIds(fields, values) {
  return new Set(fields.filter((f) => isVisible(f, fields, values)).map((f) => f.id));
}

// Devuelve los ids de campos que forman parte de un ciclo de reglas (incluye autorreferencia).
export function detectCycles(fields) {
  const inCycle = [];
  for (const start of fields) {
    const seen = new Set();
    let current = start;
    while (current?.rule) {
      const next = fields.find((f) => f.id === current.rule.fieldId);
      if (!next) break;
      if (next.id === start.id) {
        inCycle.push(start.id);
        break;
      }
      if (seen.has(next.id)) break;
      seen.add(next.id);
      current = next;
    }
  }
  return inCycle;
}

// Valida solo los campos visibles. Devuelve { idCampo: mensaje }.
export function validate(fields, values) {
  const errors = {};
  const visible = visibleIds(fields, values);
  for (const f of fields) {
    if (!visible.has(f.id)) continue;
    const v = values[f.id];
    if (f.required && isEmpty(v)) {
      errors[f.id] = f.type === "checkbox" ? "Debes marcar esta casilla." : "Este campo es obligatorio.";
      continue;
    }
    if (isEmpty(v)) continue;
    if (f.type === "number") {
      const n = Number(v);
      if (Number.isNaN(n)) errors[f.id] = "Ingresa un número válido.";
      else if (f.min != null && n < f.min) errors[f.id] = `El mínimo es ${f.min}.`;
      else if (f.max != null && n > f.max) errors[f.id] = `El máximo es ${f.max}.`;
    } else if (f.type === "text" && f.minLength && String(v).length < f.minLength) {
      errors[f.id] = `Escribe al menos ${f.minLength} caracteres.`;
    } else if (f.type === "select" && !f.options.includes(v)) {
      errors[f.id] = "Elige una opción de la lista.";
    }
  }
  return errors;
}

// ---- Operaciones sobre la lista (puras: devuelven una lista nueva) ----

export function insertField(fields, field, index = fields.length) {
  const next = fields.slice();
  next.splice(Math.max(0, Math.min(index, next.length)), 0, field);
  return next;
}

export function moveField(fields, id, toIndex) {
  const from = fields.findIndex((f) => f.id === id);
  if (from === -1) return fields;
  const next = fields.slice();
  const [item] = next.splice(from, 1);
  next.splice(Math.max(0, Math.min(toIndex, next.length)), 0, item);
  return next;
}

// Al borrar un campo, las reglas que dependían de él se quitan.
export function removeField(fields, id) {
  return fields
    .filter((f) => f.id !== id)
    .map((f) => (f.rule?.fieldId === id ? { ...f, rule: null } : f));
}

// ---- Historial deshacer / rehacer ----

export class History {
  #past = [];
  #future = [];
  #current;

  constructor(initial) {
    this.#current = structuredClone(initial);
  }

  get current() {
    return structuredClone(this.#current);
  }
  get canUndo() {
    return this.#past.length > 0;
  }
  get canRedo() {
    return this.#future.length > 0;
  }

  push(next) {
    this.#past.push(this.#current);
    if (this.#past.length > 100) this.#past.shift();
    this.#current = structuredClone(next);
    this.#future = [];
  }

  undo() {
    if (this.canUndo) {
      this.#future.push(this.#current);
      this.#current = this.#past.pop();
    }
    return this.current;
  }

  redo() {
    if (this.canRedo) {
      this.#past.push(this.#current);
      this.#current = this.#future.pop();
    }
    return this.current;
  }
}
