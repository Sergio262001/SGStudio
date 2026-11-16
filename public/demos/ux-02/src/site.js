// Navegación del sitio Escenaria: páginas, menú, informe y conexión con el panel.
import { refresh, say } from "./app.js";
import { PARAMS, bestIndexes } from "./model.js";
import { state, escenarios } from "./store.js";

const $ = (sel, root = document) => root.querySelector(sel);
const int = new Intl.NumberFormat("es", { maximumFractionDigits: 0, useGrouping: "always" });
const dec = new Intl.NumberFormat("es", { maximumFractionDigits: 1, useGrouping: "always" });
const money = (n) => `${n < 0 ? "−" : ""}$${int.format(Math.abs(n))}`;
const nombre = (s) => (s.saved ? `Escenario ${s.name}` : "Escenario actual");
const footer = `<footer class="site-footer">Escenaria es un prototipo de portafolio de UX/UI · SG Studio</footer>`;

// ---------- Páginas ----------

function pageInicio() {
  return `
  <section class="hero">
    <div class="hero-text">
      <p class="eyebrow">Simulación de escenarios</p>
      <h1 tabindex="-1">Compara decisiones antes de tomarlas</h1>
      <p class="lead">Mueve los supuestos de tu plan y mira al instante cuándo cubres costos, cuándo llegas a tu capacidad y cuánto acumulas.</p>
      <div class="hero-actions">
        <a class="btn primary big" href="#/panel">Abrir el panel</a>
        <a class="btn big" href="#/metodologia">Cómo funciona</a>
      </div>
    </div>
    <div class="hero-mock chart-mock" aria-hidden="true">
      <div class="mock-kpis"><span><small>Equilibrio</small>Mes 3</span><span><small>Acumulado</small>$1,2 M</span></div>
      <svg viewBox="0 0 300 150" preserveAspectRatio="none">
        <line x1="0" y1="140" x2="300" y2="140" class="axis"/>
        <polyline points="0,135 50,128 100,112 150,90 200,62 250,38 300,18" class="l1"/>
        <polyline points="0,137 50,133 100,126 150,116 200,104 250,92 300,80" class="l2"/>
        <polyline points="0,138 50,136 100,133 150,129 200,125 250,121 300,117" class="l3"/>
      </svg>
      <div class="mock-legend"><span class="k1">Actual</span><span class="k2">Escenario A</span><span class="k3">Escenario B</span></div>
    </div>
  </section>

  <section class="block" aria-labelledby="h-como">
    <h2 id="h-como">En tres pasos</h2>
    <ol class="steps">
      <li><strong>Elige un punto de partida</strong><span>Conservador, base o agresivo, o tus propios valores.</span></li>
      <li><strong>Ajusta y guarda</strong><span>Mueve los deslizadores y guarda hasta tres escenarios.</span></li>
      <li><strong>Compara y decide</strong><span>El gráfico y la tabla muestran cuál conviene en cada aspecto.</span></li>
    </ol>
  </section>

  <section class="block" aria-labelledby="h-por">
    <h2 id="h-por">Pensado para decidir</h2>
    <div class="features">
      <article><h3>Resultado al instante</h3><p>Cada cambio recalcula todo en el momento. Sin fórmulas ni hojas de cálculo.</p></article>
      <article><h3>Comparación clara</h3><p>La mejor opción de cada métrica se marca con ★ y con texto, no solo con color.</p></article>
      <article><h3>Accesible</h3><p>El gráfico se recorre con el teclado y tiene una tabla equivalente para lectores de pantalla.</p></article>
      <article><h3>Informe listo</h3><p>Un resumen en lenguaje claro para compartir, imprimir o guardar en PDF.</p></article>
    </div>
  </section>

  <section class="cta-band">
    <h2>Prueba con tus propios números</h2>
    <p>Tus escenarios se guardan en este navegador.</p>
    <a class="btn primary big" href="#/panel">Abrir el panel</a>
  </section>
  ${footer}`;
}

function frases(s) {
  const p = s.params;
  const eq = s.sum.mesEquilibrio
    ? `Cubre sus costos desde el <strong>mes ${s.sum.mesEquilibrio}</strong>.`
    : `<strong>No cubre sus costos</strong> dentro del horizonte de ${p.meses} meses.`;
  const cap = s.sum.mesCapacidad
    ? `Llega a su capacidad máxima (${int.format(p.capacidad)} unidades) en el <strong>mes ${s.sum.mesCapacidad}</strong>.`
    : `No llega a su capacidad máxima (${int.format(p.capacidad)} unidades).`;
  const acc = `Al final del mes ${p.meses} acumula <strong>${money(s.sum.acumuladoFinal)}</strong>.`;
  return [eq, cap, acc];
}

function pageInforme() {
  const lista = escenarios();
  const best = bestIndexes(lista.map((s) => s.sum));
  const hoy = new Intl.DateTimeFormat("es", { dateStyle: "long" }).format(new Date());

  const conclusion =
    lista.length === 1
      ? `<p>Solo hay un escenario. Guarda otros en el panel para que el informe los compare.</p>`
      : `<p>Con estos supuestos, <strong>${nombre(lista[best.acumuladoFinal ?? 0])}</strong> deja el mayor acumulado
         (${money(lista[best.acumuladoFinal ?? 0].sum.acumuladoFinal)})${
           best.mesEquilibrio !== null
             ? ` y <strong>${nombre(lista[best.mesEquilibrio])}</strong> es el que antes cubre sus costos (mes ${lista[best.mesEquilibrio].sum.mesEquilibrio})`
             : ""
         }.</p>`;

  const tarjetas = lista.map((s) => `
    <article class="report-card">
      <h3>${nombre(s)}</h3>
      <ul>${frases(s).map((f) => `<li>${f}</li>`).join("")}</ul>
      <p class="meta">${Object.entries(PARAMS).map(([k, spec]) => `${spec.label}: ${dec.format(s.params[k])}${spec.unit === "%" ? "%" : ""}`).join(" · ")}</p>
    </article>`).join("");

  return `
  <div class="page narrow report">
    <header class="page-head">
      <p class="eyebrow">Informe · ${hoy}</p>
      <h1 tabindex="-1">Informe de escenarios</h1>
      <p class="lead">Resumen en lenguaje claro de ${lista.length === 1 ? "tu escenario" : `tus ${lista.length} escenarios`}.</p>
      <div class="hero-actions no-print">
        <button type="button" class="primary" data-print>Imprimir o guardar en PDF</button>
        <a class="btn" href="#/panel">Volver al panel</a>
      </div>
    </header>
    <section class="block" aria-labelledby="h-concl">
      <h2 id="h-concl">Conclusión</h2>
      <div class="conclusion">${conclusion}</div>
    </section>
    <section class="block" aria-labelledby="h-det">
      <h2 id="h-det">Detalle por escenario</h2>
      <div class="report-grid">${tarjetas}</div>
    </section>
    <p class="note-small">Los resultados dependen de los supuestos del modelo. Consulta «Cómo funciona» para conocer sus límites.</p>
  </div>
  ${footer}`;
}

function pageMetodologia() {
  return `
  <div class="page narrow">
    <header class="page-head">
      <h1 tabindex="-1">Cómo funciona</h1>
      <p class="lead">El modelo es simple a propósito: así cada resultado se puede explicar.</p>
    </header>
    <section class="block" aria-labelledby="h-calc">
      <h2 id="h-calc">El cálculo, mes a mes</h2>
      <ol class="formula">
        <li><strong>Unidades</strong>: el primer mes son las unidades iniciales. Cada mes siguiente crecen según el porcentaje mensual, sin pasar de la capacidad máxima.</li>
        <li><strong>Ingreso</strong> = unidades × ingreso por unidad.</li>
        <li><strong>Neto del mes</strong> = ingreso − costo fijo mensual.</li>
        <li><strong>Acumulado</strong> = suma de los netos desde el mes 1.</li>
      </ol>
    </section>
    <section class="block" aria-labelledby="h-glos">
      <h2 id="h-glos">Glosario</h2>
      <dl class="glossary">
        <dt>Mes de equilibrio</dt><dd>El primer mes en que el ingreso cubre el costo fijo (neto mayor o igual a cero).</dd>
        <dt>Llega a capacidad</dt><dd>El primer mes en que las unidades alcanzan el máximo que se puede atender.</dd>
        <dt>Acumulado final</dt><dd>Lo que queda al sumar todos los netos del horizonte. Puede ser negativo.</dd>
      </dl>
    </section>
    <section class="block" aria-labelledby="h-lim">
      <h2 id="h-lim">Supuestos y límites</h2>
      <ul class="limits">
        <li>El crecimiento es constante cada mes; no hay temporadas altas o bajas.</li>
        <li>No hay costos variables por unidad ni inflación.</li>
        <li>La capacidad es un tope fijo: no se modelan inversiones para ampliarla.</li>
      </ul>
      <p>Por eso Escenaria sirve para <strong>comparar</strong> opciones, no para predecir cifras exactas.</p>
    </section>
    <section class="block" aria-labelledby="h-a11y">
      <h2 id="h-a11y">Accesibilidad</h2>
      <p>El gráfico se recorre con las flechas ← → (Inicio y Fin saltan a los extremos) y anuncia los valores de cada mes. La vista «Tabla» muestra los mismos datos. Cada escenario se distingue por color y por patrón de línea.</p>
    </section>
  </div>
  ${footer}`;
}

// ---------- Rutas ----------

const ROUTES = {
  inicio: { title: "Inicio", render: pageInicio },
  panel: { title: "Panel", app: true },
  informe: { title: "Informe", render: pageInforme },
  metodologia: { title: "Cómo funciona", render: pageMetodologia },
};

const panelView = $("#view-panel");
const pageView = $("#view-page");
const menuBtn = $(".menu-btn");

function current() {
  const name = location.hash.replace(/^#\/?/, "").split("?")[0];
  return ROUTES[name] ? name : "inicio";
}

function show(first = false) {
  const name = current();
  const route = ROUTES[name];
  panelView.hidden = !route.app;
  pageView.hidden = Boolean(route.app);
  if (route.app) refresh();
  else pageView.innerHTML = route.render();

  document.querySelectorAll("[data-route]").forEach((a) => {
    if (a.dataset.route === name) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  document.title = `${route.title} · Escenaria`;
  menuBtn.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");

  if (!first) {
    window.scrollTo(0, 0);
    (route.app ? $("#h-panel") : pageView.querySelector("h1"))?.focus();
    say(`Página: ${route.title}`);
  }
}

window.addEventListener("hashchange", () => show());

menuBtn.addEventListener("click", () => {
  const open = menuBtn.getAttribute("aria-expanded") !== "true";
  menuBtn.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
});

document.addEventListener("click", (e) => {
  if (e.target.closest("[data-print]")) {
    try { window.print(); } catch { say("La impresión no está disponible aquí. Abre el prototipo en una pestaña nueva."); }
  }
});

// Antes de mostrar la primera página, el panel ya cargó lo guardado (app.js se ejecuta primero).
void state;
show(true);
