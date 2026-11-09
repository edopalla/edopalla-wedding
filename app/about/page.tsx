import type { Metadata } from "next";
import { Page } from "@/components/page";
import { PhotoFrame } from "@/components/photo-frame";
import { TextSection } from "@/components/text-section";
import { photos } from "@/content/photos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.photographer} is an elopement and wedding photographer based in ${site.city}.`,
};

const facts = [
  { label: "Based in", value: site.city },
  { label: "Languages", value: "Lorem ipsum, dolor sit" },
  { label: "Camera", value: "Lorem ipsum" },
  { label: "Away from weddings", value: "Lorem ipsum dolor sit amet" },
];

export default function AboutPage() {
  return (
    <Page title={site.photographer}>
      <PhotoFrame
        photo={photos.robertElenaForeheads}
        shape="portrait"
        sizes="(min-width: 768px) 50vw, 100vw"
        className="col-span-12 md:col-span-6"
      />

      <div className="col-span-12 mt-(--heading-gap) flex flex-col gap-(--heading-gap) md:col-span-5 md:col-start-8 md:mt-0">
        <p className="font-display text-display-lg text-balance">
          I photograph elopements and weddings the way they happen, quietly and close.
        </p>
        <div className="flex max-w-[44ch] flex-col gap-4 text-pretty">
          <p>
            I&rsquo;m Edoardo, the photographer behind Eterna, based in Copenhagen. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
          </p>
        </div>
      </div>

      <TextSection id="approach" title="How I work">
        <div className="flex max-w-[56ch] flex-col gap-4 text-pretty">
          <p>
            Most couples I photograph have never stood in front of a professional camera. You don&rsquo;t
            need to know how to pose. I follow the day as it unfolds, and when we take portraits I give you
            something to do rather than somewhere to stand: a walk, a quiet minute, a conversation.
          </p>
          <p>
            Whether it&rsquo;s the two of you and two witnesses at City Hall or everyone you love at a full
            wedding, you get the same attention and the same care.
          </p>
        </div>
      </TextSection>

      <PhotoFrame
        photo={photos.nataliiaEnricoWalk}
        shape="landscape"
        sizes="100vw"
        className="col-span-12 mt-(--section)"
      />

      <TextSection id="facts" title="A few things">
        <dl className="flex flex-col gap-5">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
              <dt className="sm:w-48 sm:shrink-0">{fact.label}</dt>
              <dd className="font-display text-display-sm">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </TextSection>
    </Page>
  );
}
