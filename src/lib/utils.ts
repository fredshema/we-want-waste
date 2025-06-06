import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function calculateTotalPrice(priceBeforeVat: number, vatRate: number): number {
  return priceBeforeVat * (1 + vatRate / 100)
}

export function getSkipSuitability(size: number): string {
  const suitabilityMap: Record<number, string> = {
    2: "Small garden clearance, minor home projects",
    4: "Home renovations, garden waste, small clearance projects",
    6: "House clearance, medium renovation projects, building waste",
    8: "Large home renovations, commercial clearance, construction waste",
    10: "Major construction projects, large commercial clearance",
    12: "Industrial waste, large construction projects, site clearance",
    16: "Major construction sites, industrial clearance projects",
  }

  return suitabilityMap[size] || "General waste disposal projects"
}

export function getSkipDimensions(size: number): string {
  const dimensionsMap: Record<number, string> = {
    2: "5ft x 3ft x 2ft",
    4: "6ft x 4ft x 3ft",
    6: "8ft x 4ft x 4ft",
    8: "10ft x 5ft x 4ft",
    10: "12ft x 5ft x 5ft",
    12: "14ft x 5ft x 5ft",
    16: "16ft x 6ft x 6ft",
  }

  return dimensionsMap[size] || "Dimensions vary"
}
