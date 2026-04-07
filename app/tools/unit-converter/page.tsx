import type { Metadata } from "next";
import UnitConverter from "@/components/calculators/UnitConverter";
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
  title: "محول الوحدات — طول، وزن، حرارة، مساحة، حجم، سرعة",
  description: "حوّل بين جميع وحدات القياس: الطول، الوزن، درجة الحرارة، المساحة، الحجم، السرعة. نتائج دقيقة فورية.",
  keywords: ALL_CALC_SEO["unit-converter"].keywords,
  alternates: { canonical: "https://calculator.egypiana.com/tools/unit-converter" },
};

const faqs = [
  {question:"كم كيلومتراً في الميل الواحد؟",answer:"1 ميل = 1.60934 كيلومتر. وبالعكس: 1 كيلومتر = 0.62137 ميل. مثال: 100 ميل ≈ 161 كيلومتر، 100 كيلومتر ≈ 62 ميل."},
  {question:"كيف أحوّل درجة مئوية إلى فهرنهايت؟",answer:"°F = (°C × 9/5) + 32. مثال: 100°C = (100 × 1.8) + 32 = 212°F. والعكس: °C = (°F - 32) × 5/9."},
  {question:"كم كيلوجرام في الرطل؟",answer:"1 رطل (Pound) = 0.453592 كيلوجرام. 1 كيلوجرام = 2.20462 رطل. مثال: 150 رطل ≈ 68 كيلوجرام."},
  {question:"ما الفرق بين اللتر والجالون؟",answer:"1 جالون أمريكي = 3.78541 لتر. 1 جالون بريطاني (إمبراطوري) = 4.54609 لتر. احرص على معرفة أي جالون تقصد عند التحويل."},
  {question:"كيف أحوّل الكيلومتر في الساعة إلى متر في الثانية؟",answer:"1 كم/ساعة = 1000م ÷ 3600 ثانية = 0.2778 م/ثانية. والعكس: 1 م/ث = 3.6 كم/ساعة. مثال: سرعة 100 كم/ساعة = 27.78 م/ثانية."},
];

export default function UnitConverterPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"أدوات متنوعة",href:"/tools"},{label:"محول الوحدات"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">محوّل الوحدات</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">حوّل بين جميع وحدات الطول والوزن والحرارة والمساحة والحجم والسرعة</p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <UnitConverter />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"><ShareButtons title="محوّل الوحدات" /></div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/tools/unit-converter" title="محوّل الوحدات" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
                        <CalcSEOContent data={ALL_CALC_SEO["unit-converter"]} />

            <AlsoKnownAs keywords={ALL_CALC_SEO["unit-converter"].keywords} />

            

            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={[
              {label:"حاسبة الوقود",href:"/tools/fuel",icon:"⛽",description:"استهلاك الوقود"},
              {label:"حاسبة العمر",href:"/tools/age",icon:"🎂",description:"عمرك بالتفصيل"},
              {label:"حاسبة النسبة المئوية",href:"/math/percentage",icon:"💯",description:"احتساب النسب"},
              {label:"الآلة الحاسبة",href:"/math/calculator",icon:"🔢",description:"حاسبة علمية"},
            ]} />
            <FeaturedArticles />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
