"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
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
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Hero Content - Below center positioned */}
        <div className="absolute top-1/2 left-0 right-0 z-10 text-center px-8 mt-16">
          <motion.p 
            className="text-subheading text-white tracking-wider italic font-light"
            style={{ 
              fontStyle: 'italic',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.05em',
              transform: 'skew(-2deg)'
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.5, 
              duration: 1.2, 
              ease: [0.19, 1, 0.22, 1] 
            }}
          >
            Timeless Wardrobe. Everyday Power.
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

          {/* Product Images Grid - Stacked on mobile, 2x2 on desktop */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-30 justify-items-start">
            {[
              { name: 'T-Shirts', image: '/t-shirt-neutral-studio.png' },
              { name: 'Hoodies', image: '/cozy-hoodie.png' },
              { name: 'Cropped Tee', image: '/cropped-tee-minimal.png' },
              { name: 'Sweatshirts', image: '/minimal-sweatshirt-neutral.png' }
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proven Favorites Section - Product cards with hover image swap */}
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
              Proven Favorites
            </h2>
          </motion.div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-30 justify-items-center md:justify-items-start">
            {[
              { 
                name: 'Relaxed Linen Jacket', 
                category: 'JACKET',
                price: '₹4,099', 
                image: '/relaxed-linen-jacket.png',
                hoverImage: '/relaxed-linen-jacket-neutral-studio.png'
              },
              { 
                name: 'Basic Regular Fit Tee', 
                category: 'TEE',
                price: '₹1,299', 
                image: '/basic-black-tee-back-print.png',
                hoverImage: '/t-shirt-neutral-studio.png'
              },
              { 
                name: 'Baggy Denim Trousers', 
                category: 'PANTS',
                price: '₹3,599', 
                image: '/baggy-denim-trousers.png',
                hoverImage: '/baggy-denim-trousers-studio.png'
              }
            ].map((product, index) => {
              const [isTouched, setIsTouched] = useState(false)
              
              return (
                <motion.a
                  key={product.name}
                  href={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group block w-full"
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.2 * index, 
                    duration: 1.2, 
                    ease: [0.19, 1, 0.22, 1] 
                  }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.4, ease: [0.19, 1, 0.22, 1] }
                  }}
                  onTouchStart={() => setIsTouched(true)}
                  onTouchEnd={() => setTimeout(() => setIsTouched(false), 2000)}
                >
                {/* Image Container - Responsive dimensions */}
                <div className="relative overflow-hidden rounded-lg mb-4 w-full max-w-md md:max-w-none" style={{ aspectRatio: '456/569' }}>
                  {/* Main Image - Hidden on mobile when touched, shown on desktop */}
                  <div className="absolute inset-0">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className={`w-full h-full object-cover transition-opacity duration-500 ${
                        isTouched ? 'opacity-0 md:opacity-0' : 'opacity-100 md:opacity-100'
                      } group-hover:opacity-0`}
                    />
                  </div>
                  
                  {/* Hover Image - Shown on mobile when touched, hover on desktop */}
                  <div className="absolute inset-0">
                    <img 
                      src={product.hoverImage} 
                      alt={`${product.name} - Hover`}
                      className={`w-full h-full object-cover transition-opacity duration-500 ${
                        isTouched ? 'opacity-100 md:opacity-0' : 'opacity-0 md:opacity-0'
                      } group-hover:opacity-100`}
                    />
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="space-y-2">
                  {/* Title & Category */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] tracking-wider uppercase">
                      {product.category}
                    </p>
                  </div>
                  
                  {/* Price */}
                  <div className="text-lg font-semibold text-[var(--foreground)]">
                    {product.price}
                  </div>
                </div>
              </motion.a>
              )
            })}
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
              { title: 'Free shipping on orders over ₹999', icon: '🚚' },
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
