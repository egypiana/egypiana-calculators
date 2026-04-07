import type { Metadata } from "next";
import TafqeetCalculator from "@/components/calculators/TafqeetCalculator";
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
  title: "حاسبة التفقيط — تحويل الأرقام إلى كلمات بالعربي",
  description:
    "أداة التفقيط المجانية — حوّل أي رقم إلى كتابة بالعربية. تدعم الجنيه المصري والريال السعودي والدرهم والدينار والدولار. مثالية للشيكات والعقود.",
  keywords: ALL_CALC_SEO["tafqeet"].keywords,
  alternates: { canonical: "https://calculator.egypiana.com/financial/tafqeet" },
};

const faqs = [
  { question: "ما هو التفقيط؟", answer: "التفقيط هو تحويل الأرقام إلى كلمات عربية مكتوبة. يُستخدم في الشيكات والعقود والفواتير الرسمية لمنع التزوير." },
  { question: "كيف أكتب مبلغ 1523 جنيه بالتفقيط؟", answer: "ألف وخمسمائة وثلاثة وعشرون جنيهاً مصرياً لا غير." },
  { question: "هل التفقيط يدعم الكسور (الفلوس والهللات)؟", answer: "نعم، الحاسبة تدعم الكسور العشرية. مثلاً: 100.50 = مائة جنيه وخمسون قرشاً لا غير." },
  { question: "ما الحد الأقصى للمبلغ؟", answer: "تدعم الحاسبة الأرقام حتى 999,999,999,999 (تسعمائة وتسعة وتسعون مليار)." },
  { question: "هل يمكنني نسخ النص العربي؟", answer: "نعم، يوجد زر 'نسخ' بجانب النتيجة لنسخها مباشرة إلى الحافظة." },
];

const relatedCalcs = [
  { label: "حاسبة نهاية الخدمة", href: "/financial/end-of-service", icon: "💼", description: "مكافأة التقاعد" },
  { label: "حاسبة القرض", href: "/financial/loan", icon: "🏦", description: "أقساط القرض" },
  { label: "الآلة الحاسبة", href: "/math/calculator", icon: "🧮", description: "حساب سريع" },
  { label: "حاسبة الزكاة", href: "/financial/zakat", icon: "🕌", description: "زكاة المال" },
];

export default function TafqeetPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: "الحاسبات المالية", href: "/financial" }, { label: "التفقيط" }]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">
          حاسبة التفقيط — تحويل الأرقام إلى كلمات عربية
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">
          للشيكات والعقود والفواتير — أدخل أي رقم واحصل على كتابته بالعربية الفصحى
        </p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <TafqeetCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <ShareButtons title="حاسبة التفقيط — تحويل الأرقام إلى كلمات عربية" />
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/financial/tafqeet" title="حاسبة التفقيط — تحويل الأرقام إلى كلمات عربية" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["tafqeet"]} />

            <AlsoKnownAs keywords={ALL_CALC_SEO["tafqeet"].keywords} />

            

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
