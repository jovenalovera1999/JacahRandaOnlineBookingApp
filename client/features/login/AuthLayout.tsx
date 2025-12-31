"use client";

import Image from "next/image";
import CompanyLogo from "@/public/img/ui/CompanyLogo.png";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <div className="min-h-screen flex flex-row">
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-white">
          <div className="w-full max-w-md p-8 bg-white rounded-sm shadow-sm">
            <div className="flex flex-col items-center mb-6">
              <Image
                className="mb-2"
                src={CompanyLogo}
                alt="Company Logo"
                width={800}
                height={600}
              />
              <h2 className="text-2xl font-bold text-gray-800">
                Login to your account
              </h2>
            </div>
            {children}
          </div>
        </div>
        <div className="hidden lg:flex w-1/2 h-screen items-center justify-center bg-white">
          <Image
            className="object-contain w-full h-full"
            src={CompanyLogo}
            alt="Company Logo"
            width={800}
            height={600}
          />
        </div>
      </div>
    </>
  );
}
