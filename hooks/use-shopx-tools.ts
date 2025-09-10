"use client"

import { useEffect, useState, useCallback } from "react"
import { initializeShopXtools } from "@/lib/shopx-tools"

interface ShopXCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    totalAmount: {
      amount: string
      currencyCode: string
    }
    subtotalAmount: {
      amount: string
      currencyCode: string
    }
    totalTaxAmount: {
      amount: string
      currencyCode: string
    }
    totalDutyAmount: {
      amount: string
      currencyCode: string
    }
  }
  buyerIdentity: {
    countryCode: string
    customer?: {
      id: string
      email: string
      firstName: string
      lastName: string
      displayName: string
    }
    email?: string
    phone?: string
  }
  lines: {
    edges: Array<{
      node: {
        id: string
        quantity: number
        cost: {
          totalAmount: {
            amount: string
            currencyCode: string
          }
        }
        merchandise: {
          id: string
          title: string
          availableForSale: boolean
          quantityAvailable: number
          price: {
            amount: string
            currencyCode: string
          }
          compareAtPrice?: {
            amount: string
            currencyCode: string
          }
          product: {
            id: string
            handle: string
            title: string
            vendor: string
            productType: string
            tags: string[]
            images: {
              edges: Array<{
                node: {
                  url: string
                  altText: string
                  width: number
                  height: number
                }
              }>
            }
          }
          selectedOptions: Array<{
            name: string
            value: string
          }>
        }
        sellingPlanAllocation?: {
          sellingPlan: {
            id: string
            name: string
            description: string
            recurringDeliveries: boolean
            priceAdjustments: Array<{
              orderCount: number
              adjustmentValue: {
                __typename: string
                adjustmentPercentage?: number
                adjustmentAmount?: {
                  amount: string
                  currencyCode: string
                }
                price?: {
                  amount: string
                  currencyCode: string
                }
              }
            }>
          }
        }
      }
    }>
  }
  attributes: Array<{
    key: string
    value: string
  }>
  discountCodes: Array<{
    code: string
    applicable: boolean
  }>
}

interface CurrencySettings {
  defaultCountry: string
  defaultCountryCode: string
  defaultCurrency: string
  defaultCurrencySymbol: string
}

export function useShopXTools() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [cart, setCart] = useState<ShopXCart | null>(null)
  const [products, setProducts] = useState<any[]>([])
  const [currencySettings, setCurrencySettings] = useState<CurrencySettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize shopXtools
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      initializeShopXtools()
      setIsInitialized(true)
      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize shopXtools')
      setLoading(false)
    }
  }, [])

  // Listen for cart updates
  useEffect(() => {
    if (!isInitialized) return

    const handleCartUpdate = () => {
      const cartData = localStorage.getItem("shopXtools.cart")
      if (cartData) {
        try {
          const parsedCart = JSON.parse(cartData)
          setCart(parsedCart)
        } catch (err) {
          console.error("Error parsing cart data:", err)
        }
      }
    }

    // Load initial cart data
    handleCartUpdate()

    // Listen for cart updates
    const cartEvent = new CustomEvent('cart__updated')
    document.addEventListener('cart__updated', handleCartUpdate)
    document.addEventListener('cart__created', handleCartUpdate)
    document.addEventListener('cart__lines-added', handleCartUpdate)
    document.addEventListener('cart__lines-removed', handleCartUpdate)
    document.addEventListener('cart__lines-updated', handleCartUpdate)

    return () => {
      document.removeEventListener('cart__updated', handleCartUpdate)
      document.removeEventListener('cart__created', handleCartUpdate)
      document.removeEventListener('cart__lines-added', handleCartUpdate)
      document.removeEventListener('cart__lines-removed', handleCartUpdate)
      document.removeEventListener('cart__lines-updated', handleCartUpdate)
    }
  }, [isInitialized])

  // Listen for currency updates
  useEffect(() => {
    if (!isInitialized) return

    const handleCurrencyUpdate = (event: CustomEvent) => {
      const { current } = event.detail
      setCurrencySettings(current)
    }

    // Load initial currency settings
    const storedCurrency = localStorage.getItem("selectedCurrency")
    const storedCountry = localStorage.getItem("selectedCountry")
    const storedCountryCode = localStorage.getItem("selectedCountryCode")
    const storedCurrencySymbol = localStorage.getItem("selectedCurrencySymbol")

    if (storedCurrency && storedCountry && storedCountryCode && storedCurrencySymbol) {
      setCurrencySettings({
        defaultCurrency: storedCurrency,
        defaultCountry: storedCountry,
        defaultCountryCode: storedCountryCode,
        defaultCurrencySymbol: storedCurrencySymbol
      })
    }

    // Listen for currency updates
    document.addEventListener('currency__settings-updated', handleCurrencyUpdate as EventListener)

    return () => {
      document.removeEventListener('currency__settings-updated', handleCurrencyUpdate as EventListener)
    }
  }, [isInitialized])

  // Listen for products updates
  useEffect(() => {
    if (!isInitialized) return

    const handleProductsUpdate = () => {
      if (window.shopXtools?.products) {
        setProducts(window.shopXtools.products)
      }
    }

    // Load initial products
    handleProductsUpdate()

    // Listen for products updates
    document.addEventListener('data__products-ready', handleProductsUpdate)

    return () => {
      document.removeEventListener('data__products-ready', handleProductsUpdate)
    }
  }, [isInitialized])

  // Cart operations
  const addToCart = useCallback(async (variantId: string, quantity: number = 1) => {
    if (!isInitialized || !window.shopXtools) return null

    const mutation = `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            totalQuantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
            }
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        id
                        handle
                        title
                      }
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `

    const variables = {
      cartId: cart?.id || "gid://shopify/Cart/new",
      lines: [{
        merchandiseId: variantId,
        quantity: quantity
      }]
    }

    const result = await window.shopXtools.handleCartMutation(mutation, variables)
    
    if (result?.cartLinesAdd?.cart) {
      // Dispatch cart update event
      window.shopXtools.dispatchEvent('cart__lines-added', result.cartLinesAdd.cart)
      return result.cartLinesAdd.cart
    }

    return null
  }, [isInitialized, cart?.id])

  const removeFromCart = useCallback(async (lineId: string) => {
    if (!isInitialized || !window.shopXtools || !cart?.id) return null

    const mutation = `
      mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            id
            checkoutUrl
            totalQuantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
            }
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        id
                        handle
                        title
                      }
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `

    const variables = {
      cartId: cart.id,
      lineIds: [lineId]
    }

    const result = await window.shopXtools.handleCartMutation(mutation, variables)
    
    if (result?.cartLinesRemove?.cart) {
      // Dispatch cart update event
      window.shopXtools.dispatchEvent('cart__lines-removed', result.cartLinesRemove.cart)
      return result.cartLinesRemove.cart
    }

    return null
  }, [isInitialized, cart?.id])

  const updateCartLine = useCallback(async (lineId: string, quantity: number) => {
    if (!isInitialized || !window.shopXtools || !cart?.id) return null

    const mutation = `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
            totalQuantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
            }
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      product {
                        id
                        handle
                        title
                      }
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `

    const variables = {
      cartId: cart.id,
      lines: [{
        id: lineId,
        quantity: quantity
      }]
    }

    const result = await window.shopXtools.handleCartMutation(mutation, variables)
    
    if (result?.cartLinesUpdate?.cart) {
      // Dispatch cart update event
      window.shopXtools.dispatchEvent('cart__lines-updated', result.cartLinesUpdate.cart)
      return result.cartLinesUpdate.cart
    }

    return null
  }, [isInitialized, cart?.id])

  const updateBuyerIdentity = useCallback(async (countryCode: string) => {
    if (!isInitialized || !window.shopXtools || !cart?.id) return null

    const mutation = `
      mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
        cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
          cart {
            id
            buyerIdentity {
              countryCode
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `

    const variables = {
      cartId: cart.id,
      buyerIdentity: {
        countryCode: countryCode
      }
    }

    const result = await window.shopXtools.handleCartMutation(mutation, variables)
    
    if (result?.cartBuyerIdentityUpdate?.cart) {
      // Dispatch cart update event
      window.shopXtools.dispatchEvent('cart__buyer-identity-updated', result.cartBuyerIdentityUpdate.cart)
      return result.cartBuyerIdentityUpdate.cart
    }

    return null
  }, [isInitialized, cart?.id])

  const getProduct = useCallback((id: string) => {
    if (!isInitialized || !window.shopXtools) return null
    return window.shopXtools.getProducts(id)
  }, [isInitialized])

  const getProductsForCountry = useCallback((countryCode: string) => {
    if (!isInitialized || !window.shopXtools) return []
    return window.shopXtools.getProductsForCountry(countryCode)
  }, [isInitialized])

  return {
    isInitialized,
    cart,
    products,
    currencySettings,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateCartLine,
    updateBuyerIdentity,
    getProduct,
    getProductsForCountry
  }
}

