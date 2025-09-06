import { Section } from "@/components/section"

export const metadata = { 
  title: "Shipping Information — Layers Clothing",
  description: "Learn about our shipping options and delivery times for Layers Clothing orders."
}

export default function ShippingPage() {
  return (
    <Section title="Shipping Information" subtitle="Delivery options and timelines">
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <p className="text-sm text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <h2>Domestic Shipping</h2>
        <p>
          We ship to all 50 US states and Washington DC. Domestic orders typically 
          arrive within 5-7 business days.
        </p>

        <h3>Shipping Options</h3>
        <ul>
          <li><strong>Standard Shipping (5-7 business days):</strong> Free on orders over $50</li>
          <li><strong>Express Shipping (2-3 business days):</strong> $15</li>
          <li><strong>Overnight Shipping (1 business day):</strong> $25</li>
        </ul>

        <h2>International Shipping</h2>
        <p>
          We ship to select international destinations. International orders typically 
          arrive within 10-15 business days, depending on the destination.
        </p>

        <h3>International Shipping Rates</h3>
        <ul>
          <li><strong>Canada:</strong> $15 (7-10 business days)</li>
          <li><strong>Europe:</strong> $20 (10-15 business days)</li>
          <li><strong>Australia:</strong> $25 (12-15 business days)</li>
          <li><strong>Other Countries:</strong> $30 (10-15 business days)</li>
        </ul>

        <h2>Processing Time</h2>
        <p>
          All orders are processed within 1-2 business days. Orders placed on weekends 
          or holidays will be processed on the next business day.
        </p>

        <h2>Order Tracking</h2>
        <p>
          Once your order ships, you'll receive a tracking number via email. You can 
          track your package using the provided tracking number on the carrier's website.
        </p>

        <h2>Shipping Restrictions</h2>
        <p>
          Some items may have shipping restrictions due to size, weight, or destination. 
          We'll notify you if any restrictions apply to your order.
        </p>

        <h2>Delivery Issues</h2>
        <p>
          If you experience any delivery issues, please contact us immediately. We'll 
          work with the shipping carrier to resolve the problem as quickly as possible.
        </p>

        <h2>Holiday Shipping</h2>
        <p>
          During peak holiday seasons, processing and delivery times may be extended. 
          We'll provide updated timelines during these periods.
        </p>

        <h2>Questions?</h2>
        <p>
          If you have any questions about shipping, please contact us at 
          <a href="mailto:layersclothing25@gmail.com" className="text-primary hover:underline">
            layersclothing25@gmail.com
          </a>
        </p>
      </div>
    </Section>
  )
}