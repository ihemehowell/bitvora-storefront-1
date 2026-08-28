import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { FeaturesGrid } from '@/components/FeaturesGrid'
import { HowItWorks } from '@/components/HowItWorks'
import { CtaBand } from '@/components/CtaBand'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
      <CtaBand />
      <Footer />
    </>
  )
}