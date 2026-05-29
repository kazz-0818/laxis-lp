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
import { ChapterShell } from '../ui/ChapterShell'
import { GridBackground } from '../ui/GridBackground'
import { NoiseBackground } from '../ui/NoiseBackground'
import { SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

const HubScene = lazy(() => import('../3d/HubScene').then((m) => ({ default: m.HubScene })))

const features: { icon: LucideIcon; title: string; desc: string; angle: number }[] = [
  { icon: LayoutDashboard, title: '専用管理画面', desc: 'ダッシュボードとKPI', angle: 0 },
  { icon: Users, title: '顧客管理', desc: '契約・対応履歴', angle: 45 },
  { icon: Receipt, title: '売上・請求', desc: 'PDF・入金確認', angle: 90 },
  { icon: MessageCircle, title: 'LINE連携', desc: '予約・リマインド', angle: 135 },
  { icon: TrendingUp, title: '営業管理', desc: '商談・成績', angle: 180 },
  { icon: Calendar, title: '予約・受付', desc: '空き枠・QR', angle: 225 },
  { icon: Package, title: '在庫・商品', desc: 'SKU・販売状況', angle: 270 },
  { icon: Sparkles, title: 'AI活用', desc: '返信・議事録', angle: 315 },
]

export function LaxisHubSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const [gather, setGather] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    if (reduced || mobile || !sectionRef.current || !orbitRef.current) return

    registerGsap()
    const cards = orbitRef.current.querySelectorAll('[data-orbit-card]')

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 40%',
          end: 'center center',
          scrub: 1,
          onUpdate: (self) => setGather(self.progress),
        },
      }).fromTo(
        cards,
        { opacity: 0, scale: 0.6 },
        { opacity: 1, scale: 1, stagger: 0.05, ease: 'power3.out' },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced, mobile])

  const radius = mobile ? 0 : 200 + gather * -80

  return (
    <ChapterShell id={SECTION_IDS.hub} chapter="Hub" chapterNum="06" theme="dark" minHeight="min-h-screen">
      <GridBackground />
      <NoiseBackground />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />

      <div ref={sectionRef} className="section-pad relative z-10 pt-16">
        <div className="container-wide">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white text-center max-w-4xl mx-auto leading-tight">
            バラバラな業務を整理し、
            <br />
            <span className="text-shine">会社に合った仕組み</span>へ。
          </h2>
          <p className="text-center text-slate-400 mt-4 max-w-2xl mx-auto">
            Laxis Hub — 顧客・売上・予約・営業・在庫・AIを、ひとつの中心につなぎます。
          </p>

          <div className="relative mx-auto mt-12 max-w-4xl">
            <div className="relative h-[380px] sm:h-[520px]">
              {!mobile && (
                <Suspense fallback={null}>
                  <HubScene className="absolute inset-0" gatherProgress={gather} />
                </Suspense>
              )}

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center pointer-events-none">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-linear-to-br from-navy-800 to-navy-900 border-2 border-mint-400/50 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(45,212,191,0.35)]">
                  <p className="text-[10px] text-mint-400 tracking-widest">CORE</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-white">Laxis</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-white -mt-1">Hub</p>
                </div>
              </div>

              <div ref={orbitRef} className="absolute inset-0 hidden lg:block">
                <svg className="absolute inset-0 w-full h-full opacity-30" aria-hidden>
                  {features.map((f) => {
                    const rad = (f.angle * Math.PI) / 180
                    const cx = 50 + Math.cos(rad) * 38
                    const cy = 50 + Math.sin(rad) * 38
                    return (
                      <line
                        key={f.title}
                        x1="50%"
                        y1="50%"
                        x2={`${cx}%`}
                        y2={`${cy}%`}
                        stroke="#2dd4bf"
                        strokeWidth="1"
                        strokeDasharray="4 6"
                        opacity={0.4 + gather * 0.5}
                      />
                    )
                  })}
                </svg>

                {features.map((f, i) => {
                  const rad = ((f.angle - 90) * Math.PI) / 180
                  const r = radius
                  const x = Math.cos(rad) * r
                  const y = Math.sin(rad) * r
                  return (
                    <div
                      key={f.title}
                      data-orbit-card
                      className="absolute left-1/2 top-1/2 w-44 transition-all duration-500 will-change-transform"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${hovered === i ? 1.08 : 1})`,
                        zIndex: hovered === i ? 30 : 10,
                      }}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <div className="glass-neon rounded-xl p-4 border border-cyan-400/30 hover:border-mint-400/60 hover:shadow-lg hover:shadow-cyan-500/20">
                        <f.icon className="text-mint-400 mb-2" size={18} />
                        <h3 className="font-bold text-sm text-white">{f.title}</h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">{f.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:hidden mt-6">
              {features.map((f) => (
                <div key={f.title} className="glass-neon rounded-xl p-3">
                  <f.icon className="text-mint-400 mb-1" size={16} />
                  <h3 className="font-bold text-xs text-white">{f.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ChapterShell>
  )
}
