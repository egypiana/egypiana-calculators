"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";

const ALL_CALCULATORS = [
  { title: "حاسبة الزكاة", href: "/financial/zakat", category: "مالية", icon: "☪️", desc: "احسب زكاة المال والذهب والفضة والأسهم" },
  { title: "حاسبة القرض والأقساط", href: "/financial/loan", category: "مالية", icon: "🏦", desc: "احسب القسط الشهري وجدول السداد لأي قرض" },
  { title: "حاسبة الرهن العقاري", href: "/financial/mortgage", category: "مالية", icon: "🏠", desc: "احسب أقساط الرهن العقاري وتكلفة الشراء" },
  { title: "حاسبة ضريبة القيمة المضافة", href: "/financial/vat", category: "مالية", icon: "🧾", desc: "احسب ضريبة القيمة المضافة VAT بسرعة" },
  { title: "حاسبة الراتب الصافي", href: "/financial/salary", category: "مالية", icon: "💵", desc: "احسب صافي الراتب بعد الضرائب والخصومات" },
  { title: "حاسبة الفائدة المركبة", href: "/financial/compound-interest", category: "مالية", icon: "📈", desc: "احسب نمو الاستثمار بالفائدة المركبة" },
  { title: "محول العملات", href: "/financial/currency", category: "مالية", icon: "💱", desc: "تحويل العملات العربية والعالمية" },
  { title: "حاسبة نهاية الخدمة", href: "/financial/end-of-service", category: "مالية", icon: "💼", desc: "احسب مكافأة نهاية الخدمة والتقاعد" },
  { title: "التفقيط — تحويل الأرقام لكلمات", href: "/financial/tafqeet", category: "مالية", icon: "✍️", desc: "تحويل الأرقام إلى كتابة عربية بالكلمات" },
  { title: "حاسبة BMI مؤشر كتلة الجسم", href: "/health/bmi", category: "صحة", icon: "⚖️", desc: "احسب مؤشر كتلة الجسم وتصنيف الوزن" },
  { title: "حاسبة السعرات الحرارية", href: "/health/calories", category: "صحة", icon: "🔥", desc: "احسب السعرات اليومية للوزن المثالي" },
  { title: "حاسبة الحمل وموعد الولادة", href: "/health/pregnancy", category: "صحة", icon: "🤰", desc: "احسب موعد الولادة وأسابيع الحمل" },
  { title: "حاسبة الوزن المثالي", href: "/health/ideal-weight", category: "صحة", icon: "🎯", desc: "اعرف وزنك المثالي حسب الطول والجنس" },
  { title: "حاسبة شرب الماء", href: "/health/water-intake", category: "صحة", icon: "💧", desc: "احسب كمية الماء اليومية الموصى بها" },
  { title: "حاسبة معدل الأيض BMR", href: "/health/bmr", category: "صحة", icon: "💪", desc: "احسب معدل الأيض الأساسي والسعرات اليومية" },
  { title: "حاسبة النسبة المئوية", href: "/math/percentage", category: "رياضيات", icon: "📊", desc: "احسب النسب المئوية والزيادة والنقصان" },
  { title: "الآلة الحاسبة العلمية", href: "/math/scientific", category: "رياضيات", icon: "🔬", desc: "آلة حاسبة علمية متقدمة مع دوال مثلثية" },
  { title: "الآلة الحاسبة", href: "/math/calculator", category: "رياضيات", icon: "🧮", desc: "آلة حاسبة عادية سريعة وسهلة الاستخدام" },
  { title: "حاسبة المعدل الجامعي GPA", href: "/tools/gpa", category: "أدوات", icon: "🎓", desc: "احسب المعدل التراكمي الجامعي بدقة" },
  { title: "حاسبة استهلاك الوقود", href: "/tools/fuel", category: "أدوات", icon: "⛽", desc: "احسب استهلاك الوقود وتكلفة الرحلة" },
  { title: "مولد كلمات المرور", href: "/tools/password", category: "أدوات", icon: "🔐", desc: "أنشئ كلمة مرور قوية وآمنة" },
  { title: "محول الوحدات", href: "/tools/unit-converter", category: "أدوات", icon: "📐", desc: "تحويل وحدات الطول والوزن والحرارة والمساحة" },
  { title: "حاسبة الوقت والتاريخ", href: "/tools/time", category: "أدوات", icon: "⏱️", desc: "احسب الفرق بين تاريخين وتحويل وحدات الزمن" },
  { title: "حاسبة درجات الطلاب", href: "/tools/grade", category: "أدوات", icon: "📝", desc: "احسب المعدل الدراسي من الدرجات والأوزان" },
  { title: "حاسبة المساحات", href: "/tools/area", category: "أدوات", icon: "📏", desc: "احسب مساحة ومحيط الأشكال الهندسية" },
  { title: "حاسبة الخرسانة", href: "/tools/concrete", category: "أدوات", icon: "🏗️", desc: "احسب كميات الخرسانة والأسمنت للبناء" },
  { title: "حاسبة العمر", href: "/tools/age", category: "أدوات", icon: "🎂", desc: "احسب عمرك بالسنوات والأشهر والأيام" },
  { title: "التاريخ الهجري", href: "/tools/hijri-date", category: "أدوات", icon: "📅", desc: "تحويل التاريخ الميلادي إلى هجري والعكس" },
  { title: "حاسبة الميراث الشرعي", href: "/tools/inheritance", category: "أدوات", icon: "⚖️", desc: "احسب أنصبة الميراث الشرعي وفق الفقه الإسلامي" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "مالية": "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  "صحة": "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  "رياضيات": "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
  "أدوات": "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
};

function SearchForm({ defaultValue }: { defaultValue: string }) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/search");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-8" dir="rtl">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="ابحث عن حاسبة..."
        className="flex-1 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-right bg-white dark:bg-[#0F172A] text-[#1E293B] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] text-sm"
        dir="rtl"
      />
      <button
        type="submit"
        className="bg-[#1E3A8A] hover:bg-[#1e40af] text-white px-5 py-3 rounded-xl transition-colors flex items-center gap-2 font-bold text-sm"
      >
        <Search className="w-4 h-4" />
        بحث
      </button>
    </form>
  );
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const results = query
    ? ALL_CALCULATORS.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.desc.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_CALCULATORS;

  return (
    <>
      <SearchForm defaultValue={query} />

      <div className="mb-6 text-right" dir="rtl">
        {query ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            عُثر على{" "}
            <span className="font-bold text-[#1E293B] dark:text-white">
              {results.length}
            </span>{" "}
            نتيجة لـ{" "}
            <span className="font-bold text-[#1E3A8A]">«{query}»</span>
          </p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            عرض جميع الحاسبات —{" "}
            <span className="font-bold text-[#1E293B] dark:text-white">
              {results.length}
            </span>{" "}
            حاسبة متاحة
          </p>
        )}
      </div>

      {results.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md hover:border-[#1E3A8A] transition-all group"
              dir="rtl"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl flex-shrink-0">{calc.icon}</span>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-[#1E293B] dark:text-white group-hover:text-[#1E3A8A] transition-colors leading-snug mb-1">
                    {calc.title}
                  </h2>
                  <span
                    className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${
                      CATEGORY_COLORS[calc.category] ?? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {calc.category}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {calc.desc}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16" dir="rtl">
          <p className="text-5xl mb-4">🔍</p>
          <h2 className="text-xl font-bold text-[#1E293B] dark:text-white mb-2">
            لا توجد نتائج لـ «{query}»
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
            جرب كلمة أخرى أو تصفح جميع الحاسبات
          </p>
          <Link
            href="/calculators"
            className="inline-block bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            تصفح جميع الحاسبات
          </Link>
        </div>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "نتائج البحث" },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">
          نتائج البحث
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">
          ابحث من بين أكثر من {ALL_CALCULATORS.length} حاسبة عربية مجانية
        </p>
        <Suspense
          fallback={
            <div className="text-center py-16 text-gray-400">جاري البحث...</div>
          }
        >
          <SearchResults />
        </Suspense>
      </div>
    </>
  );
}
