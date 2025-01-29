import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/css/index.css";
import "@/css/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { MainNavbar } from "@/app/main-navbar.tsx";
import { Providers } from "@/app/providers.tsx";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Year-Week-Day Calendar Planner",
  description: "Manage all your plans for the whole year in one page overview",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <MainNavbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
