import Header from './components/Header'
import Support from './components/Support'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function SupportApp() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Support />
      </main>
      <CTA />
      <Footer />
    </div>
  )
}
