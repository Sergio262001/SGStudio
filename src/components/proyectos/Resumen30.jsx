import { motion } from "framer-motion";

// «En 30 segundos»: reto, solución y resultado en una línea cada uno.
export default function Resumen30({ items }) {
  return (
    <motion.div
      className="r30"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {items.map(([titulo, texto], i) => (
        <motion.div
          key={titulo}
          className={`r30-card r30-${i}`}
          variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
        >
          <span className="r30-k">{titulo}</span>
          <p>{texto}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
