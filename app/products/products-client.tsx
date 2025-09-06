"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Section } from "@/components/section"
import { ProductGrid } from "@/components/product-grid"
import { ScrollReveal } from "@/components/scroll-reveal"
import { products } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Get unique categories from actual products
const getAvailableCategories = () => {
  const categorySet = new Set(products.map(product => product.category))
  return Array.from(categorySet).map(category => {
    const categoryInfo = {
      "t-shirts": { label: "T‑Shirts", count: 0 },
      "hoodies": { label: "Hoodies", count: 0 },
      "sweatshirts": { label: "Sweatshirts", count: 0 },
      "cropped-tees": { label: "Cropped Tees", count: 0 },
      "bottoms": { label: "Bottoms", count: 0 },
      "outerwear": { label: "Outerwear", count: 0 },
      "accessories": { label: "Accessories", count: 0 },
    }[category] || { label: category, count: 0 }
    
    return {
      key: category,
      label: categoryInfo.label,
      count: products.filter(p => p.category === category).length
    }
  }).sort((a, b) => b.count - a.count) // Sort by product count
}

export function ProductsClient() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const availableCategories = getAvailableCategories()

  // Initialize selected category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam && availableCategories.some(cat => cat.key === categoryParam)) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams, availableCategories])

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
  }

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products
    return products.filter(product => product.category === selectedCategory)
  }, [selectedCategory])

  const totalProducts = products.length
  const filteredCount = filteredProducts.length

  // Check scroll buttons on mount and when categories change
  useEffect(() => {
    checkScrollButtons()
    const timer = setTimeout(checkScrollButtons, 100) // Small delay to ensure DOM is ready
    return () => clearTimeout(timer)
  }, [availableCategories])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl mb-4">
              All Products
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our complete collection of everyday essentials
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {filteredCount} {selectedCategory ? 'filtered' : 'total'} products available
            </p>
          </div>
        </div>
      </div>

      <div className="py-16">
        <Section title="Our Collection" subtitle="Everyday essentials designed for comfort and style">
          {/* Category Filter - Sticky Navigation with Arrows */}
          <div className="sticky top-20 z-30 mb-12 bg-background/95 backdrop-blur-sm border-b border-border/50 pb-4">
            <div className="relative flex items-center">
              {/* Left Arrow */}
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className={`absolute left-0 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-lg border border-border/50 hover:bg-background transition-all duration-200 ${
                  canScrollLeft 
                    ? 'opacity-100 hover:scale-105' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Right Arrow */}
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollRight}
                disabled={!canScrollRight}
                className={`absolute right-0 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-lg border border-border/50 hover:bg-background transition-all duration-200 ${
                  canScrollRight 
                    ? 'opacity-100 hover:scale-105' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* Scrollable Container */}
              <div 
                ref={scrollContainerRef}
                onScroll={checkScrollButtons}
                className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-10 mx-auto max-w-4xl"
              >
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  onClick={() => setSelectedCategory(null)}
                  className="rounded-full whitespace-nowrap flex-shrink-0 transition-all duration-200 hover:scale-105"
                >
                  All Products
                  <Badge variant="secondary" className="ml-2">
                    {totalProducts}
                  </Badge>
                </Button>
                {availableCategories.map((category) => (
                  <Button
                    key={category.key}
                    variant={selectedCategory === category.key ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.key)}
                    className="rounded-full whitespace-nowrap flex-shrink-0 transition-all duration-200 hover:scale-105"
                  >
                    {category.label}
                    <Badge variant="secondary" className="ml-2">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <ScrollReveal>
            <ProductGrid products={filteredProducts} />
          </ScrollReveal>
        </Section>
      </div>
    </div>
  )
}
