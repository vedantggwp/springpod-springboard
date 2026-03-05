interface CardGridProps {
  readonly children: React.ReactNode;
  readonly columns?: 2 | 3;
}

export default function CardGrid({ children, columns = 2 }: CardGridProps) {
  const gridCols =
    columns === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2";
  return (
    <div className={`my-6 grid ${gridCols} gap-4`}>
      {children}
    </div>
  );
}
