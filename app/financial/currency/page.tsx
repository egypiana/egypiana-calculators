import type { Metadata } from "next";
import CurrencyConverter from "@/components/calculators/CurrencyConverter";
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
  title: "محول العملات العربية — دولار يورو ريال جنيه درهم",
  description: "حوّل بين العملات العربية والعالمية: الجنيه المصري، الريال السعودي، الدرهم الإماراتي، الدولار، اليورو وأكثر.",
  keywords: ALL_CALC_SEO["currency"].keywords,
  alternates: { canonical: "https://calculator.egypiana.com/financial/currency" },
};

const faqs = [
  {question:"هل الأسعار في الحاسبة محدّثة لحظياً؟",answer:"الأسعار المعروضة تقريبية وللمرجعية العامة فقط. للمعاملات المالية الفعلية استخدم الأسعار الرسمية من البنوك أو منصات الصرف المرخصة. أسعار الصرف تتغير لحظة بلحظة في الأسواق."},
  {question:"ما الفرق بين سعر الشراء والبيع؟",answer:"البنوك وشركات الصرافة تضع فرقاً (Spread) بين سعر الشراء والبيع. عندما تبيع عملة للبنك يدفع أقل (سعر الشراء)، وعندما تشتري يطلب أكثر (سعر البيع). الفرق هو ربح الوسيط."},
  {question:"أين أجد أفضل سعر صرف؟",answer:"قارن بين عدة مصادر: البنوك المحلية، شركات الصرافة، المنصات الرقمية (Wise, Revolut). عموماً المنصات الرقمية تقدم أقرب سعر لسعر السوق الفعلي مع رسوم أقل من البنوك التقليدية."},
  {question:"ما هو الدولار الأمريكي ولماذا يُستخدم مرجعاً؟",answer:"الدولار الأمريكي (USD) هو العملة الاحتياطية العالمية الرئيسية، يُستخدم في معظم التجارة الدولية والنفط. أكثر من 60% من احتياطيات البنوك المركزية محتفظ بها بالدولار، مما يجعله المرجع القياسي."},
  {question:"ما العملة الأقوى في العالم العربي؟",answer:"الدينار الكويتي (KWD) هو أعلى عملة قيمةً في العالم العربي والعالم بأسره (1 دينار = ~3.26 دولار). يليه الدينار البحريني (BHD) والريال العُماني (OMR). قوة العملة ترتبط باحتياطيات النفط والسياسات الاقتصادية."},
];

export default function CurrencyPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"الحاسبات المالية",href:"/financial"},{label:"محول العملات"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">محوّل العملات العربية والعالمية</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">حوّل بين أبرز العملات العربية والعالمية بأسعار مرجعية</p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <CurrencyConverter />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"><ShareButtons title="محوّل العملات" /></div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/financial/currency" title="محوّل العملات العربية والعالمية" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["currency"]} />

            <AlsoKnownAs keywords={ALL_CALC_SEO["currency"].keywords} />

            

            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={[
              {label:"حاسبة القيمة المضافة",href:"/financial/vat",icon:"🧾",description:"حساب الضريبة"},
              {label:"التفقيط",href:"/financial/tafqeet",icon:"📝",description:"كتابة المبالغ"},
              {label:"حاسبة الراتب الصافي",href:"/financial/salary",icon:"💵",description:"صافي الراتب"},
              {label:"حاسبة الفائدة المركبة",href:"/financial/compound-interest",icon:"📈",description:"نمو الاستثمار"},
            ]} />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
