"use client";

import Image from "next/image";
import { useState } from "react";
import { additionalHourDkk, formatDkk, packages } from "@/content/packages";
import { PhotoFrame } from "../photo-frame";
import { SectionHeading } from "../section-heading";

export function Packages() {
  const [active, setActive] = useState(0);

  return (
    <section id="packages" aria-labelledby="packages-title" className="page-grid py-(--section)">
      <SectionHeading id="packages-title">Packages</SectionHeading>

      <ul className="col-span-12 flex flex-col md:col-span-7">
        {packages.map((item, index) => (
          <li
            key={item.name}
            tabIndex={0}
            data-active={index === active}
            onPointerEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            className="package-row grid grid-cols-[1fr_auto] gap-x-6 gap-y-3 py-[clamp(1.5rem,3vw,2.5rem)] outline-offset-8"
          >
            <h3 className="font-display text-display-lg">{item.name}</h3>
            <p className="self-end font-display text-display-sm tabular-nums">{formatDkk(item.priceDkk)}</p>
            <p className="max-w-[40ch] text-pretty">{item.description}</p>
            <p className="text-right">
              {item.photos}
              <br />
              {item.hours}
            </p>
            <PhotoFrame
              photo={item.photo}
              shape="landscape"
              sizes="100vw"
              className="col-span-2 mt-4 md:hidden"
            />
          </li>
        ))}
        <li className="grid grid-cols-[1fr_auto] gap-x-6 pt-[clamp(1.5rem,3vw,2.5rem)]">
          <p className="font-display text-display-sm">Additional hours</p>
          <p className="font-display text-display-sm tabular-nums">{formatDkk(additionalHourDkk)}</p>
        </li>
      </ul>

      <div className="relative hidden md:col-span-4 md:col-start-9 md:block">
        <div className="sticky top-[calc(var(--header)+var(--gutter))] aspect-[4/5] overflow-hidden">
          {packages.map((item, index) => (
            <Image
              key={item.name}
              src={item.photo.image}
              alt={index === active ? item.photo.alt : ""}
              aria-hidden={index !== active || undefined}
              data-active={index === active}
              fill
              sizes="33vw"
              className="package-photo object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
