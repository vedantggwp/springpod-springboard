"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  "For Your Role": Users,
  Updates: Bell,
  "Design System": Palette,
  Reference: BookOpen,
};

interface DocSidebarProps {
  readonly navigation: Navigation;
}

export function DocSidebar({ navigation }: DocSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="fixed bottom-0 left-0 top-16 z-30 hidden w-64 overflow-y-auto
        border-r border-gray-200 bg-white pb-8 pt-4
        dark:border-white/10 dark:bg-[#161b22] lg:block"
    >
      <nav aria-label="Documentation sidebar" className="px-3">
        {navigation.map((section) => (
          <SidebarSection
            key={section.title}
            section={section}
            pathname={pathname}
          />
        ))}
      </nav>
    </aside>
  );
}

interface SidebarSectionProps {
  readonly section: NavSection;
  readonly pathname: string;
}

function SidebarSection({ section, pathname }: SidebarSectionProps) {
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
      <div className="mb-1">
        <Link
          href={section.href!}
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
                  className={`flex items-center rounded-md px-2 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "border-l-2 border-sp-teal bg-gradient-to-r from-sp-teal-light/30 to-sp-teal/20 pl-3 font-medium text-sp-navy dark:text-white"
                      : "text-sp-text-secondary hover:bg-sp-surface hover:text-sp-navy dark:text-white/50 dark:hover:bg-white/5 dark:hover:text-white/80"
                  }`}
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
    </div>
  );
}
