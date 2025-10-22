import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

export interface PdfChunk {
  page: number
  chunk_index: number
  content: string
}

export async function buildChunksFromPdf(pdfPath: string, chunkSize = 1000, overlap = 150): Promise<PdfChunk[]> {
  const loadingTask = pdfjsLib.getDocument(pdfPath)
  const pdf = await loadingTask.promise
  const chunks: PdfChunk[] = []

  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p)
    const content = await page.getTextContent()
    const text = content.items.map((i: any) => (i.str || '')).join(' ').replace(/\s+/g, ' ').trim()
    let start = 0
    let idx = 0
    while (start < text.length) {
      const end = Math.min(start + chunkSize, text.length)
      chunks.push({ page: p, chunk_index: idx, content: text.slice(start, end) })
      if (end === text.length) break
      start = end - overlap
      idx += 1
    }
  }
  return chunks
}

function getFunctionsBase(supabaseUrl: string): string {
  return supabaseUrl.replace('supabase.co', 'functions.supabase.co')
}

export async function ingestPdfToSupabase(args: { pdfPath: string; fileName: string; supabaseUrl: string; anonKey: string }): Promise<{ inserted: number }> {
  const { pdfPath, fileName, supabaseUrl, anonKey } = args
  const chunks = await buildChunksFromPdf(pdfPath)
  const endpoint = `${getFunctionsBase(supabaseUrl)}/rag-ingest`
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${anonKey}` },
    body: JSON.stringify({ file: fileName, chunks })
  })
  if (!res.ok) throw new Error(`Ingest failed: ${res.status} ${await res.text()}`)
  return res.json()
}

export function ingestPdfIfRequested(
  supabaseUrl?: string,
  anonKey?: string,
  pdfPath: string = new URL('./knowledge-base.pdf', import.meta.url).href,
  fileName = 'knowledge-base.pdf'
) {
  try {
    const params = new URLSearchParams(window.location.search)
    if (params.get('ingest') !== '1') return
    if (!supabaseUrl || !anonKey) return
    // Fire and forget
    ingestPdfToSupabase({ pdfPath, fileName, supabaseUrl, anonKey })
      .then((r) => console.log('Ingested chunks:', r.inserted))
      .catch((e) => console.error('Ingest failed:', e))
  } catch {}
}


