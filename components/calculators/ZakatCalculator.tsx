"use client";

import { useState } from "react";
import { Calculator, AlertCircle, CheckCircle } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

// Nisab = 85g of gold. Gold price in EGP (update periodically or fetch from API)
// Default: ~4,200 EGP/g as of 2026 (adjust as needed)
const GOLD_PRICE_PER_GRAM_EGP = 4200;
const NISAB_GRAMS = 85;
const ZAKAT_RATE = 0.025; // 2.5%

interface ZakatResult {
  totalAssets: number;
  nisabValue: number;
  meetsNisab: boolean;
  zakatAmount: number;
  goldNisab: number;
}

export default function ZakatCalculator() {
  const [cash, setCash] = useState("");
  const [gold, setGold] = useState("");
  const [silver, setSilver] = useState("");
  const [stocks, setStocks] = useState("");
  const [receivables, setReceivables] = useState("");
  const [goldPrice, setGoldPrice] = useState(String(GOLD_PRICE_PER_GRAM_EGP));
  const [result, setResult] = useState<ZakatResult | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");

    const cashVal = parseFloat(cash || "0");
    const goldVal = parseFloat(gold || "0"); // grams
    const silverVal = parseFloat(silver || "0"); // grams
    const stocksVal = parseFloat(stocks || "0");
    const receivablesVal = parseFloat(receivables || "0");
    const goldPriceVal = parseFloat(goldPrice || String(GOLD_PRICE_PER_GRAM_EGP));

    if (isNaN(goldPriceVal) || goldPriceVal <= 0) {
      setError("يرجى إدخال سعر الذهب بشكل صحيح.");
      return;
    }

    // Nisab based on gold: 85 grams × current gold price
    const nisabValue = NISAB_GRAMS * goldPriceVal;

    // Convert gold and silver to cash equivalent
    // Silver price ≈ gold price / 80 (rough approximation)
    const SILVER_PRICE = goldPriceVal / 80;
    const goldInCash = goldVal * goldPriceVal;
    const silverInCash = silverVal * SILVER_PRICE;

    const totalAssets = cashVal + goldInCash + silverInCash + stocksVal + receivablesVal;
    const meetsNisab = totalAssets >= nisabValue;
    const zakatAmount = meetsNisab ? totalAssets * ZAKAT_RATE : 0;

    setResult({
      totalAssets,
      nisabValue,
      meetsNisab,
      zakatAmount,
      goldNisab: NISAB_GRAMS,
    });

    trackCalculatorUsed("zakat", "financial");
  };

  const reset = () => {
    setCash("");
    setGold("");
    setSilver("");
    setStocks("");
    setReceivables("");
    setGoldPrice(String(GOLD_PRICE_PER_GRAM_EGP));
    setResult(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      {/* Gold Price Input */}
      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
        <label className="block text-sm font-bold text-amber-800 dark:text-amber-300 mb-2">
          سعر الذهب عيار 24 (بالجنيه المصري/جرام)
        </label>
        <input
          type="number"
          value={goldPrice}
          onChange={(e) => setGoldPrice(e.target.value)}
          className="w-full px-4 py-2 border border-amber-300 dark:border-amber-600 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
          placeholder="4200"
          min="0"
        />
        <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
          يُحدَّث يدوياً — تحقق من سعر الذهب الحالي
        </p>
      </div>

      {/* Asset Inputs */}
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { label: "النقود والأرصدة البنكية (جنيه)", value: cash, setter: setCash, placeholder: "10000", id: "cash" },
          { label: "وزن الذهب المملوك (جرام)", value: gold, setter: setGold, placeholder: "0", id: "gold" },
          { label: "وزن الفضة المملوكة (جرام)", value: silver, setter: setSilver, placeholder: "0", id: "silver" },
          { label: "قيمة الأسهم والاستثمارات (جنيه)", value: stocks, setter: setStocks, placeholder: "0", id: "stocks" },
          { label: "الديون المستحقة لك (جنيه)", value: receivables, setter: setReceivables, placeholder: "0", id: "receivables" },
        ].map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5"
            >
              {field.label}
            </label>
            <input
              id={field.id}
              type="number"
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
              placeholder={field.placeholder}
              min="0"
            />
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={calculate}
          className="flex-1 flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 px-6 rounded-xl transition-colors"
        >
          <Calculator className="h-5 w-5" />
          احسب الزكاة
        </button>
        <button
          onClick={reset}
          className="px-4 py-3 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors font-medium"
        >
          إعادة تعيين
        </button>
      </div>

      {/* Result */}
      {result && (
        <div
          className={`rounded-2xl border-2 p-6 space-y-4 ${
            result.meetsNisab
              ? "border-[#10B981] bg-green-50 dark:bg-green-900/20"
              : "border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800"
          }`}
        >
          {/* Nisab status */}
          <div className="flex items-start gap-3">
            {result.meetsNisab ? (
              <CheckCircle className="h-6 w-6 text-[#10B981] flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-6 w-6 text-gray-400 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-bold text-[#1E293B] dark:text-white">
                {result.meetsNisab
                  ? "✅ مالك بلغ النصاب — تجب عليك الزكاة"
                  : "ℹ️ مالك لم يبلغ النصاب — لا تجب عليك الزكاة الآن"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                قيمة النصاب الحالية ({result.goldNisab} جرام ذهب):{" "}
                <strong>{formatNumber(result.nisabValue, 0)} جنيه</strong>
              </p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="grid sm:grid-cols-2 gap-3 pt-2 border-t border-gray-200 dark:border-gray-600">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400">إجمالي الأصول الزكوية</p>
              <p className="text-xl font-black text-[#1E293B] dark:text-white">
                {formatNumber(result.totalAssets, 0)}
                <span className="text-sm font-normal mr-1">جنيه</span>
              </p>
            </div>
            <div
              className={`rounded-xl p-3 ${
                result.meetsNisab
                  ? "bg-[#10B981] text-white"
                  : "bg-white dark:bg-gray-800"
              }`}
            >
              <p className={`text-xs ${result.meetsNisab ? "text-green-100" : "text-gray-500 dark:text-gray-400"}`}>
                مبلغ الزكاة الواجبة (2.5%)
              </p>
              <p className={`text-2xl font-black ${result.meetsNisab ? "text-white" : "text-gray-400"}`}>
                {formatNumber(result.zakatAmount, 2)}
                <span className="text-sm font-normal mr-1">جنيه</span>
              </p>
            </div>
          </div>

          {result.meetsNisab && (
            <p className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-xl p-3">
              <strong>ملاحظة:</strong> هذه الحاسبة تحتسب زكاة الأموال العامة. استشر عالماً
              متخصصاً للأموال التجارية والزراعية وزكاة الفطر.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
