import type { CalcSEOData } from "@/lib/calc-seo";

interface Props {
  data: CalcSEOData;
}

export default function CalcSEOContent({ data }: Props) {
  if (!data?.sections?.length) return null;

  return (
    <div className="space-y-6" dir="rtl">
      {data.sections.map((section, i) => (
        <section
          key={i}
          className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-6"
        >
          <h2 className="text-xl font-bold text-[#1E293B] dark:text-white mb-3">
            {section.heading}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]">
            {section.body}
          </p>
        </section>
      ))}
    </div>
  );
}
