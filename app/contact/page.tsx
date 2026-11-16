import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import { Page } from "@/components/page";
import { PhotoFrame } from "@/components/photo-frame";
import { EmailLink } from "@/components/sections/contact";
import { contact } from "@/content/pages";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Check your date with ${site.photographer}, elopement and wedding photographer in ${site.city}.`,
};

export default function ContactPage() {
  return (
    <Page title={contact.title} invite={false}>
      <div className="col-span-12 flex flex-col gap-(--heading-gap) md:col-span-5">
        {contact.intro && <p className="max-w-[44ch] text-pretty">{contact.intro}</p>}
        <div className="flex flex-col items-start gap-2">
          <EmailLink className="font-display text-display-sm" />
          {site.instagram && (
            <a
              href={site.instagram}
              className="link-underline font-display text-display-sm"
              rel="noopener"
              target="_blank"
            >
              Instagram
            </a>
          )}
        </div>
        {contact.photo && (
          <PhotoFrame
            photo={contact.photo}
            shape="portrait"
            sizes="(min-width: 768px) 40vw, 100vw"
            className="hidden md:block"
          />
        )}
      </div>

      <div className="col-span-12 mt-(--section) md:col-span-6 md:col-start-7 md:mt-0">
        <InquiryForm />
      </div>
    </Page>
  );
}
