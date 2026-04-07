import type { Metadata } from "next";
import EndOfServiceCalculator from "@/components/calculators/EndOfServiceCalculator";
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
  title: "حاسبة نهاية الخدمة — السعودية والإمارات ومصر 2026",
  description:
    "احسب مكافأة نهاية الخدمة بدقة للسعودية والإمارات ومصر والكويت. تشمل جميع حالات الاستقالة والإنهاء والتقاعد مع شرح تفصيلي للقانون.",
  keywords: ALL_CALC_SEO["end-of-service"].keywords,
  alternates: { canonical: "https://calculator.egypiana.com/financial/end-of-service" },
};

const faqs = [
  {
    question: "كيف تُحسب مكافأة نهاية الخدمة في السعودية؟",
    answer: "في السعودية: أول 5 سنوات = نصف راتب شهري لكل سنة، وبعد 5 سنوات = راتب شهري كامل لكل سنة. عند الاستقالة تختلف النسب: أقل من سنتين لا مكافأة، 2-5 سنوات ثلث المكافأة، 5-10 سنوات ثلثا المكافأة، 10 سنوات فأكثر المكافأة كاملة.",
  },
  {
    question: "هل تُحتسب البدلات في مكافأة نهاية الخدمة؟",
    answer: "في الغالب تُحسب المكافأة على الراتب الأساسي فقط دون البدلات، إلا إذا نص العقد على خلاف ذلك. يُرجى مراجعة عقد العمل الخاص بك.",
  },
  {
    question: "هل يحق للعامل المُفصول مكافأة كاملة؟",
    answer: "نعم، العامل الذي يُفصل من العمل دون سبب مشروع يستحق المكافأة الكاملة في السعودية والإمارات. أما إذا كان الفصل بسبب مخالفة صريحة فقد تُخفَّض المكافأة.",
  },
  {
    question: "ما هو الراتب الأساسي المُستخدم في الحساب؟",
    answer: "يُستخدم الراتب الأساسي وقت انتهاء الخدمة (آخر راتب). في بعض الأنظمة يُضاف إليه بدل السكن في الحساب.",
  },
  {
    question: "متى تُصرف مكافأة نهاية الخدمة؟",
    answer: "يجب صرف مكافأة نهاية الخدمة عند انتهاء العقد. في السعودية يُعدّ صاحب العمل مخالفاً إذا أخّر الصرف أكثر من أسبوعين. في الإمارات مدة السماح لا تتجاوز 14 يوماً.",
  },
];

const relatedCalcs = [
  { label: "حاسبة الراتب الصافي", href: "/financial/salary", icon: "💵", description: "صافي الراتب" },
  { label: "حاسبة القرض", href: "/financial/loan", icon: "🏦", description: "أقساط القرض" },
  { label: "حاسبة الزكاة", href: "/financial/zakat", icon: "🕌", description: "زكاة المال" },
  { label: "التفقيط", href: "/financial/tafqeet", icon: "📝", description: "تفقيط المبالغ" },
];

export default function EndOfServicePage() {
  return (
    <>
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "الحاسبات المالية", href: "/financial" }, { label: "حاسبة نهاية الخدمة" }]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">
          حاسبة مكافأة نهاية الخدمة
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">
          احسب مكافأتك وفق نظام العمل في السعودية والإمارات ومصر والكويت
        </p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <EndOfServiceCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <ShareButtons title="حاسبة نهاية الخدمة — السعودية والإمارات ومصر" />
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/financial/end-of-service" title="حاسبة مكافأة نهاية الخدمة" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["end-of-service"]} />

            <AlsoKnownAs keywords={ALL_CALC_SEO["end-of-service"].keywords} />

            

            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={relatedCalcs} />
            <FeaturedArticles />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
