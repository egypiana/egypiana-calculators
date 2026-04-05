"use client";
import { useState } from "react";
import { formatNumber } from "@/lib/utils";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

type Mode = "pct_of" | "what_pct" | "pct_change" | "add_pct" | "sub_pct";

export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("pct_of");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState<string|null>(null);

  const calculate = () => {
    const na = parseFloat(a), nb = parseFloat(b);
    let res = "";
    if (mode==="pct_of") res = `${formatNumber(na/100*nb,4)} (${na}% من ${nb})`;
    else if (mode==="what_pct") res = `${formatNumber(na/nb*100,4)}% (${na} من ${nb})`;
    else if (mode==="pct_change") res = `${formatNumber((nb-na)/na*100,2)}% (${na > nb ? "انخفاض" : "ارتفاع"})`;
    else if (mode==="add_pct") res = `${formatNumber(na*(1+nb/100),4)} (${na} + ${nb}%)`;
    else if (mode==="sub_pct") res = `${formatNumber(na*(1-nb/100),4)} (${na} - ${nb}%)`;
    setResult(res);
    trackCalculatorUsed("percentage", "math");
  };

  const modes: Array<[Mode, string, string, string, string]> = [
    ["pct_of","كم يساوي X% من Y؟","النسبة (%)","العدد","X% من Y"],
    ["what_pct","X كم بالمئة من Y؟","العدد X","العدد Y","نسبة X من Y"],
    ["pct_change","نسبة التغيير","القيمة الأولى","القيمة الجديدة","نسبة الزيادة/الانخفاض"],
    ["add_pct","X + Y%","العدد X","النسبة (%)","العدد بعد الزيادة"],
    ["sub_pct","X - Y% (خصم)","السعر الأصلي","نسبة الخصم (%)","السعر بعد الخصم"],
  ];

  const current = modes.find(m => m[0]===mode)!;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {modes.map(([v,l]) => (
          <button key={v} onClick={() => {setMode(v);setResult(null);}}
            className={`py-2.5 px-3 rounded-xl text-sm font-semibold border-2 transition-all text-right ${mode===v?"border-[#1E3A8A] bg-[#1E3A8A] text-white":"border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-[#1E3A8A]"}`}>{l}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {[["a",current[2],a,setA],["b",current[3],b,setB]].map(([id,label,val,setter]) => (
          <div key={id as string}>
            <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">{label}</label>
            <input type="number" value={val as string} onChange={(e) => (setter as (v:string)=>void)(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white" placeholder="0" />
          </div>
        ))}
      </div>
      <button onClick={calculate} className="w-full bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 rounded-xl transition-colors">احسب</button>
      {result && (
        <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1e40af] rounded-2xl p-6 text-white text-center">
          <p className="text-blue-200 text-sm mb-2">{current[4]}</p>
          <p className="text-3xl font-black" dir="ltr">{result}</p>
        </div>
      )}
    </div>
  );
}
