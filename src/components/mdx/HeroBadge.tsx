interface HeroBadgeProps {
  readonly children: React.ReactNode;
}

export default function HeroBadge({ children }: HeroBadgeProps) {
  return (
    <span className="inline-block rounded-full bg-gradient-to-r from-sp-teal-light/40 to-sp-teal/20 px-4 py-2 dark:from-sp-teal-light/20 dark:to-sp-teal/10">
      <span className="bg-gradient-to-r from-sp-navy to-sp-teal bg-clip-text text-sm font-medium text-transparent dark:from-sp-teal-light dark:to-sp-teal">
        {children}
      </span>
    </span>
  );
}
