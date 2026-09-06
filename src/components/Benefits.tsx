const benefits = [
  ['Saves Time', 'Cut manual processing down to minutes with auto-synced hours, overtime, and pay runs.'],
  ['Always Compliant', 'Stay aligned with local tax rates, statutory caps, and labor laws automatically.'],
  ['Bank-Grade Security', 'Protect sensitive payroll and employee records with enterprise encryption and strict access controls.'],
]

export default function Benefits() {
  return (
    <section className="benefits-section">
      <div className="container section-heading compact">
        <h2>Built for modern teams</h2>
        <p>A flexible, intuitive platform designed to adapt to workplaces and simplify daily operations.</p>
      </div>
      <div className="container benefit-grid">
        {benefits.map(([title, copy], i) => (
          <article className="benefit-card" key={title}>
            <div className="benefit-icon">{String(i + 1).padStart(2, '0')}</div>
            <div><h3>{title}</h3><p>{copy}</p></div>
          </article>
        ))}
      </div>
    </section>
  )
}
