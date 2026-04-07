import type { Metadata } from "next";
import PasswordGenerator from "@/components/calculators/PasswordGenerator";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FAQSection from "@/components/shared/FAQSection";
import ShareButtons from "@/components/shared/ShareButtons";
import EmbedCode from "@/components/shared/EmbedCode";
import RelatedCalculators from "@/components/shared/RelatedCalculators";
import AdBlock from "@/components/ads/AdBlock";
import CalcSEOContent from "@/components/shared/CalcSEOContent";
import AlsoKnownAs from "@/components/shared/AlsoKnownAs";

import { ALL_CALC_SEO } from "@/lib/calc-seo";


export const metadata: Metadata = {
  title: "مولّد كلمات المرور القوية — آمن ومجاني",
  description: "أنشئ كلمات مرور قوية وآمنة بضغطة زر. تحكم في الطول والأحرف والرموز. يقيّم قوة كلمة مرورك فورياً.",
  keywords: ALL_CALC_SEO["password"].keywords,
  alternates: { canonical: "https://calculator.egypiana.com/tools/password" },
};

const faqs = [
  {question:"ما هي مواصفات كلمة المرور القوية؟",answer:"كلمة المرور القوية تحتوي على: 12 حرفاً أو أكثر، أحرف كبيرة وصغيرة، أرقام، رموز خاصة (!@#$). تجنب الكلمات الشائعة والأرقام المتسلسلة ومعلوماتك الشخصية كتاريخ الميلاد."},
  {question:"هل كلمات المرور المولّدة مخزّنة على خوادم؟",answer:"لا، الحاسبة تعمل بالكامل في متصفحك دون إرسال أي بيانات للخوادم. كلمة مرورك تبقى محلياً على جهازك فقط. نحن لا نسجل ولا نخزن أي كلمات مرور."},
  {question:"هل أحتاج كلمة مرور مختلفة لكل موقع؟",answer:"نعم، هذا أساسي. إذا اختُرق موقع واحد وكنت تستخدم نفس كلمة المرور، يُعرّض ذلك جميع حساباتك للخطر (هجوم Credential Stuffing). استخدم مدير كلمات مرور (Bitwarden, 1Password) لحفظها."},
  {question:"ما هو مدير كلمات المرور وهل هو آمن؟",answer:"مدير كلمات المرور يُخزّن كلماتك المشفرة وراء كلمة مرور رئيسية واحدة. أبرزها: Bitwarden (مجاني ومفتوح المصدر)، 1Password، Dashlane. أكثر أماناً بكثير من تكرار كلمات المرور."},
  {question:"ما هي المصادقة الثنائية وهل تحل محل كلمة المرور القوية؟",answer:"المصادقة الثنائية (2FA) هي طبقة أمان إضافية (رمز SMS أو تطبيق مثل Google Authenticator) لا تحل محل كلمة المرور القوية بل تُكملها. استخدم كلمة مرور قوية + 2FA معاً لأقصى حماية."},
];

export default function PasswordPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"أدوات متنوعة",href:"/tools"},{label:"مولّد كلمات المرور"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">مولّد كلمات المرور القوية</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">أنشئ كلمات مرور آمنة وقوية لحماية حساباتك</p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <PasswordGenerator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"><ShareButtons title="مولّد كلمات المرور القوية" /></div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/tools/password" title="مولّد كلمات المرور القوية" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["password"]} />

            <AlsoKnownAs keywords={ALL_CALC_SEO["password"].keywords} />

            

            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={[
              {label:"محول الوحدات",href:"/tools/unit-converter",icon:"🔄",description:"تحويل المقاييس"},
              {label:"حاسبة العمر",href:"/tools/age",icon:"🎂",description:"عمرك بالتفصيل"},
              {label:"حاسبة التاريخ الهجري",href:"/tools/hijri-date",icon:"🌙",description:"تحويل التاريخ"},
              {label:"الآلة الحاسبة",href:"/math/calculator",icon:"🔢",description:"حاسبة علمية"},
            ]} />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
