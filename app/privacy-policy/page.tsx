import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "سياسة الخصوصية — حاسبات إيجيبيانا",
  description: "سياسة خصوصية موقع حاسبات إيجيبيانا. تعرف على كيفية جمع واستخدام وحماية بياناتك.",
  alternates: { canonical: "https://calculator.egypiana.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"سياسة الخصوصية"}]} />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-black text-[#1E293B] dark:text-white mb-6 text-right">سياسة الخصوصية</h1>
        <div className="prose prose-lg max-w-none text-right space-y-6 text-gray-700 dark:text-gray-300">
          <p>آخر تحديث: يناير 2026</p>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] dark:text-white">١. المعلومات التي نجمعها</h2>
            <p>لا نجمع أي معلومات شخصية مباشرةً. جميع حسابات الموقع تتم محلياً في متصفحك دون إرسال بياناتك لخوادمنا.</p>
            <p>نستخدم <strong>Google Analytics 4</strong> لتتبع إحصاءات الزيارات بشكل مجهول الهوية، بما يشمل: عدد الزوار، الصفحات المزارة، المتصفح والجهاز المستخدم.</p>
            <p>نعرض إعلانات <strong>Google AdSense</strong> التي قد تستخدم ملفات تعريف الارتباط (Cookies) لتخصيص الإعلانات.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] dark:text-white">٢. ملفات تعريف الارتباط (Cookies)</h2>
            <p>نستخدم Cookies للأغراض التالية:</p>
            <ul className="list-disc list-inside space-y-1 mr-4">
              <li>تذكر تفضيلات المظهر (فاتح/داكن)</li>
              <li>إحصاءات الزيارات عبر Google Analytics</li>
              <li>الإعلانات المخصصة عبر Google AdSense</li>
            </ul>
            <p>يمكنك تعطيل Cookies من إعدادات متصفحك في أي وقت.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] dark:text-white">٣. كيفية استخدام المعلومات</h2>
            <p>البيانات المجمعة تُستخدم فقط لتحسين تجربة المستخدم وفهم كيفية استخدام الموقع. لا نبيع أي بيانات لأطراف ثالثة.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] dark:text-white">٤. خدمات الطرف الثالث</h2>
            <p>يخضع استخدام Google Analytics وGoogle AdSense لسياسة خصوصية Google. يمكنك الاطلاع عليها على موقع Google.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] dark:text-white">٥. أمان البيانات</h2>
            <p>نحرص على حماية بياناتك باستخدام بروتوكول HTTPS. جميع الاتصالات مع موقعنا مشفرة.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] dark:text-white">٦. التواصل معنا</h2>
            <p>لأي استفسارات حول سياسة الخصوصية، يرجى التواصل عبر صفحة <a href="/contact" className="text-[#1E3A8A] hover:underline">اتصل بنا</a>.</p>
          </section>
        </div>
      </div>
    </>
  );
}
