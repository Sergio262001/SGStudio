// Navegación del sitio Formix: páginas, menú y conexión con el editor.
import { loadForm, refresh, say } from "./app.js";
import { TEMPLATES, countRules } from "./templates.js";
import { listForms, getForm, deleteForm, restoreForm } from "./forms-store.js";

const $ = (sel, root = document) => root.querySelector(sel);
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`;
const footer = `<footer class="site-footer">Formix es un prototipo de portafolio de UX/UI · SG Studio</footer>`;

// ---------- Páginas ----------

function pageInicio() {
  return `
  <section class="hero">
    <div class="hero-text">
      <p class="eyebrow">Constructor de formularios</p>
      <h1 tabindex="-1">Formularios que se adaptan a cada respuesta</h1>
      <p class="lead">Crea preguntas que aparecen solo cuando hacen falta y pruébalas antes de publicar. Sin programar.</p>
      <div class="hero-actions">
        <a class="btn primary big" href="#/editor">Crear formulario</a>
        <a class="btn big" href="#/plantillas">Ver plantillas</a>
      </div>
    </div>
    <div class="hero-mock" aria-hidden="true">
      <div class="mock-field"><span class="mock-label">Tipo de solicitud</span><span class="mock-input">Reclamo ▾</span></div>
      <div class="mock-field appear">
        <span class="mock-badge">Aparece solo si es «Reclamo»</span>
        <span class="mock-label">Número de pedido</span><span class="mock-input">1024</span>
      </div>
      <div class="mock-field"><span class="mock-label">Describe el problema</span><span class="mock-input tall"></span></div>
      <span class="mock-btn">Enviar</span>
    </div>
  </section>

  <section class="block" aria-labelledby="h-como">
    <h2 id="h-como">Cómo funciona</h2>
    <ol class="steps">
      <li><strong>Agrega campos</strong><span>Texto, números, listas y casillas. Arrastra o usa el teclado.</span></li>
      <li><strong>Define reglas</strong><span>«Mostrar solo si…»: cada pregunta aparece cuando corresponde.</span></li>
      <li><strong>Simula y publica</strong><span>Usa el formulario real, en escritorio o móvil, antes de compartirlo.</span></li>
    </ol>
  </section>

  <section class="block" aria-labelledby="h-por">
    <h2 id="h-por">Por qué Formix</h2>
    <div class="features">
      <article><h3>Reglas a la vista</h3><p>Cada campo muestra su regla en lenguaje natural. Se entiende el formulario de un vistazo.</p></article>
      <article><h3>Prueba sin riesgo</h3><p>El modo Simular valida igual que el formulario publicado, con datos de prueba incluidos.</p></article>
      <article><h3>Para todas las personas</h3><p>Todo se puede hacer con teclado, y los mensajes se anuncian a lectores de pantalla.</p></article>
      <article><h3>Sin miedo a equivocarse</h3><p>Deshacer y rehacer en cualquier momento. Los errores de configuración se señalan.</p></article>
    </div>
  </section>

  <section class="cta-band">
    <h2>Empieza en segundos con una plantilla</h2>
    <p>Atención al cliente, eventos, empleo y encuestas, ya con reglas listas.</p>
    <a class="btn primary big" href="#/plantillas">Elegir plantilla</a>
  </section>
  ${footer}`;
}

function pagePlantillas() {
  const cards = TEMPLATES.map((t) => `
    <article class="tpl-card">
      <h2>${esc(t.nombre)}</h2>
      <p>${esc(t.descripcion)}</p>
      <p class="chips"><span>${plural(t.fields.length, "campo", "campos")}</span><span>${plural(countRules(t.fields), "regla", "reglas")}</span></p>
      <div class="card-actions">
        <button type="button" class="primary" data-tpl-use="${t.id}">Usar plantilla</button>
        <button type="button" data-tpl-try="${t.id}">Probar</button>
      </div>
    </article>`).join("");
  return `
  <div class="page">
    <header class="page-head">
      <h1 tabindex="-1">Plantillas</h1>
      <p class="lead">Elige una base con reglas ya configuradas. «Probar» la abre directamente en modo simulación.</p>
    </header>
    <div class="tpl-grid">${cards}</div>
  </div>
  ${footer}`;
}

const fecha = new Intl.DateTimeFormat("es", { dateStyle: "medium", timeStyle: "short" });
let ultimoBorrado = null;

function pageMisFormularios() {
  const forms = listForms();
  const undo = ultimoBorrado
    ? `<div class="notice" role="status">«${esc(ultimoBorrado.name)}» eliminado. <button type="button" data-form-restore>Deshacer</button></div>`
    : "";
  const body = forms.length
    ? `<ul class="form-list">${forms.map((f) => `
        <li>
          <div>
            <h2>${esc(f.name)}</h2>
            <p class="meta">${plural(f.fields.length, "campo", "campos")} · ${plural(countRules(f.fields), "regla", "reglas")} · Guardado ${fecha.format(f.updatedAt)}</p>
          </div>
          <div class="card-actions">
            <button type="button" class="primary" data-form-open="${f.id}">Abrir</button>
            <button type="button" data-form-try="${f.id}">Probar</button>
            <button type="button" class="danger" data-form-delete="${f.id}" aria-label="Eliminar ${esc(f.name)}">Eliminar</button>
          </div>
        </li>`).join("")}</ul>`
    : `<div class="empty-state">
        <h2>Aún no has guardado formularios</h2>
        <p>Crea uno en el editor y pulsa «Guardar», o parte de una plantilla.</p>
        <div class="card-actions"><a class="btn primary" href="#/plantillas">Ver plantillas</a><a class="btn" href="#/editor">Ir al editor</a></div>
      </div>`;
  return `
  <div class="page">
    <header class="page-head">
      <h1 tabindex="-1">Mis formularios</h1>
      <p class="lead">Se guardan en este navegador.</p>
    </header>
    ${undo}${body}
  </div>
  ${footer}`;
}

function pageAyuda() {
  const atajos = [
    ["Ctrl + Z", "Deshacer"], ["Ctrl + Y", "Rehacer"], ["Alt + ↑ / ↓", "Mover el campo enfocado"],
    ["Enter (en el nombre)", "Guardar el formulario"], ["Tab", "Recorrer controles"],
  ];
  const faq = [
    ["¿Qué es una regla condicional?", "Una condición que decide si un campo se muestra. Por ejemplo: «Número de pedido» aparece solo si «Tipo de solicitud» es «Reclamo»."],
    ["¿Qué pasa si una regla depende de un campo oculto?", "El valor del campo oculto se ignora, así que el campo que depende de él también se oculta. Así no aparecen preguntas sin contexto."],
    ["¿Qué es un «ciclo de reglas»?", "Ocurre cuando dos campos dependen uno del otro. Formix lo marca en el editor y lo ignora al simular para que el formulario no se rompa."],
    ["¿Dónde se guardan mis formularios?", "En el almacenamiento de este navegador. Este prototipo no envía datos a ningún servidor."],
  ];
  return `
  <div class="page narrow">
    <header class="page-head">
      <h1 tabindex="-1">Ayuda</h1>
      <p class="lead">Atajos, preguntas frecuentes y accesibilidad.</p>
    </header>
    <section class="block" aria-labelledby="h-atajos">
      <h2 id="h-atajos">Atajos de teclado</h2>
      <table class="shortcuts"><thead><tr><th scope="col">Tecla</th><th scope="col">Acción</th></tr></thead>
        <tbody>${atajos.map(([k, a]) => `<tr><td><kbd>${k}</kbd></td><td>${a}</td></tr>`).join("")}</tbody></table>
    </section>
    <section class="block" aria-labelledby="h-faq">
      <h2 id="h-faq">Preguntas frecuentes</h2>
      ${faq.map(([q, a]) => `<details class="faq"><summary>${q}</summary><p>${a}</p></details>`).join("")}
    </section>
    <section class="block" aria-labelledby="h-a11y">
      <h2 id="h-a11y">Accesibilidad</h2>
      <p>Formix se diseñó siguiendo las pautas WCAG 2.2: todo funciona con teclado (incluido reordenar campos sin arrastrar), el foco siempre es visible, los errores se anuncian a lectores de pantalla y el contraste cumple el nivel AA.</p>
    </section>
  </div>
  ${footer}`;
}

// Dentro del portafolio (iframe) el enlace «← Portafolio» sobra: el visor ya tiene su botón de volver.
if (window.self !== window.top) document.querySelectorAll("[data-solo-fuera]").forEach((el) => (el.hidden = true));

// ---------- Rutas ----------

const ROUTES = {
  inicio: { title: "Inicio", render: pageInicio },
  plantillas: { title: "Plantillas", render: pagePlantillas },
  editor: { title: "Editor", app: true },
  "mis-formularios": { title: "Mis formularios", render: pageMisFormularios },
  ayuda: { title: "Ayuda", render: pageAyuda },
};

const editorView = $("#view-editor");
const pageView = $("#view-page");
const menuBtn = $(".menu-btn");

function current() {
  const name = location.hash.replace(/^#\/?/, "").split("?")[0];
  return ROUTES[name] ? name : "inicio";
}

function show(first = false) {
  const name = current();
  const route = ROUTES[name];
  editorView.hidden = !route.app;
  pageView.hidden = Boolean(route.app);
  if (route.app) refresh();
  else pageView.innerHTML = route.render();

  document.querySelectorAll("[data-route]").forEach((a) => {
    if (a.dataset.route === name) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  document.title = `${route.title} · Formix`;
  menuBtn.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");

  if (!first) {
    window.scrollTo(0, 0);
    (route.app ? $("#h-editor") : pageView.querySelector("h1"))?.focus();
    say(`Página: ${route.title}`);
  }
}

function go(name) {
  if (current() === name) show();
  else location.hash = `#/${name}`;
}

window.addEventListener("hashchange", () => {
  ultimoBorrado = null; // el aviso de «Deshacer» solo vale en la página donde se borró
  show();
});

menuBtn.addEventListener("click", () => {
  const open = menuBtn.getAttribute("aria-expanded") !== "true";
  menuBtn.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
});

document.addEventListener("click", (e) => {
  const t = e.target.closest("button");
  if (!t) return;
  const d = t.dataset;
  const tpl = TEMPLATES.find((x) => x.id === (d.tplUse ?? d.tplTry));
  if (tpl) {
    loadForm({ fields: tpl.fields, name: tpl.nombre, mode: d.tplTry ? "run" : "build" });
    go("editor");
    return;
  }
  const formId = d.formOpen ?? d.formTry;
  if (formId) {
    const f = getForm(formId);
    if (f) { loadForm({ fields: f.fields, name: f.name, id: f.id, mode: d.formTry ? "run" : "build" }); go("editor"); }
    return;
  }
  if (d.formDelete) {
    ultimoBorrado = deleteForm(d.formDelete);
    show(true);
    say(`Formulario eliminado. Puedes deshacerlo.`);
    pageView.querySelector("[data-form-restore]")?.focus();
    return;
  }
  if ("formRestore" in d) {
    restoreForm(ultimoBorrado);
    say(`«${ultimoBorrado?.name}» restaurado`);
    ultimoBorrado = null;
    show(true);
  }
});

show(true);
