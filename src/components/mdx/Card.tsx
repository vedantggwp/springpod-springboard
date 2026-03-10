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
        "rounded-xl border border-sp-border bg-white p-5",
        "transition-shadow duration-200",
        "hover:border-sp-teal hover:shadow-lg",
        "dark:border-white/10 dark:bg-[#161b22]",
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
      <a href={href} className="block no-underline">
        {content}
      </a>
    );
  }

  return content;
}
