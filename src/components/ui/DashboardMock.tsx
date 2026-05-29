import { useEffect, useRef } from 'react'
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Bell,
  FileText,
  MessageCircle,
  Settings,
} from 'lucide-react'
import { gsap, registerGsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

const nav = [
  { icon: LayoutDashboard, label: 'ダッシュボード', active: true },
  { icon: Users, label: '顧客' },
  { icon: BarChart3, label: '売上' },
  { icon: MessageCircle, label: 'LINE' },
  { icon: FileText, label: 'PDF' },
  { icon: Settings, label: '設定' },
]

const kpis = [
  { label: '今月売上', value: '¥4,280,000', delta: '+12.4%' },
  { label: '粗利', value: '¥1,620,000', delta: '+8.2%' },
  { label: '未入金', value: '¥340,000', delta: '3件' },
  { label: '成約数', value: '28', delta: '+5' },
  { label: '対応漏れ', value: '0', delta: '前月比-4' },
]

export function DashboardMock() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    if (reduced || mobile || !wrapRef.current) return

    registerGsap()
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapRef.current,
        { rotateX: 18, y: 80, scale: 0.92, opacity: 0.5 },
        {
          rotateX: 4,
          y: 0,
          scale: 1,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top 85%',
            end: 'center 55%',
            scrub: 1,
          },
        },
      )
    })

    return () => ctx.revert()
  }, [reduced, mobile])

  return (
    <div className="perspective-1200 w-full">
      <div
        ref={wrapRef}
        className="preserve-3d rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-cyan-500/20 bg-navy-900 will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="flex bg-navy-950 min-h-[420px] sm:min-h-[480px]">
          <aside className="hidden sm:flex flex-col w-44 border-r border-white/10 bg-navy-950/80 p-3 gap-1">
            <p className="text-[10px] text-slate-500 px-2 mb-2">Laxis Hub</p>
            {nav.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 px-2 py-2 rounded-lg text-xs ${
                  item.active
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/30'
                    : 'text-slate-500'
                }`}
              >
                <item.icon size={14} />
                {item.label}
              </div>
            ))}
          </aside>

          <div className="flex-1 p-3 sm:p-5 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white">ダッシュボード</h3>
              <Bell size={16} className="text-cyan-400" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 mb-4">
              {kpis.map((k) => (
                <div
                  key={k.label}
                  className="rounded-xl bg-white/5 border border-white/10 p-2 sm:p-3"
                >
                  <p className="text-[9px] sm:text-[10px] text-slate-500">{k.label}</p>
                  <p className="text-xs sm:text-sm font-bold text-white truncate">{k.value}</p>
                  <p className="text-[9px] text-emerald-400">{k.delta}</p>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                <p className="text-xs text-slate-400 mb-2">売上推移</p>
                <div className="h-24 flex items-end gap-1">
                  {[55, 68, 52, 78, 85, 92].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-linear-to-t from-cyan-600 to-mint-400"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                <p className="text-xs text-slate-400 mb-2">担当者別成績</p>
                {['田中', '佐藤', '鈴木'].map((name, i) => (
                  <div key={name} className="flex items-center gap-2 mb-1.5 text-[10px]">
                    <span className="w-8 text-slate-400">{name}</span>
                    <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 rounded-full"
                        style={{ width: `${90 - i * 20}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 p-3 sm:col-span-2">
                <p className="text-xs text-slate-400 mb-2">通知ログ / LINE / PDF</p>
                <ul className="space-y-1.5 text-[10px] text-slate-300">
                  <li className="flex justify-between">
                    <span>LINE 予約リマインド送信</span>
                    <span className="text-cyan-400">10:32</span>
                  </li>
                  <li className="flex justify-between">
                    <span>PDF 報酬明細 自動発行</span>
                    <span className="text-mint-400">09:15</span>
                  </li>
                  <li className="flex justify-between">
                    <span>入金確認 A社</span>
                    <span className="text-slate-500">昨日</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
