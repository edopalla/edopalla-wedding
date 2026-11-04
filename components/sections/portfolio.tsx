import Image from "next/image";
import type { CSSProperties } from "react";
import type { Photo } from "@/content/photos";
import { coupleName, stories, type Story } from "@/content/stories";
import { SectionHeading } from "../section-heading";

function aspect(photo: Photo) {
  return photo.image.width / photo.image.height;
}

function Couple({ story, index }: { story: Story; index: number }) {
  const pair = index % 2 === 0 ? [story.main, story.detail] : [story.detail, story.main];
  const rowAspect = aspect(story.main) + aspect(story.detail);

  return (
    <article className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-(--gutter) md:flex-row">
        {pair.map((photo) => (
          <Image
            key={photo.image.src}
            src={photo.image}
            alt={photo.alt}
            sizes={`(min-width: 768px) ${Math.round((aspect(photo) / rowAspect) * 100)}vw, 100vw`}
            style={{ "--ratio": aspect(photo) } as CSSProperties}
            className="h-auto w-full min-w-0 md:[flex:var(--ratio)_1_0%]"
          />
        ))}
      </div>
      <h3 className="font-display text-display-sm">{coupleName(story)}</h3>
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
        <a href="/portfolio" className="link-underline font-display text-display-sm">
          View the portfolio
        </a>
      </div>
    </section>
  );
}
