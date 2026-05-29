import { SceneShell } from './SceneShell'
import { HubVisual } from './HubVisual'
import { SECTION_IDS } from '../data/site'

export function SystemMapSection() {
  return (
    <SceneShell id={SECTION_IDS.systemMap} scene="05" tone="soft">
      <div className="section-pad min-h-[100svh] flex flex-col items-center justify-center py-20 gap-12">
        <h2 className="scene-message">
          バラバラな業務を、
          <br />
          ひとつの流れに。
        </h2>
        <HubVisual size="section" />
      </div>
    </SceneShell>
  )
}
