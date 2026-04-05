"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { gregorianToHijri } from "@/lib/utils";
import { trackCalculatorUsed } from "@/components/analytics/GoogleAnalytics";

const HIJRI_MONTHS = [
  "محرم", "صفر", "ربيع الأول", "ربيع الثاني",
  "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان",
  "رمضان", "شوال", "ذو القعدة", "ذو الحجة",
];

const ARABIC_WEEKDAYS = [
  "الأحد", "الاثنين", "الثلاثاء", "الأربعاء",
  "الخميس", "الجمعة", "السبت",
];

// Approximate dates for Islamic events in 2025
const ISLAMIC_EVENTS_2025: Array<{ name: string; approxGregorian: string }> = [
  { name: "رمضان 1446", approxGregorian: "2025-03-01" },
  { name: "عيد الفطر 1446", approxGregorian: "2025-03-31" },
  { name: "عيد الأضحى 1446", approxGregorian: "2025-06-07" },
  { name: "رأس السنة الهجرية 1447", approxGregorian: "2025-06-27" },
  { name: "المولد النبوي 1447", approxGregorian: "2025-09-05" },
];

export default function HijriDateCalculator() {
  const [direction, setDirection] = useState<"g2h" | "h2g">("g2h");
  const [gregDate, setGregDate] = useState(new Date().toISOString().split("T")[0]);
  const [hijriDay, setHijriDay] = useState("");
  const [hijriMonth, setHijriMonth] = useState("1");
  const [hijriYear, setHijriYear] = useState("");
  const [result, setResult] = useState<null | {
    hijri?: { year: number; month: number; day: number; monthName: string };
    gregorian?: string;
    weekDay: string;
  }>(null);
  const [todayBoth, setTodayBoth] = useState<{ greg: string; hijri: string } | null>(null);
  const [events, setEvents] = useState<Array<{ name: string; daysLeft: number; date: string }>>([]);

  useEffect(() => {
    const today = new Date();
    const hijri = gregorianToHijri(today);
    const gregStr = today.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
    const hijriStr = `${hijri.day} ${hijri.monthName} ${hijri.year} هـ`;
    setTodayBoth({ greg: gregStr, hijri: hijriStr });

    // Calculate days until events
    const now = today.getTime();
    const eventsList = ISLAMIC_EVENTS_2025.map((ev) => {
      const evDate = new Date(ev.approxGregorian);
      const daysLeft = Math.ceil((evDate.getTime() - now) / (1000 * 60 * 60 * 24));
      return {
        name: ev.name,
        daysLeft,
        date: evDate.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" }),
      };
    }).filter((e) => e.daysLeft >= 0);
    setEvents(eventsList);
  }, []);

  const convertG2H = () => {
    if (!gregDate) return;
    const date = new Date(gregDate);
    const hijri = gregorianToHijri(date);
    const weekDay = ARABIC_WEEKDAYS[date.getDay()];
    setResult({ hijri, weekDay });
    trackCalculatorUsed("hijri-date", "tools");
  };

  const convertH2G = () => {
    const d = parseInt(hijriDay);
    const m = parseInt(hijriMonth);
    const y = parseInt(hijriYear);
    if (!d || !m || !y || d < 1 || d > 30 || m < 1 || m > 12 || y < 1 || y > 1500) return;

    // Approximate Hijri to Gregorian conversion
    const jd = Math.trunc((11 * y + 3) / 30) + 354 * y + 30 * m - Math.trunc((m - 1) / 2) + d + 1948440 - 385;
    const a = jd + 32044;
    const b = Math.trunc((4 * a + 3) / 146097);
    const c = a - Math.trunc((146097 * b) / 4);
    const dd = Math.trunc((4 * c + 3) / 1461);
    const e = c - Math.trunc((1461 * dd) / 4);
    const mm = Math.trunc((5 * e + 2) / 153);
    const gDay = e - Math.trunc((153 * mm + 2) / 5) + 1;
    const gMonth = mm + 3 - 12 * Math.trunc(mm / 10);
    const gYear = 100 * b + dd - 4800 + Math.trunc(mm / 10);

    const gDate = new Date(gYear, gMonth - 1, gDay);
    const weekDay = ARABIC_WEEKDAYS[gDate.getDay()];
    const gregStr = gDate.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
    setResult({ gregorian: gregStr, weekDay });
    trackCalculatorUsed("hijri-date", "tools");
  };

  return (
    <div className="space-y-6">
      {/* Today */}
      {todayBoth && (
        <div className="bg-[#1E3A8A]/5 dark:bg-[#1E3A8A]/20 rounded-2xl p-4 border border-[#1E3A8A]/20">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">اليوم</p>
          <div className="grid sm:grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-gray-400">ميلادي</p>
              <p className="font-bold text-[#1E293B] dark:text-white text-sm">{todayBoth.greg}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">هجري</p>
              <p className="font-bold text-[#1E3A8A] dark:text-blue-400 text-sm">{todayBoth.hijri}</p>
            </div>
          </div>
        </div>
      )}

      {/* Direction Toggle */}
      <div className="grid grid-cols-2 gap-3">
        {(["g2h", "h2g"] as const).map((dir) => (
          <button
            key={dir}
            onClick={() => { setDirection(dir); setResult(null); }}
            className={`py-3 rounded-xl font-bold border-2 transition-all text-sm ${
              direction === dir
                ? "border-[#1E3A8A] bg-[#1E3A8A] text-white"
                : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"
            }`}
          >
            {dir === "g2h" ? "ميلادي ← هجري" : "هجري ← ميلادي"}
          </button>
        ))}
      </div>

      {/* Input */}
      {direction === "g2h" ? (
        <div>
          <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">
            التاريخ الميلادي
          </label>
          <input
            type="date"
            value={gregDate}
            onChange={(e) => setGregDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
          />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">اليوم</label>
            <input
              type="number"
              value={hijriDay}
              onChange={(e) => setHijriDay(e.target.value)}
              placeholder="1-30"
              min="1" max="30"
              className="w-full px-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">الشهر</label>
            <select
              value={hijriMonth}
              onChange={(e) => setHijriMonth(e.target.value)}
              className="w-full px-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
            >
              {HIJRI_MONTHS.map((m, i) => (
                <option key={i} value={i + 1}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">السنة</label>
            <input
              type="number"
              value={hijriYear}
              onChange={(e) => setHijriYear(e.target.value)}
              placeholder="1446"
              min="1300" max="1500"
              className="w-full px-3 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
            />
          </div>
        </div>
      )}

      <button
        onClick={direction === "g2h" ? convertG2H : convertH2G}
        className="w-full flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 px-6 rounded-xl transition-colors"
      >
        <RefreshCw className="h-5 w-5" />
        تحويل التاريخ
      </button>

      {result && (
        <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1e40af] rounded-2xl p-6 text-white">
          <p className="text-blue-200 text-sm mb-3 text-center">نتيجة التحويل</p>
          {result.hijri && (
            <p className="text-2xl font-black text-center mb-2">
              {result.hijri.day} {result.hijri.monthName} {result.hijri.year} هـ
            </p>
          )}
          {result.gregorian && (
            <p className="text-2xl font-black text-center mb-2">{result.gregorian}</p>
          )}
          <p className="text-center text-blue-200">يوم {result.weekDay}</p>
        </div>
      )}

      {/* Upcoming Islamic events */}
      {events.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <p className="px-4 py-3 font-bold text-[#1E293B] dark:text-white border-b border-gray-100 dark:border-gray-700 text-sm">
            📅 المناسبات الإسلامية القادمة (2025)
          </p>
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {events.slice(0, 5).map((ev) => (
              <li key={ev.name} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="font-semibold text-[#1E293B] dark:text-white text-sm">{ev.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{ev.date} (تقريبي)</p>
                </div>
                <span className="text-xs font-bold bg-[#1E3A8A] text-white px-2 py-1 rounded-full whitespace-nowrap">
                  {ev.daysLeft === 0 ? "اليوم!" : `${ev.daysLeft} يوم`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
