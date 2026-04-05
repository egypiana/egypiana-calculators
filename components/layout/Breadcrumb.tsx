import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `https://calculator.egypiana.com${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav
        aria-label="مسار التنقل"
        className="bg-white dark:bg-[#1E293B] border-b border-gray-100 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 py-2">
          <ol className="flex items-center gap-1 text-sm flex-wrap" dir="rtl">
            {items.map((item, index) => (
              <li key={index} className="flex items-center gap-1">
                {index > 0 && (
                  <ChevronLeft className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                )}
                {item.href && index < items.length - 1 ? (
                  <Link
                    href={item.href}
                    className="text-[#1E3A8A] dark:text-blue-400 hover:underline"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
