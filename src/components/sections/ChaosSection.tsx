import { SceneFrame } from '../ui/SceneFrame'
import { ChaosClusterVisual } from '../visuals/ChaosClusterVisual'

/** Chapter 01 — 業務が絡まっている */
export function ChaosSection() {
  return (
    <SceneFrame
      id="chaos"
      chapterNum="01"
      chapterLabel="CHAOS"
      tone="sky"
      copyPosition="bottom"
      visual={<ChaosClusterVisual progress={0.2} />}
      headline={
        <>
          業務は、
          <br />
          もう絡まりすぎている。
        </>
      }
      subline="バラバラのツールと手作業が、会社の足を引っ張っている。"
    />
  )
}
