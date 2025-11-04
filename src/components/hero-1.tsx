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
                Build Beyond Boundaries with <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI-Powered Operators</span>.
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
                We believe that your next chapter deserves a team as capable as your vision. <br />
                <span className="font-semibold text-slate-900">Give Your Business an AI-Driven Advantage.</span>
              </motion.p>
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
