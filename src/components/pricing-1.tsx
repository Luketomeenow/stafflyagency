import { useState, useEffect } from "react"
import { CheckIcon } from "@radix-ui/react-icons"
import { Loader } from "lucide-react"
import { motion } from "motion/react"
import { getCalApi } from "@calcom/embed-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

type Interval = "month" | "year"

export const toHumanPrice = (price: number, decimals: number = 2) => {
  return Number(price / 100).toFixed(decimals)
}
const demoPrices = [
  {
    id: "support",
    name: "Support Operator",
    description: "Early-stage solopreneurs or small business owners",
    features: [
      "Removes daily admin noise",
      "Focus on growth",
      "Basic operational support",
    ],
    monthlyPrice: 120000,
    yearlyPrice: 1440000,
    isMostPopular: false,
  },
  {
    id: "essential",
    name: "Essential",
    description: "Entrepreneurs with consistent client work and systems",
    features: [
      "Admin + marketing support",
      "Order & communication management",
      "Consistency across operations",
    ],
    monthlyPrice: 180000,
    yearlyPrice: 2160000,
    isMostPopular: true,
  },
  {
    id: "executive",
    name: "Executive Operator",
    description: "Established founders managing teams or multiple revenue streams",
    features: [
      "Proactive right-hand operator",
      "Structure & reporting",
      "Accountability & execution",
    ],
    monthlyPrice: 250000,
    yearlyPrice: 3000000,
    isMostPopular: false,
  },
  {
    id: "enterprise",
    name: "Enterprise Operator",
    description: "Founders with multiple departments or teams",
    features: [
      "Acts as Chief of Staff",
      "Leads assistants & manages budgets",
      "Drives execution at scale",
    ],
    monthlyPrice: 450000,
    yearlyPrice: 5400000,
    isMostPopular: false,
  },
]

export function Pricing() {
  const [interval, setInterval] = useState<Interval>("month")
  const [isLoading, setIsLoading] = useState(false)
  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"45-strategy-call"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

  const onSubscribeClick = async (priceId: string) => {
    setIsLoading(true)
    setId(priceId)
    
    // Open Cal.com popup
    const cal = await getCalApi({"namespace":"45-strategy-call"});
    cal("modal", {
      calLink: "stafflyai/45-strategy-call",
      config: {
        layout: "month_view"
      }
    });
    
    setIsLoading(false)
  }

  return (
    <section id="pricing">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-10 md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h4 className="text-muted-foreground mb-2 font-medium tracking-tight">
            Pricing
          </h4>

          <h2 className="text-foreground text-3xl font-semibold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Pricing & Services
          </h2>

          <p className="text-muted-foreground mt-6 leading-6 text-balance lg:text-lg">
            Average A player placement at minimum wage monthly overhead. Choose the{" "}
            <strong className="text-foreground font-semibold">
              right tier
            </strong>{" "}
            for your business stage and scale as you grow.
          </p>
        </div>

        <div className="flex w-full items-center justify-center space-x-2">
          <Switch
            id="interval"
            onCheckedChange={(checked) => {
              setInterval(checked ? "year" : "month")
            }}
          />
          <span>Annual</span>
          <span className="bg-primary text-primary-foreground flex h-6 w-fit items-center justify-center rounded-lg px-2 font-mono text-xs leading-5 font-semibold tracking-wide whitespace-nowrap uppercase">
            SAVE 20%
          </span>
        </div>

        <div className="mx-auto grid w-full justify-center gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl">
          {demoPrices.map((price, idx) => (
            <div
              key={price.id}
              className={cn(
                "text-foreground relative flex w-full max-w-[400px] flex-col gap-4 overflow-hidden rounded-2xl border p-4",
                {
                  "border-primary shadow-primary/20 border-2 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]":
                    price.isMostPopular,
                }
              )}
            >
              <div className="flex items-center tracking-tight">
                <div>
                  <h2 className="text-lg font-semibold">{price.name}</h2>
                  <p className="text-muted-foreground text-sm">
                    {price.description}
                  </p>
                </div>
              </div>

              <motion.div
                key={`${price.id}-${interval}`}
                initial="initial"
                animate="animate"
                variants={{
                  initial: {
                    opacity: 0,
                    y: 12,
                  },
                  animate: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + idx * 0.05,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="flex flex-row gap-1"
              >
                <span className="text-foreground text-lg font-semibold">
                  $
                  {interval === "year"
                    ? toHumanPrice(price.yearlyPrice, 0)
                    : toHumanPrice(price.monthlyPrice, 0)}
                  <span className="text-sm"> / {interval}</span>
                </span>
              </motion.div>

              <Button
                className={cn(
                  "group text-primary-foreground relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                  "hover:ring-primary transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-offset-2"
                )}
                disabled={isLoading}
                onClick={() => void onSubscribeClick(price.id)}
              >
                <span className="bg-primary absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform-gpu opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-96" />
                {(!isLoading || (isLoading && id !== price.id)) && (
                  <p>Subscribe</p>
                )}

                {isLoading && id === price.id && <p>Subscribing</p>}
                {isLoading && id === price.id && (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                )}
              </Button>

              <hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-500/30 to-neutral-200/0" />
              {price.features && price.features.length > 0 && (
                <ul className="text-muted-foreground flex flex-col gap-2 font-normal">
                  {price.features.map((feature: any, idx: any) => (
                    <li
                      key={idx}
                      className="text-muted-foreground flex items-center gap-3 text-sm font-medium"
                    >
                      <CheckIcon className="bg-primary text-primary-foreground size-4 shrink-0 rounded-full p-[2px]" />
                      <span className="flex">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
