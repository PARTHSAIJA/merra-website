import heroDesk from '../assets/hero-desk.jpg'

export default function Hero() {
  return (
    <section className="hero container" id="top">
      <div className="early-access">
        <span>Merra is now in early access!</span>
        <a href="#demo">Sign up now</a>
      </div>
      <h1>Payroll made simple.</h1>
      <p className="hero-copy">Less admin. More impact.<br />The AI payroll platform for modern teams.</p>
      <a className="button button-dark" href="#demo">Book a Demo</a>

      <div className="hero-stage" aria-label="Merra product preview">
        <div className="stage-photo">
          <div className="stage-photo-bg" style={{ backgroundImage: `url(${heroDesk})` }} />

          <div className="mini-phone">
            <div className="phone-top">Hi, John</div>
            <div className="phone-card">
              <span className="phone-tag">Upcoming</span>
              <b>Meridian Tower</b>
              <span>9:00 AM – 5:00 PM</span>
              <button>Check in</button>
            </div>

            <div>
              <div className="phone-section-label">Your Pay</div>
              <div className="phone-pay">
                <div className="phone-pay-row"><span>Current Period</span><span>15 – 29 April 2026</span></div>
                <div className="phone-pay-row"><span>Previous Period</span><span>1 – 15 April 2026</span></div>
                <div className="phone-pay-actions">
                  <button type="button"><ClockIcon />Last Payslip</button>
                  <button type="button"><HistoryIcon />View History</button>
                </div>
              </div>
            </div>

            <div>
              <div className="phone-section-label">Quick Actions</div>
              <div className="quick-grid">
                <div className="quick-card"><BeachIcon /><span>Leave</span></div>
                <div className="quick-card"><ReceiptIcon /><span>Expenses</span></div>
              </div>
            </div>

            <div className="phone-nav">
              <HomeIcon />
              <CalendarNavIcon />
              <SendIcon />
              <ProfileIcon />
            </div>
          </div>
        </div>

        <div className="stage-dashboard">
          <DashboardPreview />
        </div>
      </div>
    </section>
  )
}

function DashboardPreview() {
  const checkins = [
    ['Lachlan Hughes', '09:00 am', '09:00 am'],
    ['Maya Chen', '09:00 am', '09:00 am'],
    ['Darcy Mitchell', '–', '09:00 am'],
    ['Chloe Robertson', '–', '09:00 am'],
    ['Liam O’Connor', '–', '09:00 am'],
    ['Anthony Malouf', '–', '09:00 am'],
  ]
  const leave = [
    ['Anthony Malouf', 'Annual Leave', '06 – 07 Jan', 'approved'],
    ['Lachlan Hughes', 'Sick Leave', '07 Jan', 'pending'],
  ] as const
  const timesheets = [
    ['Liam O’Connor', 'approved'],
    ['Maya Chen', 'approved'],
    ['Chloe Robertson', 'approved'],
    ['Darcy Mitchell', 'pending'],
  ] as const
  const updates = [
    ['Anthony Malouf', '1 Year Anniversary', '05 Jan'],
    ['Liam O’Connor', 'Probation Period Ending', '05 Jan'],
    ['Liam O’Connor', 'License Expires', '05 Jan'],
    ['Darcy Mitchell', 'Missing Super Details', '05 Jan'],
  ]

  return (
    <div className="dashboard-window">
      <aside className="dash-sidebar">
        <div className="dash-dot"></div>
        {['Home','Approvals','Payroll','Schedule','Employees','Reports','Settings'].map((item, i) => (
          <div key={item} className={i === 0 ? 'dash-nav active' : 'dash-nav'}>
            <span className="dash-icon"></span><small>{item}</small>
          </div>
        ))}
      </aside>
      <div className="dash-content">
        <div className="dash-header">
          <h2>Next Payroll, Thursday January 7</h2>
          <div className="dash-avatar">A</div>
        </div>
        <div className="dash-grid">
          <div className="dash-card">
            <h3>Employees Check in, Today 05 Jan</h3>
            <div className="table-head"><span>Employee</span><span>Clock In</span><span>Scheduled</span></div>
            {checkins.map((row) => (
              <div className="table-row" key={row[0]}><span>{row[0]}</span><span>{row[1]}</span><span>{row[2]}</span></div>
            ))}
          </div>
          <div className="dash-card leave-card">
            <h3>Employer’s Leave</h3>
            <div className="leave-row-head"><span>Employee</span><span>Leave Type</span><span>Date</span><span>Status</span></div>
            {leave.map((row) => (
              <div className="leave-row" key={row[0]}>
                <span>{row[0]}</span><span>{row[1]}</span><span>{row[2]}</span>
                <em className={row[3]}>{row[3] === 'approved' ? 'Approved' : 'Pending'}</em>
              </div>
            ))}
          </div>
          <div className="dash-card">
            <h3>Timesheets Week Ending 07 Jan</h3>
            <div className="status-row-head"><span>Employee</span><span>Status</span></div>
            {timesheets.map((row) => (
              <div className="status-row" key={row[0]}>
                <span>{row[0]}</span>
                <em className={row[1]}>{row[1] === 'approved' ? 'Approved' : 'Pending'}</em>
              </div>
            ))}
          </div>
          <div className="dash-card leave-card">
            <h3>Employer’s Updates</h3>
            <div className="updates-row-head"><span>Employee</span><span>Updates</span><span>Date</span></div>
            {updates.map((row, i) => (
              <div className="updates-row" key={i}><span>{row[0]}</span><span>{row[1]}</span><span>{row[2]}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z" fill="currentColor" />
    </svg>
  )
}

function HistoryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3C8.03 3 4 7.03 4 12H1L4.89 15.89L4.96 16.03L9 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C8.27 19.99 10.51 21 13 21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3ZM12 8V13L16.28 15.54L17 14.33L13.5 12.25V8H12Z" fill="currentColor" />
    </svg>
  )
}

function BeachIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.36 5.64L16.95 7.05C18.22 8.32 19 10.07 19 12C19 15.87 15.87 19 12 19C10.07 19 8.32 18.22 7.05 16.95L5.64 18.36C7.27 19.99 9.51 21 12 21C16.97 21 21 16.97 21 12C21 9.51 19.99 7.27 18.36 5.64ZM13 3.05V9.09L18.13 12.19C18.05 8.29 15.28 4.86 13 3.05ZM3 15C3 15 4 14 6 14C8 14 9 15 11 15C13 15 14 14 14 14L13 12C13 12 12 13 10 13C8 13 7 12 5 12C4.34 12 3.68 12.19 3.14 12.44C3.05 12.95 3 13.47 3 14C3 14.34 3.02 14.67 3 15Z" fill="currentColor" />
    </svg>
  )
}

function ReceiptIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 14V4C19 2.9 18.1 2 17 2H7C5.9 2 5 2.9 5 4V14L2 17V19H22V17L19 14ZM17 14H7V4H17V14ZM8 6H16V8H8V6ZM8 10H16V12H8V10Z" fill="currentColor" />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="currentColor" />
    </svg>
  )
}

function CalendarNavIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 4H18V2H16V4H8V2H6V4H5C3.9 4 3 4.9 3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z" fill="currentColor" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor" />
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor" />
    </svg>
  )
}
