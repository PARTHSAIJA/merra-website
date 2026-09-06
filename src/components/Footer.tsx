export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a className="brand footer-brand" href="#top" aria-label="Merra home">
          <span className="brand-mark light" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
          <span className="brand-word">merra</span>
        </a>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="mailto:support@merra.com">Support</a>
          <span>© 2026 Merra</span>
        </div>
      </div>
    </footer>
  )
}
