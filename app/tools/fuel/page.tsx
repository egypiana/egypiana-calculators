import type { Metadata } from "next";
import FuelCalculator from "@/components/calculators/FuelCalculator";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FAQSection from "@/components/shared/FAQSection";
import ShareButtons from "@/components/shared/ShareButtons";
import EmbedCode from "@/components/shared/EmbedCode";
import RelatedCalculators from "@/components/shared/RelatedCalculators";
import AdBlock from "@/components/ads/AdBlock";
import CalcSEOContent from "@/components/shared/CalcSEOContent";
import { ALL_CALC_SEO } from "@/lib/calc-seo";


export const metadata: Metadata = {
  title: "حاسبة استهلاك الوقود — تكلفة الرحلة والمسافة",
  description: "احسب استهلاك وقود سيارتك، تكلفة رحلتك، والمسافة التي تقطعها بخزان كامل. وفّر المال وخطط رحلاتك.",
  keywords: ["حاسبة الوقود","استهلاك الوقود","تكلفة الرحلة","بنزين","لتر لكل 100 كم"],
  alternates: { canonical: "https://calculator.egypiana.com/tools/fuel" },
};

const faqs = [
  {question:"كيف أحسب استهلاك سيارتي من الوقود؟",answer:"امل خزانك بالكامل وسجّل قراءة العداد. اقد حتى تحتاج للتزود بالوقود ثم امل مجدداً. الاستهلاك = كميه الوقود المضافة (لتر) ÷ المسافة المقطوعة (كم) × 100 = لتر/100كم."},
  {question:"ما هو الاستهلاك الجيد لسيارة عادية؟",answer:"السيارة الاقتصادية الصغيرة: 5-7 لتر/100كم. السيارة المتوسطة: 8-10 لتر/100كم. السيارة الرياضية أو الـSUV: 11-15 لتر/100كم. الشاحنات وكبيرات السيارات: 15+ لتر/100كم."},
  {question:"كيف أقلل استهلاك الوقود؟",answer:"حافظ على ضغط الإطارات الصحيح، تجنب الإقلاع السريع والفرملة المفاجئة، استخدم التكييف بتعقل، نظّف فلتر الهواء بانتظام، وتجنب حمل أحمال زائدة. القيادة بسرعة ثابتة بين 80-100 كم/ساعة هي الأمثل."},
  {question:"كم المسافة التي تقطعها سيارتي بخزان كامل؟",answer:"المسافة = حجم الخزان ÷ معدل الاستهلاك (لتر/كم). مثال: خزان 50 لتر، استهلاك 8 لتر/100كم = 50 ÷ 0.08 = 625 كم. يُنصح بالتوقف للتزود قبل الوصول للاحتياطي."},
  {question:"هل يختلف الاستهلاك بين الطريق السريع والمدينة؟",answer:"نعم بشكل كبير. في الطريق السريع بسرعة ثابتة الاستهلاك أقل. في المدينة مع الوقوف المتكرر والضغط على الدواسة يرتفع الاستهلاك 20-40%. السيارات الهجينة تستفيد أكثر من القيادة في المدينة."},
];

export default function FuelPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"أدوات متنوعة",href:"/tools"},{label:"حاسبة الوقود"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">حاسبة استهلاك الوقود</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">احسب الاستهلاك وتكلفة الرحلة ومدى خزانك</p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <FuelCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"><ShareButtons title="حاسبة استهلاك الوقود" /></div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/tools/fuel" title="حاسبة استهلاك الوقود" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["fuel"]} />

            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={[
              {label:"محول الوحدات",href:"/tools/unit-converter",icon:"🔄",description:"تحويل المقاييس"},
              {label:"حاسبة النسبة المئوية",href:"/math/percentage",icon:"💯",description:"احتساب النسب"},
              {label:"حاسبة العمر",href:"/tools/age",icon:"🎂",description:"عمرك بالتفصيل"},
              {label:"الآلة الحاسبة",href:"/math/calculator",icon:"🔢",description:"حاسبة علمية"},
            ]} />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
