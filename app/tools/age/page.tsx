import type { Metadata } from "next";
import AgeCalculator from "@/components/calculators/AgeCalculator";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FAQSection from "@/components/shared/FAQSection";
import ShareButtons from "@/components/shared/ShareButtons";
import EmbedCode from "@/components/shared/EmbedCode";
import RelatedCalculators from "@/components/shared/RelatedCalculators";
import AdBlock from "@/components/ads/AdBlock";
import CalcSEOContent from "@/components/shared/CalcSEOContent";
import { ALL_CALC_SEO } from "@/lib/calc-seo";


export const metadata: Metadata = {
  title: "حاسبة العمر — احسب عمرك بالسنوات والأشهر والأيام",
  description:
    "حاسبة العمر المجانية — احسب عمرك الدقيق بالسنوات والأشهر والأيام والأسابيع. اعرف يوم ميلادك وعدد الأيام المتبقية لعيد ميلادك القادم.",
  keywords: [
    "حاسبة العمر",
    "حساب العمر",
    "كم عمري",
    "حاسبة عمري بالسنوات",
    "age calculator arabic",
  ],
  alternates: { canonical: "https://calculator.egypiana.com/tools/age" },
};

const faqs = [
  {
    question: "كيف أحسب عمري بدقة؟",
    answer: "أدخل تاريخ ميلادك الكامل (اليوم/الشهر/السنة) في الحقل المخصص، ثم اضغط 'احسب العمر'. ستظهر نتيجة دقيقة بالسنوات والأشهر والأيام.",
  },
  {
    question: "هل يمكنني حساب العمر في تاريخ محدد وليس اليوم؟",
    answer: "نعم، يمكنك تغيير 'تاريخ الحساب' إلى أي تاريخ تريده لمعرفة العمر في ذلك التاريخ المحدد.",
  },
  {
    question: "كيف أحسب عمري بالأيام فقط؟",
    answer: "تُظهر حاسبتنا تلقائياً إجمالي الأيام والأسابيع والأشهر منذ تاريخ ميلادك حتى اليوم في بطاقات التفاصيل.",
  },
  {
    question: "هل الحاسبة تأخذ السنوات الكبيسة بالاعتبار؟",
    answer: "نعم، الحاسبة تحتسب السنوات الكبيسة (366 يوماً) بدقة عند حساب إجمالي الأيام.",
  },
  {
    question: "كيف أعرف يوم ميلادي؟",
    answer: "تُظهر الحاسبة تلقائياً اليوم (الاثنين، الثلاثاء... إلخ) الذي وُلدت فيه بناءً على تاريخ ميلادك.",
  },
];

const relatedCalcs = [
  { label: "التاريخ الهجري", href: "/tools/hijri-date", icon: "🗓️", description: "تحويل التواريخ" },
  { label: "حاسبة الوقت", href: "/tools/time", icon: "⏱️", description: "الفارق بين تاريخين" },
  { label: "حاسبة الحمل", href: "/health/pregnancy", icon: "👶", description: "موعد الولادة" },
  { label: "حاسبة الدورة الشهرية", href: "/health/menstrual-cycle", icon: "📅", description: "متابعة الدورة" },
];

export default function AgePage() {
  return (
    <>
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "حاسبات أخرى", href: "/tools" }, { label: "حاسبة العمر" }]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">
          حاسبة العمر — احسب عمرك بدقة
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">
          احسب عمرك بالسنوات والأشهر والأيام وعدد الأسابيع الكاملة
        </p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <AgeCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <ShareButtons title="حاسبة العمر — احسب عمرك بدقة بالسنوات والأيام" />
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/tools/age" title="حاسبة العمر — احسب عمرك بدقة" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["age"]} />

            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={relatedCalcs} />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
