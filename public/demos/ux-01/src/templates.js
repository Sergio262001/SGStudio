// Plantillas de ejemplo. Cada una demuestra reglas condicionales distintas.
import { newField } from "./rules.js";

const f = (type, id, props) => ({ ...newField(type, id), ...props });

export const TEMPLATES = [
  {
    id: "atencion",
    nombre: "Atención al cliente",
    descripcion: "Pide el número de pedido y el detalle solo cuando la persona elige «Reclamo».",
    fields: [
      f("select", "tipo", { label: "Tipo de solicitud", options: ["Consulta", "Reclamo"], required: true }),
      f("number", "pedido", { label: "Número de pedido", min: 1, max: 99999, rule: { fieldId: "tipo", op: "equals", value: "Reclamo" } }),
      f("text", "detalle", { label: "Describe el problema", required: true, minLength: 10, rule: { fieldId: "pedido", op: "filled" } }),
      f("checkbox", "terminos", { label: "Acepto las condiciones", required: true }),
    ],
  },
  {
    id: "evento",
    nombre: "Inscripción a evento",
    descripcion: "Pregunta el nombre del acompañante solo si la persona va acompañada.",
    fields: [
      f("text", "nombre", { label: "Nombre completo", required: true, minLength: 3 }),
      f("select", "entrada", { label: "Tipo de entrada", options: ["General", "VIP"], required: true }),
      f("checkbox", "acompanado", { label: "Asistiré con acompañante" }),
      f("text", "acompanante", { label: "Nombre del acompañante", required: true, minLength: 3, rule: { fieldId: "acompanado", op: "equals", value: "true" } }),
      f("select", "menu", { label: "Menú para la cena VIP", options: ["Tradicional", "Vegetariano", "Sin gluten"], required: true, rule: { fieldId: "entrada", op: "equals", value: "VIP" } }),
    ],
  },
  {
    id: "empleo",
    nombre: "Solicitud de empleo",
    descripcion: "Muestra el campo de portafolio solo para perfiles de diseño.",
    fields: [
      f("text", "candidato", { label: "Nombre", required: true, minLength: 3 }),
      f("select", "puesto", { label: "Puesto", options: ["Desarrollo", "Diseño UX/UI", "Soporte"], required: true }),
      f("number", "experiencia", { label: "Años de experiencia", min: 0, max: 50, required: true }),
      f("text", "portafolio", { label: "Enlace a tu portafolio", required: true, minLength: 8, rule: { fieldId: "puesto", op: "equals", value: "Diseño UX/UI" } }),
    ],
  },
  {
    id: "encuesta",
    nombre: "Encuesta de satisfacción",
    descripcion: "Pregunta qué mejorar solo cuando la persona no recomendaría el servicio.",
    fields: [
      f("select", "calificacion", { label: "¿Cómo calificas el servicio?", options: ["Excelente", "Bueno", "Regular", "Malo"], required: true }),
      f("select", "recomienda", { label: "¿Nos recomendarías?", options: ["Sí", "No"], required: true }),
      f("text", "mejora", { label: "¿Qué deberíamos mejorar?", required: true, minLength: 5, rule: { fieldId: "recomienda", op: "equals", value: "No" } }),
    ],
  },
];

export const countRules = (fields) => fields.filter((x) => x.rule).length;
