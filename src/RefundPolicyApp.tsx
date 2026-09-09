import Header from './components/Header'
import PlaceholderLegal from './components/PlaceholderLegal'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function RefundPolicyApp() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <PlaceholderLegal title="Refund Policy" />
      </main>
      <CTA />
      <Footer />
    </div>
  )
}
