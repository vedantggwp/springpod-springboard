interface StepCardProps {
  readonly number: number;
  readonly title: string;
  readonly href?: string;
  readonly cta?: string;
  readonly isLast?: boolean;
  readonly children: React.ReactNode;
}

export default function StepCard({
  number,
  title,
  href,
  cta,
  isLast = false,
  children,
}: StepCardProps) {
  return (
    <div className="flex gap-4">
      {/* Number column with connecting line */}
      <div className="flex flex-col items-center">
        <div
          className={[
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
            "border-2 border-[#0BB3B7] bg-[#0BB3B7]/10",
            "text-base font-bold text-[#0BB3B7]",
          ].join(" ")}
        >
          {number}
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-[#0BB3B7]/20" aria-hidden="true" />
        )}
      </div>

      {/* Card content */}
      <div
        className={[
          "mb-4 flex-1 rounded-xl border border-[#B9BEC9] bg-white p-5",
          "transition-shadow duration-200 hover:shadow-md",
          "dark:border-white/10 dark:bg-[#161b22]",
        ].join(" ")}
      >
        <h4 className="mb-1 text-lg font-medium text-[#16254C] dark:text-white">
          {title}
        </h4>
        <p className="text-sm leading-relaxed text-[#5C6682] dark:text-white/60">
          {children}
        </p>
        {href && cta && (
          <a
            href={href}
            className={[
              "mt-3 inline-flex items-center gap-1.5 text-sm font-semibold",
              "text-[#0BB3B7] hover:text-[#09999c] transition-colors",
            ].join(" ")}
          >
            {cta}
            <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </div>
  );
}
