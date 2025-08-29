"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -120])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.25])

  return (
    <section ref={ref} className="relative">
      <div className="relative h-[48vh] w-full overflow-hidden md:h-[60vh]">
        <motion.img
          src="/placeholder.svg?height=900&width=1600"
          alt="Model wearing neutral essentials"
          className="h-full w-full object-cover"
          style={{ y, scale, opacity }}
          initial={{ filter: "brightness(0.95)" }}
          animate={{ filter: "brightness(1)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-b from-transparent via-transparent to-background/60" />
        <motion.h1
          className="absolute left-8 top-8 text-balance text-4xl font-semibold md:left-12 md:top-10 md:text-6xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Layers
        </motion.h1>
        <motion.div
          className="absolute right-8 top-8 w-40 text-right text-[11px] leading-4 text-foreground/90 md:right-12 md:w-56 md:text-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Timeless Wardrobe.
          <br />
          Everyday Power.
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundColor: "#F22233" }} />
      </div>
    </section>
  )
}
