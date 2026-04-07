import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ALL_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "المدونة — نصائح مالية وصحية وعملية",
  description:
    "اقرأ أحدث مقالاتنا في المجالات المالية والصحية والعملية: حساب الزكاة، القروض، BMI، السعرات الحرارية وأكثر.",
  alternates: { canonical: "https://calculator.egypiana.com/blog" },
};

const CATEGORIES = ["الكل", "مالي", "صحي", "رياضيات", "أدوات"];

const TOP_CALCULATORS = [
  { label: "حاسبة الزكاة", href: "/financial/zakat" },
  { label: "حاسبة القرض", href: "/financial/loan" },
  { label: "حاسبة BMI", href: "/health/bmi" },
  { label: "السعرات الحرارية", href: "/health/calories" },
  { label: "حاسبة الراتب", href: "/financial/salary" },
  { label: "حاسبة الميراث", href: "/tools/inheritance" },
];

export default function BlogPage({
  searchParams,
}: {
  searchParams?: { page?: string; cat?: string };
}) {
  const page = Math.max(1, Number(searchParams?.page ?? 1));
  const cat = searchParams?.cat ?? "الكل";
  const PER_PAGE = 10;

  const filtered =
    cat === "الكل" ? ALL_POSTS : ALL_POSTS.filter((p) => p.category === cat);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const posts = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <Breadcrumb
        items={[{ label: "الرئيسية", href: "/" }, { label: "المدونة" }]}
      />

      <div className="max-w-7xl mx-auto px-4 py-8" dir="rtl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2">
            المدونة
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            مقالات ونصائح مالية وصحية وعملية
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              href={`/blog?cat=${c}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                cat === c
                  ? "bg-[#1E3A8A] text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-[#1E3A8A]/10"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>

        <div className="flex gap-8 items-start">
          {/* Posts Grid */}
          <div className="flex-1 min-w-0">
            {posts.length === 0 ? (
              <p className="text-gray-400 text-center py-16">لا توجد مقالات في هذه الفئة حالياً.</p>
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
                      style={{ backgroundColor: post.color + "18", color: post.color }}
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
                        <span>{new Date(post.date).toLocaleDateString("ar-EG", { year: "numeric", month: "short", day: "numeric" })}</span>
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
                  <Link
                    key={p}
                    href={`/blog?page=${p}&cat=${cat}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-colors ${
                      p === page
                        ? "bg-[#1E3A8A] text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-[#1E3A8A]/10"
                    }`}
                  >
                    {p}
                  </Link>
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

            {/* Recent Posts */}
            <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm">
              <h3 className="font-black text-[#1E293B] dark:text-white mb-4 text-sm">
                أحدث المقالات
              </h3>
              <ul className="space-y-3">
                {ALL_POSTS.slice(0, 5).map((p) => (
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
    </>
  );
}
