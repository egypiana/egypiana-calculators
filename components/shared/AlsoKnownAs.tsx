interface Props {
  keywords: string[];
  label?: string;
}

/**
 * Renders a visible "also known as" row with common spelling variants.
 * Visible to users and crawlers — NOT hidden text (safe for SEO).
 */
export default function AlsoKnownAs({
  keywords,
  label = "يُعرف أيضاً بـ",
}: Props) {
  if (!keywords?.length) return null;

  // Show up to 12 variants, skip pure-English ones that duplicate the title
  const display = keywords.slice(0, 12);

  return (
    <section
      dir="rtl"
      className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 px-5 py-4"
      aria-label={label}
    >
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
        <span className="font-semibold text-gray-700 dark:text-gray-300 ml-1">
          {label}:
        </span>{" "}
        {display.join(" ، ")}
      </p>
    </section>
  );
}
