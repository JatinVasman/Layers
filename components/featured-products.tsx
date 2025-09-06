"use client"

import { motion } from "framer-motion"
import { ProductGrid } from "@/components/product-grid"
import { products } from "@/lib/products"

export function FeaturedProducts() {
  // Get featured products (first 6 products with badges or bestsellers)
  const featuredProducts = products.filter(p => p.badge).slice(0, 6)
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h3 className="text-2xl font-semibold mb-4">Handpicked Favorites</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our most-loved pieces that customers keep coming back for. 
          Each item is carefully selected for quality, comfort, and style.
        </p>
      </motion.div>
      
      <ProductGrid products={featuredProducts} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center pt-8"
      >
        <a
          href="/products"
          className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
        >
          View All Products
        </a>
      </motion.div>
    </div>
  )
}
