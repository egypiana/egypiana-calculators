import type { Metadata } from "next";
import PregnancyCalculator from "@/components/calculators/PregnancyCalculator";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FAQSection from "@/components/shared/FAQSection";
import ShareButtons from "@/components/shared/ShareButtons";
import EmbedCode from "@/components/shared/EmbedCode";
import RelatedCalculators from "@/components/shared/RelatedCalculators";
import AdBlock from "@/components/ads/AdBlock";

export const metadata: Metadata = {
  title: "حاسبة الحمل — موعد الولادة والأسبوع الحالي",
  description: "احسبي موعد الولادة المتوقع وعمر الجنين بالأسابيع والأشهر والأرباع. تتبعي مراحل الحمل الثلاثة وأبرز المعالم.",
  keywords: ["حاسبة الحمل","موعد الولادة","عمر الجنين","أسبوع الحمل","مراحل الحمل"],
  alternates: { canonical: "https://calculator.egypiana.com/health/pregnancy" },
};

const faqs = [
  {question:"كيف يُحسب موعد الولادة؟",answer:"تُضاف 280 يوماً (40 أسبوعاً) على أول يوم من آخر دورة شهرية — هذه طريقة Naegele القياسية. إذا كنتِ تعرفين تاريخ الإخصاب، تُضاف 266 يوماً (38 أسبوعاً). الموعد تقريبي بنطاق ±2 أسبوع."},
  {question:"ما هي الأرباع الثلاثة للحمل؟",answer:"الربع الأول: 1-13 أسبوعاً (تشكّل الأعضاء، خطر الإجهاض أعلى). الربع الثاني: 14-26 أسبوعاً (الجنين يتحرك، الأم تشعر بالتحسن). الربع الثالث: 27-40 أسبوعاً (نمو سريع، التحضير للولادة)."},
  {question:"متى يُعدّ الحمل مكتمل النضج؟",answer:"الحمل المكتمل هو 39-40 أسبوعاً. الولادة 37-38 أسبوعاً تُعدّ مبكرة قليلاً، و34-36 أسبوعاً خداجاً متأخراً، وأقل من 34 أسبوعاً خداجاً. الولادة بعد 42 أسبوعاً تستدعي تدخلاً طبياً."},
  {question:"هل الحاسبة تُعطي نتيجة دقيقة 100%؟",answer:"لا، هي تقدير مبني على متوسط 280 يوماً. الدورات غير المنتظمة أو عدم معرفة تاريخ الدورة الدقيق يقلل الدقة. الموجات فوق الصوتية (السونار) في الثلث الأول أكثر دقة لتحديد عمر الجنين."},
  {question:"ما هي أهم الفحوصات في الثلث الأول؟",answer:"فحص الحمل (HCG)، تحليل الدم الشامل، فحص الغدة الدرقية، فحوصات الأمراض المعدية، سونار التثليث (11-14 أسبوعاً) لقياس الشفافية القفوية وتحديد خطر متلازمة داون."},
];

export default function PregnancyPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"الحاسبات الصحية",href:"/health"},{label:"حاسبة الحمل"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">حاسبة الحمل وموعد الولادة</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">اعرفي أسبوع حملك وموعد ولادتك المتوقع وأبرز المعالم</p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <PregnancyCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"><ShareButtons title="حاسبة الحمل وموعد الولادة" /></div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/health/pregnancy" title="حاسبة الحمل وموعد الولادة" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={[
              {label:"حاسبة مؤشر كتلة الجسم",href:"/health/bmi",icon:"⚖️",description:"مؤشر الوزن"},
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
