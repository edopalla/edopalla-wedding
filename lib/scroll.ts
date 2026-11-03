import type Lenis from "lenis";

let instance: Lenis | null = null;

export function registerLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function pauseScroll() {
  instance?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function resumeScroll() {
  instance?.start();
  document.documentElement.style.overflow = "";
}
