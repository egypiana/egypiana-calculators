"use client";
import { useState } from "react";
import { Calculator } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

export default function VATCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("15");
  const [mode, setMode] = useState<"add" | "extract">("add");
  const [result, setResult] = useState<{ base: number; vat: number; total: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(amount);
    const r = parseFloat(rate) / 100;
    if (isNaN(a) || a <= 0 || isNaN(r) || r < 0) return;
    if (mode === "add") {
      setResult({ base: a, vat: a * r, total: a * (1 + r) });
    } else {
      const base = a / (1 + r);
      setResult({ base, vat: a - base, total: a });
    }
    trackCalculatorUsed("vat", "financial");
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {(["add", "extract"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`py-3 rounded-xl font-bold border-2 transition-all text-sm ${mode === m ? "border-[#1E3A8A] bg-[#1E3A8A] text-white" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>
            {m === "add" ? "إضافة ضريبة" : "استخراج الضريبة"}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">
            {mode === "add" ? "المبلغ قبل الضريبة" : "المبلغ الشامل للضريبة"}
          </label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
            placeholder="1000" min="0" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">نسبة الضريبة (%)</label>
          <div className="flex gap-2">
            {["5", "15", "20"].map((r) => (
              <button key={r} onClick={() => setRate(r)}
                className={`flex-1 py-3 rounded-xl font-bold border-2 text-sm transition-all ${rate === r ? "border-[#1E3A8A] bg-[#1E3A8A] text-white" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>
                {r}%
              </button>
            ))}
            <input type="number" value={rate} onChange={(e) => setRate(e.target.value)}
              className="w-20 px-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white text-sm"
              placeholder="%" min="0" max="100" />
          </div>
        </div>
      </div>
      <button onClick={calculate} className="w-full flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 rounded-xl transition-colors">
        <Calculator className="h-5 w-5" /> احسب الضريبة
      </button>
      {result && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "المبلغ الأساسي", value: result.base, color: "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700" },
            { label: `ضريبة ${rate}%`, value: result.vat, color: "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700" },
            { label: "الإجمالي شامل الضريبة", value: result.total, color: "bg-[#1E3A8A] text-white" },
          ].map((card) => (
            <div key={card.label} className={`${card.color} rounded-2xl p-4 text-center`}>
              <p className={`text-xs mb-1 ${card.color.includes("bg-[#1E3A8A]") ? "text-blue-200" : "text-gray-500 dark:text-gray-400"}`}>{card.label}</p>
              <p className={`text-xl font-black ${card.color.includes("bg-[#1E3A8A]") ? "text-white" : "text-[#1E293B] dark:text-white"}`}>{formatNumber(card.value, 2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
