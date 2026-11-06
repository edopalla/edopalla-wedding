import Image from "next/image";
import type { CSSProperties } from "react";
import type { Photo } from "@/content/photos";

function aspect(photo: Photo) {
  return photo.image.width / photo.image.height;
}

export function pairUp(photos: Photo[]) {
  const rows: Photo[][] = [];
  for (let index = 0; index < photos.length; index += 2) rows.push(photos.slice(index, index + 2));
  return rows;
}

type PhotoRowProps = {
  photos: Photo[];
  onSelect?: (photo: Photo) => void;
};

export function PhotoRow({ photos, onSelect }: PhotoRowProps) {
  const rowAspect = photos.reduce((total, photo) => total + aspect(photo), 0);
  const lonePortrait = photos.length === 1 && rowAspect < 1;
  const rowWidth = lonePortrait ? 50 : 100;

  return (
    <div className={`flex flex-col gap-(--gutter) md:flex-row ${lonePortrait ? "md:w-1/2" : ""}`}>
      {photos.map((photo) => {
        const image = (
          <Image
            src={photo.image}
            alt={photo.alt}
            sizes={`(min-width: 768px) ${Math.round((aspect(photo) / rowAspect) * rowWidth)}vw, 100vw`}
            className="block h-auto w-full"
          />
        );
        const style = { "--ratio": aspect(photo) } as CSSProperties;
        const share = "min-w-0 md:flex-[var(--ratio)_1_0%]";

        return onSelect ? (
          <button
            key={photo.image.src}
            type="button"
            onClick={() => onSelect(photo)}
            aria-haspopup="dialog"
            style={style}
            className={`${share} cursor-zoom-in`}
          >
            {image}
          </button>
        ) : (
          <div key={photo.image.src} style={style} className={share}>
            {image}
          </div>
        );
      })}
    </div>
  );
}
