import { BetaAnalyticsDataClient } from '@google-analytics/data'
import type { Schema } from '../../data/resource'

type Handler = Schema['getAnalyticsSummary']['functionHandler']

type Row = { metricValues?: ({ value?: string | null } | null)[] | null } | null | undefined

function metric(row: Row, i: number) {
  return Number(row?.metricValues?.[i]?.value ?? 0)
}

export const handler: Handler = async (event) => {
  const days = event.arguments.days ?? 28
  const propertyId = process.env.GA_PROPERTY_ID
  const rawKey = process.env.GA_SERVICE_ACCOUNT_KEY

  if (!propertyId || !rawKey) {
    throw new Error(
      'Analytics is not configured yet — set the GA_PROPERTY_ID and GA_SERVICE_ACCOUNT_KEY secrets on this backend environment.',
    )
  }

  const credentials = JSON.parse(rawKey)
  const client = new BetaAnalyticsDataClient({ credentials })
  const property = `properties/${propertyId}`
  const dateRanges = [{ startDate: `${days}daysAgo`, endDate: 'today' }]

  const [summary] = await client.runReport({
    property,
    dateRanges,
    metrics: [
      { name: 'activeUsers' },
      { name: 'sessions' },
      { name: 'screenPageViews' },
      { name: 'averageSessionDuration' },
      { name: 'bounceRate' },
    ],
  })

  const [daily] = await client.runReport({
    property,
    dateRanges,
    dimensions: [{ name: 'date' }],
    metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
    orderBys: [{ dimension: { dimensionName: 'date' } }],
  })

  const [pages] = await client.runReport({
    property,
    dateRanges,
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 10,
  })

  const [sources] = await client.runReport({
    property,
    dateRanges,
    dimensions: [{ name: 'sessionDefaultChannelGroup' }],
    metrics: [{ name: 'sessions' }],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
  })

  const row = summary.rows?.[0]

  return {
    activeUsers: metric(row, 0),
    sessions: metric(row, 1),
    pageviews: metric(row, 2),
    avgSessionDuration: metric(row, 3),
    bounceRate: metric(row, 4),
    dailySeries: JSON.stringify(
      (daily.rows ?? []).map((r) => ({
        date: r.dimensionValues?.[0]?.value ?? '',
        activeUsers: metric(r, 0),
        sessions: metric(r, 1),
      })),
    ),
    topPages: JSON.stringify(
      (pages.rows ?? []).map((r) => ({
        path: r.dimensionValues?.[0]?.value ?? '',
        views: metric(r, 0),
      })),
    ),
    trafficSources: JSON.stringify(
      (sources.rows ?? []).map((r) => ({
        channel: r.dimensionValues?.[0]?.value ?? '(unknown)',
        sessions: metric(r, 0),
      })),
    ),
  }
}
