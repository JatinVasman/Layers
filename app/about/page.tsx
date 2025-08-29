import { Section } from "@/components/section"

export const metadata = { title: "About — Layers Clothing" }

export default function AboutPage() {
  return (
    <Section title="About" subtitle="Essentials built for every layer of life.">
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <p>
          Layers Clothing is a fresh, youth-driven apparel brand that brings everyday essentials with a modern twist. We
          focus on comfortable, stylish, and versatile clothing like T‑shirts, hoodies, sweatshirts, and cropped tees —
          designed to move with you from casual mornings to late‑night hangouts.
        </p>
        <p>
          Founded on the idea of “essentials built for every layer of life,” we blend minimalism, comfort, and timeless
          style. We believe in sustainable practices, high‑quality fabrics, and customer‑first experiences.
        </p>
      </div>
    </Section>
  )
}
