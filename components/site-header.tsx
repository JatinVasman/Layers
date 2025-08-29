"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV = [
  { label: "Product", href: "/collection/t-shirts" },
  { label: "News", href: "/news" },
  { label: "About", href: "/about" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

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
          <motion.span
            className="font-serif text-2xl font-semibold tracking-wide md:text-3xl"
            animate={{ scale: scrolled ? 0.94 : 1 }}
            transition={{ type: "tween", duration: 0.2 }}
          >
            LAYERS
          </motion.span>
        </Link>

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

        <Link aria-label="Cart" href="/cart" className="opacity-80 transition hover:opacity-100">
          <ShoppingCart className="h-5 w-5" />
        </Link>
      </div>
    </motion.header>
  )
}
