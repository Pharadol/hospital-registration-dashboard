import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Providers from "../providers/Providers";
import SideBarNav from "../components/SideBarNav";

export const metadata: Metadata = {
  title: "Registration Hospital Dashboard",
  description: "Registration Hospital Dashboard for Admin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <Providers>
          <div className="flex h-full">
            <SideBarNav />
            <main className="w-full">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
