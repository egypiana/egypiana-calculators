import Link from "next/link";
import { Calculator, Facebook, Twitter, Youtube, Rss, Instagram, Linkedin } from "lucide-react";

/* Pinterest icon (not in lucide-react) */
function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
    </svg>
  );
}

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
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.facebook.com/EgypianaEg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="فيسبوك"
                className="text-[#94A3B8] hover:text-blue-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/egypiana"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (تويتر)"
                className="text-[#94A3B8] hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@egypiana"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="يوتيوب"
                className="text-[#94A3B8] hover:text-red-400 transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/egypiana/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="إنستغرام"
                className="text-[#94A3B8] hover:text-pink-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.pinterest.com/egypiana/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="بينتريست"
                className="text-[#94A3B8] hover:text-red-500 transition-colors"
              >
                <PinterestIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/egypiana/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="لينكدإن"
                className="text-[#94A3B8] hover:text-blue-300 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
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
            © 2026 حاسبات إيجيبيانا — جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
}
