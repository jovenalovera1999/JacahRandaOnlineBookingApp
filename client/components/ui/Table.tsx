"use client";

import { ReactNode } from "react";

interface TableProps {
  className?: string;
  filter?: ReactNode;
  children: ReactNode;
}

interface TableHeadProps {
  className?: string;
  children: ReactNode;
}

interface TableBodyProps {
  className?: string;
  children: ReactNode;
}

interface TableRowProps {
  className?: string;
  children: ReactNode;
}

interface TableCellProps {
  colSpan?: number;
  className?: string;
  isHeader?: boolean;
  children: ReactNode;
}

export function Table({ className, filter, children }: TableProps) {
  return (
    <div className="relative overflow-x-auto bg-white shadow-md rounded-md">
      {filter && <div className="p-4">{filter}</div>}
      <table className={`w-full text-sm text-left ${className}`}>
        {children}
      </table>
    </div>
  );
}

export function TableHead({ className, children }: TableHeadProps) {
  return <thead className={`bg-blue-100 ${className}`}>{children}</thead>;
}

export function TableBody({ className, children }: TableBodyProps) {
  return <tbody className={`${className}`}>{children}</tbody>;
}

export function TableRow({ className, children }: TableRowProps) {
  return (
    <tr
      className={`border-b border-gray-100 items-center justify-center ${className}`}
    >
      {children}
    </tr>
  );
}

export function TableCell({
  colSpan,
  className,
  isHeader,
  children,
}: TableCellProps) {
  const CellTag = isHeader ? "th" : "td";
  return (
    <CellTag
      className={`text-gray-800 ${
        isHeader ? "px-6 py-3 text-xs font-semibold" : "px-6 py-4 text-sm"
      } ${className}`}
      colSpan={colSpan}
    >
      {children}
    </CellTag>
  );
}
