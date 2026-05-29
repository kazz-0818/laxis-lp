import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import {
  LayoutDashboard,
  Users,
  Receipt,
  MessageCircle,
  TrendingUp,
  Calendar,
  Package,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { gsap, registerGsap } from '../../lib/gsap'
import { SectionTitle } from '../ui/SectionTitle'
import { SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

const HubScene = lazy(() => import('../3d/HubScene').then((m) => ({ default: m.HubScene })))

const features: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: LayoutDashboard, title: '専用管理画面', desc: 'スマホで確認できるダッシュボードとKPI。' },
  { icon: Users, title: '顧客管理', desc: '情報・契約・対応履歴の一元管理。' },
  { icon: Receipt, title: '売上・請求', desc: '自動集計・PDF発行・入金確認。' },
  { icon: MessageCircle, title: 'LINE連携', desc: '予約通知・リマインド・自動通知。' },
  { icon: TrendingUp, title: '営業管理', desc: '見込み客・商談進捗の見える化。' },
  { icon: Calendar, title: '予約・受付', desc: '空き枠・QR受付・キャンセル処理。' },
  { icon: Package, title: '在庫・商品', desc: 'SKU管理・販売状況の把握。' },
  { icon: Sparkles, title: 'AI活用', desc: '返信・議事録・マニュアル検索。' },
]

export function LaxisHubSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [gather, setGather] = useState(0)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    if (reduced || mobile || !sectionRef.current || !cardsRef.current) return

    registerGsap()
    const cards = cardsRef.current.querySelectorAll('[data-hub-card]')

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'center center',
          scrub: 1,
          onUpdate: (self) => setGather(self.progress),
        },
      }).fromTo(
        cards,
        { opacity: 0.4, scale: 0.85 },
        { opacity: 1, scale: 1, stagger: 0.06, ease: 'power2.out' },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced, mobile])

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.hub}
      className="section-pad relative min-h-screen bg-navy-950 text-white overflow-hidden"
    >
      <div className="absolute inset-0 grid-floor opacity-70" />
      <div className="absolute inset-0 noise" />

      <div className="container-wide relative z-10">
        <SectionTitle
          light
          label="Hub"
          title="バラバラな業務を整理し、会社に合った仕組みへ。"
          description="Laxis Hub — 現場のツールをつなぎ、業務を一元化します。"
        />

        <div className="relative mx-auto max-w-5xl">
          <div className="relative h-[340px] sm:h-[480px] mb-12">
            <Suspense fallback={<div className="absolute inset-0 animate-pulse bg-navy-800/50 rounded-3xl" />}>
              <HubScene className="absolute inset-0 w-full h-full" gatherProgress={gather} />
            </Suspense>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10">
              <p className="text-mint-400 text-xs font-bold tracking-[0.3em]">CORE</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Laxis Hub</p>
            </div>

            {!mobile && (
              <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" aria-hidden>
                <circle
                  cx="50%"
                  cy="50%"
                  r="38%"
                  fill="none"
                  stroke="#5eead4"
                  strokeWidth="1"
                  strokeDasharray="8 12"
                  style={{ animation: reduced ? undefined : 'orbit 60s linear infinite', transformOrigin: 'center' }}
                />
              </svg>
            )}
          </div>

          <div
            ref={cardsRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
          >
            {features.map((f) => (
              <div
                key={f.title}
                data-hub-card
                className="glass-neon rounded-xl p-4 transition-all duration-300 hover:-translate-y-2 hover:border-mint-400/50 hover:shadow-lg hover:shadow-cyan-500/20 cursor-default"
              >
                <f.icon className="text-mint-400 mb-2" size={20} />
                <h3 className="font-bold text-sm text-white mb-1">{f.title}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
