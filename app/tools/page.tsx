import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AdBlock from "@/components/ads/AdBlock";

export const metadata: Metadata = {
  title: "أدوات متنوعة — عمر، تاريخ، وقود، وحدات، كلمة مرور",
  description: "أدوات حسابية متنوعة: حاسبة العمر، التاريخ الهجري، المواريث، المعدل GPA، استهلاك الوقود، محول الوحدات وأكثر.",
  keywords: ["أدوات حسابية","حاسبة العمر","محول وحدات","التاريخ الهجري","GPA"],
  alternates: { canonical: "https://calculator.egypiana.com/tools" },
};

const calculators = [
  { href:"/tools/age", icon:"🎂", title:"حاسبة العمر", desc:"عمرك بالسنوات والأشهر والأيام" },
  { href:"/tools/hijri-date", icon:"🌙", title:"التاريخ الهجري", desc:"تحويل بين الهجري والميلادي" },
  { href:"/tools/inheritance", icon:"⚖️", title:"حاسبة المواريث", desc:"توزيع التركة شرعياً" },
  { href:"/tools/gpa", icon:"🎓", title:"المعدل التراكمي GPA", desc:"نظام 4.0 و5.0 و100" },
  { href:"/tools/grade", icon:"📊", title:"حاسبة الدرجات", desc:"متوسط موزون وتقدير حرفي" },
  { href:"/tools/fuel", icon:"⛽", title:"استهلاك الوقود", desc:"تكلفة الرحلة ومدى الخزان" },
  { href:"/tools/unit-converter", icon:"🔄", title:"محول الوحدات", desc:"طول، وزن، حرارة، مساحة وأكثر" },
  { href:"/tools/time", icon:"⏱️", title:"حاسبة الوقت", desc:"الفرق بين تاريخين وتحويل الوحدات" },
  { href:"/tools/area", icon:"📐", title:"حاسبة المساحة", desc:"مساحة ومحيط الأشكال الهندسية" },
  { href:"/tools/concrete", icon:"🏗️", title:"حاسبة الخرسانة", desc:"كميات الأسمنت والرمل والزلط" },
  { href:"/tools/password", icon:"🔐", title:"مولّد كلمات المرور", desc:"كلمات مرور قوية وآمنة" },
];

export default function ToolsPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"أدوات متنوعة"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">أدوات متنوعة</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">مجموعة أدوات عملية تُسهّل حساباتك اليومية</p>
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
