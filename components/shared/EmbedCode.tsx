"use client";

import { useState } from "react";
import { Code2, Copy, Check, ExternalLink } from "lucide-react";

interface EmbedCodeProps {
  url: string;   // full canonical URL of the calculator page (mandatory)
  title?: string;
  height?: number;
}

export default function EmbedCode({ url, title = "حاسبة", height = 700 }: EmbedCodeProps) {
  const [copied, setCopied] = useState(false);

  const embedCode = `<iframe\n  src="${url}"\n  width="100%"\n  height="${height}"\n  frameborder="0"\n  scrolling="auto"\n  style="border:1px solid #e5e7eb;border-radius:16px;overflow:hidden"\n  title="${title} — حاسبات إيجيبيانا"\n  loading="lazy"\n></iframe>\n<p style="text-align:center;font-size:13px;margin-top:6px">\n  بواسطة <a href="${url}" target="_blank" rel="noopener noreferrer">حاسبات إيجيبيانا</a>\n</p>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = embedCode;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-[#1E3A8A] dark:text-blue-400" />
          <h3 className="text-base font-bold text-[#1E293B] dark:text-white">
            أضف الحاسبة لموقعك
          </h3>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-[#1E3A8A] dark:text-blue-400 hover:underline"
        >
          <ExternalLink className="h-3 w-3" />
          فتح الصفحة
        </a>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        انسخ الكود أدناه والصقه في أي صفحة HTML لتضمين الحاسبة مباشرةً في موقعك.
      </p>

      <div className="relative">
        <pre
          dir="ltr"
          className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-xs text-gray-700 dark:text-gray-300 overflow-x-auto whitespace-pre font-mono leading-relaxed"
        >
          {embedCode}
        </pre>

        <button
          onClick={handleCopy}
          className="absolute top-3 left-3 flex items-center gap-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:border-[#1E3A8A] dark:hover:border-blue-400 text-gray-600 dark:text-gray-300 hover:text-[#1E3A8A] dark:hover:text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all shadow-sm"
          title="نسخ الكود"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-500" />
              <span className="text-green-500">تم النسخ!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              نسخ
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500 text-right">
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
