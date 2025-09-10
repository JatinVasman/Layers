"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, Heart, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWishlistContext } from "@/components/wishlist-provider"
import { useCartContext } from "@/components/cart-provider"
import { CalderCurrencySelector } from "@/components/calder-currency-selector"

const NAV = [
  { label: "Product", href: "/products" },
  { label: "News", href: "/blog" },
  { label: "About", href: "/about" },
]

export function CalderHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const { wishlistCount } = useWishlistContext()
  const { cartCount } = useCartContext()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0)",
        mixBlendMode: scrolled ? "normal" : "difference",
      }}
      className={cn(
        "calder-header fixed top-0 left-0 right-0 z-50 w-full backdrop-blur transition-all duration-300",
        scrolled ? "border-b border-gray-200" : "border-b-0",
      )}
    >
      <div className="calder-header-container">
        <Link href="/" className="calder-logo" aria-label="Calder Co. Home">
          Calder Co.
        </Link>

        {/* Desktop Navigation */}
        <nav className="calder-nav hidden md:flex">
          <div className="calder-nav-links">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname?.startsWith(item.href)
              return (
                <div key={item.href} className="relative">
                  <Link 
                    className={cn(
                      "calder-nav-link transition-opacity duration-200",
                      active && "active",
                      !active && "opacity-70 hover:opacity-100"
                    )}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </div>
              )
            })}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="calder-mobile-menu-button md:hidden"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <div className="flex items-center gap-4">
          <CalderCurrencySelector />
          <Link 
            aria-label="Wishlist" 
            href="/wishlist" 
            className="relative text-white opacity-70 transition-opacity hover:opacity-100"
          >
            <Heart className="h-5 w-5" />
            {isMounted && wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-black text-xs">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link 
            aria-label="Cart" 
            href="/cart" 
            className="calder-cart-button"
          >
            <div className="calder-cart-icon"></div>
            {isMounted && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-black text-xs">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="calder-mobile-nav open"
        >
          <nav className="space-y-2">
            {NAV.map((item) => {
                const active = pathname === item.href || pathname?.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "calder-mobile-nav-link",
                      active && "font-medium"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}
