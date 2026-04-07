import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ContactForm from "@/components/shared/ContactForm";

export const metadata: Metadata = {
  title: "اتصل بنا — حاسبات إيجيبيانا",
  description: "تواصل مع فريق حاسبات إيجيبيانا لأي استفسارات أو اقتراحات أو الإبلاغ عن مشكلة.",
  alternates: { canonical: "https://calculator.egypiana.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "اتصل بنا" },
        ]}
      />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-black text-[#1E293B] dark:text-white mb-2 text-right">
          اتصل بنا
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">
          نُسعد بسماع آرائك واقتراحاتك
        </p>

        {/* Client component — handles validation + mailto submission */}
        <ContactForm />

        <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-xl p-5 text-right" dir="rtl">
          <h2 className="font-bold text-[#1E293B] dark:text-white mb-3">طرق التواصل الأخرى</h2>
          <div className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
            <p>
              📧 البريد الإلكتروني:{" "}
              <a
                href="mailto:info@egypiana.com"
                className="text-[#1E3A8A] dark:text-blue-400 hover:underline"
              >
                info@egypiana.com
              </a>
            </p>
            <p>
              🐦 تويتر:{" "}
              <a
                href="https://x.com/egypiana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1E3A8A] dark:text-blue-400 hover:underline"
              >
                @egypiana
              </a>
            </p>
            <p>⏰ وقت الرد المعتاد: خلال 24–48 ساعة</p>
          </div>
        </div>
      </div>
    </>
  );
}
