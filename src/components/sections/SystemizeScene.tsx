import { useRef } from 'react'
import { SceneSplitCopy } from '../ui/SceneSplitCopy'
import { systemTools } from '../../data/site'
import { useSplitSceneCopy } from '../../hooks/useSceneScroll'

export function SystemizeScene() {
  const ref = useRef<HTMLElement>(null)
  useSplitSceneCopy(ref)

  return (
    <section ref={ref} data-scene="systemize" className="scene scene--systemize">
      <SceneSplitCopy
        left={[{ text: 'LINE、AI、GAS、Webを' }]}
        right={[{ text: '会社に合う形でつなぐ。', accent: true }]}
      />
      <div className="systemize-orbit" aria-hidden>
        {systemTools.map((tool, i) => {
          const a = ((i / systemTools.length) * 360 - 90) * (Math.PI / 180)
          const r = 130
          return (
            <span
              key={tool}
              className="fragment-card"
              style={{
                left: `calc(50% + ${Math.cos(a) * r}px)`,
                top: `calc(50% + ${Math.sin(a) * r}px)`,
              }}
            >
              {tool}
            </span>
          )
        })}
      </div>
      <div className="scene__spacer" />
    </section>
  )
}
