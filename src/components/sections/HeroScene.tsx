import { useRef } from 'react'
import { SceneSplitCopy } from '../ui/SceneSplitCopy'
import { FloatingFragments } from '../ui/FloatingFragments'
import { heroFragments } from '../../data/site'
import { useSplitSceneCopy } from '../../hooks/useSceneScroll'

export function HeroScene() {
  const ref = useRef<HTMLElement>(null)
  useSplitSceneCopy(ref)

  return (
    <section ref={ref} data-scene="hero" className="scene scene--hero">
      <FloatingFragments items={heroFragments} mode="scatter" progress={0.35} />
      <SceneSplitCopy
        left={[{ text: '不便な業務に、' }]}
        right={[{ text: '改善の光を。', accent: true }]}
      />
      <p data-line-sub className="scene__sub scene__sub--center">
        LAXISは、業務をゼロから整え、ラクに回る仕組みをつくる業務効率化サービスです。
      </p>
      <div className="scene__spacer" aria-hidden />
    </section>
  )
}
