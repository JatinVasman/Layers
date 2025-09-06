"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, Heart, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWishlistContext } from "@/components/wishlist-provider"
import { useCartContext } from "@/components/cart-provider"

const NAV = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export function SiteHeader() {
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
        backgroundColor: scrolled ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0)",
      }}
      className={cn(
        "sticky top-0 z-40 w-full backdrop-blur transition-colors",
        scrolled ? "border-b border-border" : "border-b-0",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 md:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Layers Clothing Home">
          <motion.img
            src="/images/layers-logo.png"
            alt="Layers Clothing Logo"
            className="h-12 w-auto md:h-16"
            animate={{ scale: scrolled ? 0.94 : 1 }}
            transition={{ type: "tween", duration: 0.2 }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href)
            return (
              <div key={item.href} className="relative">
                <Link className="opacity-80 transition hover:opacity-100" href={item.href}>
                  {item.label}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 h-0.5 w-full rounded bg-[var(--primary)]"
                  />
                )}
              </div>
            )
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="flex items-center gap-4">
          <Link aria-label="Wishlist" href="/wishlist" className="relative opacity-80 transition hover:opacity-100">
            <Heart className="h-5 w-5" />
            {isMounted && wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link aria-label="Cart" href="/cart" className="relative opacity-80 transition hover:opacity-100">
            <ShoppingCart className="h-5 w-5" />
            {isMounted && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
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
          className="md:hidden border-t bg-background/95 backdrop-blur"
        >
          <nav className="px-4 py-4 space-y-2">
            {NAV.map((item) => {
                const active = pathname === item.href || pathname?.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-3 py-2 text-sm rounded-md transition ${
                      active 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "text-foreground/80 hover:text-foreground hover:bg-muted"
                    }`}
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
