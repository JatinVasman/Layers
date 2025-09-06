"use client"

import { useState, useEffect } from "react"

interface CartItem {
  slug: string
  name: string
  price: number
  image: string
  size?: string
  color?: string
  quantity: number
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("layers-cart")
    if (saved) {
      try {
        setCart(JSON.parse(saved))
      } catch (error) {
        console.error("Error loading cart:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("layers-cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (cartItem) => 
          cartItem.slug === item.slug && 
          cartItem.size === item.size && 
          cartItem.color === item.color
      )

      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.slug === item.slug && 
          cartItem.size === item.size && 
          cartItem.color === item.color
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }

      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (slug: string, size?: string, color?: string) => {
    setCart((prev) => 
      prev.filter(
        (item) => 
          !(item.slug === slug && item.size === size && item.color === color)
      )
    )
  }

  const updateQuantity = (slug: string, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      removeFromCart(slug, size, color)
      return
    }

    setCart((prev) =>
      prev.map((item) =>
        item.slug === slug && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    cartCount: getTotalItems(),
  }
}
