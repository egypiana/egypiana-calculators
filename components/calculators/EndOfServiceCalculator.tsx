"use client";

import { useState } from "react";
import { Calculator, AlertCircle } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

type Country = "saudi" | "uae" | "kuwait" | "egypt";
type TerminationType = "resignation" | "termination" | "retirement";

interface EOSResult {
  totalYears: number;
  remainingMonths: number;
  totalEntitlement: number;
  breakdown: string[];
  note?: string;
}

function calcSaudi(salary: number, months: number, type: TerminationType): EOSResult {
  const totalYears = Math.floor(months / 12);
  const remainingMonths = months % 12;
  let totalEntitlement = 0;
  const breakdown: string[] = [];

  if (type === "resignation") {
    if (totalYears < 2) {
      totalEntitlement = 0;
      breakdown.push("أقل من سنتين: لا يستحق مكافأة عند الاستقالة.");
    } else if (totalYears < 5) {
      totalEntitlement = salary * totalYears * (1 / 3);
      breakdown.push(`2-5 سنوات: ${totalYears} سنة × ${formatNumber(salary, 0)} × 1/3 = ${formatNumber(totalEntitlement, 0)} ريال`);
    } else if (totalYears < 10) {
      totalEntitlement = salary * totalYears * (2 / 3);
      breakdown.push(`5-10 سنوات: ${totalYears} سنة × ${formatNumber(salary, 0)} × 2/3 = ${formatNumber(totalEntitlement, 0)} ريال`);
    } else {
      totalEntitlement = salary * totalYears;
      breakdown.push(`10+ سنوات: ${totalYears} سنة × ${formatNumber(salary, 0)} × 1 = ${formatNumber(totalEntitlement, 0)} ريال`);
    }
  } else {
    // Termination or retirement: full entitlement
    let base5 = 0, after5 = 0;
    const years5 = Math.min(totalYears, 5);
    const yearsAfter5 = Math.max(0, totalYears - 5);
    base5 = salary * years5 * 0.5;
    after5 = salary * yearsAfter5 * 1;
    const fractional = (salary / 12) * remainingMonths * (totalYears >= 5 ? 1 : 0.5);
    totalEntitlement = base5 + after5 + fractional;
    if (years5 > 0) breakdown.push(`أول 5 سنوات: ${years5} × ${formatNumber(salary, 0)} × 0.5 = ${formatNumber(base5, 0)}`);
    if (yearsAfter5 > 0) breakdown.push(`بعد 5 سنوات: ${yearsAfter5} × ${formatNumber(salary, 0)} × 1 = ${formatNumber(after5, 0)}`);
    if (remainingMonths > 0) breakdown.push(`الأشهر المتبقية: ${remainingMonths} × (${formatNumber(salary, 0)}/12) = ${formatNumber(fractional, 0)}`);
  }

  return { totalYears, remainingMonths, totalEntitlement, breakdown };
}

function calcUAE(salary: number, months: number, type: TerminationType): EOSResult {
  const totalYears = Math.floor(months / 12);
  const remainingMonths = months % 12;
  let totalEntitlement = 0;
  const breakdown: string[] = [];

  if (type === "resignation" && totalYears < 1) {
    return { totalYears, remainingMonths, totalEntitlement: 0, breakdown: ["أقل من سنة: لا تستحق مكافأة."] };
  }

  const dailySalary = salary / 30;
  let years1to5 = 0, years5plus = 0;
  const y1 = Math.min(totalYears, 5);
  const y2 = Math.max(0, totalYears - 5);
  const fraction = remainingMonths / 12;

  if (type === "resignation") {
    if (totalYears <= 3) {
      years1to5 = dailySalary * 21 * y1 * (1 / 3);
      breakdown.push(`1-3 سنوات عند الاستقالة: 21 يوم/سنة × 1/3 = ${formatNumber(years1to5, 0)} درهم`);
    } else if (totalYears <= 5) {
      years1to5 = dailySalary * 21 * y1 * (2 / 3);
      breakdown.push(`3-5 سنوات عند الاستقالة: 21 يوم/سنة × 2/3 = ${formatNumber(years1to5, 0)} درهم`);
    } else {
      years1to5 = dailySalary * 21 * 5;
      years5plus = dailySalary * 30 * y2;
      breakdown.push(`أول 5 سنوات: 21 يوم × 5 = ${formatNumber(years1to5, 0)} درهم`);
      if (y2 > 0) breakdown.push(`ما بعد 5 سنوات: 30 يوم × ${y2} = ${formatNumber(years5plus, 0)} درهم`);
    }
  } else {
    years1to5 = dailySalary * 21 * y1;
    years5plus = dailySalary * 30 * y2;
    if (y1 > 0) breakdown.push(`أول 5 سنوات: 21 يوم × ${y1} = ${formatNumber(years1to5, 0)} درهم`);
    if (y2 > 0) breakdown.push(`ما بعد 5 سنوات: 30 يوم × ${y2} = ${formatNumber(years5plus, 0)} درهم`);
  }

  const fractional = dailySalary * 21 * fraction;
  if (remainingMonths > 0) breakdown.push(`كسور السنة: ${formatNumber(fractional, 0)} درهم`);
  totalEntitlement = years1to5 + years5plus + fractional;

  return { totalYears, remainingMonths, totalEntitlement, breakdown, note: "المبالغ بالدرهم الإماراتي" };
}

function calcEgypt(salary: number, months: number, type: TerminationType): EOSResult {
  const totalYears = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const monthlyEntitlement = salary; // 1 month per year (rough)
  const totalEntitlement = (totalYears + remainingMonths / 12) * monthlyEntitlement;
  const breakdown = [
    `${totalYears} سنة + ${remainingMonths} شهر × ${formatNumber(salary, 0)} جنيه = ${formatNumber(totalEntitlement, 0)} جنيه`,
    "ملاحظة: يُحسب وفق قانون العمل المصري رقم 12 لسنة 2003.",
  ];
  return { totalYears, remainingMonths, totalEntitlement, breakdown, note: "المبلغ بالجنيه المصري" };
}

export default function EndOfServiceCalculator() {
  const [country, setCountry] = useState<Country>("saudi");
  const [salary, setSalary] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
  const [termType, setTermType] = useState<TerminationType>("termination");
  const [result, setResult] = useState<EOSResult | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    const sal = parseFloat(salary);
    if (isNaN(sal) || sal <= 0) { setError("يرجى إدخال الراتب الأساسي."); return; }
    if (!startDate || !endDate) { setError("يرجى إدخال تاريخي البداية والنهاية."); return; }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start >= end) { setError("تاريخ البداية يجب أن يكون قبل تاريخ الانتهاء."); return; }

    const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    if (totalMonths < 1) { setError("مدة الخدمة يجب أن تكون شهراً كاملاً على الأقل."); return; }

    let res: EOSResult;
    if (country === "saudi") res = calcSaudi(sal, totalMonths, termType);
    else if (country === "uae") res = calcUAE(sal, totalMonths, termType);
    else res = calcEgypt(sal, totalMonths, termType);

    setResult(res);
    trackCalculatorUsed("end-of-service", "financial");
  };

  const COUNTRIES: Array<{ value: Country; label: string; flag: string }> = [
    { value: "saudi", label: "المملكة العربية السعودية", flag: "🇸🇦" },
    { value: "uae", label: "الإمارات العربية المتحدة", flag: "🇦🇪" },
    { value: "kuwait", label: "الكويت", flag: "🇰🇼" },
    { value: "egypt", label: "مصر", flag: "🇪🇬" },
  ];

  return (
    <div className="space-y-6">
      {/* Country */}
      <div>
        <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-2">الدولة</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {COUNTRIES.map((c) => (
            <button key={c.value} onClick={() => setCountry(c.value)}
              className={`py-2.5 px-2 rounded-xl text-sm font-semibold border-2 transition-all ${country === c.value ? "border-[#1E3A8A] bg-[#1E3A8A] text-white" : "border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-[#1E3A8A]"}`}>
              <span className="block text-xl mb-0.5">{c.flag}</span>
              <span className="text-xs">{c.label.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Termination type */}
      <div>
        <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-2">سبب انتهاء الخدمة</label>
        <div className="grid grid-cols-3 gap-2">
          {([["resignation", "استقالة"], ["termination", "إنهاء من صاحب العمل"], ["retirement", "تقاعد"]] as const).map(([v, l]) => (
            <button key={v} onClick={() => setTermType(v)}
              className={`py-2.5 rounded-xl text-xs font-semibold border-2 transition-all ${termType === v ? "border-[#1E3A8A] bg-[#1E3A8A] text-white" : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">الراتب الأساسي</label>
          <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
            placeholder="5000" min="0" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">تاريخ بداية الخدمة</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">تاريخ نهاية الخدمة</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white" />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-xl flex items-center gap-2"><AlertCircle className="h-4 w-4" />{error}</p>}

      <button onClick={calculate} className="w-full flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 px-6 rounded-xl transition-colors">
        <Calculator className="h-5 w-5" />
        احسب مكافأة نهاية الخدمة
      </button>

      {result && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl p-6 text-white text-center">
            <p className="text-green-100 text-sm mb-1">مكافأة نهاية الخدمة</p>
            <p className="text-5xl font-black mb-2">{formatNumber(result.totalEntitlement, 0)}</p>
            <p className="text-green-100">{result.note ?? "ريال سعودي"}</p>
            <p className="text-green-100 text-sm mt-2">
              مدة الخدمة: {result.totalYears} سنة {result.remainingMonths > 0 ? `و ${result.remainingMonths} شهر` : ""}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4">
            <p className="font-bold text-[#1E293B] dark:text-white text-sm mb-3">تفصيل الحساب</p>
            <ul className="space-y-2">
              {result.breakdown.map((line, i) => (
                <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                  <span className="text-[#10B981] font-bold">•</span> {line}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <strong>تنبيه:</strong> هذه الحاسبة توفر تقديراً استرشادياً. قد تختلف النتيجة الفعلية بحسب العقد والبدلات وقرارات المحاكم العمالية.
          </p>
        </div>
      )}
    </div>
  );
}
