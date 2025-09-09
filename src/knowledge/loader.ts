import MiniSearch from 'minisearch'
import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

export interface KnowledgeChunk {
  id: string
  page: number
  text: string
}

export interface KnowledgeIndex {
  search: (query: string, limit?: number) => KnowledgeChunk[]
  ready: Promise<void>
}

const DEFAULT_PDF_PATH = '/src/knowledge/knowledge-base.pdf'

export function createKnowledgeIndex(pdfPath: string = DEFAULT_PDF_PATH): KnowledgeIndex {
  const chunks: KnowledgeChunk[] = []
  const mini = new MiniSearch<KnowledgeChunk>({
    fields: ['text'],
    storeFields: ['text', 'page', 'id']
  })

  const ready = (async () => {
    const loadingTask = pdfjsLib.getDocument(pdfPath)
    const pdf = await loadingTask.promise
    const chunkSize = 1000
    const overlap = 150

    for (let p = 1; p <= pdf.numPages; p++) {
      const page = await pdf.getPage(p)
      const content = await page.getTextContent()
      const text = content.items.map((i: any) => (i.str || '')).join(' ').replace(/\s+/g, ' ').trim()
      let start = 0
      while (start < text.length) {
        const end = Math.min(start + chunkSize, text.length)
        const slice = text.slice(start, end)
        const id = `${p}-${start}`
        chunks.push({ id, page: p, text: slice })
        if (end === text.length) break
        start = end - overlap
      }
    }
    mini.addAll(chunks)
  })()

  return {
    search: (query: string, limit = 3) => {
      const results = mini.search(query, { fuzzy: 0.1, prefix: true }).slice(0, limit)
      return results.map(r => r as any as KnowledgeChunk)
    },
    ready
  }
}



