export type Block =
  | { id: string; type: 'heading'; text: string; level: 'h1' | 'h2' | 'h3' }
  | { id: string; type: 'paragraph'; text: string }
  | { id: string; type: 'image'; src: string; alt: string }
  | { id: string; type: 'button'; text: string; href: string }
  | { id: string; type: 'divider' }
  | { id: string; type: 'spacer'; height: 'small' | 'medium' | 'large' }

export type BlockType = Block['type']

export const BLOCK_LABELS: Record<BlockType, string> = {
  heading: 'Heading',
  paragraph: 'Paragraph',
  image: 'Image',
  button: 'Button',
  divider: 'Divider',
  spacer: 'Spacer',
}

export function newBlock(type: BlockType): Block {
  const id = crypto.randomUUID()
  switch (type) {
    case 'heading':
      return { id, type, text: 'New heading', level: 'h2' }
    case 'paragraph':
      return { id, type, text: 'Write something here.' }
    case 'image':
      return { id, type, src: '', alt: '' }
    case 'button':
      return { id, type, text: 'Learn more', href: '' }
    case 'divider':
      return { id, type }
    case 'spacer':
      return { id, type, height: 'medium' }
  }
}

export interface CmsPage {
  slug: string
  title: string
  description?: string | null
  blocksJson: string
  status: 'DRAFT' | 'PUBLISHED'
  publishedAt?: string | null
  authorEmail?: string | null
}

export function parseBlocks(blocksJson: string): Block[] {
  try {
    const parsed = JSON.parse(blocksJson)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
