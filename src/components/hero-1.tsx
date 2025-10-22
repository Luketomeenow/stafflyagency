import { useRef } from "react"
import { ChevronRight } from "lucide-react"
import { motion, useInView } from "motion/react"

import { cn } from "@/lib/utils"
import { BorderBeam } from "@/components/ui/border-beam"
import { HoleBackground } from "@/components/animate-ui/components/backgrounds/hole"
import FullScreenChatbot from "./FullScreenChatbot"

export function Hero() {
  const fadeInRef = useRef(null)
  const fadeInInView = useInView(fadeInRef, {
    once: true,
  })

  const fadeUpVariants = {
    initial: {
      opacity: 0,
      y: 24,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <section id="hero" className="-mt-4">
      <HoleBackground 
        strokeColor="#3b82f6"
        numberOfLines={40}
        numberOfDiscs={40}
        particleRGBColor={[147, 197, 253]}
        className="min-h-[70vh]"
      >
        <div className="relative h-full overflow-hidden pt-8 pb-12">
          <div className="z-10 container flex flex-col">
          <div className="mt-8 grid grid-cols-1">
            <div className="flex flex-col items-center gap-6 pb-8 text-center">
              <motion.h1
                ref={fadeInRef}
                className="bg-gradient-to-r from-slate-900 via-blue-700 to-purple-600 bg-clip-text text-transparent py-4 md:py-6 text-3xl leading-tight font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                animate={fadeInInView ? "animate" : "initial"}
                variants={fadeUpVariants}
                initial={false}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  type: "spring",
                }}
              >
                Hire A+ <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Operators</span> <br />
                — For 60% Less <br />
              </motion.h1>

              <motion.p
                className="text-base tracking-tight text-balance text-slate-700 md:text-lg lg:text-xl px-4 md:px-0"
                animate={fadeInInView ? "animate" : "initial"}
                variants={fadeUpVariants}
                initial={false}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  type: "spring",
                }}
              >
                Get qualified A+ VA profiles by chatting with <span className="font-semibold text-slate-900">Staffly AI</span>.
              </motion.p>

              <motion.div
                animate={fadeInInView ? "animate" : "initial"}
                variants={fadeUpVariants}
                className="flex flex-col gap-4 lg:flex-row px-4 md:px-0"
                initial={false}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  type: "spring",
                }}
              >
                <a
                  href="#chat"
                  className={cn(
                    // colors
                    "bg-blue-600 text-white shadow hover:bg-blue-700",

                    // layout
                    "group focus-visible:ring-ring relative inline-flex h-12 md:h-10 w-full items-center justify-center gap-2 overflow-hidden rounded-md px-6 py-3 md:py-2 text-base md:text-base font-semibold tracking-tight whitespace-pre focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 md:flex",

                    // animation
                    "hover:ring-primary transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-offset-2"
                  )}
                >
                  Start Scaling
                  <ChevronRight className="size-4 md:size-4 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      </HoleBackground>

      {/* Chatbot Section - Outside Background */}
      <motion.div
        id="chat"
        animate={fadeInInView ? "animate" : "initial"}
        variants={fadeUpVariants}
        initial={false}
        transition={{
          duration: 0.6,
          delay: 0.4,
          ease: [0.21, 0.47, 0.32, 0.98],
          type: "spring",
        }}
        className="relative -mt-20 z-20 max-w-6xl mx-auto px-4"
      >
        <FullScreenChatbot />
      </motion.div>
    </section>
  )
}
