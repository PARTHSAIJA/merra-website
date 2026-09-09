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
  const columns = ['Employee', 'Earnings', 'Deductions', 'Tax', 'Super', 'Net Pay', 'Reimbursements']
  const rows = [
    ['Lachlan Hughes', '$4,850.00', '$120.00', '$1,140.00', '$557.75', '$3,590.00', '$85.50'],
    ['Maya Chen', '$5,600.00', '$ 00.00', '$1,380.00', '$644.00', '$4,220.00', '$240.00'],
    ['Darcy Mitchell', '$3,950.00', '$85.00', '$860.00', '$454.25', '$3,005.00', '$0.00'],
    ['Chloe Robertson', '$6,200.00', '$210.00', '$1,620.00', '$713.00', '$4,370.00', '$150.00'],
    ['Liam O’Connor', '$4,400.00', '$50.00', '$1,010.00', '$506.00', '$3,340.00', '$65.00'],
  ]
  const total = ['Total', '$25,000.00', '$465.00', '$6,010.00', '$2,875.00', '$18,525.00', '$540.50']
  return (
    <div className="showcase-panel pr-panel">
      <div className="pr-head-bar">
        <div className="pr-title">Payroll Summary</div>
        <div className="pr-avatar">A</div>
      </div>
      <div className="pr-filters">
        <span><CalendarIcon />1 January to 31 March 2026</span>
        <span className="pr-search">Employee Search<SearchIcon /></span>
      </div>
      <div className="pr-table">
        <div className="pr-row pr-head-row">{columns.map((c) => <span key={c}>{c}</span>)}</div>
        {rows.map((r) => <div className="pr-row" key={r[0]}>{r.map((v, i) => <span key={i}>{v}</span>)}</div>)}
        <div className="pr-row pr-total">{total.map((v, i) => <span key={i}>{v}</span>)}</div>
      </div>
      <div className="pr-exports">
        <button type="button"><DownloadIcon />CSV</button>
        <button type="button"><DownloadIcon />PDF</button>
      </div>
    </div>
  )
}

function ReimbursementsPanel() {
  const rows = [
    { name: 'Darcy Mitchell', date: '7 Jan', desc: 'Office Supplies', total: '$210.00', flagged: false },
    { name: 'Maya Chen', date: '7 Jan', desc: 'Cab Ride', total: '$35.00', flagged: true },
  ]
  return (
    <div className="showcase-panel reimb-panel">
      <div className="reimb-title">Reimbursements</div>
      <div className="reimb-head"><span>Employee</span><span>Date</span><span>Description</span><span>Total</span></div>
      {rows.map((r) => (
        <div className="reimb-row" key={r.name}>
          {r.flagged && <span className="reimb-flag" aria-hidden="true">!</span>}
          <span>{r.name}</span><span>{r.date}</span><span>{r.desc}</span><span>{r.total}</span>
          <span className="status">Pending</span>
        </div>
      ))}
    </div>
  )
}

function SchedulePanel() {
  const employees = [
    { name: 'John Wick', shifts: [[], [['Level 1/300 Barangaroo', 'chip-blue']]] },
    { name: 'Marquis Vincent Bisset', shifts: [[['Level 1/300 Barangaroo', 'chip-blue'], ['106/63A Archer St', 'chip-green']], []] },
    { name: 'Winston Scott', shifts: [[], []] },
    { name: 'Viggo Tarasov', shifts: [[['2 Catherine St', 'chip-teal']], []] },
  ] as const
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
                {emp.shifts[day].map(([label, chip]) => (
                  <span className={`sched-chip ${chip}`} key={label}>{label}</span>
                ))}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 4H18V2H16V4H8V2H6V4H5C3.9 4 3 4.9 3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z" fill="currentColor" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 9H15V3H9V9H5L12 16L19 9ZM5 18V20H19V18H5Z" fill="currentColor" />
    </svg>
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
