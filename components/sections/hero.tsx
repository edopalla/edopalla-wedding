import Image from "next/image";
import Link from "next/link";
import { photos } from "@/content/photos";
import { inquiryPath } from "@/lib/site";

export function Hero() {
  const cover = photos.kieranHelleSunflowers;

  return (
    <section data-cover className="relative h-svh min-h-[32rem] overflow-hidden text-paper">
      <Image
        src={cover.image}
        alt={cover.alt}
        fill
        preload
        sizes="100vw"
        className="object-cover object-[55%_50%]"
      />

      <div className="absolute inset-x-(--margin) bottom-(--margin) flex flex-col items-start gap-6">
        <h1 className="cover-words font-display text-cover">
          Elopements &amp; weddings
          <br />
          in Copenhagen
        </h1>
        <Link href={inquiryPath} className="button-paper">
          Check your date
        </Link>
      </div>
    </section>
  );
}
