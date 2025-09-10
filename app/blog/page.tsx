"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const posts = [
  {
    slug: "new-drops-september",
    title: "New Drops: September",
    excerpt: "Introducing our latest heavyweight tees and cozy hoodies.",
  },
  { slug: "style-tips-layering", title: "Style Tips: Layering", excerpt: "How to layer essentials for fall." },
]

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
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
            <h2 className="text-section text-[var(--foreground)] mb-8">
              What's New at<br />Layers
            </h2>
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "New Drops: September", 
                description: "Introducing our latest heavyweight tees and cozy hoodies designed for the modern wardrobe.",
                image: "/images/home/img-2013.jpg",
                link: "/blog/new-drops-september"
              },
              { 
                title: "Style Tips: Layering", 
                description: "Master the art of layering with our essential pieces. From basic tees to statement jackets.",
                image: "/images/home/img-2014.jpg",
                link: "/blog/style-tips-layering"
              },
              { 
                title: "Behind the Scenes", 
                description: "Take a look at our design process and the craftsmanship that goes into every piece.",
                image: "/images/home/img-2015.jpg",
                link: "/blog/behind-the-scenes"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.2 * index, 
                  duration: 1.2, 
                  ease: [0.19, 1, 0.22, 1] 
                }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={item.link} className="block">
                  <div className="relative overflow-hidden rounded-lg mb-6 aspect-[4/5]">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-[var(--muted-foreground)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 px-4 bg-[var(--background)]">
        <div className="w-full">
          <h2 className="text-3xl font-semibold text-[var(--foreground)] mb-8">Latest Articles</h2>
          <div className="space-y-6">
            {posts.map((p) => (
              <article key={p.slug} className="border-b border-[var(--border)] pb-6">
                <Link href={`/blog/${p.slug}`} className="block group">
                  <h3 className="text-xl font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors duration-300">{p.title}</h3>
                  <p className="mt-1 text-[var(--muted-foreground)]">{p.excerpt}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
