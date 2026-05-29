import { SceneShell } from './SceneShell'
import { HubVisual } from './HubVisual'
import { SECTION_IDS } from '../data/site'

export function SolutionSection() {
  return (
    <SceneShell id={SECTION_IDS.solution} scene="03" tone="soft">
      <div className="section-pad min-h-[100svh] flex flex-col items-center justify-center py-20 gap-10 max-w-5xl mx-auto">
        <h2 className="scene-message">
          LAXISは、事業に合わせて
          <br />
          “動く仕組み”を作ります。
        </h2>
        <HubVisual size="section" />
      </div>
    </SceneShell>
  )
}
