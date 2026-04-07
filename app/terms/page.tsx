import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "شروط الاستخدام — حاسبات إيجيبيانا",
  description: "شروط وأحكام استخدام موقع حاسبات إيجيبيانا. يرجى قراءتها قبل استخدام خدماتنا.",
  alternates: { canonical: "https://calculator.egypiana.com/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"شروط الاستخدام"}]} />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-black text-[#1E293B] dark:text-white mb-6 text-right">شروط الاستخدام</h1>
        <div className="prose prose-lg max-w-none text-right space-y-6 text-gray-700 dark:text-gray-300">
          <p>آخر تحديث: يناير 2026. باستخدام الموقع، فإنك توافق على هذه الشروط.</p>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] dark:text-white">١. طبيعة الخدمة</h2>
            <p>حاسبات إيجيبيانا يوفر أدوات حسابية للأغراض التعليمية والمرجعية فقط. النتائج المعروضة تقديرية وقد لا تعكس وضعك الفردي الدقيق.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] dark:text-white">٢. إخلاء المسؤولية</h2>
            <p>لا يُعدّ الموقع مستشاراً مالياً أو طبياً أو قانونياً. قبل اتخاذ أي قرارات مالية أو صحية أو قانونية، استشر متخصصاً مؤهلاً.</p>
            <p>الحسابات المتعلقة بالزكاة والمواريث مبنية على الآراء الفقهية الراجحة، ولمزيد من الدقة استشر عالماً شرعياً.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] dark:text-white">٣. الملكية الفكرية</h2>
            <p>جميع محتويات الموقع (تصميم، نصوص، كود) محمية بحقوق الملكية الفكرية لحاسبات إيجيبيانا. يُحظر نسخ أو إعادة نشر المحتوى دون إذن مسبق.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] dark:text-white">٤. حدود المسؤولية</h2>
            <p>لن يكون الموقع مسؤولاً عن أي خسائر أو أضرار ناتجة عن الاعتماد على نتائج الحاسبات. الاستخدام على مسؤوليتك الشخصية.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] dark:text-white">٥. التعديلات</h2>
            <p>نحتفظ بحق تعديل هذه الشروط في أي وقت. استمرارك في استخدام الموقع بعد النشر يعني موافقتك على التعديلات.</p>
          </section>
        </div>
      </div>
    </>
  );
}
