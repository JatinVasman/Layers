"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Link from "next/link"
import StyleItYourWayScroll from "@/components/style-it-your-way-scroll"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const springY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      {/* Hero Section - Full screen with model face partially obscured by hoodie */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[var(--background)]">
        {/* Background Model Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/hero-image.JPG" 
            alt="Model with hoodie" 
            className="w-full h-full object-cover object-center scale-100"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Hero Content - Slightly below center positioned */}
        <div className="absolute inset-0 flex items-center justify-center z-30 text-center px-4 md:px-8 pt-20 md:pt-40">
          <motion.p 
            className="text-white tracking-wider font-hero-script text-3xl md:text-5xl lg:text-6xl"
            style={{ 
              letterSpacing: '0.05em',
              fontFamily: "'Great Vibes', cursive",
              fontWeight: 400,
              lineHeight: 1.2
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.5, 
              duration: 1.2, 
              ease: [0.19, 1, 0.22, 1] 
            }}
          >
            Every layers tells a story
          </motion.p>
        </div>
      </section>

      {/* Everyday Essentials Section - Horizontal scrolling categories */}
      <section className="py-32 px-4 bg-[var(--background)]">
        <div className="w-full">
          <motion.h2 
            className="text-4xl md:text-section text-[var(--foreground)] mb-16 text-left"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            viewport={{ once: true }}
          >
            Everyday Essentials
          </motion.h2>

          {/* Product Images Grid - Stacked on mobile, 3 columns on desktop */}
          <div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-30 justify-items-start">
            {[
              { name: 'Black T-Shirt', image: '/Tshirts/black tshirt_front.jpg', slug: 'black-tshirt' },
              { name: 'Cream T-Shirt', image: '/Tshirts/cream tshirt_front.jpg', slug: 'cream-tshirt' },
              { name: 'White T-Shirt', image: '/Tshirts/white tshirt_front.jpg', slug: 'white-tshirt' }
            ].map((product, index) => (
              <motion.div
                key={product.name}
                className="group cursor-pointer w-full md:w-auto"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.1 * index, 
                  duration: 1.2, 
                  ease: [0.19, 1, 0.22, 1] 
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <Link href={`/product/${product.slug}`}>
                  <div className="aspect-square overflow-hidden rounded-lg mb-4 group-hover:shadow-2xl transition-all duration-500 max-w-sm md:max-w-none mx-auto md:mx-0">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-small tracking-wider uppercase text-center group-hover:text-[var(--primary)] transition-colors duration-300">
                    {product.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Style It Your Way Section - Custom Scroll Animation */}
      <StyleItYourWayScroll />

      {/* Brand Promises / Trust Badges Section */}
      <section className="py-32 px-8 bg-[var(--background)]">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { title: 'Free shipping on orders over ₹1500', icon: '🚚' },
              { title: '14-day hassle-free returns', icon: '↩️' },
              { title: '50-day product warranty', icon: '🛡️' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <p className="text-small text-[var(--muted-foreground)]">{feature.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's New at Layers Section */}
      <section className="py-32 px-4 bg-[var(--background)]">
        <div className="w-full">
          <motion.div 
            className="text-left mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-section text-[var(--foreground)] mb-8">
              What's New at<br />Layers
            </h2>
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'New Drops', 
                image: '/fashion-new-drops.png',
                link: '/products'
              },
              { 
                title: 'Responsible Fabric & Design', 
                image: '/responsible-fabric-and-design.png',
                link: '/about'
              },
              { 
                title: 'Modern Forms, Updated Proportions', 
                image: '/modern-tailoring-updated-proportions.png',
                link: '/about'
              }
            ].map((item, index) => (
              <motion.a
                key={item.title}
                href={item.link}
                className="group block"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-subheading group-hover:text-[var(--primary)] transition-colors duration-300">
                  {item.title}
                </h3>
              </motion.a>
            ))}
          </div>
        </div>
      </section>


    </>
  )
}
