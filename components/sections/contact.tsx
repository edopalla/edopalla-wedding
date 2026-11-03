import Image from "next/image";
import { photos, type Photo } from "@/content/photos";
import { inquiryHref, navHref, navigation, site } from "@/lib/site";

const [emailUser, emailDomain] = site.email.split("@");

const strip: Photo[] = [
  photos.kieranHelleSunflowers,
  photos.robertElenaHandsHair,
  photos.nataliiaEnricoSquare,
  photos.kieranHelleBouquet,
  photos.robertElenaCurls,
  photos.nataliiaEnricoKiss,
  photos.kieranHelleTable,
  photos.robertElenaForeheads,
  photos.nataliiaEnricoWalk,
  photos.kieranHellePortrait,
];

function StripPhotos({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-(--gutter) pr-(--gutter)">
      {strip.map((photo) => (
        <li
          key={photo.image.src}
          className="relative h-(--strip-height) shrink-0 overflow-hidden"
          style={{ aspectRatio: photo.image.width / photo.image.height }}
        >
          <Image
            src={photo.image}
            alt={hidden ? "" : photo.alt}
            fill
            sizes="30vw"
            className="object-cover"
          />
        </li>
      ))}
    </ul>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="overflow-hidden bg-ink pt-(--section) pb-(--margin) text-paper"
    >
      <div className="photo-strip flex w-max">
        <StripPhotos />
        <StripPhotos hidden />
      </div>

      <div className="page-grid mt-(--section) items-end gap-y-8">
        <h2 id="contact-title" className="col-span-12 font-display text-display-xl md:col-span-7">
          Let&rsquo;s talk
        </h2>
        <div className="col-span-12 flex flex-col items-start gap-5 md:col-span-5 md:items-end">
          <a href={inquiryHref} className="link-underline text-display-sm md:whitespace-nowrap">
            <span className="inline-block">{emailUser}</span>
            <span className="inline-block">@{emailDomain}</span>
          </a>
          <a href={inquiryHref} className="button-paper">
            Check your date
          </a>
        </div>
      </div>

      <footer className="page-grid mt-(--section) gap-y-6 text-small">
        <nav aria-label="Footer" className="col-span-12 md:col-span-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {navigation.map((item) => (
              <li key={item.label}>
                <a href={navHref(item, true)} className="link-underline">
                  {item.label}
                </a>
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
