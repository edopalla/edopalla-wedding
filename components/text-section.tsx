import type { ReactNode } from "react";
import type { Photo } from "@/content/cms";
import { PhotoFrame } from "./photo-frame";

type TextSectionProps = {
  id: string;
  title: string;
  photo?: Photo | null;
  children: ReactNode;
};

export function TextSection({ id, title, photo, children }: TextSectionProps) {
  return (
    <section aria-labelledby={id} className="col-span-12 mt-(--section) grid grid-cols-subgrid items-start gap-y-6">
      <div className="col-span-12 flex flex-col gap-(--heading-gap) md:sticky md:top-[calc(var(--header)+var(--gutter))] md:col-span-4">
        <h2 id={id} className="font-display text-display-lg">
          {title}
        </h2>
        {photo && (
          <PhotoFrame photo={photo} shape="portrait" sizes="(min-width: 768px) 32vw, 100vw" className="mb-4 md:mb-0 md:aspect-3/2" />
        )}
      </div>
      <div className="col-span-12 md:col-span-7 md:col-start-6">{children}</div>
    </section>
  );
}
