import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PhotoGallery } from "@/components/photo-gallery";
import { Contact } from "@/components/sections/contact";
import { coupleName, findStory, nextStory, stories, storyHref } from "@/content/stories";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.id }));
}

async function storyFrom(params: PageProps<"/portfolio/[slug]">["params"]) {
  const story = findStory((await params).slug);
  if (!story) notFound();
  return story;
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const story = await storyFrom(params);
  return {
    title: coupleName(story),
    description: `${coupleName(story)}, photographed by ${site.photographer}.`,
    openGraph: { images: [story.cover.image.src] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/portfolio/[slug]">) {
  const story = await storyFrom(params);
  const next = nextStory(story);

  return (
    <main className="pt-(--header)">
      <article aria-labelledby="project-title" className="page-grid pt-(--heading-gap) pb-(--section)">
        <h1 id="project-title" className="col-span-12 mb-(--heading-gap) font-display text-display-lg">
          {coupleName(story)}
        </h1>
        <div className="col-span-12">
          <PhotoGallery photos={story.photos} />
        </div>
        <nav
          aria-label="Couples"
          className="col-span-12 mt-(--section) flex justify-between gap-6 font-display text-display-sm"
        >
          <Link href="/portfolio" className="link-underline">
            All couples
          </Link>
          <Link href={storyHref(next)} className="link-underline">
            Next couple
          </Link>
        </nav>
      </article>
      <Contact />
    </main>
  );
}
