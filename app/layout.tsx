import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

// New imports
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RouteTransition } from "@/components/route-transition"

export const metadata: Metadata = {
  // Match source site branding
  title: "Layers Clothing — Essentials for Every Layer",
  description:
    "Layers Clothing is a youth-driven apparel brand for everyday essentials — T-shirts, hoodies, sweatshirts, and cropped tees.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <SiteHeader />
          <RouteTransition>{children}</RouteTransition>
          <SiteFooter />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
