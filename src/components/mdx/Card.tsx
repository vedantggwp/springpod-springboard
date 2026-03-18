import Link from "next/link";

interface CardProps {
  readonly title: string;
  readonly children: React.ReactNode;
  readonly href?: string;
  readonly icon?: React.ReactNode;
}

export default function Card({ title, children, href, icon }: CardProps) {
  const content = (
    <div
      className={[
        "rounded-lg border border-transparent bg-white p-5 max-sm:rounded-none max-sm:border-x-0",
        "shadow-sp-box transition-shadow duration-150 ease-out",
        "hover:border-sp-teal hover:shadow-sp-hover",
        "dark:border-white/10 dark:bg-card",
        "dark:hover:border-sp-teal",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <span className="mt-0.5 shrink-0 text-sp-teal">{icon}</span>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="mb-1 text-lg font-medium text-sp-navy dark:text-white">
            {title}
          </h3>
          <div className="text-sm text-sp-text-secondary dark:text-white/60">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-sp-teal focus-visible:ring-offset-2 ring-offset-[var(--sp-ring-offset)] rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}
