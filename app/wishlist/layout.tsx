import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wishlist — Layers Clothing",
  description: "Your saved items from Layers Clothing.",
}

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
