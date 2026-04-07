import Link from "next/link";
import { ALL_POSTS } from "@/lib/blog";

/* ── Seeded shuffle — changes every day so pages show fresh articles ── */
function seededRandom(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = Math.imul(1664525, s) + 1013904223;
    return (s >>> 0) / 0xffffffff;
  };
}

function getDailyPosts(count = 5) {
  const daySeed = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const rand = seededRandom(daySeed);
  return [...ALL_POSTS]
    .map((p) => ({ p, order: rand() }))
    .sort((a, b) => a.order - b.order)
    .slice(0, count)
    .map(({ p }) => p);
}

const CATEGORY_STYLES: Record<string, string> = {
  "مالي":      "bg-blue-100  dark:bg-blue-900/30  text-blue-700  dark:text-blue-300",
  "صحي":       "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  "رياضيات":   "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
  "أدوات":     "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
};

export default function FeaturedArticles() {
  const posts = getDailyPosts(5);

  return (
    <section
      dir="rtl"
      className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-5"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">📰</span>
        <h3 className="font-black text-[#1E293B] dark:text-white text-sm">
          مقالات مميزة
        </h3>
      </div>

      {/* Article list */}
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-1 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl p-2 -mx-2 transition-colors"
            >
              <span className="text-sm font-semibold text-[#1E293B] dark:text-white group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                {post.title}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    CATEGORY_STYLES[post.category] ??
                    "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {post.category}
                </span>
                <span className="text-[11px] text-gray-400 dark:text-gray-500">
                  {post.readingTime} دقائق قراءة
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer link */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <Link
          href="/blog"
          className="text-xs font-bold text-[#1E3A8A] dark:text-blue-400 hover:underline"
        >
          تصفح جميع المقالات ←
        </Link>
      </div>
    </section>
  );
}
