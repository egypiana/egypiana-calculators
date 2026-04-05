import { MetadataRoute } from "next";

const BASE_URL = "https://calculator.egypiana.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages = [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${BASE_URL}/calculators`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/financial`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/health`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/math`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/tools`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE_URL}/disclaimer`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const financialCalculators = [
    "/financial/zakat",
    "/financial/loan",
    "/financial/end-of-service",
    "/financial/vat",
    "/financial/mortgage",
    "/financial/currency",
    "/financial/salary",
    "/financial/gold-zakat",
    "/financial/compound-interest",
    "/financial/tafqeet",
  ];

  const healthCalculators = [
    "/health/bmi",
    "/health/calories",
    "/health/pregnancy",
    "/health/menstrual-cycle",
    "/health/ideal-weight",
    "/health/water-intake",
    "/health/bmr",
  ];

  const mathCalculators = [
    "/math/calculator",
    "/math/scientific",
    "/math/percentage",
    "/math/fractions",
    "/math/statistics",
    "/math/equation",
    "/math/matrix",
  ];

  const toolCalculators = [
    "/tools/age",
    "/tools/hijri-date",
    "/tools/time",
    "/tools/hours",
    "/tools/gpa",
    "/tools/grade",
    "/tools/concrete",
    "/tools/area",
    "/tools/fuel",
    "/tools/password",
    "/tools/subnet",
    "/tools/unit-converter",
    "/tools/inheritance",
  ];

  const allCalculators = [
    ...financialCalculators,
    ...healthCalculators,
    ...mathCalculators,
    ...toolCalculators,
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...allCalculators];
}
