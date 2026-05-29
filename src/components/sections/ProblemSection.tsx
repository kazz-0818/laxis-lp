import { useEffect, useRef } from 'react'
import { UserX, LayoutGrid, Hand, AlertTriangle, HelpCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { gsap, registerGsap } from '../../lib/gsap'
import { SectionTitle } from '../ui/SectionTitle'
import { SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

const problems: { icon: LucideIcon; title: string; desc: string; scatter: { x: number; y: number; r: number } }[] = [
  { icon: UserX, title: '属人化', desc: '担当者しかわからない作業。引き継ぎに時間がかかる。', scatter: { x: -120, y: -80, r: -8 } },
  { icon: LayoutGrid, title: '管理がバラバラ', desc: '顧客・売上・予約・請求が別管理。', scatter: { x: 140, y: -60, r: 6 } },
  { icon: Hand, title: '手作業が多い', desc: '転記・集計・PDF・LINE連絡が毎回手作業。', scatter: { x: -100, y: 100, r: 10 } },
  { icon: AlertTriangle, title: 'ミスや漏れ', desc: '入力漏れ・通知漏れ・請求漏れが起きやすい。', scatter: { x: 130, y: 90, r: -12 } },
  { icon: HelpCircle, title: '何から始める？', desc: 'DXに興味はあるが、どこから手をつけるか不明。', scatter: { x: 0, y: 140, r: 5 } },
]

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    if (reduced || mobile || !sectionRef.current || !cardsRef.current) return

    registerGsap()
    const cards = cardsRef.current.querySelectorAll('[data-problem-card]')

    const ctx = gsap.context(() => {
      gsap.set(cards, {
        opacity: 0.3,
        scale: 0.92,
      })

      cards.forEach((card, i) => {
        const s = problems[i]?.scatter ?? { x: 0, y: 0, r: 0 }
        gsap.set(card, { x: s.x, y: s.y, rotation: s.r })
      })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'center center',
          scrub: 1,
        },
      }).to(cards, {
        x: 0,
        y: 0,
        rotation: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced, mobile])

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.problems}
      className="section-pad relative bg-navy-950 text-white overflow-hidden min-h-screen flex items-center"
    >
      <div className="absolute inset-0 grid-floor opacity-60" />
      <div className="absolute inset-0 noise" />

      <div className="container-narrow relative z-10 w-full">
        <SectionTitle
          light
          label="Chaos"
          title="その業務、まだ人の頑張りだけで回していませんか？"
          description="絡まった業務が、現場の時間と正確性を奪っています。"
        />

        <div
          ref={cardsRef}
          className="relative min-h-[480px] sm:min-h-[520px] grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 perspective-1200"
        >
          {problems.map((p) => (
            <div
              key={p.title}
              data-problem-card
              className="glass-neon rounded-2xl p-6 sm:p-7 preserve-3d transition-shadow duration-500 hover:shadow-cyan-500/25 hover:border-cyan-400/50 hover:z-10 lg:even:translate-y-6"
            >
              <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center mb-4">
                <p.icon className="text-cyan-400" size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
