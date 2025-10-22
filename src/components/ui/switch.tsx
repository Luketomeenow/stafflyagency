import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onCheckedChange?: (checked: boolean) => void
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, onCheckedChange, defaultChecked, checked, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState<boolean>(
      checked ?? !!defaultChecked
    )

    React.useEffect(() => {
      if (typeof checked === 'boolean') setIsChecked(checked)
    }, [checked])

    const toggle = (next?: boolean) => {
      const value = typeof next === 'boolean' ? next : !isChecked
      setIsChecked(value)
      onCheckedChange?.(value)
    }

    return (
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        onClick={() => toggle()}
        className={cn(
          'inline-flex h-6 w-11 items-center rounded-full transition-colors',
          isChecked ? 'bg-blue-600' : 'bg-gray-300',
          className
        )}
      >
        <span
          className={cn(
            'inline-block h-5 w-5 transform rounded-full bg-white transition-transform',
            isChecked ? 'translate-x-5' : 'translate-x-1'
          )}
        />
        {/* Hidden checkbox for forms/accessibility */}
        <input
          ref={ref}
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={(e) => toggle(e.target.checked)}
          {...props}
        />
      </button>
    )
  }
)

Switch.displayName = 'Switch'



