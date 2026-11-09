import type { Metadata } from "next";
import { PackageList } from "@/components/package-list";
import { Page } from "@/components/page";
import { TextSection } from "@/components/text-section";
import { bookingSteps, includedInEveryPackage, questions } from "@/content/packages";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Packages",
  description: `Elopement and wedding photography packages in ${site.city}, from a City Hall ceremony to the full day.`,
};

export default function PackagesPage() {
  return (
    <Page title="Packages">
      <PackageList />

      <TextSection id="included" title="Included">
        <ul className="flex flex-col gap-3 font-display text-display-sm">
          {includedInEveryPackage.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TextSection>

      <TextSection id="booking" title="How booking works">
        <ol className="flex flex-col gap-8">
          {bookingSteps.map((step) => (
            <li key={step.title} className="flex flex-col gap-2">
              <h3 className="font-display text-display-sm">{step.title}</h3>
              <p className="max-w-[56ch] text-pretty">{step.text}</p>
            </li>
          ))}
        </ol>
      </TextSection>

      <TextSection id="questions" title="Questions">
        <dl className="flex flex-col gap-8">
          {questions.map((item) => (
            <div key={item.question} className="flex flex-col gap-2">
              <dt className="font-display text-display-sm">{item.question}</dt>
              <dd className="max-w-[56ch] text-pretty">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </TextSection>
    </Page>
  );
}
