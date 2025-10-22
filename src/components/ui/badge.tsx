import * as React from 'react'
import { cn } from '@/lib/utils'

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'secondary' | 'outline'
}

export const Badge: React.FC<BadgeProps> = ({
  className = '',
  variant = 'default',
  children,
  ...props
}) => {
  const styles =
    variant === 'secondary'
      ? 'bg-slate-100 text-slate-700'
      : variant === 'outline'
      ? 'border border-slate-300 text-slate-700'
      : 'bg-blue-600 text-white'

  return (
    <span
      {...props}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        styles,
        className
      )}
    >
      {children}
    </span>
  )
}



