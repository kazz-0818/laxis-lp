import { useRef } from 'react'
import { SceneSplitCopy } from '../ui/SceneSplitCopy'
import { useSplitSceneCopy } from '../../hooks/useSceneScroll'

export function LightOnScene() {
  const ref = useRef<HTMLElement>(null)
  useSplitSceneCopy(ref)

  return (
    <section ref={ref} data-scene="lightOn" className="scene scene--light-on">
      <div className="scene__flash" aria-hidden />
      <SceneSplitCopy
        left={[{ text: 'システムを作る前に、' }]}
        right={[{ text: '業務を整える。', accent: true }]}
      />
      <div className="scene__spacer" />
    </section>
  )
}
