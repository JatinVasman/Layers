"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const heroProducts = [
  {
    id: 1,
    name: "Relaxed Linen Jacket",
    price: "$69.00",
    image: "https://framerusercontent.com/images/4p7KeeA6P08b83SqTlPWppVZJgo.jpg?width=400&height=500&fit=crop",
    category: "JACKET"
  },
  {
    id: 2,
    name: "Basic Regular Fit Tee",
    price: "$19.00",
    image: "https://framerusercontent.com/images/FZYtY4KIMm0eZv3Ei06lzVEpVw.png?width=400&height=500&fit=crop",
    category: "TEE"
  },
  {
    id: 3,
    name: "Baggy Denim Trousers",
    price: "$49.00",
    image: "https://framerusercontent.com/images/3rrWtzLTrKnHKnvWNjBUJc.jpg?width=400&height=500&fit=crop",
    category: "PANTS"
  }
]

export function CalderHero() {
  return (
    <section className="calder-hero">
      <div className="calder-hero-content">
        {/* Hero Text */}
        <div className="calder-hero-text">
          <motion.h1 
            className="calder-hero-title"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            A minimalist and clean e-commerce template built with Framer and integrated with Shopify.
          </motion.h1>
          
          <motion.p 
            className="calder-hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          >
            Designed to be effortless, modern, and free to use — perfect for managing and growing your online store with ease.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
          >
            <Link 
              href="/products"
              className="calder-hero-cta"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>

        {/* Hero Products */}
        <div className="calder-hero-products">
          {heroProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="calder-hero-product"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1), duration: 1, ease: "easeOut" }}
            >
              <div className="calder-hero-product-image">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="calder-hero-product-info">
                <h3 className="calder-hero-product-title">{product.name}</h3>
                <p className="calder-hero-product-price">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
