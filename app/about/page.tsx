"use client"

import { Section } from "@/components/section"
import { BRAND } from "@/lib/brand"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Heart, Leaf, Users, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <Image
          src="/images/about-page.JPG"
          alt="About Layers Clothing - Modern lifestyle"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={90}
        />
      </div>

      {/* Brand Introduction - Modern Split Layout */}
      <div className="py-24 bg-white">
        <div className="w-full px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Who We Are
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                {BRAND.description}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {BRAND.founded} Our goal is to blend minimalism, comfort, and style into clothing that feels timeless. 
                We believe in sustainable practices, high-quality fabrics, and customer-first experiences.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Passionate Design</h3>
                  <p className="text-gray-600">Every piece tells a story</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-white rounded-3xl overflow-hidden border border-gray-200">
                <Image
                  src="/images/home/img-2016.jpg"
                  alt="Layers Clothing Studio"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-black rounded-full flex items-center justify-center">
                <Award className="w-12 h-12 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mission Section - Centered with Impact */}
      <div className="py-24 bg-black text-white">
        <div className="w-full px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Our Mission
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl">
              {BRAND.mission}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Values Section - Modern Card Grid */}
      <div className="py-24 bg-white">
        <div className="w-full px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              The principles that guide everything we do
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8" />,
                title: "Quality First",
                description: "We use only the finest materials and construction techniques to ensure our clothing lasts through every wash and wear.",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "Sustainable Practices",
                description: "Committed to responsible sourcing and minimizing our environmental impact at every step of production.",
                color: "from-green-500 to-green-600"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Customer-Centric",
                description: "Every decision we make puts our customers' comfort, satisfaction, and style needs first.",
                color: "from-purple-500 to-purple-600"
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section - Modern Cards */}
      <div className="py-24 bg-black text-white">
        <div className="w-full px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl">
              The people behind Layers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Design Team",
                description: "Our designers work tirelessly to create pieces that are both timeless and contemporary.",
                image: "/images/home/img-2018.jpg"
              },
              {
                title: "Production Team", 
                description: "Our production partners ensure every piece meets our high standards for quality and sustainability.",
                image: "/images/home/img-2019.jpg"
              }
            ].map((team, index) => (
              <motion.div
                key={team.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 border border-white/10">
                  <div className="aspect-square w-32 h-32 bg-white rounded-2xl mx-auto mb-6 overflow-hidden border border-gray-200">
                    <Image
                      src={team.image}
                      alt={team.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center">{team.title}</h3>
                  <p className="text-gray-300 text-center leading-relaxed">{team.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
