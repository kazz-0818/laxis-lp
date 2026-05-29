import { useEffect, useRef } from 'react'
import { XCircle, MessageSquareWarning } from 'lucide-react'
import { gsap, registerGsap } from '../../lib/gsap'
import { SectionTitle } from '../ui/SectionTitle'
import { GlassCard } from '../ui/GlassCard'
import { SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

const chaosItems = ['SaaS', 'Excel', 'LINE', '紙', 'Chat', 'PDF']

export function FailureSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const clusterRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    if (reduced || mobile || !sectionRef.current || !clusterRef.current) return

    registerGsap()
    const items = clusterRef.current.querySelectorAll('[data-chaos]')

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
        },
      })
        .fromTo(
          items,
          { scale: 1, rotation: 0, opacity: 1 },
          {
            scale: 0.6,
            rotation: (i) => (i % 2 === 0 ? 45 : -45),
            opacity: 0.4,
            x: (i) => (i - 2.5) * 80,
            y: (i) => Math.sin(i) * 40,
            stagger: 0.05,
            ease: 'power2.inOut',
          },
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced, mobile])

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.failure}
      className="section-pad relative bg-white overflow-hidden"
    >
      <div className="container-narrow relative">
        <SectionTitle
          label="Warning"
          title="「とりあえずシステム化」は、失敗の元。"
          description="業務が整理されていないまま導入すると、混乱だけが拡大します。"
          align="left"
          className="max-w-3xl"
        />

        <div className="grid lg:grid-cols-3 gap-10 items-center">
          <GlassCard className="p-6" neon>
            <div className="flex gap-4">
              <XCircle className="text-red-400 shrink-0" size={28} />
              <div>
                <h3 className="font-bold text-navy-900 text-lg mb-2">既存ツールが合わない</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  汎用SaaSは機能過多。現場の運用と噛み合わず、ExcelやLINEに戻る。
                </p>
              </div>
            </div>
          </GlassCard>

          <div
            ref={clusterRef}
            className="relative h-72 sm:h-80 flex items-center justify-center preserve-3d"
            style={{ perspective: '900px' }}
          >
            {chaosItems.map((label, i) => (
              <div
                key={label}
                data-chaos
                className="absolute glass-neon px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-cyan-300 border-cyan-400/40 shadow-lg"
                style={{
                  transform: `rotate(${(i - 3) * 12}deg) translate(${(i - 2.5) * 28}px, ${Math.sin(i) * 20}px)`,
                  zIndex: i,
                }}
              >
                {label}
              </div>
            ))}
            <div className="absolute w-24 h-24 rounded-full border-2 border-dashed border-red-400/40 animate-pulse" />
          </div>

          <GlassCard className="p-6" neon>
            <div className="flex gap-4">
              <MessageSquareWarning className="text-amber-500 shrink-0" size={28} />
              <div>
                <h3 className="font-bold text-navy-900 text-lg mb-2">外注先に伝えづらい</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  属人化した業務の実態が共有できず、現場とズレたものができる。
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
