import { Suspense, lazy, useState } from 'react'
import ComingSoon from './components/ComingSoon'

const FullSite = lazy(() => import('./FullSite'))

const UNLOCK_KEY = 'merra-access'

function isUnlocked() {
  try {
    return localStorage.getItem(UNLOCK_KEY) === 'granted'
  } catch {
    return false
  }
}

export default function App() {
  const [unlocked, setUnlocked] = useState(isUnlocked)

  function unlock() {
    setUnlocked(true)
    try {
      localStorage.setItem(UNLOCK_KEY, 'granted')
    } catch {
      // localStorage unavailable (e.g. private browsing) — stay unlocked for this session only
    }
  }

  if (!unlocked) {
    return <ComingSoon onUnlock={unlock} />
  }

  return (
    <Suspense fallback={null}>
      <FullSite />
    </Suspense>
  )
}
