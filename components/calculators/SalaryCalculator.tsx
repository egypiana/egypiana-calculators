"use client";
import { useState } from "react";
import { Calculator } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

export default function SalaryCalculator() {
  const [grossSalary, setGrossSalary] = useState("");
  const [country, setCountry] = useState<"egypt" | "saudi" | "uae">("egypt");
  const [result, setResult] = useState<{
    gross: number; socialInsurance: number; incomeTax: number; net: number; deductions: string[];
  } | null>(null);

  const calculate = () => {
    const gross = parseFloat(grossSalary);
    if (isNaN(gross) || gross <= 0) return;
    let socialInsurance = 0, incomeTax = 0;
    const deductions: string[] = [];

    if (country === "egypt") {
      // Egypt: Social insurance 11% employee share (up to 10,710 EGP ceiling as of 2024)
      const soCeiling = Math.min(gross, 10710);
      socialInsurance = soCeiling * 0.11;
      deductions.push(`تأمينات اجتماعية (11% حتى الحد الأقصى): ${formatNumber(socialInsurance, 2)} ج`);
      // Income tax Egypt 2024 brackets
      const taxable = gross - socialInsurance;
      const annual = taxable * 12;
      let annualTax = 0;
      if (annual > 600000) annualTax = (annual - 600000) * 0.27 + 600000 * 0.225;
      else if (annual > 400000) annualTax = (annual - 400000) * 0.225 + 167500;
      else if (annual > 200000) annualTax = (annual - 200000) * 0.225 + 77500;
      else if (annual > 120000) annualTax = (annual - 120000) * 0.22 + 60100;
      else if (annual > 40000) annualTax = (annual - 40000) * 0.10 + 2100;
      else if (annual > 21000) annualTax = (annual - 21000) * 0.025;
      // Deduct personal exemption 20,000 EGP annually
      incomeTax = Math.max(0, annualTax / 12);
      deductions.push(`ضريبة الدخل: ${formatNumber(incomeTax, 2)} ج`);
    } else if (country === "saudi") {
      socialInsurance = gross * 0.1; // GOSI 10%
      deductions.push(`التأمينات الاجتماعية (10%): ${formatNumber(socialInsurance, 2)} ريال`);
    } else {
      // UAE: No income tax, GPSSA 5% for nationals
      deductions.push("لا يوجد ضريبة دخل في الإمارات");
    }

    const net = gross - socialInsurance - incomeTax;
    setResult({ gross, socialInsurance, incomeTax, net, deductions });
    trackCalculatorUsed("salary", "financial");
  };

  const currencies: Record<string, string> = { egypt: "ج.م", saudi: "ريال", uae: "درهم" };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-2">
        {(["egypt", "saudi", "uae"] as const).map((c) => (
          <button key={c} onClick={() => setCountry(c)}
            className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${country === c ? "border-[#1E3A8A] bg-[#1E3A8A] text-white" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>
            {c === "egypt" ? "🇪🇬 مصر" : c === "saudi" ? "🇸🇦 السعودية" : "🇦🇪 الإمارات"}
          </button>
        ))}
      </div>
      <div>
        <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">الراتب الإجمالي الشهري ({currencies[country]})</label>
        <input type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right text-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
          placeholder="10000" min="0" />
      </div>
      <button onClick={calculate} className="w-full flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 rounded-xl transition-colors">
        <Calculator className="h-5 w-5" /> احسب الراتب الصافي
      </button>
      {result && (
        <div className="space-y-3">
          <div className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl p-6 text-white text-center">
            <p className="text-green-100 text-sm mb-1">الراتب الصافي</p>
            <p className="text-5xl font-black">{formatNumber(result.net, 0)}</p>
            <p className="text-green-100 text-sm mt-1">{currencies[country]} شهرياً</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <table className="w-full text-sm" dir="rtl">
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-700"><td className="px-4 py-3 text-gray-600 dark:text-gray-300">الراتب الإجمالي</td><td className="px-4 py-3 font-bold text-[#1E293B] dark:text-white text-left">{formatNumber(result.gross, 0)}</td></tr>
                {result.socialInsurance > 0 && <tr className="border-b border-gray-100 dark:border-gray-700"><td className="px-4 py-3 text-gray-600 dark:text-gray-300">التأمينات الاجتماعية</td><td className="px-4 py-3 font-bold text-red-500 text-left">- {formatNumber(result.socialInsurance, 0)}</td></tr>}
                {result.incomeTax > 0 && <tr className="border-b border-gray-100 dark:border-gray-700"><td className="px-4 py-3 text-gray-600 dark:text-gray-300">ضريبة الدخل</td><td className="px-4 py-3 font-bold text-red-500 text-left">- {formatNumber(result.incomeTax, 0)}</td></tr>}
                <tr className="bg-green-50 dark:bg-green-900/20"><td className="px-4 py-3 font-bold text-[#1E293B] dark:text-white">الراتب الصافي</td><td className="px-4 py-3 font-black text-[#10B981] text-left text-lg">{formatNumber(result.net, 0)}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
