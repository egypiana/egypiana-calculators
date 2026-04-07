export interface BlogFAQ {
  q: string;
  a: string;
}

export interface BlogSection {
  heading?: string;
  content: string[];
  isCTA?: boolean;
  isWhatsApp?: boolean;
  isAd?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: number;
  author: string;
  category: string;
  color: string;
  excerpt: string;
  keywords: string[];
  ctaPath: string;
  ctaLabel: string;
  relatedSlugs: string[];
  faqs: BlogFAQ[];
  sections: BlogSection[];
}
