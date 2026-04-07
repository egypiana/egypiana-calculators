import type { Metadata } from "next";
import GPACalculator from "@/components/calculators/GPACalculator";
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
  title: "حاسبة المعدل التراكمي GPA — نظام 4 و5 و100",
  description: "احسب معدلك التراكمي GPA بسهولة. يدعم نظام 4.0 و5.0 ونظام 100 درجة. أضف موادك وساعاتها المعتمدة.",
  keywords: ALL_CALC_SEO["gpa"].keywords,
  alternates: { canonical: "https://calculator.egypiana.com/tools/gpa" },
};

const faqs = [
  {question:"ما هو المعدل التراكمي GPA؟",answer:"GPA (Grade Point Average) هو متوسط موزون لجميع درجاتك الدراسية مقسوماً على الساعات المعتمدة الكلية. يُستخدم لتقييم مستواك الأكاديمي ومطلوب للقبول في الدراسات العليا والوظائف."},
  {question:"ما الفرق بين نظام 4.0 و5.0؟",answer:"نظام 4.0 شائع في الجامعات الأمريكية والعالمية. نظام 5.0 شائع في بعض الجامعات العربية (السعودية وغيرها). كلاهما يُعبّر عن نفس المفهوم لكن بمقياس مختلف: A = 4.0 أو 5.0 حسب النظام."},
  {question:"ما هو المعدل الجيد في نظام 4.0؟",answer:"3.5 فأعلى = ممتاز (Summa Cum Laude). 3.0-3.49 = جيد جداً. 2.5-2.99 = جيد. 2.0-2.49 = مقبول. أقل من 2.0 = احتمال الإنذار الأكاديمي في كثير من الجامعات."},
  {question:"كيف تُحسب الساعات المعتمدة في المعدل؟",answer:"كل مادة لها ساعات معتمدة (عادة 1-3 ساعات). نقاط المادة = تقدير المادة × ساعاتها. المجموع الكلي للنقاط ÷ مجموع الساعات = المعدل. المواد ذات الساعات الأعلى لها تأثير أكبر."},
  {question:"كيف أرفع معدلي إذا كان منخفضاً؟",answer:"ركّز على المواد ذات الساعات العالية لأنها تؤثر أكثر. أعد المواد التي رسبت فيها إن أمكن. استشر مرشدك الأكاديمي. ضع خطة دراسية واستثمر موارد الجامعة (مراكز التعلم، الساعات المكتبية)."},
];

export default function GPAPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"أدوات متنوعة",href:"/tools"},{label:"حاسبة المعدل التراكمي"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">حاسبة المعدل التراكمي GPA</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">احسب معدلك بنظام 4.0 أو 5.0 أو 100 درجة</p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <GPACalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"><ShareButtons title="حاسبة المعدل التراكمي GPA" /></div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/tools/gpa" title="حاسبة المعدل التراكمي GPA" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["gpa"]} />

            <AlsoKnownAs keywords={ALL_CALC_SEO["gpa"].keywords} />

            

            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={[
              {label:"حاسبة النسبة المئوية",href:"/math/percentage",icon:"💯",description:"احتساب النسب"},
              {label:"الآلة الحاسبة",href:"/math/calculator",icon:"🔢",description:"حاسبة علمية"},
              {label:"حاسبة العمر",href:"/tools/age",icon:"🎂",description:"عمرك بالتفصيل"},
              {label:"التفقيط",href:"/financial/tafqeet",icon:"📝",description:"كتابة المبالغ"},
            ]} />
            <FeaturedArticles />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
