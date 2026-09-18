import type { Block } from '../../cms/types'

export default function BlockFields({ block, onChange }: { block: Block; onChange: (next: Block) => void }) {
  switch (block.type) {
    case 'heading':
      return (
        <div className="admin-block-fields">
          <select value={block.level} onChange={(e) => onChange({ ...block, level: e.target.value as 'h1' | 'h2' | 'h3' })}>
            <option value="h1">Large (H1)</option>
            <option value="h2">Medium (H2)</option>
            <option value="h3">Small (H3)</option>
          </select>
          <input value={block.text} onChange={(e) => onChange({ ...block, text: e.target.value })} />
        </div>
      )
    case 'paragraph':
      return (
        <div className="admin-block-fields">
          <textarea rows={3} value={block.text} onChange={(e) => onChange({ ...block, text: e.target.value })} />
        </div>
      )
    case 'image':
      return (
        <div className="admin-block-fields">
          <input placeholder="Image URL" value={block.src} onChange={(e) => onChange({ ...block, src: e.target.value })} />
          <input placeholder="Alt text" value={block.alt} onChange={(e) => onChange({ ...block, alt: e.target.value })} />
        </div>
      )
    case 'button':
      return (
        <div className="admin-block-fields">
          <input placeholder="Button text" value={block.text} onChange={(e) => onChange({ ...block, text: e.target.value })} />
          <input placeholder="Link (https://…)" value={block.href} onChange={(e) => onChange({ ...block, href: e.target.value })} />
        </div>
      )
    case 'divider':
      return null
    case 'spacer':
      return (
        <div className="admin-block-fields">
          <select value={block.height} onChange={(e) => onChange({ ...block, height: e.target.value as 'small' | 'medium' | 'large' })}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      )
  }
}
