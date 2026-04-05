import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface RelatedCalculator {
  label: string;
  href: string;
  icon: string;
  description?: string;
}

interface RelatedCalculatorsProps {
  calculators: RelatedCalculator[];
}

export default function RelatedCalculators({ calculators }: RelatedCalculatorsProps) {
  return (
    <div className="bg-white dark:bg-[#1E293B] rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
      <h3 className="font-bold text-[#1E293B] dark:text-white text-base mb-4 pb-3 border-b border-gray-100 dark:border-gray-700">
        حاسبات ذات صلة
      </h3>
      <ul className="space-y-2">
        {calculators.map((calc) => (
          <li key={calc.href}>
            <Link
              href={calc.href}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors group"
            >
              <span className="text-xl flex-shrink-0">{calc.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-[#1E293B] dark:text-white group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 transition-colors">
                  {calc.label}
                </p>
                {calc.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {calc.description}
                  </p>
                )}
              </div>
              <ArrowLeft className="h-4 w-4 text-gray-400 group-hover:text-[#1E3A8A] dark:group-hover:text-blue-400 flex-shrink-0 transition-colors" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
