import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdBlock from "@/components/ads/AdBlock";

export const metadata: Metadata = {
  title: "الحاسبات الرياضية — علمية، نسب، كسور وأكثر",
  description: "حاسبات رياضية متنوعة: آلة حاسبة علمية، النسبة المئوية، العمليات الحسابية وحل المسائل الرياضية.",
  keywords: ["الحاسبات الرياضية","آلة حاسبة علمية","نسبة مئوية","رياضيات"],
  alternates: { canonical: "https://calculator.egypiana.com/math" },
};

const calculators = [
  { href:"/math/calculator", icon:"🔢", title:"الآلة الحاسبة", desc:"حاسبة ذكية مع سجل العمليات" },
  { href:"/math/scientific", icon:"🔬", title:"الحاسبة العلمية", desc:"sin، cos، log، جذور وأكثر" },
  { href:"/math/percentage", icon:"💯", title:"النسبة المئوية", desc:"5 أوضاع لحساب النسب" },
];

export default function MathPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"الحاسبات الرياضية"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">الحاسبات الرياضية</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">أدوات رياضية دقيقة لجميع احتياجاتك الحسابية</p>
        <div className="flex justify-center mb-8"><AdBlock format="leaderboard" /></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {calculators.map(c => (
            <Link key={c.href} href={c.href}
              className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-5 hover:shadow-lg hover:border-[#1E3A8A] transition-all group">
              <div className="text-4xl mb-3">{c.icon}</div>
              <h2 className="text-lg font-black text-[#1E293B] dark:text-white mb-1 group-hover:text-[#1E3A8A] transition-colors text-right">{c.title}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm text-right">{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
