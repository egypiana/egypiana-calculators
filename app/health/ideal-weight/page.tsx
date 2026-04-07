import type { Metadata } from "next";
import IdealWeightCalculator from "@/components/calculators/IdealWeightCalculator";
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
  title: "حاسبة الوزن المثالي — لطولك وعمرك وجنسك",
  description: "احسب وزنك المثالي بناءً على طولك باستخدام معادلات Robinson وMiller وDevine. اعرف النطاق الصحي لوزنك.",
  keywords: ALL_CALC_SEO["ideal-weight"].keywords,
  alternates: { canonical: "https://calculator.egypiana.com/health/ideal-weight" },
};

const faqs = [
  {question:"كيف يُحسب الوزن المثالي؟",answer:"توجد عدة معادلات شائعة: Robinson (1983)، Miller (1983)، Devine (1974). كل منها تُعطي نتيجة مختلفة قليلاً. أفضل طريقة هي الجمع بين هذه المعادلات للحصول على نطاق واسع بدلاً من رقم واحد."},
  {question:"هل الوزن المثالي هو نفسه لكل الأشخاص بنفس الطول؟",answer:"لا. البنية الجسمية (عظام رفيعة/متوسطة/ثقيلة) ونسبة الدهون والعضلات وعوامل الصحة الأخرى تؤثر على الوزن المثالي. رياضي بنفس طولك قد يزن 10-15 كجم أكثر مع صحة أفضل."},
  {question:"ما الفرق بين الوزن المثالي ومؤشر كتلة الجسم؟",answer:"الوزن المثالي يُعطيك رقماً محدداً (أو نطاقاً) مستهدفاً. مؤشر كتلة الجسم يُقيّم وزنك الحالي مقارنةً بطولك. كلاهما مؤشران تقريبيان ولا يعكسان التركيب الجسدي بدقة."},
  {question:"كيف أصل لوزني المثالي بأمان؟",answer:"الخسارة الآمنة 0.5-1 كجم أسبوعياً من خلال عجز سعراتي معتدل (300-500 سعرة/يوم) مع تمارين منتظمة. تجنب الحميات القاسية التي تُسبب فقدان العضلات وتراجع معدل الأيض."},
  {question:"هل تختلف معايير الوزن المثالي للرجال والنساء؟",answer:"نعم، المعادلات المختلفة تأخذ الجنس في الاعتبار. النساء عموماً وزنهن المثالي أقل من الرجال بنفس الطول بسبب الاختلاف في التركيب الجسدي ونسبة الدهون الطبيعية."},
];

export default function IdealWeightPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"الحاسبات الصحية",href:"/health"},{label:"حاسبة الوزن المثالي"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">حاسبة الوزن المثالي</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">اكتشف وزنك المثالي بناءً على طولك وجنسك</p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <IdealWeightCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"><ShareButtons title="حاسبة الوزن المثالي" /></div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/health/ideal-weight" title="حاسبة الوزن المثالي" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["ideal-weight"]} />

            <AlsoKnownAs keywords={ALL_CALC_SEO["ideal-weight"].keywords} />

            

            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={[
              {label:"حاسبة مؤشر كتلة الجسم",href:"/health/bmi",icon:"⚖️",description:"مؤشر BMI"},
              {label:"حاسبة السعرات",href:"/health/calories",icon:"🔥",description:"احتياجك اليومي"},
              {label:"حاسبة شرب الماء",href:"/health/water-intake",icon:"💧",description:"كميتك من الماء"},
              {label:"حاسبة العمر",href:"/tools/age",icon:"🎂",description:"عمرك بالتفصيل"},
            ]} />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
