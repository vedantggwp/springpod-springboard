"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  BookOpen,
  ChevronRight,
  ClipboardCheck,
  FileText,
  Folder,
  HelpCircle,
  Home,
  Layers,
  Settings,
  Shield,
  X,
} from "lucide-react";
import type { Navigation, NavSection } from "@/types/navigation";

const SECTION_ICONS: Record<string, React.ElementType> = {
  Home,
  Intake: ClipboardCheck,
  Standards: Shield,
  "Build Guides": Layers,
  Checklists: FileText,
  "Forms & Templates": Folder,
  Guides: HelpCircle,
  "Client Config": Settings,
  Reference: BookOpen,
};

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
        onKeyDown={(e) => {
          if (e.key === "Escape") close();
        }}
        role="button"
        tabIndex={-1}
        aria-label="Close navigation"
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform overflow-y-auto
          border-r border-gray-200 bg-white transition-transform duration-300
          ease-in-out dark:border-white/10 dark:bg-[#161b22]
          lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Drawer header */}
        <div
          className="flex h-16 items-center justify-between border-b
            border-gray-200 px-4 dark:border-white/10"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sp-navy to-sp-teal">
              <span className="text-xs font-bold text-white">V</span>
            </div>
            <span
              className="bg-gradient-to-r from-sp-navy to-sp-teal bg-clip-text
                text-lg font-bold text-transparent
                dark:from-white dark:to-sp-teal"
            >
              Documentation
            </span>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close navigation"
            className="flex h-8 w-8 items-center justify-center rounded-md
              text-sp-text-secondary transition-colors
              hover:bg-sp-surface hover:text-sp-navy
              dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white"
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
  const Icon = SECTION_ICONS[section.title] ?? Folder;
  const isDirectLink = Boolean(section.href) && section.items.length === 0;
  const hasActiveChild = section.items.some((item) => pathname === item.href);
  const [isExpanded, setIsExpanded] = useState<boolean>(hasActiveChild || true);

  const toggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  if (isDirectLink) {
    const isActive = pathname === section.href;
    return (
      <div className="mb-1">
        <Link
          href={section.href!}
          onClick={onNavigate}
          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2
            text-sm font-medium transition-colors ${
              isActive
                ? "bg-gradient-to-r from-sp-teal-light/30 to-sp-teal/20 text-sp-navy dark:text-white"
                : "text-sp-text-secondary hover:bg-sp-surface hover:text-sp-navy dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white/80"
            }`}
        >
          <Icon size={16} className="shrink-0" />
          <span className="flex-1 text-left">{section.title}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2
          text-sm font-medium text-sp-text-secondary transition-colors
          hover:bg-sp-surface hover:text-sp-navy
          dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white/80"
      >
        <Icon size={16} className="shrink-0" />
        <span className="flex-1 text-left">{section.title}</span>
        <ChevronRight
          size={14}
          className={`shrink-0 text-sp-text-muted transition-transform duration-200
            dark:text-white/40 ${isExpanded ? "rotate-90" : ""}`}
        />
      </button>

      {isExpanded && (
        <ul className="mt-0.5 space-y-0.5 pb-2">
          {section.items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href} className="ml-6">
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={`block rounded-md px-2 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "border-l-2 border-sp-teal bg-gradient-to-r from-sp-teal-light/30 to-sp-teal/20 pl-3 font-medium text-sp-navy dark:text-white"
                      : "text-sp-text-secondary hover:bg-sp-surface hover:text-sp-navy dark:text-white/50 dark:hover:bg-white/5 dark:hover:text-white/80"
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
