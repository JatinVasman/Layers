"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { BRAND } from "@/lib/brand"

export function HeroBanner() {
  return (
    <div className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-4xl text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="space-y-8"
        >
          <motion.h2 
            className="text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Welcome to Layers
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {BRAND.description}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Link href="/products">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 shadow-lg hover:shadow-xl"
              >
                Shop Collection
              </motion.div>
            </Link>
            
            <Link href="/about">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center rounded-lg border-2 border-border px-8 py-4 text-base font-semibold transition-all duration-300 hover:bg-muted hover:border-primary/50"
              >
                Learn More
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
