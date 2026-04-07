import type { Metadata } from "next";
import ConcreteCalculator from "@/components/calculators/ConcreteCalculator";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FAQSection from "@/components/shared/FAQSection";
import ShareButtons from "@/components/shared/ShareButtons";
import EmbedCode from "@/components/shared/EmbedCode";
import RelatedCalculators from "@/components/shared/RelatedCalculators";
import AdBlock from "@/components/ads/AdBlock";
import CalcSEOContent from "@/components/shared/CalcSEOContent";
import { ALL_CALC_SEO } from "@/lib/calc-seo";


export const metadata: Metadata = {
  title: "حاسبة الخرسانة — كميات الأسمنت والرمل والزلط",
  description: "احسب كميات مواد الخرسانة المطلوبة: أسمنت، رمل، زلط، ماء. يدعم البلاطات والأعمدة والأسس والسلالم.",
  keywords: ["حاسبة الخرسانة","كميات البناء","أسمنت رمل زلط","خلطة خرسانة","حسابات البناء"],
  alternates: { canonical: "https://calculator.egypiana.com/tools/concrete" },
};

const faqs = [
  {question:"ما هي نسب خلط الخرسانة العادية؟",answer:"النسبة الشائعة للمنشآت العادية: 1 أسمنت : 2 رمل : 3 زلط (حجماً). لكل م³ تحتاج تقريباً: 320 كجم أسمنت، 0.44 م³ رمل، 0.88 م³ زلط، 160 لتر ماء. زيادة الأسمنت ترفع المقاومة."},
  {question:"كيف أحسب كمية الخرسانة للبلاطة؟",answer:"الحجم = الطول × العرض × السماكة (بالمتر). مثال: بلاطة 5م × 4م × 15سم: V = 5 × 4 × 0.15 = 3 م³. ثم احسب كميات المواد بضرب الحجم في معاملات كل مادة."},
  {question:"كم كيس أسمنت في المتر المكعب؟",answer:"في خلطة 1:2:3 تقريباً 6.4 كيس (كيس 50 كجم) لكل م³. للأعمال الإنشائية المهمة استشر مهندساً للحصول على تصميم خلطة مناسب لمتطلبات المقاومة."},
  {question:"ما هو الفرق بين الرمل الخشن والناعم في الخرسانة؟",answer:"الرمل الخشن (حجم حبة 0.6-4.75 مم) أفضل لتصنيف الخرسانة لأنه يقلل من الفراغات. الرمل الناعم يُستخدم للمونة والبياض. استخدام الرمل الصحيح يُحسن مقاومة الخرسانة."},
  {question:"هل يجب إضافة كمية إضافية للهدر؟",answer:"نعم، يُنصح بإضافة 10-15% هدر بسبب الانسكاب والبقايا في الخلاطة والاختلاف في القياسات. للمشاريع الكبيرة: 10% هدر. للأعمال الصغيرة أو المعقدة: 15-20%."},
];

export default function ConcretePage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"أدوات متنوعة",href:"/tools"},{label:"حاسبة الخرسانة"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">حاسبة الخرسانة ومواد البناء</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">احسب كميات الأسمنت والرمل والزلط لمشروع بنائك</p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <ConcreteCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"><ShareButtons title="حاسبة الخرسانة" /></div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/tools/concrete" title="حاسبة الخرسانة ومواد البناء" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["concrete"]} />

            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={[
              {label:"حاسبة المساحة",href:"/tools/area",icon:"📐",description:"مساحة الأشكال"},
              {label:"محول الوحدات",href:"/tools/unit-converter",icon:"🔄",description:"تحويل المقاييس"},
              {label:"الآلة الحاسبة",href:"/math/calculator",icon:"🔢",description:"حاسبة علمية"},
              {label:"حاسبة النسبة المئوية",href:"/math/percentage",icon:"💯",description:"احتساب النسب"},
            ]} />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
