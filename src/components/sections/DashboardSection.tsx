import { ChapterShell } from '../ui/ChapterShell'
import { DashboardMock } from '../ui/DashboardMock'
import { SECTION_IDS } from '../../lib/constants'

export function DashboardSection() {
  return (
    <ChapterShell id={SECTION_IDS.dashboard} chapter="Dashboard" chapterNum="07b" theme="dim" minHeight="min-h-screen">
      <div className="section-pad relative z-10 pt-16">
        <div className="container-wide">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white text-center max-w-3xl mx-auto leading-tight">
            導入後、<span className="text-shine">現場が使う</span>管理画面
          </h2>
          <p className="text-center text-slate-400 mt-4 text-sm sm:text-base">
            架空のUIイメージです。会社の業務に合わせて構築します。
          </p>
          <div className="mt-12">
            <DashboardMock />
          </div>
        </div>
      </div>
    </ChapterShell>
  )
}
