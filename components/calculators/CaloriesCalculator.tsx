"use client";
import { useState } from "react";
import { Calculator } from "lucide-react";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

const ACTIVITY_LEVELS = [
  { value: 1.2, label: "مستقر (لا رياضة)" },
  { value: 1.375, label: "نشاط خفيف (1-3 أيام/أسبوع)" },
  { value: 1.55, label: "نشاط معتدل (3-5 أيام/أسبوع)" },
  { value: 1.725, label: "نشاط عالٍ (6-7 أيام/أسبوع)" },
  { value: 1.9, label: "نشاط مكثف جداً" },
];

export default function CaloriesCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activity, setActivity] = useState(1.55);
  const [goal, setGoal] = useState<"maintain" | "lose" | "gain">("maintain");
  const [result, setResult] = useState<{ bmr: number; tdee: number; target: number } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight), h = parseFloat(height), a = parseFloat(age);
    if (!w || !h || !a) return;
    // Mifflin-St Jeor equation
    const bmr = gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = bmr * activity;
    const target = goal === "lose" ? tdee - 500 : goal === "gain" ? tdee + 500 : tdee;
    setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee), target: Math.round(target) });
    trackCalculatorUsed("calories", "health");
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {(["male","female"] as const).map((g) => (
          <button key={g} onClick={() => setGender(g)}
            className={`py-3 rounded-xl font-bold border-2 transition-all ${gender===g?"border-[#1E3A8A] bg-[#1E3A8A] text-white":"border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>
            {g==="male"?"👨 ذكر":"👩 أنثى"}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {[["الوزن (كجم)", weight, setWeight,"70"],["الطول (سم)", height, setHeight,"170"],["العمر (سنة)", age, setAge,"30"]].map(([l,v,s,p])=>(
          <div key={l as string}>
            <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">{l}</label>
            <input type="number" value={v as string} onChange={(e) => (s as (v:string)=>void)(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
              placeholder={p as string} min="0" />
          </div>
        ))}
      </div>
      <div>
        <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-2">مستوى النشاط</label>
        <select value={activity} onChange={(e) => setActivity(parseFloat(e.target.value))}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white">
          {ACTIVITY_LEVELS.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-2">الهدف</label>
        <div className="grid grid-cols-3 gap-2">
          {([["maintain","المحافظة على الوزن"],["lose","خسارة الوزن"],["gain","زيادة الوزن"]] as const).map(([v,l])=>(
            <button key={v} onClick={() => setGoal(v)}
              className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${goal===v?"border-[#1E3A8A] bg-[#1E3A8A] text-white":"border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>{l}</button>
          ))}
        </div>
      </div>
      <button onClick={calculate} className="w-full flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 rounded-xl transition-colors">
        <Calculator className="h-5 w-5" /> احسب السعرات
      </button>
      {result && (
        <div className="space-y-3">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white text-center">
            <p className="text-orange-100 text-sm mb-1">السعرات الحرارية المستهدفة يومياً</p>
            <p className="text-5xl font-black">{result.target.toLocaleString("ar-EG")}</p>
            <p className="text-orange-100">سعرة حرارية</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 text-center">
              <p className="text-xs text-gray-500 mb-1">معدل الأيض الأساسي (BMR)</p>
              <p className="text-xl font-black text-[#1E293B] dark:text-white">{result.bmr.toLocaleString("ar-EG")}</p>
              <p className="text-xs text-gray-400">سعرة/يوم</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 text-center">
              <p className="text-xs text-gray-500 mb-1">إجمالي الإنفاق اليومي (TDEE)</p>
              <p className="text-xl font-black text-[#1E293B] dark:text-white">{result.tdee.toLocaleString("ar-EG")}</p>
              <p className="text-xs text-gray-400">سعرة/يوم</p>
            </div>
          </div>
          {goal !== "maintain" && (
            <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
              {goal==="lose"?"🎯 عجز 500 سعرة/يوم = خسارة ~0.5 كجم أسبوعياً":"🎯 فائض 500 سعرة/يوم = زيادة ~0.5 كجم أسبوعياً"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
