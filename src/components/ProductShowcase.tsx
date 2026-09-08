import { Fragment, useState } from 'react'

const features = [
  {
    kind: 'calc',
    title: 'Instant Calculations',
    copy: 'Calculate hours, overtime, and statutory taxes in seconds.',
    icon: CalcIcon,
  },
  {
    kind: 'errors',
    title: 'Zero Errors',
    copy: 'Smart algorithms catch mistakes before they hit your bank.',
    icon: ChatIcon,
  },
  {
    kind: 'schedule',
    title: 'Schedules that Run Payroll',
    copy: 'Build shifts in minutes and stream approved hours straight to payroll.',
    icon: ScheduleIcon,
  },
] as const

export default function ProductShowcase() {
  const [active, setActive] = useState(0)
  const kind = features[active].kind

  return (
    <section className="product-section" id="product">
      <div className="container section-heading">
        <h2>Smarter Payroll,<br />Zero Guesswork</h2>
        <p>From hours to pay runs, automate the entire flow and eliminate manual payroll admin for good.</p>
      </div>

      <div className="container showcase">
        <div className={`showcase-visual ${kind}`} aria-hidden="true">
          {kind === 'calc' && <PayrollPanel />}
          {kind === 'errors' && <ReimbursementsPanel />}
          {kind === 'schedule' && <SchedulePanel />}
        </div>

        <div className="showcase-list">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <button
                key={feature.title}
                type="button"
                aria-pressed={index === active}
                className={`showcase-item ${index === active ? 'active' : ''}`}
                onClick={() => setActive(index)}
              >
                <span className="showcase-icon"><Icon /></span>
                <span>
                  <h3>{feature.title}</h3>
                  <p>{feature.copy}</p>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function PayrollPanel() {
  const rows = [
    ['Lachlan Hughes', '$4,850.00', '$120.00'],
    ['Maya Chen', '$5,600.00', '$0.00'],
    ['Darcy Mitchell', '$3,950.00', '$85.00'],
    ['Chloe Robertson', '$6,200.00', '$210.00'],
    ['Liam O’Connor', '$4,400.00', '$50.00'],
  ]
  return (
    <div className="showcase-panel pr-panel">
      <div className="pr-title">Payroll Summary</div>
      <div className="pr-filters">
        <span>1 January to 31 March 2026</span>
        <span className="pr-search">Employee Search</span>
      </div>
      <div className="pr-table">
        <div className="pr-row pr-head-row"><span>Employee</span><span>Earnings</span><span>Deductions</span></div>
        {rows.map((r) => <div className="pr-row" key={r[0]}>{r.map((v) => <span key={v}>{v}</span>)}</div>)}
        <div className="pr-row pr-total"><span>Total</span><span>$25,000.00</span><span>$465.00</span></div>
      </div>
    </div>
  )
}

function ReimbursementsPanel() {
  return (
    <div className="showcase-panel reimb-panel">
      <div className="reimb-title">Reimbursements</div>
      <div className="reimb-head"><span>Employee</span><span>Date</span><span>Description</span><span>Total</span></div>
      <div className="reimb-row">
        <span>Darcy Mitchell</span><span>7 Jan</span><span>Office Supplies</span>
        <span className="status">Pending</span>
      </div>
      <div className="reimb-row">
        <span className="reimb-flag" aria-hidden="true">!</span>
        <span>Maya Chen</span><span>7 Jan</span><span>Cab Ride</span>
        <span className="status">Pending</span>
        <div className="reimb-alert">
          <b>Duplicate Detected</b>
          <span>This claim looks similar to an earlier one.</span>
        </div>
      </div>
    </div>
  )
}

function SchedulePanel() {
  const employees = [
    { name: 'John Wick', shifts: [null, ['Level 1/300 Barangaroo', 'chip-blue'], ['106/63A Archer St', 'chip-green']] },
    { name: 'Marquis Vincent Bisset', shifts: [['Level 1/300 Barangaroo', 'chip-blue'], ['106/63A Archer St', 'chip-green']] },
    { name: 'Winston Scott', shifts: [] },
    { name: 'Viggo Tarasov', shifts: [['2 Catherine St', 'chip-teal']] },
  ]
  return (
    <div className="showcase-panel sched-panel">
      <div className="sched-title">Schedule</div>
      <div className="sched-toggle">
        <span className="active">Employees</span>
        <span>Projects</span>
      </div>
      <div className="sched-cols">
        <div className="sched-head" />
        <div className="sched-head">MON 26</div>
        <div className="sched-head">TUES 27</div>
        {employees.map((emp) => (
          <Fragment key={emp.name}>
            <div className="sched-emp">{emp.name}<small>Casual</small></div>
            {[0, 1].map((day) => (
              <div className="sched-cell" key={`${emp.name}-${day}`}>
                {emp.shifts[day] && <span className={`sched-chip ${emp.shifts[day]![1]}`}>{emp.shifts[day]![0]}</span>}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

function CalcIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <rect x="4" y="2.5" width="16" height="19" rx="2.5" />
      <line x1="7" y1="6.5" x2="17" y2="6.5" />
      <circle cx="7.6" cy="11.2" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="11.2" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="16.4" cy="11.2" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="7.6" cy="15" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="15" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="16.4" cy="15" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="7.6" cy="18.8" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="18.8" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="16.4" cy="18.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.5h16v11.5H9.5L5 21v-4H4V5.5Z" />
      <path d="M8 10.5l2.3 2.3L16 7.5" />
    </svg>
  )
}

function ScheduleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <line x1="3" y1="9.5" x2="21" y2="9.5" />
      <line x1="7.5" y1="2.7" x2="7.5" y2="6.3" />
      <line x1="16.5" y1="2.7" x2="16.5" y2="6.3" />
      <rect x="6.5" y="12.5" width="4.5" height="3.5" fill="currentColor" stroke="none" />
    </svg>
  )
}
