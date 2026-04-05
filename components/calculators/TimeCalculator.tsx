"use client";
import { useState } from "react";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

type Mode = "diff" | "add" | "convert";

export default function TimeCalculator() {
  const [mode, setMode] = useState<Mode>("diff");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [timeVal, setTimeVal] = useState("");
  const [timeUnit, setTimeUnit] = useState("hours");
  const [targetUnit, setTargetUnit] = useState("minutes");
  const [addTime, setAddTime] = useState("");
  const [addUnit, setAddUnit] = useState("days");
  const [result, setResult] = useState<string | null>(null);

  const UNITS: Record<string, number> = {
    seconds: 1, minutes: 60, hours: 3600, days: 86400,
    weeks: 604800, months: 2629746, years: 31556952,
  };
  const UNIT_LABELS: Record<string, string> = {
    seconds:"ثانية", minutes:"دقيقة", hours:"ساعة", days:"يوم",
    weeks:"أسبوع", months:"شهر", years:"سنة",
  };

  const calculate = () => {
    if (mode === "diff") {
      if (!date1 || !date2) return;
      const d1 = new Date(date1), d2 = new Date(date2);
      const diffMs = Math.abs(d2.getTime() - d1.getTime());
      const diffSec = Math.floor(diffMs / 1000);
      const days = Math.floor(diffSec / 86400);
      const hours = Math.floor((diffSec % 86400) / 3600);
      const mins = Math.floor((diffSec % 3600) / 60);
      const secs = diffSec % 60;
      setResult(`${days} يوم, ${hours} ساعة, ${mins} دقيقة, ${secs} ثانية\n(إجمالي: ${diffSec.toLocaleString("ar")} ثانية = ${Math.floor(diffMs/3600000).toLocaleString("ar")} ساعة)`);
    } else if (mode === "convert") {
      const val = parseFloat(timeVal);
      if (isNaN(val)) return;
      const inSec = val * UNITS[timeUnit];
      const converted = inSec / UNITS[targetUnit];
      const rounded = parseFloat(converted.toFixed(4));
      setResult(`${val} ${UNIT_LABELS[timeUnit]} = ${rounded.toLocaleString("ar")} ${UNIT_LABELS[targetUnit]}`);
    } else if (mode === "add") {
      if (!date1 || !addTime) return;
      const base = new Date(date1);
      const ms = parseFloat(addTime) * UNITS[addUnit] * 1000;
      const newDate = new Date(base.getTime() + ms);
      setResult(newDate.toLocaleString("ar-EG", { dateStyle: "full", timeStyle: "short" }));
    }
    trackCalculatorUsed("time-calculator", "tools");
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-2">
        {([["diff","الفرق بين تاريخين"],["add","إضافة وقت"],["convert","تحويل الوحدات"]] as const).map(([v,l]) => (
          <button key={v} onClick={() => { setMode(v); setResult(null); }}
            className={`py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${mode===v?"border-[#1E3A8A] bg-[#1E3A8A] text-white":"border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"}`}>{l}</button>
        ))}
      </div>

      {mode === "diff" && (
        <div className="grid sm:grid-cols-2 gap-4">
          {([["التاريخ الأول", date1, setDate1],["التاريخ الثاني", date2, setDate2]] as [string, string, (v:string)=>void][]).map(([l,v,s]) => (
            <div key={l}>
              <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">{l}</label>
              <input type="datetime-local" value={v} onChange={e => s(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white" />
            </div>
          ))}
        </div>
      )}

      {mode === "add" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">تاريخ البداية</label>
            <input type="datetime-local" value={date1} onChange={e => setDate1(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">الكمية</label>
              <input type="number" value={addTime} onChange={e => setAddTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white" placeholder="30" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">الوحدة</label>
              <select value={addUnit} onChange={e => setAddUnit(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white">
                {Object.entries(UNIT_LABELS).map(([k,l]) => <option key={k} value={k}>{l}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}

      {mode === "convert" && (
        <div className="grid sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">القيمة</label>
            <input type="number" value={timeVal} onChange={e => setTimeVal(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white" placeholder="60" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">من</label>
            <select value={timeUnit} onChange={e => setTimeUnit(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white">
              {Object.entries(UNIT_LABELS).map(([k,l]) => <option key={k} value={k}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">إلى</label>
            <select value={targetUnit} onChange={e => setTargetUnit(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white">
              {Object.entries(UNIT_LABELS).map(([k,l]) => <option key={k} value={k}>{l}</option>)}
            </select>
          </div>
        </div>
      )}

      <button onClick={calculate} className="w-full bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 rounded-xl transition-colors">احسب</button>

      {result && (
        <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1e40af] rounded-2xl p-6 text-white text-center">
          <p className="text-blue-200 text-sm mb-2">⏱️ النتيجة</p>
          <p className="text-xl font-bold whitespace-pre-line" dir="rtl">{result}</p>
        </div>
      )}
    </div>
  );
}
