export { ALL_POSTS } from "./posts";
export type { BlogPost, BlogSection, BlogFAQ } from "./types";
import { ALL_POSTS } from "./posts";

export function getPostBySlug(slug: string) {
  return ALL_POSTS.find((p) => p.slug === slug) ?? null;
}

export function getRelatedPosts(slugs: string[]) {
  return slugs
    .map((s) => ALL_POSTS.find((p) => p.slug === s))
    .filter(Boolean) as (typeof ALL_POSTS)[number][];
}

export function getPostsByCategory(category: string) {
  return ALL_POSTS.filter((p) => p.category === category);
}

export function getPaginatedPosts(page: number, perPage = 10) {
  const start = (page - 1) * perPage;
  return {
    posts: ALL_POSTS.slice(start, start + perPage),
    total: ALL_POSTS.length,
    totalPages: Math.ceil(ALL_POSTS.length / perPage),
  };
}
