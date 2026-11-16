"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Media } from "@/content/cms";
import { pairUp, PhotoRow } from "./photo-row";

function Slide({ item }: { item: Media }) {
  if (item.kind === "video") {
    return (
      <video
        src={item.src}
        controls
        playsInline
        preload="metadata"
        aria-label={item.alt || undefined}
        className="h-full w-full object-contain"
      />
    );
  }
  return <Image src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" />;
}

export function PhotoGallery({ items }: { items: Media[] }) {
  const viewer = useRef<HTMLDialogElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const pauseVideos = () => {
    track.current?.querySelectorAll("video").forEach((video) => video.pause());
  };

  const showItem = (index: number) => {
    const slides = track.current;
    if (!slides) return;
    const wrapped = (index + items.length) % items.length;
    pauseVideos();
    slides.scrollTo({ left: wrapped * slides.clientWidth, behavior: "instant" });
    setCurrent(wrapped);
  };

  const open = (item: Media) => {
    viewer.current?.showModal();
    showItem(items.indexOf(item));
  };

  const returnToItem = () => {
    pauseVideos();
    grid.current?.querySelectorAll("button")[current]?.focus();
  };

  const followScroll = () => {
    const slides = track.current;
    if (!slides) return;
    const index = Math.round(slides.scrollLeft / slides.clientWidth);
    if (index === current) return;
    pauseVideos();
    setCurrent(index);
  };

  const stepWithArrows = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") showItem(current + 1);
    if (event.key === "ArrowLeft") showItem(current - 1);
  };

  return (
    <>
      <div ref={grid} className="flex flex-col gap-(--gutter)">
        {pairUp(items).map((row, index) => (
          <PhotoRow key={index} items={row} onSelect={open} />
        ))}
      </div>

      <dialog
        ref={viewer}
        aria-label="Photos and videos"
        onKeyDown={stepWithArrows}
        onClose={returnToItem}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-paper p-0 text-ink"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-(--header) shrink-0 items-center justify-end px-(--margin) text-small">
            <button type="button" onClick={() => viewer.current?.close()} autoFocus>
              Close
            </button>
          </div>

          <ul
            ref={track}
            onScroll={followScroll}
            className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto overscroll-contain [scrollbar-width:none]"
          >
            {items.map((item, index) => (
              <li
                key={`${index}-${item.src}`}
                aria-hidden={index !== current || undefined}
                className="w-full shrink-0 snap-center px-(--margin)"
              >
                <div className="relative h-full">
                  <Slide item={item} />
                </div>
              </li>
            ))}
          </ul>

          <div className="flex h-(--header) shrink-0 items-center justify-between px-(--margin) text-small">
            <button type="button" onClick={() => showItem(current - 1)}>
              Previous
            </button>
            <button type="button" onClick={() => showItem(current + 1)}>
              Next
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
