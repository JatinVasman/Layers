// shopXtools - Complete Shopify integration library
// Based on the original Framer implementation

declare global {
  interface Window {
    shopXtools: {
      __eventsIdentifier: string
      dispatchEvent: (eventType: string, detail?: any) => void
      status: string
      cart: any
      products: any[]
      productsWithPrices?: { [key: string]: any[] }
      defaultCurrency?: string
      defaultCountry?: string
      defaultCountryCode?: string
      defaultCurrencySymbol?: string
      fetchCart: (cartId: string) => Promise<any>
      handleCartMutation: (mutation: string, variables: any) => Promise<any>
      handleTemporaryCartMutation: (mutation: string, variables: any) => Promise<any>
      fetchAvailableCurrencies: () => Promise<any>
      getProducts: (id: string) => any
      getProductsForCountry: (countryCode: string) => any[]
    }
    __FcCheckoutConfigs?: {
      defaultCountry?: string
      defaultCountryCode?: string
      defaultCurrency?: string
      defaultCurrencySymbol?: string
    }
  }
}

// Currency mapping with symbols
const CURRENCIES: { [key: string]: string } = {
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

// Currencies that use their code as symbol
const knownCurrenciesWithCodeAsSymbol: { [key: string]: boolean } = {
  "USD": true, "EUR": true, "GBP": true, "CAD": true, "AUD": true, "JPY": true, "CHF": true, "CNY": true, "SEK": true, "NZD": true,
  "MXN": true, "SGD": true, "HKD": true, "NOK": true, "TRY": true, "RUB": true, "INR": true, "BRL": true, "ZAR": true, "KRW": true
}

// Configuration
const fcConfigs = {
  storefrontDomain: "calder-co-demo.myshopify.com",
  storefrontAccessToken: "b5a8cdefb54942ad64599843ef1b0f0c"
}

let domain: URL | null = null
let products: any[] = []

// GraphQL Queries
const getAvailableCurrencies = `
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

const getCartQuery = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
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
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }
      buyerIdentity {
        countryCode
        customer {
          id
          email
          firstName
          lastName
          displayName
        }
        email
        phone
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
            merchandise {
              ... on ProductVariant {
                id
                title
                availableForSale
                quantityAvailable
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                product {
                  id
                  handle
                  title
                  vendor
                  productType
                  tags
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                        width
                        height
                      }
                    }
                  }
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
            sellingPlanAllocation {
              sellingPlan {
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
      attributes {
        key
        value
      }
      discountCodes {
        code
        applicable
      }
    }
  }
`

const getCartQueryNoPlans = `
  query getCartNoPlans($cartId: ID!) {
    cart(id: $cartId) {
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
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }
      buyerIdentity {
        countryCode
        customer {
          id
          email
          firstName
          lastName
          displayName
        }
        email
        phone
      }
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
            merchandise {
              ... on ProductVariant {
                id
                title
                availableForSale
                quantityAvailable
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                product {
                  id
                  handle
                  title
                  vendor
                  productType
                  tags
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                        width
                        height
                      }
                    }
                  }
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
      attributes {
        key
        value
      }
      discountCodes {
        code
        applicable
      }
    }
  }
`

// Initialize shopXtools
export function initializeShopXtools() {
  if (typeof window === 'undefined') return

  // Setup initial tools object
  window.shopXtools = window.shopXtools || {}
  window.shopXtools.products = {}
  window.shopXtools.fetchCart = null
  window.shopXtools.dispatchEvent = (eventType: string, detail?: any) => {
    const newEvent = new CustomEvent(eventType, { detail })
    document.dispatchEvent(newEvent)
  }

  // Cart mutation handler
  window.shopXtools.handleCartMutation = async (mutation: string, variables: any) => {
    const endpoint = `https://${domain?.host}/api/2024-07/graphql.json`
    const token = fcConfigs.storefrontAccessToken

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": token,
        },
        body: JSON.stringify({
          query: mutation,
          variables,
        }),
      })
      const result = await response.json()
      if (response.ok && !result.errors) {
        // If this is a cart mutation and we have cart data, save it to localStorage
        if (result.data && (result.data.cartCreate || result.data.cartLinesAdd || 
            result.data.cartLinesRemove || result.data.cartLinesUpdate || 
            result.data.cartBuyerIdentityUpdate)) {
          
          // Find the cart object in the response
          const cartData = result.data.cartCreate?.cart || 
                          result.data.cartLinesAdd?.cart || 
                          result.data.cartLinesRemove?.cart || 
                          result.data.cartLinesUpdate?.cart ||
                          result.data.cartBuyerIdentityUpdate?.cart
          
          if (cartData) {
            // Update the global cart object
            window.shopXtools.cart = cartData
            // Save to localStorage
            localStorage.setItem("shopXtools.cart", JSON.stringify(cartData))
            
            // If this is a buyerIdentity update with a country code, update currency settings
            if (result.data.cartBuyerIdentityUpdate && cartData.buyerIdentity && cartData.buyerIdentity.countryCode) {
              // Trigger currency settings update
              initializeCurrencySettings()
            }
          }
        }
        return result.data
      } else {
        console.error("GraphQL errors:", result.errors)
        return null
      }
    } catch (error) {
      console.error("Network error:", error)
      return null
    }
  }

  // Temporary cart mutation handler
  window.shopXtools.handleTemporaryCartMutation = async (mutation: string, variables: any) => {
    const endpoint = `https://${domain?.host}/api/2024-07/graphql.json`
    const token = fcConfigs.storefrontAccessToken

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": token,
        },
        body: JSON.stringify({
          query: mutation,
          variables,
        }),
      })
      const result = await response.json()
      if (response.ok && !result.errors) {
        // If this is a cart mutation and we have cart data, save it to temporaryCart
        if (result.data && (result.data.cartCreate || result.data.cartLinesAdd || 
            result.data.cartLinesRemove || result.data.cartLinesUpdate || 
            result.data.cartBuyerIdentityUpdate)) {
          
          // Find the cart object in the response
          const cartData = result.data.cartCreate?.cart || 
                          result.data.cartLinesAdd?.cart || 
                          result.data.cartLinesRemove?.cart || 
                          result.data.cartLinesUpdate?.cart ||
                          result.data.cartBuyerIdentityUpdate?.cart
          
          if (cartData) {
            // If this is a buyerIdentity update with a country code, update currency settings
            if (result.data.cartBuyerIdentityUpdate && cartData.buyerIdentity && cartData.buyerIdentity.countryCode) {
              // Trigger currency settings update
              initializeCurrencySettings()
            }
          }
        }
        return result.data // Return the temporary cart data
      } else {
        console.error("GraphQL errors:", result.errors)
        return null
      }
    } catch (error) {
      console.error("Network error:", error)
      return null
    }
  }

  // Fetch cart function
  window.shopXtools.fetchCart = async function(cartId: string) {
    const variables = { cartId: cartId }
    const endpoint = `https://${domain?.host}/api/2024-07/graphql.json`

    const tryFetchCart = async (query: string, queryName: string) => {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": fcConfigs.storefrontAccessToken,
          },
          body: JSON.stringify({ query: query, variables }),
        })

        const result = await response.json()
        if (result.errors) {
          console.error(`${queryName} failed with errors:`, result.errors)
          return null
        }

        if (result.data && result.data.cart) {
          // Save cart data to localStorage
          window.shopXtools.cart = result.data.cart
          localStorage.setItem("shopXtools.cart", JSON.stringify(result.data.cart))
          
          // If cart has buyerIdentity with countryCode, update currency settings
          if (result.data.cart.buyerIdentity && result.data.cart.buyerIdentity.countryCode) {
            // Trigger currency settings update
            initializeCurrencySettings()
          }
          
          return result.data.cart
        } else {
          console.error(`Cart data not found in response from ${queryName}:`, result)
          return null
        }
      } catch (error) {
        console.error(`Network error during ${queryName}:`, error)
        return null
      }
    }

    let cartData = await tryFetchCart(getCartQuery, "Primary cart query")
    if (!cartData) {
      cartData = await tryFetchCart(getCartQueryNoPlans, "Backup cart query")
    }

    return cartData
  }

  // Setup initial tools object
  if (window.shopXtools) {
    return
  }

  window.shopXtools = {
    __eventsIdentifier: "shopX__events__fragment",
    dispatchEvent: (eventType: string, detail?: any) => {
      const newEvent = new CustomEvent(eventType, { detail })
      document.dispatchEvent(newEvent)
    },
    status: "loading",
    cart: {},
    products: [],
    getProducts: (_id: string) => {
      if (window.shopXtools.status !== "ready") {
        console.warn("Products not yet loaded, please wait for data__products-ready event")
        return null
      }
      const fullId = _id.startsWith('gid://') ? _id : `gid://shopify/Product/${_id}`
      return window.shopXtools.products.find(({ node: product }) => product.id === fullId)
    },
    getProductsForCountry: (countryCode: string) => {
      if (window.shopXtools.status !== "ready") {
        console.warn("Products not yet loaded, please wait for data__products-ready event")
        return []
      }
      return window.shopXtools.productsWithPrices?.[countryCode] || []
    }
  }

  // Initialize domain and currency settings
  setDomainUrl()
  initializeCurrencySettings()
}

// Configuration validation
const configValidation = () => {
  if (!fcConfigs.storefrontDomain) {
    throw Error("Storefront domain not found")
  }
  if (!fcConfigs.storefrontAccessToken) {
    throw Error("Storefront access token not found")
  }
}

// Set domain URL
const setDomainUrl = () => {
  let storeDomain = "https://test.shopify.com"
  if (fcConfigs.storefrontDomain) {
    storeDomain = fcConfigs.storefrontDomain.startsWith("http")
      ? fcConfigs.storefrontDomain
      : `https://${fcConfigs.storefrontDomain}`
  }
  domain = new URL(storeDomain)
}

// Shopify API helper
const shopify = async (type: string, query: string, variables: any) => {
  const endpoint = `https://${domain?.host}/api/2024-07/graphql.json`
  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({ [type]: query, variables }),
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": fcConfigs.storefrontAccessToken,
    },
  })
  const json = await response.json()
  return json.data
}

// Fetch available currencies
const fetchAvailableCurrencies = async () => {
  const endpoint = `https://${domain?.host}/api/2024-07/graphql.json`
  
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": fcConfigs.storefrontAccessToken,
      },
      body: JSON.stringify({ query: getAvailableCurrencies }),
    })

    const result = await response.json()
    if (result.errors) {
      console.error("Error fetching currencies:", result.errors)
      return null
    }
    const availableCurrenciesAndCountries = result?.data?.localization?.availableCountries
    
    sessionStorage.setItem("availableCurrenciesAndCountries", JSON.stringify(availableCurrenciesAndCountries))
    
    return { availableCurrenciesAndCountries }
    
  } catch (error) {
    console.error("Error fetching currencies:", error)
    return null
  }
}

// Initialize currency settings
const initializeCurrencySettings = async () => {
  // Ensure domain is initialized before proceeding
  if (!domain) {
    await setDomainUrl()
  }
  if (!domain || !domain.host) {
    console.error("Domain is still undefined after initialization. Cannot fetch currencies.")
    return
  }

  // Retrieve available currencies from sessionStorage or fetch if not available
  let availableCurrenciesAndCountries = JSON.parse(sessionStorage.getItem("availableCurrenciesAndCountries") || '[]')
  if (!availableCurrenciesAndCountries || availableCurrenciesAndCountries.length === 0) {
    const currencies = await fetchAvailableCurrencies()
    if (!currencies) {
      console.error("Failed to fetch available currencies")
      return
    }
    availableCurrenciesAndCountries = currencies.availableCurrenciesAndCountries
    sessionStorage.setItem("availableCurrenciesAndCountries", JSON.stringify(availableCurrenciesAndCountries))
  }

  // Get values from window.__FcCheckoutConfigs
  const fcCheckoutConfigs = window.__FcCheckoutConfigs || {}
  const configCountry = fcCheckoutConfigs.defaultCountry
  const configCountryCode = fcCheckoutConfigs.defaultCountryCode
  const configCurrency = fcCheckoutConfigs.defaultCurrency
  const configCurrencySymbol = fcCheckoutConfigs.defaultCurrencySymbol
  
  // Get values from localStorage
  let storedCurrency = localStorage.getItem("selectedCurrency")
  let storedCountry = localStorage.getItem("selectedCountry")
  let storedCountryCode = localStorage.getItem("selectedCountryCode")
  let storedCurrencySymbol = localStorage.getItem("selectedCurrencySymbol")

  // Get cart data from localStorage
  let cart
  try {
    const cartData = localStorage.getItem("shopXtools.cart")
    if (cartData) {
      cart = JSON.parse(cartData)
    } else {
      cart = {}
    }
  } catch (error) {
    console.error("Error parsing cart data:", error)
    cart = {}
  }
  
  const buyerIdentity = cart.buyerIdentity || {}
  const countryCodeFromCart = buyerIdentity.countryCode
  window.shopXtools.cart = cart

  // Determine the country code using the priority sequence
  let finalCountryCode
  let finalCurrency = null
  let finalCountry = null
  let finalCurrencySymbol = null
  
  if (countryCodeFromCart) {
    // Priority 1: Use country code from cart
    finalCountryCode = countryCodeFromCart
  } else if (storedCountryCode && storedCurrency && storedCountry && storedCurrencySymbol) {
    // Priority 2: Use values from localStorage if all are present
    finalCountryCode = storedCountryCode
    finalCurrency = storedCurrency
    finalCountry = storedCountry
    finalCurrencySymbol = storedCurrencySymbol
  } else if (configCountryCode && configCurrency && configCountry) {
    // Priority 3: Use values from window.__FcCheckoutConfigs if all are present
    finalCountryCode = configCountryCode
    finalCurrency = configCurrency
    finalCountry = configCountry
    finalCurrencySymbol = configCurrencySymbol
  } else {
    // Priority 4: Use first available country if nothing else is available
    if (availableCurrenciesAndCountries && availableCurrenciesAndCountries.length > 0) {
      finalCountryCode = availableCurrenciesAndCountries[0].isoCode
    } else {
      console.error("No country data available")
      return
    }
  }
  
  // If we only have the country code (from cart or when other values are missing),
  // find the matching country data to get the currency and country name
  if (!finalCurrency || !finalCountry) {
    const matchedCountry = availableCurrenciesAndCountries.find((c: any) => c.isoCode === finalCountryCode)
    if (matchedCountry) {
      finalCurrency = matchedCountry.currency.isoCode
      finalCountry = matchedCountry.name
      if (knownCurrenciesWithCodeAsSymbol[finalCurrency]) {
        finalCurrencySymbol = finalCurrency
      } else {
        finalCurrencySymbol = CURRENCIES[finalCurrency]
      }
    } else {
      // If no match found, use first available country as fallback
      if (availableCurrenciesAndCountries && availableCurrenciesAndCountries.length > 0) {
        const firstCountry = availableCurrenciesAndCountries[0]
        finalCountryCode = firstCountry.isoCode
        finalCurrency = firstCountry.currency.isoCode
        finalCountry = firstCountry.name
        if (knownCurrenciesWithCodeAsSymbol[finalCurrency]) {
          finalCurrencySymbol = finalCurrency
        } else {
          finalCurrencySymbol = CURRENCIES[finalCurrency]
        }
      } else {
        console.error("Cannot determine country settings")
        return
      }
    }
  }

  // Update localStorage with the final values
  localStorage.setItem("selectedCountry", finalCountry)
  localStorage.setItem("selectedCurrency", finalCurrency)
  localStorage.setItem("selectedCountryCode", finalCountryCode)
  localStorage.setItem("selectedCurrencySymbol", finalCurrencySymbol)

  // Also update window.shopXtools for global consistency
  window.shopXtools.defaultCurrency = finalCurrency
  window.shopXtools.defaultCountry = finalCountry
  window.shopXtools.defaultCountryCode = finalCountryCode
  window.shopXtools.defaultCurrencySymbol = finalCurrencySymbol

  // Dispatch an event to notify the application of currency settings changes
  const currencyEvent = new CustomEvent('currency__settings-updated', {
    detail: {
      previous: {
        defaultCountry: storedCountry,
        defaultCountryCode: storedCountryCode,
        defaultCurrency: storedCurrency,
        defaultCurrencySymbol: storedCurrencySymbol
      },
      current: {
        defaultCountry: finalCountry,
        defaultCountryCode: finalCountryCode,
        defaultCurrency: finalCurrency,
        defaultCurrencySymbol: finalCurrencySymbol
      }
    }
  })
  document.dispatchEvent(currencyEvent)
}

// Attach fetchAvailableCurrencies to window.shopXtools
if (typeof window !== 'undefined') {
  window.shopXtools = window.shopXtools || {}
  window.shopXtools.fetchAvailableCurrencies = fetchAvailableCurrencies
}

export { CURRENCIES, knownCurrenciesWithCodeAsSymbol }

