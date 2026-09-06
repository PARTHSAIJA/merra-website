const features = [
  {
    title: 'Instant Calculations',
    copy: 'Calculate hours, overtime, and statutory taxes in seconds.',
    kind: 'calc',
  },
  {
    title: 'Zero Errors',
    copy: 'Smart algorithms catch mistakes before they hit your bank.',
    kind: 'errors',
  },
  {
    title: 'Schedules that Run Payroll',
    copy: 'Build shifts in minutes and stream approved hours straight to payroll.',
    kind: 'schedule',
  },
]

export default function ProductShowcase() {
  return (
    <section className="product-section" id="product">
      <div className="container section-heading">
        <h2>Smarter Payroll,<br />Zero Guesswork</h2>
        <p>From hours to pay runs, automate the entire flow and eliminate manual payroll admin for good.</p>
      </div>

      <div className="container feature-layout">
        {features.map((feature, index) => (
          <article className={`feature-row ${index % 2 ? 'reverse' : ''}`} key={feature.title}>
            <div className={`feature-visual ${feature.kind}`}>
              {feature.kind === 'calc' && <PayrollCard />}
              {feature.kind === 'errors' && <ErrorCard />}
              {feature.kind === 'schedule' && <ScheduleCard />}
            </div>
            <div className="feature-copy">
              <div className="feature-number">0{index + 1}</div>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function PayrollCard() {
  return (
    <div className="mock-panel payroll-panel">
      <div className="mock-title">Payroll Summary</div>
      <div className="mock-sub">1 January to 31 March 2026</div>
      <div className="pay-grid pay-head"><span>Employee</span><span>Earnings</span><span>Tax</span><span>Net Pay</span></div>
      {[
        ['Lachlan Hughes','$4,850','$1,140','$3,590'],
        ['Maya Chen','$5,600','$1,380','$4,220'],
        ['Anthony Malouf','$6,200','$1,620','$4,370'],
      ].map(r => <div className="pay-grid" key={r[0]}>{r.map(v => <span key={v}>{v}</span>)}</div>)}
      <div className="mock-actions"><button>CSV</button><button>PDF</button></div>
    </div>
  )
}

function ErrorCard() {
  return (
    <div className="mock-panel error-panel">
      <div className="expense-row"><span>Office Supplies</span><strong>$210.00</strong></div>
      <div className="expense-row"><span>Cab Ride</span><strong>$35.00</strong></div>
      <div className="alert-box"><b>Duplicate Detected</b><span>This claim looks similar to an earlier one.</span></div>
    </div>
  )
}

function ScheduleCard() {
  const days = ['MON 26','TUES 27','WED 28','THUR 29','FRI 30']
  return (
    <div className="mock-panel schedule-panel">
      <div className="schedule-top"><b>January 2026</b><span>Week</span></div>
      <div className="schedule-grid">
        {days.map((d, i) => <div className="day" key={d}><small>{d}</small><div className={`shift s${i}`}>9:00–5:00</div></div>)}
      </div>
    </div>
  )
}
