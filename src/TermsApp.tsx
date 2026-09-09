import Header from './components/Header'
import TermsOfService from './components/TermsOfService'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function TermsApp() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <TermsOfService />
      </main>
      <CTA />
      <Footer />
    </div>
  )
}
