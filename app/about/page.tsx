import { Section } from "@/components/section"
import { BRAND } from "@/lib/brand"
import Image from "next/image"

export const metadata = { 
  title: "About — Layers Clothing",
  description: "Learn about Layers Clothing - a fresh, youth-driven apparel brand bringing everyday essentials with a modern twist."
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <Image
          src="/images/home/img-2016.jpg"
          alt="About Layers Clothing - Studio portrait"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl mb-4">
            About Layers
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {BRAND.tagline}
          </p>
        </div>
      </div>

      <div className="space-y-16 py-16">
        {/* Brand Introduction */}
        <Section title="Who We Are" subtitle="A fresh perspective on everyday essentials">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-xl leading-relaxed mb-6">
                {BRAND.description}
              </p>
              <p className="text-lg leading-relaxed">
                {BRAND.founded} Our goal is to blend minimalism, comfort, and style into clothing that feels timeless. 
                We believe in sustainable practices, high-quality fabrics, and customer-first experiences.
              </p>
            </div>
          </div>
        </Section>

        {/* Mission & Vision */}
        <Section title="Our Mission" subtitle="What drives us forward">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-xl leading-relaxed">
                {BRAND.mission}
              </p>
            </div>
          </div>
        </Section>

        {/* Values Grid */}
        <Section title="Our Values" subtitle="The principles that guide everything we do">
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            <div className="text-center space-y-4 p-6 bg-card rounded-xl border shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold">Quality First</h3>
              <p className="text-muted-foreground">
                We use only the finest materials and construction techniques to ensure our clothing lasts through every wash and wear.
              </p>
            </div>
            <div className="text-center space-y-4 p-6 bg-card rounded-xl border shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold">Sustainable Practices</h3>
              <p className="text-muted-foreground">
                Committed to responsible sourcing and minimizing our environmental impact at every step of production.
              </p>
            </div>
            <div className="text-center space-y-4 p-6 bg-card rounded-xl border shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold">Customer-Centric</h3>
              <p className="text-muted-foreground">
                Every decision we make puts our customers' comfort, satisfaction, and style needs first.
              </p>
            </div>
          </div>
        </Section>

        {/* Our Story */}
        <Section title="Our Story" subtitle="From idea to reality">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-lg leading-relaxed mb-6">
                Layers Clothing was born from a simple observation: the best clothing is the kind you reach for every day. 
                We noticed that the most-loved pieces in any wardrobe are the essentials - the tees, hoodies, and sweatshirts 
                that work for any occasion.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                We set out to create a collection that celebrates these everyday heroes, but with a modern twist. 
                Our designs blend classic silhouettes with contemporary details, creating pieces that feel both familiar and fresh.
              </p>
              <p className="text-lg leading-relaxed">
                Today, we're proud to be a youth-driven brand that understands the importance of comfort, style, and versatility. 
                Whether you're grabbing coffee, heading to class, or hanging out with friends, our essentials are designed to move with you.
              </p>
            </div>
          </div>
        </Section>

        {/* Team Section */}
        <Section title="Meet the Team" subtitle="The people behind Layers">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6">
              <p className="text-lg text-muted-foreground">
                We're a small but passionate team of designers, makers, and dreamers who believe in the power of great basics.
              </p>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="w-32 h-32 bg-muted rounded-full mx-auto"></div>
                  <h3 className="text-xl font-semibold">Design Team</h3>
                  <p className="text-muted-foreground">
                    Our designers work tirelessly to create pieces that are both timeless and contemporary.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="w-32 h-32 bg-muted rounded-full mx-auto"></div>
                  <h3 className="text-xl font-semibold">Production Team</h3>
                  <p className="text-muted-foreground">
                    Our production partners ensure every piece meets our high standards for quality and sustainability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}
