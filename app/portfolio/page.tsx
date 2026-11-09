import Link from "next/link";
import type { Metadata } from "next";
import { PhotoFrame } from "@/components/photo-frame";
import { Page } from "@/components/page";
import { coupleName, stories, storyHref } from "@/content/stories";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description: `Elopements and weddings photographed by ${site.photographer} in ${site.city}.`,
};

export default function PortfolioPage() {
  return (
    <Page title="Portfolio">
      <ul className="col-span-12 grid gap-x-(--gutter) gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <li key={story.id}>
            <Link href={storyHref(story)} className="flex flex-col gap-3">
              <PhotoFrame
                photo={story.cover}
                shape="portrait"
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
              />
              <h2 className="font-display text-display-sm">
                <span className="link-underline">{coupleName(story)}</span>
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
}
