import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";

// ── Calculator component map (path → component) ──────────────────────────────
const calculatorMap: Record<string, ComponentType> = {
  // Financial
  "financial/loan":              dynamic(() => import("@/components/calculators/LoanCalculator")),
  "financial/mortgage":          dynamic(() => import("@/components/calculators/MortgageCalculator")),
  "financial/vat":               dynamic(() => import("@/components/calculators/VATCalculator")),
  "financial/salary":            dynamic(() => import("@/components/calculators/SalaryCalculator")),
  "financial/compound-interest": dynamic(() => import("@/components/calculators/CompoundInterestCalculator")),
  "financial/currency":          dynamic(() => import("@/components/calculators/CurrencyConverter")),
  "financial/zakat":             dynamic(() => import("@/components/calculators/ZakatCalculator")),
  "financial/end-of-service":    dynamic(() => import("@/components/calculators/EndOfServiceCalculator")),
  "financial/tafqeet":           dynamic(() => import("@/components/calculators/TafqeetCalculator")),
  // Health
  "health/bmi":                  dynamic(() => import("@/components/calculators/BMICalculator")),
  "health/calories":             dynamic(() => import("@/components/calculators/CaloriesCalculator")),
  "health/pregnancy":            dynamic(() => import("@/components/calculators/PregnancyCalculator")),
  "health/ideal-weight":         dynamic(() => import("@/components/calculators/IdealWeightCalculator")),
  "health/water-intake":         dynamic(() => import("@/components/calculators/WaterIntakeCalculator")),
  "health/bmr":                  dynamic(() => import("@/components/calculators/BMRCalculator")),
  // Math
  "math/percentage":             dynamic(() => import("@/components/calculators/PercentageCalculator")),
  "math/calculator":             dynamic(() => import("@/components/calculators/StandardCalculator")),
  "math/scientific":             dynamic(() => import("@/components/calculators/ScientificCalculator")),
  // Tools
  "tools/gpa":                   dynamic(() => import("@/components/calculators/GPACalculator")),
  "tools/fuel":                  dynamic(() => import("@/components/calculators/FuelCalculator")),
  "tools/password":              dynamic(() => import("@/components/calculators/PasswordGenerator")),
  "tools/unit-converter":        dynamic(() => import("@/components/calculators/UnitConverter")),
  "tools/time":                  dynamic(() => import("@/components/calculators/TimeCalculator")),
  "tools/grade":                 dynamic(() => import("@/components/calculators/GradeCalculator")),
  "tools/area":                  dynamic(() => import("@/components/calculators/AreaCalculator")),
  "tools/concrete":              dynamic(() => import("@/components/calculators/ConcreteCalculator")),
  "tools/age":                   dynamic(() => import("@/components/calculators/AgeCalculator")),
  "tools/hijri-date":            dynamic(() => import("@/components/calculators/HijriDateCalculator")),
  "tools/inheritance":           dynamic(() => import("@/components/calculators/InheritanceCalculator")),
};

interface Props {
  params: { path: string[] };
}

export default function EmbedPage({ params }: Props) {
  const key = params.path.join("/");
  const Calculator = calculatorMap[key];

  if (!Calculator) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 flex items-start justify-center">
      <div className="w-full max-w-2xl bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
        <Calculator />
      </div>
    </div>
  );
}

// Generate static params for all known routes
export function generateStaticParams() {
  return Object.keys(calculatorMap).map((key) => ({
    path: key.split("/"),
  }));
}
