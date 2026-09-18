import { useEffect, useState } from 'react'
import { getClient } from '../../cms/amplifyClient'
import BlockRenderer from '../../cms/BlockRenderer'
import { newBlock, parseBlocks, type Block, type BlockType, BLOCK_LABELS } from '../../cms/types'
import BlockFields from './BlockFields'

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

type Props =
  | { mode: 'create'; authorEmail: string }
  | { mode: 'edit'; slug: string; authorEmail: string }

export default function PageEditor(props: Props) {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)
  const [description, setDescription] = useState('')
  const [blocks, setBlocks] = useState<Block[]>([])
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT')
  const [loaded, setLoaded] = useState(props.mode === 'create')
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    if (props.mode !== 'edit') return
    let cancelled = false
    getClient()
      .models.Page.get({ slug: props.slug })
      .then(({ data }) => {
        if (cancelled || !data) return
        setTitle(data.title)
        setSlug(data.slug)
        setDescription(data.description ?? '')
        setBlocks(parseBlocks(data.blocksJson))
        setStatus((data.status as 'DRAFT' | 'PUBLISHED') ?? 'DRAFT')
        setSlugTouched(true)
        setLoaded(true)
      })
    return () => {
      cancelled = true
    }
  }, [props.mode, props.mode === 'edit' ? props.slug : undefined])

  function onTitleChange(value: string) {
    setTitle(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  function addBlock(type: BlockType) {
    setBlocks((prev) => [...prev, newBlock(type)])
  }

  function updateBlock(id: string, next: Block) {
    setBlocks((prev) => prev.map((b) => (b.id === id ? next : b)))
  }

  function removeBlock(id: string) {
    setBlocks((prev) => prev.filter((b) => b.id !== id))
  }

  function moveBlock(id: string, dir: -1 | 1) {
    setBlocks((prev) => {
      const i = prev.findIndex((b) => b.id === id)
      const j = i + dir
      if (i < 0 || j < 0 || j >= prev.length) return prev
      const next = [...prev]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
  }

  async function save(nextStatus?: 'DRAFT' | 'PUBLISHED') {
    if (!title.trim() || !slug.trim()) {
      setNotice('Title and slug are required.')
      return
    }
    setSaving(true)
    setNotice(null)
    const finalStatus = nextStatus ?? status
    const client = getClient()
    const payload = {
      slug,
      title,
      description,
      blocksJson: JSON.stringify(blocks),
      status: finalStatus,
      authorEmail: props.authorEmail,
      ...(finalStatus === 'PUBLISHED' ? { publishedAt: new Date().toISOString() } : {}),
    }

    try {
      if (props.mode === 'create') {
        await client.models.Page.create(payload)
        window.location.hash = `#/pages/edit/${encodeURIComponent(slug)}`
      } else {
        await client.models.Page.update(payload)
      }
      setStatus(finalStatus)
      setNotice(finalStatus === 'PUBLISHED' ? 'Published.' : 'Saved.')
    } catch (err) {
      setNotice(err instanceof Error ? err.message : 'Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  if (!loaded) return <div className="admin-page">Loading…</div>

  return (
    <div className="admin-page admin-editor">
      <div className="admin-page-header">
        <h1>{props.mode === 'create' ? 'New page' : 'Edit page'}</h1>
        <div className="admin-editor-actions">
          {status === 'PUBLISHED' && <span className="admin-badge admin-badge-published">PUBLISHED</span>}
          <button disabled={saving} onClick={() => save('DRAFT')}>
            Save draft
          </button>
          <button disabled={saving} className="admin-button" onClick={() => save('PUBLISHED')}>
            {status === 'PUBLISHED' ? 'Save & keep published' : 'Publish'}
          </button>
          {status === 'PUBLISHED' && (
            <button disabled={saving} onClick={() => save('DRAFT')}>
              Unpublish
            </button>
          )}
        </div>
      </div>

      {notice && <div className="admin-callout">{notice}</div>}

      <div className="admin-editor-grid">
        <div className="admin-editor-form">
          <label>
            Title
            <input value={title} onChange={(e) => onTitleChange(e.target.value)} />
          </label>
          <label>
            Slug
            <div className="admin-slug-field">
              <span>/blog/</span>
              <input
                value={slug}
                disabled={props.mode === 'edit'}
                onChange={(e) => {
                  setSlugTouched(true)
                  setSlug(slugify(e.target.value))
                }}
              />
            </div>
          </label>
          <label>
            Description (SEO)
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
          </label>

          <h2>Content blocks</h2>
          <div className="admin-blocks">
            {blocks.map((block, i) => (
              <div key={block.id} className="admin-block-card">
                <div className="admin-block-card-header">
                  <span>{BLOCK_LABELS[block.type]}</span>
                  <div>
                    <button disabled={i === 0} onClick={() => moveBlock(block.id, -1)} aria-label="Move up">
                      ↑
                    </button>
                    <button disabled={i === blocks.length - 1} onClick={() => moveBlock(block.id, 1)} aria-label="Move down">
                      ↓
                    </button>
                    <button onClick={() => removeBlock(block.id)} aria-label="Remove">
                      ✕
                    </button>
                  </div>
                </div>
                <BlockFields block={block} onChange={(next) => updateBlock(block.id, next)} />
              </div>
            ))}
          </div>

          <div className="admin-add-block">
            {(Object.keys(BLOCK_LABELS) as BlockType[]).map((type) => (
              <button key={type} onClick={() => addBlock(type)}>
                + {BLOCK_LABELS[type]}
              </button>
            ))}
          </div>
        </div>

        <div className="admin-editor-preview">
          <div className="admin-preview-label">Preview</div>
          <div className="admin-preview-surface">
            <h1 className="cms-heading">{title || 'Untitled page'}</h1>
            <BlockRenderer blocks={blocks} />
          </div>
        </div>
      </div>
    </div>
  )
}
