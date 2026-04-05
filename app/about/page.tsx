import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "عن حاسبات إيجيبيانا — أكبر منصة حاسبات عربية",
  description: "تعرف على حاسبات إيجيبيانا، المنصة العربية الشاملة للحاسبات المالية والصحية والرياضية والأدوات المتنوعة.",
  alternates: { canonical: "https://calculator.egypiana.com/about" },
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"عن الموقع"}]} />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-black text-[#1E293B] dark:text-white mb-2 text-right">عن حاسبات إيجيبيانا</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">المنصة العربية الشاملة للحاسبات الذكية</p>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-[#1E3A8A] to-[#1e40af] rounded-2xl p-8 text-white text-right">
            <h2 className="text-2xl font-black mb-3">رسالتنا</h2>
            <p className="text-blue-100 leading-relaxed">نسعى لتوفير أدوات حسابية دقيقة وسهلة الاستخدام باللغة العربية، تخدم المستخدم العربي في قراراته اليومية المالية والصحية والتعليمية.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { num:"30+", label:"حاسبة متخصصة" },
              { num:"4", label:"فئات رئيسية" },
              { num:"100%", label:"مجاني للأبد" },
            ].map(({ num, label }) => (
              <div key={label} className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-gray-700 p-5 text-center">
                <p className="text-4xl font-black text-[#1E3A8A]">{num}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 text-right space-y-4">
            <h2 className="text-xl font-black text-[#1E293B] dark:text-white">ما يميزنا</h2>
            <ul className="space-y-3">
              {[
                "✅ جميع الحاسبات مجانية 100% بدون تسجيل",
                "✅ واجهة عربية كاملة مع دعم RTL",
                "✅ الحسابات تتم محلياً — بياناتك لا تُرسل لخوادمنا",
                "✅ يدعم المظهر الداكن والفاتح",
                "✅ متوافق مع الجوال والحاسوب",
                "✅ يغطي المستخدمين في مصر والسعودية والإمارات والكويت",
              ].map(item => (
                <li key={item} className="text-gray-700 dark:text-gray-300">{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 text-right">
            <h2 className="text-xl font-black text-[#1E293B] dark:text-white mb-4">الفئات المتاحة</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon:"💰", title:"الحاسبات المالية", items:["ضريبة القيمة المضافة","الراتب الصافي","قرض بنكي","زكاة المال","مكافأة نهاية الخدمة"] },
                { icon:"❤️", title:"الحاسبات الصحية", items:["مؤشر كتلة الجسم","السعرات الحرارية","الوزن المثالي","شرب الماء","موعد الولادة"] },
                { icon:"🔢", title:"الحاسبات الرياضية", items:["آلة حاسبة علمية","النسبة المئوية"] },
                { icon:"🛠️", title:"أدوات متنوعة", items:["حاسبة العمر","التاريخ الهجري","محول الوحدات","مولّد كلمات المرور"] },
              ].map(cat => (
                <div key={cat.title}>
                  <h3 className="font-bold text-[#1E293B] dark:text-white mb-2">{cat.icon} {cat.title}</h3>
                  <ul className="space-y-1">
                    {cat.items.map(item => (
                      <li key={item} className="text-sm text-gray-500 dark:text-gray-400">• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link href="/contact" className="inline-block bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold px-8 py-3 rounded-xl transition-colors">
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
