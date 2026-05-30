import { useRef } from 'react'
import { SceneSplitCopy } from '../ui/SceneSplitCopy'
import { organizeSteps } from '../../data/site'
import { useSceneStore } from '../../store/sceneStore'
import { useSplitSceneCopy } from '../../hooks/useSceneScroll'

export function OrganizeScene() {
  const ref = useRef<HTMLElement>(null)
  const progress = useSceneStore((s) => s.organizeProgress)
  const active = Math.min(Math.floor(progress * 4), 3)
  useSplitSceneCopy(ref)

  return (
    <section ref={ref} data-scene="organize" className="scene scene--organize scene--pin">
      <SceneSplitCopy
        left={[{ text: '絡まった業務を、' }]}
        right={[{ text: 'ほどいて、整える。', accent: true }]}
      />
      <div className="organize-steps">
        {organizeSteps.map((step, i) => (
          <div
            key={step.step}
            className={`organize-step ${i <= active ? 'organize-step--on' : ''}`}
            style={{ opacity: i <= active ? 1 : 0.25 }}
          >
            <span>{step.step}</span>
            <p>{step.title}</p>
          </div>
        ))}
      </div>
      <svg className="organize-lines" aria-hidden style={{ opacity: 1 - progress * 0.8 }}>
        <path d="M100,300 Q200,100 300,300" stroke="#8fa3b8" fill="none" />
        <path d="M150,350 Q250,150 350,250" stroke="#8fa3b8" fill="none" />
      </svg>
    </section>
  )
}
