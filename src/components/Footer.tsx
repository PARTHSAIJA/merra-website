import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a className="brand footer-brand" href="/" aria-label="Merra home">
          <Logo className="brand-logo" />
        </a>
        <div className="footer-links">
          <a href="/privacy.html">Privacy Policy</a>
          <a href="/terms.html">Terms of Service</a>
          <a href="/support.html">Support</a>
          <span>© 2026 Merra</span>
        </div>
      </div>
    </footer>
  )
}
