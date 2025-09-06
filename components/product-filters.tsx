"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, X } from "lucide-react"
import { products } from "@/lib/products"
import { CATEGORIES, SUBCATEGORIES } from "@/lib/catalog"

interface ProductFiltersProps {
  onFilterChange: (filteredProducts: typeof products) => void
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [showFilters, setShowFilters] = useState(false)

  const handleFilter = () => {
    let filtered = products

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Subcategory filter
    if (selectedSubcategory) {
      filtered = filtered.filter((product) => product.subcategory === selectedSubcategory)
    }

    // Price filter
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    onFilterChange(filtered)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory(null)
    setSelectedSubcategory(null)
    setPriceRange([0, 200])
    onFilterChange(products)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSelectedSubcategory(null) // Reset subcategory when category changes
  }

  // Trigger filter when any filter changes
  useEffect(() => {
    handleFilter()
  }, [searchTerm, selectedCategory, selectedSubcategory, priceRange])

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            handleFilter()
          }}
          className="w-full rounded-md border border-border bg-background px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Mobile Filter Toggle */}
      <div className="flex items-center justify-between md:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>
        <button
          onClick={clearFilters}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Clear all
        </button>
      </div>

      {/* Filters */}
      <motion.div
        className={`space-y-6 ${showFilters ? "block" : "hidden md:block"}`}
        initial={false}
        animate={{ height: showFilters ? "auto" : 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Category Filter */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Category</h3>
          <div className="space-y-2">
            {CATEGORIES.map((category) => (
              <label key={category.key} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category.key}
                  onChange={() => handleCategoryChange(category.key)}
                  className="h-4 w-4 text-primary focus:ring-primary"
                />
                <span className="text-sm">{category.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Subcategory Filter */}
        {selectedCategory && SUBCATEGORIES[selectedCategory as keyof typeof SUBCATEGORIES] && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Style</h3>
            <div className="space-y-2">
              {SUBCATEGORIES[selectedCategory as keyof typeof SUBCATEGORIES].map((subcategory) => (
                <label key={subcategory.key} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="subcategory"
                    checked={selectedSubcategory === subcategory.key}
                    onChange={() => setSelectedSubcategory(subcategory.key)}
                    className="h-4 w-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{subcategory.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Price Range Filter */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Price Range</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-20 rounded-md border border-border px-2 py-1 text-sm"
              />
              <span className="text-sm text-muted-foreground">to</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-20 rounded-md border border-border px-2 py-1 text-sm"
              />
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full"
            />
          </div>
        </div>

        {/* Clear Filters Button - Desktop */}
        <div className="hidden md:block">
          <button
            onClick={clearFilters}
            className="w-full rounded-md border border-border px-4 py-2 text-sm transition hover:bg-muted"
          >
            Clear all filters
          </button>
        </div>
      </motion.div>
    </div>
  )
}
