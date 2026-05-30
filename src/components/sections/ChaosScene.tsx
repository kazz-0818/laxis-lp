import { useRef } from 'react'
import { SceneSplitCopy } from '../ui/SceneSplitCopy'
import { FloatingFragments } from '../ui/FloatingFragments'
import { chaosCards } from '../../data/site'
import { useSceneStore } from '../../store/sceneStore'
import { useSplitSceneCopy } from '../../hooks/useSceneScroll'

export function ChaosScene() {
  const ref = useRef<HTMLElement>(null)
  const progress = useSceneStore((s) => s.chaosProgress)
  useSplitSceneCopy(ref)

  return (
    <section ref={ref} data-scene="chaos" className="scene scene--chaos">
      <FloatingFragments items={chaosCards} mode="scatter" progress={progress} />
      <svg className="chaos-lines" aria-hidden>
        <path d="M80,200 Q200,80 320,220 T500,180" fill="none" stroke="rgba(91,103,120,0.22)" />
        <path d="M60,320 Q250,200 400,340" fill="none" stroke="rgba(91,103,120,0.18)" />
      </svg>
      <SceneSplitCopy
        left={[{ text: 'その業務、' }, { text: 'まだ人の頑張りだけで' }]}
        right={[{ text: '回していませんか？' }]}
      />
      <div className="scene__spacer" />
    </section>
  )
}
