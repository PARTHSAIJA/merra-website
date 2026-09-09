import { useState } from 'react'
import payrollVisual from '../assets/Frame 268 (3).png'
import reimbursementsVisual from '../assets/Frame 268.png'
import scheduleVisual from '../assets/Frame 268 (1).png'

const features = [
  {
    kind: 'calc',
    title: 'Instant Calculations',
    copy: 'Calculate hours, overtime, and statutory taxes in seconds.',
    icon: CalcIcon,
    visual: payrollVisual,
  },
  {
    kind: 'errors',
    title: 'Zero Errors',
    copy: 'Smart algorithms catch mistakes before they hit your bank.',
    icon: ChatIcon,
    visual: reimbursementsVisual,
  },
  {
    kind: 'schedule',
    title: 'Schedules that Run Payroll',
    copy: 'Build shifts in minutes and stream approved hours straight to payroll.',
    icon: ScheduleIcon,
    visual: scheduleVisual,
  },
] as const

export default function ProductShowcase() {
  const [active, setActive] = useState(0)

  return (
    <section className="product-section" id="product">
      <div className="container section-heading">
        <h2>Smarter Payroll,<br />Zero Guesswork</h2>
        <p>From hours to pay runs, automate the entire flow and eliminate manual payroll admin for good.</p>
      </div>

      <div className="container showcase">
        <div className="showcase-visual" aria-hidden="true">
          <img src={features[active].visual} alt="" />
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
