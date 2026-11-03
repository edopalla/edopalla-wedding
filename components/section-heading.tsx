import type { ReactNode } from "react";

export function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="col-span-12 mb-(--heading-gap) font-display text-display-lg">
      {children}
    </h2>
  );
}
