import { Navigation } from "@/types/navigation";

export const navigation: Navigation = [
  {
    title: "Home",
    items: [{ title: "Home", href: "/" }],
  },
  {
    title: "Intake",
    items: [{ title: "Project Intake", href: "/intake/project-intake" }],
  },
  {
    title: "Standards",
    items: [
      { title: "Quality", href: "/standards/quality" },
      { title: "Security", href: "/standards/security" },
      { title: "Branding", href: "/standards/branding" },
      { title: "Prompt Management", href: "/standards/prompts" },
    ],
  },
  {
    title: "Build Guides",
    items: [
      { title: "Green - Quick Build", href: "/build-guides/green-quick-build" },
      { title: "Yellow - Standard Build", href: "/build-guides/yellow-standard-build" },
      { title: "Orange - Reviewed Build", href: "/build-guides/orange-reviewed-build" },
      { title: "Red - Protected Build", href: "/build-guides/red-protected-build" },
    ],
  },
  {
    title: "Checklists",
    items: [
      { title: "Green Checklist", href: "/checklists/green-checklist" },
      { title: "Yellow Checklist", href: "/checklists/yellow-checklist" },
      { title: "Orange Checklist", href: "/checklists/orange-checklist" },
      { title: "Red Checklist", href: "/checklists/red-checklist" },
    ],
  },
  {
    title: "Forms & Templates",
    items: [
      { title: "Project Brief", href: "/forms/project-brief" },
      { title: "Prompt Spec", href: "/forms/prompt-spec" },
      { title: "Review Request", href: "/forms/review-request" },
      { title: "Incident Report", href: "/forms/incident-report" },
      { title: "Build Log", href: "/forms/build-log" },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Your First Build", href: "/guides/first-build" },
      { title: "Tool Selection", href: "/guides/tool-selection" },
      { title: "When to Escalate", href: "/guides/when-to-escalate" },
      { title: "Glossary", href: "/guides/glossary" },
    ],
  },
  {
    title: "Client Config",
    items: [
      { title: "Company Context", href: "/client-config/company-context" },
      { title: "Approved Tools", href: "/client-config/approved-tools" },
      { title: "Roles & Contacts", href: "/client-config/roles" },
      { title: "Prompt Library", href: "/client-config/prompt-library" },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "Verification Log", href: "/reference/verification-log" },
      { title: "Version History", href: "/reference/version" },
    ],
  },
];

export function findNavItem(slug: string) {
  for (const section of navigation) {
    for (const item of section.items) {
      if (item.href === `/${slug}` || (slug === "" && item.href === "/")) {
        return { section, item };
      }
    }
  }
  return null;
}

export function findAdjacentPages(slug: string) {
  const allItems = navigation.flatMap((s) => s.items);
  const currentHref = slug === "" ? "/" : `/${slug}`;
  const index = allItems.findIndex((item) => item.href === currentHref);

  return {
    prev: index > 0 ? allItems[index - 1] : null,
    next: index < allItems.length - 1 ? allItems[index + 1] : null,
  };
}
