import Link from "next/link";
import { Calculator, Facebook, Twitter, Youtube, Rss } from "lucide-react";

const financialLinks = [
  { label: "حاسبة الزكاة", href: "/financial/zakat" },
  { label: "حاسبة القرض", href: "/financial/loan" },
  { label: "حاسبة نهاية الخدمة", href: "/financial/end-of-service" },
  { label: "التفقيط", href: "/financial/tafqeet" },
  { label: "حاسبة الرهن العقاري", href: "/financial/mortgage" },
];

const healthLinks = [
  { label: "حاسبة BMI", href: "/health/bmi" },
  { label: "حاسبة السعرات", href: "/health/calories" },
  { label: "حاسبة الوزن المثالي", href: "/health/ideal-weight" },
  { label: "حاسبة الحمل", href: "/health/pregnancy" },
];

const topCalculators = [
  { label: "حاسبة الزكاة", href: "/financial/zakat" },
  { label: "حاسبة القرض", href: "/financial/loan" },
  { label: "حاسبة العمر", href: "/tools/age" },
  { label: "الآلة الحاسبة", href: "/math/calculator" },
  { label: "التاريخ الهجري", href: "/tools/hijri-date" },
  { label: "حاسبة الميراث", href: "/tools/inheritance" },
];

const legalLinks = [
  { label: "سياسة الخصوصية", href: "/privacy-policy" },
  { label: "شروط الاستخدام", href: "/terms" },
  { label: "إخلاء المسؤولية", href: "/disclaimer" },
  { label: "تواصل معنا", href: "/contact" },
  { label: "من نحن", href: "/about" },
  { label: "خريطة الموقع", href: "/sitemap" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1E293B] text-[#94A3B8]" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Column 1 — عن الموقع */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#1E3A8A] rounded-xl p-2">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <span className="text-white font-bold text-lg">حاسبات إيجيبيانا</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              منصة الحاسبات العربية الأولى — أكثر من 40 حاسبة دقيقة ومجانية
              لكل احتياجاتك اليومية والمالية والصحية.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com/egypiana"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="فيسبوك"
                className="text-[#94A3B8] hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/egypiana"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تويتر"
                className="text-[#94A3B8] hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/@egypiana"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="يوتيوب"
                className="text-[#94A3B8] hover:text-red-400 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="/rss.xml"
                aria-label="RSS"
                className="text-[#94A3B8] hover:text-orange-400 transition-colors"
              >
                <Rss className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2 — الحاسبات */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-white/10 pb-2">
              الحاسبات
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/financial"
                  className="text-sm hover:text-white transition-colors flex items-center gap-1"
                >
                  <span className="text-xs opacity-50">←</span>
                  الحاسبات المالية
                </Link>
              </li>
              <li>
                <Link
                  href="/health"
                  className="text-sm hover:text-white transition-colors flex items-center gap-1"
                >
                  <span className="text-xs opacity-50">←</span>
                  الصحة واللياقة
                </Link>
              </li>
              <li>
                <Link
                  href="/math"
                  className="text-sm hover:text-white transition-colors flex items-center gap-1"
                >
                  <span className="text-xs opacity-50">←</span>
                  حاسبات الرياضيات
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-sm hover:text-white transition-colors flex items-center gap-1"
                >
                  <span className="text-xs opacity-50">←</span>
                  حاسبات أخرى
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators"
                  className="text-sm hover:text-white transition-colors flex items-center gap-1"
                >
                  <span className="text-xs opacity-50">←</span>
                  جميع الحاسبات
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — الأكثر استخداماً */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-white/10 pb-2">
              الأكثر استخداماً
            </h3>
            <ul className="space-y-2">
              {topCalculators.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span className="text-xs opacity-50">←</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — قانوني وتواصل */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 border-b border-white/10 pb-2">
              روابط مهمة
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span className="text-xs opacity-50">←</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center">
          <p className="text-sm text-[#64748B]">
            © 2025 حاسبات إيجيبيانا — جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
}
