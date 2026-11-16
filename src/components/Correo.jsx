import { useState } from "react";
import { PERFIL } from "../data/perfil";

// Contacto en un clic: «Escríbeme» abre el correo con el asunto ya escrito.
// «Copiar correo» sirve a quien usa Gmail u Outlook en el navegador (sin programa de correo instalado).
const ASUNTO = "Oportunidad laboral · DevOps Junior";

export const correo = () => PERFIL.contacto.email;
export const mailto = (asunto = ASUNTO) => `mailto:${correo()}?subject=${encodeURIComponent(asunto)}`;

export function Escribeme({ className = "btn btn-outline btn-lg", children = "✉ Escríbeme" }) {
  if (!correo()) return null;
  return (
    <a className={className} href={mailto()}>
      {children}
    </a>
  );
}

// Respaldo para navegadores sin acceso al portapapeles moderno
function copiarConRespaldo(texto) {
  const area = document.createElement("textarea");
  area.value = texto;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  try {
    document.execCommand("copy");
  } finally {
    area.remove();
  }
}

export function CopiarCorreo({ className = "btn btn-outline btn-lg" }) {
  const [copiado, setCopiado] = useState(false);
  if (!correo()) return null;

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(correo());
    } catch {
      copiarConRespaldo(correo());
    }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2200);
  };

  return (
    <>
      <button type="button" className={className} onClick={copiar}>
        {copiado ? "✓ Copiado" : "Copiar correo"}
      </button>
      <span className="sr-only" role="status">
        {copiado ? "Correo copiado al portapapeles" : ""}
      </span>
    </>
  );
}
