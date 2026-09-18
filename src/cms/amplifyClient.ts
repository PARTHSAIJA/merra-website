import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/data'
import type { Schema } from '../../amplify/data/resource'

let configured = false
let configuring: Promise<{ ok: boolean; error?: string }> | null = null

/**
 * Loads /amplify_outputs.json at runtime (rather than a static bundler
 * import) so the admin and blog bundles still build and run before the
 * backend has ever been deployed — they just show a "not connected yet"
 * state instead of failing to build. Amplify Hosting's backend build phase
 * writes the real file into public/ before every frontend build; see
 * amplify.yml and amplify/README.md.
 */
export function ensureAmplifyConfigured(): Promise<{ ok: boolean; error?: string }> {
  if (configured) return Promise.resolve({ ok: true })
  if (configuring) return configuring

  configuring = fetch('/amplify_outputs.json')
    .then(async (res) => {
      if (!res.ok) {
        throw new Error('This backend has not been deployed yet.')
      }
      const outputs = await res.json()
      Amplify.configure(outputs)
      configured = true
      return { ok: true }
    })
    .catch((err: unknown) => {
      configuring = null
      return {
        ok: false,
        error: err instanceof Error ? err.message : 'Failed to load backend configuration.',
      }
    })

  return configuring
}

export function getClient() {
  return generateClient<Schema>()
}
