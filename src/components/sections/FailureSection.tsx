import { useEffect, useRef } from 'react'
import { XCircle, MessageSquareWarning } from 'lucide-react'
import { gsap, registerGsap } from '../../lib/gsap'
import { ChapterShell } from '../ui/ChapterShell'
import { SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

const chaosItems = ['SaaS', 'Excel', 'LINE', '紙', 'Chat', 'PDF', '要件定義', '外注']

export function FailureSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
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
          end: 'bottom 30%',
          scrub: 1.2,
        },
      })
        .to(items, {
          rotation: (i) => (i % 2 === 0 ? 25 : -25),
          x: (i) => (i - 3.5) * 45,
          y: (i) => Math.sin(i * 1.2) * 30,
          scale: 0.7,
          opacity: 0.35,
          stagger: 0.04,
          ease: 'power2.inOut',
        })
        .to(clusterRef.current, { scale: 0.9, filter: 'blur(2px)' }, 0)
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced, mobile])

  return (
    <ChapterShell id={SECTION_IDS.failure} chapter="Wrong Approach" chapterNum="03" theme="light" minHeight="min-h-screen">
      <div ref={sectionRef} className="section-pad relative z-10 pt-16">
        <div className="container-narrow">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 leading-tight max-w-3xl">
            「とりあえずシステム化」は、
            <span className="text-red-500"> 失敗の元。</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl">
            業務が整理されていないまま導入すると、混乱だけが拡大します。
          </p>

          <div className="grid lg:grid-cols-3 gap-8 mt-14 items-center">
            <div className="glass-light rounded-2xl p-6 border border-slate-200/80 shadow-xl">
              <XCircle className="text-red-400 mb-3" size={28} />
              <h3 className="font-bold text-navy-900 text-lg">既存ツールが合わない</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                汎用SaaSは高額で複雑。現場の運用と噛み合わない。
              </p>
            </div>

            <div
              ref={clusterRef}
              className="relative h-80 flex items-center justify-center preserve-3d"
            >
              {chaosItems.map((label, i) => (
                <div
                  key={label}
                  data-chaos
                  className="absolute px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-navy-800 bg-white border border-slate-200 shadow-lg will-change-transform"
                  style={{
                    transform: `rotate(${(i - 4) * 10}deg) translate(${(i - 3.5) * 22}px, ${Math.sin(i) * 18}px)`,
                    zIndex: i,
                  }}
                >
                  {label}
                </div>
              ))}
            </div>

            <div className="glass-light rounded-2xl p-6 border border-slate-200/80 shadow-xl">
              <MessageSquareWarning className="text-amber-500 mb-3" size={28} />
              <h3 className="font-bold text-navy-900 text-lg">外注先に伝えづらい</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                属人化した業務が共有できず、現場とズレた成果物になる。
              </p>
            </div>
          </div>
        </div>
      </div>
    </ChapterShell>
  )
}
