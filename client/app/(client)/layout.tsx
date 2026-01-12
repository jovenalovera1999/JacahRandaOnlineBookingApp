import Contact from "@/components/shared/Contact";
import Navbar from "@/components/shared/navbar/Navbar";
import { GoogleAuthProvider } from "@/context/GoogleAuthContext";
import { ReactNode } from "react";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <GoogleAuthProvider>
        <Navbar />
        <div className="m-4 pt-4 pb-4">{children}</div>
        <Contact />
      </GoogleAuthProvider>
    </>
  );
}
