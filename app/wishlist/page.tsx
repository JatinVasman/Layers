"use client"

import { Section } from "@/components/section"
import { useWishlistContext } from "@/components/wishlist-provider"
import { ProductGrid } from "@/components/product-grid"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function WishlistPage() {
  const { wishlist, clearWishlist, removeFromWishlist } = useWishlistContext()

  if (wishlist.length === 0) {
    return (
      <Section title="Your Wishlist" subtitle="Items you've saved for later">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Heart className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-6">
            Save items you love by clicking the heart icon on any product.
          </p>
          <Link href="/collection/t-shirts">
            <Button>
              <ShoppingBag className="h-4 w-4 mr-2" />
              Start Shopping
            </Button>
          </Link>
        </div>
      </Section>
    )
  }

  return (
    <Section title="Your Wishlist" subtitle={`${wishlist.length} saved item${wishlist.length !== 1 ? 's' : ''}`}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Save items you love and come back to them later.
          </p>
          <Button
            variant="outline"
            onClick={clearWishlist}
            className="text-sm"
          >
            Clear all
          </Button>
        </div>
        
        <ProductGrid products={wishlist} />
      </div>
    </Section>
  )
}
