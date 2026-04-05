"use client";
import { useState } from "react";
import { Fuel } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

export default function FuelCalculator() {
  const [mode, setMode] = useState<"consumption"|"cost"|"range">("consumption");
  const [distance, setDistance] = useState("");
  const [fuel, setFuel] = useState("");
  const [pricePerLiter, setPricePerLiter] = useState("");
  const [tankSize, setTankSize] = useState("");
  const [result, setResult] = useState<{value:number;label:string;extra?:string}|null>(null);

  const calculate = () => {
    const d = parseFloat(distance), f = parseFloat(fuel), p = parseFloat(pricePerLiter), t = parseFloat(tankSize);
    if (mode==="consumption" && d && f) {
      const per100 = (f/d)*100;
      const extra = p ? `تكلفة كل 100 كم: ${formatNumber(per100*p,2)} ج` : undefined;
      setResult({value: Math.round(per100*100)/100, label:"لتر / 100 كم", extra});
    } else if (mode==="cost" && d && f && p) {
      const cost = (f/d)*d*p; // total trip cost
      const costPer100 = (f/100)*p;
      setResult({value: Math.round((d/100)*(f/d)*100*p)/100, label: "تكلفة الرحلة (جنيه)", extra:`تكلفة 100 كم: ${formatNumber(costPer100,2)} ج`});
    } else if (mode==="range" && t && f && d) {
      const consump = f/d; // L per km
      const range = t/consump;
      setResult({value: Math.round(range), label:"كم يمكن قطعه بخزان كامل (كم)"});
    }
    trackCalculatorUsed("fuel", "tools");
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-2">
        {([["consumption","استهلاك الوقود"],["cost","تكلفة الرحلة"],["range","المسافة بخزان"]] as const).map(([v,l]) => (
          <button key={v} onClick={() => setMode(v)}
            className={`py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${mode===v?"border-[#1E3A8A] bg-[#1E3A8A] text-white":"border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>{l}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {[["المسافة (كم)", distance, setDistance,"100"],
          ["الوقود المستهلك (لتر)", fuel, setFuel,"8"],
          mode!=="range" && ["سعر اللتر", pricePerLiter, setPricePerLiter,"12"],
          mode==="range" && ["حجم الخزان (لتر)", tankSize, setTankSize,"50"],
        ].filter(Boolean).map((f) => {
          const [l,v,s,p] = f as [string,string,(v:string)=>void,string];
          return (
            <div key={l}>
              <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">{l}</label>
              <input type="number" value={v} onChange={(e) => s(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
                placeholder={p} min="0" />
            </div>
          );
        })}
      </div>
      <button onClick={calculate} className="w-full flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 rounded-xl transition-colors">
        <Fuel className="h-5 w-5" /> احسب
      </button>
      {result && (
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white text-center">
          <p className="text-orange-100 text-sm mb-2">⛽ النتيجة</p>
          <p className="text-5xl font-black mb-1">{result.value}</p>
          <p className="text-orange-100">{result.label}</p>
          {result.extra && <p className="text-orange-200 text-sm mt-2">{result.extra}</p>}
        </div>
      )}
    </div>
  );
}
