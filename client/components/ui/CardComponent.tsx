import { ReactNode } from "react";
import Spinner from "./Spinner";

interface CardComponentProps {
  title: string;
  children: ReactNode;
}

export default function CardComponent({ title, children }: CardComponentProps) {
  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm mb-5">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>

        {children}
      </div>
    </>
  );
}
