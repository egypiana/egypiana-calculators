"use client";
import { useState } from "react";
import { Baby } from "lucide-react";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

const TRIMESTERS = [
  { name: "الثلث الأول", weeks: "1-12", desc: "تكوين الأعضاء الرئيسية" },
  { name: "الثلث الثاني", weeks: "13-26", desc: "حركة الجنين وتطوره السريع" },
  { name: "الثلث الثالث", weeks: "27-40", desc: "اكتمال النمو والاستعداد للولادة" },
];

export default function PregnancyCalculator() {
  const [method, setMethod] = useState<"lmp" | "conception">("lmp");
  const [date, setDate] = useState("");
  const [result, setResult] = useState<{
    dueDate: string; weeksPregnant: number; daysPregnant: number;
    trimester: number; remainingDays: number; milestones: Array<{label: string; date: string; passed: boolean}>;
  } | null>(null);

  const calculate = () => {
    if (!date) return;
    const inputDate = new Date(date);
    const today = new Date();
    let lmpDate: Date;
    if (method === "lmp") lmpDate = inputDate;
    else lmpDate = new Date(inputDate.getTime() - 14 * 24 * 60 * 60 * 1000); // subtract 2 weeks

    const dueDate = new Date(lmpDate.getTime() + 280 * 24 * 60 * 60 * 1000); // +40 weeks
    const daysPregnant = Math.floor((today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24));
    const weeksPregnant = Math.floor(daysPregnant / 7);
    const trimester = weeksPregnant <= 12 ? 1 : weeksPregnant <= 26 ? 2 : 3;
    const remainingDays = Math.max(0, Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

    const fmt = (d: Date) => d.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
    const weekDate = (w: number) => new Date(lmpDate.getTime() + w * 7 * 24 * 60 * 60 * 1000);

    const milestones = [
      { label: "نهاية الثلث الأول (الأسبوع 12)", date: fmt(weekDate(12)), passed: weeksPregnant >= 12 },
      { label: "منتصف الحمل (الأسبوع 20)", date: fmt(weekDate(20)), passed: weeksPregnant >= 20 },
      { label: "الأسبوع 28 - بداية الثلث الثالث", date: fmt(weekDate(27)), passed: weeksPregnant >= 27 },
      { label: "الأسبوع 36 - الحمل مكتمل مبكراً", date: fmt(weekDate(36)), passed: weeksPregnant >= 36 },
      { label: "موعد الولادة المتوقع (الأسبوع 40)", date: fmt(dueDate), passed: weeksPregnant >= 40 },
    ];

    setResult({ dueDate: fmt(dueDate), weeksPregnant, daysPregnant, trimester, remainingDays, milestones });
    trackCalculatorUsed("pregnancy", "health");
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {(["lmp","conception"] as const).map((m) => (
          <button key={m} onClick={() => setMethod(m)}
            className={`py-3 rounded-xl font-bold border-2 transition-all text-sm ${method===m?"border-[#1E3A8A] bg-[#1E3A8A] text-white":"border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>
            {m==="lmp"?"آخر دورة شهرية":"تاريخ الإخصاب"}
          </button>
        ))}
      </div>
      <div>
        <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">
          {method==="lmp"?"تاريخ أول يوم من آخر دورة شهرية":"تاريخ الإخصاب المتوقع"}
        </label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white" />
      </div>
      <button onClick={calculate} className="w-full flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition-colors">
        <Baby className="h-5 w-5" /> احسب موعد الولادة
      </button>
      {result && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl p-6 text-white text-center">
            <p className="text-pink-100 text-sm mb-2">👶 الموعد المتوقع للولادة</p>
            <p className="text-2xl font-black mb-1">{result.dueDate}</p>
            <p className="text-pink-100">{result.remainingDays > 0 ? `بعد ${result.remainingDays} يوم` : "موعد الولادة قد حان!"}</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700 text-center">
              <p className="text-xs text-gray-500 mb-1">أسابيع الحمل</p>
              <p className="text-2xl font-black text-[#1E293B] dark:text-white">{result.weeksPregnant}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700 text-center">
              <p className="text-xs text-gray-500 mb-1">إجمالي الأيام</p>
              <p className="text-2xl font-black text-[#1E293B] dark:text-white">{result.daysPregnant}</p>
            </div>
            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-3 border border-pink-100 dark:border-pink-800 text-center">
              <p className="text-xs text-pink-500 mb-1">الثلث</p>
              <p className="text-2xl font-black text-pink-600">{result.trimester}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <p className="px-4 py-3 font-bold text-[#1E293B] dark:text-white border-b border-gray-100 dark:border-gray-700 text-sm">المراحل الرئيسية</p>
            <ul className="divide-y divide-gray-100 dark:divide-gray-700">
              {result.milestones.map((m, i) => (
                <li key={i} className="flex items-center gap-3 px-4 py-3">
                  <span className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${m.passed ? "bg-[#10B981] text-white" : "bg-gray-200 dark:bg-gray-600 text-gray-500"}`}>{m.passed ? "✓" : ""}</span>
                  <div className="flex-1"><p className={`text-sm font-medium ${m.passed ? "text-[#1E293B] dark:text-white" : "text-gray-500"}`}>{m.label}</p><p className="text-xs text-gray-400">{m.date}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
