"use client"

import { useState } from "react"
import { Section } from "@/components/section"
import { useWishlistContext } from "@/components/wishlist-provider"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Heart } from "lucide-react"
import { products } from "@/lib/products"

interface ProductClientProps {
  product: typeof products[0]
}

export function ProductClient({ product: p }: ProductClientProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist, isLoaded } = useWishlistContext()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  const handleWishlistToggle = () => {
    if (isInWishlist(p.slug)) {
      removeFromWishlist(p.slug)
    } else {
      addToWishlist({
        slug: p.slug,
        name: p.name,
        price: p.price,
        image: p.image,
      })
    }
  }


  return (
    <div className="space-y-16">
      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-xl">
              <img 
                src={p.image || "/placeholder.svg"} 
                alt={p.name} 
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-105" 
              />
              {p.badge && (
                <div className="absolute top-4 left-4 inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-lg">
                  {p.badge}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">{p.name}</h1>
              <div className="text-sm uppercase tracking-wide text-muted-foreground font-medium">{p.category}</div>
              <div className="text-3xl font-bold text-primary">${p.price.toFixed(2)}</div>
            </div>
            
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-lg leading-relaxed">
                {p.description || "Crafted for comfort and style with updated proportions. Pairs effortlessly across the collection."}
              </p>
            </div>

            {p.sizes && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {p.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex h-12 w-12 items-center justify-center rounded-lg border-2 text-sm font-medium transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground shadow-md"
                          : "border-border hover:bg-muted hover:border-primary/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-sm text-muted-foreground">Please select a size</p>
                )}
              </div>
            )}

            {p.colors && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Color</h3>
                <div className="flex flex-wrap gap-3">
                  {p.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                        selectedColor === color
                          ? "border-primary bg-primary text-primary-foreground shadow-md"
                          : "border-border hover:bg-muted hover:border-primary/50"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
                {!selectedColor && (
                  <p className="text-sm text-muted-foreground">Please select a color</p>
                )}
              </div>
            )}

            <div className="space-y-4">
              <div className="flex gap-4">
                <AddToCartButton 
                  product={p}
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                  className="flex-1 h-14 text-lg font-semibold"
                />
                <button
                  onClick={handleWishlistToggle}
                  disabled={!isLoaded}
                  className={`inline-flex items-center justify-center rounded-lg border-2 px-6 py-3 h-14 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    isLoaded && isInWishlist(p.slug)
                      ? "border-primary bg-primary text-primary-foreground shadow-md"
                      : "border-border hover:bg-muted hover:border-primary/50"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLoaded && isInWishlist(p.slug) ? "fill-current" : ""}`} />
                </button>
              </div>
              
              {(!selectedSize || !selectedColor) && (
                <p className="text-sm text-muted-foreground">
                  Please select both size and color to add to cart
                </p>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {p.materials && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Materials</h3>
                  <div className="space-y-2">
                    {p.materials.map((material, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground">{material}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {p.care && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Care Instructions</h3>
                  <p className="text-muted-foreground leading-relaxed">{p.care}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Size Guide" subtitle="Find your perfect fit">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>
            Our sizing is designed to be true to size with a relaxed, comfortable fit. 
            If you're between sizes, we recommend sizing up for a more relaxed fit or 
            sizing down for a more fitted look.
          </p>
          
          <h3>How to Measure</h3>
          <ul>
            <li><strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape measure horizontal</li>
            <li><strong>Length:</strong> Measure from the highest point of the shoulder to the bottom hem</li>
            <li><strong>Sleeve:</strong> Measure from the shoulder seam to the end of the sleeve</li>
          </ul>

          <h3>Size Chart</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-2 text-left">Size</th>
                  <th className="border border-border px-4 py-2 text-left">Chest (in)</th>
                  <th className="border border-border px-4 py-2 text-left">Length (in)</th>
                  <th className="border border-border px-4 py-2 text-left">Sleeve (in)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-2">XS</td>
                  <td className="border border-border px-4 py-2">32-34</td>
                  <td className="border border-border px-4 py-2">26</td>
                  <td className="border border-border px-4 py-2">23</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">S</td>
                  <td className="border border-border px-4 py-2">34-36</td>
                  <td className="border border-border px-4 py-2">27</td>
                  <td className="border border-border px-4 py-2">24</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">M</td>
                  <td className="border border-border px-4 py-2">36-38</td>
                  <td className="border border-border px-4 py-2">28</td>
                  <td className="border border-border px-4 py-2">25</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">L</td>
                  <td className="border border-border px-4 py-2">38-40</td>
                  <td className="border border-border px-4 py-2">29</td>
                  <td className="border border-border px-4 py-2">26</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">XL</td>
                  <td className="border border-border px-4 py-2">40-42</td>
                  <td className="border border-border px-4 py-2">30</td>
                  <td className="border border-border px-4 py-2">27</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2">XXL</td>
                  <td className="border border-border px-4 py-2">42-44</td>
                  <td className="border border-border px-4 py-2">31</td>
                  <td className="border border-border px-4 py-2">28</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Section>
    </div>
  )
}
