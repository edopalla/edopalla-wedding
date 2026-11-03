import { photos } from "@/content/photos";
import { site } from "@/lib/site";
import { PhotoFrame } from "../photo-frame";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="page-grid items-end gap-y-(--heading-gap) py-(--section)">
      <PhotoFrame
        photo={photos.robertElenaForeheads}
        shape="portrait"
        sizes="(min-width: 768px) 42vw, 100vw"
        className="col-span-12 md:col-span-5"
      />

      <div className="col-span-12 flex flex-col gap-(--heading-gap) md:col-span-6 md:col-start-7">
        <h2 id="about-title" className="font-display text-display-sm">
          {site.photographer}
        </h2>
        <p className="font-display text-display-lg text-balance">
          I photograph elopements and weddings the way they happen, quietly and close.
        </p>
        <div className="flex max-w-[44ch] flex-col gap-4 text-pretty">
          <p>
            I&rsquo;m Edoardo, the photographer behind Eterna, based in Copenhagen. I follow your
            day as it unfolds rather than directing it, at an intimate City Hall ceremony, on an
            afternoon walk through the city, or through every hour of a full wedding.
          </p>
          <p>
            Whether it&rsquo;s the two of you and two witnesses or everyone you love, you get the
            same attention and the same care.
          </p>
        </div>
      </div>
    </section>
  );
}
