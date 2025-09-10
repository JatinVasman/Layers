"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { ProductGrid } from "@/components/product-grid"
import { products } from "@/lib/products"
import { Filter, ArrowDown } from "lucide-react"

type SortOption = "default" | "price-low-high" | "price-high-low"

export function ProductsClient() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>("default")
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false)
      }
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredProducts = useMemo(() => {
    let filtered = selectedCategory 
      ? products.filter(product => product.category === selectedCategory)
      : products

    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        return filtered.sort((a, b) => a.price - b.price)
      case "price-high-low":
        return filtered.sort((a, b) => b.price - a.price)
      default:
        return filtered
    }
  }, [selectedCategory, sortBy])

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-low-high", label: "Price: Low - High" },
    { value: "price-high-low", label: "Price: High - Low" }
  ]

  const filterOptions = [
    { value: null, label: "All" },
    { value: "t-shirts", label: "T-Shirts" },
    { value: "hoodies", label: "Hoodies" },
    { value: "cropped-tees", label: "Cropped Tees" },
    { value: "sweatshirts", label: "Sweatshirts" }
  ]

  const getCurrentFilterLabel = () => {
    return filterOptions.find(option => option.value === selectedCategory)?.label || "All"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="py-16 px-8">
        <div className="w-full">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl mb-8">
            All Products
          </h1>
          
          {/* Filter and Sort Controls */}
          <div className="flex items-center justify-between mb-8">
            {/* Filter by */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="text-gray-600">Filter by</span>
                <span className="font-medium">{getCurrentFilterLabel()}</span>
                <ArrowDown className="h-4 w-4 text-gray-600" />
              </button>

              {/* Filter Dropdown */}
              {showFilterDropdown && (
                <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value || "all"}
                      onClick={() => {
                        setSelectedCategory(option.value)
                        setShowFilterDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                        selectedCategory === option.value ? 'bg-gray-50 font-medium' : ''
                      } ${option.value !== null ? 'border-t border-gray-200' : ''}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sort by */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                </div>
                <span className="text-gray-600">Sort by</span>
                <span className="font-medium">
                  {sortOptions.find(option => option.value === sortBy)?.label}
                </span>
                <ArrowDown className="h-4 w-4 text-gray-600" />
              </button>

              {/* Dropdown */}
              {showSortDropdown && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value as SortOption)
                        setShowSortDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                        sortBy === option.value ? 'bg-gray-50 font-medium' : ''
                      } ${option.value !== 'default' ? 'border-t border-gray-200' : ''}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  )
}
