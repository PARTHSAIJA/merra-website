import Header from './components/Header'
import PrivacyPolicy from './components/PrivacyPolicy'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function PrivacyApp() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <PrivacyPolicy />
      </main>
      <CTA />
      <Footer />
    </div>
  )
}
