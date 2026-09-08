const benefits = [
  ['Saves Time', 'Cut manual processing down to minutes with auto-synced hours, overtime, and pay runs.', ClockIcon],
  ['Always Compliant', 'Stay aligned with local tax rates, statutory caps, and labor laws automatically.', WrenchIcon],
  ['Bank-Grade Security', 'Protect sensitive payroll and employee records with enterprise encryption and strict access controls.', ShieldIcon],
] as const

export default function Benefits() {
  return (
    <section className="benefits-section">
      <div className="container section-heading compact">
        <h2>Built for modern teams</h2>
        <p>A flexible, intuitive platform designed to adapt to workplaces and simplify daily operations.</p>
      </div>
      <div className="container benefit-grid">
        {benefits.map(([title, copy, Icon]) => (
          <article className="benefit-card" key={title}>
            <div className="benefit-icon"><Icon /></div>
            <div><h3>{title}</h3><p>{copy}</p></div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M29.3334 7.72L23.2 2.57333L21.48 4.61333L27.6134 9.76L29.3334 7.72ZM10.5067 4.61333L8.80002 2.57333L2.66669 7.70667L4.38669 9.74667L10.5067 4.61333ZM16.6667 10.76H14.6667V18.76L21 22.56L22 20.92L16.6667 17.76V10.76ZM16 5.42667C9.37335 5.42667 4.00002 10.8 4.00002 17.4267C4.00002 24.0533 9.36002 29.4267 16 29.4267C22.6267 29.4267 28 24.0533 28 17.4267C28 10.8 22.6267 5.42667 16 5.42667ZM16 26.76C10.84 26.76 6.66669 22.5867 6.66669 17.4267C6.66669 12.2667 10.84 8.09333 16 8.09333C21.16 8.09333 25.3334 12.2667 25.3334 17.4267C25.3334 22.5867 21.16 26.76 16 26.76Z" fill="#6A615A" />
    </svg>
  )
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30.2078 25.3194L18.1011 13.2128C19.3411 10.0928 18.7011 6.41277 16.1811 3.87943C13.1144 0.812766 8.34111 0.532766 4.94111 3.01277L10.0611 8.1461L8.16777 10.0261L3.06111 4.91943C0.581106 8.3061 0.861106 13.0928 3.92777 16.1461C6.40777 18.6261 10.0211 19.2794 13.1144 18.1194L25.2611 30.2661C25.7811 30.7861 26.6211 30.7861 27.1411 30.2661L30.2078 27.1994C30.7411 26.6928 30.7411 25.8528 30.2078 25.3194ZM26.2078 27.4528L13.5944 14.8394C12.7811 15.4394 11.8744 15.7994 10.9278 15.9328C9.11444 16.1994 7.20777 15.6528 5.82111 14.2661C4.55444 13.0128 3.96777 11.3328 4.06111 9.67943L8.18111 13.7994L13.8344 8.1461L9.71444 4.0261C11.3678 3.93277 13.0344 4.51943 14.3011 5.77277C15.7411 7.21277 16.2878 9.19943 15.9544 11.0528C15.7944 11.9994 15.3944 12.8794 14.7811 13.6661L27.3811 26.2661L26.2078 27.4528Z" fill="#6A615A" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2.66666L5.33337 6.66666V14.7867C5.33337 21.52 9.88004 27.8 16 29.3333C22.12 27.8 26.6667 21.52 26.6667 14.7867V6.66666L16 2.66666ZM24 14.7867C24 20.12 20.6 25.0533 16 26.56C11.4 25.0533 8.00004 20.1333 8.00004 14.7867V8.41332L16 5.58666L24 8.41332V14.7867ZM11.76 14.12L9.86671 16L14.5867 20.72L22.1334 13.1733L20.2534 11.2933L14.6 16.9467L11.76 14.12Z" fill="#6A615A" />
    </svg>
  )
}
