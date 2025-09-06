import AnimatedHero from "@/components/animated-hero"
import StyleItYourWay from "@/components/style-it-your-way"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Section } from "@/components/section"
import { CategoryGrid } from "@/components/category-grid"
import { ProductGrid } from "@/components/product-grid"
import { FeaturesBar } from "@/components/features-bar"
import { HeroBanner } from "@/components/hero-banner"
import { FeaturedProducts } from "@/components/featured-products"
import { BrandShowcase } from "@/components/brand-showcase"

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Parallax */}
      <AnimatedHero />

      {/* Brand Introduction Banner */}
      <HeroBanner />

      {/* Category Navigation */}
      <Section
        title="Shop by Category"
        subtitle="Discover our curated collections of everyday essentials. From morning coffee runs to late-night hangs — essentials built to move with you."
      >
        <ScrollReveal>
          <CategoryGrid />
        </ScrollReveal>
      </Section>

      {/* Style It Your Way Gallery */}
      <StyleItYourWay />

      {/* Featured Products */}
      <Section
        title="Featured Products"
        subtitle="Simple doesn't mean ordinary. Our essentials redefine everyday luxury with sustainable practices and high-quality fabrics."
      >
        <ScrollReveal>
          <FeaturedProducts />
        </ScrollReveal>
      </Section>

      {/* Brand Values & Features */}
      <Section>
        <FeaturesBar />
      </Section>

      {/* Brand Showcase */}
      <BrandShowcase />
    </>
  )
}
