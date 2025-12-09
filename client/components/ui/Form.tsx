import { FormEvent, ReactNode } from "react";

interface FormProps {
  onSubmit?: (e: FormEvent) => void;
  children: ReactNode;
}

export default function Form({ onSubmit, children }: FormProps) {
  return (
    <>
      <form onSubmit={onSubmit}>{children}</form>
    </>
  );
}
