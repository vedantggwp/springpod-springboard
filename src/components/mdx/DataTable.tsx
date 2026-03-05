interface DataTableProps {
  readonly children: React.ReactNode;
}

export default function DataTable({ children }: DataTableProps) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border">
      <div className="overflow-x-auto">
        <table className="w-full caption-bottom text-sm">{children}</table>
      </div>
    </div>
  );
}

export function DataTableHead({ children }: { readonly children: React.ReactNode }) {
  return (
    <thead className="border-b bg-muted/50 text-left">
      {children}
    </thead>
  );
}

export function DataTableBody({ children }: { readonly children: React.ReactNode }) {
  return <tbody className="[&_tr:last-child]:border-0">{children}</tbody>;
}

export function DataTableRow({ children }: { readonly children: React.ReactNode }) {
  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      {children}
    </tr>
  );
}

export function DataTableHeader({ children }: { readonly children: React.ReactNode }) {
  return (
    <th className="p-2 align-middle font-medium text-foreground">
      {children}
    </th>
  );
}

export function DataTableCell({ children }: { readonly children: React.ReactNode }) {
  return (
    <td className="p-2 align-middle text-muted-foreground">
      {children}
    </td>
  );
}
