"use client"

import { useState } from "react"
import { useCartContext } from "@/components/cart-provider"
import { products } from "@/lib/products"

interface AddToCartButtonProps {
  product: typeof products[0]
  selectedSize?: string
  selectedColor?: string
  className?: string
}

export function AddToCartButton({ product, selectedSize, selectedColor, className = "" }: AddToCartButtonProps) {
  const { addToCart } = useCartContext()
  const [isAnimating, setIsAnimating] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleAddToCart = () => {
    // Check if size and color are required and selected
    const needsSize = product.sizes && product.sizes.length > 0
    const needsColor = product.colors && product.colors.length > 0
    
    if (needsSize && !selectedSize) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }
    
    if (needsColor && !selectedColor) {
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    addToCart({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
    })

    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 2000)
  }

  return (
    <div className="w-full">
      <button
        onClick={handleAddToCart}
        className={`order relative overflow-hidden rounded-md px-6 py-3 text-background transition hover:opacity-90 w-full ${className} ${
          isAnimating ? 'active' : ''
        } ${
          showError 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-foreground'
        }`}
        style={{
          transform: isAnimating ? 'scale(0.96)' : 'scale(1)',
          transition: 'transform 0.1s ease'
        }}
      >
      <span 
        className={`default absolute left-0 right-0 top-0 flex h-full items-center justify-center text-center text-base font-medium text-white transition-all duration-300 ${
          isAnimating || showError ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          transitionDelay: isAnimating ? '0s' : '0.3s'
        }}
      >
        {showError ? 'Select Size & Color' : 'Add to Cart'}
      </span>
      <span 
        className={`success absolute left-0 right-0 top-0 flex h-full items-center justify-center text-center text-base font-medium text-white transition-all duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: isAnimating ? 'translateY(0)' : 'translateY(16px)',
          transitionDelay: isAnimating ? '0.1s' : '0s'
        }}
      >
        Added!
        <svg
          className="ml-1 h-3 w-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{
            strokeDasharray: '16px',
            strokeDashoffset: isAnimating ? '0' : '16px',
            transition: 'stroke-dashoffset 0.3s ease 0.2s'
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
            stroke="#10B981"
          />
        </svg>
      </span>
      </button>
      {showError && (
        <p className="text-sm text-red-500 text-center animate-pulse mt-2">
          Please select both size and color before adding to cart
        </p>
      )}
    </div>
  )
}
