"use client";

import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { useCallback } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

function dispatchCustomEvent(name: string) {
  window.dispatchEvent(new CustomEvent(name));
}

export function DocHeader() {
  const openSearch = useCallback(() => dispatchCustomEvent("open-search"), []);
  const toggleMobileNav = useCallback(
    () => dispatchCustomEvent("toggle-mobile-nav"),
    [],
  );

  return (
    <header
      className="sticky top-0 z-40 flex h-16 items-center border-b border-border
        bg-white px-4 dark:border-white/10 dark:bg-background lg:px-6"
    >
      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={toggleMobileNav}
        aria-label="Toggle navigation"
        className="mr-3 flex h-9 w-9 items-center justify-center rounded-md
          text-sp-text-secondary transition-colors hover:bg-sp-surface hover:text-sp-navy
          dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white
          lg:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5">
        <img
          src="/springpod-logo.svg"
          alt="Springpod"
          className="h-8 w-auto dark:hidden"
        />
        <img
          src="/springpod-logo-dark.svg"
          alt="Springpod"
          className="hidden h-8 w-auto dark:block"
        />
        <span
          className="border-l border-sp-border pl-2.5 font-heading text-sm
            font-semibold text-sp-navy dark:border-white/20 dark:text-white"
        >
          SpringBoard
        </span>
      </Link>

      <div className="flex-1" />

      {/* Search bar */}
      <button
        type="button"
        onClick={openSearch}
        className="mr-3 hidden h-9 w-64 items-center gap-2 rounded-xl
          bg-sp-surface px-4 py-2 text-sm text-sp-text-muted
          transition-colors hover:bg-sp-gray
          dark:bg-white/10 dark:text-white/50 dark:hover:bg-white/15
          sm:flex"
      >
        <Search size={14} className="shrink-0" />
        <span className="flex-1 text-left">Search docs...</span>
        <kbd
          className="rounded border border-sp-border bg-white px-1.5 py-0.5
            font-mono text-[10px] text-sp-text-muted
            dark:border-white/15 dark:bg-white/5 dark:text-white/40"
        >
          ⌘K
        </kbd>
      </button>

      {/* Mobile search trigger */}
      <button
        type="button"
        onClick={openSearch}
        aria-label="Search"
        className="mr-2 flex h-9 w-9 items-center justify-center rounded-md
          text-sp-text-secondary transition-colors hover:bg-sp-surface hover:text-sp-navy
          dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white
          sm:hidden"
      >
        <Search size={18} />
      </button>

      {/* Theme toggle */}
      <ThemeToggle />
    </header>
  );
}
