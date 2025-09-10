import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import "../styles/calder-styles.css"
import { Suspense } from "react"

// New imports
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { RouteTransition } from "@/components/route-transition"
import { CartProvider } from "@/components/cart-provider"
import { WishlistProvider } from "@/components/wishlist-provider"
import { CartSummary } from "@/components/cart-summary"

export const metadata: Metadata = {
  title: "Layers — Timeless Wardrobe. Everyday Power.",
  description: "From morning coffee runs to late-night hangs essentials built to move with you. Timeless wardrobe, everyday power.",
  keywords: ["clothing", "fashion", "essentials", "t-shirts", "hoodies", "sweatshirts", "youth fashion", "everyday wear", "timeless", "wardrobe"],
  authors: [{ name: "Layers" }],
  creator: "Layers",
  publisher: "Layers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://layersclothing.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Layers — Timeless Wardrobe. Everyday Power.",
    description: "From morning coffee runs to late-night hangs essentials built to move with you. Timeless wardrobe, everyday power.",
    url: 'https://layersclothing.com',
    siteName: 'Layers',
    images: [
      {
        url: '/images/hero-image.JPG',
        width: 1200,
        height: 630,
        alt: 'Layers Hero Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Layers — Timeless Wardrobe. Everyday Power.",
    description: "From morning coffee runs to late-night hangs essentials built to move with you. Timeless wardrobe, everyday power.",
    images: ['/images/hero-image.JPG'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#F22233" />
        <link rel="icon" href="/images/layers-logo.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/images/layers-logo.png" sizes="180x180" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <CartProvider>
          <WishlistProvider>
            <Suspense fallback={null}>
              <SiteHeader />
              <RouteTransition>{children}</RouteTransition>
              <SiteFooter />
              <CartSummary />
            </Suspense>
          </WishlistProvider>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
