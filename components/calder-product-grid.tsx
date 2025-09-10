"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  name: string
  price: string
  image: string
  category?: string
  href?: string
  vendor?: string
  tags?: string[]
  color?: string
  size?: string
  availableForSale?: boolean
  compareAtPrice?: string | null
}

interface CalderProductGridProps {
  products: Product[]
  title?: string
  description?: string
  columns?: 2 | 3
  showHeader?: boolean
}

export function CalderProductGrid({ 
  products, 
  title, 
  description, 
  columns = 2, 
  showHeader = true 
}: CalderProductGridProps) {
  const gridClass = columns === 3 ? "calder-product-grid-3" : "calder-product-grid"

  return (
    <section className="calder-section">
      <div className="calder-section-content">
        {showHeader && (title || description) && (
          <motion.div 
            className="calder-section-header"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {title && (
              <h2 className="calder-text-section calder-section-title">
                {title}
              </h2>
            )}
            {description && (
              <p className="calder-section-description">
                {description}
              </p>
            )}
          </motion.div>
        )}

        <div className={gridClass}>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="w-full"
            >
              <Link 
                href={product.href || `/product/${product.id}`}
                className="calder-product-card group"
              >
                <div className="calder-product-card-image relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={360}
                    height={450}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {!product.availableForSale && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-medium text-sm">Sold Out</span>
                    </div>
                  )}
                  {product.compareAtPrice && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                      Sale
                    </div>
                  )}
                </div>
                <div className="calder-product-card-info">
                  <h3 className="calder-product-card-title">{product.name}</h3>
                  {product.category && (
                    <p className="calder-text-caption uppercase tracking-wider text-gray-600">
                      {product.category}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <p className="calder-product-card-price">{product.price}</p>
                    {product.compareAtPrice && (
                      <p className="calder-text-caption text-gray-500 line-through">
                        {product.compareAtPrice}
                      </p>
                    )}
                  </div>
                  {product.color && (
                    <p className="calder-text-caption text-gray-600">
                      Color: {product.color}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
