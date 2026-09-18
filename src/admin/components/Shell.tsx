import { useEffect, useState } from 'react'
import AnalyticsDashboard from './AnalyticsDashboard'
import PagesList from './PagesList'
import PageEditor from './PageEditor'

type Route =
  | { name: 'dashboard' }
  | { name: 'pages' }
  | { name: 'new-page' }
  | { name: 'edit-page'; slug: string }

function parseHash(hash: string): Route {
  const path = hash.replace(/^#\/?/, '')
  if (path === '' || path === 'dashboard') return { name: 'dashboard' }
  if (path === 'pages') return { name: 'pages' }
  if (path === 'pages/new') return { name: 'new-page' }
  const editMatch = path.match(/^pages\/edit\/(.+)$/)
  if (editMatch) return { name: 'edit-page', slug: decodeURIComponent(editMatch[1]) }
  return { name: 'dashboard' }
}

export default function Shell({ userEmail, onSignOut }: { userEmail: string; onSignOut: () => void }) {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">Merra Admin</div>
        <nav>
          <a className={route.name === 'dashboard' ? 'active' : ''} href="#/dashboard">
            Dashboard
          </a>
          <a className={route.name === 'pages' || route.name === 'new-page' || route.name === 'edit-page' ? 'active' : ''} href="#/pages">
            Pages
          </a>
        </nav>
        <div className="admin-user">
          <span>{userEmail}</span>
          <button onClick={onSignOut}>Sign out</button>
        </div>
      </aside>
      <main className="admin-main">
        {route.name === 'dashboard' && <AnalyticsDashboard />}
        {route.name === 'pages' && <PagesList />}
        {route.name === 'new-page' && <PageEditor mode="create" authorEmail={userEmail} />}
        {route.name === 'edit-page' && <PageEditor mode="edit" slug={route.slug} authorEmail={userEmail} />}
      </main>
    </div>
  )
}
