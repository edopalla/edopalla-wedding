"use client";

import { useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Side = "left" | "center" | "right";

const alignment: Record<Side, string> = {
  left: "justify-items-start",
  center: "justify-items-center",
  right: "justify-items-end",
};

function rollState(index: number, active: number) {
  if (index === active) return "current";
  return index < active ? "past" : "next";
}

function Roll({ words, side, active }: { words: string[]; side: Side; active: number }) {
  return (
    <span data-side={side} className={`name-roll-window grid ${alignment[side]}`}>
      {words.map((word, index) => (
        <span key={index} data-roll={rollState(index, active)} className="name-roll [grid-area:1/1]">
          {word}
        </span>
      ))}
    </span>
  );
}

function closestToCentre(blocks: HTMLElement[]) {
  const centre = window.innerHeight / 2;
  const distances = blocks.map((block) => {
    const { top, height } = block.getBoundingClientRect();
    return Math.abs(top + height / 2 - centre);
  });
  return distances.indexOf(Math.min(...distances));
}

export type Ending = { href: string; label: string; words: [string, string, string] };

type NameStageProps = {
  couples: [string, string][];
  ending: Ending;
  children: ReactNode;
};

export function NameStage({ couples, ending, children }: NameStageProps) {
  const scope = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [ended, setEnded] = useState(false);
  const shown = ended ? couples.length : active;
  const [endLeft, endCenter, endRight] = ending.words;

  useGSAP(
    () => {
      const blocks = gsap.utils.toArray<HTMLElement>("[data-couple]");
      ScrollTrigger.create({
        trigger: "[data-couples]",
        start: "top bottom",
        end: "bottom top",
        onUpdate: () => setActive(closestToCentre(blocks)),
      });
      ScrollTrigger.create({
        trigger: "[data-ending]",
        start: "top 65%",
        onToggle: (self) => setEnded(self.progress > 0),
        onRefresh: (self) => setEnded(self.progress > 0),
      });
    },
    { scope },
  );

  const line = "absolute top-1/2 -translate-y-1/2 font-display text-display-sm md:text-display-xl";

  return (
    <div ref={scope} className="relative">
      <div className="pointer-events-none sticky top-0 h-svh">
        <p aria-hidden className={`${line} left-(--margin)`}>
          <Roll words={[...couples.map(([first]) => first), endLeft]} side="left" active={shown} />
        </p>
        <p aria-hidden className={`${line} left-1/2 -translate-x-1/2`}>
          <Roll words={[...couples.map(() => "&"), endCenter]} side="center" active={shown} />
        </p>
        <p aria-hidden className={`${line} right-(--margin)`}>
          <Roll words={[...couples.map(([, second]) => second), endRight]} side="right" active={shown} />
        </p>
        <a
          href={ending.href}
          aria-label={ending.label}
          tabIndex={ended ? 0 : -1}
          data-ended={ended}
          className="ending-link absolute inset-x-0 top-1/2 h-[1.2em] -translate-y-1/2 font-display text-display-sm data-[ended=true]:pointer-events-auto md:text-display-xl"
        />
      </div>
      <div data-couples className="pointer-events-none relative -mt-[100svh]">
        {children}
        <div data-ending aria-hidden className="h-[100svh]" />
      </div>
    </div>
  );
}
