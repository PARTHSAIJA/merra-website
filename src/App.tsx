import Header from './components/Header'
import Hero from './components/Hero'
import ProductShowcase from './components/ProductShowcase'
import Benefits from './components/Benefits'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero />
        <ProductShowcase />
        <Benefits />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
