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
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z" fill="#1C2424" />
      <path d="M11.25 7.72H6.25V9.22H11.25V7.72Z" fill="#1C2424" />
      <path d="M18 15.75H13V17.25H18V15.75Z" fill="#1C2424" />
      <path d="M18 13.25H13V14.75H18V13.25Z" fill="#1C2424" />
      <path d="M8 18H9.5V16H11.5V14.5H9.5V12.5H8V14.5H6V16H8V18Z" fill="#1C2424" />
      <path d="M14.09 10.95L15.5 9.54L16.91 10.95L17.97 9.89L16.56 8.47L17.97 7.06L16.91 6L15.5 7.41L14.09 6L13.03 7.06L14.44 8.47L13.03 9.89L14.09 10.95Z" fill="#1C2424" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 4H6C4.9 4 4 4.9 4 6V24L8 20H22C23.1 20 24 19.1 24 18V6C24 4.9 23.1 4 22 4ZM22 18H7.17L6 19.17V6H22V18Z" fill="#1C2424" />
      <path d="M14 17L15.57 13.57L19 12L15.57 10.43L14 7L12.43 10.43L9 12L12.43 13.57L14 17Z" fill="#1C2424" />
    </svg>
  )
}

function ScheduleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 7H10V9H20V21H4V9H6V13H8V5H14V1H6V7H4C2.9 7 2 7.9 2 9V21C2 22.1 2.9 23 4 23H20C21.1 23 22 22.1 22 21V9C22 7.9 21.1 7 20 7Z" fill="#1C2424" />
    </svg>
  )
}
