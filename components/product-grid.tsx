"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { Heart } from "lucide-react"
import { products } from "@/lib/products"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { useWishlistContext } from "@/components/wishlist-provider"
import { useState, useEffect } from "react"

export function ProductGrid({ limit, products: productList }: { limit?: number; products?: typeof products }) {
  const list = productList ? (limit ? productList.slice(0, limit) : productList) : (limit ? products.slice(0, limit) : products)
  const { addToWishlist, removeFromWishlist, isInWishlist, isLoaded } = useWishlistContext()
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  console.log("ProductGrid - Total products:", list.length)
  console.log("ProductGrid - Products:", list.map(p => p.name))

  const handleWishlistToggle = (e: React.MouseEvent, product: typeof products[0]) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isInWishlist(product.slug)) {
      removeFromWishlist(product.slug)
    } else {
      addToWishlist({
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
  }

  if (list.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-muted-foreground">No products found</p>
        <p className="text-sm text-muted-foreground mt-2">Debug: list.length = {list.length}</p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((p, index) => (
        <div key={p.slug}>
          <div className="group">
            <Link href={`/product/${p.slug}`} className="block">
              <div className="relative overflow-hidden rounded-lg bg-[var(--card)]">
                <motion.div
                  whileHover={{ scale: 1.045 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="aspect-[4/5] w-full"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      console.log("Image load error for:", p.image)
                      e.currentTarget.src = "/placeholder.svg"
                    }}
                    onLoad={() => console.log("Image loaded successfully:", p.image)}
                  />
                </motion.div>
                
                {/* Badge */}
                {p.badge && (
                  <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[10px] font-medium text-primary-foreground shadow-lg">
                    {p.badge}
                  </span>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={(e) => handleWishlistToggle(e, p)}
                  disabled={!isMounted || !isLoaded}
                  className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
                  aria-label={isMounted && isLoaded && isInWishlist(p.slug) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart 
                    className={`h-4 w-4 transition-colors ${
                      isMounted && isLoaded && isInWishlist(p.slug) 
                        ? "fill-red-500 text-red-500" 
                        : "text-gray-600 hover:text-red-500"
                    }`} 
                  />
                </button>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              
              <div className="mt-4 space-y-2">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {p.name}
                </h3>
                <div className="text-sm uppercase tracking-wide text-muted-foreground">
                  {p.category}
                </div>
                <div className="text-lg font-semibold text-foreground">
                  ₹{p.price.toLocaleString('en-IN')}
                </div>
              </div>
            </Link>
            
            <div className="mt-4">
              <AddToCartButton 
                product={p}
                className="w-full text-sm px-4 py-2"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
