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

    const { data: merchant } = user
    ? await supabase.from('merchants').select('is_owner, is_suspended, full_name, avatar_url').eq('user_id', user.id).single()
    : { data: null };

  return (
    <html lang="en">
      <body className="antialiased bg-paper text-ink">
        <Shell
        userEmail={user?.email ?? null}
        isOwner={!!merchant?.is_owner}
        merchantName={merchant?.full_name}
        avatarUrl={merchant?.avatar_url}
      >
  {children}
</Shell>
      </body>
    </html>
  );
}