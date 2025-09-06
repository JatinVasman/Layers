"use client"

import { useState, useEffect } from "react"

interface WishlistItem {
  slug: string
  name: string
  price: number
  image: string
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("layers-wishlist")
    if (saved) {
      try {
        setWishlist(JSON.parse(saved))
      } catch (error) {
        console.error("Error loading wishlist:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save wishlist to localStorage whenever it changes (only after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("layers-wishlist", JSON.stringify(wishlist))
    }
  }, [wishlist, isLoaded])

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.some((wishlistItem) => wishlistItem.slug === item.slug)) {
        return prev // Item already in wishlist
      }
      return [...prev, item]
    })
  }

  const removeFromWishlist = (slug: string) => {
    setWishlist((prev) => prev.filter((item) => item.slug !== slug))
  }

  const isInWishlist = (slug: string) => {
    return wishlist.some((item) => item.slug === slug)
  }

  const clearWishlist = () => {
    setWishlist([])
  }

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount: wishlist.length,
    isLoaded,
  }
}
