import { MetadataRoute } from "next";
import { ALL_POSTS } from "@/lib/blog";

const BASE_URL = "https://calculator.egypiana.com";

export default function sitemap(): MetadataRoute.Sitemap {
  /* ──────────────────────────────────────────────────────────
     STATIC PAGES
     Using real static dates — don't lie to Google by marking
     every page as "modified today" on every build.
  ────────────────────────────────────────────────────────── */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: "2026-03-01",
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/calculators`,
      lastModified: "2026-03-01",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: "2026-03-01",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/financial`,
      lastModified: "2026-03-01",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/health`,
      lastModified: "2026-03-01",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/math`,
      lastModified: "2026-03-01",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: "2026-03-01",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: "2026-01-01",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: "2026-01-01",
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: "2026-01-01",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: "2026-01-01",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/disclaimer`,
      lastModified: "2026-01-01",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  /* ──────────────────────────────────────────────────────────
     CALCULATOR PAGES
     ⚠️  Only EXISTING routes — removed planned/future routes
     that return 404 (gold-zakat, menstrual-cycle, fractions,
     statistics, equation, matrix, hours, subnet)
  ────────────────────────────────────────────────────────── */
  const calculatorPaths: string[] = [
    // Financial (9 existing pages)
    "/financial/zakat",
    "/financial/loan",
    "/financial/end-of-service",
    "/financial/vat",
    "/financial/mortgage",
    "/financial/currency",
    "/financial/salary",
    "/financial/compound-interest",
    "/financial/tafqeet",

    // Health (6 existing pages)
    "/health/bmi",
    "/health/calories",
    "/health/pregnancy",
    "/health/ideal-weight",
    "/health/water-intake",
    "/health/bmr",

    // Math (3 existing pages)
    "/math/calculator",
    "/math/scientific",
    "/math/percentage",

    // Tools (11 existing pages)
    "/tools/age",
    "/tools/hijri-date",
    "/tools/time",
    "/tools/gpa",
    "/tools/grade",
    "/tools/concrete",
    "/tools/area",
    "/tools/fuel",
    "/tools/password",
    "/tools/unit-converter",
    "/tools/inheritance",
  ];

  const calculatorPages: MetadataRoute.Sitemap = calculatorPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: "2026-03-01",
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  /* ──────────────────────────────────────────────────────────
     BLOG POSTS
     Generated from actual data — uses each post's real date
  ────────────────────────────────────────────────────────── */
  const blogPosts: MetadataRoute.Sitemap = ALL_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${encodeURIComponent(post.slug)}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...calculatorPages, ...blogPosts];
}
