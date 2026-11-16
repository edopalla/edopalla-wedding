import Link from "next/link";
import { about } from "@/content/pages";
import { site } from "@/lib/site";
import { PhotoFrame } from "../photo-frame";
import { Paragraphs } from "../rich-text";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="page-grid items-center gap-y-(--heading-gap) py-(--section)">
      <PhotoFrame
        photo={about.photo}
        shape="portrait"
        sizes="(min-width: 768px) 50vw, 100vw"
        className="col-span-12 md:col-span-6"
      />

      <div className="col-span-12 flex flex-col gap-(--heading-gap) md:col-span-5 md:col-start-8">
        <h2 id="about-title" className="font-display text-display-sm">
          {site.photographer}
        </h2>
        <p className="font-display text-display-lg text-balance">{about.statement}</p>
        <Paragraphs value={about.intro} className="max-w-[44ch]" />
        <Link href="/about" className="link-underline self-start font-display text-display-sm">
          More about me
        </Link>
      </div>
    </section>
  );
}
