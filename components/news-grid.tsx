"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { news } from "@/lib/data"

export function NewsGrid({ limit }: { limit?: number }) {
  const list = limit ? news.slice(0, limit) : news
  return (
    <motion.div
      className="grid gap-8 md:grid-cols-3"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
    >
      {list.map((n) => (
        <motion.div key={n.slug} variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
          <Link href={`/news/${n.slug}`} className="group block">
            <div className="relative overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                src={n.image}
                alt={n.title}
                className="aspect-video w-full rounded-md object-cover"
              />
            </div>
            <div className="mt-2">
              <div className="text-sm">{n.title}</div>
              <div className="text-xs text-muted-foreground">{n.excerpt}</div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
