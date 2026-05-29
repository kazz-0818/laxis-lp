import { useEffect, useRef } from 'react'
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Bell,
  FileText,
  MessageCircle,
  Settings,
  TrendingUp,
} from 'lucide-react'
import { gsap, registerGsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

const nav = [
  { icon: LayoutDashboard, label: 'ホーム', active: true },
  { icon: Users, label: '顧客' },
  { icon: BarChart3, label: '売上' },
  { icon: MessageCircle, label: 'LINE' },
  { icon: FileText, label: 'PDF' },
  { icon: Settings, label: '設定' },
]

const kpis = [
  { label: '今月売上', value: '¥4,280,000', delta: '+12.4%', up: true },
  { label: '粗利', value: '¥1,620,000', delta: '+8.2%', up: true },
  { label: '未入金', value: '¥340,000', delta: '3件', up: false },
  { label: '成約数', value: '28', delta: '+5', up: true },
  { label: '対応漏れ', value: '0', delta: '前月比-4', up: true },
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
        { rotateX: 14, y: 100, scale: 0.88, opacity: 0.4 },
        {
          rotateX: 2,
          y: 0,
          scale: 1,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top 88%',
            end: 'center 50%',
            scrub: 1.2,
          },
        },
      )
    })
    return () => ctx.revert()
  }, [reduced, mobile])

  return (
    <div className="perspective-1200 w-full max-w-5xl mx-auto">
      <div
        ref={wrapRef}
        className="preserve-3d rounded-2xl overflow-hidden border border-white/15 shadow-[0_40px_80px_-20px_rgba(6,182,212,0.35)] bg-navy-950 will-change-transform"
      >
        <div className="flex min-h-[500px] sm:min-h-[560px]">
          <aside className="hidden md:flex flex-col w-52 border-r border-white/10 bg-navy-950/90 p-4">
            <p className="text-xs font-bold text-mint-400 mb-1">Laxis Hub</p>
            <p className="text-[10px] text-slate-500 mb-6">管理画面</p>
            {nav.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm mb-1 ${
                  item.active
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/25'
                    : 'text-slate-500'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </div>
            ))}
          </aside>

          <div className="flex-1 p-4 sm:p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-white font-bold">ダッシュボード</h3>
                <p className="text-[10px] text-slate-500">2026年5月 · リアルタイム</p>
              </div>
              <Bell size={18} className="text-cyan-400" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 mb-5">
              {kpis.map((k) => (
                <div key={k.label} className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <p className="text-[9px] text-slate-500 truncate">{k.label}</p>
                  <p className="text-sm font-bold text-white truncate">{k.value}</p>
                  <p className={`text-[9px] ${k.up ? 'text-emerald-400' : 'text-amber-400'}`}>{k.delta}</p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={14} className="text-cyan-400" />
                  <p className="text-xs text-slate-400">売上推移</p>
                </div>
                <div className="h-32 flex items-end gap-1.5">
                  {[52, 65, 48, 78, 88, 95, 100].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t bg-linear-to-t from-cyan-700 to-mint-400"
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-[8px] text-slate-600">{i + 1}月</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs text-slate-400 mb-2">売上構成</p>
                <div className="relative w-24 h-24 mx-auto">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="12" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#2dd4bf" strokeWidth="12" strokeDasharray="175 251" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="12" strokeDasharray="76 251" strokeDashoffset="-175" />
                  </svg>
                </div>
                <p className="text-[10px] text-center text-slate-500 mt-2">新規70% / リピート30%</p>
              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs text-slate-400 mb-2">担当者別成績</p>
                {[
                  { n: '田中', v: 92 },
                  { n: '佐藤', v: 74 },
                  { n: '鈴木', v: 58 },
                ].map((s) => (
                  <div key={s.n} className="flex items-center gap-2 mb-2 text-[10px]">
                    <span className="w-8 text-slate-400">{s.n}</span>
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${s.v}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs text-slate-400 mb-2">通知ログ</p>
                <ul className="space-y-2 text-[10px] text-slate-300">
                  <li className="flex justify-between"><span>LINE 予約リマインド</span><span className="text-cyan-400">10:32</span></li>
                  <li className="flex justify-between"><span>PDF 報酬明細 発行</span><span className="text-mint-400">09:15</span></li>
                  <li className="flex justify-between"><span>入金確認 A社</span><span className="text-slate-500">昨日</span></li>
                </ul>
              </div>

              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs text-slate-400 mb-2">進捗リスト</p>
                <ul className="space-y-2 text-[10px]">
                  <li className="flex justify-between text-slate-300"><span>C社 契約書</span><span className="text-cyan-400">進行中</span></li>
                  <li className="flex justify-between text-slate-300"><span>D社 ヒアリング</span><span className="text-emerald-400">完了</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
