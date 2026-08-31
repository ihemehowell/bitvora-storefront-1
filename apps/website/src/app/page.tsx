import { BentoFeatures } from "@/components/BentoFeatures";
import { CtaBand, Footer } from "@/components/CtaBandAndFooter";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Steps } from "@/components/Steps";


export default function HomePage() {
  return (
    <main className="bg-paper text-ink">
      <Nav />
      <Hero />
      <BentoFeatures />
      <Steps />
      <CtaBand />
      <Footer />
    </main>
  );
}