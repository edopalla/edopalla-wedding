import { cms, type Post } from "./cms";

export type { Post };

export const posts = cms.posts;

export function postHref(post: Post) {
  return `/blog/${post.slug}`;
}

export function findPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function nextPost(post: Post) {
  return posts[(posts.indexOf(post) + 1) % posts.length];
}
