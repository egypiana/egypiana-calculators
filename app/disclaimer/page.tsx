import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "إخلاء المسؤولية — حاسبات إيجيبيانا",
  description: "إخلاء مسؤولية حاسبات إيجيبيانا. نتائج الحاسبات للأغراض المرجعية فقط وليست استشارة متخصصة.",
  alternates: { canonical: "https://calculator.egypiana.com/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <>
      <Breadcrumb items={[{label:"الرئيسية",href:"/"},{label:"إخلاء المسؤولية"}]} />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-black text-[#1E293B] dark:text-white mb-6 text-right">إخلاء المسؤولية</h1>
        <div className="prose prose-lg max-w-none text-right space-y-6 text-gray-700 dark:text-gray-300">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-4">
            <p className="font-bold text-amber-800 dark:text-amber-300">⚠️ تنبيه مهم: نتائج الحاسبات للأغراض التعليمية والمرجعية فقط، وليست بديلاً عن الاستشارة المتخصصة.</p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] dark:text-white">الحاسبات المالية</h2>
            <p>نتائج حاسبات الراتب والضرائب والزكاة والقروض تقريبية. الأنظمة الضريبية والتأمينية تتغير، وقد تختلف نتائج الحاسبة عن الواقع الفعلي. استشر محاسباً أو متخصصاً مالياً لقرارات مالية مهمة.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] dark:text-white">الحاسبات الصحية</h2>
            <p>نتائج BMI والسعرات الحرارية والوزن المثالي هي تقديرات إحصائية. لا تعكس حالتك الصحية الفردية الكاملة. استشر طبيباً أو أخصائي تغذية قبل اتخاذ قرارات تتعلق بنظامك الغذائي أو صحتك.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] dark:text-white">حاسبة الحمل</h2>
            <p>موعد الولادة المحسوب تقديري بناءً على متوسط 280 يوماً. الموجات فوق الصوتية (السونار) أكثر دقة. استشري طبيبك لتأكيد موعد الولادة وتتبع الحمل.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] dark:text-white">حاسبة المواريث</h2>
            <p>الحسابات مبنية على أحكام الفقه الإسلامي الراجحة. قد تختلف التفاصيل باختلاف المذاهب والظروف. للحصول على حكم قانوني ملزم، استشر محكمة مختصة أو عالماً شرعياً.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] dark:text-white">محول العملات</h2>
            <p>أسعار الصرف المعروضة تقريبية ولا تُحدَّث لحظياً. للمعاملات المالية الفعلية، استخدم الأسعار الرسمية من البنوك أو منصات التداول المرخصة.</p>
          </section>
        </div>
      </div>
    </>
  );
}
