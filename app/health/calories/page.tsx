import type { Metadata } from "next";
import CaloriesCalculator from "@/components/calculators/CaloriesCalculator";
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
  title: "حاسبة السعرات الحرارية اليومية — TDEE والتغذية",
  description: "احسب احتياجك اليومي من السعرات الحرارية بناءً على وزنك وطولك وعمرك ومستوى نشاطك. خطط لحمية غذائية صحية.",
  keywords: ALL_CALC_SEO["calories"].keywords,
  alternates: { canonical: "https://calculator.egypiana.com/health/calories" },
};

const faqs = [
  {question:"ما هي السعرات الحرارية اليومية الموصى بها؟",answer:"تتراوح بين 1600-2400 سعرة للنساء و2000-3000 للرجال حسب العمر والنشاط. الشخص غير النشيط يحتاج أقل، والرياضيون أكثر بكثير. استخدم الحاسبة للحصول على رقم دقيق بناءً على بياناتك."},
  {question:"ما الفرق بين BMR وTDEE؟",answer:"BMR (معدل الأيض الأساسي) هو عدد السعرات التي يحرقها جسمك في حالة الراحة التامة لإبقائك حياً. TDEE (إجمالي الطاقة اليومية المنصرفة) = BMR × معامل النشاط البدني، وهو ما تحتاجه فعلاً يومياً."},
  {question:"كم سعرة يجب أن أقلل لإنقاص الوزن؟",answer:"عجز 500 سعرة يومياً يؤدي لخسارة ~0.5 كجم أسبوعياً. لا تنزل عن 1200 سعرة للنساء أو 1500 للرجال دون إشراف طبي. الخسارة التدريجية أكثر استدامة وأمناً."},
  {question:"هل الحساب دقيق لجميع الأشخاص؟",answer:"معادلة Mifflin-St Jeor الأكثر دقة للأشخاص ذوي الوزن الطبيعي، لكنها قد تُخطئ بـ±200 سعرة. الرياضيون وكبار السن وأصحاب الأمراض المزمنة يحتاجون تقييماً تخصصياً من أخصائي تغذية."},
  {question:"كيف أحسب السعرات في الطعام؟",answer:"كل جرام بروتين = 4 سعرة، كل جرام كربوهيدرات = 4 سعرة، كل جرام دهون = 9 سعرات، كل جرام كحول = 7 سعرات. استخدم تطبيقات تتبع الطعام مثل MyFitnessPal للحصول على قيم دقيقة للأطعمة."},
];

export default function CaloriesPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"الحاسبات الصحية",href:"/health"},{label:"حاسبة السعرات الحرارية"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">حاسبة السعرات الحرارية اليومية</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">احسب احتياجك من السعرات بناءً على نشاطك وهدفك الصحي</p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <CaloriesCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"><ShareButtons title="حاسبة السعرات الحرارية اليومية" /></div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/health/calories" title="حاسبة السعرات الحرارية اليومية" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["calories"]} />

            <AlsoKnownAs keywords={ALL_CALC_SEO["calories"].keywords} />

            

            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={[
              {label:"حاسبة مؤشر كتلة الجسم",href:"/health/bmi",icon:"⚖️",description:"هل وزنك مثالي؟"},
              {label:"حاسبة الوزن المثالي",href:"/health/ideal-weight",icon:"🎯",description:"وزنك المثالي"},
              {label:"حاسبة شرب الماء",href:"/health/water-intake",icon:"💧",description:"كميتك اليومية"},
              {label:"حاسبة الحمل",href:"/health/pregnancy",icon:"🤰",description:"موعد الولادة"},
            ]} />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
