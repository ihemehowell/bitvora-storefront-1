import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bitvora Storefront — Storefronts that look like your brand",
  description: "Build a beautiful, branded online store for your business in minutes. No template look, no code required.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased bg-paper text-ink">{children}</body>
    </html>
  );
}