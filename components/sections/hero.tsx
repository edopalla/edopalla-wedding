import Image from "next/image";
import { photos } from "@/content/photos";
import { inquiryHref } from "@/lib/site";

export function Hero() {
  const cover = photos.kieranHelleSunflowers;

  return (
    <section data-cover className="relative h-svh min-h-[36rem] overflow-hidden text-paper">
      <Image
        src={cover.image}
        alt={cover.alt}
        fill
        preload
        sizes="100vw"
        className="object-cover object-[55%_50%]"
      />

      <h1 className="cover-words absolute inset-x-(--margin) top-[calc(var(--header)+var(--gutter))] flex flex-col font-display text-cover lg:inset-0 lg:block">
        <span className="self-start lg:absolute lg:top-[16%] lg:left-[5%]">Elopements</span>
        <span className="self-end lg:absolute lg:top-[40%] lg:right-[10%]">&amp; weddings</span>
        <span className="self-end lg:absolute lg:right-(--margin) lg:bottom-(--margin)">in Copenhagen</span>
      </h1>

      <a href={inquiryHref} className="button-paper absolute bottom-(--margin) left-(--margin)">
        Check your date
      </a>
    </section>
  );
}
