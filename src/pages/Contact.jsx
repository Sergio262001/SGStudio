export default function Contact() {
  return (
    <section className="section">
      <div className="container contact-grid">
        <div>
          <h1>Construyamos algo juntos</h1>
          <p className="section-intro">
            Cuéntame brevemente tu idea, el tipo de proyecto y el plazo que
            tienes en mente. Te responderé con una propuesta clara y honesta.
          </p>

          <div className="contact-info">
            <p>Puedes contactarme por correo o enviarme el formulario.</p>
            <p>
              <strong>Email:</strong> tu-correo@example.com
            </p>
            <p>
              <strong>GitHub:</strong> github.com/tu-usuario
            </p>
            <p>
              <strong>LinkedIn:</strong> linkedin.com/in/tu-perfil
            </p>
          </div>
        </div>

        <form className="contact-form">
          <div className="form-row">
            <label htmlFor="name">Nombre</label>
            <input id="name" type="text" placeholder="¿Cómo te llamas?" />
          </div>

          <div className="form-row">
            <label htmlFor="email">Correo</label>
            <input
              id="email"
              type="email"
              placeholder="tuempresa@ejemplo.com"
            />
          </div>

          <div className="form-row">
            <label htmlFor="project">Tipo de proyecto</label>
            <input
              id="project"
              type="text"
              placeholder="Landing, app web, panel interno, etc."
            />
          </div>

          <div className="form-row">
            <label htmlFor="message">Cuéntame un poco más</label>
            <textarea
              id="message"
              rows="4"
              placeholder="Contexto, objetivos, plazos..."
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  );
}
