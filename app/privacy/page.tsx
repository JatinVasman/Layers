import { Section } from "@/components/section"

export const metadata = { 
  title: "Privacy Policy — Layers Clothing",
  description: "Learn how Layers Clothing collects, uses, and protects your personal information."
}

export default function PrivacyPage() {
  return (
    <Section title="Privacy Policy" subtitle="How we protect your information">
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <p className="text-sm text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <h2>Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as when you create an account, 
          make a purchase, or contact us for support. This may include:
        </p>
        <ul>
          <li>Name and contact information (email, phone number, address)</li>
          <li>Payment information (processed securely through our payment partners)</li>
          <li>Account preferences and settings</li>
          <li>Communication history with our support team</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Process and fulfill your orders</li>
          <li>Provide customer support</li>
          <li>Send you updates about your orders and our products</li>
          <li>Improve our website and services</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>Information Sharing</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personal information to third parties 
          except as described in this policy. We may share your information with:
        </p>
        <ul>
          <li>Service providers who assist us in operating our website and conducting our business</li>
          <li>Payment processors to complete transactions</li>
          <li>Shipping companies to deliver your orders</li>
          <li>Legal authorities when required by law</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal information against 
          unauthorized access, alteration, disclosure, or destruction. However, no method of 
          transmission over the internet is 100% secure.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Delete your account and personal information</li>
          <li>Opt out of marketing communications</li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at 
          <a href="mailto:layersclothing25@gmail.com" className="text-primary hover:underline">
            layersclothing25@gmail.com
          </a>
        </p>
      </div>
    </Section>
  )
}