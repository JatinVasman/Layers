"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Section } from "@/components/section"

const showcaseImages = [
  {
    src: "/images/home/img-2016.jpg",
    alt: "Tailored black and white suits in studio",
    title: "Quality Craftsmanship",
    description: "Every piece is carefully crafted with attention to detail"
  },
  {
    src: "/images/home/img-2017.jpg", 
    alt: "Minimal studio scene with beige and brown suits",
    title: "Sustainable Design",
    description: "Committed to responsible sourcing and environmental impact"
  },
  {
    src: "/images/home/img-2014.jpg",
    alt: "Back-to-back duo on white seamless",
    title: "Versatile Style",
    description: "Designed to move with you through every layer of life"
  }
]

export function BrandShowcase() {
  return (
    <Section className="py-16 md:py-24">
      <div className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Built for Every Layer
          </h2>
          <p className="text-lg text-muted-foreground">
            Our commitment to quality, sustainability, and style shines through in every piece we create.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {showcaseImages.map((item, index) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group space-y-4"
            >
              <div className="relative overflow-hidden rounded-xl aspect-[4/5]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
