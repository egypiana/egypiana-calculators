import type { Metadata } from "next";
import SalaryCalculator from "@/components/calculators/SalaryCalculator";
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
  title: "حاسبة الراتب الصافي — بعد الضرائب والتأمينات",
  description: "احسب راتبك الصافي بعد خصم التأمينات الاجتماعية وضريبة الدخل في مصر والسعودية والإمارات. نتيجة دقيقة فورية.",
  keywords: ALL_CALC_SEO["salary"].keywords,
  alternates: { canonical: "https://calculator.egypiana.com/financial/salary" },
};

const faqs = [
  {question:"كيف يُحسب الراتب الصافي في مصر؟",answer:"يُخصم من الراتب الإجمالي: التأمين الاجتماعي (11% من الأجر المؤمن عليه بحد أقصى 9400 جنيه) ثم ضريبة الدخل التصاعدية على الوعاء الخاضع بعد الإعفاء الشخصي (15000 جنيه سنوياً)."},
  {question:"ما هي شرائح ضريبة الدخل في مصر 2024؟",answer:"0% للشريحة حتى 40,000 جنيه، 10% (40,001–55,000)، 15% (55,001–70,000)، 20% (70,001–200,000)، 22.5% (200,001–400,000)، 25% (400,001–1,200,000)، 27.5% فوق 1,200,000 جنيه سنوياً."},
  {question:"ما هو خصم GOSI في السعودية؟",answer:"خصم التأمينات الاجتماعية للموظف السعودي 10% من الراتب الأساسي (حد أقصى 45,000 ريال)، بينما الموظف الأجنبي يخضع لـ 2% فقط (تأمين الأخطار المهنية)."},
  {question:"هل هناك ضريبة دخل في الإمارات؟",answer:"لا، لا توجد ضريبة دخل على الأفراد في الإمارات العربية المتحدة. الراتب الصافي يساوي الراتب الإجمالي (مع إمكانية خصم تأمين صحي أو مساهمات اختيارية)."},
  {question:"ما الفرق بين الراتب الأساسي والراتب الإجمالي؟",answer:"الراتب الأساسي هو المبلغ الثابت قبل البدلات، بينما الراتب الإجمالي يشمل الأساسي + بدل السكن + بدل التنقل + باقي البدلات. معظم الخصومات تُحسب على الراتب الأساسي أو الإجمالي حسب اللوائح."},
];

export default function SalaryPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"الحاسبات المالية",href:"/financial"},{label:"حاسبة الراتب الصافي"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">حاسبة الراتب الصافي</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">احسب راتبك بعد خصم الضرائب والتأمينات الاجتماعية</p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <SalaryCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"><ShareButtons title="حاسبة الراتب الصافي" /></div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/financial/salary" title="حاسبة الراتب الصافي" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["salary"]} />

            <AlsoKnownAs keywords={ALL_CALC_SEO["salary"].keywords} />

            

            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={[
              {label:"حاسبة ضريبة القيمة المضافة",href:"/financial/vat",icon:"🧾",description:"إضافة واستخراج الضريبة"},
              {label:"حاسبة مكافأة نهاية الخدمة",href:"/financial/end-of-service",icon:"💼",description:"احتساب المكافأة"},
              {label:"حاسبة الزكاة",href:"/financial/zakat",icon:"🕌",description:"زكاة المال"},
              {label:"حاسبة الفائدة المركبة",href:"/financial/compound-interest",icon:"📈",description:"نمو الاستثمار"},
            ]} />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
