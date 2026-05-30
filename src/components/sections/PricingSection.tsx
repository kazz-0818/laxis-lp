import { useRef } from 'react'
import { pricingPlans } from '../../data/pricing'
import { site } from '../../data/site'
import { SectionLabel } from '../ui/SectionLabel'
import { GlowButton } from '../ui/GlowButton'
import { useSectionAnimation } from '../../hooks/useSceneProgress'

export function PricingSection() {
  const ref = useRef<HTMLElement>(null)
  useSectionAnimation(ref)

  return (
    <section
      ref={ref}
      id="pricing"
      data-scene="pricing"
      className="scene-section relative min-h-screen bg-bg-deep py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div data-animate>
          <SectionLabel number="09" label="Pricing" className="mb-6" />
        </div>
        <h2 data-animate className="text-3xl font-bold text-text-primary md:text-5xl">
          料金
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              data-animate
              className={`relative rounded-2xl border p-6 transition-all ${
                plan.featured
                  ? 'scale-105 border-accent-cyan/50 bg-accent-cyan/5 shadow-[0_0_60px_rgba(255,242,184,0.15)]'
                  : 'border-white/10 bg-white/[0.03] shadow-[0_0_40px_rgba(255,242,184,0.05)]'
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-cyan/20 px-3 py-0.5 text-[10px] font-medium uppercase tracking-widest text-accent-cyan">
                  Recommended
                </span>
              )}
              <h3 className="text-lg font-bold text-text-primary">{plan.name}</h3>
              <p className="mt-2 text-2xl font-black text-light-warm">{plan.range}</p>
              <p className="mt-4 text-xs leading-relaxed text-text-muted">{plan.description}</p>
            </div>
          ))}
        </div>

        <div data-animate className="mt-12 text-center">
          <GlowButton href={site.cta.contact}>無料相談する</GlowButton>
        </div>
      </div>
    </section>
  )
}
