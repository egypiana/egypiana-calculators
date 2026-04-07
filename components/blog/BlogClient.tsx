"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import type { BlogPost } from "@/lib/blog/types";

type SortKey =
  | "newest"
  | "oldest"
  | "reading-asc"
  | "reading-desc"
  | "category";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "newest",       label: "الأحدث أولاً" },
  { value: "oldest",       label: "الأقدم أولاً" },
  { value: "reading-asc",  label: "وقت القراءة: الأقصر أولاً" },
  { value: "reading-desc", label: "وقت القراءة: الأطول أولاً" },
  { value: "category",     label: "ترتيب حسب الفئة" },
];

const CATEGORIES = ["الكل", "مالي", "صحي", "رياضيات", "أدوات"];
const PER_PAGE = 10;

const TOP_CALCULATORS = [
  { label: "حاسبة الزكاة",    href: "/financial/zakat" },
  { label: "حاسبة القرض",     href: "/financial/loan" },
  { label: "حاسبة BMI",       href: "/health/bmi" },
  { label: "السعرات الحرارية", href: "/health/calories" },
  { label: "حاسبة الراتب",    href: "/financial/salary" },
  { label: "حاسبة الميراث",   href: "/tools/inheritance" },
];

function sortPosts(posts: BlogPost[], sort: SortKey): BlogPost[] {
  const arr = [...posts];
  switch (sort) {
    case "newest":
      return arr.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    case "oldest":
      return arr.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    case "reading-asc":
      return arr.sort((a, b) => a.readingTime - b.readingTime);
    case "reading-desc":
      return arr.sort((a, b) => b.readingTime - a.readingTime);
    case "category":
      return arr.sort((a, b) => a.category.localeCompare(b.category, "ar"));
    default:
      return arr;
  }
}

export default function BlogClient({ allPosts }: { allPosts: BlogPost[] }) {
  const [sort, setSort]       = useState<SortKey>("newest");
  const [cat, setCat]         = useState("الكل");
  const [page, setPage]       = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "";

  const filtered = useMemo(() => {
    const base = cat === "الكل" ? allPosts : allPosts.filter((p) => p.category === cat);
    return sortPosts(base, sort);
  }, [allPosts, cat, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const posts = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Newest posts for sidebar (always newest-first regardless of sort)
  const recentPosts = useMemo(
    () => sortPosts(allPosts, "newest").slice(0, 5),
    [allPosts]
  );

  const handleCatChange = (newCat: string) => {
    setCat(newCat);
    setPage(1);
  };

  const handleSortChange = (newSort: SortKey) => {
    setSort(newSort);
    setPage(1);
    setDropdownOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" dir="rtl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2">
          المدونة
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          مقالات ونصائح مالية وصحية وعملية
        </p>
      </div>

      {/* Controls Row: Category Tabs + Sort Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => handleCatChange(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                cat === c
                  ? "bg-[#1E3A8A] text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-[#1E3A8A]/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative" dir="rtl">
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-semibold text-[#1E293B] dark:text-white shadow-sm hover:border-[#1E3A8A]/50 transition-colors min-w-[200px] justify-between"
          >
            <span className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-[#1E3A8A] dark:text-blue-400 flex-shrink-0" />
              {currentSortLabel}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <>
              {/* backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute top-full mt-2 right-0 z-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg overflow-hidden min-w-[220px]">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSortChange(opt.value)}
                    className={`w-full text-right px-4 py-2.5 text-sm transition-colors ${
                      sort === opt.value
                        ? "bg-[#1E3A8A] text-white font-bold"
                        : "text-[#1E293B] dark:text-white hover:bg-[#1E3A8A]/10 dark:hover:bg-gray-700"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">
        {filtered.length} مقال — ترتيب: {currentSortLabel}
      </p>

      <div className="flex gap-8 items-start">
        {/* Posts Grid */}
        <div className="flex-1 min-w-0">
          {posts.length === 0 ? (
            <p className="text-gray-400 text-center py-16">
              لا توجد مقالات في هذه الفئة حالياً.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-md hover:border-[#1E3A8A]/30 transition-all"
                >
                  {/* Category Badge */}
                  <span
                    className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3"
                    style={{
                      backgroundColor: post.color + "18",
                      color: post.color,
                    }}
                  >
                    {post.category}
                  </span>

                  <h2 className="text-lg font-black text-[#1E293B] dark:text-white mb-2 leading-snug group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-700 pt-3">
                    <span>{post.author}</span>
                    <div className="flex items-center gap-3">
                      <span>{post.readingTime} دقائق قراءة</span>
                      <span>
                        {new Date(post.date).toLocaleDateString("ar-EG", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-colors ${
                    p === page
                      ? "bg-[#1E3A8A] text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-[#1E3A8A]/10"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block w-72 flex-shrink-0 space-y-6">
          {/* Top Calculators */}
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
            <h3 className="font-black text-[#1E293B] dark:text-white mb-4 text-sm">
              أشهر الحاسبات
            </h3>
            <ul className="space-y-2">
              {TOP_CALCULATORS.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-[#1E3A8A] dark:hover:text-blue-400 transition-colors py-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A] dark:bg-blue-400 flex-shrink-0" />
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-[#25D366]/10 rounded-2xl border border-[#25D366]/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">💬</span>
              <h3 className="font-black text-[#1E293B] dark:text-white text-sm">
                قناة واتساب
              </h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              انضم لقناتنا للحصول على نصائح مالية وصحية مجاناً
            </p>
            <a
              href="https://whatsapp.com/channel/0029Vb7ip3mEquiKNFmf682L"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold py-2.5 rounded-xl transition-colors"
            >
              انضم الآن
            </a>
          </div>

          {/* Recent Posts (always newest-first) */}
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
            <h3 className="font-black text-[#1E293B] dark:text-white mb-4 text-sm">
              أحدث المقالات
            </h3>
            <ul className="space-y-3">
              {recentPosts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="text-sm text-gray-600 dark:text-gray-300 hover:text-[#1E3A8A] dark:hover:text-blue-400 transition-colors leading-snug line-clamp-2"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
