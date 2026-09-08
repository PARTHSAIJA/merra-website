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
        <div className="stage-card stage-left" style={{ backgroundImage: `url(${heroDesk})` }}>
          <div className="mini-phone">
            <div className="phone-top">Hi, John</div>
            <div className="phone-card">
              <strong>Upcoming</strong>
              <span>Meridian Tower</span>
              <b>9:00 AM – 5:00 PM</b>
              <button>Check in</button>
            </div>
            <div className="quick-label">Quick Actions</div>
            <div className="quick-grid"><span>Expenses</span><span>Leave</span></div>
          </div>
        </div>

        <div className="stage-card stage-main">
          <DashboardPreview />
        </div>
      </div>
    </section>
  )
}

function DashboardPreview() {
  const people = [
    ['Lachlan Hughes', '09:00 am', '09:00 am'],
    ['Maya Chen', '09:00 am', '09:00 am'],
    ['Darcy Mitchell', '–', '09:00 am'],
    ['Chloe Robertson', '–', '09:00 am'],
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
        <div className="dash-card">
          <h3>Employees Check in, Today 05 Jan</h3>
          <div className="table-head"><span>Employee</span><span>Clock In</span><span>Scheduled</span></div>
          {people.map((row) => (
            <div className="table-row" key={row[0]}><span>{row[0]}</span><span>{row[1]}</span><span>{row[2]}</span></div>
          ))}
        </div>
        <div className="dash-card leave-card">
          <h3>Employer’s Leave</h3>
          <div className="leave-row"><span>Anthony Malouf</span><span>Annual Leave</span><em className="approved">Approved</em></div>
          <div className="leave-row"><span>Lachlan Hughes</span><span>Sick Leave</span><em className="pending">Pending</em></div>
        </div>
      </div>
    </div>
  )
}
