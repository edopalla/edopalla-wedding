"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Reveal({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((frame) => {
          gsap.from(frame, {
            clipPath: "inset(12% 0% 0% 0%)",
            opacity: 0,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: frame, start: "top 90%", once: true },
          });
        });
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
