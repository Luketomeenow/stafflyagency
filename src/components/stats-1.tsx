import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "500+", label: "Enterprise Clients" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
]

export function Component() {
  return (
    <section id="stats">
      <div className="bg-primary container px-4 py-12 md:px-6 md:py-24">
        <div className="mx-auto space-y-4 py-6 text-center">
          <h2 className="text-primary-foreground font-mono text-[14px] font-medium tracking-tight">
            Our Achievements
          </h2>
          <h4 className="text-primary-foreground mx-auto mb-2 max-w-3xl text-[42px] font-medium tracking-tighter text-balance">
            Powering innovation worldwide
          </h4>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-none">
              <CardContent className="p-0">
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-bold">{stat.value}</span>
                  <span className="text-muted-foreground mt-1 text-sm">
                    {stat.label}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
