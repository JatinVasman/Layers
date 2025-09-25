import { Section } from "@/components/section"

export const metadata = { 
  title: "Size Guide — Layers Clothing",
  description: "Find your perfect fit with our comprehensive size guide. Measurements and sizing tips for all Layers Clothing products."
}

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Size Guide</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Find your perfect fit with our comprehensive size guide. All measurements are in inches.
          </p>
        </div>

        <Section title="How to Measure" subtitle="Get accurate measurements for the best fit">
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">📏</span>
              </div>
              <h3 className="text-xl font-semibold">Chest</h3>
              <p className="text-muted-foreground">
                Measure around the fullest part of your chest, keeping the tape measure horizontal and snug but not tight.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">📐</span>
              </div>
              <h3 className="text-xl font-semibold">Length</h3>
              <p className="text-muted-foreground">
                Measure from the highest point of the shoulder to the bottom hem of the garment.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">👕</span>
              </div>
              <h3 className="text-xl font-semibold">Sleeve</h3>
              <p className="text-muted-foreground">
                Measure from the shoulder seam to the end of the sleeve for long sleeves.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Size Chart" subtitle="Find your perfect size">
          <div className="overflow-x-auto">
            <div className="bg-muted/30 p-6 rounded-lg mb-6 text-center">
              <h3 className="text-lg font-semibold mb-2">210,240 GSM OVERSIZED FIT</h3>
              <p className="text-muted-foreground">Premium cotton with oversized fit for maximum comfort</p>
            </div>
            
            <table className="w-full border-collapse border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-6 py-4 text-left font-semibold">Size</th>
                  <th className="border border-border px-6 py-4 text-left font-semibold">Chest (in)</th>
                  <th className="border border-border px-6 py-4 text-left font-semibold">Length (in)</th>
                  <th className="border border-border px-6 py-4 text-left font-semibold">Shoulder (in)</th>
                  <th className="border border-border px-6 py-4 text-left font-semibold">Sleeve Length (in)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-muted/50">
                  <td className="border border-border px-6 py-4 font-medium">S</td>
                  <td className="border border-border px-6 py-4">42</td>
                  <td className="border border-border px-6 py-4">27.5</td>
                  <td className="border border-border px-6 py-4">20</td>
                  <td className="border border-border px-6 py-4">8.5</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="border border-border px-6 py-4 font-medium">M</td>
                  <td className="border border-border px-6 py-4">44</td>
                  <td className="border border-border px-6 py-4">28</td>
                  <td className="border border-border px-6 py-4">21</td>
                  <td className="border border-border px-6 py-4">9</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="border border-border px-6 py-4 font-medium">L</td>
                  <td className="border border-border px-6 py-4">46</td>
                  <td className="border border-border px-6 py-4">28.5</td>
                  <td className="border border-border px-6 py-4">22</td>
                  <td className="border border-border px-6 py-4">9.5</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="border border-border px-6 py-4 font-medium">XL</td>
                  <td className="border border-border px-6 py-4">48</td>
                  <td className="border border-border px-6 py-4">29</td>
                  <td className="border border-border px-6 py-4">23</td>
                  <td className="border border-border px-6 py-4">10</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="border border-border px-6 py-4 font-medium">XXL</td>
                  <td className="border border-border px-6 py-4">50</td>
                  <td className="border border-border px-6 py-4">29.5</td>
                  <td className="border border-border px-6 py-4">24</td>
                  <td className="border border-border px-6 py-4">10.5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Fit Guide" subtitle="Understanding our sizing">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Relaxed Fit</h3>
              <p className="text-muted-foreground">
                Our relaxed fit provides extra room for comfort and movement. Perfect for layering and casual wear.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Extra room in chest and body</li>
                <li>• Longer length for layering</li>
                <li>• Comfortable for all-day wear</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Sizing Tips</h3>
              <p className="text-muted-foreground">
                If you're between sizes, we recommend sizing up for a more relaxed fit or sizing down for a more fitted look.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Measure over thin clothing</li>
                <li>• Keep tape measure parallel to floor</li>
                <li>• Don't pull tape too tight</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section title="Need Help?" subtitle="We're here to assist">
          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground">
              Still unsure about your size? We're happy to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919581959448"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Chat on WhatsApp
              </a>
              <a
                href="mailto:layersclothing25@gmail.com"
                className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                Send Email
              </a>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}
