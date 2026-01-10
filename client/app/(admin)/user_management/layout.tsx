import { Metadata } from "next";
import UserManagementPage from "./page";

export const metadata: Metadata = {
  title: "User Management",
};

export default function UserManagementLayout() {
  return (
    <>
      <UserManagementPage />
    </>
  );
}
