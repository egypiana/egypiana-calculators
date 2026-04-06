import type { Metadata } from "next";
import AreaCalculator from "@/components/calculators/AreaCalculator";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FAQSection from "@/components/shared/FAQSection";
import ShareButtons from "@/components/shared/ShareButtons";
import EmbedCode from "@/components/shared/EmbedCode";
import RelatedCalculators from "@/components/shared/RelatedCalculators";
import AdBlock from "@/components/ads/AdBlock";

export const metadata: Metadata = {
  title: "حاسبة المساحة والمحيط — مستطيل دائرة مثلث وأكثر",
  description: "احسب مساحة ومحيط جميع الأشكال الهندسية: مستطيل، مربع، دائرة، مثلث، شبه منحرف، متوازي أضلاع.",
  keywords: ["حاسبة المساحة","مساحة المستطيل","مساحة الدائرة","مساحة المثلث","المحيط"],
  alternates: { canonical: "https://calculator.egypiana.com/tools/area" },
};

const faqs = [
  {question:"ما هي صيغة مساحة الدائرة؟",answer:"مساحة الدائرة = π × r² حيث r نصف القطر. محيط الدائرة = 2πr. مثال: دائرة نصف قطرها 7 سم: المساحة = π × 49 ≈ 153.94 سم²."},
  {question:"كيف أحسب مساحة المثلث؟",answer:"الطريقة الأبسط: المساحة = ½ × القاعدة × الارتفاع. مثال: قاعدة 10 سم وارتفاع 6 سم: المساحة = ½ × 10 × 6 = 30 سم². الارتفاع يجب أن يكون عمودياً على القاعدة."},
  {question:"ما هو شبه المنحرف؟",answer:"شكل رباعي له ضلعان متوازيان (القاعدتان) وضلعان آخران. مساحته = ½ × (القاعدة الكبرى + القاعدة الصغرى) × الارتفاع. شائع في التصميم المعماري وحسابات الأراضي."},
  {question:"كيف أحوّل المساحة من متر مربع إلى فدان؟",answer:"1 فدان = 4,200 متر مربع (مصري) أو 4,047 متر مربع (دولي). لتحويل: 10,000 م² ÷ 4,200 ≈ 2.38 فدان (مصري). استخدم محول الوحدات للتحويل الدقيق."},
  {question:"ما هو الفرق بين المحيط والمساحة؟",answer:"المحيط هو مجموع أطوال حواف الشكل (يُقاس بوحدات طول: متر، سم). المساحة هي حجم السطح داخل الشكل (يُقاس بوحدات مربعة: م²، سم²). لطلاء جدار تحتاج المساحة، ولتسوير أرض تحتاج المحيط."},
];

export default function AreaPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"أدوات متنوعة",href:"/tools"},{label:"حاسبة المساحة"}]} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">حاسبة المساحة والمحيط</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">احسب مساحة ومحيط أي شكل هندسي بسهولة</p>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <AreaCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700"><ShareButtons title="حاسبة المساحة والمحيط" /></div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/tools/area" title="حاسبة المساحة والمحيط" />
              </div>
            </div>
            <div className="flex justify-center"><AdBlock format="leaderboard" /></div>
            <FAQSection faqs={faqs} />
          </div>
          <aside className="space-y-6">
            <AdBlock format="rectangle" />
            <RelatedCalculators calculators={[
              {label:"حاسبة الخرسانة",href:"/tools/concrete",icon:"🏗️",description:"كميات البناء"},
              {label:"محول الوحدات",href:"/tools/unit-converter",icon:"🔄",description:"تحويل المقاييس"},
              {label:"الآلة الحاسبة العلمية",href:"/math/scientific",icon:"🔬",description:"دوال رياضية"},
              {label:"حاسبة النسبة المئوية",href:"/math/percentage",icon:"💯",description:"احتساب النسب"},
            ]} />
            <AdBlock format="half-page" />
          </aside>
        </div>
      </div>
    </>
  );
}
