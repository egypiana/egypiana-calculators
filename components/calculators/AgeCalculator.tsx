"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { calculateAge, formatArabicDate } from "@/lib/utils";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  nextBirthdayDays: number;
  birthDayName: string;
  ageTodayArabic: string;
}

const ARABIC_DAYS = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [referenceDate, setReferenceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [result, setResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    if (!birthDate) { setError("يرجى إدخال تاريخ الميلاد."); return; }

    const birth = new Date(birthDate);
    const ref = referenceDate ? new Date(referenceDate) : new Date();

    if (birth > ref) { setError("تاريخ الميلاد يجب أن يكون قبل تاريخ الحساب."); return; }
    if (birth.getFullYear() < 1900) { setError("يرجى إدخال تاريخ ميلاد صحيح."); return; }

    const { years, months, days, totalDays } = calculateAge(birth, ref);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;

    // Next birthday
    const nextBirthday = new Date(birth);
    nextBirthday.setFullYear(ref.getFullYear());
    if (nextBirthday <= ref) nextBirthday.setFullYear(ref.getFullYear() + 1);
    const nextBirthdayDays = Math.ceil(
      (nextBirthday.getTime() - ref.getTime()) / (1000 * 60 * 60 * 24)
    );

    const birthDayName = ARABIC_DAYS[birth.getDay()];
    const ageTodayArabic = `${years} سنة و${months} شهراً و${days} يوماً`;

    setResult({ years, months, days, totalDays, totalWeeks, totalMonths, nextBirthdayDays, birthDayName, ageTodayArabic });
    trackCalculatorUsed("age", "tools");
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="birthDate" className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">
            تاريخ الميلاد
          </label>
          <input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="refDate" className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">
            تاريخ الحساب (اتركه فارغاً لليوم)
          </label>
          <input
            id="refDate"
            type="date"
            value={referenceDate}
            onChange={(e) => setReferenceDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
          />
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-xl">{error}</p>
      )}

      <button
        onClick={calculate}
        className="w-full flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 px-6 rounded-xl transition-colors"
      >
        <Calendar className="h-5 w-5" />
        احسب العمر
      </button>

      {result && (
        <div className="space-y-4">
          {/* Main result */}
          <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1e40af] rounded-2xl p-6 text-white text-center">
            <p className="text-sm text-blue-200 mb-2">عمرك هو</p>
            <div className="flex justify-center gap-4 mb-3">
              {[
                { val: result.years, label: "سنة" },
                { val: result.months, label: "شهر" },
                { val: result.days, label: "يوم" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="text-4xl font-black">{item.val}</p>
                  <p className="text-blue-200 text-sm">{item.label}</p>
                </div>
              ))}
            </div>
            <p className="text-blue-100 text-sm">{result.ageTodayArabic}</p>
          </div>

          {/* Detail Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "إجمالي الأيام", value: result.totalDays.toLocaleString("ar-EG"), icon: "📅" },
              { label: "إجمالي الأسابيع", value: result.totalWeeks.toLocaleString("ar-EG"), icon: "🗓️" },
              { label: "إجمالي الأشهر", value: result.totalMonths.toLocaleString("ar-EG"), icon: "📆" },
              { label: "يوم الميلاد", value: result.birthDayName, icon: "🎂" },
              {
                label: "أيام لعيد ميلادك",
                value: result.nextBirthdayDays === 0 ? "اليوم! 🎉" : `${result.nextBirthdayDays} يوم`,
                icon: "🎁"
              },
            ].map((card) => (
              <div key={card.label} className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700 text-center">
                <p className="text-2xl mb-1">{card.icon}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{card.label}</p>
                <p className="font-bold text-[#1E293B] dark:text-white text-sm">{card.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
