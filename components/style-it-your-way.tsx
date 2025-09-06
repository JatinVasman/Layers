"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const EASE = [0.22, 1, 0.36, 1] as const

const images = [
  { src: "/images/home/img-2016.jpg", alt: "Tailored black and white suits in studio" },
  { src: "/images/home/img-2017.jpg", alt: "Minimal studio scene with beige and brown suits" },
  { src: "/images/home/img-2022.jpg", alt: "Streetwear group in black tees outdoors" },
  { src: "/images/home/img-2014.jpg", alt: "Back-to-back duo on white seamless" },
  { src: "/images/home/img-2015.jpg", alt: "Beige sweats on dark seamless studio" },
  { src: "/images/home/img-2013.jpg", alt: "Duo in brown hoodie and cropped top on white" },
  { src: "/images/home/img-2019.jpg", alt: "Las Vegas Raiders lookbook trio" },
  { src: "/images/home/img-2021.jpg", alt: "Five-person athleisure group on white seamless" },
  { src: "/images/home/img-2018.jpg", alt: "Editorial beige hoodies with fabric backdrop" },
]

export default function StyleItYourWay() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="mb-10 text-center md:mb-14">
        <h2 className="text-balance text-4xl font-semibold leading-tight md:text-6xl">
          Style It
          <br className="hidden md:block" />
          Your Way
        </h2>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12">
        {images.map((img, idx) => {
          const isLeft = idx % 2 === 0
          const delay = 0.08 * idx
          return (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.6, delay, ease: EASE }}
              className={isLeft ? "md:-mt-6" : "md:mt-16"}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="group relative overflow-hidden rounded-xl border border-border bg-secondary"
              >
                {/* Aspect box for consistent cropping without cutting subjects */}
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 768px) 520px, 90vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    priority={idx === 0}
                    quality={85}
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10"
                />
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
