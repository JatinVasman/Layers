import Link from "next/link"
import { Section } from "@/components/section"
import { NewsGrid } from "@/components/news-grid"

export const metadata = { title: "News — Layers Clothing" }

export default function NewsIndex() {
  return (
    <>
      <Section title="News" subtitle="Explore our latest drops and stories.">
        <NewsGrid />
      </Section>
      <Section>
        <div className="text-center text-xs text-muted-foreground">
          Looking for product updates?{" "}
          <Link href="/collection/t-shirts" className="underline">
            Browse the collection
          </Link>
          .
        </div>
      </Section>
    </>
  )
}
