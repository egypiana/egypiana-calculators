import type { Metadata } from "next";
import TimeCalculator from "@/components/calculators/TimeCalculator";
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
  title: "حاسبة الوقت — الفرق بين تاريخين وتحويل الوحدات",
  description: "احسب الفرق بين تاريخين بالأيام والساعات، أضف أو اطرح وقتاً من تاريخ، وحوّل بين وحدات الزمن.",
  keywords: ALL_CALC_SEO["time"].keywords,
  alternates: { canonical: "https://calculator.egypiana.com/tools/time" },
};

const faqs = [
  {question:"كيف أحسب عدد الأيام بين تاريخين؟",answer:"اطرح التاريخ الأقدم من الأحدث. مثال: من 1 يناير إلى 1 مارس = 59 يوماً (في السنة العادية) أو 60 في السنة الكبيسة. الحاسبة تتولى ذلك تلقائياً مع مراعاة الكبيسة."},
  {question:"كم ثانية في اليوم الواحد؟",answer:"1 يوم = 24 ساعة = 1,440 دقيقة = 86,400 ثانية. ومن المثير: في عام واحد ≈ 31,536,000 ثانية (سنة عادية) أو 31,622,400 ثانية (كبيسة)."},
  {question:"كيف أحسب تاريخ بعد 90 يوماً؟",answer:"استخدم وضع 'إضافة وقت'، أدخل تاريخ البداية ثم أدخل 90 في حقل الكمية واختر 'يوم'. ستُعطيك الحاسبة التاريخ والوقت الدقيقين بعد 90 يوماً."},
  {question:"ما الفرق بين الوقت الشمسي والزمني؟",answer:"الوقت الشمسي يعتمد على موقع الشمس فعلياً، يختلف دقائق بين كل خط طول. الوقت الزمني (Timezone) هو توحيد اصطلاحي لمناطق بأكملها. UTC (أو GMT) هو المرجع العالمي وساعة صفر."},
  {question:"ما هي السنة الكبيسة؟",answer:"سنة تُقسم على 4 دون باقٍ، إلا إذا قُسمت على 100 وكان هناك باقٍ. أو إذا قُسمت على 400. مثال: 2000 كبيسة، 1900 ليست كبيسة، 2024 كبيسة. السنة الكبيسة = 366 يوماً."},
];

export default function TimePage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"أدوات متنوعة",href:"/tools"},{label:"حاسبة الوقت"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">حاسبة الوقت والتواريخ</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">احسب الفرق بين تاريخين وأضف وقتاً وحوّل وحدات الزمن</p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <TimeCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"><ShareButtons title="حاسبة الوقت والتواريخ" /></div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/tools/time" title="حاسبة الوقت والتواريخ" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["time"]} />

            <AlsoKnownAs keywords={ALL_CALC_SEO["time"].keywords} />

            

            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={[
              {label:"حاسبة العمر",href:"/tools/age",icon:"🎂",description:"عمرك بالتفصيل"},
              {label:"حاسبة التاريخ الهجري",href:"/tools/hijri-date",icon:"🌙",description:"تحويل التاريخ"},
              {label:"محول الوحدات",href:"/tools/unit-converter",icon:"🔄",description:"تحويل المقاييس"},
              {label:"حاسبة الحمل",href:"/health/pregnancy",icon:"🤰",description:"موعد الولادة"},
            ]} />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
