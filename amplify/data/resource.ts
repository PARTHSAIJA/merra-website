import { type ClientSchema, a, defineData } from '@aws-amplify/backend'
import { gaAnalytics } from '../functions/ga-analytics/resource'

const schema = a.schema({
  // A page built with the admin page builder (blog posts, landing pages).
  // Never used for Home / Privacy / Terms / Support — those stay static.
  Page: a
    .model({
      slug: a.string().required(),
      title: a.string().required(),
      description: a.string(),
      // JSON-serialized array of content blocks — see src/cms/types.ts
      blocksJson: a.string().required(),
      status: a.enum(['DRAFT', 'PUBLISHED']),
      publishedAt: a.datetime(),
      authorEmail: a.string(),
    })
    .identifier(['slug'])
    .authorization((allow) => [
      allow.authenticated().to(['create', 'update', 'delete', 'read']),
      allow.publicApiKey().to(['read']),
    ]),

  AnalyticsSummary: a.customType({
    activeUsers: a.integer(),
    sessions: a.integer(),
    pageviews: a.integer(),
    avgSessionDuration: a.float(),
    bounceRate: a.float(),
    // JSON-encoded arrays — parsed on the client
    dailySeries: a.string(),
    topPages: a.string(),
    trafficSources: a.string(),
  }),

  getAnalyticsSummary: a
    .query()
    .arguments({ days: a.integer() })
    .returns(a.ref('AnalyticsSummary'))
    .authorization((allow) => [allow.authenticated()])
    .handler(a.handler.function(gaAnalytics)),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 365,
    },
  },
})
