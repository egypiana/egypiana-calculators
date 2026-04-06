import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "المدونة — حاسبات إيجيبيانا",
  description: "مقالات ونصائح مالية وصحية",
};

export default function BlogPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "المدونة" },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#1E293B] dark:text-white mb-2 text-right">
          المدونة
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-12 text-right">
          مقالات ونصائح مالية وصحية وعملية
        </p>

        <div className="flex justify-center">
          <div
            className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-12 shadow-sm text-center max-w-md w-full"
            dir="rtl"
          >
            <div className="text-6xl mb-6">📰</div>
            <h2 className="text-2xl font-black text-[#1E293B] dark:text-white mb-3">
              قريباً
            </h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
              نعمل على إطلاق المدونة وسنقدم لك مقالات متخصصة في المجالات المالية
              والصحية والعملية قريباً.
            </p>
            <Link
              href="/"
              className="inline-block bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold px-8 py-3 rounded-xl transition-colors"
            >
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
