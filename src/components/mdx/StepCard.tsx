import Link from "next/link";

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
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
            "bg-sp-teal",
            "text-sm font-semibold text-white",
          ].join(" ")}
        >
          {number}
        </div>
        {!isLast && (
          <div className="w-px flex-1 bg-sp-border" aria-hidden="true" />
        )}
      </div>

      {/* Card content */}
      <div
        className={[
          "mb-4 flex-1 rounded-lg border border-sp-border bg-white p-5",
          "transition-shadow duration-150 ease-out hover:shadow-sp-hover",
          "dark:border-white/10 dark:bg-card",
        ].join(" ")}
      >
        <h4 className="mb-1 text-lg font-medium text-sp-navy dark:text-white">
          {title}
        </h4>
        <div className="text-sm leading-relaxed text-sp-text-secondary dark:text-white/60">
          {children}
        </div>
        {href && cta && (
          <Link
            href={href}
            className={[
              "mt-3 inline-flex items-center gap-1.5 text-sm font-semibold",
              "text-sp-teal hover:text-sp-teal-dark transition-colors",
            ].join(" ")}
          >
            {cta}
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
