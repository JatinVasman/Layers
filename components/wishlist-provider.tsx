"use client"

import { createContext, useContext, ReactNode } from "react"
import { useWishlist } from "@/hooks/use-wishlist"

interface WishlistContextType {
  wishlist: any[]
  addToWishlist: (item: any) => void
  removeFromWishlist: (slug: string) => void
  isInWishlist: (slug: string) => boolean
  clearWishlist: () => void
  wishlistCount: number
  isLoaded: boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const wishlist = useWishlist()

  return (
    <WishlistContext.Provider value={wishlist}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlistContext() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlistContext must be used within a WishlistProvider')
  }
  return context
}
