import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  as?: "h1" | "h2";
  children: ReactNode;
};

export function SectionHeading({ id, as: Tag = "h2", children }: SectionHeadingProps) {
  return (
    <Tag id={id} className="col-span-12 mb-(--heading-gap) font-display text-display-lg">
      {children}
    </Tag>
  );
}
