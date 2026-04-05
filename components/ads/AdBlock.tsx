"use client";

import { useEffect, useRef } from "react";

type AdFormat = "auto" | "rectangle" | "leaderboard" | "half-page" | "mobile-banner";

interface AdBlockProps {
  slot?: string;
  format?: AdFormat;
  className?: string;
  publisherId?: string;
}

const formatDimensions: Record<AdFormat, { width: number | string; height: number }> = {
  auto: { width: "100%", height: 90 },
  rectangle: { width: 300, height: 250 },
  leaderboard: { width: 728, height: 90 },
  "half-page": { width: 300, height: 600 },
  "mobile-banner": { width: 320, height: 50 },
};

const formatLabels: Record<AdFormat, string> = {
  auto: "إعلان",
  rectangle: "إعلان 300×250",
  leaderboard: "إعلان 728×90",
  "half-page": "إعلان 300×600",
  "mobile-banner": "إعلان 320×50",
};

export default function AdBlock({
  slot,
  format = "auto",
  className = "",
  publisherId,
}: AdBlockProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isDev = process.env.NODE_ENV === "development";
  const dimensions = formatDimensions[format];
  const hasAdSense = !!slot && !!publisherId;

  useEffect(() => {
    if (!isDev && hasAdSense && adRef.current) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // AdSense not loaded yet
      }
    }
  }, [isDev, hasAdSense]);

  // ── Development placeholder ──────────────────────────────────
  if (isDev || !hasAdSense) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-400 dark:text-gray-500 text-sm font-medium ${className}`}
        style={{
          width: typeof dimensions.width === "number" ? `${dimensions.width}px` : dimensions.width,
          height: `${dimensions.height}px`,
          maxWidth: "100%",
          margin: "0 auto",
        }}
        role="complementary"
        aria-label="مكان الإعلان"
      >
        <span>{formatLabels[format]}</span>
      </div>
    );
  }

  // ── Production AdSense unit ──────────────────────────────────
  return (
    <div
      className={`text-center ${className}`}
      style={{ maxWidth: "100%", overflow: "hidden" }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: "block",
          width: typeof dimensions.width === "number" ? `${dimensions.width}px` : dimensions.width,
          height: `${dimensions.height}px`,
        }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format === "auto" ? "auto" : undefined}
        data-full-width-responsive={format === "auto" ? "true" : undefined}
      />
    </div>
  );
}
