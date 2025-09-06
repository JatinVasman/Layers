import { Section } from "@/components/section"

export const metadata = { 
  title: "Terms & Conditions — Layers Clothing",
  description: "Read our terms and conditions for using the Layers Clothing website and services."
}

export default function TermsPage() {
  return (
    <Section title="Terms & Conditions" subtitle="Our terms of service">
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <p className="text-sm text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        
        <h2>Acceptance of Terms</h2>
        <p>
          By accessing and using the Layers Clothing website, you accept and agree to be bound 
          by the terms and provision of this agreement.
        </p>

        <h2>Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials on Layers Clothing's 
          website for personal, non-commercial transitory viewing only. This is the grant of a license, 
          not a transfer of title, and under this license you may not:
        </p>
        <ul>
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose or for any public display</li>
          <li>Attempt to reverse engineer any software contained on the website</li>
          <li>Remove any copyright or other proprietary notations from the materials</li>
        </ul>

        <h2>Product Information</h2>
        <p>
          We strive to provide accurate product information, including descriptions, images, and pricing. 
          However, we cannot guarantee that all information is completely accurate, complete, or current.
        </p>

        <h2>Pricing and Payment</h2>
        <p>
          All prices are subject to change without notice. We reserve the right to modify or discontinue 
          any product or service at any time. Payment is due at the time of purchase.
        </p>

        <h2>Order Processing</h2>
        <p>
          We reserve the right to refuse or cancel any order at any time. We may limit or cancel 
          quantities purchased per person, per household, or per order.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          The content, organization, graphics, design, compilation, magnetic translation, digital 
          conversion, and other matters related to the website are protected under applicable 
          copyrights, trademarks, and other proprietary rights.
        </p>

        <h2>User Accounts</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account and password. 
          You agree to accept responsibility for all activities that occur under your account.
        </p>

        <h2>Prohibited Uses</h2>
        <p>You may not use our website:</p>
        <ul>
          <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
          <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
          <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
          <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
          <li>To submit false or misleading information</li>
        </ul>

        <h2>Limitation of Liability</h2>
        <p>
          In no event shall Layers Clothing, nor its directors, employees, partners, agents, suppliers, 
          or affiliates, be liable for any indirect, incidental, special, consequential, or punitive 
          damages, including without limitation, loss of profits, data, use, goodwill, or other 
          intangible losses, resulting from your use of the website.
        </p>

        <h2>Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of 
          the United States and you irrevocably submit to the exclusive jurisdiction of the courts 
          in that state or location.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these terms at any time. 
          If a revision is material, we will try to provide at least 30 days notice prior to any new 
          terms taking effect.
        </p>

        <h2>Contact Information</h2>
        <p>
          If you have any questions about these Terms & Conditions, please contact us at 
          <a href="mailto:layersclothing25@gmail.com" className="text-primary hover:underline">
            layersclothing25@gmail.com
          </a>
        </p>
      </div>
    </Section>
  )
}