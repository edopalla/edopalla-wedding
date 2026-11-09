import type { ReactNode } from "react";

type TextSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function TextSection({ id, title, children }: TextSectionProps) {
  return (
    <section aria-labelledby={id} className="col-span-12 mt-(--section) grid grid-cols-subgrid gap-y-6">
      <h2 id={id} className="col-span-12 font-display text-display-lg md:col-span-4">
        {title}
      </h2>
      <div className="col-span-12 md:col-span-7 md:col-start-6">{children}</div>
    </section>
  );
}
