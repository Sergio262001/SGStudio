export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-main">
          © {new Date().getFullYear()} SG Studio · Desarrollo web & DevOps
        </p>
        <p className="footer-sub">
          React · Node.js · AWS · Docker · CI/CD · Arquitecturas escalables
        </p>
      </div>
    </footer>
  );
}
