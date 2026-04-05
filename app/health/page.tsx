import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdBlock from "@/components/ads/AdBlock";

export const metadata: Metadata = {
  title: "الحاسبات الصحية — BMI، سعرات، وزن مثالي، حمل وأكثر",
  description: "حاسبات صحية متخصصة: مؤشر كتلة الجسم، السعرات الحرارية، الوزن المثالي، شرب الماء، الحمل، BMR ومزيد.",
  keywords: ["الحاسبات الصحية","BMI","السعرات الحرارية","الوزن المثالي","حاسبة الحمل"],
  alternates: { canonical: "https://calculator.egypiana.com/health" },
};

const calculators = [
  { href:"/health/bmi", icon:"⚖️", title:"مؤشر كتلة الجسم BMI", desc:"هل أنت بوزن مثالي؟" },
  { href:"/health/calories", icon:"🔥", title:"السعرات الحرارية", desc:"احتياجك اليومي TDEE" },
  { href:"/health/bmr", icon:"⚡", title:"معدل الأيض BMR", desc:"معدل حرق الجسم في الراحة" },
  { href:"/health/ideal-weight", icon:"🎯", title:"الوزن المثالي", desc:"وزنك المثالي لطولك" },
  { href:"/health/water-intake", icon:"💧", title:"شرب الماء", desc:"كميتك اليومية المثالية" },
  { href:"/health/pregnancy", icon:"🤰", title:"حاسبة الحمل", desc:"موعد الولادة وأسبوع الحمل" },
];

export default function HealthPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"الحاسبات الصحية"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">الحاسبات الصحية</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">أدوات صحية دقيقة لمتابعة وزنك وصحتك ونمط حياتك</p>
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
