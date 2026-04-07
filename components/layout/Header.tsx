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
} from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
import { useTheme } from "@/components/providers/ThemeProvider";

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "الحاسبات المالية", href: "/financial" },
  { label: "الصحة واللياقة", href: "/health" },
  { label: "حاسبات الرياضيات", href: "/math" },
  { label: "حاسبات أخرى", href: "/tools" },
  { label: "المدونة", href: "/blog" },
];

const trendingLinks = [
  { label: "حاسبة الزكاة", href: "/financial/zakat" },
  { label: "حاسبة القرض", href: "/financial/loan" },
  { label: "حساب العمر", href: "/tools/age" },
  { label: "حاسبة الميراث", href: "/tools/inheritance" },
  { label: "حاسبة BMI", href: "/health/bmi" },
  { label: "التاريخ الهجري", href: "/tools/hijri-date" },
  { label: "حاسبة نهاية الخدمة", href: "/financial/end-of-service" },
  { label: "التفقيط", href: "/financial/tafqeet" },
];

function getArabicDate(): string {
  return new Date().toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPath, setCurrentPath] = useState("/");
  const [arabicDate, setArabicDate] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    setArabicDate(getArabicDate());
  }, []);

  const isActive = (href: string) =>
    href === "/" ? currentPath === "/" : currentPath.startsWith(href);

  return (
    <>
      {/* ══════════════════════════════════════════
          ROW 1 — Main Navigation Bar (#1E3A8A)
          ══════════════════════════════════════════ */}
      <header className="bg-[#1E3A8A] sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* RIGHT — Logo + Site Name + Date */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="bg-white/20 rounded-xl p-2">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <Link
                  href="/"
                  className="text-white font-bold text-lg leading-tight block hover:text-blue-200 transition-colors"
                >
                  حاسبات إيجيبيانا
                </Link>
                <span className="text-blue-200 text-xs font-light hidden sm:block">
                  {arabicDate}
                </span>
              </div>
            </div>

            {/* CENTER — Nav Links (hidden on mobile) */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
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

            {/* LEFT — Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* WhatsApp Channel Button */}
              <a
                href="https://whatsapp.com/channel/0029Vb7ip3mEquiKNFmf682L"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm px-3 py-2 rounded-lg transition-colors"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span className="hidden md:inline">انضم قناتنا</span>
              </a>

              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                aria-label="بحث"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                aria-label="تبديل الوضع الليلي"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                aria-label="القائمة"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Search Bar (expands below nav when open) */}
          {searchOpen && (
            <div className="pb-3 animate-fade-in">
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
          ROW 2 — Trending Bar (#DC2626)
          ══════════════════════════════════════════ */}
      <div className="bg-[#DC2626] h-10 flex items-center sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between gap-4">

          {/* Label */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <TrendingUp className="h-4 w-4 text-white" />
            <span className="text-white text-sm font-bold whitespace-nowrap">
              الأكثر بحثاً:
            </span>
          </div>

          {/* Scrollable Links */}
          <div className="flex-1 overflow-x-auto trending-scroll">
            <div className="flex items-center gap-0 whitespace-nowrap">
              {trendingLinks.map((link, i) => (
                <span key={link.href} className="flex items-center">
                  <Link
                    href={link.href}
                    className="text-white font-light text-sm hover:text-yellow-200 transition-colors px-2 py-1"
                  >
                    {link.label}
                  </Link>
                  {i < trendingLinks.length - 1 && (
                    <span className="text-white/50 text-xs">/</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="https://www.youtube.com/@egypiana"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-red-200 transition-colors"
              aria-label="يوتيوب"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href="/rss.xml"
              className="text-white hover:text-yellow-200 transition-colors"
              aria-label="RSS"
            >
              <Rss className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          Mobile Menu Overlay
          ══════════════════════════════════════════ */}
      {mobileMenuOpen && (
        <>
          <div
            className="mobile-menu-overlay"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-72 bg-[#1E3A8A] z-50 shadow-2xl animate-slide-in overflow-y-auto">
            <div className="p-4">
              {/* Close Button */}
              <div className="flex items-center justify-between mb-6">
                <Link
                  href="/"
                  className="text-white font-bold text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  حاسبات إيجيبيانا
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-white hover:bg-white/20 rounded-lg"
                  aria-label="إغلاق"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl font-bold transition-all text-right ${
                      isActive(link.href)
                        ? "bg-white text-[#1E3A8A]"
                        : "text-white hover:bg-white/20"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-white/20">
                <a
                  href="https://whatsapp.com/channel/0029Vb7ip3mEquiKNFmf682L"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-4 py-3 rounded-xl w-full justify-center transition-colors"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  انضم لقناة واتساب
                </a>
              </div>

              {/* Trending in mobile */}
              <div className="mt-6">
                <p className="text-white/60 text-sm mb-3 font-medium">الأكثر بحثاً</p>
                <div className="flex flex-wrap gap-2">
                  {trendingLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-white text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-full transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
