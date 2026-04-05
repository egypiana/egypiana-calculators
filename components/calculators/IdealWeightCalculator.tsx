"use client";
import { useState } from "react";
import { Calculator } from "lucide-react";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

export default function IdealWeightCalculator() {
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState<"male"|"female">("male");
  const [result, setResult] = useState<{robinson:number;miller:number;devine:number;bmi:number;bmiMax:number}|null>(null);

  const calculate = () => {
    const h = parseFloat(height);
    if (!h || h < 100 || h > 250) return;
    const hIn = (h - 152.4) / 2.54; // inches over 5ft
    const hOver = Math.max(0, hIn);
    // Robinson formula
    const robinson = gender==="male" ? 52 + 1.9*hOver : 49 + 1.7*hOver;
    // Miller formula
    const miller = gender==="male" ? 56.2 + 1.41*hOver : 53.1 + 1.36*hOver;
    // Devine formula
    const devine = gender==="male" ? 50 + 2.3*hOver : 45.5 + 2.3*hOver;
    // BMI-based (18.5-24.9)
    const hm = h/100;
    const bmi = 18.5 * hm * hm;
    const bmiMax = 24.9 * hm * hm;
    setResult({ robinson: Math.round(robinson*10)/10, miller: Math.round(miller*10)/10, devine: Math.round(devine*10)/10, bmi: Math.round(bmi*10)/10, bmiMax: Math.round(bmiMax*10)/10 });
    trackCalculatorUsed("ideal-weight", "health");
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
      <div>
        <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">الطول (سنتيمتر)</label>
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right text-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
          placeholder="170" min="100" max="250" />
      </div>
      <button onClick={calculate} className="w-full flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 rounded-xl transition-colors">
        <Calculator className="h-5 w-5" /> احسب الوزن المثالي
      </button>
      {result && (
        <div className="space-y-3">
          <div className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl p-6 text-white text-center">
            <p className="text-green-100 text-sm mb-2">نطاق الوزن المثالي (بناءً على BMI)</p>
            <p className="text-4xl font-black">{result.bmi} – {result.bmiMax} كجم</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <table className="w-full text-sm" dir="rtl">
              <thead className="bg-gray-50 dark:bg-gray-700"><tr><th className="px-4 py-3 text-right font-bold text-[#1E293B] dark:text-white">المعادلة</th><th className="px-4 py-3 text-right font-bold text-[#1E293B] dark:text-white">الوزن المثالي</th></tr></thead>
              <tbody>
                {[["Robinson","robinson"],["Miller","miller"],["Devine","devine"]].map(([n,k],i) => (
                  <tr key={n} className={i%2===0?"bg-white dark:bg-gray-800":"bg-gray-50 dark:bg-gray-700"}>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">معادلة {n}</td>
                    <td className="px-4 py-3 font-bold text-[#1E3A8A] dark:text-blue-400">{result[k as keyof typeof result]} كجم</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
