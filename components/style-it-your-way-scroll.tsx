"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"

interface ImageData {
  id: string
  src: string
  alt: string
  containerStyle: React.CSSProperties
  imageStyle: React.CSSProperties
  position?: 'center' | 'top-right' | 'bottom-left'
}

const images: ImageData[] = [
  {
    id: "image-1",
    src: "/cozy-hoodie.png",
    alt: "Model in black hoodie and green cap",
    containerStyle: { 
      width: '700px', 
      height: '800px',
    },
    imageStyle: { 
      width: '100%', 
      height: '100%',
      objectFit: 'cover'
    },
    position: 'center'
  },
  {
    id: "image-2",
    src: "/cropped-tee-minimal.png", 
    alt: "Model in black cropped t-shirt and sunglasses",
    containerStyle: { 
      width: '500px', 
      height: '600px'
    },
    imageStyle: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    position: 'top-right'
  },
  {
    id: "image-3",
    src: "/back-print-t-shirt.png",
    alt: "Model in black t-shirt with graphic", 
    containerStyle: { 
      width: '550px', 
      height: '650px'
    },
    imageStyle: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    position: 'bottom-left'
  },
  {
    id: "image-4",
    src: "/minimal-sweatshirt-neutral.png",
    alt: "Model in sweatshirt",
    containerStyle: { 
      width: '750px', 
      height: '850px',
    },
    imageStyle: { 
      width: '100%', 
      height: '100%',
      objectFit: 'cover'
    },
    position: 'center'
  }
]

export default function StyleItYourWayScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  
  // Animation controls for each image
  const controls = [
    useAnimation(),
    useAnimation(), 
    useAnimation(),
    useAnimation()
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      // Check each image container individually
      const containers = sectionRef.current.querySelectorAll('[data-image-container]')
      
       containers.forEach((container, containerIndex) => {
         const rect = container.getBoundingClientRect()
         const viewportHeight = window.innerHeight
         
         // Calculate if container is in viewport and how much
         const containerTop = rect.top
         const containerBottom = rect.bottom
         const isInViewport = containerTop < viewportHeight && containerBottom > 0
         
         // Calculate progress: 0 when entering from bottom, 1 when fully in view
         const progress = Math.max(0, Math.min(1, (viewportHeight - containerTop) / viewportHeight))
         
         // Determine which image controls to animate
         let imagesToAnimate: number[] = []
         if (containerIndex === 0) {
           imagesToAnimate = [0] // First image
         } else if (containerIndex === 1) {
           imagesToAnimate = [1, 2] // Second and third images together
         } else if (containerIndex === 2) {
           imagesToAnimate = [3] // Fourth image
         }
         
         imagesToAnimate.forEach(imageIndex => {
           if (isInViewport && progress > 0.3) {
             // Image comes from below and scales up - only when significantly in view
             const animationProgress = Math.min(1, (progress - 0.3) / 0.5) // Normalize progress from 0.3-0.8 to 0-1 (longer range)
             controls[imageIndex].start({
               scale: animationProgress,
               y: (1 - animationProgress) * 100,
               transition: { 
                 duration: 0.6,
                 ease: [0.19, 1, 0.22, 1] // Smoother, more elegant easing
               }
             })
           } else {
             // Image is below viewport or not enough in view, keep it hidden
             controls[imageIndex].start({
               scale: 0,
               y: 100,
               transition: { 
                 duration: 0.6,
                 ease: [0.19, 1, 0.22, 1]
               }
             })
           }
         })
       })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [controls])

  const renderImage = (imageData: ImageData, index: number) => {
    const { position } = imageData

    if (index === 1 || index === 2) {
      // Images 2 and 3 share a container
      return null // Handle these separately
    }

    const containerClass = position === 'center' 
      ? "relative flex items-center justify-center"
      : "relative"

     return (
       <div 
         key={imageData.id}
         className="flex justify-center items-center mb-4 px-4 md:px-0" 
         style={{ height: '800px' }}
         data-image-container
       >
        <div className={`${containerClass} w-full max-w-xs md:max-w-none`} style={imageData.containerStyle}>
          <motion.img 
            src={imageData.src}
            alt={imageData.alt}
             className="object-cover relative z-20 bg-[var(--card)] rounded-lg shadow-2xl w-full h-full"
            style={imageData.imageStyle}
            animate={controls[index]}
            initial={{ scale: 0, y: 100 }}
          />
        </div>
      </div>
    )
  }

  return (
    <section className="relative bg-[var(--background)]" ref={sectionRef}>
      {/* Sticky Title - Behind images only */}
      <div className="sticky top-1/2 transform -translate-y-1/2 z-10 text-center pointer-events-none px-4">
        <h2 className="text-3xl md:text-section text-[var(--foreground)] font-light tracking-wide">
          Style It <br/> Your Way
        </h2>
      </div>

      {/* Scroll-based Animation Container - Images only have higher z-index */}
      <div className="relative">
        {/* Container 1: First Image */}
        {renderImage(images[0], 0)}

         {/* Container 2 & 3: Combined container for images 2 and 3 */}
         <div className="relative mb-4 px-4 md:px-0" style={{ height: '800px' }} data-image-container>
           {/* Mobile: Compact stacked layout */}
           <div className="md:hidden flex flex-col gap-6 h-full justify-center py-8">
             {/* Second Image - Mobile - Top */}
             <div className="w-full max-w-sm mx-auto">
               <motion.img 
                 src={images[1].src}
                 alt={images[1].alt}
                 className="w-full h-auto object-cover relative z-20 bg-[var(--card)] rounded-lg shadow-2xl"
                 style={{ width: '350px', height: '450px', objectFit: 'cover' }}
                 animate={controls[1]}
                 initial={{ scale: 0, y: 100 }}
               />
             </div>
             
             {/* Third Image - Mobile - Bottom */}
             <div className="w-full max-w-sm mx-auto">
               <motion.img 
                 src={images[2].src}
                 alt={images[2].alt}
                 className="w-full h-auto object-cover relative z-20 bg-[var(--card)] rounded-lg shadow-2xl"
                 style={{ width: '350px', height: '450px', objectFit: 'cover' }}
                 animate={controls[2]}
                 initial={{ scale: 0, y: 100 }}
               />
             </div>
           </div>

           {/* Desktop: Absolute positioning */}
           <div className="hidden md:block">
             {/* Second Image - Top Right */}
             <div 
               className="absolute top-10 right-10"
               style={images[1].containerStyle}
             >
               <motion.img 
                 src={images[1].src}
                 alt={images[1].alt}
                 className="w-full h-full object-cover relative z-20 bg-[var(--card)] rounded-lg shadow-2xl"
                 style={images[1].imageStyle}
                 animate={controls[1]}
                 initial={{ scale: 0, y: 100 }}
               />
             </div>

             {/* Third Image - Bottom Left */}
             <div 
               className="absolute bottom-10 left-10"
               style={images[2].containerStyle}
             >
               <motion.img 
                 src={images[2].src}
                 alt={images[2].alt}
                 className="w-full h-full object-cover relative z-20 bg-[var(--card)] rounded-lg shadow-2xl"
                 style={images[2].imageStyle}
                 animate={controls[2]}
                 initial={{ scale: 0, y: 100 }}
               />
             </div>
           </div>
         </div>

        {/* Container 4: Fourth Image */}
        {renderImage(images[3], 3)}
      </div>
    </section>
  )
}
