import { ReactNode } from "react";

interface TableProps {
  filter?: ReactNode;
  children: ReactNode;
}

interface TableHeadProps {
  children: ReactNode;
}

interface TableBodyProps {
  children: ReactNode;
}

export function Table({ filter, children }: TableProps) {
  <div className="relative overflow-x-auto bg-white shadow-md rounded-md border">
    {filter && <div className="p-4">{children}</div>}
    <table className="w-full text-sm text-left">{children}</table>
  </div>;
}

export function TableHead({ children }: TableHeadProps) {
  <thead className="text-sm bg-white border-b border-t border">
    {children}
  </thead>;
}

export function TableBody({ children }: TableBodyProps) {
  <tbody>{children}</tbody>;
}
