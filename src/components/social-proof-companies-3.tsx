import { Marquee } from "@/components/ui/marquee"

// Auto-import all trusted brand logos placed in `/assets/images/logos/trusted/`
const logoModules = import.meta.glob("/assets/images/logos/trusted/*", {
  eager: true,
  as: "url",
}) as Record<string, string>
const companies: string[] = Object.values(logoModules)

export function Companies() {
  return (
    <section id="companies">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <h3 className="text-center text-sm font-semibold text-gray-500">
            TRUSTED BY LEADING TEAMS
          </h3>
          <div className="relative mt-6">
            <Marquee className="max-w-full [--duration:45s]">
              {companies.map((logo, idx) => (
                <img
                  key={idx}
                  src={logo}
                  className="mx-10 h-10 w-auto"
                  style={{ filter: 'grayscale(1) brightness(0.2) contrast(1)' }}
                  alt="Trusted brand logo"
                />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white via-white/80 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white via-white/80 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
