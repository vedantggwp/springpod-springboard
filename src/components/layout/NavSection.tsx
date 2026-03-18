"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import {
  Bell,
  BookOpen,
  ChevronRight,
  ClipboardCheck,
  FileText,
  Folder,
  HelpCircle,
  Home,
  Layers,
  Palette,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import type { NavSection } from "@/types/navigation";

export const SECTION_ICONS: Record<string, React.ElementType> = {
  Home,
  Intake: ClipboardCheck,
  Standards: Shield,
  "Build Guides": Layers,
  Checklists: FileText,
  "Forms & Templates": Folder,
  Guides: HelpCircle,
  "Client Config": Settings,
  "For Your Role": Users,
  Updates: Bell,
  "Design System": Palette,
  Reference: BookOpen,
};

interface NavSectionGroupProps {
  readonly section: NavSection;
  readonly pathname: string;
  readonly onNavigate?: () => void;
  /** Extra CSS classes for the section button/link (e.g. padding differences) */
  readonly itemClassName?: string;
  /** Extra CSS classes for child link items */
  readonly childClassName?: string;
}

export function NavSectionGroup({
  section,
  pathname,
  onNavigate,
  itemClassName = "",
  childClassName = "",
}: NavSectionGroupProps) {
  const Icon = SECTION_ICONS[section.title] ?? Folder;
  const isDirectLink = Boolean(section.href) && section.items.length === 0;
  const hasActiveChild = section.items.some((item) => pathname === item.href);
  const [isExpanded, setIsExpanded] = useState<boolean>(hasActiveChild);

  const toggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  if (isDirectLink) {
    const isActive = pathname === section.href;
    return (
      <Link
        href={section.href!}
        onClick={onNavigate}
        className={[
          "flex w-full items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-sp-teal focus-visible:ring-offset-2 ring-offset-[var(--sp-ring-offset)]",
          itemClassName,
          isActive
            ? "bg-gradient-to-r from-sp-teal-light/30 to-sp-teal/20 text-sp-navy dark:text-white"
            : "text-sp-text-secondary hover:bg-sp-surface hover:text-sp-navy dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white/80",
        ].join(" ")}
      >
        <Icon size={16} className="shrink-0" />
        <span className="flex-1 text-left">{section.title}</span>
      </Link>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className={[
          "flex w-full items-center gap-2 rounded-lg px-3 text-sm font-medium text-sp-text-secondary transition-colors",
          "hover:bg-sp-surface hover:text-sp-navy",
          "dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white/80",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-sp-teal focus-visible:ring-offset-2 ring-offset-[var(--sp-ring-offset)]",
          itemClassName,
        ].join(" ")}
      >
        <Icon size={16} className="shrink-0" />
        <span className="flex-1 text-left">{section.title}</span>
        <ChevronRight
          size={14}
          className={`shrink-0 text-sp-text-muted transition-transform duration-150 ease-out
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
                  className={[
                    "flex items-center rounded-md px-2 py-1.5 text-sm transition-colors",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-sp-teal focus-visible:ring-offset-2 ring-offset-[var(--sp-ring-offset)]",
                    childClassName,
                    isActive
                      ? "border-l-2 border-sp-teal bg-gradient-to-r from-sp-teal-light/30 to-sp-teal/20 pl-3 font-medium text-sp-navy dark:text-white"
                      : "text-sp-text-secondary hover:bg-sp-surface hover:text-sp-navy dark:text-white/50 dark:hover:bg-white/5 dark:hover:text-white/80",
                  ].join(" ")}
                >
                  <span className="flex-1">{item.title}</span>
                  {item.isNew && (
                    <span className="ml-2 rounded-full bg-sp-teal px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      NEW
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
