import Link from "next/link"

const posts = [
  {
    slug: "new-drops-september",
    title: "New Drops: September",
    excerpt: "Introducing our latest heavyweight tees and cozy hoodies.",
  },
  { slug: "style-tips-layering", title: "Style Tips: Layering", excerpt: "How to layer essentials for fall." },
]

export default function BlogIndex() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold">What’s New</h1>
      <div className="mt-8 space-y-6">
        {posts.map((p) => (
          <article key={p.slug} className="border-b border-neutral-200 pb-6">
            <Link href={`/blog/${p.slug}`} className="block">
              <h2 className="text-xl font-medium">{p.title}</h2>
              <p className="mt-1 text-neutral-600">{p.excerpt}</p>
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
