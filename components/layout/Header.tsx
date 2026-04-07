"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calculator,
  Menu,
  X,
  Search,
  Moon,
  Sun,
  TrendingUp,
  Youtube,
  Rss,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

/* ── Custom SVG icons ─────────────────────────────────── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────── */
const navLinks = [
  { label: "الرئيسية",        href: "/"          },
  { label: "الحاسبات المالية", href: "/financial"  },
  { label: "الصحة واللياقة",  href: "/health"     },
  { label: "حاسبات الرياضيات",href: "/math"       },
  { label: "حاسبات أخرى",    href: "/tools"      },
  { label: "المدونة",         href: "/blog"       },
];

const trendingLinks = [
  { label: "حاسبة الزكاة",       href: "/financial/zakat"        },
  { label: "حاسبة القرض",        href: "/financial/loan"         },
  { label: "حساب العمر",         href: "/tools/age"              },
  { label: "حاسبة الميراث",      href: "/tools/inheritance"      },
  { label: "حاسبة BMI",          href: "/health/bmi"             },
  { label: "التاريخ الهجري",     href: "/tools/hijri-date"       },
  { label: "نهاية الخدمة",       href: "/financial/end-of-service"},
  { label: "التفقيط",            href: "/financial/tafqeet"      },
];

const socialLinks = [
  { href: "https://www.facebook.com/EgypianaEg",          icon: Facebook,     label: "فيسبوك",   color: "hover:text-blue-300"  },
  { href: "https://x.com/egypiana",                       icon: Twitter,      label: "X",        color: "hover:text-sky-300"   },
  { href: "https://www.youtube.com/@egypiana",            icon: Youtube,      label: "يوتيوب",   color: "hover:text-red-300"   },
  { href: "https://www.instagram.com/egypiana/",          icon: Instagram,    label: "انستغرام", color: "hover:text-pink-300"  },
  { href: "https://www.pinterest.com/egypiana/",          icon: PinterestIcon,label: "بينتريست", color: "hover:text-red-300"   },
  { href: "https://www.linkedin.com/company/egypiana/",   icon: Linkedin,     label: "لينكدإن",  color: "hover:text-blue-200"  },
  { href: "https://whatsapp.com/channel/0029Vb7ip3mEquiKNFmf682L", icon: WhatsAppIcon, label: "واتساب", color: "hover:text-green-300" },
  { href: "/rss.xml",                                     icon: Rss,          label: "RSS",      color: "hover:text-yellow-300"},
];

function getArabicDate(): string {
  return new Date().toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ══════════════════════════════════════════════════════ */
export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen]         = useState(false);
  const [searchQuery, setSearchQuery]       = useState("");
  const [currentPath, setCurrentPath]       = useState("/");
  const [arabicDate, setArabicDate]         = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    setArabicDate(getArabicDate());
  }, []);

  const isActive = (href: string) =>
    href === "/" ? currentPath === "/" : currentPath.startsWith(href);

  return (
    <>
      {/* ══════════════════════════════════════════
          ROW 1 — Main Navigation Bar
          ══════════════════════════════════════════ */}
      <header className="bg-[#1E3A8A] sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">

          {/* ── 3-zone layout using relative + absolute centering ── */}
          <div className="relative flex items-center h-16">

            {/* ── LEFT ZONE: hamburger (mobile) | full logo (desktop) ── */}
            <div className="flex items-center gap-2 z-10 flex-shrink-0">
              {/* Hamburger — mobile/tablet only */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                aria-label="القائمة"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Full logo — desktop only */}
              <div className="hidden lg:flex items-center gap-3">
                <div className="bg-white/20 rounded-xl p-2 flex-shrink-0">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <div>
                  <Link
                    href="/"
                    className="text-white font-bold text-lg leading-tight block hover:text-blue-200 transition-colors"
                  >
                    حاسبات إيجيبيانا
                  </Link>
                  <span className="text-blue-200 text-xs font-light">
                    {arabicDate}
                  </span>
                </div>
              </div>
            </div>

            {/* ── CENTER ZONE: absolutely centered (no flex bias) ── */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Mobile: site name centered */}
              <Link
                href="/"
                className="lg:hidden pointer-events-auto text-white font-bold text-lg hover:text-blue-200 transition-colors"
              >
                حاسبات إيجيبيانا
              </Link>

              {/* Desktop: nav links centered */}
              <nav className="hidden lg:flex pointer-events-auto items-center gap-0.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                      isActive(link.href)
                        ? "bg-white text-[#1E3A8A]"
                        : "text-white hover:bg-white/20"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* ── RIGHT ZONE: action buttons ── */}
            <div className="ml-auto flex items-center gap-1.5 z-10 flex-shrink-0">
              {/* WhatsApp CTA — desktop only */}
              <a
                href="https://whatsapp.com/channel/0029Vb7ip3mEquiKNFmf682L"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm px-3 py-2 rounded-lg transition-colors"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span className="hidden xl:inline">انضم قناتنا</span>
              </a>

              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                aria-label="بحث"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Dark Mode */}
              <button
                onClick={toggleTheme}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                aria-label="تبديل الوضع الليلي"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* ── Search Bar ── */}
          {searchOpen && (
            <div className="pb-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                className="flex gap-2"
              >
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن حاسبة..."
                  className="flex-1 px-4 py-2 rounded-lg text-[#1E293B] bg-white focus:outline-none focus:ring-2 focus:ring-[#F59E0B] text-right"
                  autoFocus
                  dir="rtl"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#1E293B] font-bold rounded-lg transition-colors"
                >
                  بحث
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* ══════════════════════════════════════════
          ROW 2 — Trending Bar (desktop/tablet only)
          ══════════════════════════════════════════ */}
      <div className="hidden md:flex bg-[#DC2626] h-10 items-center sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 w-full flex items-center gap-3">

          {/* Label */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <TrendingUp className="h-4 w-4 text-white" />
            <span className="text-white text-sm font-bold whitespace-nowrap">الأكثر بحثاً:</span>
          </div>

          {/* Scrollable links */}
          <div className="flex-1 overflow-x-auto scrollbar-none">
            <div className="flex items-center whitespace-nowrap">
              {trendingLinks.map((link, i) => (
                <span key={link.href} className="flex items-center">
                  <Link
                    href={link.href}
                    className="text-white font-light text-sm hover:text-yellow-200 transition-colors px-2 py-1"
                  >
                    {link.label}
                  </Link>
                  {i < trendingLinks.length - 1 && (
                    <span className="text-white/40 text-xs select-none">/</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {socialLinks.map(({ href, icon: Icon, label, color }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`text-white/80 ${color} transition-colors`}
                aria-label={label}
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          Mobile Menu Overlay
          ══════════════════════════════════════════ */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-[#1E3A8A] z-50 shadow-2xl flex flex-col overflow-hidden">

            {/* ── Drawer header ── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/15 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="bg-white/20 rounded-lg p-1.5">
                  <Calculator className="h-5 w-5 text-white" />
                </div>
                <Link
                  href="/"
                  className="text-white font-bold text-base"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  حاسبات إيجيبيانا
                </Link>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white/70 hover:text-white hover:bg-white/15 rounded-lg transition-colors"
                aria-label="إغلاق"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* ── Scrollable body ── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">

              {/* Mobile search */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    setMobileMenuOpen(false);
                    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                className="flex gap-2"
              >
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن حاسبة..."
                  className="flex-1 px-3 py-2 rounded-lg text-[#1E293B] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] text-right"
                  dir="rtl"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#F59E0B] text-[#1E293B] font-bold rounded-lg text-sm transition-colors hover:bg-[#D97706]"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>

              {/* Nav links */}
              <nav className="flex flex-col gap-1">
                <p className="text-white/50 text-xs font-semibold uppercase tracking-wider px-1 mb-1">
                  الأقسام
                </p>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl font-bold transition-all text-right text-sm ${
                      isActive(link.href)
                        ? "bg-white text-[#1E3A8A]"
                        : "text-white hover:bg-white/15 active:bg-white/25"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* WhatsApp CTA */}
              <a
                href="https://whatsapp.com/channel/0029Vb7ip3mEquiKNFmf682L"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] active:bg-[#1aad54] text-white font-bold px-4 py-3 rounded-xl w-full transition-colors text-sm"
              >
                <WhatsAppIcon className="h-5 w-5" />
                انضم لقناة واتساب
              </a>

              {/* Quick links */}
              <div>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-wider px-1 mb-2">
                  الأكثر بحثاً
                </p>
                <div className="flex flex-wrap gap-2">
                  {trendingLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-white text-xs bg-white/10 hover:bg-white/20 active:bg-white/30 px-3 py-1.5 rounded-full transition-colors font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

            </div>

            {/* ── Drawer footer — social icons ── */}
            <div className="flex-shrink-0 border-t border-white/15 px-5 py-4">
              <p className="text-white/50 text-xs font-semibold mb-3">تابعنا</p>
              <div className="flex items-center gap-3 flex-wrap">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={href}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-white/70 hover:text-white active:text-white/50 transition-colors"
                    aria-label={label}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </>
      )}
    </>
  );
}
