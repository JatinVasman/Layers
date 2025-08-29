import { notFound } from "next/navigation"
import { news } from "@/lib/data"
import { Section } from "@/components/section"

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }))
}

export default function NewsPost({ params }: { params: { slug: string } }) {
  const n = news.find((x) => x.slug === params.slug)
  if (!n) return notFound()
  return (
    <>
      <div className="relative h-[36vh] w-full overflow-hidden">
        <img src={n.image || "/placeholder.svg"} alt={n.title} className="h-full w-full object-cover" />
      </div>
      <Section title={n.title} subtitle={n.excerpt}>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p>{n.body}</p>
        </div>
      </Section>
    </>
  )
}
