import { useEffect, useState } from 'react'
import { ensureAmplifyConfigured, getClient } from '../cms/amplifyClient'
import BlockRenderer from '../cms/BlockRenderer'
import { parseBlocks, type CmsPage } from '../cms/types'

type LoadState =
  | { status: 'loading' }
  | { status: 'not-connected'; error: string }
  | { status: 'list'; pages: CmsPage[] }
  | { status: 'page'; page: CmsPage }
  | { status: 'not-found' }

function currentSlug(): string | null {
  const path = window.location.pathname.replace(/^\/blog\/?/, '')
  return path ? decodeURIComponent(path.replace(/\/$/, '')) : null
}

export default function BlogApp() {
  const [state, setState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    async function load() {
      const config = await ensureAmplifyConfigured()
      if (!config.ok) {
        if (!cancelled) setState({ status: 'not-connected', error: config.error ?? 'Unknown error' })
        return
      }

      const client = getClient()
      const slug = currentSlug()

      if (slug) {
        const { data } = await client.models.Page.get({ slug }, { authMode: 'apiKey' })
        if (cancelled) return
        if (!data || data.status !== 'PUBLISHED') {
          setState({ status: 'not-found' })
        } else {
          setState({ status: 'page', page: data as unknown as CmsPage })
        }
        return
      }

      const { data } = await client.models.Page.list({
        filter: { status: { eq: 'PUBLISHED' } },
        authMode: 'apiKey',
      })
      if (!cancelled) {
        setState({ status: 'list', pages: (data ?? []) as unknown as CmsPage[] })
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  if (state.status === 'loading') return null

  if (state.status === 'not-connected') {
    return (
      <div className="blog-shell blog-message">
        <p>This page isn't available yet.</p>
      </div>
    )
  }

  if (state.status === 'not-found') {
    return (
      <div className="blog-shell blog-message">
        <h1>Page not found</h1>
        <p>
          <a href="/blog/">Back to all posts</a>
        </p>
      </div>
    )
  }

  if (state.status === 'list') {
    return (
      <div className="blog-shell blog-list">
        <h1>Latest from Merra</h1>
        {state.pages.length === 0 && <p>Nothing published yet — check back soon.</p>}
        <ul>
          {state.pages.map((p) => (
            <li key={p.slug}>
              <a href={`/blog/${p.slug}`}>{p.title}</a>
              {p.description && <p>{p.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const blocks = parseBlocks(state.page.blocksJson)
  return (
    <article className="blog-shell blog-page">
      <BlockRenderer blocks={blocks} />
    </article>
  )
}
