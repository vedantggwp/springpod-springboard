export interface NavItem {
  readonly title: string;
  readonly href: string;
  readonly isNew?: boolean;
}

export interface NavSection {
  readonly title: string;
  readonly href?: string;
  readonly items: readonly NavItem[];
}

export type Navigation = readonly NavSection[];
