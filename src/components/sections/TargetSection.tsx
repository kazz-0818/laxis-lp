import { CinematicScene } from '../ui/CinematicScene'
import { AtmosphereBackground } from '../scenes/AtmosphereBackground'
import { SECTION_IDS } from '../../lib/constants'

const points = [
  'Excel・LINE・紙・電話で業務を回している',
  'IT担当が社内にいない',
  '大規模開発は不要だが限界を感じている',
  '一部の業務からスモールスタートしたい',
]

export function TargetSection() {
  return (
    <CinematicScene
      id={SECTION_IDS.target}
      theme="white"
      tag="FOR YOU"
      background={<AtmosphereBackground variant="warm" />}
      align="center"
    >
      <h2 className="text-editorial text-3xl sm:text-4xl text-center leading-tight mb-12">
        社内にDX担当がいなくても、
        <br />
        大丈夫です。
      </h2>
      <ul className="space-y-6 max-w-md mx-auto">
        {points.map((p) => (
          <li
            key={p}
            className="text-sm sm:text-base text-navy-800/70 leading-relaxed font-light border-l-2 border-cyan-400/50 pl-5"
          >
            {p}
          </li>
        ))}
      </ul>
    </CinematicScene>
  )
}
