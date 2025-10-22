import * as React from 'react'

type AccordionCtx = {
  openValue: string | null
  setOpen: (val: string | null) => void
}

const AccordionContext = React.createContext<AccordionCtx | null>(null)

type AccordionProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: 'single' | 'multiple'
  collapsible?: boolean
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  className = '',
  type = 'single',
  collapsible = true,
  ...props
}) => {
  const [openValue, setOpenValue] = React.useState<string | null>(null)

  const setOpen = (val: string | null) => {
    if (type === 'single') {
      if (collapsible && openValue === val) setOpenValue(null)
      else setOpenValue(val)
    }
  }

  return (
    <AccordionContext.Provider value={{ openValue, setOpen }}>
      <div {...props} className={`divide-y rounded-xl border bg-white shadow ${className}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

type ItemCtx = { value: string; open: boolean }
const ItemContext = React.createContext<ItemCtx | null>(null)

type AccordionItemProps = React.HTMLAttributes<HTMLDivElement> & { value: string }

export const AccordionItem: React.FC<AccordionItemProps> = ({ children, className = '', value, ...props }) => {
  const ctx = React.useContext(AccordionContext)
  const open = ctx?.openValue === value
  return (
    <ItemContext.Provider value={{ value, open: !!open }}>
      <div {...props} className={`group ${className}`}>{children}</div>
    </ItemContext.Provider>
  )
}

export const AccordionTrigger: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({ children, className = '', ...props }) => {
  const acc = React.useContext(AccordionContext)
  const item = React.useContext(ItemContext)
  if (!acc || !item) return <button {...props}>{children}</button>
  const toggle = () => acc.setOpen(item.open ? null : item.value)
  return (
    <button
      {...props}
      onClick={(e) => { props.onClick?.(e as any); toggle() }}
      className={`flex w-full items-center justify-between px-4 py-4 text-left text-slate-800 hover:bg-slate-50 ${className}`}
      aria-expanded={item.open}
    >
      <span className="pr-6 font-medium">{children}</span>
      <span
        className={`ml-auto h-5 w-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center transition-transform ${item.open ? 'rotate-180' : ''}`}
      >
        ⌄
      </span>
    </button>
  )
}

export const AccordionContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => {
  const item = React.useContext(ItemContext)
  if (!item) return <div {...props}>{children}</div>
  return item.open ? (
    <div {...props} className={`px-4 py-4 text-slate-700 bg-white ${className}`}>{children}</div>
  ) : null
}


