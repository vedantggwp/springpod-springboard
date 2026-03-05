"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
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
  const hasActiveChild = section.items.some((item) => pathname === item.href);
  const [isExpanded, setIsExpanded] = useState<boolean>(hasActiveChild || true);

  const toggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const Icon = SECTION_ICONS[section.title] ?? Folder;

  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2
          text-sm font-medium text-[#5C6682] transition-colors
          hover:bg-[#E9E9ED] hover:text-[#16254C]
          dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white/80"
      >
        <Icon size={16} className="shrink-0" />
        <span className="flex-1 text-left">{section.title}</span>
        <ChevronRight
          size={14}
          className={`shrink-0 text-[#8B92A6] transition-transform duration-200
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
                  className={`block rounded-md px-2 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "border-l-2 border-[#0BB3B7] bg-gradient-to-r from-[#9CF6F6]/30 to-[#0BB3B7]/20 pl-3 font-medium text-[#16254C] dark:text-white"
                      : "text-[#5C6682] hover:bg-[#E9E9ED] hover:text-[#16254C] dark:text-white/50 dark:hover:bg-white/5 dark:hover:text-white/80"
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
