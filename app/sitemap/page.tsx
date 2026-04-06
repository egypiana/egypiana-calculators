import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "خريطة الموقع — حاسبات إيجيبيانا",
  description: "خريطة شاملة لجميع صفحات وحاسبات موقع إيجيبيانا",
};

const FINANCIAL = [
  { title: "حاسبة الزكاة", href: "/financial/zakat", icon: "☪️" },
  { title: "حاسبة القرض والأقساط", href: "/financial/loan", icon: "🏦" },
  { title: "حاسبة الرهن العقاري", href: "/financial/mortgage", icon: "🏠" },
  { title: "حاسبة ضريبة القيمة المضافة", href: "/financial/vat", icon: "🧾" },
  { title: "حاسبة الراتب الصافي", href: "/financial/salary", icon: "💵" },
  { title: "حاسبة الفائدة المركبة", href: "/financial/compound-interest", icon: "📈" },
  { title: "محول العملات", href: "/financial/currency", icon: "💱" },
  { title: "حاسبة نهاية الخدمة", href: "/financial/end-of-service", icon: "💼" },
  { title: "التفقيط — تحويل الأرقام لكلمات", href: "/financial/tafqeet", icon: "✍️" },
];

const HEALTH = [
  { title: "حاسبة BMI مؤشر كتلة الجسم", href: "/health/bmi", icon: "⚖️" },
  { title: "حاسبة السعرات الحرارية", href: "/health/calories", icon: "🔥" },
  { title: "حاسبة الحمل وموعد الولادة", href: "/health/pregnancy", icon: "🤰" },
  { title: "حاسبة الوزن المثالي", href: "/health/ideal-weight", icon: "🎯" },
  { title: "حاسبة شرب الماء", href: "/health/water-intake", icon: "💧" },
  { title: "حاسبة معدل الأيض BMR", href: "/health/bmr", icon: "💪" },
];

const MATH = [
  { title: "حاسبة النسبة المئوية", href: "/math/percentage", icon: "📊" },
  { title: "الآلة الحاسبة العلمية", href: "/math/scientific", icon: "🔬" },
  { title: "الآلة الحاسبة", href: "/math/calculator", icon: "🧮" },
];

const TOOLS = [
  { title: "حاسبة المعدل الجامعي GPA", href: "/tools/gpa", icon: "🎓" },
  { title: "حاسبة استهلاك الوقود", href: "/tools/fuel", icon: "⛽" },
  { title: "مولد كلمات المرور", href: "/tools/password", icon: "🔐" },
  { title: "محول الوحدات", href: "/tools/unit-converter", icon: "📐" },
  { title: "حاسبة الوقت والتاريخ", href: "/tools/time", icon: "⏱️" },
  { title: "حاسبة درجات الطلاب", href: "/tools/grade", icon: "📝" },
  { title: "حاسبة المساحات", href: "/tools/area", icon: "📏" },
  { title: "حاسبة الخرسانة", href: "/tools/concrete", icon: "🏗️" },
  { title: "حاسبة العمر", href: "/tools/age", icon: "🎂" },
  { title: "التاريخ الهجري", href: "/tools/hijri-date", icon: "📅" },
  { title: "حاسبة الميراث الشرعي", href: "/tools/inheritance", icon: "⚖️" },
];

const LEGAL = [
  { title: "عن الموقع", href: "/about" },
  { title: "تواصل معنا", href: "/contact" },
  { title: "سياسة الخصوصية", href: "/privacy-policy" },
  { title: "شروط الاستخدام", href: "/terms" },
  { title: "إخلاء المسؤولية", href: "/disclaimer" },
  { title: "جميع الحاسبات", href: "/calculators" },
];

interface SitemapItem {
  title: string;
  href: string;
  icon?: string;
}

function SitemapSection({
  heading,
  emoji,
  items,
  showIcons = true,
}: {
  heading: string;
  emoji: string;
  items: SitemapItem[];
  showIcons?: boolean;
}) {
  return (
    <div
      className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm"
      dir="rtl"
    >
      <h2 className="text-xl font-black text-[#1E293B] dark:text-white mb-4">
        {emoji} {heading}
      </h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.href} className="flex items-center gap-2">
            {showIcons && item.icon && (
              <span className="text-lg flex-shrink-0">{item.icon}</span>
            )}
            {!showIcons && (
              <span className="text-[#1E3A8A] text-xs flex-shrink-0">•</span>
            )}
            <Link
              href={item.href}
              className="text-[#1E3A8A] dark:text-blue-400 hover:underline text-sm font-medium"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SitemapPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "خريطة الموقع" },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">
          خريطة الموقع
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">
          جميع صفحات وحاسبات موقع إيجيبيانا في مكان واحد
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <SitemapSection
            heading="الحاسبات المالية"
            emoji="💰"
            items={FINANCIAL}
          />
          <SitemapSection
            heading="الحاسبات الصحية"
            emoji="❤️"
            items={HEALTH}
          />
          <SitemapSection
            heading="الحاسبات الرياضية"
            emoji="🔢"
            items={MATH}
          />
          <SitemapSection
            heading="أدوات متنوعة"
            emoji="🛠️"
            items={TOOLS}
          />
        </div>

        <div className="mt-6">
          <SitemapSection
            heading="صفحات الموقع"
            emoji="📄"
            items={LEGAL}
            showIcons={false}
          />
        </div>
      </div>
    </>
  );
}
