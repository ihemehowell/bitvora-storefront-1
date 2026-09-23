import { Nav } from "@/components/Nav";
import { FAQ } from "@/components/FAQ";
import { PremiumFooter } from "@/components/PremiumFooter";
import { Pricing } from "@/components/Pricing";

export default function PricingPage() {
  return (
    <main className="bg-paper text-ink">
      <Nav />
      <Pricing />
      <FAQ />
      <PremiumFooter />
    </main>
  );
}