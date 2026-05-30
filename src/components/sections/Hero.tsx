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
      className="scene-section relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-deep pt-20"
    >
      <FloatingBusinessCards mode="hero" />

      {/* Particles */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-0.5 w-0.5 rounded-full bg-white/30"
            style={{ left: `${(i * 17) % 100}%`, top: `${(i * 23) % 100}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div data-animate>
          <SectionLabel number="01" label="Opening" className="mb-8 justify-center" />
        </div>
        <h1
          data-animate
          className="glow-text text-4xl font-black leading-[1.1] tracking-tight text-text-primary sm:text-6xl md:text-7xl lg:text-8xl"
        >
          不便な業務に、
          <br />
          <span className="text-light-warm">改善の光</span>を。
        </h1>
        <p data-animate className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-text-muted md:text-base">
          {site.description}
        </p>
        <div data-animate className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <GlowButton href={site.cta.contact}>無料相談する</GlowButton>
          <GlowButton href={site.cta.mechanism} variant="secondary">
            仕組みを見る
          </GlowButton>
        </div>
      </div>

      {/* Spacer for 3D bulb in center */}
      <div className="pointer-events-none h-[40vh] w-full md:h-[50vh]" aria-hidden />
    </section>
  )
}
