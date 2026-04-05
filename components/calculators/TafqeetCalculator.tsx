"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { tafqeet, type CurrencyCode } from "@/lib/calculations/tafqeet";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

const CURRENCIES: Array<{ value: CurrencyCode; label: string; flag: string }> = [
  { value: "EGP", label: "جنيه مصري", flag: "🇪🇬" },
  { value: "SAR", label: "ريال سعودي", flag: "🇸🇦" },
  { value: "AED", label: "درهم إماراتي", flag: "🇦🇪" },
  { value: "USD", label: "دولار أمريكي", flag: "🇺🇸" },
  { value: "KWD", label: "دينار كويتي", flag: "🇰🇼" },
];

export default function TafqeetCalculator() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<CurrencyCode>("EGP");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = () => {
    const num = parseFloat(amount.replace(/,/g, ""));
    if (isNaN(num) || num < 0) { setResult("يرجى إدخال رقم صحيح."); return; }
    const text = tafqeet(num, currency);
    setResult(text);
    trackCalculatorUsed("tafqeet", "financial");
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Currency */}
      <div>
        <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-2">العملة</label>
        <div className="flex flex-wrap gap-2">
          {CURRENCIES.map((c) => (
            <button key={c.value} onClick={() => setCurrency(c.value)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${currency === c.value ? "border-[#1E3A8A] bg-[#1E3A8A] text-white" : "border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-[#1E3A8A]"}`}>
              <span>{c.flag}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Amount input */}
      <div>
        <label htmlFor="amount" className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">
          المبلغ بالأرقام
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && convert()}
          className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-right text-2xl font-bold focus:outline-none focus:border-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
          placeholder="0"
          min="0"
          step="0.01"
          dir="ltr"
        />
      </div>

      {/* Quick examples */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-gray-500 dark:text-gray-400 self-center">أمثلة سريعة:</span>
        {[100, 1000, 5000, 10000, 50000, 100000, 1000000].map((n) => (
          <button key={n} onClick={() => setAmount(String(n))}
            className="text-xs px-2.5 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-[#1E3A8A] hover:text-white text-gray-600 dark:text-gray-300 rounded-full transition-colors">
            {n.toLocaleString("ar-EG")}
          </button>
        ))}
      </div>

      <button onClick={convert}
        className="w-full bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 px-6 rounded-xl transition-colors text-lg">
        تفقيط المبلغ
      </button>

      {result && (
        <div className="bg-white dark:bg-[#1E293B] rounded-2xl border-2 border-[#1E3A8A] p-6 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">المبلغ كتابةً</p>
              <p className="text-xl font-bold text-[#1E293B] dark:text-white leading-relaxed" dir="rtl">
                {result}
              </p>
            </div>
            <button onClick={handleCopy}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${copied ? "bg-green-100 text-green-700" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200"}`}
              aria-label="نسخ النص">
              {copied ? <><Check className="h-4 w-4" />نُسخ!</> : <><Copy className="h-4 w-4" />نسخ</>}
            </button>
          </div>

          {/* Show number formatted */}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              الرقم:{" "}
              <strong className="text-[#1E293B] dark:text-white font-mono" dir="ltr">
                {parseFloat(amount.replace(/,/g, "")).toLocaleString("ar-EG")}
              </strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
