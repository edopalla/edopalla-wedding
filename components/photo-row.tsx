import Image from "next/image";
import type { CSSProperties } from "react";
import type { Media, Photo } from "@/content/cms";
import { VideoTile } from "./video-tile";

const share = "min-w-0 md:flex-[var(--ratio)_1_0%]";
const defaultVideoRatio = 16 / 9;

function aspect(item: Media) {
  return item.kind === "photo" ? item.width / item.height : defaultVideoRatio;
}

export function pairUp(items: Media[]) {
  const rows: Media[][] = [];
  for (let index = 0; index < items.length; index += 2) rows.push(items.slice(index, index + 2));
  return rows;
}

type PhotoRowProps = {
  items: Media[];
  onSelect?: (item: Media) => void;
};

function PhotoTile({ photo, sizes, onSelect }: { photo: Photo; sizes: string; onSelect?: () => void }) {
  const style = { "--ratio": aspect(photo) } as CSSProperties;
  const image = (
    <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes={sizes} className="block h-auto w-full" />
  );

  return onSelect ? (
    <button
      type="button"
      onClick={onSelect}
      aria-haspopup="dialog"
      style={style}
      className={`${share} cursor-zoom-in`}
    >
      {image}
    </button>
  ) : (
    <div style={style} className={share}>
      {image}
    </div>
  );
}

export function PhotoRow({ items, onSelect }: PhotoRowProps) {
  const rowAspect = items.reduce((total, item) => total + aspect(item), 0);
  const lonePortrait = items.length === 1 && rowAspect < 1;
  const rowWidth = lonePortrait ? 50 : 100;

  return (
    <div className={`flex flex-col gap-(--gutter) md:flex-row ${lonePortrait ? "md:w-1/2" : ""}`}>
      {items.map((item, index) => {
        const select = onSelect && (() => onSelect(item));
        if (item.kind === "video") {
          return <VideoTile key={`${index}-${item.src}`} video={item} className={share} onSelect={select} />;
        }
        const sizes = `(min-width: 768px) ${Math.round((aspect(item) / rowAspect) * rowWidth)}vw, 100vw`;
        return <PhotoTile key={`${index}-${item.src}`} photo={item} sizes={sizes} onSelect={select} />;
      })}
    </div>
  );
}
