import { useRef } from 'react'
import { site } from '../../data/site'
import { GlowButton } from '../ui/GlowButton'
import { SectionLabel } from '../ui/SectionLabel'
import { FloatingBusinessCards } from '../three/FloatingBusinessCards'
import { useSectionAnimation } from '../../hooks/useSceneProgress'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  useSectionAnimation(ref)

  return (
    <section
      ref={ref}
      data-scene="hero"
      className="scene-section scene-scrim relative overflow-hidden"
    >
      <FloatingBusinessCards mode="hero" />

      <div className="hero-stage relative z-10 mx-auto max-w-6xl px-6">
        <div className="text-center">
          <div data-animate>
            <SectionLabel number="01" label="Opening" className="mb-6 justify-center" />
          </div>
          <h1
            data-animate
            className="glow-text text-[clamp(2.25rem,8vw,5.5rem)] font-black leading-[1.05] tracking-[-0.03em] text-text-primary"
          >
            不便な業務に、
            <br />
            <span className="text-light-warm">改善の光</span>を。
          </h1>
        </div>

        <div className="hero-stage__bulb-space" aria-hidden />

        <div className="text-center">
          <p
            data-animate
            className="mx-auto max-w-md text-sm leading-relaxed text-text-muted/90 md:text-base"
          >
            {site.description}
          </p>
          <div data-animate className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <GlowButton href={site.cta.contact}>無料相談する</GlowButton>
            <GlowButton href={site.cta.mechanism} variant="secondary">
              仕組みを見る
            </GlowButton>
          </div>
        </div>
      </div>
    </section>
  )
}
