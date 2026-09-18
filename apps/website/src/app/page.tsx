import { BentoFeatures } from "@/components/BentoFeatures";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Steps } from "@/components/Steps";
import { About } from "@/components/About";
import { WhyBitvora } from "@/components/WhyBitvora";
import { FAQ } from "@/components/FAQ";
import { PremiumFooter } from "@/components/PremiumFooter";
import { CtaBand } from "@/components/CtaBandAndFooter";

export default function HomePage() {
  return (
    <main className="bg-paper text-ink">
      <Nav />
      <Hero />
      <About />
      <BentoFeatures />
      <WhyBitvora />
      <CtaBand />
      <Steps />
      <FAQ />
      <PremiumFooter />
    </main>
  );
}