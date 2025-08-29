"use client"

import type React from "react"
import { motion } from "framer-motion"

export function Section({
  title,
  subtitle,
  children,
  id,
}: {
  title?: string
  subtitle?: string
  children: React.ReactNode
  id?: string
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      {title ? (
        <motion.h2
          className="text-2xl font-semibold md:text-3xl"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h2>
      ) : null}
      {subtitle ? (
        <motion.p
          className="mt-1 max-w-xl text-xs text-muted-foreground md:text-sm"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          {subtitle}
        </motion.p>
      ) : null}
      <div className={title || subtitle ? "mt-6" : ""}>{children}</div>
    </section>
  )
}
