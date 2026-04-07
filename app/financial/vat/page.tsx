import type { Metadata } from "next";
import VATCalculator from "@/components/calculators/VATCalculator";
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
  title: "حاسبة ضريبة القيمة المضافة VAT — إضافة واستخراج الضريبة",
  description: "احسب ضريبة القيمة المضافة بسهولة — أضف الضريبة على المبلغ أو استخرجها منه. يدعم نسب 5% و15% و20% وأي نسبة مخصصة.",
  keywords: ALL_CALC_SEO["vat"].keywords,
  alternates: { canonical: "https://calculator.egypiana.com/financial/vat" },
};

const faqs = [
  {question:"ما هي ضريبة القيمة المضافة؟",answer:"ضريبة القيمة المضافة (VAT) هي ضريبة غير مباشرة تُضاف على سعر السلع والخدمات في كل مرحلة من مراحل الإنتاج والتوزيع. في السعودية 15%، في الإمارات 5%، في مصر 14%."},
  {question:"كيف أحسب ضريبة القيمة المضافة 15%؟",answer:"اضرب المبلغ × 0.15 للحصول على قيمة الضريبة. والمجموع = المبلغ × 1.15. مثال: 1000 ريال + 15% = 150 ريال ضريبة = 1150 ريال إجمالي."},
  {question:"كيف أستخرج الضريبة من المبلغ الشامل؟",answer:"اقسم المبلغ الإجمالي على (1 + نسبة الضريبة). مثال: 1150 ÷ 1.15 = 1000 ريال (المبلغ بدون ضريبة)."},
  {question:"ما الفرق بين ضريبة القيمة المضافة وضريبة المبيعات؟",answer:"ضريبة القيمة المضافة تُطبَّق في كل مرحلة إنتاج وتوزيع مع حق استرداد ما دُفع في المراحل السابقة. ضريبة المبيعات تُطبَّق مرة واحدة عند البيع النهائي للمستهلك."},
  {question:"هل يمكن استرداد ضريبة القيمة المضافة؟",answer:"نعم، المنشآت المسجلة في ضريبة القيمة المضافة يحق لها استرداد الضريبة التي دفعتها على مشترياتها (ضريبة المدخلات) من الضريبة التي جمعتها من مبيعاتها."},
];

export default function VATPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"الحاسبات المالية",href:"/financial"},{label:"حاسبة الضريبة"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">حاسبة ضريبة القيمة المضافة VAT</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">أضف الضريبة على السعر أو استخرجها من المبلغ الشامل</p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <VATCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"><ShareButtons title="حاسبة ضريبة القيمة المضافة VAT" /></div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/financial/vat" title="حاسبة ضريبة القيمة المضافة VAT" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["vat"]} />

            <AlsoKnownAs keywords={ALL_CALC_SEO["vat"].keywords} />

            

            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={[
              {label:"حاسبة الراتب الصافي",href:"/financial/salary",icon:"💵",description:"صافي الراتب"},
              {label:"حاسبة الزكاة",href:"/financial/zakat",icon:"🕌",description:"زكاة المال"},
              {label:"التفقيط",href:"/financial/tafqeet",icon:"📝",description:"كتابة المبالغ"},
              {label:"حاسبة القرض",href:"/financial/loan",icon:"🏦",description:"أقساط القرض"},
            ]} />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
