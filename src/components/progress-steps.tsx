"use client";

import { type Step } from "@/types/step";
import { CheckCircle } from "lucide-react";

interface ProgressStepsProps {
  steps: Step[];
}

export function ProgressSteps({ steps }: ProgressStepsProps) {
  return (
    <>
      {/* Desktop Progress */}
      <div className="hidden lg:flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.name} className="flex items-center">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  step.completed
                    ? "bg-green-500 text-white shadow-lg"
                    : step.active
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
              >
                {step.completed ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`ml-3 text-sm font-medium transition-colors duration-300 ${
                  step.active
                    ? "text-blue-600 dark:text-blue-400"
                    : step.completed
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-0.5 mx-4 transition-colors duration-300 ${
                  step.completed
                    ? "bg-green-500"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile Progress */}
      <div className="flex lg:hidden items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.name} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                step.completed
                  ? "bg-green-500 text-white"
                  : step.active
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              }`}
            >
              {step.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
            </div>
            <span
              className={`mt-1 text-[10px] font-medium text-center transition-colors duration-300 ${
                step.active
                  ? "text-blue-600 dark:text-blue-400"
                  : step.completed
                  ? "text-green-600 dark:text-green-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
