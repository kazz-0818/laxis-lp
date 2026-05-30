import { useRef } from 'react'
import { SceneSplitCopy } from '../ui/SceneSplitCopy'
import { FloatingFragments } from '../ui/FloatingFragments'
import { heroFragments } from '../../data/site'
import { site } from '../../data/site'
import { GlowButton } from '../ui/GlowButton'
import { useSplitSceneCopy } from '../../hooks/useSceneScroll'

export function CTAScene() {
  const ref = useRef<HTMLElement>(null)
  useSplitSceneCopy(ref)

  return (
    <section ref={ref} id="contact" data-scene="cta" className="scene scene--cta">
      <FloatingFragments items={heroFragments} mode="aligned" progress={1} />
      <SceneSplitCopy
        left={[{ text: 'まずは今の業務の悩みを' }]}
        right={[{ text: 'お聞かせください。', accent: true }]}
      />
      <div className="scene__cta-row">
        <GlowButton href={site.cta.contact}>無料相談する</GlowButton>
        <GlowButton href={site.cta.download} variant="ghost">
          資料を見たい
        </GlowButton>
      </div>
      <div className="scene__spacer" />
    </section>
  )
}
