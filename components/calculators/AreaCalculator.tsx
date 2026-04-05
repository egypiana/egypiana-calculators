"use client";
import { useState } from "react";
import { formatNumber } from "@/lib/utils";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

type Shape = "rectangle" | "square" | "circle" | "triangle" | "trapezoid" | "parallelogram";

const SHAPES: { key: Shape; label: string; icon: string }[] = [
  { key: "rectangle", label: "مستطيل", icon: "▭" },
  { key: "square", label: "مربع", icon: "□" },
  { key: "circle", label: "دائرة", icon: "○" },
  { key: "triangle", label: "مثلث", icon: "△" },
  { key: "trapezoid", label: "شبه منحرف", icon: "⏢" },
  { key: "parallelogram", label: "متوازي أضلاع", icon: "▱" },
];

export default function AreaCalculator() {
  const [shape, setShape] = useState<Shape>("rectangle");
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ area: number; perimeter: number } | null>(null);

  const set = (k: string, v: string) => setInputs(p => ({ ...p, [k]: v }));
  const n = (k: string) => parseFloat(inputs[k] || "0");

  const calculate = () => {
    let area = 0, perimeter = 0;
    if (shape === "rectangle") {
      area = n("w") * n("h"); perimeter = 2 * (n("w") + n("h"));
    } else if (shape === "square") {
      area = n("a") * n("a"); perimeter = 4 * n("a");
    } else if (shape === "circle") {
      area = Math.PI * n("r") * n("r"); perimeter = 2 * Math.PI * n("r");
    } else if (shape === "triangle") {
      area = 0.5 * n("b") * n("h");
      const a = n("a1") || n("b"), b = n("b"), c = n("c1") || n("b");
      perimeter = a + b + c;
    } else if (shape === "trapezoid") {
      area = 0.5 * (n("a") + n("b")) * n("h"); perimeter = n("a") + n("b") + n("c") + n("d");
    } else if (shape === "parallelogram") {
      area = n("b") * n("h"); perimeter = 2 * (n("b") + n("s"));
    }
    if (area > 0) { setResult({ area, perimeter }); trackCalculatorUsed("area-calculator", "tools"); }
  };

  const fieldSets: Record<Shape, { key: string; label: string }[]> = {
    rectangle: [{ key:"w", label:"العرض" },{ key:"h", label:"الارتفاع" }],
    square: [{ key:"a", label:"طول الضلع" }],
    circle: [{ key:"r", label:"نصف القطر" }],
    triangle: [{ key:"b", label:"القاعدة" },{ key:"h", label:"الارتفاع" },{ key:"a1", label:"الضلع أ (للمحيط)" },{ key:"c1", label:"الضلع ج (للمحيط)" }],
    trapezoid: [{ key:"a", label:"القاعدة الكبرى" },{ key:"b", label:"القاعدة الصغرى" },{ key:"h", label:"الارتفاع" },{ key:"c", label:"الضلع ج" },{ key:"d", label:"الضلع د" }],
    parallelogram: [{ key:"b", label:"القاعدة" },{ key:"h", label:"الارتفاع" },{ key:"s", label:"الضلع المائل" }],
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-2">
        {SHAPES.map(s => (
          <button key={s.key} onClick={() => { setShape(s.key); setInputs({}); setResult(null); }}
            className={`py-3 rounded-xl font-bold border-2 transition-all text-sm ${shape===s.key?"border-[#1E3A8A] bg-[#1E3A8A] text-white":"border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>
            <span className="block text-lg">{s.icon}</span>{s.label}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {fieldSets[shape].map(f => (
          <div key={f.key}>
            <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">{f.label}</label>
            <input type="number" value={inputs[f.key] || ""} onChange={e => set(f.key, e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
              placeholder="0" min="0" />
          </div>
        ))}
      </div>
      <button onClick={calculate} className="w-full bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 rounded-xl transition-colors">احسب</button>
      {result && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1e40af] rounded-2xl p-5 text-white text-center">
            <p className="text-blue-200 text-xs mb-1">المساحة</p>
            <p className="text-3xl font-black">{formatNumber(result.area, 4)}</p>
            <p className="text-blue-200 text-xs mt-1">وحدة²</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white text-center">
            <p className="text-green-100 text-xs mb-1">المحيط</p>
            <p className="text-3xl font-black">{formatNumber(result.perimeter, 4)}</p>
            <p className="text-green-100 text-xs mt-1">وحدة</p>
          </div>
        </div>
      )}
    </div>
  );
}
