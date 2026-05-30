import { useRef } from 'react'
import { useCases } from '../../data/useCases'
import { SectionLabel } from '../ui/SectionLabel'
import { GlassCard } from '../ui/GlassCard'
import { useSectionAnimation } from '../../hooks/useSceneProgress'

export function UseCaseSection() {
  const ref = useRef<HTMLElement>(null)
  useSectionAnimation(ref)

  return (
    <section
      ref={ref}
      data-scene="useCase"
      className="scene-section relative min-h-screen bg-bg-navy py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div data-animate>
          <SectionLabel number="08" label="Use Case" className="mb-6" />
        </div>
        <h2 data-animate className="text-3xl font-bold text-text-primary md:text-5xl">
          現場の負担を、
          <br />
          具体的に減らす。
        </h2>

        <div className="mt-16 space-y-16">
          {useCases.map((uc) => (
            <div key={uc.industry} data-animate className="grid gap-8 md:grid-cols-2">
              <GlassCard className="opacity-60">
                <span className="text-xs uppercase tracking-widest text-text-muted">Before</span>
                <h3 className="mt-2 text-lg font-semibold text-text-primary">{uc.industry}</h3>
                <p className="mt-4 text-sm leading-relaxed text-text-muted">{uc.before}</p>
              </GlassCard>
              <GlassCard glow>
                <span className="text-xs uppercase tracking-widest text-accent-cyan">After</span>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{uc.after}</p>
                <p className="mt-4 text-sm font-medium text-light-warm">成果: {uc.result}</p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
