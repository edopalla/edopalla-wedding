import Image from "next/image";
import Link from "next/link";
import { home } from "@/content/pages";
import { inquiryPath } from "@/lib/site";

export function Hero() {
  const lines = home.heroTitle.split("\n");

  return (
    <section data-cover className="relative h-svh min-h-[32rem] overflow-hidden text-paper">
      <Image
        src={home.heroImage.src}
        alt={home.heroImage.alt}
        fill
        preload
        sizes="100vw"
        style={{ objectPosition: home.heroImage.position }}
        className="object-cover"
      />

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
