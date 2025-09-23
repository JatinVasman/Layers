import { ProductsClient } from "./products-client"

export const metadata = { 
  title: "T-Shirt Collection — Layers Clothing",
  description: "Browse our complete collection of premium T-shirts. Classic, essential, premium, casual, modern, and signature tees designed for comfort and style."
}

export default function ProductsPage() {
  return <ProductsClient />
}
