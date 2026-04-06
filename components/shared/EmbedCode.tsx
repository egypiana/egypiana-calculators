"use client";

import { useState } from "react";
import { Code2, Copy, Check } from "lucide-react";

interface EmbedCodeProps {
  url: string;
  title?: string;
  height?: number;
}

export default function EmbedCode({ url, title = "حاسبة", height = 650 }: EmbedCodeProps) {
  const [copied, setCopied] = useState(false);

  const embedCode =
    `<iframe src="${url}" width="100%" height="${height}" frameborder="0" style="border:1px solid #e5e7eb;border-radius:12px" title="${title}" loading="lazy"></iframe>\n` +
    `<p style="text-align:center;font-size:12px;margin-top:4px">بواسطة <a href="${url}" target="_blank" rel="noopener noreferrer">حاسبات إيجيبيانا</a></p>`;

  const handleCopy = () => {
    if (typeof window === "undefined") return;
    // Modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(embedCode).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => fallbackCopy());
    } else {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    const ta = document.createElement("textarea");
    ta.value = embedCode;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) { /* silent */ }
    document.body.removeChild(ta);
  };

  return (
    <div className="space-y-2">
      {/* Header row */}
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

      {/* Code block */}
      <div
        dir="ltr"
        className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-[11px] font-mono text-gray-700 dark:text-gray-300 overflow-x-auto whitespace-pre leading-relaxed select-all cursor-text"
        onClick={handleCopy}
        title="اضغط للنسخ"
      >
        {embedCode}
      </div>

      {/* Source link note */}
      <p className="text-[11px] text-gray-400 dark:text-gray-500 text-right leading-snug">
        يُشترط الإبقاء على رابط المصدر:{" "}
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
