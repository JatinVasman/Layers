"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

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
        <motion.img
          src="/images/home/img-2020.jpg"
          alt="Layers hero — studio portrait in black hoodies"
          className="h-full w-full object-cover"
          style={{ y, scale, opacity }}
          initial={{ filter: "brightness(0.92)" }}
          animate={{ filter: "brightness(1)" }}
          transition={{ duration: 1, ease: EASE }}
        />

        {/* Subtle gradient to help header/text readability */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 bg-gradient-to-b from-black/10 via-transparent to-background/60" />

        {/* Left title */}
        <motion.h1
          className="absolute left-6 top-8 text-balance text-4xl font-semibold text-white drop-shadow md:left-12 md:top-10 md:text-6xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          Layers
        </motion.h1>

        {/* Right tagline */}
        <motion.div
          className="absolute right-6 top-8 w-44 text-right text-[11px] leading-4 text-white/90 md:right-12 md:w-60 md:text-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          Timeless Wardrobe.
          <br />
          Everyday Power.
        </motion.div>

        {/* Brand red baseline */}
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[var(--primary)] md:h-[4px]" />
      </div>
    </section>
  )
}

export default AnimatedHero
