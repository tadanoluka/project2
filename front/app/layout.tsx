import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { montserrat } from "@/fonts/fonts";

export const metadata: Metadata = {
  title: "Next.js",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
