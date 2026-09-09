export default function PlaceholderLegal({ title }: { title: string }) {
  return (
    <>
      <section className="legal-hero container" id="top">
        <h1>Payroll made simple.</h1>
        <p className="hero-copy">Less admin. More impact.<br />The AI payroll platform for modern teams.</p>
      </section>

      <section className="legal-content container">
        <h2>{title}</h2>
        <p>This page is coming soon — check back shortly.</p>
      </section>
    </>
  )
}
