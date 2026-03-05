export interface NavItem {
  readonly title: string;
  readonly href: string;
}

export interface NavSection {
  readonly title: string;
  readonly items: readonly NavItem[];
}

export type Navigation = readonly NavSection[];
