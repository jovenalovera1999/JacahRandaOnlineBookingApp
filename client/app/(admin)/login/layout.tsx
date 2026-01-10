import { Metadata } from "next";
import LoginPage from "./page";

export const metadata: Metadata = {
  title: "Login Page",
};

export default function LoginLayout() {
  return (
    <>
      <LoginPage />
    </>
  );
}
