"use client"

import { Section } from "@/components/section"
import { useCartContext } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { AnimatedOrderButton } from "@/components/animated-order-button"
import Link from "next/link"
import { useState } from "react"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCartContext()
  const [isOrdering, setIsOrdering] = useState(false)

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return
    
    let message = `🛍️ *NEW ORDER - Layers Clothing*\n\n`
    message += `📅 Date: ${new Date().toLocaleDateString()}\n`
    message += `⏰ Time: ${new Date().toLocaleTimeString()}\n\n`
    message += `📋 *ORDER DETAILS:*\n`
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`
    
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`
      message += `   💰 Unit Price: ₹${item.price.toLocaleString('en-IN')}\n`
      message += `   📦 Quantity: ${item.quantity}\n`
      if (item.size) message += `   📏 Size: ${item.size}\n`
      if (item.color) message += `   🎨 Color: ${item.color}\n`
      message += `   💵 Subtotal: ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n\n`
    })
    
    message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
    message += `💰 *TOTAL ORDER VALUE: ₹${getTotalPrice().toLocaleString('en-IN')}*\n`
    message += `📦 *Total Items: ${cart.length}*\n\n`
    message += `📝 *CUSTOMER INFORMATION:*\n`
    message += `Please provide:\n`
    message += `• Full Name\n`
    message += `• Shipping Address\n`
    message += `• Phone Number\n`
    message += `• Preferred Delivery Date\n\n`
    message += `Thank you for choosing Layers Clothing! 🙏`

    const whatsappUrl = `https://wa.me/919581959448?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  if (cart.length === 0) {
    return (
      <Section title="Your Cart" subtitle="Items you've added to your cart">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground mb-6">
            Add some items to your cart to get started.
          </p>
          <Link href="/products">
            <Button>
              <ShoppingBag className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </Section>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
          <p className="text-muted-foreground mt-2">
            {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={`${item.slug}-${item.size}-${item.color}`} className="flex items-center gap-4 p-6 bg-card rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {item.size && <div>Size: {item.size}</div>}
                      {item.color && <div>Color: {item.color}</div>}
                    </div>
                    <div className="text-lg font-semibold text-primary mt-2">
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.slug, item.quantity - 1, item.size, item.color)}
                      className="h-10 w-10"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.slug, item.quantity + 1, item.size, item.color)}
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Subtotal & Remove */}
                  <div className="text-right space-y-2">
                    <div className="text-lg font-bold">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.slug, item.size, item.color)}
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-card p-6 rounded-xl border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{getTotalPrice().toLocaleString('en-IN')}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold">Total</span>
                      <span className="text-xl font-bold text-primary">
                        ₹{getTotalPrice().toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground text-center mt-3 pt-3 border-t">
                    *Shipping charges to be added
                  </div>
                  <div className="text-sm text-green-600 text-center mt-2 font-medium">
                    🚚 Free shipping on orders over ₹1,500
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <AnimatedOrderButton
                    onOrder={handleWhatsAppOrder}
                    className="w-full"
                  />
                  
                  <Link href="/products" className="block">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                  
                  <Button
                    variant="ghost"
                    onClick={clearCart}
                    className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}