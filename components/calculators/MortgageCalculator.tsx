"use client";
import { useState } from "react";
import { formatNumber } from "@/lib/utils";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [downPct, setDownPct] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("25");
  const [result, setResult] = useState<{
    monthly: number; totalPaid: number; totalInterest: number;
    principal: number; ltv: number;
  } | null>(null);

  const handlePriceChange = (v: string) => {
    setHomePrice(v);
    const price = parseFloat(v);
    const pct = parseFloat(downPct);
    if (price && pct) setDownPayment(String(Math.round(price * pct / 100)));
  };

  const handlePctChange = (v: string) => {
    setDownPct(v);
    const price = parseFloat(homePrice);
    const pct = parseFloat(v);
    if (price && pct) setDownPayment(String(Math.round(price * pct / 100)));
  };

  const handleDownChange = (v: string) => {
    setDownPayment(v);
    const price = parseFloat(homePrice);
    const down = parseFloat(v);
    if (price && down) setDownPct(String(Math.round(down / price * 100)));
  };

  const calculate = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment) || 0;
    const annualRate = parseFloat(rate);
    const numYears = parseInt(years);
    if (!price || !annualRate || !numYears) return;
    const principal = price - down;
    const monthlyRate = annualRate / 100 / 12;
    const n = numYears * 12;
    const monthly = monthlyRate === 0
      ? principal / n
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const totalPaid = monthly * n;
    setResult({
      monthly,
      totalPaid,
      totalInterest: totalPaid - principal,
      principal,
      ltv: (principal / price) * 100,
    });
    trackCalculatorUsed("mortgage", "financial");
  };

  const quickYears = ["10","15","20","25","30"];

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">سعر العقار</label>
          <input type="number" value={homePrice} onChange={e => handlePriceChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
            placeholder="500,000" min="0" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">الدفعة الأولى</label>
          <div className="flex gap-2">
            <input type="number" value={downPayment} onChange={e => handleDownChange(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
              placeholder="100,000" min="0" />
            <div className="relative">
              <input type="number" value={downPct} onChange={e => handlePctChange(e.target.value)}
                className="w-20 px-2 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
                placeholder="20" min="0" max="100" />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">معدل الفائدة السنوي %</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
            placeholder="5.5" min="0" step="0.1" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">مدة القرض (سنوات)</label>
          <select value={years} onChange={e => setYears(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white">
            {quickYears.map(y => <option key={y} value={y}>{y} سنة</option>)}
          </select>
        </div>
      </div>
      <button onClick={calculate} className="w-full bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 rounded-xl transition-colors">
        احسب القسط الشهري
      </button>
      {result && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1e40af] rounded-2xl p-6 text-white text-center">
            <p className="text-blue-200 text-sm mb-1">القسط الشهري</p>
            <p className="text-5xl font-black mb-1" dir="ltr">{formatNumber(result.monthly, 0)}</p>
            <p className="text-blue-200 text-sm">وحدة العملة</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              {label:"قيمة القرض",value:formatNumber(result.principal,0),color:"text-[#1E3A8A] dark:text-blue-400"},
              {label:"نسبة التمويل (LTV)",value:`${formatNumber(result.ltv,1)}%`,color:"text-purple-600 dark:text-purple-400"},
              {label:"إجمالي المدفوعات",value:formatNumber(result.totalPaid,0),color:"text-orange-600 dark:text-orange-400"},
              {label:"إجمالي الفوائد",value:formatNumber(result.totalInterest,0),color:"text-red-600 dark:text-red-400"},
            ].map(({label,value,color}) => (
              <div key={label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
                <p className={`text-lg font-black ${color}`}>{value}</p>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-[#1E293B] dark:text-white">توزيع المدفوعات</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
              <div className="h-4 rounded-full bg-gradient-to-r from-[#1E3A8A] to-red-500"
                style={{width:`${(result.totalInterest / result.totalPaid * 100).toFixed(1)}%`}} />
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-[#1E3A8A] dark:text-blue-300">الأصل {formatNumber(result.principal/result.totalPaid*100,0)}%</span>
              <span className="text-red-500">الفوائد {formatNumber(result.totalInterest/result.totalPaid*100,0)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
