import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Page } from "@/components/page";
import { PhotoFrame } from "@/components/photo-frame";
import { PhotoRow } from "@/components/photo-row";
import { findPost, nextPost, postHref, posts, type Block } from "@/content/posts";

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
    openGraph: { images: [post.cover.image.src], type: "article" },
  };
}

function PostBlock({ block }: { block: Block }) {
  if (block.type === "heading") {
    return (
      <h2 className="col-span-12 mt-8 font-display text-display-lg md:col-span-7 md:col-start-4">
        {block.text}
      </h2>
    );
  }
  if (block.type === "photos") {
    return (
      <div className="col-span-12 my-8">
        <PhotoRow photos={block.photos} />
      </div>
    );
  }
  return <p className="col-span-12 max-w-[60ch] text-pretty md:col-span-7 md:col-start-4">{block.text}</p>;
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
      <div className="col-span-12 grid grid-cols-subgrid gap-y-5">
        {post.blocks.map((block, index) => (
          <PostBlock key={index} block={block} />
        ))}
      </div>
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
