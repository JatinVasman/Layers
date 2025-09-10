"use client"

import { CalderHero } from "@/components/calder-hero"
import { CalderProductGrid } from "@/components/calder-product-grid"
import { useShopXTools } from "@/hooks/use-shopx-tools"
import { formatPrice, getProductImages, getProductColor, getProductSize } from "@/components/calder-shopify-integration"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const featuredProducts = [
  {
    id: "1",
    name: "Relaxed Linen Jacket",
    price: "$69.00",
    image: "https://framerusercontent.com/images/4p7KeeA6P08b83SqTlPWppVZJgo.jpg?width=400&height=500&fit=crop",
    category: "JACKET",
    href: "/product/relaxed-linen-jacket"
  },
  {
    id: "2",
    name: "Basic Regular Fit Tee",
    price: "$19.00",
    image: "https://framerusercontent.com/images/FZYtY4KIMm0eZv3Ei06lzVEpVw.png?width=400&height=500&fit=crop",
    category: "TEE",
    href: "/product/basic-regular-fit-tee"
  },
  {
    id: "3",
    name: "Baggy Denim Trousers",
    price: "$49.00",
    image: "https://framerusercontent.com/images/3rrWtzLTrKnHKnvWNjBUJc.jpg?width=400&height=500&fit=crop",
    category: "PANTS",
    href: "/product/baggy-denim-trousers"
  },
  {
    id: "4",
    name: "Overshirt Neutral",
    price: "$59.00",
    image: "https://framerusercontent.com/images/overshirt-neutral.png?width=400&height=500&fit=crop",
    category: "SHIRT",
    href: "/product/overshirt-neutral"
  },
  {
    id: "5",
    name: "Bomber Jacket",
    price: "$79.00",
    image: "https://framerusercontent.com/images/bomber-jacket-neutral.png?width=400&height=500&fit=crop",
    category: "JACKET",
    href: "/product/bomber-jacket"
  },
  {
    id: "6",
    name: "Chino Pants",
    price: "$45.00",
    image: "https://framerusercontent.com/images/chino-pants-neutral.png?width=400&height=500&fit=crop",
    category: "PANTS",
    href: "/product/chino-pants"
  }
]

const newProducts = [
  {
    id: "7",
    name: "Cropped Tee Minimal",
    price: "$24.00",
    image: "https://framerusercontent.com/images/cropped-tee-minimal.png?width=400&height=500&fit=crop",
    category: "TEE",
    href: "/product/cropped-tee-minimal"
  },
  {
    id: "8",
    name: "Heavyweight Tee",
    price: "$29.00",
    image: "https://framerusercontent.com/images/heavyweight-tee-neutral.png?width=400&height=500&fit=crop",
    category: "TEE",
    href: "/product/heavyweight-tee"
  },
  {
    id: "9",
    name: "Minimal Hoodie",
    price: "$65.00",
    image: "https://framerusercontent.com/images/minimal-hoodie-back-print.png?width=400&height=500&fit=crop",
    category: "HOODIE",
    href: "/product/minimal-hoodie"
  }
]

export default function CalderHomePage() {
  const { 
    isInitialized, 
    products: shopifyProducts, 
    currencySettings, 
    loading, 
    error 
  } = useShopXTools()
  const [displayProducts, setDisplayProducts] = useState(featuredProducts)

  useEffect(() => {
    if (isInitialized && shopifyProducts.length > 0) {
      // Convert Shopify products to our format with enhanced data
      const convertedProducts = shopifyProducts.slice(0, 6).map(({ node: product }) => {
        const firstVariant = product.variants?.edges?.[0]?.node
        const firstImage = product.images?.edges?.[0]?.node
        const color = getProductColor(product)
        const size = getProductSize(product)
        
        return {
          id: product.id,
          name: product.title,
          price: firstVariant ? formatPrice(firstVariant.price.amount, firstVariant.price.currencyCode) : 'Price unavailable',
          image: firstImage?.url || '/placeholder.jpg',
          category: product.productType?.toUpperCase() || product.title.split(' ')[0].toUpperCase(),
          href: `/product/${product.handle}`,
          // Additional product data
          vendor: product.vendor,
          tags: product.tags,
          color: color,
          size: size,
          availableForSale: firstVariant?.availableForSale || false,
          compareAtPrice: firstVariant?.compareAtPrice ? formatPrice(firstVariant.compareAtPrice.amount, firstVariant.compareAtPrice.currencyCode) : null
        }
      })
      setDisplayProducts(convertedProducts)
    }
  }, [isInitialized, shopifyProducts])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="calder-text-body">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="calder-text-body text-red-600 mb-4">Error loading products: {error}</p>
          <p className="calder-text-small text-gray-600">Using demo products instead.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <CalderHero />

      {/* Featured Products Section */}
      <CalderProductGrid
        products={displayProducts.slice(0, 6)}
        title="Featured Products"
        description="Discover our carefully curated selection of essential pieces designed for modern living."
        columns={3}
      />

      {/* New Arrivals Section */}
      <CalderProductGrid
        products={displayProducts.slice(3, 6)}
        title="New Arrivals"
        description="Fresh styles that redefine everyday essentials with contemporary design and comfort."
        columns={3}
      />

      {/* Brand Story Section */}
      <section className="calder-section">
        <div className="calder-section-content">
          <motion.div 
            className="calder-section-header"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="calder-text-section calder-section-title">
              Designed to be effortless, modern, and free to use
            </h2>
            <p className="calder-section-description">
              Perfect for managing and growing your online store with ease. Our minimalist approach 
              focuses on quality, comfort, and timeless design that works for every occasion.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {[
              { title: "Free shipping on orders over $100", icon: "🚚" },
              { title: "14-day hassle-free returns", icon: "↩️" },
              { title: "30-day product warranty", icon: "🛡️" },
              { title: "Customer support 24/7", icon: "💬" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center p-8 bg-gray-50 rounded-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <p className="calder-text-small text-gray-600">{feature.title}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="calder-section-sm bg-gray-50">
        <div className="calder-section-content">
          <motion.div 
            className="calder-section-header"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="calder-text-section calder-section-title">
              Stay updated with our latest collections
            </h2>
            <p className="calder-section-description">
              Be the first to know about new arrivals, exclusive offers, and style tips.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <button className="px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
