import Link from "next/link";
import { ALL_POSTS } from "@/lib/blog";

/* ── Seeded daily shuffle (same algo as sidebar FeaturedArticles) ── */
function seededRandom(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = Math.imul(1664525, s) + 1013904223;
    return (s >>> 0) / 0xffffffff;
  };
}

function getDailyPosts(count = 6) {
  const daySeed = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const rand = seededRandom(daySeed);
  return [...ALL_POSTS]
    .map((p) => ({ p, order: rand() }))
    .sort((a, b) => a.order - b.order)
    .slice(0, count)
    .map(({ p }) => p);
}

const CATEGORY_STYLES: Record<string, { badge: string; bar: string }> = {
  "مالي":    { badge: "bg-blue-100  dark:bg-blue-900/30  text-blue-700  dark:text-blue-300", bar: "bg-blue-500" },
  "صحي":     { badge: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300", bar: "bg-green-500" },
  "رياضيات": { badge: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300", bar: "bg-purple-500" },
  "أدوات":   { badge: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300", bar: "bg-orange-500" },
};

const FALLBACK = { badge: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300", bar: "bg-gray-400" };

export default function HomeFeaturedArticles() {
  const posts = getDailyPosts(6);

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900/50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📰</span>
            <div>
              <h2 className="text-2xl font-black text-[#1E293B] dark:text-white">
                من المدونة
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                مقالات مميزة تتجدد يومياً
              </p>
            </div>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-[#1E3A8A] dark:text-blue-400 hover:underline"
          >
            جميع المقالات
            <span aria-hidden>←</span>
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => {
            const style = CATEGORY_STYLES[post.category] ?? FALLBACK;
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md hover:border-[#1E3A8A] dark:hover:border-blue-500 transition-all flex flex-col"
              >
                {/* Coloured top bar */}
                <div className={`h-1.5 w-full ${style.bar}`} />

                <div className="p-5 flex flex-col flex-1">
                  {/* Category + read time */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${style.badge}`}>
                      {post.category}
                    </span>
                    <span className="text-[11px] text-gray-400 dark:text-gray-500">
                      {post.readingTime} دقائق قراءة
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-black text-[#1E293B] dark:text-white group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors leading-snug mb-2 line-clamp-2 text-sm">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Read more */}
                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xs font-bold text-[#1E3A8A] dark:text-blue-400 group-hover:underline">
                      اقرأ المزيد ←
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile "all articles" link */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-block text-sm font-bold text-[#1E3A8A] dark:text-blue-400 hover:underline"
          >
            تصفح جميع المقالات ←
          </Link>
        </div>

      </div>
    </section>
  );
}
