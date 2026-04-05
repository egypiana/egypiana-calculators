"use client";
import { useState } from "react";
import { formatNumber } from "@/lib/utils";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

const ACTIVITY_LEVELS = [
  { key: "sedentary", label: "خامل (لا رياضة)", factor: 1.2 },
  { key: "light", label: "نشاط خفيف (1-3 أيام/أسبوع)", factor: 1.375 },
  { key: "moderate", label: "نشاط متوسط (3-5 أيام/أسبوع)", factor: 1.55 },
  { key: "active", label: "نشاط عالٍ (6-7 أيام/أسبوع)", factor: 1.725 },
  { key: "very_active", label: "رياضي محترف (مرتين يومياً)", factor: 1.9 },
];

export default function BMRCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("moderate");
  const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(age), w = parseFloat(weight), h = parseFloat(height);
    if (!a || !w || !h) return;
    // Mifflin-St Jeor
    const bmr = gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;
    const factor = ACTIVITY_LEVELS.find(l => l.key === activity)?.factor ?? 1.55;
    setResult({ bmr: Math.round(bmr), tdee: Math.round(bmr * factor) });
    trackCalculatorUsed("bmr", "health");
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-2">
        {(["male","female"] as const).map(g => (
          <button key={g} onClick={() => setGender(g)}
            className={`py-3 rounded-xl font-bold border-2 transition-all ${gender===g?"border-[#1E3A8A] bg-[#1E3A8A] text-white":"border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>
            {g === "male" ? "👨 ذكر" : "👩 أنثى"}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {([["العمر (سنة)", age, setAge, "25", "1"],
          ["الوزن (كجم)", weight, setWeight, "70", "0.1"],
          ["الطول (سم)", height, setHeight, "170", "1"],
        ] as [string, string, (v:string)=>void, string, string][]).map(([l, v, s, p, step]) => (
          <div key={l}>
            <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">{l}</label>
            <input type="number" value={v} onChange={e => s(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
              placeholder={p} min="0" step={step} />
          </div>
        ))}
      </div>
      <div>
        <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-2">مستوى النشاط البدني</label>
        <div className="space-y-2">
          {ACTIVITY_LEVELS.map(l => (
            <label key={l.key} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${activity===l.key?"border-[#1E3A8A] bg-blue-50 dark:bg-blue-900/20":"border-gray-200 dark:border-gray-600"}`}>
              <input type="radio" name="activity" value={l.key} checked={activity===l.key} onChange={() => setActivity(l.key)} className="accent-[#1E3A8A]" />
              <span className="text-sm text-[#1E293B] dark:text-white">{l.label}</span>
              <span className="text-xs text-gray-400 mr-auto">×{l.factor}</span>
            </label>
          ))}
        </div>
      </div>
      <button onClick={calculate} className="w-full bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 rounded-xl transition-colors">
        احسب معدل الأيض
      </button>
      {result && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-5 text-white text-center">
              <p className="text-purple-200 text-xs mb-1">معدل الأيض الأساسي</p>
              <p className="text-3xl font-black">{formatNumber(result.bmr, 0)}</p>
              <p className="text-purple-200 text-xs mt-1">سعرة / يوم (راحة)</p>
            </div>
            <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1e40af] rounded-2xl p-5 text-white text-center">
              <p className="text-blue-200 text-xs mb-1">السعرات اليومية (TDEE)</p>
              <p className="text-3xl font-black">{formatNumber(result.tdee, 0)}</p>
              <p className="text-blue-200 text-xs mt-1">سعرة / يوم (مع نشاط)</p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2">
            <p className="text-sm font-semibold text-[#1E293B] dark:text-white text-right">أهدافك الغذائية</p>
            {[
              {label:"إنقاص الوزن (−500 سعرة)", cal: result.tdee - 500, color:"text-green-600"},
              {label:"الحفاظ على الوزن", cal: result.tdee, color:"text-blue-600"},
              {label:"زيادة الوزن (+500 سعرة)", cal: result.tdee + 500, color:"text-orange-600"},
            ].map(({label, cal, color}) => (
              <div key={label} className="flex justify-between items-center">
                <span className={`font-bold text-sm ${color}`}>{formatNumber(cal, 0)} سعرة</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
