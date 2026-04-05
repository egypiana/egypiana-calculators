import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdBlock from "@/components/ads/AdBlock";

export const metadata: Metadata = {
  title: "جميع الحاسبات — أكثر من 30 حاسبة عربية",
  description: "تصفح جميع الحاسبات المتاحة: مالية، صحية، رياضية، وأدوات متنوعة. أكثر من 30 حاسبة عربية مجانية.",
  keywords: ["جميع الحاسبات","حاسبات عربية","حاسبات مجانية","أدوات حسابية"],
  alternates: { canonical: "https://calculator.egypiana.com/calculators" },
};

const ALL_CALCULATORS = [
  {
    category: "💰 الحاسبات المالية",
    items: [
      { href:"/financial/vat", icon:"🧾", title:"ضريبة القيمة المضافة" },
      { href:"/financial/salary", icon:"💵", title:"الراتب الصافي" },
      { href:"/financial/loan", icon:"🏦", title:"حاسبة القرض" },
      { href:"/financial/mortgage", icon:"🏠", title:"القرض العقاري" },
      { href:"/financial/compound-interest", icon:"📈", title:"الفائدة المركبة" },
      { href:"/financial/zakat", icon:"🕌", title:"حاسبة الزكاة" },
      { href:"/financial/end-of-service", icon:"💼", title:"مكافأة نهاية الخدمة" },
      { href:"/financial/tafqeet", icon:"📝", title:"التفقيط" },
      { href:"/financial/currency", icon:"💱", title:"محول العملات" },
    ],
  },
  {
    category: "❤️ الحاسبات الصحية",
    items: [
      { href:"/health/bmi", icon:"⚖️", title:"مؤشر كتلة الجسم BMI" },
      { href:"/health/calories", icon:"🔥", title:"السعرات الحرارية" },
      { href:"/health/bmr", icon:"⚡", title:"معدل الأيض BMR" },
      { href:"/health/ideal-weight", icon:"🎯", title:"الوزن المثالي" },
      { href:"/health/water-intake", icon:"💧", title:"شرب الماء" },
      { href:"/health/pregnancy", icon:"🤰", title:"حاسبة الحمل" },
    ],
  },
  {
    category: "🔢 الحاسبات الرياضية",
    items: [
      { href:"/math/calculator", icon:"🔢", title:"الآلة الحاسبة" },
      { href:"/math/scientific", icon:"🔬", title:"الحاسبة العلمية" },
      { href:"/math/percentage", icon:"💯", title:"النسبة المئوية" },
    ],
  },
  {
    category: "🛠️ أدوات متنوعة",
    items: [
      { href:"/tools/age", icon:"🎂", title:"حاسبة العمر" },
      { href:"/tools/hijri-date", icon:"🌙", title:"التاريخ الهجري" },
      { href:"/tools/inheritance", icon:"⚖️", title:"حاسبة المواريث" },
      { href:"/tools/gpa", icon:"🎓", title:"المعدل التراكمي GPA" },
      { href:"/tools/grade", icon:"📊", title:"حاسبة الدرجات" },
      { href:"/tools/fuel", icon:"⛽", title:"استهلاك الوقود" },
      { href:"/tools/unit-converter", icon:"🔄", title:"محول الوحدات" },
      { href:"/tools/time", icon:"⏱️", title:"حاسبة الوقت" },
      { href:"/tools/area", icon:"📐", title:"حاسبة المساحة" },
      { href:"/tools/concrete", icon:"🏗️", title:"حاسبة الخرسانة" },
      { href:"/tools/password", icon:"🔐", title:"مولّد كلمات المرور" },
    ],
  },
];

export default function CalculatorsPage() {
  const total = ALL_CALCULATORS.reduce((s, c) => s + c.items.length, 0);
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"جميع الحاسبات"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">جميع الحاسبات</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">{total}+ حاسبة عربية مجانية في مكان واحد</p>
        <div className="flex justify-center mb-8"><AdBlock format="leaderboard" /></div>
        <div className="space-y-10">
          {ALL_CALCULATORS.map(cat => (
            <section key={cat.category}>
              <h2 className="text-xl font-black text-[#1E293B] dark:text-white mb-4 text-right">{cat.category}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {cat.items.map(c => (
                  <Link key={c.href} href={c.href}
                    className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-gray-700 p-4 hover:shadow-md hover:border-[#1E3A8A] transition-all group flex items-center gap-3">
                    <span className="text-2xl flex-shrink-0">{c.icon}</span>
                    <span className="text-sm font-bold text-[#1E293B] dark:text-white group-hover:text-[#1E3A8A] transition-colors">{c.title}</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
