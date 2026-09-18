import { defineFunction, secret } from '@aws-amplify/backend'

/**
 * Pulls summary metrics from Google Analytics 4 (GA4 Data API) for the
 * admin dashboard. Needs two secrets set on the Amplify backend environment
 * before this works — see amplify/README.md:
 *   - GA_PROPERTY_ID           the numeric GA4 property id
 *   - GA_SERVICE_ACCOUNT_KEY   full JSON key of a GCP service account with
 *                              Viewer access on that GA4 property
 */
export const gaAnalytics = defineFunction({
  name: 'ga-analytics',
  entry: './handler.ts',
  timeoutSeconds: 30,
  environment: {
    GA_PROPERTY_ID: secret('GA_PROPERTY_ID'),
    GA_SERVICE_ACCOUNT_KEY: secret('GA_SERVICE_ACCOUNT_KEY'),
  },
})
