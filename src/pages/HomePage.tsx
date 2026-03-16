import { lazy, Suspense } from 'react'
import { HeroSection } from '../components/hero/HeroSection'
import { ProofBar } from '../components/social/ProofBar'
import { Marquee } from '../components/social/Marquee'

const PlatformShowcase = lazy(() => import('../components/content/PlatformShowcase').then(m => ({ default: m.PlatformShowcase })))
const StepsSection = lazy(() => import('../components/steps/StepsSection').then(m => ({ default: m.StepsSection })))
const AvatarsSection = lazy(() => import('../components/social/AvatarsSection').then(m => ({ default: m.AvatarsSection })))
const FeaturesStack = lazy(() => import('../components/features/FeaturesStack').then(m => ({ default: m.FeaturesStack })))
const CertificationsSection = lazy(() => import('../components/certifications/CertificationsSection').then(m => ({ default: m.CertificationsSection })))
const IntegrationsCloud = lazy(() => import('../components/content/IntegrationsCloud').then(m => ({ default: m.IntegrationsCloud })))
const BeforeAfter = lazy(() => import('../components/content/BeforeAfter').then(m => ({ default: m.BeforeAfter })))
const RoiCalculator = lazy(() => import('../components/interactive/RoiCalculator').then(m => ({ default: m.RoiCalculator })))
const TestimonialCarousel = lazy(() => import('../components/interactive/TestimonialCarousel').then(m => ({ default: m.TestimonialCarousel })))
const PricingSection = lazy(() => import('../components/interactive/PricingSection').then(m => ({ default: m.PricingSection })))
const FaqSection = lazy(() => import('../components/interactive/FaqSection').then(m => ({ default: m.FaqSection })))
const FinalCta = lazy(() => import('../components/cta/FinalCta').then(m => ({ default: m.FinalCta })))

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProofBar />
      <Marquee />
      <Suspense fallback={null}><PlatformShowcase /></Suspense>
      <Suspense fallback={null}><StepsSection /></Suspense>
      <Suspense fallback={null}><AvatarsSection /></Suspense>
      <Suspense fallback={null}><FeaturesStack /></Suspense>
      <Suspense fallback={null}><CertificationsSection /></Suspense>
      <Suspense fallback={null}><IntegrationsCloud /></Suspense>
      <Suspense fallback={null}><BeforeAfter /></Suspense>
      <Suspense fallback={null}><RoiCalculator /></Suspense>
      <Suspense fallback={null}><TestimonialCarousel /></Suspense>
      <Suspense fallback={null}><PricingSection /></Suspense>
      <Suspense fallback={null}><FaqSection /></Suspense>
      <Suspense fallback={null}><FinalCta /></Suspense>
    </>
  )
}
