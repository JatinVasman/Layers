"use client"

import { useState } from "react"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { products } from "@/lib/products"

interface CollectionClientProps {
  initialProducts: typeof products
}

export function CollectionClient({ initialProducts }: CollectionClientProps) {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts)

  return (
    <div className="grid gap-8 lg:grid-cols-4">
      <div className="lg:col-span-1">
        <ProductFilters onFilterChange={setFilteredProducts} />
      </div>
      <div className="lg:col-span-3">
        {filteredProducts.length ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <p className="text-sm text-muted-foreground">No items found matching your filters.</p>
        )}
      </div>
    </div>
  )
}
