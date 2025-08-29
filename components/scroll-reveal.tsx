"use client"

import { motion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

const base: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export function ScrollReveal({
  children,
  delay = 0,
  variants,
  className,
}: {
  children: ReactNode
  delay?: number
  variants?: Variants
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants ?? base}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
