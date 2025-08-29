import { notFound } from "next/navigation"
import { categories, products } from "@/lib/data"
import { Section } from "@/components/section"
import { ProductGrid } from "@/components/product-grid"

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const c = categories.find((x) => x.slug === params.slug)
  if (!c) return notFound()

  const list = products.filter((p) => p.collection === c.slug)
  return (
    <>
      <div className="relative h-[36vh] w-full overflow-hidden">
        <img src={c.image || "/placeholder.svg"} alt={c.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <h1 className="absolute bottom-6 left-6 text-3xl font-semibold md:text-4xl">{c.title}</h1>
      </div>
      <Section title={c.title}>
        {list.length ? <ProductGrid /> : <p className="text-sm text-muted-foreground">No items found.</p>}
      </Section>
    </>
  )
}
