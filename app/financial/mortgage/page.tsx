import type { Metadata } from "next";
import MortgageCalculator from "@/components/calculators/MortgageCalculator";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FAQSection from "@/components/shared/FAQSection";
import ShareButtons from "@/components/shared/ShareButtons";
import EmbedCode from "@/components/shared/EmbedCode";
import RelatedCalculators from "@/components/shared/RelatedCalculators";
import AdBlock from "@/components/ads/AdBlock";

export const metadata: Metadata = {
  title: "حاسبة القرض العقاري — القسط الشهري والإجمالي",
  description: "احسب قسطك الشهري للرهن العقاري بناءً على سعر العقار والدفعة الأولى ومدة القرض وسعر الفائدة.",
  keywords: ["حاسبة القرض العقاري","الرهن العقاري","قسط شهري","تمويل عقاري","mortgage"],
  alternates: { canonical: "https://calculator.egypiana.com/financial/mortgage" },
};

const faqs = [
  {question:"كيف يُحسب القسط الشهري للرهن العقاري؟",answer:"يُستخدم جدول الإهلاك: Q = P × [r(1+r)ⁿ] / [(1+r)ⁿ - 1]، حيث P = قيمة القرض، r = معدل الفائدة الشهري، n = عدد الأشهر. في البداية معظم القسط فوائد، وبمرور الوقت يزداد الجزء المسدَّد من الأصل."},
  {question:"ما هي الدفعة الأولى المثالية؟",answer:"20% أو أكثر هي المعيار المقبول عالمياً. تقليلها يزيد نسبة التمويل (LTV) وقد يستوجب تأمين قرض إضافي. بعض البنوك في الخليج تقبل 10-15% للمواطنين."},
  {question:"ما الفرق بين الفائدة الثابتة والمتغيرة؟",answer:"الفائدة الثابتة تضمن قسطاً ثابتاً طوال مدة القرض. المتغيرة (مرتبطة بـ LIBOR أو SOFR) قد ترتفع أو تنخفض مع السوق. الثابتة أكثر أماناً للتخطيط، والمتغيرة قد توفر في بيئات أسعار منخفضة."},
  {question:"هل يفضل تسديد القرض مبكراً؟",answer:"عموماً نعم، توفر في الفوائد بشكل كبير. لكن تحقق من رسوم السداد المبكر (Prepayment Penalty) في عقدك. إذا كانت عائدات استثماراتك أعلى من معدل الفائدة، قد يكون الاستثمار أفضل من السداد المبكر."},
  {question:"ما هي نسبة الدين إلى الدخل المناسبة؟",answer:"معظم البنوك تشترط ألا يتجاوز إجمالي أقساط الديون الشهرية 40-50% من الدخل الشهري الصافي. القسط العقاري وحده لا يتجاوز 30-35% لضمان راحة مالية."},
];

export default function MortgagePage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"الحاسبات المالية",href:"/financial"},{label:"حاسبة القرض العقاري"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">حاسبة القرض العقاري</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">احسب قسطك الشهري وإجمالي الفوائد والتكلفة الكاملة</p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <MortgageCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"><ShareButtons title="حاسبة القرض العقاري" /></div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/financial/mortgage" title="حاسبة القرض العقاري" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={[
              {label:"حاسبة القرض",href:"/financial/loan",icon:"🏦",description:"أقساط القرض"},
              {label:"حاسبة الفائدة المركبة",href:"/financial/compound-interest",icon:"📈",description:"نمو الاستثمار"},
              {label:"حاسبة الراتب الصافي",href:"/financial/salary",icon:"💵",description:"صافي الراتب"},
              {label:"التفقيط",href:"/financial/tafqeet",icon:"📝",description:"كتابة المبالغ"},
            ]} />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
