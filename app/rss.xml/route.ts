import { ALL_POSTS } from "@/lib/blog";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = "https://calculator.egypiana.com";

  const items = ALL_POSTS.map(
    (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${encodeURIComponent(post.slug)}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${encodeURIComponent(post.slug)}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category><![CDATA[${post.category}]]></category>
      <author><![CDATA[${post.author}]]></author>
    </item>`
  ).join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
>
  <channel>
    <title><![CDATA[حاسبات إيجيبيانا — المدونة]]></title>
    <link>${baseUrl}</link>
    <description><![CDATA[مقالات ونصائح مالية وصحية وعملية من حاسبات إيجيبيانا — أكثر من 40 حاسبة مجانية]]></description>
    <language>ar</language>
    <copyright>© 2026 حاسبات إيجيبيانا</copyright>
    <managingEditor>info@egypiana.com</managingEditor>
    <webMaster>info@egypiana.com</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/og-image.png</url>
      <title>حاسبات إيجيبيانا</title>
      <link>${baseUrl}</link>
    </image>
${items}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
