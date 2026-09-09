import Header from './components/Header'
import PlaceholderLegal from './components/PlaceholderLegal'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function CookiePolicyApp() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <PlaceholderLegal title="Cookie Policy" />
      </main>
      <CTA />
      <Footer />
    </div>
  )
}
