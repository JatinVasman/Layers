import type React from "react"
import type { Metadata } from "next"
import { CalderHeader } from "@/components/calder-header"
import { SiteFooter } from "@/components/site-footer"
import { CartProvider } from "@/components/cart-provider"
import { WishlistProvider } from "@/components/wishlist-provider"
import { CartSummary } from "@/components/cart-summary"
import { Suspense } from "react"
import "../globals.css"
import "../../styles/calder-styles.css"

export const metadata: Metadata = {
  title: "Calder Co. — A minimalist and clean e-commerce template",
  description: "A minimalist and clean e-commerce template built with Framer and integrated with Shopify. Designed to be effortless, modern, and free to use — perfect for managing and growing your online store with ease.",
  keywords: ["e-commerce", "template", "minimalist", "clean", "framer", "shopify", "modern", "design"],
  authors: [{ name: "Calder Co." }],
  creator: "Calder Co.",
  publisher: "Calder Co.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://calder-co-demo.myshopify.com'),
  alternates: {
    canonical: '/calder',
  },
  openGraph: {
    title: "Calder Co. — A minimalist and clean e-commerce template",
    description: "A minimalist and clean e-commerce template built with Framer and integrated with Shopify. Designed to be effortless, modern, and free to use — perfect for managing and growing your online store with ease.",
    url: 'https://calder-co-demo.myshopify.com',
    siteName: 'Calder Co.',
    images: [
      {
        url: 'https://framerusercontent.com/images/esQ26x7I9K3tYks76jErcEeHdnU.jpg',
        width: 1200,
        height: 630,
        alt: 'Calder Co. Hero Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Calder Co. — A minimalist and clean e-commerce template",
    description: "A minimalist and clean e-commerce template built with Framer and integrated with Shopify. Designed to be effortless, modern, and free to use — perfect for managing and growing your online store with ease.",
    images: ['https://framerusercontent.com/images/esQ26x7I9K3tYks76jErcEeHdnU.jpg'],
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
}

export default function CalderLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="https://framerusercontent.com/images/A3til4jF9JvDEXClswFFnt7C7u0.jpg" sizes="32x32" />
        <link rel="apple-touch-icon" href="https://framerusercontent.com/images/A3til4jF9JvDEXClswFFnt7C7u0.jpg" sizes="180x180" />
        
        {/* Google Fonts */}
        <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Geist:wght@300;400;600&family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="calder-font-manrope">
        <CartProvider>
          <WishlistProvider>
            <Suspense fallback={null}>
              <CalderHeader />
              {children}
              <SiteFooter />
              <CartSummary />
            </Suspense>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}

