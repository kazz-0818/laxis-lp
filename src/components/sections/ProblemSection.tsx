import { useEffect, useRef } from 'react'
import { UserX, LayoutGrid, Hand, AlertTriangle, HelpCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { gsap, registerGsap } from '../../lib/gsap'
import { ChapterShell } from '../ui/ChapterShell'
import { GridBackground } from '../ui/GridBackground'
import { NoiseBackground } from '../ui/NoiseBackground'
import { ChaosMesh } from '../scenes/ChaosMesh'
import { SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

const problems: {
  icon: LucideIcon
  title: string
  desc: string
  scatter: { x: number; y: number; r: number; z: number }
}[] = [
  { icon: UserX, title: '属人化', desc: '担当者しかわからない。引き継ぎに時間がかかる。', scatter: { x: -140, y: -100, r: -12, z: 1 } },
  { icon: LayoutGrid, title: '管理がバラバラ', desc: '顧客・売上・予約・請求が別管理。', scatter: { x: 160, y: -80, r: 8, z: 2 } },
  { icon: Hand, title: '手作業が多い', desc: '転記・集計・PDF・LINEが毎回手作業。', scatter: { x: -120, y: 120, r: 14, z: 3 } },
  { icon: AlertTriangle, title: 'ミスや漏れ', desc: '入力漏れ・通知漏れ・請求漏れ。', scatter: { x: 150, y: 100, r: -10, z: 4 } },
  { icon: HelpCircle, title: '何から始める？', desc: 'DXに興味はあるが、着手点が不明。', scatter: { x: 0, y: 160, r: 6, z: 5 } },
]

export function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    if (reduced || mobile || !sectionRef.current || !stageRef.current) return

    registerGsap()
    const cards = stageRef.current.querySelectorAll('[data-problem-card]')

    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0.25, filter: 'blur(4px)' })
      cards.forEach((card, i) => {
        const s = problems[i]?.scatter
        if (!s) return
        gsap.set(card, { x: s.x, y: s.y, rotation: s.r, zIndex: s.z })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=180%',
          scrub: 1,
          pin: stageRef.current,
        },
      })

      cards.forEach((card, i) => {
        const start = i * 0.15
        tl.to(
          card,
          {
            x: 0,
            y: (i - 2) * 20,
            rotation: 0,
            opacity: i === 2 ? 1 : 0.35,
            scale: i === 2 ? 1 : 0.92,
            filter: i === 2 ? 'blur(0px)' : 'blur(2px)',
            zIndex: i === 2 ? 20 : 5,
            duration: 0.2,
          },
          start,
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced, mobile])

  return (
    <ChapterShell
      id={SECTION_IDS.problems}
      chapter="Pain"
      chapterNum="02"
      theme="dark"
      minHeight="min-h-[200vh]"
      className="!pt-0"
    >
      <GridBackground />
      <NoiseBackground />
      <div className="absolute inset-0 opacity-30">
        <ChaosMesh className="w-full h-full" />
      </div>

      <div ref={sectionRef} className="relative z-10 pt-20">
        <div className="container-narrow text-center mb-8 px-5">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight max-w-3xl mx-auto">
            その業務、まだ
            <br />
            <span className="text-shine">人の頑張りだけ</span>で回していませんか？
          </h2>
        </div>

        <div
          ref={stageRef}
          className={`relative flex items-center justify-center perspective-1200 ${
            mobile ? 'min-h-0 py-12' : 'h-[100svh]'
          }`}
        >
          <div
            className={`w-full max-w-lg mx-auto px-5 ${
              mobile ? 'grid gap-4' : 'relative h-[420px]'
            }`}
          >
            {problems.map((p) => (
              <div
                key={p.title}
                data-problem-card
                className={`w-full glass-neon rounded-2xl p-6 border border-cyan-400/20 will-change-transform ${
                  mobile ? 'relative' : 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,340px)]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center shrink-0">
                    <p.icon className="text-cyan-400" size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{p.title}</h3>
                    <p className="text-sm text-slate-400 mt-1 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ChapterShell>
  )
}
