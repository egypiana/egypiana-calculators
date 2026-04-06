import type { Metadata } from "next";
import ZakatCalculator from "@/components/calculators/ZakatCalculator";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FAQSection from "@/components/shared/FAQSection";
import ShareButtons from "@/components/shared/ShareButtons";
import EmbedCode from "@/components/shared/EmbedCode";
import RelatedCalculators from "@/components/shared/RelatedCalculators";
import AdBlock from "@/components/ads/AdBlock";

export const metadata: Metadata = {
  title: "حاسبة الزكاة — احسب زكاة مالك بدقة لعام 2025",
  description:
    "حاسبة الزكاة المجانية — احسب زكاة النقود والذهب والفضة والأسهم بدقة بناءً على نصاب الذهب الحالي. تحقق إذا كنت مستحقاً لإخراج الزكاة.",
  keywords: [
    "حاسبة الزكاة",
    "حساب الزكاة",
    "كم زكاة مالي",
    "زكاة المال",
    "نصاب الزكاة",
    "زكاة الذهب",
    "زكاة 2025",
  ],
  alternates: {
    canonical: "https://calculator.egypiana.com/financial/zakat",
  },
  openGraph: {
    title: "حاسبة الزكاة — احسب زكاة مالك لعام 2025",
    description: "احسب زكاة مالك بدقة بناءً على نصاب الذهب الحالي",
    url: "https://calculator.egypiana.com/financial/zakat",
  },
};

const faqs = [
  {
    question: "ما هو نصاب الزكاة؟",
    answer:
      "نصاب الزكاة هو الحد الأدنى للمال الذي تجب فيه الزكاة. وهو 85 جراماً من الذهب عيار 24 أو ما يعادلها من النقود. إذا كان مالك يساوي هذا المقدار أو يزيد عنه، وحال عليه الحول (سنة قمرية)، وجبت الزكاة.",
  },
  {
    question: "كم نسبة الزكاة؟",
    answer:
      "نسبة زكاة المال هي 2.5% من إجمالي الأصول الزكوية (ربع العُشر). أي لكل 1000 جنيه يجب إخراج 25 جنيهاً كزكاة.",
  },
  {
    question: "هل تشمل الزكاة الذهب الذي أرتديه؟",
    answer:
      "اختلف العلماء في هذه المسألة. الرأي الأحوط هو إخراج زكاة على جميع الذهب المملوك بغض النظر عن الاستخدام. استشر عالماً للفتوى الدقيقة.",
  },
  {
    question: "هل تُزكَّى الأسهم؟",
    answer:
      "نعم، تجب الزكاة على قيمة الأسهم. يُحسب مقدار الزكاة على القيمة السوقية للأسهم أو على نصيبها من الأصول الزكوية للشركة، حسب نوع النشاط.",
  },
  {
    question: "هل يُحسب الحول من تاريخ الشراء أم من بداية السنة؟",
    answer:
      "يبدأ حول كل مال جديد من تاريخ امتلاكه أو من تاريخ بلوغه النصاب. كثير من العلماء يُيسِّرون ويوصون بتحديد تاريخ ثابت في السنة لإخراج الزكاة تسهيلاً للحساب.",
  },
];

const relatedCalcs = [
  { label: "حاسبة زكاة الذهب", href: "/financial/gold-zakat", icon: "🥇", description: "احسب زكاة الذهب والفضة" },
  { label: "حاسبة القرض", href: "/financial/loan", icon: "🏦", description: "احسب أقساط قرضك" },
  { label: "حاسبة الميراث", href: "/tools/inheritance", icon: "⚖️", description: "الإرث الشرعي" },
  { label: "حاسبة نهاية الخدمة", href: "/financial/end-of-service", icon: "💼", description: "مكافأة نهاية الخدمة" },
];

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "حاسبة الزكاة",
  url: "https://calculator.egypiana.com/financial/zakat",
  description: "احسب زكاة مالك بدقة بناءً على نصاب الذهب",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  inLanguage: "ar",
};

export default function ZakatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "الحاسبات المالية", href: "/financial" },
          { label: "حاسبة الزكاة" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">
          حاسبة الزكاة — احسب زكاة مالك لعام 2025
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">
          احسب زكاة النقود والذهب والفضة والأسهم بناءً على نصاب الذهب الحالي
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
              <ZakatCalculator />
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <ShareButtons title="حاسبة الزكاة المجانية — احسب زكاة مالك بدقة" />
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                <EmbedCode url="https://calculator.egypiana.com/financial/zakat" title="حاسبة الزكاة — احسب زكاة مالك لعام 2025" />
              </div>
            </div>

            {/* ADSENSE IN-CONTENT START */}
            <div className="flex justify-center">
              <AdBlock format="leaderboard" />
            </div>
            {/* ADSENSE IN-CONTENT END */}

            <section className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-[#1E293B] dark:text-white mb-4">
                كيفية الاستخدام
              </h2>
              <ol className="space-y-3 text-gray-600 dark:text-gray-300">
                {[
                  "أدخل سعر الذهب الحالي لعيار 24 بالجنيه المصري (يمكن التحقق من سعر الذهب اليوم).",
                  "أدخل إجمالي النقود والأرصدة البنكية التي تمتلكها.",
                  "أدخل وزن الذهب الذي تمتلكه بالجرام (إن وُجد).",
                  "أدخل وزن الفضة التي تمتلكها بالجرام (إن وُجدت).",
                  "أدخل قيمة الأسهم والاستثمارات الأخرى.",
                  "أدخل الديون المستحقة لك (التي يُرجَّح سدادها).",
                  "اضغط 'احسب الزكاة' لمعرفة مبلغ الزكاة الواجب إخراجه.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1E3A8A] text-white text-xs flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-[#1E293B] dark:text-white mb-4">
                شرح معادلة حساب الزكاة
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-[#1E293B] dark:text-white">النصاب =</strong>{" "}
                  85 جرام ذهب عيار 24 × سعر الجرام الحالي
                </p>
                <p>
                  <strong className="text-[#1E293B] dark:text-white">إجمالي الأصول =</strong>{" "}
                  النقود + (وزن الذهب × سعر الجرام) + (وزن الفضة × سعر جرام الفضة) + الأسهم + الديون المستحقة
                </p>
                <p>
                  إذا كان إجمالي الأصول ≥ النصاب، وجبت الزكاة:
                </p>
                <div className="bg-blue-50 dark:bg-gray-800 rounded-xl p-4 font-mono text-center text-[#1E3A8A] dark:text-blue-400 font-bold text-lg">
                  مبلغ الزكاة = إجمالي الأصول × 2.5%
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-[#1E293B] dark:text-white mb-4">
                أمثلة عملية
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "موظف يمتلك مدخرات بسيطة",
                    details: "نقود: 50,000 ج | ذهب: 20 جرام | سعر الذهب: 4200 ج/جرام",
                    calc: "إجمالي = 50,000 + (20 × 4,200) = 50,000 + 84,000 = 134,000 ج",
                    nisab: "النصاب = 85 × 4,200 = 357,000 ج",
                    result: "134,000 < 357,000 → لا تجب الزكاة ❌",
                    color: "border-gray-300",
                  },
                  {
                    title: "رجل أعمال يمتلك ثروة متوسطة",
                    details: "نقود: 500,000 ج | ذهب: 50 جرام | أسهم: 200,000 ج",
                    calc: "إجمالي = 500,000 + (50 × 4,200) + 200,000 = 500,000 + 210,000 + 200,000 = 910,000 ج",
                    nisab: "النصاب = 85 × 4,200 = 357,000 ج",
                    result: "الزكاة = 910,000 × 2.5% = 22,750 جنيهاً ✅",
                    color: "border-[#10B981]",
                  },
                ].map((ex, i) => (
                  <div key={i} className={`bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border-r-4 ${ex.color}`}>
                    <h3 className="font-bold text-[#1E293B] dark:text-white mb-2">{i + 1}. {ex.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">{ex.details}</p>
                    <p className="text-sm font-mono text-gray-700 dark:text-gray-200 mb-1">{ex.calc}</p>
                    <p className="text-sm font-mono text-gray-700 dark:text-gray-200 mb-1">{ex.nisab}</p>
                    <p className="font-bold text-[#1E3A8A] dark:text-blue-400">{ex.result}</p>
                  </div>
                ))}
              </div>
            </section>

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
