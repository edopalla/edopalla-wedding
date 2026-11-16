import type { Metadata } from "next";
import { Page } from "@/components/page";
import { PhotoFrame } from "@/components/photo-frame";
import { Paragraphs } from "@/components/rich-text";
import { TextSection } from "@/components/text-section";
import { about } from "@/content/pages";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.photographer} is an elopement and wedding photographer based in ${site.city}.`,
};

export default function AboutPage() {
  return (
    <Page title={site.photographer}>
      <PhotoFrame
        photo={about.photo}
        shape="portrait"
        sizes="(min-width: 768px) 50vw, 100vw"
        className="col-span-12 md:col-span-6"
      />

      <div className="col-span-12 mt-(--heading-gap) flex flex-col gap-(--heading-gap) md:col-span-5 md:col-start-8 md:mt-0">
        <p className="font-display text-display-lg text-balance">{about.statement}</p>
        <Paragraphs value={about.intro} className="max-w-[44ch]" />
      </div>

      {about.approach.length > 0 && (
        <TextSection id="approach" title="How I work">
          <Paragraphs value={about.approach} className="max-w-[56ch]" />
        </TextSection>
      )}

      {about.widePhoto && (
        <PhotoFrame photo={about.widePhoto} shape="landscape" sizes="100vw" className="col-span-12 mt-(--section)" />
      )}

      {about.facts.length > 0 && (
        <TextSection id="facts" title="A few things">
          <dl className="flex flex-col gap-5">
            {about.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                <dt className="sm:w-48 sm:shrink-0">{fact.label}</dt>
                <dd className="font-display text-display-sm">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </TextSection>
      )}
    </Page>
  );
}
