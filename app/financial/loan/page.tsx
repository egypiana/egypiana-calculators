import type { Metadata } from "next";
import LoanCalculator from "@/components/calculators/LoanCalculator";
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
  title: "حاسبة القرض والأقساط الشهرية — احسب قسطك مجاناً",
  description:
    "حاسبة القرض المجانية — احسب القسط الشهري وإجمالي الفوائد وجدول السداد لأي قرض بنكي أو تمويل شخصي أو رهن عقاري. سريعة ودقيقة.",
  keywords: ALL_CALC_SEO["loan"].keywords,
  alternates: { canonical: "https://calculator.egypiana.com/financial/loan" },
};

const faqs = [
  {
    question: "كيف تُحسب الأقساط الشهرية للقرض؟",
    answer: "تُحسب الأقساط الشهرية بمعادلة الإطفاء: قسط = (أصل القرض × معدل الفائدة الشهري × (1+r)ⁿ) ÷ ((1+r)ⁿ - 1)، حيث r = معدل الفائدة الشهري، n = عدد الأشهر.",
  },
  {
    question: "ما الفرق بين الفائدة البسيطة والمركبة؟",
    answer: "الفائدة البسيطة تُحسب على أصل القرض فقط، بينما الفائدة المركبة تُحسب على الأصل المتبقي شهرياً وهي الأشيع في القروض البنكية. معادلة حاسبتنا تعتمد الفائدة المركبة (الإطفاء المتساوي).",
  },
  {
    question: "هل يمكنني استخدامها لحساب قرض السيارة أو الرهن العقاري؟",
    answer: "نعم، تعمل الحاسبة لجميع أنواع القروض ذات الأقساط الثابتة: القرض الشخصي، قرض السيارة، القرض العقاري، تمويل المشاريع الصغيرة.",
  },
  {
    question: "ما أثر مدة القرض على الأقساط؟",
    answer: "كلما زادت مدة القرض، انخفض القسط الشهري، لكن ارتفع إجمالي الفوائد. وكلما قلَّت المدة، ارتفع القسط لكن دفعت فوائد أقل. اختر المدة التي تناسب قدرتك الشهرية.",
  },
  {
    question: "هل الحاسبة تحتسب الرسوم الإدارية؟",
    answer: "لا، الحاسبة تحسب الأقساط بناءً على أصل القرض ومعدل الفائدة فقط. للرسوم الإدارية أو مصاريف الملف، أضفها إلى أصل القرض قبل الإدخال.",
  },
];

const relatedCalcs = [
  { label: "حاسبة الرهن العقاري", href: "/financial/mortgage", icon: "🏠", description: "قرض شراء العقار" },
  { label: "حاسبة الفائدة المركبة", href: "/financial/compound-interest", icon: "📈", description: "نمو الاستثمار" },
  { label: "حاسبة الراتب الصافي", href: "/financial/salary", icon: "💵", description: "صافي الراتب بعد الخصومات" },
  { label: "حاسبة نهاية الخدمة", href: "/financial/end-of-service", icon: "💼", description: "مكافأة التقاعد" },
];

export default function LoanPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "الحاسبات المالية", href: "/financial" },
          { label: "حاسبة القرض" },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">
          حاسبة القرض والأقساط الشهرية
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">
          احسب القسط الشهري وإجمالي الفوائد وجدول السداد الكامل
        </p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <LoanCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <ShareButtons title="حاسبة القرض والأقساط الشهرية — حاسبات إيجيبيانا" />
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/financial/loan" title="حاسبة القرض والأقساط الشهرية" />
              </div>
            </div>
            <div className="flex justify-center">
              <AdBlock format="leaderboard" />
            </div>
            <section className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-[#1E293B] dark:text-white mb-4">كيفية الاستخدام</h2>
              <ol className="space-y-3 text-gray-600 dark:text-gray-300">
                {["أدخل مبلغ القرض بالجنيه المصري.", "أدخل معدل الفائدة السنوي (مثال: 12%).", "أدخل مدة القرض بالأشهر (مثال: 60 شهراً = 5 سنوات).", "اضغط 'احسب القسط الشهري' لرؤية النتائج.", "يمكنك عرض جدول الأقساط التفصيلي للاطلاع على كل شهر."].map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1E3A8A] text-white text-xs flex items-center justify-center font-bold">{i + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </section>
                        <CalcSEOContent data={ALL_CALC_SEO["loan"]} />

            <AlsoKnownAs keywords={ALL_CALC_SEO["loan"].keywords} />

            

            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={relatedCalcs} />
            <FeaturedArticles />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
