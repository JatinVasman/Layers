import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shopping Cart — Layers Clothing",
  description: "Review your selected items and place your order via WhatsApp.",
}

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
