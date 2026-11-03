import Image from "next/image";
import type { Photo } from "@/content/photos";

const shapes = {
  landscape: "aspect-[3/2]",
  portrait: "aspect-[4/5]",
};

type PhotoFrameProps = {
  photo: Photo;
  shape: keyof typeof shapes;
  sizes: string;
  className?: string;
  reveal?: boolean;
  fetchPriority?: "high";
};

export function PhotoFrame({
  photo,
  shape,
  sizes,
  className = "",
  reveal = true,
  fetchPriority,
}: PhotoFrameProps) {
  return (
    <div data-reveal={reveal || undefined} className={`relative overflow-hidden ${shapes[shape]} ${className}`}>
      <Image
        src={photo.image}
        alt={photo.alt}
        fill
        sizes={sizes}
        fetchPriority={fetchPriority}
        className="object-cover"
      />
    </div>
  );
}
