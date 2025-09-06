import { ProductsClient } from "./products-client"

export const metadata = { 
  title: "All Products — Layers Clothing",
  description: "Browse our complete collection of everyday essentials. T-shirts, hoodies, sweatshirts, and cropped tees designed for comfort and style."
}

export default function ProductsPage() {
  return <ProductsClient />
}
