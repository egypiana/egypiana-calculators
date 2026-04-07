/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async headers() {
    return [
      /* ─────────────────────────────────────────────
         ALL ROUTES — security headers
      ───────────────────────────────────────────── */
      {
        source: "/(.*)",
        headers: [
          // Prevent MIME-type sniffing attacks
          { key: "X-Content-Type-Options",       value: "nosniff" },
          // Legacy XSS protection (belt-and-suspenders)
          { key: "X-XSS-Protection",             value: "1; mode=block" },
          // Control how much referrer info is sent
          { key: "Referrer-Policy",              value: "strict-origin-when-cross-origin" },
          // Allow embedding from any origin (required for /embed/* calculator feature)
          { key: "Content-Security-Policy",      value: "frame-ancestors *" },
          // Enforce HTTPS for 2 years — prevent protocol-downgrade attacks
          { key: "Strict-Transport-Security",    value: "max-age=63072000; includeSubDomains; preload" },
          // Restrict dangerous browser features not needed on a calculator site
          { key: "Permissions-Policy",           value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
          // Allow DNS prefetch for performance
          { key: "X-DNS-Prefetch-Control",       value: "on" },
        ],
      },

      /* ─────────────────────────────────────────────
         IMMUTABLE STATIC ASSETS — aggressive caching
         Next.js hashes filenames so safe to cache forever
      ───────────────────────────────────────────── */
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },

      /* ─────────────────────────────────────────────
         PUBLIC STATIC FILES — 1 week cache
      ───────────────────────────────────────────── */
      {
        source: "/(favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|otf))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },

      /* ─────────────────────────────────────────────
         RSS FEED — cache 1 hour, stale for 24h
      ───────────────────────────────────────────── */
      {
        source: "/rss.xml",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
