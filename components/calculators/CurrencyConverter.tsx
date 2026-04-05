"use client";
import { useState } from "react";
import { ArrowLeftRight, RefreshCw } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

const CURRENCIES = [
  { code: "EGP", name: "الجنيه المصري", flag: "🇪🇬" },
  { code: "SAR", name: "الريال السعودي", flag: "🇸🇦" },
  { code: "AED", name: "الدرهم الإماراتي", flag: "🇦🇪" },
  { code: "USD", name: "الدولار الأمريكي", flag: "🇺🇸" },
  { code: "EUR", name: "اليورو", flag: "🇪🇺" },
  { code: "GBP", name: "الجنيه الإسترليني", flag: "🇬🇧" },
  { code: "KWD", name: "الدينار الكويتي", flag: "🇰🇼" },
  { code: "QAR", name: "الريال القطري", flag: "🇶🇦" },
  { code: "BHD", name: "الدينار البحريني", flag: "🇧🇭" },
  { code: "OMR", name: "الريال العُماني", flag: "🇴🇲" },
  { code: "JOD", name: "الدينار الأردني", flag: "🇯🇴" },
  { code: "TRY", name: "الليرة التركية", flag: "🇹🇷" },
];

// Static rates vs USD (approximate — real app would fetch from API)
const RATES_TO_USD: Record<string, number> = {
  USD: 1, EUR: 1.08, GBP: 1.27, SAR: 0.2667, AED: 0.2723,
  EGP: 0.0204, KWD: 3.26, QAR: 0.2747, BHD: 2.652, OMR: 2.597,
  JOD: 1.41, TRY: 0.031,
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EGP");
  const [result, setResult] = useState<number | null>(null);
  const [rateDisplay, setRateDisplay] = useState("");

  const convert = () => {
    const val = parseFloat(amount);
    if (isNaN(val)) return;
    const inUSD = val * RATES_TO_USD[from];
    const converted = inUSD / RATES_TO_USD[to];
    setResult(converted);
    setRateDisplay(`1 ${from} = ${formatNumber(RATES_TO_USD[from] / RATES_TO_USD[to], 4)} ${to}`);
    trackCalculatorUsed("currency-converter", "financial");
  };

  const swap = () => { setFrom(to); setTo(from); setResult(null); };

  const fromCurr = CURRENCIES.find(c => c.code === from);
  const toCurr = CURRENCIES.find(c => c.code === to);

  return (
    <div className="space-y-5">
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-3 text-center">
        <p className="text-amber-700 dark:text-amber-300 text-xs font-medium">⚠️ الأسعار تقريبية للتوضيح فقط — للتداول استخدم مصادر رسمية</p>
      </div>
      <div>
        <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">المبلغ</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right text-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
          placeholder="0" min="0" />
      </div>
      <div className="grid grid-cols-5 gap-2 items-center">
        <select value={from} onChange={e => { setFrom(e.target.value); setResult(null); }}
          className="col-span-2 px-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white text-sm">
          {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
        </select>
        <button onClick={swap} className="col-span-1 flex justify-center text-[#1E3A8A] dark:text-blue-400 hover:scale-110 transition-transform">
          <ArrowLeftRight className="h-6 w-6" />
        </button>
        <select value={to} onChange={e => { setTo(e.target.value); setResult(null); }}
          className="col-span-2 px-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white text-sm">
          {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
        </select>
      </div>
      <button onClick={convert} className="w-full flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 rounded-xl transition-colors">
        <RefreshCw className="h-5 w-5" /> تحويل العملة
      </button>
      {result !== null && (
        <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1e40af] rounded-2xl p-6 text-white text-center">
          <p className="text-blue-200 text-sm mb-1">{amount} {fromCurr?.flag} {from} =</p>
          <p className="text-5xl font-black mb-1" dir="ltr">{formatNumber(result, 2)}</p>
          <p className="text-blue-200">{toCurr?.flag} {to} — {toCurr?.name}</p>
          {rateDisplay && <p className="text-blue-300 text-xs mt-3 border-t border-blue-600 pt-3">{rateDisplay}</p>}
        </div>
      )}
      {/* Quick rates table */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
        <p className="text-sm font-semibold text-[#1E293B] dark:text-white mb-3 text-right">أسعار مقارنة بالدولار</p>
        <div className="grid grid-cols-2 gap-2">
          {CURRENCIES.filter(c => c.code !== "USD").map(c => (
            <div key={c.code} className="flex justify-between items-center text-xs">
              <span className="text-gray-500 dark:text-gray-400">{formatNumber(1/RATES_TO_USD[c.code], 3)}</span>
              <span className="font-medium text-[#1E293B] dark:text-white">{c.flag} {c.code}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
