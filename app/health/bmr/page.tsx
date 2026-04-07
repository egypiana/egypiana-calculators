import type { Metadata } from "next";
import BMRCalculator from "@/components/calculators/BMRCalculator";
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
  title: "حاسبة معدل الأيض BMR وTDEE — السعرات اليومية",
  description: "احسب معدل الأيض الأساسي (BMR) وإجمالي سعراتك اليومية (TDEE) بناءً على وزنك وطولك وعمرك ونشاطك.",
  keywords: ALL_CALC_SEO["bmr"].keywords,
  alternates: { canonical: "https://calculator.egypiana.com/health/bmr" },
};

const faqs = [
  {question:"ما هو معدل الأيض الأساسي BMR؟",answer:"BMR (Basal Metabolic Rate) هو عدد السعرات التي يحرقها جسمك في حالة الراحة التامة — للتنفس وضربات القلب والحفاظ على درجة حرارة الجسم. يمثل 60-75% من إجمالي حرق السعرات اليومي."},
  {question:"ما هي معادلة Mifflin-St Jeor؟",answer:"للرجال: BMR = 10W + 6.25H - 5A + 5. للنساء: BMR = 10W + 6.25H - 5A - 161. حيث W=الوزن بالكجم، H=الطول بالسم، A=العمر بالسنوات. هي المعادلة الأكثر دقة للأشخاص الأصحاء."},
  {question:"كيف يختلف BMR عن TDEE؟",answer:"BMR هو الحرق في حالة الراحة التامة. TDEE = BMR × معامل النشاط. الشخص الخامل: ×1.2. نشاط خفيف: ×1.375. نشاط متوسط: ×1.55. نشاط عالٍ: ×1.725. رياضي محترف: ×1.9."},
  {question:"هل يمكن رفع معدل الأيض؟",answer:"نعم: بناء العضلات (العضلات تحرق أكثر من الدهون في الراحة)، ممارسة تمارين HIIT، زيادة البروتين في النظام الغذائي، النوم الكافي، وتجنب الحميات الجوعية التي تُخفّض BMR بشكل كبير."},
  {question:"لماذا يتراجع معدل الأيض مع التقدم في العمر؟",answer:"بعد سن 30، يفقد الجسم عضلات بمعدل 3-8% كل عقد في غياب التمرين. كتلة العضلات الأقل تعني حرقاً أقل. الحل: تمارين المقاومة المنتظمة وكافٍ من البروتين للحفاظ على كتلة العضلات."},
];

export default function BMRPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"الحاسبات الصحية",href:"/health"},{label:"حاسبة BMR وTDEE"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">حاسبة معدل الأيض BMR و TDEE</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">اعرف كم سعرة يحرق جسمك يومياً بناءً على نشاطك</p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <BMRCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"><ShareButtons title="حاسبة معدل الأيض BMR" /></div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/health/bmr" title="حاسبة معدل الأيض BMR و TDEE" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["bmr"]} />

            <AlsoKnownAs keywords={ALL_CALC_SEO["bmr"].keywords} />

            

            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={[
              {label:"حاسبة السعرات",href:"/health/calories",icon:"🔥",description:"احتياجك اليومي"},
              {label:"حاسبة مؤشر كتلة الجسم",href:"/health/bmi",icon:"⚖️",description:"مؤشر BMI"},
              {label:"حاسبة الوزن المثالي",href:"/health/ideal-weight",icon:"🎯",description:"وزنك المثالي"},
              {label:"حاسبة شرب الماء",href:"/health/water-intake",icon:"💧",description:"كميتك من الماء"},
            ]} />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
