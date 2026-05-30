import { useRef } from 'react'
import { SectionLabel } from '../ui/SectionLabel'
import { DashboardMock } from '../ui/DashboardMock'
import { useSectionAnimation } from '../../hooks/useSceneProgress'

export function DashboardSection() {
  const ref = useRef<HTMLElement>(null)
  useSectionAnimation(ref)

  return (
    <section
      ref={ref}
      data-scene="dashboard"
      className="scene-section relative min-h-screen overflow-hidden scene-scrim py-32"
    >
      {/* Light overlay from bulb */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_20%_30%,rgba(255,242,184,0.08)_0%,transparent_60%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div data-animate>
          <SectionLabel number="07" label="Dashboard" className="mb-6" />
        </div>
        <h2 data-animate className="text-3xl font-bold text-text-primary md:text-5xl">
          整えた業務は、
          <br />
          <span className="text-accent-cyan">見える</span>ようになる。
        </h2>

        <div data-animate className="mt-12">
          <DashboardMock />
        </div>
      </div>
    </section>
  )
}
