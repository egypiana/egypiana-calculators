"use client";
import { useState } from "react";
import { Calculator } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [frequency, setFrequency] = useState("12");
  const [monthlyContrib, setMonthlyContrib] = useState("0");
  const [result, setResult] = useState<{ finalAmount: number; totalInterest: number; totalContribs: number; yearlyData: Array<{ year: number; balance: number }> } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal), r = parseFloat(rate) / 100, n = parseInt(frequency), t = parseFloat(years), mc = parseFloat(monthlyContrib || "0");
    if (!p || !r || !t) return;
    const rPerPeriod = r / n;
    const periods = n * t;
    // FV of principal
    const fvPrincipal = p * Math.pow(1 + rPerPeriod, periods);
    // FV of monthly contributions (annuity)
    const periodsPerMonth = n / 12;
    const fvContribs = mc > 0 ? mc * ((Math.pow(1 + r / 12, t * 12) - 1) / (r / 12)) : 0;
    const finalAmount = fvPrincipal + fvContribs;
    const totalContribs = p + mc * t * 12;
    const totalInterest = finalAmount - totalContribs;
    const yearlyData = Array.from({ length: Math.min(Math.ceil(t), 30) }, (_, i) => {
      const yr = i + 1;
      const bal = p * Math.pow(1 + rPerPeriod, n * yr) + (mc > 0 ? mc * ((Math.pow(1 + r / 12, yr * 12) - 1) / (r / 12)) : 0);
      return { year: yr, balance: Math.round(bal) };
    });
    setResult({ finalAmount, totalInterest, totalContribs, yearlyData });
    trackCalculatorUsed("compound-interest", "financial");
  };

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { label: "رأس المال الأولي", value: principal, set: setPrincipal, placeholder: "10000" },
          { label: "معدل الفائدة السنوي (%)", value: rate, set: setRate, placeholder: "8" },
          { label: "مدة الاستثمار (سنوات)", value: years, set: setYears, placeholder: "10" },
          { label: "إضافة شهرية (اختياري)", value: monthlyContrib, set: setMonthlyContrib, placeholder: "0" },
        ].map((f) => (
          <div key={f.label}>
            <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">{f.label}</label>
            <input type="number" value={f.value} onChange={(e) => f.set(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
              placeholder={f.placeholder} min="0" />
          </div>
        ))}
      </div>
      <div>
        <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-2">تكرار الفائدة</label>
        <div className="grid grid-cols-4 gap-2">
          {[["1","سنوياً"],["4","ربعياً"],["12","شهرياً"],["365","يومياً"]].map(([v,l])=>(
            <button key={v} onClick={() => setFrequency(v)}
              className={`py-2 rounded-xl text-xs font-bold border-2 transition-all ${frequency===v?"border-[#1E3A8A] bg-[#1E3A8A] text-white":"border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>{l}</button>
          ))}
        </div>
      </div>
      <button onClick={calculate} className="w-full flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 rounded-xl transition-colors">
        <Calculator className="h-5 w-5" /> احسب الفائدة المركبة
      </button>
      {result && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#1E3A8A] rounded-2xl p-4 text-white text-center"><p className="text-xs text-blue-200 mb-1">القيمة النهائية</p><p className="text-lg font-black">{formatNumber(result.finalAmount, 0)}</p></div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-4 text-center border border-green-200 dark:border-green-700"><p className="text-xs text-green-600 mb-1">إجمالي الأرباح</p><p className="text-lg font-black text-[#10B981]">{formatNumber(result.totalInterest, 0)}</p></div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center border border-gray-100 dark:border-gray-700"><p className="text-xs text-gray-500 mb-1">إجمالي الإيداعات</p><p className="text-lg font-black text-[#1E293B] dark:text-white">{formatNumber(result.totalContribs, 0)}</p></div>
          </div>
          {result.yearlyData.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 max-h-48">
              <table className="w-full text-sm" dir="rtl">
                <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0"><tr><th className="px-3 py-2 text-right font-semibold text-[#1E293B] dark:text-white">السنة</th><th className="px-3 py-2 text-right font-semibold text-[#1E293B] dark:text-white">الرصيد</th></tr></thead>
                <tbody>{result.yearlyData.map((r,i)=><tr key={r.year} className={i%2===0?"bg-white dark:bg-gray-800":"bg-gray-50 dark:bg-gray-700"}><td className="px-3 py-2">{r.year}</td><td className="px-3 py-2 font-medium text-[#10B981]">{formatNumber(r.balance, 0)}</td></tr>)}</tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
