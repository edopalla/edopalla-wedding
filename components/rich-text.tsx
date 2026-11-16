import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";
import type { Gallery, PostBody } from "@/content/cms";
import { pairUp, PhotoRow } from "./photo-row";

const link: PortableTextComponents["marks"] = {
  link: ({ value, children }) => (
    <a href={value?.href} className="underline underline-offset-2">
      {children}
    </a>
  ),
};

const paragraphComponents: PortableTextComponents = {
  block: { normal: ({ children }) => <p>{children}</p> },
  marks: link,
};

export function Paragraphs({ value, className = "" }: { value: PortableTextBlock[]; className?: string }) {
  return (
    <div className={`flex flex-col gap-4 text-pretty ${className}`}>
      <PortableText value={value} components={paragraphComponents} />
    </div>
  );
}

const textColumn = "col-span-12 md:col-span-7 md:col-start-4";

const postComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className={`${textColumn} max-w-[60ch] text-pretty`}>{children}</p>,
    h2: ({ children }) => <h2 className={`${textColumn} mt-8 font-display text-display-lg`}>{children}</h2>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className={`${textColumn} flex max-w-[60ch] list-disc flex-col gap-2 pl-5`}>{children}</ul>
    ),
  },
  marks: link,
  types: {
    gallery: ({ value }: { value: Gallery }) => (
      <div className="col-span-12 my-8 flex flex-col gap-(--gutter)">
        {pairUp(value.items).map((row, index) => (
          <PhotoRow key={index} items={row} />
        ))}
      </div>
    ),
  },
};

export function PostText({ value }: { value: PostBody }) {
  return (
    <div className="col-span-12 grid grid-cols-subgrid gap-y-5">
      <PortableText value={value as PortableTextBlock[]} components={postComponents} />
    </div>
  );
}
