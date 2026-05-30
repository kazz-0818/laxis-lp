import { useRef } from 'react'
import { site } from '../../data/site'
import { GlowButton } from '../ui/GlowButton'
import { SectionLabel } from '../ui/SectionLabel'
import { useSectionAnimation } from '../../hooks/useSceneProgress'

export function CTASection() {
  const ref = useRef<HTMLElement>(null)
  useSectionAnimation(ref)

  return (
    <section
      ref={ref}
      id="contact"
      data-scene="cta"
      className="scene-section relative min-h-screen overflow-hidden scene-scrim py-32"
    >
      {/* Expanded light */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,242,184,0.12)_0%,transparent_60%)]"
        aria-hidden
      />

      {/* Aligned lines */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={i}
            x1={`${20 + i * 15}%`}
            y1="0"
            x2={`${20 + i * 15}%`}
            y2="100%"
            stroke="#2dd4bf"
            strokeWidth="0.5"
          />
        ))}
      </svg>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div data-animate>
          <SectionLabel number="11" label="Contact" className="mb-6 justify-center" />
        </div>
        <h2 data-animate className="text-3xl font-bold leading-tight text-text-primary md:text-5xl">
          まずは今の業務の
          <br />
          <span className="glow-text text-light-warm">お悩み</span>をお聞かせください。
        </h2>
        <p data-animate className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-text-muted md:text-base">
          何から手をつければいいかわからない。
          今のやり方に限界を感じている。
          そんな状態からで構いません。
          LAXISが、あなたの会社の業務をゼロから整えます。
        </p>
        <div data-animate className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <GlowButton href={site.cta.contact}>無料相談する</GlowButton>
          <GlowButton href={site.cta.download} variant="secondary" id="download">
            資料を見たい
          </GlowButton>
        </div>
      </div>

      <div className="h-[25vh]" aria-hidden />
    </section>
  )
}
