"use client";
import { useState } from "react";
import { Droplets } from "lucide-react";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState<"low"|"moderate"|"high">("moderate");
  const [climate, setClimate] = useState<"cool"|"normal"|"hot">("normal");
  const [result, setResult] = useState<{liters:number;glasses:number;ml:number}|null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    if (!w || w<=0) return;
    let base = w * 35; // 35ml per kg baseline
    if (activity==="moderate") base *= 1.15;
    if (activity==="high") base *= 1.3;
    if (climate==="normal") base *= 1.05;
    if (climate==="hot") base *= 1.2;
    const ml = Math.round(base);
    setResult({ ml, liters: Math.round(ml/100)/10, glasses: Math.round(ml/250) });
    trackCalculatorUsed("water-intake", "health");
  };

  const glasses = result ? Array.from({length: Math.min(result.glasses, 12)}) : [];

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">الوزن (كيلوجرام)</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right text-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
          placeholder="70" min="0" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-2">مستوى النشاط البدني</label>
        <div className="grid grid-cols-3 gap-2">
          {([["low","🪑 منخفض"],["moderate","🚶 معتدل"],["high","🏃 عالٍ"]] as const).map(([v,l])=>(
            <button key={v} onClick={() => setActivity(v)}
              className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${activity===v?"border-[#1E3A8A] bg-[#1E3A8A] text-white":"border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>{l}</button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-2">المناخ</label>
        <div className="grid grid-cols-3 gap-2">
          {([["cool","❄️ بارد"],["normal","🌤️ معتدل"],["hot","☀️ حار"]] as const).map(([v,l])=>(
            <button key={v} onClick={() => setClimate(v)}
              className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${climate===v?"border-[#1E3A8A] bg-[#1E3A8A] text-white":"border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>{l}</button>
          ))}
        </div>
      </div>
      <button onClick={calculate} className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors">
        <Droplets className="h-5 w-5" /> احسب كمية الماء
      </button>
      {result && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 text-white text-center">
            <p className="text-blue-100 text-sm mb-2">💧 احتياجك اليومي من الماء</p>
            <p className="text-5xl font-black">{result.liters}</p>
            <p className="text-blue-100 mt-1">لتر يومياً ({result.ml} مل = {result.glasses} كوب)</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4">
            <p className="text-sm font-bold text-[#1E293B] dark:text-white mb-3">الأكواب اليومية ({glasses.length}/12)</p>
            <div className="flex flex-wrap gap-2">
              {Array.from({length: 12}).map((_,i) => (
                <span key={i} className={`text-2xl transition-all ${i < (result?.glasses ?? 0) ? "opacity-100" : "opacity-20"}`}>💧</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
