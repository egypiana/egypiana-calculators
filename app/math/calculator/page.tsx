import type { Metadata } from "next";
import StandardCalculator from "@/components/calculators/StandardCalculator";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FAQSection from "@/components/shared/FAQSection";
import ShareButtons from "@/components/shared/ShareButtons";
import RelatedCalculators from "@/components/shared/RelatedCalculators";
import AdBlock from "@/components/ads/AdBlock";

export const metadata: Metadata = {
  title: "آلة حاسبة اون لاين — حاسبة عربية مجانية",
  description:
    "آلة حاسبة اون لاين مجانية باللغة العربية. احسب الجمع والطرح والضرب والقسمة والنسب المئوية بسهولة ودقة من هاتفك أو كمبيوترك.",
  keywords: ["آلة حاسبة", "حاسبة اون لاين", "حاسبة عربية", "حاسبة مجانية", "calculator"],
  alternates: {
    canonical: "https://calculator.egypiana.com/math/calculator",
  },
  openGraph: {
    title: "آلة حاسبة اون لاين — حاسبة عربية مجانية",
    description: "آلة حاسبة اون لاين مجانية باللغة العربية.",
    url: "https://calculator.egypiana.com/math/calculator",
  },
};

const faqs = [
  {
    question: "كيف أستخدم الآلة الحاسبة اون لاين؟",
    answer:
      "اضغط على الأرقام والعمليات الحسابية التي تريدها، ثم اضغط على زر '=' لرؤية النتيجة. يمكنك أيضاً استخدام لوحة مفاتيح كمبيوترك مباشرة.",
  },
  {
    question: "هل تدعم الآلة الحاسبة لوحة المفاتيح؟",
    answer:
      "نعم، تدعم الآلة الحاسبة لوحة المفاتيح الكاملة. استخدم الأرقام 0-9، وعلامات +، -، *، /، ومفتاح Enter للحساب، وEscape للمسح.",
  },
  {
    question: "هل يمكنني حساب النسبة المئوية؟",
    answer:
      "نعم، استخدم زر '%' لحساب النسبة المئوية. مثلاً: 200 × 15% تعطيك 30.",
  },
  {
    question: "هل تحفظ الآلة الحاسبة سجل العمليات؟",
    answer:
      "نعم، تعرض الآلة الحاسبة آخر 5 عمليات حسابية في سجل أسفل الآلة. يمكنك النقر على أي نتيجة سابقة لاستخدامها مجدداً.",
  },
  {
    question: "ما الفرق بين الآلة الحاسبة العادية والعلمية؟",
    answer:
      "الآلة الحاسبة العادية تتعامل مع العمليات الأساسية (جمع، طرح، ضرب، قسمة، نسبة مئوية)، بينما الآلة العلمية تضيف دوال مثل sin وcos وlog والجذر التربيعي والأسس.",
  },
];

const relatedCalcs = [
  { label: "الآلة الحاسبة العلمية", href: "/math/scientific", icon: "🔬", description: "دوال علمية وهندسية" },
  { label: "حاسبة النسبة المئوية", href: "/math/percentage", icon: "📊", description: "احسب النسب والزيادات" },
  { label: "حاسبة الكسور", href: "/math/fractions", icon: "➗", description: "جمع وطرح الكسور" },
  { label: "حاسبة المعادلات", href: "/math/equation", icon: "📐", description: "حل المعادلات الجبرية" },
];

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "آلة حاسبة اون لاين",
  url: "https://calculator.egypiana.com/math/calculator",
  description: "آلة حاسبة عربية مجانية اون لاين",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  inLanguage: "ar",
};

export default function CalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "حاسبات الرياضيات", href: "/math" },
          { label: "الآلة الحاسبة" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">
          آلة حاسبة اون لاين — حاسبة عربية مجانية
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">
          احسب بسهولة ودقة من أي جهاز، بدون تسجيل أو تنزيل
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column — 70% */}
          <div className="lg:col-span-2 space-y-8">
            {/* Calculator Widget */}
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm">
              <div className="p-6">
                <StandardCalculator />
              </div>

              {/* Share buttons */}
              <div className="px-6 pb-6">
                <ShareButtons title="آلة حاسبة اون لاين مجانية — حاسبات إيجيبيانا" />
              </div>
            </div>

            {/* Ad — In Content */}
            {/* ADSENSE IN-CONTENT START */}
            <div className="flex justify-center">
              <AdBlock format="leaderboard" /* slot="..." publisherId="..." */ />
            </div>
            {/* ADSENSE IN-CONTENT END */}

            {/* How to Use */}
            <section className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-[#1E293B] dark:text-white mb-4">
                كيفية الاستخدام
              </h2>
              <ol className="space-y-3 text-gray-600 dark:text-gray-300">
                {[
                  "اضغط على الأرقام التي تريد إدخالها في الحساب.",
                  "اختر العملية الحسابية: + للجمع، − للطرح، × للضرب، ÷ للقسمة.",
                  "اضغط على '=' لعرض النتيجة فوراً.",
                  "اضغط على 'AC' لمسح الشاشة والبدء من جديد.",
                  "استخدم '+/-' لتحويل الرقم بين موجب وسالب.",
                  "استخدم '%' لحساب النسبة المئوية.",
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

            {/* Explanation */}
            <section className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-[#1E293B] dark:text-white mb-4">
                شرح الحاسبة والعمليات الأساسية
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  الآلة الحاسبة العادية تجري العمليات الحسابية الأربع الأساسية:
                  <strong className="text-[#1E293B] dark:text-white"> الجمع (+)</strong>،
                  <strong className="text-[#1E293B] dark:text-white"> الطرح (−)</strong>،
                  <strong className="text-[#1E293B] dark:text-white"> الضرب (×)</strong>، و
                  <strong className="text-[#1E293B] dark:text-white"> القسمة (÷)</strong>.
                </p>
                <p>
                  <strong className="text-[#1E293B] dark:text-white">حساب النسبة المئوية:</strong> لحساب x% من رقم ما،
                  اضغط الرقم ثم × ثم النسبة ثم % ثم =.
                  مثال: 500 × 20% = 100
                </p>
                <p>
                  <strong className="text-[#1E293B] dark:text-white">ترتيب العمليات:</strong>{" "}
                  تُنفَّذ العمليات بالترتيب الذي تُدخلها به. للحسابات المعقدة استخدم
                  <a href="/math/scientific" className="text-[#1E3A8A] dark:text-blue-400 hover:underline mx-1">
                    الآلة الحاسبة العلمية
                  </a>
                  التي تدعم الأقواس وترتيب العمليات الصحيح.
                </p>
              </div>
            </section>

            {/* Practical Examples */}
            <section className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold text-[#1E293B] dark:text-white mb-4">
                أمثلة عملية
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "حساب الميزانية الشهرية",
                    expr: "5000 + 2000 − 3500",
                    result: "1500",
                    desc: "الراتب 5000 + دخل إضافي 2000 − المصاريف 3500 = المتبقي 1500 ريال",
                  },
                  {
                    title: "حساب الخصم",
                    expr: "800 × 25%",
                    result: "200",
                    desc: "سعر المنتج 800 جنيه بخصم 25% = 200 جنيه خصم → السعر النهائي: 600 جنيه",
                  },
                  {
                    title: "تقسيم الفاتورة",
                    expr: "450 ÷ 3",
                    result: "150",
                    desc: "فاتورة مطعم بمبلغ 450 درهم مقسَّمة على 3 أشخاص = 150 درهم لكل شخص",
                  },
                ].map((ex, i) => (
                  <div
                    key={i}
                    className="bg-blue-50 dark:bg-gray-800 rounded-xl p-4 border-r-4 border-[#1E3A8A]"
                  >
                    <h3 className="font-bold text-[#1E293B] dark:text-white mb-1 text-sm">
                      {i + 1}. {ex.title}
                    </h3>
                    <p className="font-mono text-[#1E3A8A] dark:text-blue-400 text-lg font-bold mb-1" dir="ltr">
                      {ex.expr} = {ex.result}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{ex.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <FAQSection faqs={faqs} />
          </div>

          {/* Sidebar — 30% */}
          <aside className="space-y-6">
            {/* ADSENSE SIDEBAR START */}
            <AdBlock format="rectangle" /* slot="..." publisherId="..." */ />
            {/* ADSENSE SIDEBAR END */}

            <RelatedCalculators calculators={relatedCalcs} />

            {/* ADSENSE SIDEBAR LARGE START */}
            <AdBlock format="half-page" /* slot="..." publisherId="..." */ />
            {/* ADSENSE SIDEBAR LARGE END */}
          </aside>
        </div>
      </div>
    </>
  );
}
