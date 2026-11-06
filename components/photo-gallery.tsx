"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Photo } from "@/content/photos";
import { pairUp, PhotoRow } from "./photo-row";

export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const viewer = useRef<HTMLDialogElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const showPhoto = (index: number) => {
    const slides = track.current;
    if (!slides) return;
    const wrapped = (index + photos.length) % photos.length;
    slides.scrollTo({ left: wrapped * slides.clientWidth, behavior: "instant" });
    setCurrent(wrapped);
  };

  const open = (photo: Photo) => {
    viewer.current?.showModal();
    showPhoto(photos.indexOf(photo));
  };

  const returnToPhoto = () => {
    grid.current?.querySelectorAll("button")[current]?.focus();
  };

  const followScroll = () => {
    const slides = track.current;
    if (slides) setCurrent(Math.round(slides.scrollLeft / slides.clientWidth));
  };

  const stepWithArrows = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") showPhoto(current + 1);
    if (event.key === "ArrowLeft") showPhoto(current - 1);
  };

  return (
    <>
      <div ref={grid} className="flex flex-col gap-(--gutter)">
        {pairUp(photos).map((row) => (
          <PhotoRow key={row[0].image.src} photos={row} onSelect={open} />
        ))}
      </div>

      <dialog
        ref={viewer}
        aria-label="Photos"
        onKeyDown={stepWithArrows}
        onClose={returnToPhoto}
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
            {photos.map((photo, index) => (
              <li
                key={photo.image.src}
                aria-hidden={index !== current || undefined}
                className="w-full shrink-0 snap-center px-(--margin)"
              >
                <div className="relative h-full">
                  <Image src={photo.image} alt={photo.alt} fill sizes="100vw" className="object-contain" />
                </div>
              </li>
            ))}
          </ul>

          <div className="flex h-(--header) shrink-0 items-center justify-between px-(--margin) text-small">
            <button type="button" onClick={() => showPhoto(current - 1)}>
              Previous
            </button>
            <button type="button" onClick={() => showPhoto(current + 1)}>
              Next
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
