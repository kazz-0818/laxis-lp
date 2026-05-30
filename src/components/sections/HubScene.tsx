import { useRef } from 'react'
import { SceneSplitCopy } from '../ui/SceneSplitCopy'
import { HubOrbit } from '../ui/HubOrbit'
import { useSceneStore } from '../../store/sceneStore'
import { useSplitSceneCopy } from '../../hooks/useSceneScroll'

export function HubScene() {
  const ref = useRef<HTMLElement>(null)
  const progress = useSceneStore((s) => s.hubProgress)
  useSplitSceneCopy(ref)

  return (
    <section ref={ref} data-scene="hub" className="scene scene--hub scene--pin">
      <SceneSplitCopy
        left={[{ text: 'バラバラな業務を、' }]}
        right={[{ text: 'ひとつのHubへ。', accent: true }]}
      />
      <HubOrbit progress={progress} />
    </section>
  )
}
