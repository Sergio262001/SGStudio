import {
  FIELD_TYPES, OPERATORS, newField, visibleIds, detectCycles, validate,
  insertField, moveField, removeField, History,
} from "./rules.js";
import { TEMPLATES } from "./templates.js";
import { saveForm } from "./forms-store.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Formulario inicial: la plantilla de atención al cliente (demuestra reglas encadenadas).
let history = new History(TEMPLATES[0].fields);
let fields = history.current;
let seq = 0;
const ui = {
  mode: "build", selectedId: null, device: "desktop", values: {}, errors: {}, submitted: false, focus: null,
  formId: null, formName: TEMPLATES[0].nombre,
};

const main = $("#main");
const statusEl = $("#status");

// ---------- API para el resto del sitio (plantillas, mis formularios) ----------

export function loadForm({ fields: next, name, id = null, mode = "build" }) {
  history = new History(next);
  fields = history.current;
  Object.assign(ui, { mode, selectedId: null, values: {}, errors: {}, submitted: false, formId: id, formName: name });
  seq = 0;
  render();
}

export function refresh() {
  render();
}

export function say(message) {
  statusEl.textContent = "";
  requestAnimationFrame(() => (statusEl.textContent = message));
}

const labelOf = (id) => fields.find((f) => f.id === id)?.label ?? id;

// ---------- Estado ----------

function commit(next, { props = false, message } = {}) {
  history.push(next);
  fields = history.current;
  renderCanvas();
  if (props) renderProps();
  syncToolbar();
  if (message) say(message);
}

function undoRedo(direction) {
  if (direction === "undo" ? !history.canUndo : !history.canRedo) return;
  fields = direction === "undo" ? history.undo() : history.redo();
  if (!fields.some((f) => f.id === ui.selectedId)) ui.selectedId = null;
  ui.values = {};
  render();
  say(direction === "undo" ? "Cambio deshecho" : "Cambio rehecho");
}

function addField(type, index = fields.length) {
  let id;
  do id = `campo${++seq}`; while (fields.some((f) => f.id === id));
  const field = newField(type, id);
  ui.selectedId = id;
  commit(insertField(fields, field, index), { props: true, message: `Campo ${field.label} agregado` });
}

function move(id, delta) {
  const from = fields.findIndex((f) => f.id === id);
  const to = from + delta;
  if (from === -1 || to < 0 || to >= fields.length) return;
  ui.focus = `[data-action="${delta < 0 ? "up" : "down"}"][data-id="${id}"]`;
  commit(moveField(fields, id, to), { message: `${labelOf(id)} movido a la posición ${to + 1} de ${fields.length}` });
}

function defaultRuleValue(source) {
  if (source?.type === "select") return source.options[0] ?? "";
  if (source?.type === "checkbox") return "true";
  return "";
}

function setProp(path, raw, el) {
  const target = fields.find((f) => f.id === ui.selectedId);
  if (!target) return;
  const next = structuredClone(fields);
  const t = next.find((f) => f.id === target.id);
  const num = (v) => (v === "" || Number.isNaN(Number(v)) ? null : Number(v));
  let rerender = false;

  switch (path) {
    case "label": t.label = raw.trim() || t.label; break;
    case "required": t.required = el.checked; break;
    case "min": case "max": t[path] = num(raw); break;
    case "minLength": { const n = num(raw); t.minLength = n === null ? null : Math.max(0, Math.floor(n)); break; }
    case "options":
      t.options = raw.split("\n").map((s) => s.trim()).filter(Boolean);
      if (!t.options.length) t.options = ["Opción 1"];
      break;
    case "rule.fieldId":
      rerender = true;
      t.rule = raw ? { fieldId: raw, op: t.rule?.op ?? "equals", value: defaultRuleValue(next.find((f) => f.id === raw)) } : null;
      break;
    case "rule.op": rerender = true; t.rule.op = raw; break;
    case "rule.value": t.rule.value = raw; break;
  }
  commit(next, { props: rerender || path === "options", message: "Propiedad actualizada" });
}

// ---------- Vista: construir ----------

function render() {
  $$('[data-action="mode"]').forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === ui.mode)));
  if (ui.mode === "build") renderBuild();
  else renderRun();
  syncToolbar();
  if (ui.focus) {
    $(ui.focus)?.focus();
    ui.focus = null;
  }
}

function syncToolbar() {
  $("#btn-undo").disabled = !history.canUndo;
  $("#btn-redo").disabled = !history.canRedo;
  const name = $("#form-name");
  if (name && document.activeElement !== name) name.value = ui.formName;
}

function saveCurrent() {
  const record = saveForm({ id: ui.formId, name: $("#form-name")?.value ?? ui.formName, fields });
  ui.formId = record.id;
  ui.formName = record.name;
  syncToolbar();
  say(`«${record.name}» guardado en Mis formularios`);
  const btn = $("#btn-save");
  if (btn) {
    btn.textContent = "✓ Guardado";
    setTimeout(() => (btn.textContent = "Guardar"), 1600);
  }
}

function renderBuild() {
  main.innerHTML = `
    <div class="build-grid">
      <section class="panel" aria-labelledby="h-pal">
        <h2 id="h-pal">Campos</h2>
        <div class="palette">
          ${Object.entries(FIELD_TYPES)
            .map(([t, l]) => `<button type="button" draggable="true" data-action="add" data-type="${t}">+ ${l}</button>`)
            .join("")}
        </div>
        <p class="hint">Haz clic para agregar, o arrastra al formulario.</p>
      </section>
      <section class="panel" aria-labelledby="h-can" id="canvas-panel"></section>
      <section class="panel" aria-labelledby="h-prop" id="props-panel"></section>
    </div>`;
  renderCanvas();
  renderProps();
}

function renderCanvas() {
  const panel = $("#canvas-panel");
  if (!panel) return;
  const cycles = new Set(detectCycles(fields));
  const cards = fields
    .map((f, i) => {
      const selected = f.id === ui.selectedId;
      return `
      <li class="field-card" draggable="true" data-id="${esc(f.id)}" aria-current="${selected}">
        <div class="field-head">
          <button type="button" class="field-title" data-action="select" data-id="${esc(f.id)}"
            aria-label="Editar ${esc(f.label)}, ${FIELD_TYPES[f.type]}, posición ${i + 1} de ${fields.length}">
            ${esc(f.label)}
          </button>
          <div class="field-tools">
            <button type="button" data-action="up" data-id="${esc(f.id)}" aria-label="Subir ${esc(f.label)}" ${i === 0 ? "disabled" : ""}>↑</button>
            <button type="button" data-action="down" data-id="${esc(f.id)}" aria-label="Bajar ${esc(f.label)}" ${i === fields.length - 1 ? "disabled" : ""}>↓</button>
            <button type="button" class="danger" data-action="remove" data-id="${esc(f.id)}" aria-label="Eliminar ${esc(f.label)}">✕</button>
          </div>
        </div>
        <div class="badges">
          <span class="badge">${FIELD_TYPES[f.type]}</span>
          ${f.required ? '<span class="badge">Obligatorio</span>' : ""}
          ${f.rule ? `<span class="badge cond">Solo si «${esc(labelOf(f.rule.fieldId))}» ${OPERATORS[f.rule.op]}${f.rule.op === "filled" ? "" : ` «${esc(f.rule.value)}»`}</span>` : ""}
          ${cycles.has(f.id) ? '<span class="badge warn">Ciclo de reglas</span>' : ""}
        </div>
      </li>`;
    })
    .join("");

  panel.innerHTML = `
    <h2 id="h-can">Formulario (${fields.length} ${fields.length === 1 ? "campo" : "campos"})</h2>
    <ul class="canvas" id="canvas" aria-label="Campos del formulario">
      ${cards || '<li class="empty">Aún no hay campos. Agrega uno desde la izquierda.</li>'}
    </ul>
    <p class="hint">Reordena arrastrando, o con los botones ↑ ↓ (también Alt + flechas).</p>`;
}

function ruleValueControl(source, rule) {
  const attrs = 'id="p-rv" data-prop="rule.value"';
  if (source?.type === "select") {
    return `<select ${attrs}>${source.options.map((o) => `<option ${o === rule.value ? "selected" : ""}>${esc(o)}</option>`).join("")}</select>`;
  }
  if (source?.type === "checkbox") {
    return `<select ${attrs}><option value="true" ${rule.value === "true" ? "selected" : ""}>Marcada</option><option value="false" ${rule.value === "false" ? "selected" : ""}>Sin marcar</option></select>`;
  }
  return `<input type="text" ${attrs} value="${esc(rule.value)}" />`;
}

function renderProps() {
  const panel = $("#props-panel");
  if (!panel) return;
  const f = fields.find((x) => x.id === ui.selectedId);
  if (!f) {
    panel.innerHTML = '<h2 id="h-prop">Propiedades</h2><p class="hint">Selecciona un campo para editarlo.</p>';
    return;
  }
  const others = fields.filter((x) => x.id !== f.id);
  const source = f.rule && fields.find((x) => x.id === f.rule.fieldId);
  const inCycle = detectCycles(fields).includes(f.id);

  const specific =
    f.type === "number"
      ? `<div class="prop"><label for="p-min">Mínimo</label><input id="p-min" type="number" data-prop="min" value="${f.min ?? ""}" /></div>
         <div class="prop"><label for="p-max">Máximo</label><input id="p-max" type="number" data-prop="max" value="${f.max ?? ""}" /></div>`
      : f.type === "text"
        ? `<div class="prop"><label for="p-ml">Longitud mínima</label><input id="p-ml" type="number" min="0" data-prop="minLength" value="${f.minLength ?? ""}" /></div>`
        : f.type === "select"
          ? `<div class="prop"><label for="p-opt">Opciones (una por línea)</label><textarea id="p-opt" rows="4" data-prop="options">${esc(f.options.join("\n"))}</textarea></div>`
          : "";

  panel.innerHTML = `
    <h2 id="h-prop">Propiedades · ${FIELD_TYPES[f.type]}</h2>
    <div class="prop"><label for="p-label">Etiqueta</label><input id="p-label" type="text" data-prop="label" value="${esc(f.label)}" /></div>
    <div class="prop inline"><input id="p-req" type="checkbox" data-prop="required" ${f.required ? "checked" : ""} /><label for="p-req">Obligatorio</label></div>
    ${specific}
    <fieldset>
      <legend>Mostrar solo si…</legend>
      <div><label for="p-rf">Campo</label>
        <select id="p-rf" data-prop="rule.fieldId">
          <option value="">Siempre visible</option>
          ${others.map((o) => `<option value="${esc(o.id)}" ${f.rule?.fieldId === o.id ? "selected" : ""}>${esc(o.label)}</option>`).join("")}
        </select>
      </div>
      ${
        f.rule
          ? `<div><label for="p-ro">Condición</label>
               <select id="p-ro" data-prop="rule.op">${Object.entries(OPERATORS)
                 .map(([k, l]) => `<option value="${k}" ${f.rule.op === k ? "selected" : ""}>${l}</option>`)
                 .join("")}</select></div>
             ${f.rule.op === "filled" ? "" : `<div><label for="p-rv">Valor</label>${ruleValueControl(source, f.rule)}</div>`}`
          : ""
      }
      ${inCycle ? '<p class="note">Esta regla forma un ciclo con otros campos. Al simular se ignora.</p>' : ""}
    </fieldset>`;
}

// ---------- Vista: simular ----------

function controlHTML(f) {
  const v = ui.values[f.id];
  const c = `id="in-${esc(f.id)}" data-field="${esc(f.id)}" aria-describedby="err-${esc(f.id)}" ${f.required ? "required" : ""}`;
  if (f.type === "checkbox") return `<input type="checkbox" ${c} ${v ? "checked" : ""} />`;
  if (f.type === "select") {
    return `<select ${c}><option value="">Selecciona…</option>${f.options
      .map((o) => `<option ${o === v ? "selected" : ""}>${esc(o)}</option>`)
      .join("")}</select>`;
  }
  const min = f.type === "number" && f.min != null ? `min="${f.min}"` : "";
  const max = f.type === "number" && f.max != null ? `max="${f.max}"` : "";
  return `<input type="${f.type === "number" ? "number" : "text"}" ${c} ${min} ${max} value="${esc(v ?? "")}" />`;
}

function renderRun() {
  const visible = visibleIds(fields, ui.values);
  main.innerHTML = `
    <div class="sim-wrap">
      <div class="sim-stage">
        <form class="sim-form ${ui.device === "mobile" ? "mobile" : ""}" id="sim" novalidate aria-label="Vista previa del formulario">
          ${
            fields.length
              ? fields
                  .map(
                    (f) => `
            <div class="sim-field" data-wrap="${esc(f.id)}" ${visible.has(f.id) ? "" : "hidden"}>
              <label for="in-${esc(f.id)}">${esc(f.label)}${f.required ? ' <span class="req" aria-hidden="true">*</span>' : ""}</label>
              ${controlHTML(f)}
              <p class="error" id="err-${esc(f.id)}"></p>
            </div>`,
                  )
                  .join("")
              : '<p class="empty">El formulario no tiene campos. Vuelve a «Construir».</p>'
          }
          <button type="submit" class="primary">Enviar</button>
        </form>
      </div>
      <aside class="panel" aria-label="Controles de simulación">
        <h2>Simulación</h2>
        <div class="sim-tools">
          <div class="seg" role="group" aria-label="Tamaño de pantalla">
            <button type="button" data-action="device" data-device="desktop" aria-pressed="${ui.device === "desktop"}">Escritorio</button>
            <button type="button" data-action="device" data-device="mobile" aria-pressed="${ui.device === "mobile"}">Móvil</button>
          </div>
          <button type="button" data-action="fill">Datos de prueba</button>
          <button type="button" data-action="reset">Reiniciar</button>
        </div>
        <h2>Resultado</h2>
        <pre class="result" id="result" aria-live="polite">Aún no se ha enviado.</pre>
        <details style="margin-top:12px"><summary>Definición (JSON)</summary>
          <pre class="result">${esc(JSON.stringify(fields, null, 2))}</pre>
        </details>
      </aside>
    </div>`;
  showErrors();
}

function applyVisibility() {
  const visible = visibleIds(fields, ui.values);
  $$("[data-wrap]").forEach((el) => (el.hidden = !visible.has(el.dataset.wrap)));
}

function showErrors() {
  for (const f of fields) {
    const msg = ui.errors[f.id] ?? "";
    const err = $(`#err-${CSS.escape(f.id)}`);
    const input = $(`#in-${CSS.escape(f.id)}`);
    if (err) err.textContent = msg;
    if (input) input.setAttribute("aria-invalid", String(Boolean(msg)));
  }
}

function submitForm() {
  ui.submitted = true;
  ui.errors = validate(fields, ui.values);
  showErrors();
  const result = $("#result");
  const ids = Object.keys(ui.errors);
  if (ids.length) {
    result.className = "result";
    result.textContent = `Hay ${ids.length} ${ids.length === 1 ? "error" : "errores"}. Corrígelos y vuelve a enviar.`;
    say(`El formulario tiene ${ids.length} ${ids.length === 1 ? "error" : "errores"}`);
    $(`#in-${CSS.escape(ids[0])}`)?.focus();
    return;
  }
  const visible = visibleIds(fields, ui.values);
  const out = {};
  for (const f of fields) if (visible.has(f.id)) out[f.label] = ui.values[f.id] ?? (f.type === "checkbox" ? false : "");
  result.className = "result ok";
  result.textContent = JSON.stringify(out, null, 2);
  say("Formulario válido enviado");
}

function fillTestData() {
  for (let pass = 0; pass < 4; pass++) {
    const visible = visibleIds(fields, ui.values);
    for (const f of fields) {
      if (!visible.has(f.id) || (ui.values[f.id] !== undefined && ui.values[f.id] !== "" && ui.values[f.id] !== false)) continue;
      if (f.type === "checkbox") ui.values[f.id] = true;
      else if (f.type === "select") ui.values[f.id] = f.options[f.options.length - 1];
      else if (f.type === "number") ui.values[f.id] = String(f.min ?? 1);
      else ui.values[f.id] = "Texto de ejemplo para la prueba".padEnd(f.minLength ?? 0, ".");
    }
  }
  ui.errors = {};
  renderRun();
  say("Datos de prueba cargados");
}

// ---------- Eventos ----------

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]");
  if (!el) return;
  const { action, id, type } = el.dataset;
  switch (action) {
    case "add": ui.focus = `[data-action="add"][data-type="${type}"]`; addField(type); break;
    case "select": ui.selectedId = id; renderCanvas(); renderProps(); $("#p-label")?.focus(); break;
    case "up": move(id, -1); break;
    case "down": move(id, 1); break;
    case "remove": {
      const label = labelOf(id);
      if (ui.selectedId === id) ui.selectedId = null;
      commit(removeField(fields, id), { props: true, message: `Campo ${label} eliminado` });
      break;
    }
    case "undo": undoRedo("undo"); break;
    case "redo": undoRedo("redo"); break;
    case "mode":
      ui.mode = el.dataset.mode;
      render();
      main.focus();
      say(ui.mode === "run" ? "Modo simulación" : "Modo construcción");
      break;
    case "device": ui.device = el.dataset.device; renderRun(); break;
    case "fill": fillTestData(); break;
    case "reset": ui.values = {}; ui.errors = {}; renderRun(); say("Formulario reiniciado"); break;
    case "save": saveCurrent(); break;
  }
});

document.addEventListener("change", (e) => {
  if (e.target.id === "form-name") ui.formName = e.target.value.trim() || ui.formName;
  const prop = e.target.closest("[data-prop]");
  if (prop) setProp(prop.dataset.prop, prop.value, prop);
});

document.addEventListener("input", (e) => {
  const input = e.target.closest("[data-field]");
  if (!input) return;
  ui.values[input.dataset.field] = input.type === "checkbox" ? input.checked : input.value;
  applyVisibility();
  if (ui.submitted) {
    ui.errors = validate(fields, ui.values);
    showErrors();
  }
});

document.addEventListener("submit", (e) => {
  if (e.target.id === "sim") {
    e.preventDefault();
    submitForm();
  }
});

document.addEventListener("keydown", (e) => {
  if ($("#view-editor")?.hidden) return; // los atajos solo aplican en la página del editor
  if (e.target.id === "form-name" && e.key === "Enter") { e.preventDefault(); saveCurrent(); return; }
  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
  if ((e.ctrlKey || e.metaKey) && !typing) {
    const k = e.key.toLowerCase();
    if (k === "z" && !e.shiftKey) { e.preventDefault(); undoRedo("undo"); }
    else if (k === "y" || (k === "z" && e.shiftKey)) { e.preventDefault(); undoRedo("redo"); }
  }
  const card = e.target.closest?.(".field-card");
  if (card && e.altKey && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
    e.preventDefault();
    move(card.dataset.id, e.key === "ArrowUp" ? -1 : 1);
  }
});

// Arrastrar y soltar (la alternativa por teclado son los botones ↑ ↓ y Alt + flechas)
let drag = null;
const clearMarks = () => {
  $("#canvas")?.classList.remove("over");
  $$(".drop-before, .dragging").forEach((el) => el.classList.remove("drop-before", "dragging"));
};

document.addEventListener("dragstart", (e) => {
  const palette = e.target.closest?.('[data-action="add"]');
  const card = e.target.closest?.(".field-card");
  if (palette) drag = { kind: "new", type: palette.dataset.type };
  else if (card) { drag = { kind: "move", id: card.dataset.id }; card.classList.add("dragging"); }
  else return;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", "campo");
});

document.addEventListener("dragover", (e) => {
  const canvas = e.target.closest?.("#canvas");
  if (!canvas || !drag) return;
  e.preventDefault();
  $$(".drop-before").forEach((el) => el.classList.remove("drop-before"));
  canvas.classList.add("over");
  e.target.closest(".field-card")?.classList.add("drop-before");
});

document.addEventListener("dragleave", (e) => {
  const canvas = $("#canvas");
  if (canvas && !canvas.contains(e.relatedTarget)) clearMarks();
});

document.addEventListener("drop", (e) => {
  const canvas = e.target.closest?.("#canvas");
  if (!canvas || !drag) return;
  e.preventDefault();
  const card = e.target.closest(".field-card");
  const index = card ? fields.findIndex((f) => f.id === card.dataset.id) : fields.length;
  const current = drag;
  drag = null;
  clearMarks();
  if (current.kind === "new") addField(current.type, index);
  else {
    const from = fields.findIndex((f) => f.id === current.id);
    const to = from < index ? index - 1 : index;
    if (from !== to) commit(moveField(fields, current.id, to), { message: `${labelOf(current.id)} reordenado` });
  }
});

document.addEventListener("dragend", () => {
  drag = null;
  clearMarks();
});

render();
