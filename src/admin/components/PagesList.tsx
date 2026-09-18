import { useEffect, useState } from 'react'
import { getClient } from '../../cms/amplifyClient'
import type { CmsPage } from '../../cms/types'

export default function PagesList() {
  const [pages, setPages] = useState<CmsPage[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function refresh() {
    const client = getClient()
    const { data, errors } = await client.models.Page.list()
    if (errors?.length) {
      setError(errors[0].message)
      return
    }
    setPages((data ?? []) as unknown as CmsPage[])
  }

  useEffect(() => {
    refresh()
  }, [])

  async function remove(slug: string) {
    if (!confirm(`Delete "${slug}"? This can't be undone.`)) return
    const client = getClient()
    await client.models.Page.delete({ slug })
    refresh()
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Pages</h1>
        <a className="admin-button" href="#/pages/new">
          New page
        </a>
      </div>

      {error && <div className="admin-callout">{error}</div>}

      <table className="admin-table admin-table-wide">
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pages?.map((p) => (
            <tr key={p.slug}>
              <td>{p.title}</td>
              <td>/blog/{p.slug}</td>
              <td>
                <span className={`admin-badge admin-badge-${p.status.toLowerCase()}`}>{p.status}</span>
              </td>
              <td className="admin-table-actions">
                <a href={`#/pages/edit/${encodeURIComponent(p.slug)}`}>Edit</a>
                {p.status === 'PUBLISHED' && (
                  <a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer">
                    View
                  </a>
                )}
                <button onClick={() => remove(p.slug)}>Delete</button>
              </td>
            </tr>
          ))}
          {pages && pages.length === 0 && (
            <tr>
              <td colSpan={4} className="admin-muted">
                No pages yet — create one to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
