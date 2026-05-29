import { SectionTitle } from '../ui/SectionTitle'
import { DashboardMock } from '../ui/DashboardMock'
import { SECTION_IDS } from '../../lib/constants'

export function DashboardSection() {
  return (
    <section id={SECTION_IDS.dashboard} className="section-pad bg-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-white to-slate-100" />
      <div className="container-wide relative">
        <SectionTitle
          label="Dashboard"
          title="現場が一目でわかる、管理画面"
          description="会社の業務に合わせた Web 管理画面・ダッシュボードを構築します。"
        />
        <DashboardMock />
      </div>
    </section>
  )
}
