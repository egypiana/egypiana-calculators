"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { normalizeArabic } from "@/lib/utils";

/* ─────────────────────────────────────────────
   Calculator registry with rich keyword arrays
   (variants, typos, transliterations)
───────────────────────────────────────────── */
const ALL_CALCULATORS = [
  {
    title: "حاسبة الزكاة",
    href: "/financial/zakat",
    category: "مالية",
    icon: "🕌",
    desc: "احسب زكاة المال والذهب والفضة والأسهم بناءً على النصاب الحالي",
    keywords: [
      "حاسبة الزكاة","حساب الزكاة","زكاة المال","زكاة الذهب","نصاب الزكاة",
      "الزكاه","زكاه المال","حاسبه الزكاة","كم زكاة مالي","احسب زكاتي",
      "زكاة 2026","نصاب الذهب","زكاة الفضة","زكاة الأسهم","الزكاة الواجبة",
      "zakat calculator",
    ],
  },
  {
    title: "حاسبة القرض والأقساط",
    href: "/financial/loan",
    category: "مالية",
    icon: "🏦",
    desc: "احسب القسط الشهري وجدول السداد لأي قرض",
    keywords: [
      "حاسبة القرض","حاسبة الأقساط","أقساط القرض","قسط القرض",
      "حاسبة قرض شخصي","فائدة القرض","حاسبة قرض بنكي","كم قسطي",
      "حساب الفائدة","حاسبة التمويل","حاسبة التقسيط","حاسبه الاقساط",
      "قرض بنكي","القسط الشهري","loan calculator",
    ],
  },
  {
    title: "حاسبة الرهن العقاري",
    href: "/financial/mortgage",
    category: "مالية",
    icon: "🏠",
    desc: "احسب أقساط الرهن العقاري وتكلفة الشراء",
    keywords: [
      "حاسبة الرهن العقاري","تمويل عقاري","قسط السكن","حاسبة التمويل السكني",
      "حاسبة المرابحة","قرض عقاري","حاسبة القرض العقاري","تمويل سكني",
      "الرهن العقاري","حاسبه الرهن","mortgage calculator","قسط البيت",
    ],
  },
  {
    title: "حاسبة ضريبة القيمة المضافة",
    href: "/financial/vat",
    category: "مالية",
    icon: "🧾",
    desc: "احسب ضريبة القيمة المضافة VAT بسرعة وسهولة",
    keywords: [
      "ضريبة القيمة المضافة","حاسبة الضريبة","VAT","حساب الضريبة",
      "حاسبة VAT","ضريبة 15%","ضريبة 5%","استخراج الضريبة",
      "حاسبه الضريبه","الضريبه","إضافة ضريبة","خصم ضريبة","vat calculator",
    ],
  },
  {
    title: "حاسبة الراتب الصافي",
    href: "/financial/salary",
    category: "مالية",
    icon: "💵",
    desc: "احسب صافي الراتب بعد الضرائب والخصومات",
    keywords: [
      "حاسبة الراتب","حساب الراتب","الراتب الصافي","خصومات الراتب",
      "صافي الراتب","الراتب بعد الخصم","حاسبة صافي الراتب",
      "حاسبه الراتب","كم راتبي الصافي","الضريبة على الراتب",
      "استقطاعات الراتب","salary calculator",
    ],
  },
  {
    title: "حاسبة الفائدة المركبة",
    href: "/financial/compound-interest",
    category: "مالية",
    icon: "📈",
    desc: "احسب نمو الاستثمار بالفائدة المركبة",
    keywords: [
      "حاسبة الفائدة المركبة","الفائدة المركبة","compound interest",
      "حساب الفائدة","نمو الاستثمار","العائد على الاستثمار",
      "حاسبة الاستثمار","فائدة مركبة","الفائده المركبه",
    ],
  },
  {
    title: "محول العملات",
    href: "/financial/currency",
    category: "مالية",
    icon: "💱",
    desc: "تحويل العملات العربية والعالمية",
    keywords: [
      "محول العملات","تحويل العملات","سعر الصرف","كم سعر الدولار",
      "تحويل دولار","currency converter","سعر الدولار اليوم",
      "سعر اليورو","تحويل عملة","محول عملات","صرف العملات",
    ],
  },
  {
    title: "حاسبة نهاية الخدمة",
    href: "/financial/end-of-service",
    category: "مالية",
    icon: "💼",
    desc: "احسب مكافأة نهاية الخدمة والتقاعد",
    keywords: [
      "حاسبة نهاية الخدمة","مكافأة نهاية الخدمة","نهاية الخدمة",
      "مكافاة نهاية الخدمة","حساب مكافأة التقاعد","التقاعد",
      "مكافأة الفصل","end of service calculator","حاسبه نهايه الخدمه",
    ],
  },
  {
    title: "التفقيط — تحويل الأرقام لكلمات",
    href: "/financial/tafqeet",
    category: "مالية",
    icon: "✍️",
    desc: "تحويل الأرقام إلى كتابة عربية بالحروف",
    keywords: [
      "تفقيط","التفقيط","كتابة الأرقام بالحروف","الأرقام بالكلمات",
      "تحويل الأرقام لحروف","تفقيط بالعربي","كتابة المبلغ بالحروف",
      "تفقيط الأرقام","تفقيط المبالغ","تفقيط عربي","الأرقام بالعربي",
    ],
  },
  {
    title: "حاسبة BMI مؤشر كتلة الجسم",
    href: "/health/bmi",
    category: "صحة",
    icon: "⚖️",
    desc: "احسب مؤشر كتلة الجسم وتصنيف الوزن",
    keywords: [
      "حاسبة BMI","مؤشر كتلة الجسم","حساب BMI","الوزن المثالي",
      "حاسبة الوزن","BMI عربي","بي ام اي","حاسبة bmi","مؤشر الوزن",
      "bmi calculator","كتلة الجسم","هل وزني مثالي",
    ],
  },
  {
    title: "حاسبة السعرات الحرارية",
    href: "/health/calories",
    category: "صحة",
    icon: "🔥",
    desc: "احسب السعرات اليومية الموصى بها حسب وزنك ونشاطك",
    keywords: [
      "حاسبة السعرات الحرارية","السعرات الحرارية","حساب السعرات",
      "كم سعر حراري","السعرات اليومية","حاسبة الكالوري","كالوري",
      "calories","حمية غذائية","احتياج السعرات","كم سعرة احتاج يومياً",
      "حاسبة الكيلو كالوري","calories calculator",
    ],
  },
  {
    title: "حاسبة الحمل وموعد الولادة",
    href: "/health/pregnancy",
    category: "صحة",
    icon: "🤰",
    desc: "احسب موعد الولادة وأسابيع الحمل",
    keywords: [
      "حاسبة الحمل","موعد الولادة","حساب موعد الولادة",
      "حاسبة مواعيد الحمل","عمر الجنين","حاسبة الحمل بالأسابيع",
      "متى موعد ولادتي","أسابيع الحمل","pregnancy calculator",
      "موعد الوضع","تاريخ الولادة المتوقع",
    ],
  },
  {
    title: "حاسبة الوزن المثالي",
    href: "/health/ideal-weight",
    category: "صحة",
    icon: "🎯",
    desc: "اعرف وزنك المثالي حسب الطول والجنس",
    keywords: [
      "حاسبة الوزن المثالي","الوزن المثالي","ما هو وزني المثالي",
      "وزن مثالي","حساب الوزن المثالي","الوزن الصحي",
      "كم يجب أن يكون وزني","الوزن الطبيعي",
      "ideal weight calculator","وزني المثالي حسب طولي",
    ],
  },
  {
    title: "حاسبة شرب الماء",
    href: "/health/water-intake",
    category: "صحة",
    icon: "💧",
    desc: "احسب كمية الماء اليومية الموصى بها",
    keywords: [
      "حاسبة شرب الماء","كمية الماء اليومية","كم أشرب ماء",
      "حاسبة الماء","الاحتياج اليومي من الماء","كمية الماء للجسم",
      "كم لتر ماء يومياً","حاسبة مياه الشرب",
      "water intake calculator","احتياج الماء اليومي",
    ],
  },
  {
    title: "حاسبة معدل الأيض BMR",
    href: "/health/bmr",
    category: "صحة",
    icon: "💪",
    desc: "احسب معدل الأيض الأساسي والطاقة اليومية",
    keywords: [
      "حاسبة معدل الأيض","معدل الأيض الأساسي","BMR","حساب BMR",
      "معدل الأيض","الطاقة الأساسية","الاحتياج الكالوري",
      "حرق السعرات في الراحة","bmr calculator","معدل الحرق",
      "الاستقلاب الأساسي",
    ],
  },
  {
    title: "حاسبة النسبة المئوية",
    href: "/math/percentage",
    category: "رياضيات",
    icon: "💯",
    desc: "احسب النسب المئوية والزيادة والنقصان",
    keywords: [
      "حاسبة النسبة المئوية","النسبة المئوية","حساب النسبة","نسبة مئوية",
      "كيف احسب النسبة","احسب النسبة المئوية","حاسبه النسبه",
      "percentage calculator","نسبة الخصم","نسبة الزيادة",
      "كيفية حساب نسبة مئوية",
    ],
  },
  {
    title: "الآلة الحاسبة العلمية",
    href: "/math/scientific",
    category: "رياضيات",
    icon: "🔬",
    desc: "حاسبة علمية متقدمة مع دوال مثلثية ولوغاريتمية",
    keywords: [
      "آلة حاسبة علمية","الحاسبة العلمية","حاسبة علمية","حاسبة متقدمة",
      "الجذر التربيعي","اللوغاريتم","حساب القوى","scientific calculator",
      "آله حاسبه علميه","حاسبة الجيب تمام","حاسبة sin cos",
      "حاسبة الرياضيات المتقدمة",
    ],
  },
  {
    title: "الآلة الحاسبة",
    href: "/math/calculator",
    category: "رياضيات",
    icon: "🧮",
    desc: "آلة حاسبة عادية سريعة وسهلة الاستخدام",
    keywords: [
      "آلة حاسبة","اله حاسبة","الة حاسبة","آله حاسبة","حاسبة","حاسبه",
      "حاسبة اون لاين","حاسبة مجانية","calculator","كالكيلاتور","الحاسبة",
      "حاسبة رياضيات","آلة حاسبة بسيطة","حاسبة أساسية","حاسبة إلكترونية",
      "حاسبة جوجل","كالكيليتور","آله حاسبه",
    ],
  },
  {
    title: "حاسبة المعدل الجامعي GPA",
    href: "/tools/gpa",
    category: "أدوات",
    icon: "🎓",
    desc: "احسب المعدل التراكمي الجامعي بدقة",
    keywords: [
      "حاسبة المعدل","المعدل التراكمي","GPA","حاسبة GPA","احسب معدلي",
      "المعدل الجامعي","معدل تراكمي","حساب المعدل","كيف احسب معدلي",
      "المعدل الدراسي","gpa calculator","حاسبة معدل جامعي",
    ],
  },
  {
    title: "حاسبة استهلاك الوقود",
    href: "/tools/fuel",
    category: "أدوات",
    icon: "⛽",
    desc: "احسب استهلاك الوقود وتكلفة الرحلة",
    keywords: [
      "حاسبة الوقود","استهلاك الوقود","حساب الوقود","تكلفة الوقود",
      "حاسبة البنزين","كم يستهلك السيارة","fuel calculator",
      "حاسبة الرحلة","استهلاك البنزين","حاسبه الوقود",
    ],
  },
  {
    title: "مولد كلمات المرور",
    href: "/tools/password",
    category: "أدوات",
    icon: "🔐",
    desc: "أنشئ كلمة مرور قوية وآمنة",
    keywords: [
      "مولد كلمات المرور","كلمة مرور قوية","password generator",
      "توليد كلمة مرور","باسورد قوي","كلمه مرور","مولد باسورد",
      "كلمة سر قوية","صنع كلمة مرور",
    ],
  },
  {
    title: "محول الوحدات",
    href: "/tools/unit-converter",
    category: "أدوات",
    icon: "🔄",
    desc: "تحويل وحدات الطول والوزن والحرارة والمساحة",
    keywords: [
      "محول الوحدات","تحويل الوحدات","unit converter","تحويل قياسات",
      "تحويل كيلو لمتر","تحويل الوزن","تحويل الحرارة",
      "تحويل فهرنهايت سيلزيوس","محول وحدات قياس",
    ],
  },
  {
    title: "حاسبة الوقت والتاريخ",
    href: "/tools/time",
    category: "أدوات",
    icon: "⏱️",
    desc: "احسب الفرق بين تاريخين وتحويل وحدات الزمن",
    keywords: [
      "حاسبة الوقت","حاسبة التاريخ","الفرق بين تاريخين",
      "حساب الأيام بين تاريخين","كم يوم بين تاريخين",
      "time calculator","حاسبة الفرق الزمني","حاسبه الوقت",
    ],
  },
  {
    title: "حاسبة درجات الطلاب",
    href: "/tools/grade",
    category: "أدوات",
    icon: "📝",
    desc: "احسب المعدل الدراسي من الدرجات والأوزان",
    keywords: [
      "حاسبة الدرجات","احسب درجتي","حساب درجة الاختبار",
      "النسبة من الدرجة","حاسبة الامتحان","grade calculator",
      "درجات الامتحان","حاسبة المجموع","النسبة المئوية للدرجة",
      "حساب تقدير","حاسبه الدرجات",
    ],
  },
  {
    title: "حاسبة المساحات",
    href: "/tools/area",
    category: "أدوات",
    icon: "📏",
    desc: "احسب مساحة ومحيط الأشكال الهندسية",
    keywords: [
      "حاسبة المساحة","حساب المساحة","مساحة المستطيل","مساحة الدائرة",
      "حاسبة الأشكال الهندسية","area calculator","محيط المستطيل",
      "مساحة المثلث","حاسبه المساحه",
    ],
  },
  {
    title: "حاسبة الخرسانة",
    href: "/tools/concrete",
    category: "أدوات",
    icon: "🏗️",
    desc: "احسب كميات الخرسانة والأسمنت للبناء",
    keywords: [
      "حاسبة الخرسانة","حساب الخرسانة","كمية الأسمنت","حاسبة البناء",
      "concrete calculator","كمية الخرسانة","حاسبة الاسمنت",
      "حسابات البناء","حاسبه الخرسانه",
    ],
  },
  {
    title: "حاسبة العمر",
    href: "/tools/age",
    category: "أدوات",
    icon: "🎂",
    desc: "احسب عمرك بالسنوات والأشهر والأيام",
    keywords: [
      "حاسبة العمر","حساب العمر","كم عمري","احسب عمرك",
      "حاسبة تاريخ الميلاد","عمري بالسنوات","حاسبه العمر",
      "عمري بالأشهر","كم يوم عمري","age calculator","احسب عمري",
      "حساب عمري الحقيقي",
    ],
  },
  {
    title: "التاريخ الهجري",
    href: "/tools/hijri-date",
    category: "أدوات",
    icon: "🌙",
    desc: "تحويل التاريخ الميلادي إلى هجري والعكس",
    keywords: [
      "التاريخ الهجري","تحويل التاريخ","تحويل ميلادي هجري",
      "حاسبة التاريخ","التاريخ الهجري اليوم","الهجري للميلادي",
      "تحويل التاريخ الهجري للميلادي","ما التاريخ الهجري اليوم",
      "تقويم هجري","hijri calendar","تقويم هجري ميلادي",
    ],
  },
  {
    title: "حاسبة الميراث الشرعي",
    href: "/tools/inheritance",
    category: "أدوات",
    icon: "⚖️",
    desc: "احسب أنصبة الميراث الشرعي وفق الفقه الإسلامي",
    keywords: [
      "حاسبة الميراث","الميراث الإسلامي","حساب الميراث","تقسيم الميراث",
      "المواريث","حاسبة المواريث","الإرث","قسمة الميراث",
      "حاسبة تركة","ميراث إسلامي","حاسبه الميراث","تقسيم التركة",
    ],
  },
];

/* ─────────────────────────────────────────────
   Category colour map
───────────────────────────────────────────── */
const CATEGORY_COLORS: Record<string, string> = {
  "مالية":    "bg-blue-100  dark:bg-blue-900/30  text-blue-700  dark:text-blue-300",
  "صحة":      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  "رياضيات":  "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
  "أدوات":    "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
};

/* ─────────────────────────────────────────────
   Search form component
───────────────────────────────────────────── */
function SearchForm({ defaultValue }: { defaultValue: string }) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    else router.push("/search");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-8" dir="rtl">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="ابحث عن حاسبة... (مثال: اله حاسبه، حاسبة الزكاه، bmi)"
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

/* ─────────────────────────────────────────────
   Result cards + filtering with normalizeArabic
───────────────────────────────────────────── */
function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const nQuery = normalizeArabic(query);

  const results = query
    ? ALL_CALCULATORS.filter((c) => {
        const nTitle    = normalizeArabic(c.title);
        const nDesc     = normalizeArabic(c.desc);
        const nCategory = normalizeArabic(c.category);
        const nKws      = c.keywords.map((k) => normalizeArabic(k)).join(" ");
        return (
          nTitle.includes(nQuery) ||
          nDesc.includes(nQuery) ||
          nCategory.includes(nQuery) ||
          nKws.includes(nQuery)
        );
      })
    : [...ALL_CALCULATORS];

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
                      CATEGORY_COLORS[calc.category] ??
                      "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
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

/* ─────────────────────────────────────────────
   Page root
───────────────────────────────────────────── */
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
