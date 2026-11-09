import type { ReactNode } from "react";
import { Contact } from "./sections/contact";
import { SectionHeading } from "./section-heading";

type PageProps = {
  title: ReactNode;
  invite?: boolean;
  children: ReactNode;
};

export function Page({ title, invite = true, children }: PageProps) {
  return (
    <main className="pt-(--header)">
      <article aria-labelledby="page-title" className="page-grid pt-(--heading-gap) pb-(--section)">
        <SectionHeading id="page-title" as="h1">
          {title}
        </SectionHeading>
        {children}
      </article>
      <Contact invite={invite} />
    </main>
  );
}
