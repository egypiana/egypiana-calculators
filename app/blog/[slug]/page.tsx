import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { getPostBySlug, getRelatedPosts, ALL_POSTS } from "@/lib/blog";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(decodeURIComponent(params.slug));
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `https://calculator.egypiana.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://calculator.egypiana.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export function generateStaticParams() {
  return ALL_POSTS.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(decodeURIComponent(params.slug));
  if (!post) notFound();

  const related = getRelatedPosts(post.relatedSlugs);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: { "@type": "Organization", name: post.author },
    datePublished: post.date,
    publisher: {
      "@type": "Organization",
      name: "حاسبات إيجيبيانا",
      url: "https://calculator.egypiana.com",
    },
  };

  const TOP_CALCULATORS = [
    { label: "حاسبة الزكاة", href: "/financial/zakat" },
    { label: "حاسبة القرض", href: "/financial/loan" },
    { label: "حاسبة BMI", href: "/health/bmi" },
    { label: "السعرات الحرارية", href: "/health/calories" },
    { label: "حاسبة الميراث", href: "/tools/inheritance" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "المدونة", href: "/blog" },
          { label: post.title },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 py-8" dir="rtl">
        <div className="flex gap-8 items-start">
          {/* Article */}
          <article className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-8">
              <span
                className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
                style={{ backgroundColor: post.color + "18", color: post.color }}
              >
                {post.category}
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-[#1E293B] dark:text-white leading-snug mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 dark:text-gray-500">
                <span>{post.author}</span>
                <span>•</span>
                <span>
                  {new Date(post.date).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>•</span>
                <span>{post.readingTime} دقائق قراءة</span>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              {post.sections.map((section, i) => {
                /* CTA Block */
                if (section.isCTA) {
                  const path = section.content[1]?.replace("button:", "") ?? post.ctaPath;
                  return (
                    <div
                      key={i}
                      className="bg-[#1E3A8A] text-white rounded-2xl p-6 text-center shadow-md"
                    >
                      <p className="text-lg font-black mb-4">{section.content[0]}</p>
                      <Link
                        href={path}
                        className="inline-block bg-white text-[#1E3A8A] font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
                      >
                        {post.ctaLabel}
                      </Link>
                    </div>
                  );
                }

                /* WhatsApp Block */
                if (section.isWhatsApp) {
                  return (
                    <div
                      key={i}
                      className="bg-[#25D366]/10 border border-[#25D366]/20 rounded-2xl p-5 flex items-center gap-4"
                    >
                      <span className="text-3xl">💬</span>
                      <div className="flex-1">
                        <p className="font-bold text-[#1E293B] dark:text-white text-sm mb-2">
                          {section.content[0]}
                        </p>
                        <a
                          href={section.content[1]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                        >
                          انضم الآن
                        </a>
                      </div>
                    </div>
                  );
                }

                /* Ad Block */
                if (section.isAd) {
                  return (
                    <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center text-xs text-gray-400">
                      إعلان
                    </div>
                  );
                }

                /* Normal Section */
                return (
                  <div key={i} className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
                    {section.heading && (
                      <h2 className="text-xl font-black text-[#1E293B] dark:text-white mb-4">
                        {section.heading}
                      </h2>
                    )}
                    <div className="space-y-3">
                      {section.content.map((para, j) => (
                        <p key={j} className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* FAQ Section */}
            {post.faqs.length > 0 && (
              <div className="mt-8 bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
                <h2 className="text-xl font-black text-[#1E293B] dark:text-white mb-6">
                  الأسئلة الشائعة
                </h2>
                <div className="space-y-4">
                  {post.faqs.map((faq, i) => (
                    <div key={i} className="border-b border-gray-100 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
                      <h3 className="font-bold text-[#1E293B] dark:text-white mb-2 text-sm">
                        {faq.q}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Articles */}
            {related.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-black text-[#1E293B] dark:text-white mb-4">
                  مقالات ذات صلة
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {related.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/blog/${rel.slug}`}
                      className="bg-white dark:bg-[#1E293B] rounded-xl border border-gray-100 dark:border-gray-700 p-4 hover:border-[#1E3A8A]/30 hover:shadow-md transition-all group"
                    >
                      <span
                        className="inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-2"
                        style={{ backgroundColor: rel.color + "18", color: rel.color }}
                      >
                        {rel.category}
                      </span>
                      <h3 className="text-sm font-bold text-[#1E293B] dark:text-white leading-snug group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-2">{rel.readingTime} دقائق</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0 space-y-6 sticky top-4">
            {/* CTA Calculator */}
            <div
              className="rounded-2xl p-5 text-white shadow-md"
              style={{ backgroundColor: post.color }}
            >
              <p className="font-black mb-3 text-sm">{post.title.replace("كيفية حساب ", "جرّب: ")}</p>
              <Link
                href={post.ctaPath}
                className="block text-center bg-white font-bold text-sm py-2.5 rounded-xl hover:bg-opacity-90 transition-colors"
                style={{ color: post.color }}
              >
                {post.ctaLabel}
              </Link>
            </div>

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

            {/* WhatsApp */}
            <div className="bg-[#25D366]/10 rounded-2xl border border-[#25D366]/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💬</span>
                <h3 className="font-black text-[#1E293B] dark:text-white text-sm">
                  قناة واتساب
                </h3>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                نصائح مالية وصحية مجاناً
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
          </aside>
        </div>
      </div>
    </>
  );
}
