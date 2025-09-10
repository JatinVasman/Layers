"use client"

import { useEffect, useState } from "react"

// Shopify configuration
const SHOPIFY_STOREFRONT_DOMAIN = "calder-co-demo.myshopify.com"
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = "b5a8cdefb54942ad64599843ef1b0f0c"

// Currency mapping
const CURRENCIES = {
  "AED": "د.إ", "AFN": "Af", "ALL": "L", "AMD": "֏", "ANG": "ƒ", "AOA": "Kz", "ARS": "$", "AUD": "$", "AWG": "ƒ", "AZN": "₼",
  "BAM": "KM", "BBD": "$", "BDT": "৳", "BGN": "лв", "BHD": "د.ب", "BIF": "FBu", "BMD": "$", "BND": "$", "BOB": "Bs.",
  "BRL": "R$", "BSD": "$", "BTN": "Nu.", "BWP": "P", "BYN": "Br", "BZD": "BZ$", "CAD": "$", "CDF": "FC", "CHF": "Fr",
  "CLP": "$", "CNY": "¥", "COP": "$", "CRC": "₡", "CVE": "$", "CZK": "Kč", "DJF": "Fdj", "DKK": "kr", "DOP": "RD$",
  "DZD": "د.ج", "EGP": "£", "ERN": "Nfk", "ETB": "Br", "EUR": "€", "FJD": "$", "FKP": "£", "GBP": "£", "GEL": "₾",
  "GHS": "₵", "GIP": "£", "GMD": "D", "GNF": "FG", "GTQ": "Q", "GYD": "$", "HKD": "$", "HNL": "L", "HRK": "kn",
  "HTG": "G", "HUF": "Ft", "IDR": "Rp", "ILS": "₪", "INR": "₹", "IQD": "ع.د", "IRR": "﷼", "ISK": "kr", "JEP": "£",
  "JMD": "J$", "JOD": "د.ا", "JPY": "¥", "KES": "KSh", "KGS": "сом", "KHR": "៛", "KID": "$", "KMF": "CF", "KRW": "₩",
  "KWD": "د.ك", "KYD": "$", "KZT": "₸", "LAK": "₭", "LBP": "£", "LKR": "රු", "LRD": "$", "LSL": "L", "LTL": "Lt",
  "LVL": "Ls", "LYD": "ل.د", "MAD": "د.م.", "MDL": "MDL", "MGA": "Ar", "MKD": "ден", "MMK": "Ks", "MNT": "₮",
  "MOP": "MOP$", "MRU": "UM", "MUR": "₨", "MVR": "ރ", "MWK": "MK", "MXN": "$", "MYR": "RM", "MZN": "MT", "NAD": "$",
  "NGN": "₦", "NIO": "C$", "NOK": "kr", "NPR": "रू", "NZD": "$", "OMR": "ر.ع.", "PAB": "B/.", "PEN": "S/.", "PGK": "K",
  "PHP": "₱", "PKR": "₨", "PLN": "zł", "PYG": "₲", "QAR": "ر.ق", "RON": "lei", "RSD": "Дин.", "RUB": "₽", "RWF": "FRw",
  "SAR": "ر.س", "SBD": "$", "SCR": "₨", "SDG": "ج.س.", "SEK": "kr", "SGD": "$", "SHP": "£", "SLL": "Le", "SOS": "Sh",
  "SRD": "$", "SSP": "£", "STN": "Db", "SYP": "£", "SZL": "E", "THB": "฿", "TJS": "ЅМ", "TMT": "T", "TND": "د.ت",
  "TOP": "T$", "TRY": "₺", "TTD": "TT$", "TWD": "NT$", "TZS": "TSh", "UAH": "₴", "UGX": "USh", "USD": "$", "UYU": "$",
  "UZS": "so'm", "VED": "Bs.S.", "VES": "Bs.", "VND": "₫", "VUV": "VT", "WST": "T", "XAF": "FCFA", "XCD": "$",
  "XOF": "CFA", "XPF": "₣", "XXX": "", "YER": "﷼", "ZAR": "R", "ZMW": "ZK", "BYR": "Br", "STD": "Db", "VEF": "Bs."
}

interface ShopifyProduct {
  id: string
  title: string
  handle: string
  vendor: string
  productType: string
  tags: string[]
  description?: string
  collections: {
    edges: Array<{
      node: {
        id: string
        title: string
        handle: string
      }
    }>
  }
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
  metafields: Array<{
    key: string
    namespace: string
    value: string
  }>
  sellingPlanGroups: {
    edges: Array<{
      node: {
        name: string
        options: Array<{
          name: string
          values: string[]
        }>
        sellingPlans: {
          edges: Array<{
            node: {
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
          }>
        }
      }
    }>
  }
  options: Array<{
    id: string
    name: string
    values: string[]
  }>
  compareAtPriceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  variants: {
    pageInfo: {
      hasNextPage: boolean
      hasPreviousPage: boolean
      endCursor: string
    }
    edges: Array<{
      node: {
        id: string
        image?: {
          url: string
          altText: string
          width: number
          height: number
        }
        title: string
        sku: string
        quantityAvailable: number
        availableForSale: boolean
        requiresShipping: boolean
        selectedOptions: Array<{
          name: string
          value: string
        }>
        price: {
          amount: string
          currencyCode: string
        }
        compareAtPrice?: {
          amount: string
          currencyCode: string
        }
      }
    }>
  }
}

interface ShopifyResponse {
  data: {
    products: {
      edges: Array<{
        node: ShopifyProduct
      }>
    }
  }
}

interface ShopifyCollectionResponse {
  data: {
    collection: {
      products: {
        edges: Array<{
          node: ShopifyProduct
        }>
      }
    }
  }
}

interface ShopifyCurrenciesResponse {
  data: {
    localization: {
      availableCountries: Array<{
        currency: {
          isoCode: string
          name: string
          symbol: string
        }
        isoCode: string
        name: string
      }>
    }
  }
}

// GraphQL Queries
const GET_AVAILABLE_CURRENCIES = `
  query GetAvailableCurrencies {
    localization {
      availableCountries {
        currency {
          isoCode
          name
          symbol
        }
        isoCode
        name
      }
    }
  }
`

const GET_PRODUCTS_BY_COUNTRY = `
  query GetProductsByCountry($cursor: String, $countryCode: CountryCode, $query: String) @inContext(country: $countryCode) {
    products(
      first: 250, 
      after: $cursor, 
      query: $query
    ) {
      edges {
        node {
          id
          title
          vendor
          handle
          productType
          tags
          collections(first: 250) {
            edges {
              node {
                id
                title
                handle
              }
            }
          }
          images(first: 20) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          metafields(identifiers: [
            { namespace: "custom", key: "fc_color" },
            { namespace: "custom", key: "fc_size" }
          ]) {
            key
            namespace
            value
          }
          sellingPlanGroups(first: 1) {
            edges {
              node {
                name
                options {
                  name
                  values
                }
                sellingPlans(first: 10) {
                  edges {
                    node {
                      id
                      name
                      description
                      recurringDeliveries
                      priceAdjustments {
                        orderCount
                        adjustmentValue {
                          __typename
                          ... on SellingPlanPercentagePriceAdjustment {
                            adjustmentPercentage
                          }
                          ... on SellingPlanFixedAmountPriceAdjustment {
                            adjustmentAmount {
                              amount
                              currencyCode
                            }
                          }
                          ... on SellingPlanFixedPriceAdjustment {
                            price {
                              amount
                              currencyCode
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          options {
            id
            name
            values
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 250) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              endCursor
            }
            edges {
              node {
                id
                image {
                  url
                  altText
                  width
                  height
                }
                title
                sku
                quantityAvailable
                availableForSale
                requiresShipping
                selectedOptions {
                  name
                  value
                }
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

const GET_PRODUCTS_BY_COLLECTION = `
  query GetProductsByCollection($cursor: String, $countryCode: CountryCode, $collectionHandle: String!) @inContext(country: $countryCode) {
    collection(handle: $collectionHandle) {
      products(first: 250, after: $cursor) {
        edges {
          node {
            id
            title
            vendor
            handle
            productType
            tags
            collections(first: 250) {
              edges {
                node {
                  id
                  title
                  handle
                }
              }
            }
            images(first: 20) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            metafields(identifiers: [
              { namespace: "custom", key: "fc_color" },
              { namespace: "custom", key: "fc_size" }
            ]) {
              key
              namespace
              value
            }
            sellingPlanGroups(first: 1) {
              edges {
                node {
                  name
                  options {
                    name
                    values
                  }
                  sellingPlans(first: 10) {
                    edges {
                      node {
                        id
                        name
                        description
                        recurringDeliveries
                        priceAdjustments {
                          orderCount
                          adjustmentValue {
                            __typename
                            ... on SellingPlanPercentagePriceAdjustment {
                              adjustmentPercentage
                            }
                            ... on SellingPlanFixedAmountPriceAdjustment {
                              adjustmentAmount {
                                amount
                                currencyCode
                              }
                            }
                            ... on SellingPlanFixedPriceAdjustment {
                              price {
                                amount
                                currencyCode
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            options {
              id
              name
              values
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 250) {
              pageInfo {
                hasNextPage
                hasPreviousPage
                endCursor
              }
              edges {
                node {
                  id
                  image {
                    url
                    altText
                    width
                    height
                  }
                  title
                  sku
                  quantityAvailable
                  availableForSale
                  requiresShipping
                  selectedOptions {
                    name
                    value
                  }
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`

export function useShopifyProducts(countryCode: string = 'US', query: string = '') {
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://${SHOPIFY_STOREFRONT_DOMAIN}/api/2023-10/graphql.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          },
          body: JSON.stringify({
            query: GET_PRODUCTS_BY_COUNTRY,
            variables: {
              countryCode,
              query,
              cursor: null
            }
          })
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: ShopifyResponse = await response.json()
        const products = data.data.products.edges.map(edge => edge.node)
        setProducts(products)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [countryCode, query])

  return { products, loading, error }
}

export function useShopifyProductsByCollection(collectionHandle: string, countryCode: string = 'US') {
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://${SHOPIFY_STOREFRONT_DOMAIN}/api/2023-10/graphql.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          },
          body: JSON.stringify({
            query: GET_PRODUCTS_BY_COLLECTION,
            variables: {
              collectionHandle,
              countryCode,
              cursor: null
            }
          })
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: ShopifyCollectionResponse = await response.json()
        const products = data.data.collection.products.edges.map(edge => edge.node)
        setProducts(products)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching products by collection:', err)
      } finally {
        setLoading(false)
      }
    }

    if (collectionHandle) {
      fetchProducts()
    }
  }, [collectionHandle, countryCode])

  return { products, loading, error }
}

export function useShopifyCurrencies() {
  const [currencies, setCurrencies] = useState<Array<{
    currency: {
      isoCode: string
      name: string
      symbol: string
    }
    isoCode: string
    name: string
  }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://${SHOPIFY_STOREFRONT_DOMAIN}/api/2023-10/graphql.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          },
          body: JSON.stringify({
            query: GET_AVAILABLE_CURRENCIES
          })
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: ShopifyCurrenciesResponse = await response.json()
        setCurrencies(data.data.localization.availableCountries)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching currencies:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrencies()
  }, [])

  return { currencies, loading, error }
}

// Utility functions
export function formatPrice(amount: string, currencyCode: string): string {
  const symbol = CURRENCIES[currencyCode as keyof typeof CURRENCIES] || currencyCode
  const numericAmount = parseFloat(amount)
  
  // Format based on currency
  if (['USD', 'CAD', 'AUD', 'NZD'].includes(currencyCode)) {
    return `${symbol}${numericAmount.toFixed(2)}`
  } else if (['EUR', 'GBP'].includes(currencyCode)) {
    return `${symbol}${numericAmount.toFixed(2)}`
  } else if (['JPY', 'KRW'].includes(currencyCode)) {
    return `${symbol}${Math.round(numericAmount)}`
  } else {
    return `${symbol}${numericAmount.toFixed(2)}`
  }
}

export function getProductMetafield(product: ShopifyProduct, namespace: string, key: string): string | null {
  const metafield = product.metafields.find(
    field => field.namespace === namespace && field.key === key
  )
  return metafield?.value || null
}

export function getProductColor(product: ShopifyProduct): string | null {
  return getProductMetafield(product, 'custom', 'fc_color')
}

export function getProductSize(product: ShopifyProduct): string | null {
  return getProductMetafield(product, 'custom', 'fc_size')
}

export function getProductCollections(product: ShopifyProduct): Array<{ id: string; title: string; handle: string }> {
  return product.collections.edges.map(edge => edge.node)
}

export function getProductVariants(product: ShopifyProduct) {
  return product.variants.edges.map(edge => edge.node)
}

export function getProductImages(product: ShopifyProduct) {
  return product.images.edges.map(edge => edge.node)
}

export function getProductOptions(product: ShopifyProduct) {
  return product.options
}

export function hasSellingPlans(product: ShopifyProduct): boolean {
  return product.sellingPlanGroups.edges.length > 0
}

export function getSellingPlans(product: ShopifyProduct) {
  if (product.sellingPlanGroups.edges.length === 0) return []
  
  return product.sellingPlanGroups.edges[0].node.sellingPlans.edges.map(edge => edge.node)
}

export function useShopifyCart() {
  const [cart, setCart] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addToCart = async (variantId: string, quantity: number = 1) => {
    try {
      setLoading(true)
      setError(null)

      // Create cart if it doesn't exist
      if (!cart) {
        const createCartResponse = await fetch(`https://${SHOPIFY_STOREFRONT_DOMAIN}/api/2023-10/graphql.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          },
          body: JSON.stringify({
            query: `
              mutation CartCreate {
                cartCreate {
                  cart {
                    id
                    checkoutUrl
                  }
                  userErrors {
                    field
                    message
                  }
                }
              }
            `
          })
        })

        const createCartData = await createCartResponse.json()
        if (createCartData.data.cartCreate.userErrors.length > 0) {
          throw new Error(createCartData.data.cartCreate.userErrors[0].message)
        }

        setCart(createCartData.data.cartCreate.cart)
      }

      // Add item to cart
      const addToCartResponse = await fetch(`https://${SHOPIFY_STOREFRONT_DOMAIN}/api/2023-10/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          query: `
            mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
              cartLinesAdd(cartId: $cartId, lines: $lines) {
                cart {
                  id
                  lines(first: 10) {
                    edges {
                      node {
                        id
                        quantity
                        merchandise {
                          ... on ProductVariant {
                            id
                            title
                            product {
                              title
                            }
                            price {
                              amount
                              currencyCode
                            }
                          }
                        }
                      }
                    }
                  }
                  cost {
                    totalAmount {
                      amount
                      currencyCode
                    }
                  }
                }
                userErrors {
                  field
                  message
                }
              }
            }
          `,
          variables: {
            cartId: cart.id,
            lines: [{
              merchandiseId: variantId,
              quantity: quantity
            }]
          }
        })
      })

      const addToCartData = await addToCartResponse.json()
      if (addToCartData.data.cartLinesAdd.userErrors.length > 0) {
        throw new Error(addToCartData.data.cartLinesAdd.userErrors[0].message)
      }

      setCart(addToCartData.data.cartLinesAdd.cart)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error adding to cart:', err)
    } finally {
      setLoading(false)
    }
  }

  return { cart, addToCart, loading, error }
}
