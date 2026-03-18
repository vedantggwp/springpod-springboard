"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Navigation, NavSection } from "@/types/navigation";
import { NavSectionGroup } from "./NavSection";

interface MobileNavProps {
  readonly navigation: Navigation;
}

export function MobileNav({ navigation }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [trackedPathname, setTrackedPathname] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    window.addEventListener("toggle-mobile-nav", handleToggle);
    return () => window.removeEventListener("toggle-mobile-nav", handleToggle);
  }, []);

  // Close drawer on route change (using state comparison during render)
  if (pathname !== trackedPathname) {
    setTrackedPathname(pathname);
    if (isOpen) {
      setIsOpen(false);
    }
  }

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform overflow-y-auto
          border-r border-border bg-white transition-transform duration-300
          ease-in-out dark:border-white/10 dark:bg-card
          lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Drawer header */}
        <div
          className="flex h-12 items-center justify-between border-b
            border-border px-4 dark:border-white/10"
        >
          <Link href="/" className="flex items-center gap-2.5" onClick={close}>
            <img
              src="/springpod-logo.svg"
              alt="Springpod"
              width={105}
              height={28}
              className="h-7 w-auto dark:hidden"
            />
            <img
              src="/springpod-logo-dark.svg"
              alt="Springpod"
              width={105}
              height={28}
              className="hidden h-7 w-auto dark:block"
            />
            <span
              className="border-l border-sp-border pl-2.5 font-heading text-sm
                font-semibold text-sp-navy dark:border-white/20 dark:text-white"
            >
              SpringBoard
            </span>
          </Link>
          <button
            type="button"
            onClick={close}
            aria-label="Close navigation"
            className="flex h-8 w-8 items-center justify-center rounded-md
              text-sp-text-secondary transition-colors
              hover:bg-sp-surface hover:text-sp-navy
              dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white
              focus:outline-none focus-visible:ring-2 focus-visible:ring-sp-teal focus-visible:ring-offset-2 ring-offset-[var(--sp-ring-offset)]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav aria-label="Mobile navigation" className="px-3 py-4">
          {navigation.map((section) => (
            <MobileNavSection
              key={section.title}
              section={section}
              pathname={pathname}
              onNavigate={close}
            />
          ))}
        </nav>
      </div>
    </>
  );
}

interface MobileNavSectionProps {
  readonly section: NavSection;
  readonly pathname: string;
  readonly onNavigate: () => void;
}

function MobileNavSection({
  section,
  pathname,
  onNavigate,
}: MobileNavSectionProps) {
  return (
    <div className="mb-1">
      <NavSectionGroup
        section={section}
        pathname={pathname}
        onNavigate={onNavigate}
        itemClassName="py-2"
      />
    </div>
  );
}
