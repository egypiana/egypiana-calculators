import type { Metadata } from "next";
import BMICalculator from "@/components/calculators/BMICalculator";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FAQSection from "@/components/shared/FAQSection";
import ShareButtons from "@/components/shared/ShareButtons";
import EmbedCode from "@/components/shared/EmbedCode";
import RelatedCalculators from "@/components/shared/RelatedCalculators";
import AdBlock from "@/components/ads/AdBlock";
import CalcSEOContent from "@/components/shared/CalcSEOContent";
import { ALL_CALC_SEO } from "@/lib/calc-seo";


export const metadata: Metadata = {
  title: "حاسبة BMI — مؤشر كتلة الجسم للرجال والنساء",
  description:
    "احسب مؤشر كتلة الجسم BMI مجاناً للرجال والنساء. تعرف على وزنك المثالي وتصنيف وزنك (نقص — طبيعي — زيادة — سمنة) مع شرح مفصل.",
  keywords: [
    "حاسبة BMI",
    "مؤشر كتلة الجسم",
    "حساب BMI",
    "الوزن المثالي",
    "حاسبة الوزن",
    "BMI عربي",
  ],
  alternates: { canonical: "https://calculator.egypiana.com/health/bmi" },
};

const faqs = [
  {
    question: "ما هو مؤشر كتلة الجسم BMI؟",
    answer: "مؤشر كتلة الجسم (Body Mass Index) هو قياس يُستخدم لتقدير الدهون في الجسم بناءً على الوزن والطول. يُحسب بقسمة الوزن بالكيلوجرام على مربع الطول بالمتر.",
  },
  {
    question: "ما هو BMI الطبيعي؟",
    answer: "BMI الطبيعي يتراوح بين 18.5 و 24.9. أقل من 18.5 = نقص وزن، 25-29.9 = زيادة وزن، 30 فأكثر = سمنة.",
  },
  {
    question: "هل BMI دقيق للرياضيين؟",
    answer: "لا تماماً. BMI لا يفرق بين الدهون والعضلات. الرياضيون ذوو العضلات الكبيرة قد يُصنَّفون كأوزان زائدة رغم لياقتهم البدنية. يُستحسن قياس نسبة الدهون في الجسم للتقييم الأدق.",
  },
  {
    question: "هل BMI يختلف بين الرجال والنساء؟",
    answer: "معادلة BMI واحدة لكلا الجنسين، لكن المرأة بشكل طبيعي لديها نسبة دهون أعلى من الرجل عند نفس BMI. بعض الأطباء يستخدمون معايير تقييم تأخذ الجنس بالاعتبار.",
  },
  {
    question: "كيف أُخفِّض مؤشر BMI مرتفعاً؟",
    answer: "لتخفيض BMI: تناول غذاءً متوازناً وقلل السعرات الحرارية، مارس الرياضة بانتظام (150 دقيقة أسبوعياً)، قلل الجلوس المطوَّل، وانم بشكل كافٍ. استشر طبيباً أو اختصاصي تغذية لخطة مخصصة.",
  },
];

const relatedCalcs = [
  { label: "حاسبة الوزن المثالي", href: "/health/ideal-weight", icon: "⚖️", description: "وزنك المثالي بدقة" },
  { label: "حاسبة السعرات الحرارية", href: "/health/calories", icon: "🔥", description: "احتياجك اليومي" },
  { label: "حاسبة معدل الأيض BMR", href: "/health/bmr", icon: "💪", description: "معدل حرق السعرات" },
  { label: "حاسبة كمية الماء", href: "/health/water-intake", icon: "💧", description: "احتياجك اليومي من الماء" },
];

export default function BMIPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "الصحة واللياقة", href: "/health" }, { label: "حاسبة BMI" }]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">
          حاسبة مؤشر كتلة الجسم BMI
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">
          اعرف وزنك المثالي وتصنيف وزنك الحالي بناءً على طولك وعمرك
        </p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <BMICalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <ShareButtons title="حاسبة BMI مؤشر كتلة الجسم — حاسبات إيجيبيانا" />
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/health/bmi" title="حاسبة مؤشر كتلة الجسم BMI" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["bmi"]} />

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
