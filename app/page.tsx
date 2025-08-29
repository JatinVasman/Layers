import AnimatedHero from "@/components/animated-hero"
import StyleItYourWay from "@/components/style-it-your-way"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Section } from "@/components/section"
import { CategoryGrid } from "@/components/category-grid"
import { ProductGrid } from "@/components/product-grid"
import { FeaturesBar } from "@/components/features-bar"
import { NewsGrid } from "@/components/news-grid"

export default function HomePage() {
  return (
    <>
      <AnimatedHero />

      <Section
        title="Everyday Essentials"
        subtitle="From morning coffee runs to late-night hangs — essentials built to move with you."
      >
        <ScrollReveal>
          <CategoryGrid />
        </ScrollReveal>
      </Section>

      <StyleItYourWay />

      <Section
        title="Proven Favorites"
        subtitle="Simple doesn’t mean ordinary. Our essentials redefine everyday luxury"
      >
        <ScrollReveal>
          <ProductGrid limit={6} />
        </ScrollReveal>
      </Section>

      <Section>
        <FeaturesBar />
      </Section>

      <Section title="What's New">
        <ScrollReveal>
          <NewsGrid limit={3} />
        </ScrollReveal>
      </Section>
    </>
  )
}
