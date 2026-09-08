import Logo from './Logo'

export default function Header() {
  return (
    <header className="site-header container">
      <a className="brand" href="#top" aria-label="Merra home">
        <Logo className="brand-logo" />
      </a>
      <nav className="nav" aria-label="Primary navigation">
        <a className="nav-pill" href="#product">Product</a>
        <a href="#login">Login</a>
        <a className="button button-dark button-small" href="#demo">Book a Demo</a>
      </nav>
    </header>
  )
}
