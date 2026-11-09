import Link from "next/link";
import { emailHref, inquiryPath, navigation, site } from "@/lib/site";

const [emailUser, emailDomain] = site.email.split("@");

export function EmailLink({ className = "" }: { className?: string }) {
  return (
    <a href={emailHref} className={`link-underline ${className}`}>
      <span className="inline-block">{emailUser}</span>
      <span className="inline-block">@{emailDomain}</span>
    </a>
  );
}

function Invitation() {
  return (
    <div className="page-grid mb-(--section) items-end gap-y-8">
      <h2 id="contact-title" className="col-span-12 font-display text-display-lg md:col-span-7">
        Let&rsquo;s talk
      </h2>
      <div className="col-span-12 flex flex-col items-start gap-5 md:col-span-5 md:items-end">
        <EmailLink className="text-display-sm md:whitespace-nowrap" />
        <Link href={inquiryPath} className="button-paper">
          Check your date
        </Link>
      </div>
    </div>
  );
}

export function Contact({ invite = true }: { invite?: boolean }) {
  return (
    <section
      id="contact"
      aria-labelledby={invite ? "contact-title" : undefined}
      aria-label={invite ? undefined : "Site footer"}
      className={`bg-ink pb-(--margin) text-paper ${invite ? "pt-(--section)" : "pt-(--margin)"}`}
    >
      {invite && <Invitation />}

      <footer className="page-grid gap-y-6 text-small">
        <nav aria-label="Footer" className="col-span-12 md:col-span-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="link-underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="col-span-12 flex gap-8 md:col-span-4 md:justify-end">
          <a href={site.instagram.url} className="link-underline" rel="noopener" target="_blank">
            Instagram
          </a>
          <p>
            {site.name}, {site.city}
          </p>
        </div>
      </footer>
    </section>
  );
}
