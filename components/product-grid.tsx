"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { products } from "@/lib/data"

export function ProductGrid({ limit }: { limit?: number }) {
  const list = limit ? products.slice(0, limit) : products
  return (
    <motion.div
      className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
    >
      {list.map((p) => (
        <motion.div key={p.slug} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
          <Link href={`/product/${p.slug}`} className="group block">
            <div className="relative overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.045 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                src={p.image}
                alt={p.name}
                className="aspect-[4/5] w-full rounded-md object-cover"
              />
              {p.category ? (
                <motion.span
                  className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-medium shadow-sm"
                  initial={{ opacity: 0, y: -8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                >
                  {p.category}
                </motion.span>
              ) : null}
            </div>
            <div className="mt-2 space-y-0.5">
              <div className="text-sm">{p.name}</div>
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{p.category}</div>
              <div className="text-sm">${p.price.toFixed(2)}</div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
