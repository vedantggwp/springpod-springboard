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
        "rounded-xl border border-[#B9BEC9] bg-white p-5",
        "transition-shadow duration-200",
        "hover:border-[#0BB3B7] hover:shadow-lg",
        "dark:border-white/10 dark:bg-[#161b22]",
        "dark:hover:border-[#0BB3B7]",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <span className="mt-0.5 shrink-0 text-[#0BB3B7]">{icon}</span>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="mb-1 text-lg font-medium text-[#16254C] dark:text-white">
            {title}
          </h3>
          <div className="text-sm text-[#5C6682] dark:text-white/60">
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
