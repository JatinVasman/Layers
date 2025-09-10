"use client"

import { useState, useEffect } from "react"
import { useShopXTools } from "@/hooks/use-shopx-tools"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Globe } from "lucide-react"

interface CurrencySelectorProps {
  onCurrencyChange?: (currency: string, countryCode: string) => void
  currentCurrency?: string
  currentCountry?: string
}

export function CalderCurrencySelector({ 
  onCurrencyChange, 
  currentCurrency = 'USD', 
  currentCountry = 'US' 
}: CurrencySelectorProps) {
  const { currencySettings, updateBuyerIdentity, loading } = useShopXTools()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState(currentCurrency)
  const [selectedCountry, setSelectedCountry] = useState(currentCountry)
  const [availableCurrencies, setAvailableCurrencies] = useState<any[]>([])

  // Load available currencies from sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem("availableCurrenciesAndCountries")
      if (stored) {
        try {
          const currencies = JSON.parse(stored)
          setAvailableCurrencies(currencies)
        } catch (err) {
          console.error("Error parsing currencies:", err)
        }
      }
    }
  }, [])

  const currentCurrencyData = availableCurrencies.find(c => c.currency.isoCode === selectedCurrency)

  const handleCurrencySelect = async (currency: string, countryCode: string) => {
    setSelectedCurrency(currency)
    setSelectedCountry(countryCode)
    setIsOpen(false)
    
    // Store in localStorage
    localStorage.setItem('selectedCurrency', currency)
    localStorage.setItem('selectedCountryCode', countryCode)
    
    // Update buyer identity in cart if available
    if (updateBuyerIdentity) {
      await updateBuyerIdentity(countryCode)
    }
    
    // Notify parent component
    onCurrencyChange?.(currency, countryCode)
  }

  useEffect(() => {
    // Load from localStorage on mount
    const savedCurrency = localStorage.getItem('selectedCurrency')
    const savedCountry = localStorage.getItem('selectedCountryCode')
    
    if (savedCurrency) setSelectedCurrency(savedCurrency)
    if (savedCountry) setSelectedCountry(savedCountry)
  }, [])

  if (loading || availableCurrencies.length === 0) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-sm">
        <Globe className="h-4 w-4" />
        <span>Loading...</span>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
      >
        <Globe className="h-4 w-4" />
        <span>{currentCurrencyData?.currency.symbol || '$'}</span>
        <span>{selectedCurrency}</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
          >
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-1">
                Select Currency & Country
              </div>
              {availableCurrencies.map((country) => (
                <button
                  key={`${country.isoCode}-${country.currency.isoCode}`}
                  onClick={() => handleCurrencySelect(country.currency.isoCode, country.isoCode)}
                  className={`w-full text-left px-2 py-2 rounded-md text-sm transition-colors hover:bg-gray-100 ${
                    selectedCurrency === country.currency.isoCode && selectedCountry === country.isoCode
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{country.currency.symbol}</span>
                      <span>{country.currency.isoCode}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {country.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
