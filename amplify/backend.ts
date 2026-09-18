import { defineBackend } from '@aws-amplify/backend'
import { auth } from './auth/resource'
import { data } from './data/resource'
import { gaAnalytics } from './functions/ga-analytics/resource'

defineBackend({
  auth,
  data,
  gaAnalytics,
})
