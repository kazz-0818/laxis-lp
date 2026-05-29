import { CinematicScene } from '../ui/CinematicScene'
import { AtmosphereBackground } from '../scenes/AtmosphereBackground'
import { DashboardMock } from '../ui/DashboardMock'
import { SECTION_IDS } from '../../lib/constants'

export function DashboardSection() {
  return (
    <CinematicScene
      id={SECTION_IDS.dashboard}
      theme="white"
      tag="RESULT · 06"
      minHeight="min-h-[100svh]"
      background={<AtmosphereBackground variant="mist" />}
      align="center"
    >
      <h2 className="text-editorial text-3xl sm:text-4xl text-center leading-tight mb-4">
        現場が使う、管理画面
      </h2>
      <p className="text-center text-sm text-navy-800/55 mb-12 font-light">
        イメージUI — 会社の業務に合わせて構築します
      </p>
      <DashboardMock />
    </CinematicScene>
  )
}
