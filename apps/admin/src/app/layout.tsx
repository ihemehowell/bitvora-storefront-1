import type { Metadata } from "next";
import "./globals.css";
import { createClient } from "../lib/supabase/server";
import { Shell } from "../components/Shell";


export const metadata: Metadata = {
  title: "Bitvora Storefront",
  description: "Storefronts that look like your brand.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className="antialiased bg-paper text-ink">
        <Shell userEmail={user?.email ?? null}>{children}</Shell>
      </body>
    </html>
  );
}