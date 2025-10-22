import { useEffect, useRef } from "react"
import { motion, useInView, useSpring, useTransform } from "motion/react"

import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { value: 3400, label: "Downloads" },
  { value: 1500, label: "Users" },
  { value: 84, label: "Subscribers" },
  { value: 7, label: "Products" },
]

export function Component() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="stats" ref={ref}>
      <div className="container px-4 py-12 md:px-6 md:py-24">
        <div className="mx-auto space-y-4 py-6 text-center">
          <h2 className="text-primary font-mono text-[14px] font-medium tracking-tight">
            STATS
          </h2>
          <h4 className="mx-auto mb-2 max-w-3xl text-[42px] font-medium tracking-tighter text-balance">
            Our numbers speak for themselves
          </h4>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {stats.map((stat, index) => (
            <AnimatedCard
              key={index}
              value={stat.value}
              label={stat.label}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
interface AnimatedCardProps {
  value: number
  label: string
  isInView: boolean
}

function AnimatedCard({ value, label, isInView }: AnimatedCardProps) {
  const spring = useSpring(0, { duration: 2000 })
  const displayValue = useTransform(spring, (current) =>
    Math.floor(current).toLocaleString()
  )

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [isInView, spring, value])

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-4 text-center">
        <motion.div
          className="mb-2 text-4xl font-bold md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span>{displayValue}</motion.span>
          {value > 1000 && "+"}
        </motion.div>
        <div className="text-muted-foreground text-sm md:text-base">
          {label}
        </div>
      </CardContent>
    </Card>
  )
}
