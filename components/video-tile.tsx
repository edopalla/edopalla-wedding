"use client";

import { useState, type CSSProperties } from "react";
import type { Video } from "@/content/cms";

const defaultRatio = 16 / 9;

type VideoTileProps = {
  video: Video;
  className: string;
  onSelect?: () => void;
};

export function VideoTile({ video, className, onSelect }: VideoTileProps) {
  const [ratio, setRatio] = useState(defaultRatio);
  const style = { "--ratio": ratio } as CSSProperties;

  const player = (
    <video
      src={`${video.src}#t=0.1`}
      preload="metadata"
      playsInline
      controls={!onSelect}
      aria-label={video.alt || undefined}
      onLoadedMetadata={(event) => setRatio(event.currentTarget.videoWidth / event.currentTarget.videoHeight)}
      className="block h-auto w-full"
    />
  );

  if (!onSelect) {
    return (
      <div style={style} className={className}>
        {player}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-haspopup="dialog"
      aria-label={video.alt ? `Play video: ${video.alt}` : "Play video"}
      style={style}
      className={`${className} relative cursor-zoom-in`}
    >
      {player}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="pointer-events-none absolute top-1/2 left-1/2 size-12 -translate-1/2 fill-paper drop-shadow"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  );
}
