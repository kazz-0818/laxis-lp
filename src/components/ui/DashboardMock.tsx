import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const kpis = [
  { label: '今月売上', value: '¥4,280,000' },
  { label: '粗利', value: '¥1,920,000' },
  { label: '未入金', value: '¥340,000' },
  { label: '成約数', value: '28件' },
  { label: '対応漏れ', value: '0件' },
  { label: '担当者別成績', value: '↑ 12%' },
]

const notifications = [
  'LINE: 予約リマインド送信完了',
  'PDF: 請求書 #1042 自動発行',
  'AI: 問い合わせ返信ドラフト生成',
  'GAS: 売上集計バッチ完了',
]

export function DashboardMock() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const cards = el.querySelectorAll('[data-kpi]')
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
        },
      },
    )

    const path = el.querySelector('[data-chart-line]')
    if (path) {
      const len = (path as SVGPathElement).getTotalLength?.() ?? 300
      gsap.fromTo(
        path,
        { strokeDasharray: len, strokeDashoffset: len },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: el, start: 'top 70%' },
        },
      )
    }
  }, [])

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border border-white/10 bg-bg-slate shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
      style={{ transform: 'perspective(1200px) rotateX(4deg) rotateY(-6deg)' }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-bg-navy/80 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="ml-3 text-xs text-text-muted">Laxis Hub Dashboard</span>
      </div>

      <div className="grid gap-4 p-4 md:grid-cols-3 md:p-6">
        {/* KPI grid */}
        <div className="col-span-2 grid grid-cols-2 gap-3 md:grid-cols-3">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              data-kpi
              className="rounded-lg border border-white/8 bg-white/[0.03] p-3"
            >
              <p className="text-[10px] text-text-muted">{kpi.label}</p>
              <p className="mt-1 text-sm font-semibold text-text-primary md:text-base">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="rounded-lg border border-white/8 bg-white/[0.03] p-3">
          <p className="text-[10px] text-text-muted">売上推移</p>
          <svg viewBox="0 0 200 80" className="mt-2 w-full">
            <path
              data-chart-line
              d="M0,60 L30,55 L60,45 L90,50 L120,30 L150,25 L180,15 L200,10"
              fill="none"
              stroke="#2dd4bf"
              strokeWidth="2"
            />
            <path
              d="M0,60 L30,55 L60,45 L90,50 L120,30 L150,25 L180,15 L200,10 L200,80 L0,80 Z"
              fill="url(#chartFill)"
              opacity="0.2"
            />
            <defs>
              <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2dd4bf" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Notification log */}
        <div className="col-span-2 rounded-lg border border-white/8 bg-white/[0.03] p-3">
          <p className="text-[10px] text-text-muted">LINE通知ログ / PDF発行履歴</p>
          <div className="mt-2 space-y-2">
            {notifications.map((n) => (
              <div key={n} className="flex items-center gap-2 text-xs text-text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                {n}
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-white/8 bg-white/[0.03] p-3">
          <p className="text-[10px] text-text-muted">未対応タスク / 顧客管理</p>
          <table className="mt-2 w-full text-[10px]">
            <thead>
              <tr className="text-text-muted">
                <th className="pb-1 text-left">顧客</th>
                <th className="pb-1 text-left">ステータス</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr><td className="py-0.5">田中商事</td><td>対応済</td></tr>
              <tr><td className="py-0.5">佐藤工業</td><td>請求待ち</td></tr>
              <tr><td className="py-0.5">山田サロン</td><td>予約確定</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
