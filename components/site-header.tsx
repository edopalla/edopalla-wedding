"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useMountEffect } from "@/hooks/useMountEffect";
import { inquiryHref, navHref, navigation, site, type NavItem } from "@/lib/site";
import { pauseScroll, resumeScroll } from "@/lib/scroll";

const revealThreshold = 160;

function isOverCover(headerHeight: number) {
  const cover = document.querySelector("[data-cover]");
  return Boolean(cover && cover.getBoundingClientRect().bottom > headerHeight);
}

function useScrollState(onHome: boolean) {
  const [hidden, setHidden] = useState(false);
  const [overCover, setOverCover] = useState(onHome);

  useMountEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const header = document.querySelector("header");
      setHidden(y > revealThreshold && y > lastY);
      setOverCover(isOverCover(header?.offsetHeight ?? 0));
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  return { hidden, overCover };
}

function NavLinks({ items, onHome }: { items: NavItem[]; onHome: boolean }) {
  return (
    <ul className="flex gap-9 text-small">
      {items.map((item) => (
        <li key={item.label}>
          <a href={navHref(item, onHome)} className="link-underline">
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader() {
  const onHome = usePathname() === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelShown, setPanelShown] = useState(false);
  const scroll = useScrollState(onHome);
  const hidden = scroll.hidden && !panelShown;
  const onCover = scroll.overCover && !panelShown;

  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    flushSync(() => {
      setMenuOpen(true);
      setPanelShown(true);
    });
    pauseScroll();
    menuPanel.current?.querySelector("a")?.focus();
  };

  const closeMenu = () => {
    setMenuOpen(false);
    resumeScroll();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPanelShown(false);
  };

  const settlePanel = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && event.propertyName === "clip-path" && !menuOpen) {
      setPanelShown(false);
    }
  };

  const closeOnEscape = (event: React.KeyboardEvent) => {
    if (event.key !== "Escape" || !menuOpen) return;
    closeMenu();
    menuButton.current?.focus();
  };

  return (
    <header
      onKeyDown={closeOnEscape}
      data-hidden={hidden}
      data-on-cover={onCover}
      data-menu={panelShown ? "open" : "closed"}
      className="site-header fixed inset-x-0 top-0 z-40 bg-paper text-ink data-[hidden=true]:-translate-y-full data-[on-cover=true]:bg-transparent data-[on-cover=true]:text-paper"
    >
      <div className="flex h-(--header) items-center justify-between px-(--margin)">
        <Link
          href="/"
          onClick={closeMenu}
          className="font-display text-display-sm leading-none"
          aria-label={`${site.name}, home`}
        >
          {site.wordmark}
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <NavLinks items={navigation} onHome={onHome} />
        </nav>

        <button
          ref={menuButton}
          type="button"
          className="text-small md:hidden"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={menuOpen ? closeMenu : openMenu}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        data-open={menuOpen}
        onClick={closeMenu}
        className="menu-backdrop fixed inset-x-0 top-(--header) bottom-0 cursor-default md:hidden"
      />

      <div
        id="site-menu"
        ref={menuPanel}
        data-open={menuOpen}
        inert={!menuOpen}
        onTransitionEnd={settlePanel}
        className="menu-panel absolute inset-x-0 top-full max-h-[calc(100svh-var(--header))] overflow-y-auto overscroll-contain bg-paper px-(--margin) pb-(--margin) text-ink md:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {navigation.map((item) => (
              <li key={item.label}>
                <a href={navHref(item, onHome)} onClick={closeMenu} className="block py-3">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={inquiryHref} onClick={closeMenu} className="button-ink mt-4">
          Check your date
        </a>
      </div>
    </header>
  );
}
