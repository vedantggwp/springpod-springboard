import { Navigation } from "@/types/navigation";

export const navigation: Navigation = [
  {
    title: "Home",
    href: "/",
    items: [],
  },
  {
    title: "Intake",
    href: "/intake/project-intake",
    items: [],
  },
  {
    title: "Standards",
    items: [
      { title: "Quality", href: "/standards/quality" },
      { title: "Security", href: "/standards/security" },
      { title: "Branding", href: "/standards/branding" },
      { title: "Prompt Management", href: "/standards/prompts" },
      { title: "Safeguarding & Under-18s", href: "/standards/safeguarding", isNew: true },
      { title: "Data Workflows", href: "/standards/data-workflows", isNew: true },
    ],
  },
  {
    title: "Build Guides",
    items: [
      { title: "🟢 Green — Quick Build", href: "/build-guides/green-quick-build" },
      { title: "🟡 Yellow — Standard Build", href: "/build-guides/yellow-standard-build" },
      { title: "🟠 Orange — Reviewed Build", href: "/build-guides/orange-reviewed-build" },
      { title: "🔴 Red — Protected Build", href: "/build-guides/red-protected-build" },
    ],
  },
  {
    title: "Checklists",
    items: [
      { title: "🟢 Green Checklist", href: "/checklists/green-checklist" },
      { title: "🟡 Yellow Checklist", href: "/checklists/yellow-checklist" },
      { title: "🟠 Orange Checklist", href: "/checklists/orange-checklist" },
      { title: "🔴 Red Checklist", href: "/checklists/red-checklist" },
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
      { title: "Tooling Strategy", href: "/guides/tool-selection", isNew: true },
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
    title: "For Your Role",
    items: [
      { title: "Curriculum Designers", href: "/roles/curriculum-designer", isNew: true },
      { title: "Ops & Partnerships", href: "/roles/ops-partnerships", isNew: true },
      { title: "Product & Engineering", href: "/roles/product-engineering", isNew: true },
      { title: "Marketing", href: "/roles/marketing", isNew: true },
      { title: "Leadership", href: "/roles/leadership", isNew: true },
    ],
  },
  {
    title: "Updates",
    items: [
      { title: "Updates Feed", href: "/updates/feed", isNew: true },
    ],
  },
  {
    title: "Design System",
    items: [
      { title: "Color Palette", href: "/design-system/colors", isNew: true },
      { title: "Typography", href: "/design-system/typography", isNew: true },
      { title: "Components", href: "/design-system/components", isNew: true },
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
  const currentHref = slug === "" ? "/" : `/${slug}`;
  for (const section of navigation) {
    if (section.href === currentHref) {
      return { section, item: { title: section.title, href: section.href } };
    }
    for (const item of section.items) {
      if (item.href === currentHref) {
        return { section, item };
      }
    }
  }
  return null;
}

function allNavItems() {
  return navigation.flatMap((s) =>
    s.href && s.items.length === 0
      ? [{ title: s.title, href: s.href }]
      : s.items
  );
}

export function findAdjacentPages(slug: string) {
  const items = allNavItems();
  const currentHref = slug === "" ? "/" : `/${slug}`;
  const index = items.findIndex((item) => item.href === currentHref);

  return {
    prev: index > 0 ? items[index - 1] : null,
    next: index < items.length - 1 ? items[index + 1] : null,
  };
}
