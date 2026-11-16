import Image, { getImageProps } from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Photo } from "@/content/cms";
import { home } from "@/content/pages";
import { inquiryPath } from "@/lib/site";

function CoverImage({ photo }: { photo: Photo }) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      preload
      sizes="100vw"
      style={{ objectPosition: photo.position }}
      className="object-cover"
    />
  );
}

function ArtDirectedCover({ landscape, portrait }: { landscape: Photo; portrait: Photo }) {
  const shared = { alt: landscape.alt, fill: true, sizes: "100vw" };
  const { srcSet: landscapeSrcSet } = getImageProps({ ...shared, src: landscape.src }).props;
  const { style, ...portraitProps } = getImageProps({ ...shared, src: portrait.src, fetchPriority: "high", loading: "eager" }).props;
  const positions = { "--cover-portrait": portrait.position, "--cover-landscape": landscape.position } as CSSProperties;

  return (
    <picture>
      <source media="(orientation: landscape)" srcSet={landscapeSrcSet} sizes="100vw" />
      <img
        {...portraitProps}
        alt={landscape.alt}
        style={{ ...style, ...positions }}
        className="object-cover object-(--cover-portrait) landscape:object-(--cover-landscape)"
      />
    </picture>
  );
}

export function Hero() {
  const lines = home.heroTitle.split("\n");

  return (
    <section data-cover className="relative h-svh min-h-[32rem] overflow-hidden text-paper">
      {home.heroImageMobile ? (
        <ArtDirectedCover landscape={home.heroImage} portrait={home.heroImageMobile} />
      ) : (
        <CoverImage photo={home.heroImage} />
      )}
      <div aria-hidden className="cover-scrim absolute inset-0" />

      <div className="absolute inset-x-(--margin) bottom-(--margin) flex flex-col items-start gap-6">
        <h1 className="cover-words font-display text-cover">
          {lines.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </h1>
        <Link href={inquiryPath} className="button-paper">
          Check your date
        </Link>
      </div>
    </section>
  );
}
