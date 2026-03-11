import type { ReactNode, ComponentPropsWithoutRef } from "react";
import DataTable, {
  DataTableHead,
  DataTableBody,
  DataTableRow,
  DataTableHeader,
  DataTableCell,
} from "./DataTable";

/* -- Anchor helpers -------------------------------------------------------- */

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/** Track seen slugs to deduplicate heading IDs within a page. */
const seenSlugs = new Map<string, number>();

function uniqueSlug(base: string): string {
  const count = seenSlugs.get(base) ?? 0;
  seenSlugs.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

type WrapProps = { readonly children: ReactNode };

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Tag = `h${level}` as const;
  const sizes: Record<number, string> = {
    1: "text-4xl md:text-5xl font-medium mt-10 mb-4",
    2: "text-3xl font-semibold mt-12 mb-4",
    3: "text-2xl font-semibold mt-8 mb-4",
    4: "text-xl font-medium mt-6 mb-2",
    5: "text-lg font-medium mt-5 mb-2",
    6: "text-sm font-medium mt-4 mb-1 uppercase tracking-wide",
  };

  function Heading({
    children,
    ...props
  }: ComponentPropsWithoutRef<typeof Tag>) {
    const text = typeof children === "string" ? children : "";
    const id = props.id ?? uniqueSlug(slugify(text));
    return (
      <Tag
        id={id}
        className={`group text-foreground ${sizes[level]}`}
        {...props}
      >
        {children}
        <a
          href={`#${id}`}
          className="ml-2 text-sp-teal opacity-0 transition-opacity group-hover:opacity-100"
          aria-label={`Link to ${id}`}
        >
          #
        </a>
      </Tag>
    );
  }
  Heading.displayName = `Heading${level}`;
  return Heading;
}

/* -- Component overrides --------------------------------------------------- */

export const mdxComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),

  p: ({ children }: WrapProps) => (
    <p className="my-3 leading-relaxed text-sp-gray-700 dark:text-white/80">
      {children}
    </p>
  ),

  a: ({ href, children, ...props }: ComponentPropsWithoutRef<"a">) => (
    <a
      href={href}
      className="text-sp-teal underline-offset-2 transition-colors hover:underline dark:text-sp-teal"
      {...props}
    >
      {children}
    </a>
  ),

  hr: () => (
    <hr className="my-8 border-t border-sp-border/40 dark:border-white/10" />
  ),

  table: ({ children }: WrapProps) => <DataTable>{children}</DataTable>,
  thead: ({ children }: WrapProps) => <DataTableHead>{children}</DataTableHead>,
  tbody: ({ children }: WrapProps) => <DataTableBody>{children}</DataTableBody>,
  tr: ({ children }: WrapProps) => <DataTableRow>{children}</DataTableRow>,
  th: ({ children }: WrapProps) => <DataTableHeader>{children}</DataTableHeader>,
  td: ({ children }: WrapProps) => <DataTableCell>{children}</DataTableCell>,

  pre: ({ children }: WrapProps) => (
    <div className="group relative my-4 overflow-hidden rounded-xl border border-sp-border bg-sp-gray-50 dark:border-white/10 dark:bg-background">
      <pre className="overflow-x-auto px-6 py-4 text-sm leading-relaxed text-sp-gray-700 dark:text-white/70 [&>code]:bg-transparent [&>code]:p-0">
        {children}
      </pre>
    </div>
  ),

  code: ({
    children,
    className,
    ...props
  }: ComponentPropsWithoutRef<"code">) => {
    if (!className) {
      return (
        <code
          className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground dark:bg-white/10"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },

  ul: ({ children }: WrapProps) => (
    <ul className="my-3 ml-6 list-disc space-y-1.5 text-sp-gray-700 marker:text-sp-teal dark:text-white/80">
      {children}
    </ul>
  ),
  ol: ({ children }: WrapProps) => (
    <ol className="my-3 ml-6 list-decimal space-y-1.5 text-sp-gray-700 marker:text-sp-teal dark:text-white/80">
      {children}
    </ol>
  ),
  li: ({ children }: WrapProps) => (
    <li className="leading-relaxed">{children}</li>
  ),

  blockquote: ({ children }: WrapProps) => (
    <blockquote className="my-4 rounded-r-lg border-l-4 border-l-sp-teal bg-sp-teal-light/10 py-3 pl-4 pr-4 italic text-sp-text-secondary dark:bg-sp-teal-light/5 dark:text-white/60">
      {children}
    </blockquote>
  ),
};
