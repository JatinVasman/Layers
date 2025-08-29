"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function ProductCard({
  product,
}: {
  product: { slug: string; name: string; price: number; image: string; badge?: string }
}) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-xl bg-neutral-100">
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-72 w-full object-cover sm:h-80"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
          {product.badge ? (
            <span
              className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-medium shadow-sm"
              style={{ color: "#F22233" }}
            >
              {product.badge}
            </span>
          ) : null}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm sm:text-base font-medium">{product.name}</p>
          <p className="text-sm sm:text-base text-neutral-600">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </motion.div>
  )
}
