"use client"

import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react"
import { motion } from "framer-motion"

export function FeaturesBar() {
  const items = [
    { icon: Truck, label: "Free shipping on orders over ₹999" },
    { icon: RotateCcw, label: "14-day hassle-free returns" },
    { icon: ShieldCheck, label: "30-day product warranty" },
    { icon: Headphones, label: "Customer support 24/7" },
  ]

  return (
    <motion.div
      className="grid rounded-lg border bg-card px-4 py-8 sm:grid-cols-2 md:grid-cols-4"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      role="list"
      aria-label="Shopping advantages"
    >
      {items.map((i, idx) => (
        <div
          key={i.label}
          role="listitem"
          className={["flex items-center gap-4 px-6 py-8", idx > 0 ? "md:border-l md:border-border" : ""].join(" ")}
        >
          <i.icon className="h-6 w-6" aria-hidden="true" />
          <div className="text-sm text-foreground/80">{i.label}</div>
        </div>
      ))}
    </motion.div>
  )
}
