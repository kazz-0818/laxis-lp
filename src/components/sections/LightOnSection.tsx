import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '../ui/SectionLabel'

gsap.registerPlugin(ScrollTrigger)

export function LightOnSection() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: true,
      },
    })

    tl.fromTo(
      section.querySelector('[data-flash]'),
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5 },
    ).to(section.querySelectorAll('[data-fade-card]'), {
      opacity: 0,
      scale: 0.8,
      stagger: 0.1,
    })

    tl.fromTo(
      section.querySelector('[data-glow-line]'),
      { stroke: '#8fa3b8' },
      { stroke: '#fff2b8', duration: 0.3 },
      0,
    )
  }, [])

  return (
    <section
      ref={ref}
      data-scene="lightOn"
      className="scene-section relative flex min-h-screen items-center overflow-hidden scene-scrim py-32"
    >
      {/* Flash glow */}
      <div
        data-flash
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,242,184,0.15)_0%,transparent_70%)]"
        aria-hidden
      />

      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
        <path
          data-glow-line
          d="M200,300 Q500,150 800,400"
          fill="none"
          stroke="#8fa3b8"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>

      {/* Cards that fade away */}
      {[
        { label: 'Excel', top: '22%', left: '15%' },
        { label: '手作業', top: '35%', left: '65%' },
        { label: '属人化', top: '55%', left: '30%' },
      ].map(({ label, top, left }) => (
        <div
          key={label}
          data-fade-card
          className="absolute rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-text-muted backdrop-blur-sm"
          style={{ top, left }}
        >
          {label}
        </div>
      ))}

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <SectionLabel number="03" label="Light On" className="mb-6" />
        <p className="text-sm text-text-muted">とりあえずシステム化は、失敗の元。</p>
        <h2 className="mt-4 text-3xl font-bold leading-tight text-text-primary md:text-5xl">
          システムを作る前に、
          <br />
          <span className="text-light-warm">業務を整える。</span>
        </h2>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-text-muted md:text-base">
          業務が整理されていない状態でシステムだけを導入しても、混乱が拡大するだけです。
          LAXISは、今の作業をそのままシステム化するのではなく、まず業務そのものを整理します。
        </p>
      </div>

      <div className="h-[30vh]" aria-hidden />
    </section>
  )
}
