import type { Metadata } from "next";
import WaterIntakeCalculator from "@/components/calculators/WaterIntakeCalculator";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FAQSection from "@/components/shared/FAQSection";
import ShareButtons from "@/components/shared/ShareButtons";
import EmbedCode from "@/components/shared/EmbedCode";
import RelatedCalculators from "@/components/shared/RelatedCalculators";
import AdBlock from "@/components/ads/AdBlock";
import CalcSEOContent from "@/components/shared/CalcSEOContent";
import { ALL_CALC_SEO } from "@/lib/calc-seo";


export const metadata: Metadata = {
  title: "حاسبة شرب الماء اليومي — كميتك المثالية",
  description: "احسب كميتك اليومية المثالية من الماء بناءً على وزنك ومستوى نشاطك والمناخ. تجنب الجفاف وحافظ على صحتك.",
  keywords: ["حاسبة شرب الماء","كمية الماء اليومية","الترطيب","الجفاف","مياه"],
  alternates: { canonical: "https://calculator.egypiana.com/health/water-intake" },
};

const faqs = [
  {question:"كم لتراً من الماء يجب أن أشرب يومياً؟",answer:"المعيار العام 35 مل لكل كجم من وزن الجسم. شخص وزنه 70 كجم يحتاج ~2.5 لتر يومياً. لكن النشاط البدني والحرارة والحمل والرضاعة تزيد الاحتياج بشكل ملحوظ."},
  {question:"هل القهوة والشاي يُحسبان ضمن السوائل؟",answer:"نعم جزئياً. رغم خاصية التبول المُدرّة للكافيين، تُساهم مشروبات الكافيين بـ 60-80% من حجمها في ترطيب الجسم. الماء النقي هو الأفضل دائماً."},
  {question:"ما أعراض نقص شرب الماء؟",answer:"بول داكن اللون، جفاف الفم، صداع، دوار، إرهاق، صعوبة في التركيز. الجفاف البسيط (1-2% من وزن الجسم) يقلل الأداء الذهني والبدني بشكل ملحوظ."},
  {question:"هل شرب الماء الزائد خطر؟",answer:"نادراً لكن ممكن. التسمم بالماء (hyponatremia) يحدث حين شرب كميات ضخمة جداً خلال وقت قصير (مثل >1 لتر/ساعة). في الظروف العادية، يصعب الإفراط في الشرب لأن الكلى تُعالج ما يصل 0.8-1 لتر/ساعة."},
  {question:"كيف أشرب كميتي اليومية بانتظام؟",answer:"1) ابدأ يومك بكوب ماء. 2) اشرب كوباً قبل كل وجبة. 3) احمل زجاجة ماء معك. 4) اضبط تذكيرات على هاتفك. 5) أضف شرائح ليمون أو نعناع لتشجيع الشرب. 6) راقب لون بولك (أصفر فاتح = ترطيب جيد)."},
];

export default function WaterIntakePage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"الحاسبات الصحية",href:"/health"},{label:"حاسبة شرب الماء"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">حاسبة شرب الماء اليومي</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">اعرف كميتك المثالية من الماء للبقاء رطباً وصحياً</p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <WaterIntakeCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"><ShareButtons title="حاسبة شرب الماء اليومي" /></div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/health/water-intake" title="حاسبة شرب الماء اليومي" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["water-intake"]} />

            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={[
              {label:"حاسبة السعرات",href:"/health/calories",icon:"🔥",description:"احتياجك اليومي"},
              {label:"حاسبة مؤشر كتلة الجسم",href:"/health/bmi",icon:"⚖️",description:"مؤشر BMI"},
              {label:"حاسبة الوزن المثالي",href:"/health/ideal-weight",icon:"🎯",description:"وزنك المثالي"},
              {label:"حاسبة الحمل",href:"/health/pregnancy",icon:"🤰",description:"موعد الولادة"},
            ]} />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
