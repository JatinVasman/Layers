export type Product = {
  slug: string
  name: string
  category: "t-shirts" | "hoodies" | "sweatshirts" | "cropped-tees"
  price: number
  image: string
  badge?: string
  description?: string
}

export const products: Product[] = [
  {
    slug: "heavyweight-classic-tee",
    name: "Heavyweight Classic Tee",
    category: "t-shirts",
    price: 28,
    image: "/placeholder.svg?height=640&width=640",
    badge: "Bestseller",
    description:
      "Premium 240gsm cotton tee with a relaxed fit. Soft hand-feel and reinforced neckline for everyday wear.",
  },
  {
    slug: "oversized-graphic-hoodie",
    name: "Oversized Graphic Hoodie",
    category: "hoodies",
    price: 58,
    image: "/placeholder.svg?height=640&width=640",
    badge: "New",
    description: "Cozy oversized fit with brushed fleece interior. Minimal graphic print and double-stitched seams.",
  },
  {
    slug: "crewneck-sweatshirt",
    name: "Crewneck Sweatshirt",
    category: "sweatshirts",
    price: 48,
    image: "/placeholder.svg?height=640&width=640",
    description: "Classic crewneck with ribbed collar and cuffs. Mid-weight loopback cotton.",
  },
  {
    slug: "boxy-cropped-tee",
    name: "Boxy Cropped Tee",
    category: "cropped-tees",
    price: 26,
    image: "/placeholder.svg?height=640&width=640",
    description: "Boxy silhouette with a modern cropped length. Silky-soft cotton modal blend.",
  },
]
