import { useEffect, useRef } from 'react'
import { gsap, registerGsap } from '../../lib/gsap'
import { SectionTitle } from '../ui/SectionTitle'
import { SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

const steps = [
  { title: '複雑な現状業務', sub: 'Chaos' },
  { title: 'ムダ・属人化の解消', sub: 'Organize' },
  { title: '最適なツール選定', sub: 'Systemize' },
  { title: 'ラクに回る仕組み', sub: 'Automate' },
]

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    if (reduced || mobile || !sectionRef.current || !trackRef.current) return

    registerGsap()
    const nodes = trackRef.current.querySelectorAll('[data-node]')

    const ctx = gsap.context(() => {
      gsap.set(nodes, { opacity: 0.25, scale: 0.9, y: 40 })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true,
        },
      }).to(nodes, {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.2,
        ease: 'power2.out',
      })

      if (lineRef.current) {
        const len = lineRef.current.getTotalLength()
        gsap.set(lineRef.current, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=150%',
            scrub: 1,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced, mobile])

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.philosophy}
      className="relative min-h-screen bg-linear-to-b from-navy-900 to-navy-950 text-white overflow-hidden"
    >
      <div className="absolute inset-0 grid-floor opacity-50" />
      <div className="absolute inset-0 noise" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px]" />

      <div className="relative z-10 min-h-screen flex flex-col justify-center section-pad">
        <div className="container-narrow">
          <SectionTitle
            light
            label="Organize"
            title={
              <>
                今の業務をそのままシステム化するのではなく、
                <br className="hidden sm:block" />
                まず業務そのものを整えます。
              </>
            }
            description="ゼロベースの業務改善。現場目線で「ラクに、正確に回る」設計を行います。"
          />

          <div ref={trackRef} className="relative mt-8">
            <svg className="absolute left-4 sm:left-8 top-0 h-full w-1 overflow-visible hidden sm:block" aria-hidden>
              <path
                ref={lineRef}
                d="M 8 20 L 8 120 L 8 220 L 8 320"
                fill="none"
                stroke="url(#philosophyGrad)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="philosophyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#2dd4bf" />
                </linearGradient>
              </defs>
            </svg>

            <div className="space-y-6 sm:space-y-8 sm:pl-16">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  data-node
                  className="glass-neon rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4 border-l-4 border-l-cyan-400/60"
                >
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-linear-to-br from-mint-500/30 to-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                    <span className="text-2xl font-black text-mint-400">{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-1">
                      {step.sub}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{step.title}</h3>
                  </div>
                  {i < steps.length - 1 && (
                    <span className="hidden sm:block ml-auto text-slate-500 text-2xl">↓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
