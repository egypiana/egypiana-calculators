"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface GoogleAnalyticsProps {
  measurementId: string;
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", measurementId, {
        page_path: pathname,
      });
    }
  }, [pathname, measurementId]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

/**
 * Track calculator usage events.
 * Call this inside calculator components when a calculation is performed.
 *
 * Usage:
 *   trackCalculatorUsed('zakat', 'financial');
 */
export function trackCalculatorUsed(
  calculatorName: string,
  category: string
): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "calculator_used", {
      calculator_name: calculatorName,
      category: category,
      event_category: "Calculator",
      event_label: calculatorName,
    });
  }
}
