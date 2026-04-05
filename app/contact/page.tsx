import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "اتصل بنا — حاسبات إيجيبيانا",
  description: "تواصل مع فريق حاسبات إيجيبيانا لأي استفسارات أو اقتراحات أو الإبلاغ عن مشكلة.",
  alternates: { canonical: "https://calculator.egypiana.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"اتصل بنا"}]} />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-black text-[#1E293B] dark:text-white mb-2 text-right">اتصل بنا</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-right">نُسعد بسماع آرائك واقتراحاتك</p>

        <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">الاسم</label>
            <input type="text"
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
              placeholder="اسمك الكريم" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">البريد الإلكتروني</label>
            <input type="email"
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white"
              placeholder="email@example.com" dir="ltr" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">الموضوع</label>
            <select className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white">
              <option>اقتراح حاسبة جديدة</option>
              <option>الإبلاغ عن خطأ</option>
              <option>استفسار عام</option>
              <option>تعاون وإعلانات</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1E293B] dark:text-gray-200 mb-1.5">الرسالة</label>
            <textarea rows={5}
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-right focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white dark:bg-gray-800 text-[#1E293B] dark:text-white resize-none"
              placeholder="اكتب رسالتك هنا..." />
          </div>
          <button className="w-full bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-bold py-3 rounded-xl transition-colors">
            إرسال الرسالة
          </button>
        </div>

        <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-xl p-5 text-right">
          <h2 className="font-bold text-[#1E293B] dark:text-white mb-3">طرق التواصل الأخرى</h2>
          <div className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
            <p>📧 البريد الإلكتروني: <span className="text-[#1E3A8A]">info@egypiana.com</span></p>
            <p>🐦 تويتر: <span className="text-[#1E3A8A]">@egypiana</span></p>
            <p>⏰ وقت الرد المعتاد: خلال 24-48 ساعة</p>
          </div>
        </div>
      </div>
    </>
  );
}
