import { additionalHourDkk, formatDkk, packages } from "@/content/packages";
import { PhotoFrame } from "../photo-frame";
import { SectionHeading } from "../section-heading";

export function Packages() {
  return (
    <section id="packages" aria-labelledby="packages-title" className="page-grid py-(--section)">
      <SectionHeading id="packages-title">Packages</SectionHeading>

      <ul className="col-span-12 grid gap-x-(--gutter) gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {packages.map((item) => (
          <li key={item.name} className="flex flex-col gap-3">
            <PhotoFrame
              photo={item.photo}
              shape="portrait"
              sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
              className="mb-2"
            />
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-display-sm">{item.name}</h3>
              <p>{formatDkk(item.priceDkk)}</p>
            </div>
            <p>
              {item.photos}, {item.hours}
            </p>
            <p className="text-pretty">{item.description}</p>
          </li>
        ))}
      </ul>

      <p className="col-span-12 mt-10">
        Additional hours {formatDkk(additionalHourDkk)}
      </p>
    </section>
  );
}
