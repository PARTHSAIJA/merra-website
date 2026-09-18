import type { Block } from './types'

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.type) {
          case 'heading': {
            const Tag = block.level
            return <Tag key={block.id} className="cms-heading">{block.text}</Tag>
          }
          case 'paragraph':
            return <p key={block.id} className="cms-paragraph">{block.text}</p>
          case 'image':
            return block.src ? (
              <img key={block.id} className="cms-image" src={block.src} alt={block.alt} />
            ) : null
          case 'button':
            return (
              <a key={block.id} className="cms-button" href={block.href || '#'}>
                {block.text}
              </a>
            )
          case 'divider':
            return <hr key={block.id} className="cms-divider" />
          case 'spacer':
            return <div key={block.id} className={`cms-spacer cms-spacer-${block.height}`} />
        }
      })}
    </>
  )
}
