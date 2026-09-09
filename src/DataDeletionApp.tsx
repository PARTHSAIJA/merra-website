import Header from './components/Header'
import PlaceholderLegal from './components/PlaceholderLegal'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function DataDeletionApp() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <PlaceholderLegal title="Data Deletion" />
      </main>
      <CTA />
      <Footer />
    </div>
  )
}
