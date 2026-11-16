import Image from "next/image";
import type { Photo } from "@/content/cms";

const shapes = {
  landscape: "aspect-3/2",
  portrait: "aspect-4/5",
};

type PhotoFrameProps = {
  photo: Photo;
  shape: keyof typeof shapes;
  sizes: string;
  className?: string;
  preload?: boolean;
};

export function PhotoFrame({ photo, shape, sizes, className = "", preload }: PhotoFrameProps) {
  return (
    <div className={`relative overflow-hidden ${shapes[shape]} ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        preload={preload}
        style={{ objectPosition: photo.position }}
        className="object-cover"
      />
    </div>
  );
}
