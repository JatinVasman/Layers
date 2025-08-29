"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { categories } from "@/lib/data"

export function CategoryGrid() {
  return (
    <motion.div
      className="grid gap-6 md:grid-cols-2"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
    >
      {categories.slice(0, 4).map((c) => (
        <motion.div key={c.slug} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
          <Link href={`/collection/${c.slug}`} className="group block">
            <div className="overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                src={c.image}
                alt={c.title}
                className="aspect-[4/5] w-full rounded-md object-cover"
              />
            </div>
            <div className="mt-2 text-xs opacity-80">{c.title}</div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
