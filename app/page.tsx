import type { Metadata } from "next";
import Link from "next/link";
import { Search, Star, ArrowLeft, CheckCircle } from "lucide-react";
import AdBlock from "@/components/ads/AdBlock";

export const metadata: Metadata = {
  title: "حاسبات إيجيبيانا — أفضل الحاسبات العربية المجانية",
  description:
    "أفضل وأدق الحاسبات العربية المجانية على الإنترنت. حاسبة الزكاة، حاسبة القرض، حاسبة BMI، الآلة الحاسبة، حاسبة العمر، التاريخ الهجري وأكثر من 40 حاسبة مجانية.",
  alternates: {
    canonical: "https://calculator.egypiana.com",
  },
};

const categories = [
  {
    icon: "💰",
    title: "الحاسبات المالية",
    description: "زكاة، قروض، نهاية خدمة، رهن عقاري، تفقيط والمزيد",
    href: "/financial",
    count: 10,
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: "🏋️",
    title: "الصحة واللياقة",
    description: "BMI، سعرات حرارية، وزن مثالي، حاسبة الحمل والمزيد",
    href: "/health",
    count: 7,
    color: "from-green-500 to-green-700",
  },
  {
    icon: "📐",
    title: "حاسبات الرياضيات",
    description: "آلة حاسبة، علمية، نسبة مئوية، كسور، معادلات والمزيد",
    href: "/math",
    count: 7,
    color: "from-purple-500 to-purple-700",
  },
  {
    icon: "🔧",
    title: "حاسبات أخرى",
    description: "عمر، هجري، GPA، درجات، شبكة، تحويلات والمزيد",
    href: "/tools",
    count: 13,
    color: "from-orange-500 to-orange-700",
  },
];

const topCalculators = [
  {
    icon: "🕌",
    title: "حاسبة الزكاة",
    description: "احسب زكاة مالك بدقة",
    href: "/financial/zakat",
    badge: "الأكثر استخداماً",
  },
  {
    icon: "🏦",
    title: "حاسبة القرض",
    description: "احسب أقساط قرضك الشهرية",
    href: "/financial/loan",
    badge: null,
  },
  {
    icon: "👤",
    title: "حاسبة العمر",
    description: "احسب عمرك بالسنوات والأشهر والأيام",
    href: "/tools/age",
    badge: null,
  },
  {
    icon: "⚖️",
    title: "حاسبة الميراث",
    description: "احسب الميراث الشرعي بدقة",
    href: "/tools/inheritance",
    badge: null,
  },
  {
    icon: "⚖️",
    title: "حاسبة BMI",
    description: "تحقق من مؤشر كتلة جسمك",
    href: "/health/bmi",
    badge: null,
  },
  {
    icon: "🗓️",
    title: "التاريخ الهجري",
    description: "حول بين التقويم الهجري والميلادي",
    href: "/tools/hijri-date",
    badge: null,
  },
  {
    icon: "🧮",
    title: "الآلة الحاسبة",
    description: "آلة حاسبة عربية مجانية اون لاين",
    href: "/math/calculator",
    badge: null,
  },
  {
    icon: "💼",
    title: "نهاية الخدمة",
    description: "احسب مكافأة نهاية الخدمة",
    href: "/financial/end-of-service",
    badge: null,
  },
];

const whyReasons = [
  {
    icon: "✅",
    title: "دقة عالية",
    text: "جميع الحاسبات مبنية على معادلات رياضية وفقهية دقيقة ومُراجعة من متخصصين.",
  },
  {
    icon: "🆓",
    title: "مجاني تماماً",
    text: "جميع الحاسبات مجانية بدون تسجيل أو اشتراك أو رسوم خفية.",
  },
  {
    icon: "📱",
    title: "يعمل على جميع الأجهزة",
    text: "صُمِّم الموقع ليعمل بشكل مثالي على الهاتف والتابلت والكمبيوتر.",
  },
  {
    icon: "🌐",
    title: "عربي بالكامل",
    text: "المنصة الأولى التي تقدم حاسبات احترافية باللغة العربية الفصحى.",
  },
];

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "حاسبات إيجيبيانا",
    url: "https://calculator.egypiana.com",
    description: "أفضل الحاسبات العربية المجانية على الإنترنت",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://calculator.egypiana.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ══════════════════════════════════════════
          1. HERO SECTION
          ══════════════════════════════════════════ */}
      <section className="hero-gradient py-12 md:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-black text-[#1E3A8A] mb-4 leading-tight">
            أفضل الحاسبات العربية
            <br />
            <span className="text-[#DC2626]">في مكان واحد</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 font-medium">
            حاسبات دقيقة ومجانية لكل احتياجاتك
          </p>

          {/* Search Bar */}
          <form
            action="/search"
            method="get"
            className="flex items-center bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden max-w-2xl mx-auto"
            dir="rtl"
          >
            <input
              type="search"
              name="q"
              placeholder="ابحث عن حاسبة... مثل: زكاة، قرض، BMI"
              className="flex-1 px-5 py-4 text-[#1E293B] text-base focus:outline-none bg-transparent placeholder:text-gray-400"
              aria-label="بحث عن حاسبة"
            />
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-4 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold transition-colors"
              aria-label="بحث"
            >
              <Search className="h-5 w-5" />
              <span className="hidden sm:inline">بحث</span>
            </button>
          </form>

          {/* Quick Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {["حاسبة الزكاة", "حاسبة القرض", "BMI", "الآلة الحاسبة", "التاريخ الهجري"].map(
              (tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1.5 bg-white/80 hover:bg-white border border-gray-200 text-gray-600 text-sm rounded-full transition-all hover:shadow-sm"
                >
                  {tag}
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. AD — LEADERBOARD
          ══════════════════════════════════════════ */}
      {/* ADSENSE LEADERBOARD START */}
      <div className="py-4 px-4 bg-white dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto flex justify-center">
          <AdBlock
            format="leaderboard"
            /* slot="YOUR_SLOT_ID" publisherId="ca-pub-XXXXXXXXXXXXXXXX" */
          />
        </div>
      </div>
      {/* ADSENSE LEADERBOARD END */}

      {/* ══════════════════════════════════════════
          3. CATEGORIES GRID
          ══════════════════════════════════════════ */}
      <section className="py-12 px-4 bg-white dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#1E293B] dark:text-white text-center mb-8">
            تصفح حسب الفئة
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="category-card group bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl p-6 text-center hover:border-[#1E3A8A] dark:hover:border-blue-500 hover:shadow-xl"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mx-auto mb-4 text-3xl shadow-md group-hover:scale-110 transition-transform`}
                >
                  {cat.icon}
                </div>
                <h3 className="font-bold text-[#1E293B] dark:text-white text-base mb-1 group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 leading-relaxed">
                  {cat.description}
                </p>
                <span className="text-xs font-bold text-[#1E3A8A] dark:text-blue-400">
                  {cat.count} حاسبة
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. MOST USED CALCULATORS
          ══════════════════════════════════════════ */}
      <section className="py-12 px-4 bg-[#F8FAFC] dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-[#1E293B] dark:text-white">
              الأكثر استخداماً
            </h2>
            <Link
              href="/calculators"
              className="flex items-center gap-1 text-[#1E3A8A] dark:text-blue-400 font-medium text-sm hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              عرض الكل
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {topCalculators.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                className="category-card group bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-700 rounded-2xl p-5 hover:border-[#1E3A8A] dark:hover:border-blue-500 hover:shadow-lg relative overflow-hidden"
              >
                {calc.badge && (
                  <span className="absolute top-3 left-3 text-xs bg-[#DC2626] text-white px-2 py-0.5 rounded-full font-medium">
                    {calc.badge}
                  </span>
                )}
                <div className="text-4xl mb-3">{calc.icon}</div>
                <h3 className="font-bold text-[#1E293B] dark:text-white text-sm mb-1 group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors">
                  {calc.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {calc.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. AD — RECTANGLE + FEATURED CALC
          ══════════════════════════════════════════ */}
      <section className="py-12 px-4 bg-white dark:bg-[#1E293B]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-start">
          {/* Featured Calculator of the Day */}
          <div className="md:col-span-2 bg-gradient-to-br from-[#1E3A8A] to-[#1e40af] rounded-2xl p-8 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 text-[#F59E0B] fill-[#F59E0B]" />
                  <span className="text-blue-200 text-sm font-medium">
                    حاسبة اليوم المميزة
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black mb-3">
                  حاسبة الزكاة الذكية
                </h2>
                <p className="text-blue-100 leading-relaxed mb-6">
                  احسب زكاة أموالك بدقة تامة بناءً على نصاب الذهب الحالي.
                  تشمل زكاة النقود والذهب والأسهم. محدَّثة يومياً.
                </p>
                <Link
                  href="/financial/zakat"
                  className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#1E293B] font-bold px-6 py-3 rounded-xl transition-colors"
                >
                  احسب الزكاة الآن
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </div>
              <div className="text-7xl hidden md:block flex-shrink-0">🕌</div>
            </div>
          </div>

          {/* Ad Rectangle */}
          <div className="flex flex-col gap-4">
            {/* ADSENSE RECTANGLE START */}
            <AdBlock
              format="rectangle"
              /* slot="YOUR_SLOT_ID" publisherId="ca-pub-XXXXXXXXXXXXXXXX" */
            />
            {/* ADSENSE RECTANGLE END */}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. SEO CONTENT BLOCK
          ══════════════════════════════════════════ */}
      <section className="py-16 px-4 bg-[#F8FAFC] dark:bg-[#0F172A]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-[#1E293B] dark:text-white text-center mb-10">
            لماذا تستخدم حاسبات إيجيبيانا؟
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {whyReasons.map((reason) => (
              <div
                key={reason.title}
                className="bg-white dark:bg-[#1E293B] rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{reason.icon}</span>
                  <div>
                    <h3 className="font-bold text-[#1E293B] dark:text-white text-base mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {reason.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-[#1E293B] rounded-2xl p-8 border border-gray-100 dark:border-gray-700 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              <strong className="text-[#1E293B] dark:text-white">حاسبات إيجيبيانا</strong> هي
              المنصة الرقمية الأولى المتخصصة في تقديم الحاسبات الإلكترونية باللغة العربية، وقد
              صُمِّمت خصيصاً لتلبية احتياجات المستخدمين في مصر والمملكة العربية السعودية
              والإمارات وسائر دول العالم العربي.
            </p>
            <p>
              نوفر أكثر من <strong className="text-[#1E3A8A] dark:text-blue-400">40 حاسبة مجانية</strong>{" "}
              تشمل الحاسبات المالية كحاسبة الزكاة وحاسبة القرض ومكافأة نهاية الخدمة، والحاسبات
              الصحية كحاسبة مؤشر كتلة الجسم BMI وحاسبة السعرات الحرارية، وحاسبات الرياضيات
              والحاسبات العلمية.
            </p>
            <p>
              تتميز حاساباتنا بالدقة العالية، إذ تعتمد على معادلات رياضية ومقاييس شرعية
              موثوقة ومحدَّثة باستمرار. كما تعمل جميع الحاسبات دون الحاجة إلى تسجيل أو
              اشتراك، وهي متاحة على مدار الساعة طوال أيام الأسبوع.
            </p>
            <p>
              سواء كنت تبحث عن{" "}
              <Link href="/financial/zakat" className="text-[#1E3A8A] dark:text-blue-400 hover:underline">
                حاسبة الزكاة
              </Link>
              {" "}أو{" "}
              <Link href="/tools/hijri-date" className="text-[#1E3A8A] dark:text-blue-400 hover:underline">
                التقويم الهجري
              </Link>
              {" "}أو{" "}
              <Link href="/math/calculator" className="text-[#1E3A8A] dark:text-blue-400 hover:underline">
                آلة حاسبة اون لاين
              </Link>
              ، ستجد هنا ما تحتاجه بسهولة وسرعة.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
