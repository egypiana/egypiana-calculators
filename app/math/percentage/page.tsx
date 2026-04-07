import type { Metadata } from "next";
import PercentageCalculator from "@/components/calculators/PercentageCalculator";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FAQSection from "@/components/shared/FAQSection";
import ShareButtons from "@/components/shared/ShareButtons";
import EmbedCode from "@/components/shared/EmbedCode";
import RelatedCalculators from "@/components/shared/RelatedCalculators";
import AdBlock from "@/components/ads/AdBlock";
import CalcSEOContent from "@/components/shared/CalcSEOContent";
import AlsoKnownAs from "@/components/shared/AlsoKnownAs";

import { ALL_CALC_SEO } from "@/lib/calc-seo";
import FeaturedArticles from "@/components/shared/FeaturedArticles";



export const metadata: Metadata = {
  title: "حاسبة النسبة المئوية — جميع أنواع حسابات النسب",
  description: "احسب النسب المئوية بسهولة: نسبة من رقم، ما نسبة X من Y، نسبة التغير، إضافة أو طرح نسبة. 5 أوضاع احتساب.",
  keywords: ALL_CALC_SEO["percentage"].keywords,
  alternates: { canonical: "https://calculator.egypiana.com/math/percentage" },
};

const faqs = [
  {question:"كيف أحسب نسبة مئوية من رقم؟",answer:"اضرب الرقم في النسبة ثم اقسم على 100. مثال: 20% من 500 = 500 × 20 ÷ 100 = 100. أو بشكل أسرع: 500 × 0.20 = 100."},
  {question:"كيف أحسب نسبة التغير بين رقمين؟",answer:"نسبة التغير = (القيمة الجديدة - القيمة القديمة) ÷ القيمة القديمة × 100. إذا كانت النتيجة موجبة فهي زيادة، وإذا كانت سالبة فهي نقص."},
  {question:"ما هو رقم إذا كان 30 يمثل 15% منه؟",answer:"اقسم الرقم المعروف على النسبة واضرب في 100: 30 ÷ 15 × 100 = 200. إذن 30 هو 15% من 200."},
  {question:"كيف أضيف نسبة على سعر؟",answer:"اضرب السعر في (1 + النسبة÷100). مثال: إضافة 15% على 1000 = 1000 × 1.15 = 1150. أو احسب قيمة النسبة (150) وأضفها: 1000 + 150 = 1150."},
  {question:"كيف أطرح خصماً من سعر؟",answer:"اضرب السعر في (1 - الخصم÷100). مثال: خصم 20% من 500 = 500 × 0.80 = 400. أو احسب قيمة الخصم (100) واطرحها: 500 - 100 = 400."},
];

export default function PercentagePage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"الحاسبات الرياضية",href:"/math"},{label:"حاسبة النسبة المئوية"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">حاسبة النسبة المئوية</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">احسب أي نسبة مئوية بـ 5 أوضاع مختلفة</p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <PercentageCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"><ShareButtons title="حاسبة النسبة المئوية" /></div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/math/percentage" title="حاسبة النسبة المئوية" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["percentage"]} />

            <AlsoKnownAs keywords={ALL_CALC_SEO["percentage"].keywords} />

            

            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={[
              {label:"الآلة الحاسبة",href:"/math/calculator",icon:"🔢",description:"حاسبة علمية"},
              {label:"حاسبة المعدل",href:"/tools/gpa",icon:"🎓",description:"GPA الترم"},
              {label:"حاسبة القيمة المضافة",href:"/financial/vat",icon:"🧾",description:"حساب الضريبة"},
              {label:"حاسبة الفائدة المركبة",href:"/financial/compound-interest",icon:"📈",description:"نمو الاستثمار"},
            ]} />
            <FeaturedArticles />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
