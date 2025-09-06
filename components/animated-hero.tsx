"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const EASE = [0.22, 1, 0.36, 1] as const

export function AnimatedHero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Parallax and fade similar to Framer reference
  const y = useTransform(scrollYProgress, [0, 1], [0, -120])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.25])

  return (
    <section ref={ref} className="relative">
      <div className="relative h-[52vh] w-full overflow-hidden md:h-[68vh]">
        <motion.div
          className="h-full w-full"
          style={{ y, scale, opacity }}
        >
          <Image
            src="/images/hero-image.JPG"
            alt="Layers hero — studio portrait in black hoodies"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={90}
          />
        </motion.div>

        {/* Enhanced gradient overlay for better text readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

        {/* Main hero content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <p className="text-2xl md:text-3xl font-bold text-white/90 max-w-2xl mx-auto mt-60 ml-25">
              Essentials built for every layer of life
            </p>
          </motion.div>
        </div>

        {/* Right tagline */}
        <motion.div
          className="absolute right-6 top-8 w-44 text-right text-[11px] leading-4 text-white/90 md:right-12 md:w-60 md:text-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
         
        </motion.div>

        {/* Brand red baseline */}
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[var(--primary)] md:h-[4px]" />
      </div>
    </section>
  )
}

export default AnimatedHero
