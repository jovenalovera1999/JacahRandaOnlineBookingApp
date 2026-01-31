import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Food Management",
};

interface FoodManagementLayoutProps {
  children: ReactNode;
}

export default function FoodManagementLayout({
  children,
}: FoodManagementLayoutProps) {
  return <>{children}</>;
}
