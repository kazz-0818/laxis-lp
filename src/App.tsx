import { lazy, Suspense, useEffect } from 'react'
import { SceneBackdrop } from './components/three/SceneBackdrop'
import { Header } from './components/layout/Header'
import { HeroScene } from './components/sections/HeroScene'
import { ChaosScene } from './components/sections/ChaosScene'
import { LightOnScene } from './components/sections/LightOnScene'
import { OrganizeScene } from './components/sections/OrganizeScene'
import { SystemizeScene } from './components/sections/SystemizeScene'
import { HubScene } from './components/sections/HubScene'
import { DashboardScene } from './components/sections/DashboardScene'
import { CTAScene } from './components/sections/CTAScene'
import { useLenisScroll } from './hooks/useLenisScroll'
import { useSceneScroll } from './hooks/useSceneScroll'
import { useIsMobile } from './hooks/useMediaQuery'
import { useSceneStore } from './store/sceneStore'

const SceneCanvas = lazy(() =>
  import('./components/three/SceneCanvas').then((m) => ({ default: m.SceneCanvas })),
)

export default function App() {
  useLenisScroll()
  useSceneScroll()
  const mobile = useIsMobile()
  const setShow3D = useSceneStore((s) => s.setShow3D)

  useEffect(() => {
    setShow3D(!mobile)
  }, [mobile, setShow3D])

  return (
    <>
      <SceneBackdrop />
      <Suspense fallback={null}>
        <SceneCanvas />
      </Suspense>
      <div className="scroll-layer">
        <Header />
        <main id="scroll-root" className="scroll-root">
          <div className="scroll-content">
            <HeroScene />
            <ChaosScene />
            <LightOnScene />
            <OrganizeScene />
            <SystemizeScene />
            <HubScene />
            <DashboardScene />
            <CTAScene />
          </div>
        </main>
      </div>
    </>
  )
}
