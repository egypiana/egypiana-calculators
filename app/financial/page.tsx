import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdBlock from "@/components/ads/AdBlock";

export const metadata: Metadata = {
  title: "الحاسبات المالية — زكاة، قرض، ضريبة، راتب وأكثر",
  description: "مجموعة شاملة من الحاسبات المالية: ضريبة القيمة المضافة، الراتب الصافي، قرض بنكي، مكافأة نهاية الخدمة، الزكاة، الفائدة المركبة والمزيد.",
  keywords: ["الحاسبات المالية","حاسبة ضريبة","حاسبة قرض","حاسبة راتب","زكاة المال"],
  alternates: { canonical: "https://calculator.egypiana.com/financial" },
};

const calculators = [
  { href:"/financial/vat", icon:"🧾", title:"ضريبة القيمة المضافة", desc:"إضافة واستخراج VAT بأي نسبة" },
  { href:"/financial/salary", icon:"💵", title:"الراتب الصافي", desc:"بعد الضرائب والتأمينات" },
  { href:"/financial/loan", icon:"🏦", title:"حاسبة القرض", desc:"الأقساط وجدول الإهلاك" },
  { href:"/financial/mortgage", icon:"🏠", title:"القرض العقاري", desc:"قسط الرهن وإجمالي الفوائد" },
  { href:"/financial/compound-interest", icon:"📈", title:"الفائدة المركبة", desc:"نمو الاستثمار والمدخرات" },
  { href:"/financial/zakat", icon:"🕌", title:"حاسبة الزكاة", desc:"زكاة المال والنصاب" },
  { href:"/financial/end-of-service", icon:"💼", title:"مكافأة نهاية الخدمة", desc:"احتسابها في 4 دول" },
  { href:"/financial/tafqeet", icon:"📝", title:"التفقيط", desc:"كتابة المبالغ بالحروف" },
  { href:"/financial/currency", icon:"💱", title:"محول العملات", desc:"تحويل بين العملات العربية والعالمية" },
  { href:"/tools/inheritance", icon:"⚖️", title:"حاسبة المواريث", desc:"توزيع التركة شرعياً" },
];

export default function FinancialPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"الحاسبات المالية"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">الحاسبات المالية</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">كل ما تحتاجه لإدارة أموالك وفهم الضرائب والقروض</p>
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
