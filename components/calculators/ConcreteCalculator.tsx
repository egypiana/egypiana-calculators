"use client";
import { useState } from "react";
import { formatNumber } from "@/lib/utils";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

type Shape = "slab" | "column" | "footing" | "stairs";

export default function ConcreteCalculator() {
  const [shape, setShape] = useState<Shape>("slab");
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{
    volume: number; cement: number; sand: number; gravel: number; water: number; bags: number;
  } | null>(null);

  const set = (k: string, v: string) => setInputs(p => ({ ...p, [k]: v }));
  const n = (k: string) => parseFloat(inputs[k] || "0");

  const calculate = () => {
    let volume = 0;
    if (shape === "slab") volume = n("l") * n("w") * (n("t") / 100);
    else if (shape === "column") volume = Math.PI * Math.pow(n("d") / 200, 2) * n("h");
    else if (shape === "footing") volume = n("l") * n("w") * n("h");
    else if (shape === "stairs") volume = 0.5 * n("rise") * n("run") * n("width") * n("steps");
    if (volume <= 0) return;
    // Mix 1:2:3 (cement:sand:gravel) per 1m³
    const cement = volume * 320; // kg
    const sand = volume * 0.44; // m³
    const gravel = volume * 0.88; // m³
    const water = volume * 160; // liters
    const bags = Math.ceil(cement / 50);
    setResult({ volume, cement, sand, gravel, water, bags });
    trackCalculatorUsed("concrete-calculator", "tools");
  };

  const shapeForms: Record<Shape, { key: string; label: string; unit: string }[]> = {
    slab: [
      { key:"l", label:"الطول", unit:"متر" },
      { key:"w", label:"العرض", unit:"متر" },
      { key:"t", label:"السماكة", unit:"سم" },
    ],
    column: [
      { key:"d", label:"القطر", unit:"سم" },
      { key:"h", label:"الارتفاع", unit:"متر" },
    ],
    footing: [
      { key:"l", label:"الطول", unit:"متر" },
      { key:"w", label:"العرض", unit:"متر" },
      { key:"h", label:"الارتفاع/السماكة", unit:"متر" },
    ],
    stairs: [
      { key:"rise", label:"ارتفاع الدرجة", unit:"متر" },
      { key:"run", label:"عمق الدرجة", unit:"متر" },
      { key:"width", label:"عرض الدرج", unit:"متر" },
      { key:"steps", label:"عدد الدرجات", unit:"درجة" },
    ],
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {([["slab","بلاطة"],["column","عمود"],["footing","قاعدة"],["stairs","سلّم"]] as const).map(([v,l]) => (
          <button key={v} onClick={() => { setShape(v); setInputs({}); setResult(null); }}
            className={`py-2.5 rounded-xl font-bold border-2 text-sm transition-all ${shape===v?"border-[#1E3A8A] bg-[#1E3A8A] text-white":"border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>{l}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {shapeForms[shape].map(f => (
          <div key={f.key}>
            <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">{f.label} ({f.unit})</label>
            <input type="number" value={inputs[f.key] || ""} onChange={e => set(f.key, e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
              placeholder="0" min="0" />
          </div>
        ))}
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-500 dark:text-gray-400 text-right">
        نسبة الخلط المستخدمة: 1 أسمنت : 2 رمل : 3 زلط (مناسبة للمنشآت العادية)
      </div>
      <button onClick={calculate} className="w-full bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 rounded-xl transition-colors">احسب كميات الخرسانة</button>
      {result && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1e40af] rounded-2xl p-5 text-white text-center">
            <p className="text-blue-200 text-sm mb-1">حجم الخرسانة</p>
            <p className="text-4xl font-black">{formatNumber(result.volume, 3)}</p>
            <p className="text-blue-200">متر مكعب</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label:"كيس أسمنت 50كجم", value:`${result.bags} كيس`, sub:`${formatNumber(result.cement,0)} كجم`, color:"from-gray-500 to-gray-700" },
              { label:"رمل", value:`${formatNumber(result.sand,3)} م³`, sub:"", color:"from-yellow-500 to-amber-600" },
              { label:"زلط/حصى", value:`${formatNumber(result.gravel,3)} م³`, sub:"", color:"from-stone-500 to-stone-700" },
              { label:"ماء", value:`${formatNumber(result.water,0)} لتر`, sub:"", color:"from-blue-400 to-blue-600" },
            ].map(({ label, value, sub, color }) => (
              <div key={label} className={`bg-gradient-to-br ${color} rounded-xl p-4 text-white text-center`}>
                <p className="text-white/80 text-xs mb-1">{label}</p>
                <p className="text-xl font-black">{value}</p>
                {sub && <p className="text-white/70 text-xs">{sub}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
