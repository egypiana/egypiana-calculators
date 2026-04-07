import type { Metadata } from "next";
import HijriDateCalculator from "@/components/calculators/HijriDateCalculator";
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
  title: "حاسبة التاريخ الهجري — تحويل التاريخ الميلادي والهجري",
  description:
    "حوّل التاريخ بين الميلادي والهجري مجاناً. اعرف تاريخ اليوم بالهجري، وموعد رمضان وعيد الفطر وعيد الأضحى 2025. أداة التحويل الأدق.",
  keywords: ALL_CALC_SEO["hijri-date"].keywords,
  alternates: { canonical: "https://calculator.egypiana.com/tools/hijri-date" },
};

const faqs = [
  {
    question: "ما هو التاريخ الهجري اليوم؟",
    answer: "يمكنك معرفة تاريخ اليوم بالهجري من خلال حاسبتنا مباشرة — تُعرض في أعلى الحاسبة تلقائياً. السنة الهجرية أقصر من الميلادية بنحو 11 يوماً.",
  },
  {
    question: "كيف أحوّل التاريخ الميلادي إلى هجري؟",
    answer: "اختر 'ميلادي ← هجري'، أدخل التاريخ الميلادي، ثم اضغط 'تحويل التاريخ'.",
  },
  {
    question: "متى رمضان 2025؟",
    answer: "يُتوقع أن يبدأ شهر رمضان 1446 في أوائل مارس 2025 (تقريباً). تاريخه الدقيق يعتمد على الرؤية الشرعية ويختلف من دولة لأخرى.",
  },
  {
    question: "ما الفرق بين التقويم الهجري وتقويم أم القرى؟",
    answer: "تقويم أم القرى هو التقويم الهجري الرسمي في المملكة العربية السعودية، ويعتمد على حسابات فلكية. التقويم الهجري عموماً يعتمد على الرؤية البصرية للهلال.",
  },
  {
    question: "هل الحاسبة دقيقة 100%؟",
    answer: "الحاسبة دقيقة جداً لأغراض الحساب العام، لكن تواريخ الأشهر الهجرية الدينية (كرمضان وعيد الفطر) قد تختلف يوماً أو يومين بسبب الاعتماد على رؤية الهلال.",
  },
];

const relatedCalcs = [
  { label: "حاسبة العمر", href: "/tools/age", icon: "👤", description: "احسب عمرك بدقة" },
  { label: "حاسبة الوقت", href: "/tools/time", icon: "⏱️", description: "الفارق بين تاريخين" },
  { label: "حاسبة الزكاة", href: "/financial/zakat", icon: "🕌", description: "زكاة المال" },
  { label: "حاسبة الميراث", href: "/tools/inheritance", icon: "⚖️", description: "الميراث الشرعي" },
];

export default function HijriDatePage() {
  return (
    <>
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "حاسبات أخرى", href: "/tools" }, { label: "التاريخ الهجري" }]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">
          حاسبة التاريخ الهجري والميلادي
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">
          حوّل بين التاريخ الميلادي والهجري بدقة — مع مواعيد الأشهر الإسلامية
        </p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <HijriDateCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <ShareButtons title="حاسبة التاريخ الهجري والميلادي — حاسبات إيجيبيانا" />
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/tools/hijri-date" title="حاسبة التاريخ الهجري والميلادي" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["hijri-date"]} />

            <AlsoKnownAs keywords={ALL_CALC_SEO["hijri-date"].keywords} />

            

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
