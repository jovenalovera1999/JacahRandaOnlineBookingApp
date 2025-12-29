import Navbar from "@/components/shared/navbar/Navbar";
import { ReactNode } from "react";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <Navbar />
      <div className="mt-24 ml-4 mr-4 mb-4 pt-4 pb-4">{children}</div>
    </>
  );
}
