// Product data fetcher using shopXtools
// This handles the complex product data fetching logic from the original Framer code

interface ProductData {
  node: {
    id: string
    handle: string
    title: string
    vendor: string
    productType: string
    tags: string[]
    metafields: Array<{
      key: string
      namespace: string
      value: string
    }>
    collections: Array<{
      node: {
        id: string
        handle: string
        title: string
      }
    }>
    variants: {
      edges: Array<{
        node: {
          id: string
          title: string
          price: {
            amount: string
            currencyCode: string
          }
          availableForSale: boolean
          selectedOptions: Array<{
            name: string
            value: string
          }>
          quantityAvailable: number
          compareAtPrice?: {
            amount: string
            currencyCode: string
          }
          requiresShipping: boolean
        }
      }>
    }
    options: Array<{
      id: string
      name: string
      values: string[]
    }>
    priceRange: {
      minVariantPrice: {
        amount: string
        currencyCode: string
      }
    }
    compareAtPriceRange: {
      minVariantPrice: {
        amount: string
        currencyCode: string
      }
    }
    sellingPlanGroups?: {
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
  }
}

// Handle product data transformation
export function handleProductData(
  newProducts: ProductData[], 
  countryCode: string, 
  isInitialLoad: boolean = false, 
  cursor: string | null = null
) {
  try {
    // Transform products into minimal format with only essential data
    const transformedProducts = newProducts.map(({ node }) => {
      // For initial load, include minimal but sufficient variant data
      if (isInitialLoad) {
        return {
          node: {
            id: node.id,
            handle: node.handle,
            title: node.title,
            priceRange: node.priceRange,
            metafields: node.metafields,
            variants: { 
              edges: node.variants?.edges?.map(({ node: variant }) => ({
                node: {
                  id: variant.id,
                  title: variant.title,
                  price: variant.price,
                  availableForSale: variant.availableForSale,
                  selectedOptions: variant.selectedOptions || [],
                  quantityAvailable: variant.quantityAvailable || 0,
                  compareAtPrice: variant.compareAtPrice
                }
              })) || []
            },
            options: node.options || []
          }
        }
      }

      // For complete data load, include all necessary fields
      return {
        node: {
          id: node.id,
          handle: node.handle,
          title: node.title,
          vendor: node.vendor,
          productType: node.productType,
          tags: node.tags,
          metafields: node.metafields,
          collections: Array.isArray(node.collections)
            ? node.collections // already transformed
            : (node.collections?.edges || []).map(edge => ({
                node: {
                  id: edge.node.id,
                  handle: edge.node.handle,
                  title: edge.node.title
                }
            })),
          variants: { 
            edges: (node.variants?.edges || []).map(({ node: variant }) => ({
              node: {
                id: variant.id,
                title: variant.title,
                price: variant.price,
                availableForSale: variant.availableForSale,
                selectedOptions: variant.selectedOptions || [],
                quantityAvailable: variant.quantityAvailable || 0,
                compareAtPrice: variant.compareAtPrice,
                requiresShipping: variant.requiresShipping
              }
            }))
          },
          options: node.options || [],
          priceRange: node.priceRange,
          compareAtPriceRange: node.compareAtPriceRange,
          sellingPlanGroups: node.sellingPlanGroups ? {
            edges: (node.sellingPlanGroups.edges || []).map(({ node: sellingPlanGroup }) => ({
              node: {
                name: sellingPlanGroup.name,
                options: sellingPlanGroup.options,
                sellingPlans: {
                  edges: (sellingPlanGroup.sellingPlans.edges || []).map(({ node: sellingPlan }) => ({
                    node: {
                      id: sellingPlan.id,
                      name: sellingPlan.name,
                      description: sellingPlan.description,
                      recurringDeliveries: sellingPlan.recurringDeliveries,
                      priceAdjustments: sellingPlan.priceAdjustments
                    }
                  }))
                }
              }
            }))
          } : null
        }
      }
    })

    // Store products in smaller chunks to avoid quota issues
    const CHUNK_SIZE = 50
    const chunks = []
    for (let i = 0; i < transformedProducts.length; i += CHUNK_SIZE) {
      chunks.push(transformedProducts.slice(i, i + CHUNK_SIZE))
    }

    let storageQuotaExceeded = false

    // Update storage with all chunks
    try {
      // Only attempt to clear old chunks if we haven't hit quota yet
      if (!storageQuotaExceeded) {
        try {
          const oldMetadata = JSON.parse(sessionStorage.getItem('fc_products_' + countryCode + '_metadata') || '{}')
          if (oldMetadata.totalChunks) {
            for (let i = 0; i < oldMetadata.totalChunks; i++) {
              sessionStorage.removeItem('fc_products_' + countryCode + '_chunk_' + i)
            }
          }
        } catch (error) {
          console.warn('Storage quota exceeded during cleanup, switching to in-memory only')
          storageQuotaExceeded = true
        }
      }

      // Only attempt to store new chunks if we haven't hit quota yet
      if (!storageQuotaExceeded) {
        for (let i = 0; i < chunks.length; i++) {
          const chunkKey = 'fc_products_' + countryCode + '_chunk_' + i
          try {
            sessionStorage.setItem(chunkKey, JSON.stringify(chunks[i]))
          } catch (storageError) {
            console.warn('Storage quota exceeded at chunk', i, ', switching to in-memory only')
            storageQuotaExceeded = true
            break
          }
        }

        // Only attempt to update metadata if we haven't hit quota
        if (!storageQuotaExceeded) {
          const metadata = {
            totalChunks: chunks.length,
            totalProducts: transformedProducts.length,
            lastUpdated: Date.now(),
            isComplete: !cursor
          }
          try {
            sessionStorage.setItem('fc_products_' + countryCode + '_metadata', JSON.stringify(metadata))
          } catch (error) {
            console.warn('Storage quota exceeded during metadata update')
            storageQuotaExceeded = true
          }
        }
      }
    } catch (error) {
      console.warn('Storage operations failed, proceeding with in-memory only')
      storageQuotaExceeded = true
    }

    return transformedProducts
  } catch (error) {
    console.error('Error handling product data:', error)
    return []
  }
}

// Load products from storage
export function loadProductsFromStorage(countryCode: string): ProductData[] {
  try {
    const metadata = JSON.parse(sessionStorage.getItem('fc_products_' + countryCode + '_metadata') || '{}')
    if (!metadata.totalChunks) return []

    const products: ProductData[] = []
    for (let i = 0; i < metadata.totalChunks; i++) {
      const chunkKey = 'fc_products_' + countryCode + '_chunk_' + i
      const chunkData = sessionStorage.getItem(chunkKey)
      if (chunkData) {
        try {
          const chunk = JSON.parse(chunkData)
          products.push(...chunk)
        } catch (error) {
          console.warn('Error parsing chunk', i, ':', error)
        }
      }
    }

    return products
  } catch (error) {
    console.error('Error loading products from storage:', error)
    return []
  }
}

// Check if products are cached and fresh
export function areProductsCached(countryCode: string, maxAge: number = 300000): boolean {
  try {
    const metadata = JSON.parse(sessionStorage.getItem('fc_products_' + countryCode + '_metadata') || '{}')
    if (!metadata.lastUpdated) return false
    
    const age = Date.now() - metadata.lastUpdated
    return age < maxAge && metadata.isComplete
  } catch (error) {
    console.error('Error checking product cache:', error)
    return false
  }
}

