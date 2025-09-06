import { Section } from "@/components/section"

export const metadata = { 
  title: "Returns & Refunds — Layers Clothing",
  description: "Learn about our return and refund policy for Layers Clothing products."
}

export default function ReturnsPage() {
  return (
    <Section title="Returns & Refunds" subtitle="Our return policy">
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <p className="text-sm text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <h2>Return Policy</h2>
        <p>
          We want you to love your Layers Clothing items. If you're not completely satisfied, 
          you can return unworn items within 14 days of delivery for a full refund or exchange.
        </p>

        <h2>Return Conditions</h2>
        <p>To be eligible for a return, items must be:</p>
        <ul>
          <li>Unworn and in original condition</li>
          <li>In original packaging with tags attached</li>
          <li>Returned within 14 days of delivery</li>
          <li>Not damaged or altered in any way</li>
        </ul>

        <h2>How to Return</h2>
        <ol>
          <li>Contact our customer service team at <a href="mailto:layersclothing25@gmail.com" className="text-primary hover:underline">layersclothing25@gmail.com</a></li>
          <li>Include your order number and reason for return</li>
          <li>We'll provide you with a return shipping label</li>
          <li>Package your items securely and ship them back</li>
          <li>Once received, we'll process your refund within 3-5 business days</li>
        </ol>

        <h2>Refunds</h2>
        <p>
          Refunds will be processed to the original payment method within 3-5 business days 
          after we receive your returned items. Shipping costs are non-refundable unless 
          the return is due to our error.
        </p>

        <h2>Exchanges</h2>
        <p>
          We're happy to exchange items for a different size or color, subject to availability. 
          If the new item costs more, you'll pay the difference. If it costs less, we'll refund the difference.
        </p>

        <h2>Final Sale Items</h2>
        <p>
          Items marked as "Final Sale" cannot be returned or exchanged. This includes 
          clearance items and personalized products.
        </p>

        <h2>Damaged or Defective Items</h2>
        <p>
          If you receive a damaged or defective item, please contact us immediately. 
          We'll arrange for a replacement or full refund at no cost to you.
        </p>

        <h2>International Returns</h2>
        <p>
          International customers are responsible for return shipping costs. We recommend 
          using a trackable shipping method as we cannot be responsible for lost return packages.
        </p>

        <h2>Questions?</h2>
        <p>
          If you have any questions about our return policy, please contact us at 
          <a href="mailto:layersclothing25@gmail.com" className="text-primary hover:underline">
            layersclothing25@gmail.com
          </a>
        </p>
      </div>
    </Section>
  )
}