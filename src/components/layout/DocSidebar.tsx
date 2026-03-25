"use client";

import { usePathname } from "next/navigation";
import type { Navigation, NavSection } from "@/types/navigation";
import { NavSectionGroup } from "./NavSection";

interface DocSidebarProps {
  readonly navigation: Navigation;
}

export function DocSidebar({ navigation }: DocSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="fixed bottom-0 left-0 top-12 z-30 hidden w-64 overflow-y-auto
        border-r border-border bg-[var(--sp-content-bg)] pb-8 pt-4
        dark:border-white/10 dark:bg-card lg:block"
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
  return (
    <div className="mb-1 mt-4 first:mt-0">
      <NavSectionGroup
        section={section}
        pathname={pathname}
        itemClassName="py-2.5"
      />
    </div>
  );
}
