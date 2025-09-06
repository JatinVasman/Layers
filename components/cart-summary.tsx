"use client"

import { useCartContext } from "@/components/cart-provider"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export function CartSummary() {
  const { cart, getTotalPrice, cartCount } = useCartContext()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || cartCount === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link href="/cart">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-[200px] hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">
                {cartCount} item{cartCount !== 1 ? 's' : ''} in cart
              </div>
              <div className="text-lg font-bold text-primary">
                ${getTotalPrice().toFixed(2)}
              </div>
            </div>
            <div className="text-xs text-gray-500">
              View Cart →
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
