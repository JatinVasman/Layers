import { notFound } from "next/navigation"
import { categories } from "@/lib/data"
import { products } from "@/lib/products"
import { Section } from "@/components/section"
import { CollectionClient } from "./collection-client"

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = categories.find((x) => x.slug === slug)
  if (!c) return notFound()

  // Map collection slugs to product categories
  const categoryMap: { [key: string]: string } = {
    "t-shirts": "t-shirts",
    "hoodies": "hoodies", 
    "sweatshirts": "sweatshirts",
    "cropped-tees": "cropped-tees",
    "bottoms": "bottoms",
    "outerwear": "outerwear",
    "accessories": "accessories"
  }

  const initialProducts = products.filter((p) => p.category === categoryMap[slug])

  return (
    <>
      <div className="relative h-[36vh] w-full overflow-hidden">
        <img src={c.image || "/placeholder.svg"} alt={c.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <h1 className="absolute bottom-6 left-6 text-3xl font-semibold md:text-4xl">{c.title}</h1>
      </div>
      
      <Section title={c.title} subtitle={c.description}>
        <CollectionClient initialProducts={initialProducts} />
      </Section>
    </>
  )
}
