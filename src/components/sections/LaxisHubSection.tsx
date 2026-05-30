import { useRef } from 'react'
import { SectionLabel } from '../ui/SectionLabel'
import { HubScene } from '../three/HubScene'
import { useSceneStore } from '../../store/sceneStore'

export function LaxisHubSection() {
  const ref = useRef<HTMLElement>(null)
  const hubProgress = useSceneStore((s) => s.hubProgress)

  return (
    <section
      ref={ref}
      id="hub"
      data-scene="hub"
      className="scene-section scene-pin relative min-h-screen bg-bg-deep"
    >
      <div className="grid-bg absolute inset-0 opacity-30" aria-hidden />

      <div className="flex min-h-screen flex-col items-center justify-center py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <SectionLabel number="06" label="Laxis Hub" className="mb-6 justify-center" />
          <h2 className="text-3xl font-bold text-text-primary md:text-5xl">
            バラバラな業務を、
            <br />
            <span className="glow-text text-light-warm">ひとつのHub</span>へ。
          </h2>
        </div>

        <div className="mt-8 w-full max-w-3xl px-6">
          <HubScene progress={hubProgress} />
        </div>
      </div>
    </section>
  )
}
