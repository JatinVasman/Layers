"use client"

import { createContext, useContext, ReactNode } from "react"
import { useCart } from "@/hooks/use-cart"

interface CartContextType {
  cart: any[]
  addToCart: (item: any) => void
  removeFromCart: (slug: string, size?: string, color?: string) => void
  updateQuantity: (slug: string, quantity: number, size?: string, color?: string) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart()

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}
