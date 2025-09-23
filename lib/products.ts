export type Product = {
  slug: string
  name: string
  category: "t-shirts"
  subcategory?: string
  price: number
  image: string
  hoverImage?: string
  badge?: string
  description?: string
  sizes?: string[]
  colors?: string[]
  materials?: string[]
  care?: string
  sku?: string
  inStock?: boolean
  tags?: string[]
  seoTitle?: string
  metaDescription?: string
  featured?: boolean
  dateAdded?: string
}

export const products: Product[] = [
  {
    slug: "black-tshirt",
    name: "Black T-Shirt",
    category: "t-shirts",
    subcategory: "classic-basics",
    price: 600,
    image: "/Tshirts/black tshirt_front.jpg",
    hoverImage: "/Tshirts/black tshirt_back.jpg",
    badge: "Bestseller",
    description: "Premium black cotton tee with a relaxed fit. Soft hand-feel and reinforced neckline for everyday wear.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black"],
    materials: ["100% Cotton"],
    care: "Machine wash cold, tumble dry low"
  },
  {
    slug: "cream-tshirt",
    name: "Cream T-Shirt",
    category: "t-shirts",
    subcategory: "essential-basics",
    price: 600,
    image: "/Tshirts/cream tshirt_front.jpg",
    hoverImage: "/Tshirts/cream tshirt_back.jpg",
    badge: "New",
    description: "Comfortable cream everyday tee with perfect fit. Essential piece for your wardrobe.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Cream"],
    materials: ["100% Cotton"],
    care: "Machine wash cold, tumble dry low"
  },
  {
    slug: "white-tshirt",
    name: "White T-Shirt",
    category: "t-shirts",
    subcategory: "premium",
    price: 600,
    image: "/Tshirts/white tshirt_front.jpg",
    hoverImage: "/Tshirts/white tshirt_back.jpg",
    description: "Classic white tee with superior comfort and durability. Timeless wardrobe essential.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White"],
    materials: ["100% Cotton"],
    care: "Machine wash cold, tumble dry low"
  }
]
