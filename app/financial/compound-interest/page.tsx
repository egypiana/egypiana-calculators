import type { Metadata } from "next";
import CompoundInterestCalculator from "@/components/calculators/CompoundInterestCalculator";
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
  title: "حاسبة الفائدة المركبة — نمو الاستثمار والادخار",
  description: "احسب نمو استثمارك مع الفائدة المركبة. أدخل رأس المال والإضافات الشهرية ونسبة العائد لترى جدول النمو السنوي.",
  keywords: ALL_CALC_SEO["compound-interest"].keywords,
  alternates: { canonical: "https://calculator.egypiana.com/financial/compound-interest" },
};

const faqs = [
  {question:"ما هي الفائدة المركبة؟",answer:"الفائدة المركبة هي حساب الفائدة على أصل المبلغ والفوائد المتراكمة معاً. بمعنى أن فائدة كل فترة تُضاف إلى رأس المال وتصبح أساساً لحساب الفائدة التالية، مما يُسرّع نمو الاستثمار بشكل كبير."},
  {question:"ما الفرق بين الفائدة المركبة والبسيطة؟",answer:"الفائدة البسيطة تُحسب على رأس المال الأصلي فقط، بينما المركبة تُحسب على رأس المال + الفوائد المتراكمة. مثال: 10,000 بفائدة 10% لـ 10 سنوات: بسيطة = 20,000، مركبة سنوية = 25,937."},
  {question:"كيف تؤثر تكرارية الاحتساب على النمو؟",answer:"كلما زادت تكرارية احتساب الفائدة، زاد العائد الفعلي. الترتيب تصاعدياً: سنوي < نصف سنوي < ربع سنوي < شهري < يومي. الفرق ملحوظ على المدى الطويل."},
  {question:"ما هي قاعدة 72 في الاستثمار؟",answer:"قاعدة 72 تقول: اقسم 72 على نسبة العائد السنوي للحصول على عدد السنوات المطلوبة لمضاعفة رأس المال. مثال: عائد 8% سنوياً → 72÷8 = 9 سنوات لمضاعفة الاستثمار."},
  {question:"كيف تزيد من عائد استثمارك؟",answer:"1) ابدأ مبكراً — الوقت هو أقوى عوامل الفائدة المركبة. 2) أضف مساهمات منتظمة شهرياً. 3) اختر تكرارية احتساب أعلى (شهري بدل سنوي). 4) أعد استثمار الأرباح بدلاً من سحبها."},
];

export default function CompoundInterestPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"الحاسبات المالية",href:"/financial"},{label:"حاسبة الفائدة المركبة"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">حاسبة الفائدة المركبة</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">اكتشف كيف ينمو استثمارك مع قوة الفائدة المركبة</p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <CompoundInterestCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"><ShareButtons title="حاسبة الفائدة المركبة" /></div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/financial/compound-interest" title="حاسبة الفائدة المركبة" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["compound-interest"]} />

            <AlsoKnownAs keywords={ALL_CALC_SEO["compound-interest"].keywords} />

            

            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={[
              {label:"حاسبة القرض",href:"/financial/loan",icon:"🏦",description:"أقساط القرض"},
              {label:"حاسبة الراتب الصافي",href:"/financial/salary",icon:"💵",description:"صافي الراتب"},
              {label:"حاسبة الزكاة",href:"/financial/zakat",icon:"🕌",description:"زكاة المال"},
              {label:"حاسبة القيمة المضافة",href:"/financial/vat",icon:"🧾",description:"حساب الضريبة"},
            ]} />
            <FeaturedArticles />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
