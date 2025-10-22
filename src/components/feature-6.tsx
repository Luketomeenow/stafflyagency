import {
  BarChart3,
  Globe,
  Layers,
  LifeBuoy,
  Rocket,
  Workflow,
} from "lucide-react"

import { Badge } from "./ui/badge"

type Highlight = {
  title: string
  description: string
  icon?: React.ReactNode
  badge?: string
}

const highlights: Highlight[] = [
  {
    title: "AI-Powered Matching",
    description:
      "Chat with Staffly AI to get curated A+ operator profiles instantly matched to your needs.",
    icon: <Rocket />,
  },
  {
    title: "Vetted Talent Pool",
    description:
      "Every operator is rigorously screened with PCE scoring (Preparation, Capability, Execution).",
    icon: <BarChart3 />,
  },
  {
    title: "Full-Stack Solutions",
    description:
      "From skilled operators to AI adoption, websites, and custom web apps—we've got you covered.",
    icon: <Layers />,
  },
  {
    title: "Ongoing Support",
    description:
      "Dedicated account management with early micro-observations and monthly performance reviews.",
    icon: <LifeBuoy />,
  },
  {
    title: "Flexible Pricing",
    description:
      "Four tiers from Support to Enterprise Operator—scale as you grow with transparent pricing.",
    icon: <Workflow />,
  },
  {
    title: "Excellence-First Culture",
    description:
      "We optimize for quality and reliability—no 'cheapest wins' approach, only A+ talent.",
    icon: <Globe />,
  },
]

export function Component() {
  return (
    <section>
      <div className="container px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="max-w-2xl space-y-4">
          <Badge variant="secondary" className="w-fit">
            Feature highlights
          </Badge>
          <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Why Choose Staffly
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Six key features that make Staffly the best choice for scaling your operations with elite virtual assistants and comprehensive solutions.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((highlight) => (
            <article
              key={highlight.title}
              className="border-border/70 bg-card/30 flex h-full flex-col gap-3 rounded-3xl border p-6"
            >
              {highlight.icon && (
                <span className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
                  {highlight.icon}
                </span>
              )}
              <h3 className="text-lg font-semibold tracking-tight">
                {highlight.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-6">
                {highlight.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
