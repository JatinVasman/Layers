import { notFound } from "next/navigation"
import { products } from "@/lib/products"
import { Section } from "@/components/section"
import { ProductClient } from "./product-client"

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = products.find((x) => x.slug === params.slug)
  if (!p) return notFound()

  return <ProductClient product={p} />
}
