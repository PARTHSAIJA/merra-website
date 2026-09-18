import { useEffect, useState } from 'react'
import { Authenticator } from '@aws-amplify/ui-react'
import { ensureAmplifyConfigured } from '../cms/amplifyClient'
import Shell from './components/Shell'

type BootState = { status: 'loading' } | { status: 'ready' } | { status: 'error'; error: string }

export default function AdminApp() {
  const [boot, setBoot] = useState<BootState>({ status: 'loading' })

  useEffect(() => {
    ensureAmplifyConfigured().then((result) => {
      setBoot(result.ok ? { status: 'ready' } : { status: 'error', error: result.error ?? 'Unknown error' })
    })
  }, [])

  if (boot.status === 'loading') return null

  if (boot.status === 'error') {
    return (
      <div className="admin-boot-error">
        <h1>Backend not connected</h1>
        <p>{boot.error}</p>
        <p>
          Deploy the Amplify backend for this app (see <code>amplify/README.md</code>) — the admin dashboard
          will work automatically once it's live.
        </p>
      </div>
    )
  }

  return (
    <Authenticator hideSignUp>
      {({ signOut, user }) => <Shell userEmail={user?.signInDetails?.loginId ?? ''} onSignOut={() => signOut?.()} />}
    </Authenticator>
  )
}
