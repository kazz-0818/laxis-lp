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
        { rotateX: 10, y: 80, scale: 0.92, opacity: 0.5 },
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
        className="preserve-3d rounded-2xl overflow-hidden border border-slate-200/90 shadow-[0_32px_64px_-16px_rgba(15,39,68,0.12)] bg-white will-change-transform"
      >
        <div className="flex min-h-[500px] sm:min-h-[560px]">
          <aside className="hidden md:flex flex-col w-52 border-r border-slate-100 bg-slate-50/80 p-4">
            <p className="text-xs font-bold text-cyan-600 mb-1">Laxis Hub</p>
            <p className="text-[10px] text-slate-400 mb-6">管理画面</p>
            {nav.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm mb-1 ${
                  item.active
                    ? 'bg-cyan-50 text-cyan-700 border border-cyan-200/80 font-medium'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </div>
            ))}
          </aside>

          <div className="flex-1 p-4 sm:p-6 overflow-hidden bg-white">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-navy-900 font-bold">ダッシュボード</h3>
                <p className="text-[10px] text-slate-400">2026年5月 · リアルタイム</p>
              </div>
              <div className="relative">
                <Bell size={18} className="text-cyan-600" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-mint-400 rounded-full" />
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 mb-5">
              {kpis.map((k) => (
                <div
                  key={k.label}
                  className="rounded-xl bg-slate-50 border border-slate-100 p-3 shadow-sm"
                >
                  <p className="text-[9px] text-slate-400 truncate">{k.label}</p>
                  <p className="text-sm font-bold text-navy-900 truncate">{k.value}</p>
                  <p className={`text-[9px] ${k.up ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {k.delta}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 rounded-xl bg-slate-50 border border-slate-100 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={14} className="text-cyan-600" />
                  <p className="text-xs text-slate-500 font-medium">売上推移</p>
                </div>
                <div className="h-32 flex items-end gap-1.5">
                  {[52, 65, 48, 78, 88, 95, 100].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t bg-linear-to-t from-cyan-200 to-cyan-500"
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-[8px] text-slate-400">{i + 1}月</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 shadow-sm">
                <p className="text-xs text-slate-500 font-medium mb-2">売上構成</p>
                <div className="relative w-24 h-24 mx-auto">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#2dd4bf"
                      strokeWidth="12"
                      strokeDasharray="175 251"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="12"
                      strokeDasharray="76 251"
                      strokeDashoffset="-175"
                    />
                  </svg>
                </div>
                <p className="text-[10px] text-center text-slate-400 mt-2">新規70% / リピート30%</p>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 shadow-sm">
                <p className="text-xs text-slate-500 font-medium mb-2">担当者別成績</p>
                {[
                  { n: '田中', v: 92 },
                  { n: '佐藤', v: 74 },
                  { n: '鈴木', v: 58 },
                ].map((s) => (
                  <div key={s.n} className="flex items-center gap-2 mb-2 text-[10px]">
                    <span className="w-8 text-slate-500">{s.n}</span>
                    <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-500 rounded-full"
                        style={{ width: `${s.v}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 shadow-sm">
                <p className="text-xs text-slate-500 font-medium mb-2">通知ログ</p>
                <ul className="space-y-2 text-[10px] text-slate-600">
                  <li className="flex justify-between">
                    <span>LINE 予約リマインド</span>
                    <span className="text-cyan-600">10:32</span>
                  </li>
                  <li className="flex justify-between">
                    <span>PDF 報酬明細 発行</span>
                    <span className="text-mint-600">09:15</span>
                  </li>
                  <li className="flex justify-between">
                    <span>入金確認 A社</span>
                    <span className="text-slate-400">昨日</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 shadow-sm">
                <p className="text-xs text-slate-500 font-medium mb-2">PDF発行履歴</p>
                <ul className="space-y-2 text-[10px]">
                  <li className="flex justify-between text-slate-600">
                    <span>報酬明細 B社</span>
                    <span className="text-cyan-600">本日</span>
                  </li>
                  <li className="flex justify-between text-slate-600">
                    <span>請求書 C社</span>
                    <span className="text-emerald-600">完了</span>
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
