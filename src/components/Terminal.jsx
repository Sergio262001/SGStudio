import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Terminal animada: muestra un despliegue de principio a fin y vuelve a empezar.
// Con «reducir movimiento» activado se muestra completa y quieta.
const LINEAS = [
  { t: "$ git push origin main", c: "cmd" },
  { t: "✓ Pruebas            6/6", c: "ok" },
  { t: "✓ Políticas OPA      sin root", c: "ok" },
  { t: "✓ Imagen + SBOM      firmada", c: "ok" },
  { t: "↻ Argo CD            sincronizando", c: "info" },
  { t: "◐ Canary 20 %        errores 0,3 %", c: "info" },
  { t: "◑ Canary 50 %        p95 142 ms", c: "info" },
  { t: "● Producción 100 %   v1.4", c: "ok" },
  { t: "🚀 Desplegado sin downtime", c: "done" },
];

export default function Terminal() {
  const quieta = useReducedMotion();
  const [n, setN] = useState(quieta ? LINEAS.length : 0);

  useEffect(() => {
    if (quieta) return undefined;
    const espera = n >= LINEAS.length ? 3200 : n === 0 ? 700 : 520;
    const id = setTimeout(() => setN((x) => (x >= LINEAS.length ? 0 : x + 1)), espera);
    return () => clearTimeout(id);
  }, [n, quieta]);

  return (
    <div className="terminal" role="img" aria-label="Animación de un despliegue: pruebas, políticas, imagen firmada, Argo CD y canary hasta producción.">
      <div className="terminal-bar" aria-hidden="true">
        <i /><i /><i />
        <span>deploy · canary-lab</span>
      </div>
      <pre className="terminal-body" aria-hidden="true">
        {LINEAS.slice(0, n).map((l) => (
          <span key={l.t} className={`tl tl-${l.c}`}>{l.t}{"\n"}</span>
        ))}
        {n < LINEAS.length && <span className="cursor">▍</span>}
      </pre>
      <div className="terminal-progress" aria-hidden="true">
        <span style={{ width: `${(n / LINEAS.length) * 100}%` }} />
      </div>
    </div>
  );
}
