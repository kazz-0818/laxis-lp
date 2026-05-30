import { useRef } from 'react'
import { SceneSplitCopy } from '../ui/SceneSplitCopy'
import { DashboardMock } from '../ui/DashboardMock'
import { useSplitSceneCopy } from '../../hooks/useSceneScroll'

export function DashboardScene() {
  const ref = useRef<HTMLElement>(null)
  useSplitSceneCopy(ref)

  return (
    <section ref={ref} data-scene="dashboard" className="scene scene--dashboard">
      <SceneSplitCopy
        left={[{ text: '整えた業務は、' }]}
        right={[{ text: '見えるようになる。', accent: true }]}
      />
      <div className="scene__dashboard-wrap">
        <DashboardMock />
      </div>
      <div className="scene__spacer scene__spacer--sm" />
    </section>
  )
}
