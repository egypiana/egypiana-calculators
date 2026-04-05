"use client";

import { useState } from "react";
import { Calculator, AlertCircle } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

interface HeirInput {
  husband: boolean;
  wife: boolean;
  wivesCount: number;
  sons: number;
  daughters: number;
  father: boolean;
  mother: boolean;
  pMother: boolean; // paternal grandmother
  fullBrothers: number;
  fullSisters: number;
}

interface HeirResult {
  name: string;
  fraction: string;
  share: number;
  percentage: number;
}

/**
 * Simplified Islamic inheritance calculation based on Quran and Sunnah.
 * This covers the most common scenarios (Ashabul Furud + Asabat).
 */
function calcInheritance(estate: number, heirs: HeirInput): HeirResult[] {
  const results: HeirResult[] = [];
  let remaining = 1; // fraction of estate remaining
  const fixed: Array<{ name: string; fraction: number; fractionStr: string }> = [];

  const hasChildren = heirs.sons > 0 || heirs.daughters > 0;

  // 1. SPOUSE
  if (heirs.husband) {
    const f = hasChildren ? 1 / 4 : 1 / 2;
    fixed.push({ name: "الزوج", fraction: f, fractionStr: hasChildren ? "الربع (1/4)" : "النصف (1/2)" });
    remaining -= f;
  }

  if (heirs.wife && heirs.wivesCount > 0) {
    const totalWifeFraction = hasChildren ? 1 / 8 : 1 / 4;
    const perWife = totalWifeFraction / heirs.wivesCount;
    for (let i = 1; i <= heirs.wivesCount; i++) {
      fixed.push({
        name: heirs.wivesCount > 1 ? `الزوجة ${i}` : "الزوجة",
        fraction: perWife,
        fractionStr: hasChildren
          ? (heirs.wivesCount > 1 ? `الثمن مقسوماً على ${heirs.wivesCount}` : "الثمن (1/8)")
          : (heirs.wivesCount > 1 ? `الربع مقسوماً على ${heirs.wivesCount}` : "الربع (1/4)"),
      });
      remaining -= perWife;
    }
  }

  // 2. MOTHER
  if (heirs.mother) {
    const hasMultipleSiblings = heirs.fullBrothers + heirs.fullSisters >= 2;
    const f = hasChildren || hasMultipleSiblings ? 1 / 6 : 1 / 3;
    fixed.push({ name: "الأم", fraction: f, fractionStr: f === 1 / 6 ? "السدس (1/6)" : "الثلث (1/3)" });
    remaining -= f;
  }

  // 3. FATHER
  if (heirs.father) {
    if (hasChildren) {
      fixed.push({ name: "الأب", fraction: 1 / 6, fractionStr: "السدس (1/6) + العصبة" });
      remaining -= 1 / 6;
      // Father also gets asaba (remainder) — handled below
    } else {
      // Father as asaba gets the rest
    }
  }

  // 4. Distribute fixed shares
  fixed.forEach((h) => {
    results.push({
      name: h.name,
      fraction: h.fractionStr,
      share: estate * h.fraction,
      percentage: h.fraction * 100,
    });
  });

  // 5. ASABA (residuary heirs) — get the remainder
  const asabaAmount = estate * remaining;

  if (heirs.father && !hasChildren) {
    results.push({ name: "الأب (عصبة)", fraction: "الباقي (عصبة)", share: asabaAmount, percentage: remaining * 100 });
  } else if (hasChildren) {
    const totalParts = heirs.sons * 2 + heirs.daughters * 1;
    const fatherAsaba = heirs.father ? estate * remaining : 0;

    // Children split the true asaba
    const childrenAsaba = estate * remaining - (heirs.father ? estate * 0 : 0);

    for (let i = 0; i < heirs.sons; i++) {
      const share = (childrenAsaba * 2) / totalParts;
      results.push({ name: `الابن ${heirs.sons > 1 ? i + 1 : ""}`.trim(), fraction: "عصبة (للابن ضعف البنت)", share, percentage: (share / estate) * 100 });
    }
    for (let i = 0; i < heirs.daughters; i++) {
      const share = (childrenAsaba * 1) / totalParts;
      results.push({ name: `البنت ${heirs.daughters > 1 ? i + 1 : ""}`.trim(), fraction: "عصبة", share, percentage: (share / estate) * 100 });
    }

    if (heirs.father) {
      const fShare = estate * remaining / (totalParts + (heirs.father ? 2 : 0));
      // Simplified: father included in asaba with sons
      // Already added 1/6 fixed above
    }
  } else if (heirs.fullBrothers > 0 || heirs.fullSisters > 0) {
    const brotherParts = heirs.fullBrothers * 2 + heirs.fullSisters * 1;
    for (let i = 0; i < heirs.fullBrothers; i++) {
      const share = (asabaAmount * 2) / brotherParts;
      results.push({ name: `الأخ الشقيق ${heirs.fullBrothers > 1 ? i + 1 : ""}`.trim(), fraction: "عصبة", share, percentage: (share / estate) * 100 });
    }
    for (let i = 0; i < heirs.fullSisters; i++) {
      const share = (asabaAmount * 1) / brotherParts;
      results.push({ name: `الأخت الشقيقة ${heirs.fullSisters > 1 ? i + 1 : ""}`.trim(), fraction: "عصبة (نصف الأخ)", share, percentage: (share / estate) * 100 });
    }
  }

  return results.filter((r) => r.share > 0);
}

export default function InheritanceCalculator() {
  const [estate, setEstate] = useState("");
  const [heirs, setHeirs] = useState<HeirInput>({
    husband: false, wife: false, wivesCount: 1,
    sons: 0, daughters: 0,
    father: false, mother: false, pMother: false,
    fullBrothers: 0, fullSisters: 0,
  });
  const [results, setResults] = useState<HeirResult[] | null>(null);
  const [error, setError] = useState("");

  const set = (key: keyof HeirInput, value: boolean | number) =>
    setHeirs((prev) => ({ ...prev, [key]: value }));

  const calculate = () => {
    setError("");
    const e = parseFloat(estate);
    if (isNaN(e) || e <= 0) { setError("يرجى إدخال قيمة التركة."); return; }
    if (!heirs.husband && !heirs.wife && heirs.sons === 0 && heirs.daughters === 0 && !heirs.father && !heirs.mother) {
      setError("يرجى تحديد الورثة أولاً."); return;
    }
    const res = calcInheritance(e, heirs);
    setResults(res);
    trackCalculatorUsed("inheritance", "tools");
  };

  return (
    <div className="space-y-6">
      {/* Estate */}
      <div>
        <label htmlFor="estate" className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">
          قيمة التركة الإجمالية (بالجنيه أو أي عملة)
        </label>
        <input id="estate" type="number" value={estate} onChange={(e) => setEstate(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white text-xl font-bold"
          placeholder="500000" min="0" />
      </div>

      {/* Heirs */}
      <div>
        <p className="text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-3">تحديد الورثة</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {/* Spouse */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-3">
            <p className="text-sm font-bold text-[#1E293B] dark:text-white">الزوجية</p>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={heirs.husband} onChange={(e) => { set("husband", e.target.checked); set("wife", false); }}
                className="w-4 h-4 accent-[#1E3A8A]" />
              <span className="text-sm text-gray-700 dark:text-gray-200">زوج</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={heirs.wife} onChange={(e) => { set("wife", e.target.checked); set("husband", false); }}
                className="w-4 h-4 accent-[#1E3A8A]" />
              <span className="text-sm text-gray-700 dark:text-gray-200">زوجة</span>
            </label>
            {heirs.wife && (
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500">عدد الزوجات:</label>
                <select value={heirs.wivesCount} onChange={(e) => set("wivesCount", parseInt(e.target.value))}
                  className="px-2 py-1 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 dark:text-white">
                  {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            )}
          </div>

          {/* Parents */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-3">
            <p className="text-sm font-bold text-[#1E293B] dark:text-white">الأصول</p>
            {([["father", "الأب"], ["mother", "الأم"]] as const).map(([k, l]) => (
              <label key={k} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={heirs[k]} onChange={(e) => set(k, e.target.checked)}
                  className="w-4 h-4 accent-[#1E3A8A]" />
                <span className="text-sm text-gray-700 dark:text-gray-200">{l}</span>
              </label>
            ))}
          </div>

          {/* Children */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-3">
            <p className="text-sm font-bold text-[#1E293B] dark:text-white">الفروع</p>
            {([["sons", "عدد الأبناء (ذكور)"], ["daughters", "عدد البنات"]] as const).map(([k, l]) => (
              <div key={k} className="flex items-center justify-between">
                <label className="text-sm text-gray-700 dark:text-gray-200">{l}</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => set(k, Math.max(0, heirs[k] - 1))}
                    className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-600 font-bold text-gray-700 dark:text-white hover:bg-gray-300 transition-colors">−</button>
                  <span className="w-6 text-center font-bold text-[#1E293B] dark:text-white">{heirs[k]}</span>
                  <button onClick={() => set(k, heirs[k] + 1)}
                    className="w-7 h-7 rounded-full bg-[#1E3A8A] font-bold text-white hover:bg-[#1e40af] transition-colors">+</button>
                </div>
              </div>
            ))}
          </div>

          {/* Siblings */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-3">
            <p className="text-sm font-bold text-[#1E293B] dark:text-white">الإخوة الأشقاء</p>
            {([["fullBrothers", "عدد الإخوة الذكور"], ["fullSisters", "عدد الأخوات"]] as const).map(([k, l]) => (
              <div key={k} className="flex items-center justify-between">
                <label className="text-sm text-gray-700 dark:text-gray-200">{l}</label>
                <div className="flex items-center gap-2">
                  <button onClick={() => set(k, Math.max(0, heirs[k] - 1))}
                    className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-600 font-bold text-gray-700 dark:text-white hover:bg-gray-300 transition-colors">−</button>
                  <span className="w-6 text-center font-bold text-[#1E293B] dark:text-white">{heirs[k]}</span>
                  <button onClick={() => set(k, heirs[k] + 1)}
                    className="w-7 h-7 rounded-full bg-[#1E3A8A] font-bold text-white hover:bg-[#1e40af] transition-colors">+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-xl flex items-center gap-2"><AlertCircle className="h-4 w-4 flex-shrink-0" />{error}</p>}

      <button onClick={calculate} className="w-full flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 px-6 rounded-xl transition-colors">
        <Calculator className="h-5 w-5" />
        احسب الميراث الشرعي
      </button>

      {results && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm" dir="rtl">
              <thead className="bg-[#1E3A8A] text-white">
                <tr>
                  {["الوارث", "النصيب الشرعي", "المبلغ", "النسبة"].map((h) => (
                    <th key={h} className="px-4 py-3 text-right font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"}>
                    <td className="px-4 py-3 font-bold text-[#1E293B] dark:text-white">{r.name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{r.fraction}</td>
                    <td className="px-4 py-3 font-bold text-[#10B981]">{formatNumber(r.share, 0)}</td>
                    <td className="px-4 py-3 text-[#1E3A8A] dark:text-blue-400 font-medium">{r.percentage.toFixed(1)}%</td>
                  </tr>
                ))}
                <tr className="bg-[#1E3A8A]/5 dark:bg-[#1E3A8A]/20 font-bold border-t-2 border-[#1E3A8A]">
                  <td className="px-4 py-3 text-[#1E293B] dark:text-white">الإجمالي</td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3 text-[#10B981]">
                    {formatNumber(results.reduce((s, r) => s + r.share, 0), 0)}
                  </td>
                  <td className="px-4 py-3 text-[#1E3A8A] dark:text-blue-400">
                    {results.reduce((s, r) => s + r.percentage, 0).toFixed(1)}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 bg-amber-50 dark:bg-amber-900/20 px-4 py-3 rounded-xl border border-amber-200 dark:border-amber-700">
            <strong>⚠️ تنبيه مهم:</strong> هذه الحاسبة توضيحية للحالات الشائعة. الميراث الشرعي دقيق ومعقد وله حالات كثيرة (الحجب، العَوْل، الرَّد). يُرجى استشارة عالم شرعي أو قاضٍ شرعي للتأكد.
          </p>
        </div>
      )}
    </div>
  );
}
