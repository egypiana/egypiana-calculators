"use client";

import { useState, useRef } from "react";
import { Code2, Copy, Check } from "lucide-react";

interface EmbedCodeProps {
  /** Full canonical URL of the calculator PAGE (used for attribution link) */
  url: string;
  title?: string;
  height?: number;
}

export default function EmbedCode({ url, title = "حاسبة", height = 650 }: EmbedCodeProps) {
  const [copied, setCopied] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);

  // Derive embed-only URL: https://calculator.egypiana.com/financial/loan
  // → https://calculator.egypiana.com/embed/financial/loan
  const embedSrc = url.replace(
    /(https?:\/\/[^/]+)(\/)/,
    "$1/embed$2"
  );

  const embedCode =
    `<iframe src="${embedSrc}" width="100%" height="${height}" frameborder="0" ` +
    `style="border:1px solid #e5e7eb;border-radius:12px" title="${title}" loading="lazy"></iframe>\n` +
    `<p style="text-align:center;font-size:12px;margin-top:4px">` +
    `بواسطة <a href="${url}" target="_blank" rel="noopener noreferrer">حاسبات إيجيبيانا</a></p>`;

  const handleCopy = () => {
    // Select the textarea first — most reliable cross-browser method
    if (taRef.current) {
      taRef.current.select();
      taRef.current.setSelectionRange(0, 99999); // mobile
    }

    // Try modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(embedCode)
        .then(() => showCopied())
        .catch(() => legacyCopy());
    } else {
      legacyCopy();
    }
  };

  const legacyCopy = () => {
    try {
      document.execCommand("copy");
      showCopied();
    } catch (_) { /* silent fail */ }
  };

  const showCopied = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Code2 className="h-4 w-4 text-[#1E3A8A] dark:text-blue-400 flex-shrink-0" />
          <span className="text-sm font-bold text-[#1E293B] dark:text-white">
            أضف الحاسبة لموقعك
          </span>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
            copied
              ? "border-green-400 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
              : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-[#1E3A8A] hover:text-[#1E3A8A] dark:hover:border-blue-400 dark:hover:text-blue-400 bg-white dark:bg-gray-800"
          }`}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "تم النسخ!" : "نسخ الكود"}
        </button>
      </div>

      {/* Textarea — visible, selectable, reliable copy source */}
      <textarea
        ref={taRef}
        readOnly
        value={embedCode}
        dir="ltr"
        rows={3}
        onClick={handleCopy}
        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-[11px] font-mono text-gray-700 dark:text-gray-300 resize-none focus:outline-none focus:border-[#1E3A8A] dark:focus:border-blue-400 cursor-pointer leading-relaxed"
        title="اضغط للنسخ"
      />

      {/* Attribution note */}
      <p className="text-[11px] text-gray-400 dark:text-gray-500 text-right leading-snug">
        * يُشترط الإبقاء على رابط المصدر:{" "}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1E3A8A] dark:text-blue-400 hover:underline break-all"
        >
          {url}
        </a>
      </p>
    </div>
  );
}
