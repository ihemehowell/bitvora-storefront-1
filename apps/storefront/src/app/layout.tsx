import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bitvora Storefront",
  description: "Storefronts that look like your brand.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}