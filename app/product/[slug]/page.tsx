import { notFound } from "next/navigation"
import { products } from "@/lib/data"
import { Section } from "@/components/section"

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = products.find((x) => x.slug === params.slug)
  if (!p) return notFound()

  return (
    <Section>
      <div className="grid gap-10 md:grid-cols-2">
        <img src={p.image || "/placeholder.svg"} alt={p.name} className="aspect-[4/5] w-full rounded-md object-cover" />
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">{p.name}</h1>
          <div className="text-xs uppercase tracking-wide text-muted-foreground">{p.category}</div>
          <div className="text-lg">${p.price.toFixed(2)}</div>
          <p className="text-sm text-muted-foreground">
            Crafted for comfort and style with updated proportions. Pairs effortlessly across the collection.
          </p>
          <button className="inline-flex items-center justify-center rounded-md bg-foreground px-4 py-2 text-background transition hover:opacity-90">
            Add to cart
          </button>
        </div>
      </div>
    </Section>
  )
}
