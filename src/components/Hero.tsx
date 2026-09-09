import heroDesk from '../assets/hero-desk.jpg'
import dashboardBg from '../assets/4x/Rectangle 2.png'
import dashboardImg from '../assets/4x/home.png'
import phoneImg from '../assets/4x/1.1.1 Home.png'

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
          <img className="mini-phone" src={phoneImg} alt="Merra mobile app showing today's shift and quick actions" />
        </div>

        <div className="stage-dashboard">
          <img className="stage-dashboard-bg" src={dashboardBg} alt="" aria-hidden="true" />
          <img className="stage-dashboard-img" src={dashboardImg} alt="Merra payroll dashboard showing check-ins, leave, timesheets and updates" />
        </div>
      </div>
    </section>
  )
}
