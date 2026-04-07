import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import BlogClient from "@/components/blog/BlogClient";
import { ALL_POSTS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "المدونة — نصائح مالية وصحية وعملية",
  description:
    "اقرأ أحدث مقالاتنا في المجالات المالية والصحية والعملية: حساب الزكاة، القروض، BMI، السعرات الحرارية وأكثر.",
  alternates: { canonical: "https://calculator.egypiana.com/blog" },
};

export default function BlogPage() {
  return (
    <>
      <Breadcrumb
        items={[{ label: "الرئيسية", href: "/" }, { label: "المدونة" }]}
      />
      <BlogClient allPosts={ALL_POSTS} />
    </>
  );
}
