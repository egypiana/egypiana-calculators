"use client";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

interface Subject { name: string; grade: string; weight: string; }

export default function GradeCalculator() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { name: "", grade: "", weight: "1" },
    { name: "", grade: "", weight: "1" },
    { name: "", grade: "", weight: "1" },
  ]);
  const [targetAvg, setTargetAvg] = useState("");
  const [result, setResult] = useState<{ avg: number; letter: string; needed?: number } | null>(null);

  const getLetterGrade = (avg: number) => {
    if (avg >= 90) return { letter: "A+ ممتاز", color: "text-green-500" };
    if (avg >= 80) return { letter: "A جيد جداً", color: "text-green-400" };
    if (avg >= 70) return { letter: "B جيد", color: "text-blue-500" };
    if (avg >= 60) return { letter: "C مقبول", color: "text-yellow-500" };
    if (avg >= 50) return { letter: "D ضعيف", color: "text-orange-500" };
    return { letter: "F راسب", color: "text-red-500" };
  };

  const calculate = () => {
    let totalPoints = 0, totalWeight = 0;
    subjects.forEach(s => {
      const g = parseFloat(s.grade);
      const w = parseFloat(s.weight) || 1;
      if (!isNaN(g)) { totalPoints += g * w; totalWeight += w; }
    });
    if (totalWeight === 0) return;
    const avg = totalPoints / totalWeight;
    const { letter } = getLetterGrade(avg);

    let needed: number | undefined;
    const target = parseFloat(targetAvg);
    if (target && !isNaN(target)) {
      const filledWeight = totalWeight;
      const emptySubjects = subjects.filter(s => isNaN(parseFloat(s.grade)));
      const emptyWeight = emptySubjects.reduce((acc, s) => acc + (parseFloat(s.weight) || 1), 0);
      if (emptyWeight > 0) {
        needed = (target * (filledWeight + emptyWeight) - totalPoints) / emptyWeight;
      }
    }

    setResult({ avg: Math.round(avg * 100) / 100, letter, needed });
    trackCalculatorUsed("grade-calculator", "tools");
  };

  const add = () => setSubjects(p => [...p, { name: "", grade: "", weight: "1" }]);
  const remove = (i: number) => setSubjects(p => p.filter((_, j) => j !== i));
  const update = (i: number, k: keyof Subject, v: string) => setSubjects(p => p.map((s, j) => j === i ? { ...s, [k]: v } : s));

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 px-1">
          <span className="col-span-5 text-right">المادة</span>
          <span className="col-span-4 text-center">الدرجة (من 100)</span>
          <span className="col-span-2 text-center">الوزن</span>
          <span className="col-span-1" />
        </div>
        {subjects.map((s, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 items-center">
            <input value={s.name} onChange={e => update(i, "name", e.target.value)}
              placeholder={`مادة ${i + 1}`}
              className="col-span-5 px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-right text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white" />
            <input type="number" value={s.grade} onChange={e => update(i, "grade", e.target.value)}
              placeholder="85" min="0" max="100"
              className="col-span-4 px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-center text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white" />
            <input type="number" value={s.weight} onChange={e => update(i, "weight", e.target.value)}
              placeholder="1" min="0.1" step="0.5"
              className="col-span-2 px-2 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-center text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white" />
            <button onClick={() => remove(i)} className="col-span-1 text-red-400 hover:text-red-600 flex justify-center"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
      <div>
        <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">المعدل المستهدف (اختياري)</label>
        <input type="number" value={targetAvg} onChange={e => setTargetAvg(e.target.value)}
          placeholder="80" min="0" max="100"
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white" />
      </div>
      <div className="flex gap-3">
        <button onClick={add} className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 rounded-xl hover:border-[#1E3A8A] hover:text-[#1E3A8A] transition-colors text-sm font-medium">
          <Plus className="h-4 w-4" /> إضافة مادة
        </button>
        <button onClick={calculate} className="flex-1 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-2.5 rounded-xl transition-colors">احسب المعدل</button>
      </div>
      {result && (
        <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1e40af] rounded-2xl p-6 text-white text-center space-y-2">
          <p className="text-blue-200 text-sm">معدلك الحالي</p>
          <p className="text-6xl font-black">{result.avg}</p>
          <p className="text-blue-100 font-bold">{result.letter}</p>
          {result.needed !== undefined && (
            <div className="border-t border-blue-600 pt-3 mt-3">
              <p className="text-blue-200 text-sm">لتحقيق معدل {targetAvg}</p>
              <p className="text-2xl font-black">
                {result.needed > 100 ? "المعدل المستهدف صعب التحقيق" :
                  result.needed < 0 ? "حققت المعدل المطلوب بالفعل!" :
                  `تحتاج ${formatNumber(result.needed, 1)} في المواد المتبقية`}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
