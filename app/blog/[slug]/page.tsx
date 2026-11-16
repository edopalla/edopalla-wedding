import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Page } from "@/components/page";
import { PhotoFrame } from "@/components/photo-frame";
import { PostText } from "@/components/rich-text";
import { findPost, nextPost, postHref, posts } from "@/content/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

async function postFrom(params: PageProps<"/blog/[slug]">["params"]) {
  const post = findPost((await params).slug);
  if (!post) notFound();
  return post;
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await postFrom(params);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.cover.src], type: "article", publishedTime: post.publishedAt },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = await postFrom(params);
  const next = nextPost(post);

  return (
    <Page title={post.title}>
      <PhotoFrame
        photo={post.cover}
        shape="landscape"
        sizes="100vw"
        className="col-span-12 mb-(--heading-gap)"
      />
      <PostText value={post.body} />
      <nav
        aria-label="Posts"
        className="col-span-12 mt-(--section) flex justify-between gap-6 font-display text-display-sm"
      >
        <Link href="/blog" className="link-underline">
          All posts
        </Link>
        <Link href={postHref(next)} className="link-underline">
          Next post
        </Link>
      </nav>
    </Page>
  );
}
