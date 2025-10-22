import * as React from 'react'
import { cn } from '@/lib/utils'

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  repeat = 2,
  children,
}: {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  repeat?: number
  children: React.ReactNode
}) {
  const content = Array.from({ length: repeat }).map((_, i) => (
    <div key={i} className="flex items-center gap-4 px-4 flex-none">
      {children}
    </div>
  ))

  return (
    <div
      className={cn(
        'relative flex overflow-hidden',
        pauseOnHover && '[&:hover_.marquee-track]:[animation-play-state:paused]',
        className
      )}
    >
      <div
        className={cn(
          'marquee-track flex min-w-full animate-marquee',
          reverse && 'animate-marquee-reverse'
        )}
        style={{ animationDuration: 'var(--duration, 25s)' }}
      >
        {content}
      </div>
      {/* Edge blur masks */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white via-white/80 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white via-white/80 to-transparent" />
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee linear infinite; }
        .animate-marquee-reverse { animation: marquee linear infinite reverse; }
      `}</style>
    </div>
  )
}


