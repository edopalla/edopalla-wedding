import Link from "next/link";
import { coupleName, stories, storyHref, type Story } from "@/content/stories";
import { PhotoRow } from "../photo-row";
import { SectionHeading } from "../section-heading";

function Couple({ story, index }: { story: Story; index: number }) {
  const [first, second] = story.photos;
  const pair = index % 2 === 0 ? [first, second] : [second, first];

  return (
    <article className="flex w-full flex-col gap-4">
      <Link href={storyHref(story)} tabIndex={-1} aria-hidden>
        <PhotoRow photos={pair} />
      </Link>
      <h3 className="font-display text-display-sm">
        <Link href={storyHref(story)} className="link-underline">
          {coupleName(story)}
        </Link>
      </h3>
    </article>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="page-grid py-(--section)">
      <SectionHeading id="portfolio-title">Portfolio</SectionHeading>
      <div className="col-span-12 flex flex-col items-start gap-(--section)">
        {stories.map((story, index) => (
          <Couple key={story.id} story={story} index={index} />
        ))}
        <Link href="/portfolio" className="link-underline font-display text-display-sm">
          View the portfolio
        </Link>
      </div>
    </section>
  );
}
