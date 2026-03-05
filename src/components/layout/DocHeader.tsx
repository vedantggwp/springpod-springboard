"use client";

import { Github, Menu, Search } from "lucide-react";
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
      className="sticky top-0 z-40 flex h-16 items-center border-b border-gray-200
        bg-white px-4 dark:border-white/10 dark:bg-[#0d1117] lg:px-6"
    >
      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={toggleMobileNav}
        aria-label="Toggle navigation"
        className="mr-3 flex h-9 w-9 items-center justify-center rounded-md
          text-[#5C6682] transition-colors hover:bg-[#E9E9ED] hover:text-[#16254C]
          dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white
          lg:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#16254C] to-[#0BB3B7]">
          <span className="text-xs font-bold text-white">V</span>
        </div>
        <span
          className="bg-gradient-to-r from-[#16254C] to-[#0BB3B7] bg-clip-text
            text-lg font-bold tracking-tight text-transparent
            dark:from-white dark:to-[#0BB3B7]"
        >
          Documentation
        </span>
      </Link>

      <div className="flex-1" />

      {/* Search bar */}
      <button
        type="button"
        onClick={openSearch}
        className="mr-3 hidden h-9 w-64 items-center gap-2 rounded-xl
          bg-[#E9E9ED] px-4 py-2 text-sm text-[#8B92A6]
          transition-colors hover:bg-[#dddde1]
          dark:bg-white/10 dark:text-white/50 dark:hover:bg-white/15
          sm:flex"
      >
        <Search size={14} className="shrink-0" />
        <span className="flex-1 text-left">Search docs...</span>
        <kbd
          className="rounded border border-[#B9BEC9] bg-white px-1.5 py-0.5
            font-mono text-[10px] text-[#8B92A6]
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
          text-[#5C6682] transition-colors hover:bg-[#E9E9ED] hover:text-[#16254C]
          dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white
          sm:hidden"
      >
        <Search size={18} />
      </button>

      {/* GitHub link */}
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="mr-1 flex h-9 w-9 items-center justify-center rounded-md
          text-[#5C6682] transition-colors hover:bg-[#E9E9ED] hover:text-[#16254C]
          dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
      >
        <Github size={18} />
      </a>

      {/* Theme toggle */}
      <ThemeToggle />
    </header>
  );
}
