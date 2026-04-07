import type { Metadata } from "next";
import ScientificCalculator from "@/components/calculators/ScientificCalculator";
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
  title: "الآلة الحاسبة العلمية — sin cos tan log جذر تربيعي",
  description: "آلة حاسبة علمية متكاملة تدعم المثلثات، اللوغاريتمات، الأس، القوى، الذاكرة، وأوضاع درجة/راديان.",
  keywords: ALL_CALC_SEO["scientific"].keywords,
  alternates: { canonical: "https://calculator.egypiana.com/math/scientific" },
};

const faqs = [
  {question:"ما الفرق بين وضع Degree وRadian؟",answer:"Degree (درجة): الدائرة الكاملة = 360°. Radian (راديان): الدائرة الكاملة = 2π ≈ 6.28. في الفيزياء والرياضيات المتقدمة يُستخدم الراديان. في الهندسة اليومية الدرجات أكثر شيوعاً."},
  {question:"كيف أحسب sin 30 درجة؟",answer:"تأكد أن الوضع على DEG، أدخل 30 ثم اضغط sin. النتيجة = 0.5. في الراديان: sin(π/6) = 0.5. جدول القيم الشائعة: sin0°=0، sin30°=0.5، sin45°=0.707، sin60°=0.866، sin90°=1."},
  {question:"ما هو اللوغاريتم الطبيعي ln؟",answer:"ln(x) = log أساسه e ≈ 2.71828. يُستخدم في الرياضيات والفيزياء والاقتصاد. log(x) هو اللوغاريتم العشري (أساسه 10). العلاقة: ln(x) = log(x) / log(e) ≈ log(x) / 0.4343."},
  {question:"كيف أحسب مضروب عدد (n!)?",answer:"n! = n × (n-1) × ... × 2 × 1. مثال: 5! = 5×4×3×2×1 = 120. يُستخدم في التوافيق والتباديل. ملاحظة: 0! = 1 بالتعريف. الأعداد الكبيرة تُعطي نتائج هائلة (20! = 2.43 × 10¹⁸)."},
  {question:"ما هي ذاكرة الحاسبة M+ وMR؟",answer:"M+ تُضيف الرقم الحالي للذاكرة. M- تطرحه. MR يستدعي القيمة المخزّنة. MC يمسح الذاكرة. مفيدة للعمليات المتعددة التي تحتاج إعادة استخدام نتيجة وسيطة."},
];

export default function ScientificPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"الحاسبات الرياضية",href:"/math"},{label:"الآلة الحاسبة العلمية"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">الآلة الحاسبة العلمية</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">حاسبة علمية متكاملة بجميع الدوال الرياضية</p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <ScientificCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"><ShareButtons title="الآلة الحاسبة العلمية" /></div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/math/scientific" title="الآلة الحاسبة العلمية" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["scientific"]} />

            <AlsoKnownAs keywords={ALL_CALC_SEO["scientific"].keywords} />

            

            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={[
              {label:"الآلة الحاسبة العادية",href:"/math/calculator",icon:"🔢",description:"حاسبة بسيطة"},
              {label:"حاسبة النسبة المئوية",href:"/math/percentage",icon:"💯",description:"احتساب النسب"},
              {label:"محول الوحدات",href:"/tools/unit-converter",icon:"🔄",description:"تحويل المقاييس"},
              {label:"حاسبة المعدل",href:"/tools/gpa",icon:"🎓",description:"GPA الترم"},
            ]} />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
