// Caso de estudio DevOps (página de detalle).
export default function DevopsCase({ caso }) {
  return (
    <article className="card ux-case" aria-labelledby={`t-${caso.id}`}>
      <header className="ux-head">
        <span className="pill">Caso de estudio · DevOps</span>
        <h1 id={`t-${caso.id}`}>{caso.titulo}</h1>
        <p className="ux-sub">{caso.subtitulo}</p>
        <div className="ux-actions ux-actions-top">
          <a className="btn btn-primary" href={caso.repo} target="_blank" rel="noopener noreferrer">
            Ver código en GitHub
          </a>
        </div>
      </header>

      <div className="ux-split">
        <div className="ux-box">
          <h2>El reto</h2>
          <p>{caso.reto}</p>
        </div>
        <div className="ux-box ux-box-accent">
          <h2>La solución</h2>
          <p>{caso.solucion}</p>
        </div>
      </div>

      <h2 className="ux-process-title">Así viaja un cambio hasta producción</h2>
      <ol className="pipeline" aria-label="Pasos del flujo de entrega">
        {caso.pipeline.map(([nombre, detalle]) => (
          <li key={nombre}>
            <strong>{nombre}</strong>
            <span>{detalle}</span>
          </li>
        ))}
      </ol>

      <h2 className="ux-process-title">Qué incluye</h2>
      <ul className="bullets">
        {caso.puntos.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <ul className="tag-list" aria-label="Tecnologías">
        {caso.herramientas.map((h) => (
          <li key={h} className="pill">{h}</li>
        ))}
      </ul>

      <p className="ux-next">{caso.estado}</p>
    </article>
  );
}
