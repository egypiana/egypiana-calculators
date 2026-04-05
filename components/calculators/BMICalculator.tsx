"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

interface BMIResult {
  bmi: number;
  category: string;
  categoryEn: string;
  color: string;
  description: string;
  idealWeightMin: number;
  idealWeightMax: number;
}

function getBMICategory(bmi: number): Omit<BMIResult, "bmi" | "idealWeightMin" | "idealWeightMax"> {
  if (bmi < 18.5) {
    return {
      category: "نقص في الوزن",
      categoryEn: "Underweight",
      color: "#3B82F6",
      description: "وزنك أقل من الطبيعي. يُنصح باستشارة طبيب أو اختصاصي تغذية.",
    };
  } else if (bmi < 25) {
    return {
      category: "وزن طبيعي",
      categoryEn: "Normal weight",
      color: "#10B981",
      description: "وزنك مثالي وضمن النطاق الصحي. حافظ على نمط حياتك الصحي.",
    };
  } else if (bmi < 30) {
    return {
      category: "زيادة في الوزن",
      categoryEn: "Overweight",
      color: "#F59E0B",
      description: "وزنك أعلى من الطبيعي قليلاً. يُنصح بممارسة الرياضة والتحكم في الغذاء.",
    };
  } else if (bmi < 35) {
    return {
      category: "سمنة من الدرجة الأولى",
      categoryEn: "Obesity Class I",
      color: "#EF4444",
      description: "تعاني من سمنة معتدلة. يُنصح باستشارة الطبيب ووضع خطة لفقدان الوزن.",
    };
  } else if (bmi < 40) {
    return {
      category: "سمنة من الدرجة الثانية",
      categoryEn: "Obesity Class II",
      color: "#DC2626",
      description: "تعاني من سمنة متقدمة. يُنصح بمتابعة طبية وعلاجية مستمرة.",
    };
  } else {
    return {
      category: "سمنة مفرطة",
      categoryEn: "Obesity Class III",
      color: "#991B1B",
      description: "سمنة شديدة تستدعي تدخلاً طبياً فورياً.",
    };
  }
}

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [result, setResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(w) || w <= 0 || w > 500) { setError("يرجى إدخال وزن صحيح (بالكيلوجرام)."); return; }
    if (isNaN(h) || h <= 50 || h > 280) { setError("يرجى إدخال طول صحيح (بالسنتيمتر)."); return; }

    const heightM = h / 100;
    const bmi = w / (heightM * heightM);
    const roundedBMI = Math.round(bmi * 10) / 10;

    const category = getBMICategory(roundedBMI);

    // Ideal weight range (BMI 18.5–24.9)
    const idealWeightMin = 18.5 * heightM * heightM;
    const idealWeightMax = 24.9 * heightM * heightM;

    setResult({
      bmi: roundedBMI,
      ...category,
      idealWeightMin: Math.round(idealWeightMin * 10) / 10,
      idealWeightMax: Math.round(idealWeightMax * 10) / 10,
    });

    trackCalculatorUsed("bmi", "health");
  };

  // BMI scale position (percentage) — capped 10–40
  const scalePosition = result
    ? Math.min(Math.max(((result.bmi - 10) / 30) * 100, 0), 100)
    : null;

  return (
    <div className="space-y-6">
      {/* Gender */}
      <div>
        <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-2">الجنس</label>
        <div className="grid grid-cols-2 gap-3">
          {(["male", "female"] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`py-3 rounded-xl font-bold border-2 transition-all ${
                gender === g
                  ? "border-[#1E3A8A] bg-[#1E3A8A] text-white"
                  : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-[#1E3A8A]"
              }`}
            >
              {g === "male" ? "👨 ذكر" : "👩 أنثى"}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "الوزن (كيلوجرام)", value: weight, setter: setWeight, placeholder: "70", id: "weight" },
          { label: "الطول (سنتيمتر)", value: height, setter: setHeight, placeholder: "170", id: "height" },
          { label: "العمر (اختياري)", value: age, setter: setAge, placeholder: "30", id: "age" },
        ].map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">
              {field.label}
            </label>
            <input
              id={field.id}
              type="number"
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
              placeholder={field.placeholder}
              min="0"
            />
          </div>
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-xl">{error}</p>
      )}

      <button
        onClick={calculate}
        className="w-full flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 px-6 rounded-xl transition-colors"
      >
        <Calculator className="h-5 w-5" />
        احسب مؤشر كتلة الجسم
      </button>

      {result && (
        <div className="space-y-4">
          {/* BMI Score */}
          <div className="rounded-2xl p-6 text-center text-white" style={{ backgroundColor: result.color }}>
            <p className="text-sm opacity-90 mb-1">مؤشر كتلة الجسم (BMI)</p>
            <p className="text-6xl font-black mb-2">{result.bmi}</p>
            <p className="text-xl font-bold">{result.category}</p>
            <p className="text-sm opacity-80 mt-2">{result.description}</p>
          </div>

          {/* Visual Scale */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <p className="text-sm font-semibold text-[#1E293B] dark:text-white mb-3">مقياس BMI</p>
            <div className="relative h-5 rounded-full overflow-hidden" style={{
              background: "linear-gradient(to left, #991B1B 0%, #EF4444 30%, #F59E0B 55%, #10B981 70%, #3B82F6 100%)"
            }}>
              {scalePosition !== null && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-6 bg-white border-2 border-gray-800 rounded-full shadow-md transition-all"
                  style={{ left: `${100 - scalePosition}%`, transform: "translate(50%, -50%)" }}
                />
              )}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>سمنة مفرطة</span>
              <span>زيادة</span>
              <span>طبيعي</span>
              <span>نقص</span>
            </div>
          </div>

          {/* Ideal Weight */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 border border-blue-100 dark:border-blue-800">
            <p className="text-sm font-semibold text-[#1E3A8A] dark:text-blue-300 mb-1">
              الوزن المثالي لطولك
            </p>
            <p className="text-2xl font-black text-[#1E3A8A] dark:text-blue-400">
              {result.idealWeightMin} – {result.idealWeightMax} كجم
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              (بناءً على نطاق BMI الطبيعي 18.5–24.9)
            </p>
          </div>

          {/* Categories reference */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            <table className="w-full text-sm" dir="rtl">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-right font-semibold text-[#1E293B] dark:text-white">الفئة</th>
                  <th className="px-4 py-2 text-right font-semibold text-[#1E293B] dark:text-white">BMI</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { cat: "نقص في الوزن", range: "أقل من 18.5", color: "#3B82F6" },
                  { cat: "وزن طبيعي ✅", range: "18.5 – 24.9", color: "#10B981" },
                  { cat: "زيادة في الوزن", range: "25 – 29.9", color: "#F59E0B" },
                  { cat: "سمنة درجة أولى", range: "30 – 34.9", color: "#EF4444" },
                  { cat: "سمنة درجة ثانية", range: "35 – 39.9", color: "#DC2626" },
                  { cat: "سمنة مفرطة", range: "40 فأكثر", color: "#991B1B" },
                ].map((row) => (
                  <tr key={row.cat} className={`border-t border-gray-100 dark:border-gray-700 ${result.category === row.cat.replace(" ✅", "") ? "font-bold" : ""}`}>
                    <td className="px-4 py-2 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: row.color }} />
                      {row.cat}
                    </td>
                    <td className="px-4 py-2 font-mono">{row.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <strong>تنبيه:</strong> مؤشر BMI أداة تقدير عامة ولا يُغني عن الفحص الطبي. يُنصح
            بمراجعة الطبيب للتقييم الدقيق.
          </p>
        </div>
      )}
    </div>
  );
}
