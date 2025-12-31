import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastMessageProvider } from "@/hooks/useToastMessage";
import { GoogleAuthProvider } from "@/context/GoogleAuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book a Room",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased custom-scrollbar`}
      >
        <ToastMessageProvider>
          <GoogleAuthProvider>{children}</GoogleAuthProvider>
        </ToastMessageProvider>
      </body>
    </html>
  );
}
