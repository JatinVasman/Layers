import { notFound } from "next/navigation"

const posts = {
  "new-drops-september": {
    title: "New Drops: September",
    body: "Introducing our latest heavyweight tees and cozy hoodies. Stay tuned for more.",
  },
  "style-tips-layering": {
    title: "Style Tips: Layering",
    body: "Layering essentials keeps you comfortable and stylish across temps and occasions.",
  },
} as const

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts[params.slug as keyof typeof posts]
  if (!post) return notFound()
  return (
    <main className="w-full px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold">{post.title}</h1>
      <div className="prose prose-neutral mt-6">
        <p>{post.body}</p>
      </div>
    </main>
  )
}
