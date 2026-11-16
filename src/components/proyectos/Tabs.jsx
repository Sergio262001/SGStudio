import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Pestañas accesibles (patrón WAI-ARIA): flechas ← →, Inicio y Fin para moverse.
export default function Tabs({ tabs, label }) {
  const [activa, setActiva] = useState(0);
  const base = useId();
  const refs = useRef([]);

  const mover = (i) => {
    const n = (i + tabs.length) % tabs.length;
    setActiva(n);
    refs.current[n]?.focus();
  };

  const onKey = (e) => {
    const keys = { ArrowRight: activa + 1, ArrowLeft: activa - 1, Home: 0, End: tabs.length - 1 };
    if (e.key in keys) {
      e.preventDefault();
      mover(keys[e.key]);
    }
  };

  return (
    <div className="tabs">
      <div className="tab-list" role="tablist" aria-label={label} onKeyDown={onKey}>
        {tabs.map((t, i) => (
          <button
            key={t.titulo}
            ref={(el) => (refs.current[i] = el)}
            type="button"
            role="tab"
            id={`${base}-t${i}`}
            aria-selected={activa === i}
            aria-controls={`${base}-p${i}`}
            tabIndex={activa === i ? 0 : -1}
            onClick={() => setActiva(i)}
          >
            <span className="tab-num" aria-hidden="true">{i + 1}</span>
            {t.titulo}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activa}
          className="tab-panel"
          role="tabpanel"
          id={`${base}-p${activa}`}
          aria-labelledby={`${base}-t${activa}`}
          tabIndex={0}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          {tabs[activa].contenido}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
