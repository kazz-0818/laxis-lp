import { lazy, Suspense, useEffect } from 'react'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { LightbulbFallback } from './components/three/LightbulbFallback'
import { SceneBackdrop } from './components/three/SceneBackdrop'
import { Hero } from './components/sections/Hero'
import { ChaosSection } from './components/sections/ChaosSection'
import { LightOnSection } from './components/sections/LightOnSection'
import { OrganizeSection } from './components/sections/OrganizeSection'
import { SystemizeSection } from './components/sections/SystemizeSection'
import { LaxisHubSection } from './components/sections/LaxisHubSection'
import { DashboardSection } from './components/sections/DashboardSection'
import { UseCaseSection } from './components/sections/UseCaseSection'
import { PricingSection } from './components/sections/PricingSection'
import { FAQSection } from './components/sections/FAQSection'
import { CTASection } from './components/sections/CTASection'
import { useLenisScroll } from './hooks/useLenisScroll'
import { useSceneScrollTriggers } from './hooks/useSceneProgress'
import { useIsMobile, usePrefersReducedMotion } from './hooks/useMediaQuery'
import { useSceneStore } from './store/sceneStore'

const LightbulbScene = lazy(() =>
  import('./components/three/LightbulbScene').then((m) => ({ default: m.LightbulbScene })),
)

export default function App() {
  useLenisScroll()
  useSceneScrollTriggers()

  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()
  const setShow3D = useSceneStore((s) => s.setShow3D)

  useEffect(() => {
    setShow3D(!isMobile && !reducedMotion)
  }, [isMobile, reducedMotion, setShow3D])

  return (
    <>
      <SceneBackdrop />
      <Suspense fallback={null}>
        <LightbulbScene />
      </Suspense>
      <LightbulbFallback />
      <div className="noise-overlay" aria-hidden />
      <div className="content-layer">
        <Header />
        <main>
          <Hero />
          <ChaosSection />
          <LightOnSection />
          <OrganizeSection />
          <SystemizeSection />
          <LaxisHubSection />
          <DashboardSection />
          <UseCaseSection />
          <PricingSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  )
}
