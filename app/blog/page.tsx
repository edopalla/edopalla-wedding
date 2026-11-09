import Link from "next/link";
import type { Metadata } from "next";
import { Page } from "@/components/page";
import { PhotoFrame } from "@/components/photo-frame";
import { postHref, posts } from "@/content/posts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Guides and stories about eloping and getting married in ${site.city}.`,
};

export default function BlogPage() {
  return (
    <Page title="Blog">
      <ul className="col-span-12 grid gap-x-(--gutter) gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={postHref(post)} className="flex flex-col gap-3">
              <PhotoFrame
                photo={post.cover}
                shape="landscape"
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                className="mb-2"
              />
              <h2 className="font-display text-display-sm text-balance">
                <span className="link-underline">{post.title}</span>
              </h2>
              <p className="text-pretty">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
}
