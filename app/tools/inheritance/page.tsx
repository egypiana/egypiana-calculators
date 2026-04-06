import type { Metadata } from "next";
import InheritanceCalculator from "@/components/calculators/InheritanceCalculator";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FAQSection from "@/components/shared/FAQSection";
import ShareButtons from "@/components/shared/ShareButtons";
import EmbedCode from "@/components/shared/EmbedCode";
import RelatedCalculators from "@/components/shared/RelatedCalculators";
import AdBlock from "@/components/ads/AdBlock";

export const metadata: Metadata = {
  title: "حاسبة الميراث الشرعي — توزيع التركة وفق الشريعة الإسلامية",
  description:
    "حاسبة الميراث الشرعي المجانية — وزّع التركة وفق أحكام الشريعة الإسلامية. تشمل الزوج والزوجة والأبناء والبنات والأب والأم والإخوة مع شرح مفصل.",
  keywords: [
    "حاسبة الميراث",
    "حساب الميراث",
    "الميراث الشرعي",
    "حاسبة الإرث",
    "توزيع التركة",
    "الإرث الإسلامي",
  ],
  alternates: { canonical: "https://calculator.egypiana.com/tools/inheritance" },
};

const faqs = [
  { question: "ما هي أنصبة الورثة الشرعية؟", answer: "الأنصبة الشرعية المقررة في القرآن الكريم هي: النصف (1/2)، الربع (1/4)، الثمن (1/8)، الثلثان (2/3)، الثلث (1/3)، والسدس (1/6). والباقي بعدها يكون عصبةً للورثة الذكور." },
  { question: "ما هو الفرق بين أصحاب الفروض والعصبة؟", answer: "أصحاب الفروض هم من حددت لهم الشريعة نصيباً معيناً كالزوجة والأم. أما العصبة فهم من يرثون ما تبقى بعد أصحاب الفروض، كالأبناء والأب." },
  { question: "ما هو الحجب في الميراث؟", answer: "الحجب هو منع وارث من الميراث بوجود وارث آخر. مثلاً: الأخ محجوب بوجود الابن، والجد محجوب بوجود الأب." },
  { question: "هل تستحق البنت نفس نصيب الابن؟", answer: "في الشريعة الإسلامية، للذكر مثل حظ الأنثيين عند الإرث. فالابن يرث ضعف البنت. والحكمة أن الابن مكلف بالنفقة على أسرته بينما لا يلزم البنت ذلك." },
  { question: "ماذا يحدث إذا توفي الابن قبل المورث؟", answer: "الابن المتوفى قبل أبيه لا يرث. وفي بعض الدول (كمصر) يُطبَّق نظام الوصية الواجبة التي تُعطي أبناء الابن المتوفى نصيب والدهم بحد أقصى الثلث. يُستحسن استشارة محامي أحوال شخصية." },
];

const relatedCalcs = [
  { label: "حاسبة الزكاة", href: "/financial/zakat", icon: "🕌", description: "زكاة المال" },
  { label: "التاريخ الهجري", href: "/tools/hijri-date", icon: "🗓️", description: "تحويل التواريخ" },
  { label: "التفقيط", href: "/financial/tafqeet", icon: "📝", description: "كتابة المبالغ" },
  { label: "حاسبة العمر", href: "/tools/age", icon: "👤", description: "احسب عمرك" },
];

export default function InheritancePage() {
  return (
    <>
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "حاسبات أخرى", href: "/tools" }, { label: "حاسبة الميراث" }]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">
          حاسبة الميراث الشرعي
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">
          وزّع التركة على الورثة وفق أحكام الشريعة الإسلامية
        </p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <InheritanceCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <ShareButtons title="حاسبة الميراث الشرعي — توزيع التركة" />
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/tools/inheritance" title="حاسبة الميراث الشرعي" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={relatedCalcs} />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
