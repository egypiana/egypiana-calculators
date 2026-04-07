import type { Metadata } from "next";
import GradeCalculator from "@/components/calculators/GradeCalculator";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FAQSection from "@/components/shared/FAQSection";
import ShareButtons from "@/components/shared/ShareButtons";
import EmbedCode from "@/components/shared/EmbedCode";
import RelatedCalculators from "@/components/shared/RelatedCalculators";
import AdBlock from "@/components/ads/AdBlock";
import CalcSEOContent from "@/components/shared/CalcSEOContent";
import AlsoKnownAs from "@/components/shared/AlsoKnownAs";

import { ALL_CALC_SEO } from "@/lib/calc-seo";
import FeaturedArticles from "@/components/shared/FeaturedArticles";



export const metadata: Metadata = {
  title: "حاسبة المعدل والدرجات — متوسط موزون بالمواد",
  description: "احسب متوسط درجاتك الدراسية الموزون وتقديرك الحرفي. اعرف الدرجة المطلوبة في المواد المتبقية لتحقيق هدفك.",
  keywords: ALL_CALC_SEO["grade"].keywords,
  alternates: { canonical: "https://calculator.egypiana.com/tools/grade" },
};

const faqs = [
  {question:"كيف يُحسب المتوسط الموزون للدرجات؟",answer:"المتوسط الموزون = مجموع (الدرجة × الوزن) ÷ مجموع الأوزان. مثال: مادتان بدرجات 80 و90، أوزانهما 2 و3: المتوسط = (80×2 + 90×3) ÷ (2+3) = (160+270) ÷ 5 = 86."},
  {question:"ما هو نظام التقديرات الحرفية؟",answer:"A+ (90-100) ممتاز، A (80-89) جيد جداً، B (70-79) جيد، C (60-69) مقبول، D (50-59) ضعيف، F (أقل من 50) راسب. يختلف هذا النظام بين المؤسسات التعليمية."},
  {question:"ما الفرق بين الوزن ومعامل المادة؟",answer:"الوزن (أو معامل المادة) يعكس أهمية المادة في المعدل. المواد الأساسية عادة لها وزن أعلى (2-3) من المواد الاختيارية (1). في نظام الساعات المعتمدة (GPA)، الوزن هو عدد الساعات."},
  {question:"كيف أحسب الدرجة المطلوبة في الامتحان النهائي؟",answer:"أدخل درجات المواد التي أنهيتها وضع الوزن الصحيح. اترك حقل الدرجة لمادة الامتحان النهائي فارغاً وأدخل المعدل المستهدف. ستُخبرك الحاسبة بالدرجة المطلوبة."},
  {question:"هل ترتيب المواد يؤثر على النتيجة؟",answer:"لا، المتوسط الموزون لا يتأثر بترتيب المواد. المهم هو إدخال درجة ووزن كل مادة بشكل صحيح. قد تُدخل المواد بأي ترتيب."},
];

export default function GradePage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"أدوات متنوعة",href:"/tools"},{label:"حاسبة الدرجات"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">حاسبة الدرجات والمعدل</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">احسب متوسطك الموزون واعرف الدرجة المطلوبة لتحقيق هدفك</p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <GradeCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"><ShareButtons title="حاسبة الدرجات والمعدل" /></div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/tools/grade" title="حاسبة الدرجات والمعدل" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["grade"]} />

            <AlsoKnownAs keywords={ALL_CALC_SEO["grade"].keywords} />

            

            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={[
              {label:"حاسبة المعدل التراكمي GPA",href:"/tools/gpa",icon:"🎓",description:"معدل GPA"},
              {label:"حاسبة النسبة المئوية",href:"/math/percentage",icon:"💯",description:"احتساب النسب"},
              {label:"الآلة الحاسبة",href:"/math/calculator",icon:"🔢",description:"حاسبة علمية"},
              {label:"حاسبة العمر",href:"/tools/age",icon:"🎂",description:"عمرك بالتفصيل"},
            ]} />
            <FeaturedArticles />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
