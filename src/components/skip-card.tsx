"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  calculateTotalPrice,
  formatCurrency,
  getSkipDimensions,
  getSkipSuitability,
} from "@/lib/utils";
import type { Skip } from "@/types/skip";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  MapPin,
  Star,
  Weight,
} from "lucide-react";

interface SkipCardModernProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (id: number) => void;
  isPopular?: boolean;
}

export function SkipCard({
  skip,
  isSelected,
  onSelect,
  isPopular = false,
}: SkipCardModernProps) {
  const totalPrice = calculateTotalPrice(skip.price_before_vat, skip.vat);

  return (
    <div className="group relative">
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 shadow-lg">
            <Star className="h-3 w-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}

      <Card
        className={`relative transition-all duration-500 overflow-hidden border-2 ${
          !skip.allowed_on_road
            ? "border-gray-300 dark:border-gray-700 opacity-60 cursor-not-allowed"
            : isSelected
            ? "border-blue-500 shadow-2xl transform scale-[1.02] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 cursor-pointer"
            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-xl group-hover:transform group-hover:scale-[1.01] cursor-pointer"
        } bg-white dark:bg-gray-900`}
        onClick={() => skip.allowed_on_road && onSelect(skip.id)}
      >
        {/* Header Section */}
        <div
          className={`p-6 pb-4 ${
            isSelected
              ? "bg-gradient-to-r from-blue-500 to-indigo-600"
              : "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div
              className={`text-3xl font-black ${
                isSelected ? "text-white" : "text-gray-800 dark:text-gray-200"
              }`}
            >
              {skip.size}
            </div>
            <div
              className={`text-right ${
                isSelected ? "text-white" : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <div className="text-xs font-medium">YARD SKIP</div>
              <div className="text-xs opacity-75">
                {getSkipDimensions(skip.size)}
              </div>
            </div>
          </div>

          <div
            className={`text-2xl font-bold ${
              isSelected ? "text-white" : "text-gray-900 dark:text-gray-100"
            }`}
          >
            {formatCurrency(totalPrice)}
          </div>
          <div
            className={`text-sm ${
              isSelected ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {formatCurrency(skip.price_before_vat)} + VAT
          </div>
        </div>

        <CardContent className="p-6 pt-4 space-y-4">
          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-2 text-blue-500" />
              <span>{skip.hire_period_days} day hire period</span>
            </div>

            {/* Road Placement */}
            <div className="flex items-center text-sm">
              <MapPin
                className={`h-4 w-4 mr-2 ${
                  skip.allowed_on_road ? "text-green-500" : "text-red-500"
                }`}
              />
              <span
                className={`${
                  skip.allowed_on_road
                    ? "text-gray-600 dark:text-gray-400"
                    : "text-red-600 dark:text-red-400 font-medium"
                }`}
              >
                {skip.allowed_on_road
                  ? "Road placement allowed"
                  : "Not allowed on road"}
              </span>
              {!skip.allowed_on_road && (
                <AlertTriangle className="h-3 w-3 ml-1 text-red-500" />
              )}
            </div>

            {/* Heavy Waste */}
            <div className="flex items-center text-sm">
              <Weight
                className={`h-4 w-4 mr-2 ${
                  skip.allows_heavy_waste ? "text-green-500" : "text-red-500"
                }`}
              />
              <span
                className={`${
                  skip.allows_heavy_waste
                    ? "text-gray-600 dark:text-gray-400"
                    : "text-red-600 dark:text-red-400 font-medium"
                }`}
              >
                {skip.allows_heavy_waste
                  ? "Heavy waste accepted"
                  : "Not suitable for heavy waste"}
              </span>
              {!skip.allows_heavy_waste && (
                <AlertTriangle className="h-3 w-3 ml-1 text-red-500" />
              )}
            </div>
          </div>

          {/* Suitable For */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              PERFECT FOR:
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {getSkipSuitability(skip.size)}
            </div>
          </div>

          {/* Selection Button */}
          <Button
            className={`w-full h-12 font-semibold transition-all duration-300 ${
              isSelected
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(skip.id);
            }}
          >
            {isSelected ? (
              <>
                <CheckCircle className="h-5 w-5 mr-2" />
                Selected
              </>
            ) : (
              "Select This Skip"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
