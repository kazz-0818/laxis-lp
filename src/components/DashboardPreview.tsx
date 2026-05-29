import { Bell, TrendingUp, Users, AlertCircle } from 'lucide-react'
import { AmbientBackground } from './AmbientBackground'
import { ParallaxSection } from './ParallaxSection'
import { SectionTitle } from './SectionTitle'
import { SECTION_IDS } from '../lib/constants'

const kpis = [
  { label: '今月売上', value: '¥4,280,000', change: '+12.4%', up: true },
  { label: '粗利', value: '¥1,620,000', change: '+8.2%', up: true },
  { label: '未入金', value: '¥340,000', change: '-3件', up: false },
  { label: '成約数', value: '28件', change: '+5', up: true },
  { label: '対応漏れ', value: '0件', change: '前月比 -4', up: true },
]

const staff = [
  { name: '田中', sales: 1280000, deals: 9 },
  { name: '佐藤', sales: 980000, deals: 7 },
  { name: '鈴木', sales: 720000, deals: 5 },
]

const notifications = [
  { time: '10:32', text: 'A社 入金確認済み' },
  { time: '09:15', text: 'B社 見積送付リマインド' },
  { time: '昨日', text: '予約 3件 前日リマインド送信' },
]

export function DashboardPreview() {
  return (
    <ParallaxSection
      id={SECTION_IDS.dashboard}
      className="section-padding bg-white"
      background={<AmbientBackground variant="light" />}
      contentSpeed={0.05}
    >
      <div className="container-wide">
        <SectionTitle
          label="DASHBOARD"
          title="現場が一目でわかる、管理画面イメージ"
          description="実際のLaxis Hubでは、会社の業務に合わせた画面を構築します。（表示はイメージです）"
        />

        <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xl shadow-navy-900/10 bg-slate-100">
          <div className="flex items-center gap-2 px-4 py-3 bg-navy-900">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <span className="text-xs text-slate-400 ml-2">Laxis Hub — Dashboard</span>
          </div>

          <div className="p-4 sm:p-6 bg-linear-to-br from-slate-100 to-slate-50">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
              {kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="glass-card rounded-xl p-3 sm:p-4 col-span-1"
                >
                  <p className="text-[10px] sm:text-xs text-slate-500 mb-1">{kpi.label}</p>
                  <p className="text-sm sm:text-lg font-bold text-navy-900 truncate">{kpi.value}</p>
                  <p
                    className={`text-[10px] sm:text-xs mt-1 ${
                      kpi.up ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  >
                    {kpi.change}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 glass-card rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-navy-900 flex items-center gap-2">
                    <TrendingUp size={16} className="text-cyan-600" />
                    売上推移
                  </p>
                  <span className="text-xs text-slate-500">直近6ヶ月</span>
                </div>
                <div className="h-36 sm:h-44 flex items-end gap-2 sm:gap-3">
                  {[65, 72, 58, 80, 88, 95].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-md bg-linear-to-t from-cyan-600 to-mint-400"
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-[9px] text-slate-400">
                        {['1月', '2月', '3月', '4月', '5月', '6月'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-xl p-4">
                <p className="text-sm font-semibold text-navy-900 mb-3">売上構成</p>
                <div className="relative w-32 h-32 mx-auto">
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
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-navy-900">100%</span>
                  </div>
                </div>
                <div className="mt-3 space-y-1 text-xs text-slate-600">
                  <p>■ 新規 70%</p>
                  <p>■ リピート 30%</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="glass-card rounded-xl p-4">
                <p className="text-sm font-semibold text-navy-900 mb-3 flex items-center gap-2">
                  <Users size={16} className="text-cyan-600" />
                  担当者別成績
                </p>
                <div className="space-y-2">
                  {staff.map((s) => (
                    <div key={s.name} className="flex items-center gap-3 text-sm">
                      <span className="w-12 font-medium text-navy-800">{s.name}</span>
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-mint-500 to-cyan-500 rounded-full"
                          style={{ width: `${(s.sales / 1280000) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 w-16 text-right">
                        {s.deals}件
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-rows-2 gap-4">
                <div className="glass-card rounded-xl p-4">
                  <p className="text-sm font-semibold text-navy-900 mb-2 flex items-center gap-2">
                    <Bell size={16} className="text-cyan-600" />
                    通知ログ
                  </p>
                  <ul className="space-y-2">
                    {notifications.map((n) => (
                      <li key={n.text} className="text-xs flex gap-2 text-slate-600">
                        <span className="text-slate-400 shrink-0">{n.time}</span>
                        {n.text}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass-card rounded-xl p-4">
                  <p className="text-sm font-semibold text-navy-900 mb-2 flex items-center gap-2">
                    <AlertCircle size={16} className="text-amber-500" />
                    進捗リスト
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex justify-between">
                      <span>C社 契約書送付</span>
                      <span className="text-cyan-600">進行中</span>
                    </li>
                    <li className="flex justify-between">
                      <span>D社 初回ヒアリング</span>
                      <span className="text-emerald-600">完了</span>
                    </li>
                    <li className="flex justify-between">
                      <span>月次レポート作成</span>
                      <span className="text-slate-400">予定</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ParallaxSection>
  )
}
