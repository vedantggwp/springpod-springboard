export interface ContentMeta {
  readonly title: string;
  readonly description?: string;
  readonly slug: string;
}

export interface TocItem {
  readonly id: string;
  readonly text: string;
  readonly level: number;
}

export interface SearchEntry {
  readonly title: string;
  readonly slug: string;
  readonly section: string;
  readonly content: string;
}
