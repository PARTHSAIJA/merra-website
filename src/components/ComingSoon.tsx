import { useState, type FormEvent } from 'react'
import Logo from './Logo'

const PASSWORD = 'showmemerra'

export default function ComingSoon({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (value === PASSWORD) {
      onUnlock()
    } else {
      setError(true)
    }
  }

  return (
    <div className="coming-soon container">
      <a className="brand" href="/" aria-label="Merra home">
        <Logo className="brand-logo" />
      </a>

      <div className="coming-soon-body">
        <h1>Coming soon.</h1>
        <p className="hero-copy">Payroll made simple. We’re putting the finishing touches on Merra — check back soon.</p>

        <form className="password-gate" onSubmit={handleSubmit}>
          <input
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false) }}
            placeholder="Enter password"
            aria-label="Password"
            autoFocus
          />
          <button type="submit" className="button button-dark">Enter</button>
        </form>
        {error && <p className="password-error" role="alert">Incorrect password.</p>}
      </div>
    </div>
  )
}
