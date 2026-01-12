import { Metadata } from "next";
import LoginPage from "./page";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Login Page",
};

export default function LoginLayout() {
  return (
    <>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </>
  );
}
