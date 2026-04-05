"use client";

import { useState } from "react";
import { Calculator, AlertCircle } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("");
  const [result, setResult] = useState<LoanResult | null>(null);
  const [error, setError] = useState("");
  const [showSchedule, setShowSchedule] = useState(false);

  const calculate = () => {
    setError("");
    const p = parseFloat(principal);
    const annualRate = parseFloat(rate);
    const n = parseInt(months);

    if (isNaN(p) || p <= 0) { setError("يرجى إدخال مبلغ القرض بشكل صحيح."); return; }
    if (isNaN(annualRate) || annualRate < 0) { setError("يرجى إدخال معدل الفائدة بشكل صحيح."); return; }
    if (isNaN(n) || n <= 0) { setError("يرجى إدخال مدة القرض بشكل صحيح."); return; }

    const monthlyRate = annualRate / 100 / 12;

    let monthlyPayment: number;
    if (monthlyRate === 0) {
      monthlyPayment = p / n;
    } else {
      monthlyPayment = (p * monthlyRate * Math.pow(1 + monthlyRate, n)) /
        (Math.pow(1 + monthlyRate, n) - 1);
    }

    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - p;

    // Amortization schedule (first 12 months + last month)
    const schedule = [];
    let balance = p;
    for (let m = 1; m <= n; m++) {
      const interest = balance * monthlyRate;
      const principalPaid = monthlyPayment - interest;
      balance = Math.max(0, balance - principalPaid);
      schedule.push({
        month: m,
        payment: monthlyPayment,
        principal: principalPaid,
        interest,
        balance,
      });
    }

    setResult({ monthlyPayment, totalPayment, totalInterest, schedule });
    trackCalculatorUsed("loan", "financial");
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { label: "مبلغ القرض", value: principal, setter: setPrincipal, placeholder: "100000", suffix: "جنيه", id: "principal" },
          { label: "معدل الفائدة السنوي (%)", value: rate, setter: setRate, placeholder: "12", suffix: "%", id: "rate" },
          { label: "مدة القرض (شهراً)", value: months, setter: setMonths, placeholder: "60", suffix: "شهر", id: "months" },
        ].map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">
              {field.label}
            </label>
            <div className="relative">
              <input
                id={field.id}
                type="number"
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white pr-14"
                placeholder={field.placeholder}
                min="0"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                {field.suffix}
              </span>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <button
        onClick={calculate}
        className="w-full flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 px-6 rounded-xl transition-colors"
      >
        <Calculator className="h-5 w-5" />
        احسب القسط الشهري
      </button>

      {result && (
        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#1E3A8A] rounded-2xl p-4 text-white text-center">
              <p className="text-xs text-blue-200 mb-1">القسط الشهري</p>
              <p className="text-xl font-black">{formatNumber(result.monthlyPayment, 0)}</p>
              <p className="text-xs text-blue-200">جنيه</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center border border-gray-100 dark:border-gray-700">
              <p className="text-xs text-gray-500 mb-1">إجمالي السداد</p>
              <p className="text-lg font-black text-[#1E293B] dark:text-white">{formatNumber(result.totalPayment, 0)}</p>
              <p className="text-xs text-gray-500">جنيه</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 text-center border border-red-100 dark:border-red-800">
              <p className="text-xs text-red-500 mb-1">إجمالي الفوائد</p>
              <p className="text-lg font-black text-[#EF4444]">{formatNumber(result.totalInterest, 0)}</p>
              <p className="text-xs text-red-500">جنيه</p>
            </div>
          </div>

          {/* Principal vs Interest bar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-sm font-semibold text-[#1E293B] dark:text-white mb-3">نسبة القرض مقابل الفوائد</p>
            <div className="flex rounded-full overflow-hidden h-5 mb-2">
              <div
                className="bg-[#1E3A8A] h-full transition-all"
                style={{ width: `${(parseFloat(principal) / result.totalPayment) * 100}%` }}
              />
              <div
                className="bg-[#EF4444] h-full transition-all"
                style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A] inline-block"></span>
                أصل القرض {((parseFloat(principal) / result.totalPayment) * 100).toFixed(0)}%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] inline-block"></span>
                الفوائد {((result.totalInterest / result.totalPayment) * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          {/* Amortization Table Toggle */}
          <button
            onClick={() => setShowSchedule(!showSchedule)}
            className="w-full py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {showSchedule ? "إخفاء" : "عرض"} جدول الأقساط التفصيلي
          </button>

          {showSchedule && (
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm" dir="rtl">
                <thead className="bg-[#1E3A8A] text-white">
                  <tr>
                    {["الشهر", "القسط", "الأصل", "الفائدة", "الرصيد المتبقي"].map((h) => (
                      <th key={h} className="px-3 py-2.5 text-right font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.slice(0, 24).map((row, i) => (
                    <tr key={row.month} className={i % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"}>
                      <td className="px-3 py-2 font-medium">{row.month}</td>
                      <td className="px-3 py-2">{formatNumber(row.payment, 0)}</td>
                      <td className="px-3 py-2 text-[#10B981]">{formatNumber(row.principal, 0)}</td>
                      <td className="px-3 py-2 text-[#EF4444]">{formatNumber(row.interest, 0)}</td>
                      <td className="px-3 py-2">{formatNumber(row.balance, 0)}</td>
                    </tr>
                  ))}
                  {result.schedule.length > 24 && (
                    <tr className="bg-gray-100 dark:bg-gray-700 text-center">
                      <td colSpan={5} className="py-2 text-gray-500 text-xs">
                        يُعرض أول 24 شهراً. إجمالي {result.schedule.length} شهراً.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
