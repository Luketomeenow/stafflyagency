import React, { useEffect, useRef } from 'react'
import { StickyHeader } from './header-1'
import { ingestPdfIfRequested } from '../knowledge/rag'

interface SiteLayoutProps {
  children: React.ReactNode
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
    ingestPdfIfRequested(supabaseUrl, anonKey)
  }, [])

  return (
    <div ref={containerRef} className="w-full bg-white">
      <StickyHeader containerRef={containerRef} />
      <div className="w-full">{children}</div>
    </div>
  )
}

export default SiteLayout
