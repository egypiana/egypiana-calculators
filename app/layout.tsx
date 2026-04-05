import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://calculator.egypiana.com"),
  title: {
    default: "حاسبات إيجيبيانا — أفضل الحاسبات العربية المجانية",
    template: "%s | حاسبات إيجيبيانا",
  },
  description:
    "أفضل وأدق الحاسبات العربية المجانية على الإنترنت: حاسبة الزكاة، حاسبة القرض، حاسبة BMI، الآلة الحاسبة، حاسبة العمر، حاسبة الميراث وأكثر من 40 حاسبة مجانية.",
  keywords: [
    "حاسبة",
    "آلة حاسبة",
    "حاسبة اون لاين",
    "حاسبة عربية",
    "حاسبة الزكاة",
    "حاسبة القرض",
    "حاسبة BMI",
    "حاسبة العمر",
    "حاسبة الميراث",
    "التاريخ الهجري",
    "calculator",
    "arabic calculator",
  ],
  authors: [{ name: "حاسبات إيجيبيانا" }],
  creator: "حاسبات إيجيبيانا",
  publisher: "إيجيبيانا",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    alternateLocale: "en_US",
    url: "https://calculator.egypiana.com",
    siteName: "حاسبات إيجيبيانا",
    title: "حاسبات إيجيبيانا — أفضل الحاسبات العربية المجانية",
    description:
      "أفضل وأدق الحاسبات العربية المجانية: حاسبة الزكاة، حاسبة القرض، حاسبة BMI، الآلة الحاسبة والمزيد.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "حاسبات إيجيبيانا",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "حاسبات إيجيبيانا — أفضل الحاسبات العربية المجانية",
    description: "أفضل وأدق الحاسبات العربية المجانية على الإنترنت",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://calculator.egypiana.com",
    languages: {
      ar: "https://calculator.egypiana.com",
      en: "https://calculator.egypiana.com/en",
    },
  },
  verification: {
    // google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Google Fonts — Cairo */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* ═══════════════════════════════════════════
            GOOGLE ANALYTICS 4 — PASTE YOUR ID HERE
            Replace G-XXXXXXXXXX with your Measurement ID
            ═══════════════════════════════════════════ */}
        {/*
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        */}
        {/* ═══════════════════════════════════════════
            GOOGLE ADSENSE AUTO ADS — PASTE YOUR CODE
            Replace ca-pub-XXXXXXXXXXXXXXXX with your Publisher ID
            ═══════════════════════════════════════════ */}
        {/*
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
        */}

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-cairo antialiased bg-background min-h-screen flex flex-col">
        <ThemeProvider>
          {/* GA4 Component (loads after page interactive) */}
          {/* <GoogleAnalytics measurementId="G-XXXXXXXXXX" /> */}

          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
