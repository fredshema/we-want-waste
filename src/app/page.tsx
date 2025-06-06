"use client"

import { ProgressSteps } from "@/components/progress-steps"
import { SkipCard } from "@/components/skip-card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { calculateTotalPrice, formatCurrency } from "@/lib/utils"
import type { Skip } from "@/types/skip"
import type { Step } from "@/types/step"
import { AlertCircle, ArrowLeft, ArrowRight, Loader2, Truck } from "lucide-react"
import { useEffect, useState } from "react"

const steps: Step[] = [
  { name: "Postcode", completed: true },
  { name: "Waste Type", completed: true },
  { name: "Select Skip", active: true, completed: false },
  { name: "Permit Check", completed: false },
  { name: "Choose Date", completed: false },
  { name: "Payment", completed: false },
]

export default function SkipSelection() {
  const [skips, setSkips] = useState<Skip[]>([])
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft")

        if (!response.ok) {
          throw new Error(`Error fetching skip data: ${response.status}`)
        }

        const data = await response.json()

        setSkips(data)

        // Select the first available skip by default
        const firstAvailableSkip = data.find((s: Skip) => s.allowed_on_road !== false)
        if (firstAvailableSkip) {
          setSelectedSkipId(firstAvailableSkip.id)
        } else {
          setSelectedSkipId(null) // No available skips
        }

        setError(null)
      } catch (err) {
        setError("Failed to load skip options. Please try again later.")
        console.error("Error fetching skip data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchSkips()
  }, [])

  const selectedSkip = skips.find((skip) => skip.id === selectedSkipId)

  const getPopularSkipId = () => {
    if (skips.length === 0) return null

    // Find the middle available skip
    const availableSkips = skips.filter((skip) => skip.allowed_on_road !== false)
    if (availableSkips.length === 0) return null

    const middleIndex = Math.floor(availableSkips.length / 2)
    return availableSkips[middleIndex]?.id || null
  }

  const popularSkipId = getPopularSkipId()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="max-w-xl md:max-w-4xl xl:max-w-7xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg">
                <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Skip Hire Pro</h1>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Professional waste management</p>
              </div>
            </div>
            <ThemeToggle />
          </div>

          <ProgressSteps steps={steps} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-xl md:max-w-4xl xl:max-w-7xl mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
            Choose Your Perfect Skip Size
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Select the skip size that best matches your project needs. All prices include delivery, collection, and
            disposal with transparent pricing.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">Loading skip options...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-8 flex items-center">
            <AlertCircle className="h-6 w-6 text-red-500 mr-4 flex-shrink-0" />
            <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
          </div>
        )}

        {/* Skip Options Grid */}
        {!loading && !error && skips.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {skips.map((skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                isSelected={selectedSkipId === skip.id}
                onSelect={(id) => {
                  const skipToSelect = skips.find((s) => s.id === id)
                  if (skipToSelect && skipToSelect.allowed_on_road !== false) {
                    setSelectedSkipId(id)
                  }
                }}
                isPopular={skip.id === popularSkipId}
              />
            ))}
          </div>
        )}

        {/* No Results State */}
        {!loading && !error && skips.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Truck className="h-10 w-10 text-gray-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">No skip options available for this location.</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto flex items-center justify-center h-12 px-8 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>

          {selectedSkip && (
            <div className="text-center order-first sm:order-none">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Selected: <strong className="text-gray-900 dark:text-gray-100">{selectedSkip.size} Yard Skip</strong>
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatCurrency(calculateTotalPrice(selectedSkip.price_before_vat, selectedSkip.vat))}
              </p>
            </div>
          )}

          <Button
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white flex items-center justify-center h-12 px-8 shadow-lg"
            disabled={!selectedSkipId}
          >
            Continue
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
