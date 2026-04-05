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
  Mail,
  TrendingUp,
  Youtube,
  Rss,
} from "lucide-react";
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
              {/* Newsletter Button */}
              <Link
                href="/newsletter"
                className="hidden sm:flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#1E293B] font-bold text-sm px-3 py-2 rounded-lg transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="hidden md:inline">النشرة البريدية</span>
              </Link>

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
              href="https://youtube.com/@egypiana"
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
                <Link
                  href="/newsletter"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 bg-[#F59E0B] text-[#1E293B] font-bold px-4 py-3 rounded-xl w-full justify-center"
                >
                  <Mail className="h-5 w-5" />
                  النشرة البريدية
                </Link>
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
