import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getClient } from '../../cms/amplifyClient'

interface DailyPoint {
  date: string
  activeUsers: number
  sessions: number
}
interface TopPage {
  path: string
  views: number
}
interface TrafficSource {
  channel: string
  sessions: number
}

type State =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | {
      status: 'ready'
      activeUsers: number
      sessions: number
      pageviews: number
      avgSessionDuration: number
      bounceRate: number
      daily: DailyPoint[]
      topPages: TopPage[]
      sources: TrafficSource[]
    }

const RANGES = [
  { label: '7 days', days: 7 },
  { label: '28 days', days: 28 },
  { label: '90 days', days: 90 },
]

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  return `${m}m ${s}s`
}

export default function AnalyticsDashboard() {
  const [days, setDays] = useState(28)
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    setState({ status: 'loading' })

    async function load() {
      try {
        const client = getClient()
        const { data, errors } = await client.queries.getAnalyticsSummary({ days })
        if (cancelled) return
        if (errors?.length || !data) {
          setState({ status: 'error', error: errors?.[0]?.message ?? 'No data returned.' })
          return
        }
        setState({
          status: 'ready',
          activeUsers: data.activeUsers ?? 0,
          sessions: data.sessions ?? 0,
          pageviews: data.pageviews ?? 0,
          avgSessionDuration: data.avgSessionDuration ?? 0,
          bounceRate: data.bounceRate ?? 0,
          daily: data.dailySeries ? JSON.parse(data.dailySeries) : [],
          topPages: data.topPages ? JSON.parse(data.topPages) : [],
          sources: data.trafficSources ? JSON.parse(data.trafficSources) : [],
        })
      } catch (err) {
        if (!cancelled) {
          setState({ status: 'error', error: err instanceof Error ? err.message : 'Failed to load analytics.' })
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [days])

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Analytics</h1>
        <div className="admin-range-picker">
          {RANGES.map((r) => (
            <button key={r.days} className={days === r.days ? 'active' : ''} onClick={() => setDays(r.days)}>
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {state.status === 'loading' && <p className="admin-muted">Loading…</p>}

      {state.status === 'error' && (
        <div className="admin-callout">
          <p>Couldn't load analytics: {state.error}</p>
          <p className="admin-muted">
            Make sure the GA_PROPERTY_ID and GA_SERVICE_ACCOUNT_KEY secrets are set on this backend environment.
          </p>
        </div>
      )}

      {state.status === 'ready' && (
        <>
          <div className="admin-kpi-grid">
            <div className="admin-kpi-card">
              <span>Active users</span>
              <strong>{state.activeUsers.toLocaleString()}</strong>
            </div>
            <div className="admin-kpi-card">
              <span>Sessions</span>
              <strong>{state.sessions.toLocaleString()}</strong>
            </div>
            <div className="admin-kpi-card">
              <span>Pageviews</span>
              <strong>{state.pageviews.toLocaleString()}</strong>
            </div>
            <div className="admin-kpi-card">
              <span>Avg. session</span>
              <strong>{formatDuration(state.avgSessionDuration)}</strong>
            </div>
            <div className="admin-kpi-card">
              <span>Bounce rate</span>
              <strong>{(state.bounceRate * 100).toFixed(1)}%</strong>
            </div>
          </div>

          <div className="admin-panel">
            <h2>Traffic over time</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={state.daily}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E7E0D5" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="activeUsers" name="Active users" stroke="#1C2424" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="sessions" name="Sessions" stroke="#83776F" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="admin-panel-row">
            <div className="admin-panel">
              <h2>Top pages</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Page</th>
                    <th>Views</th>
                  </tr>
                </thead>
                <tbody>
                  {state.topPages.map((p) => (
                    <tr key={p.path}>
                      <td>{p.path}</td>
                      <td>{p.views.toLocaleString()}</td>
                    </tr>
                  ))}
                  {state.topPages.length === 0 && (
                    <tr>
                      <td colSpan={2} className="admin-muted">No data for this range.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="admin-panel">
              <h2>Traffic sources</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Channel</th>
                    <th>Sessions</th>
                  </tr>
                </thead>
                <tbody>
                  {state.sources.map((s) => (
                    <tr key={s.channel}>
                      <td>{s.channel}</td>
                      <td>{s.sessions.toLocaleString()}</td>
                    </tr>
                  ))}
                  {state.sources.length === 0 && (
                    <tr>
                      <td colSpan={2} className="admin-muted">No data for this range.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
