import { CinematicScene } from '../ui/CinematicScene'
import { AtmosphereBackground } from '../scenes/AtmosphereBackground'
import { GlowButton } from '../ui/GlowButton'
import { SECTION_IDS, CTA } from '../../lib/constants'

const steps = [
  { n: '01', t: '業務ヒアリング・整理', d: 'ムダ・二重入力を洗い出す。' },
  { n: '02', t: '業務フロー設計', d: 'ゼロベースで最適な流れを設計。' },
  { n: '03', t: '仕組み化・自動化', d: 'LINE・GAS・Web・AIで構築。' },
]

const tools = ['LINE', 'スプレッドシート', 'GAS', 'Web', 'AI', 'PDF', 'ダッシュボード']

export function ServiceSection() {
  return (
    <CinematicScene
      id={SECTION_IDS.service}
      theme="light"
      tag="BUILD · 05"
      minHeight="min-h-[100svh]"
      background={<AtmosphereBackground variant="sky" />}
      align="center"
    >
      <p className="text-xs tracking-[0.45em] text-cyan-600 mb-6 text-center">LAXIS</p>
      <h2 className="text-editorial text-3xl sm:text-5xl text-center leading-tight mb-16">
        ゼロから整える、
        <br />
        業務効率化サービス
      </h2>

      <div className="space-y-0 max-w-lg mx-auto w-full mb-14">
        {steps.map((s, i) => (
          <div
            key={s.n}
            className="py-8 border-t border-navy-900/8 first:border-t-0"
            style={{ paddingLeft: `${i * 12}px` }}
          >
            <p className="text-[10px] tracking-widest text-navy-800/35 mb-2">{s.n}</p>
            <h3 className="text-editorial text-xl sm:text-2xl">{s.t}</h3>
            <p className="mt-2 text-sm text-navy-800/55 font-light">{s.d}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {tools.map((t) => (
          <span key={t} className="pill-tag !text-[10px]">
            {t}
          </span>
        ))}
      </div>

      <div className="text-center">
        <GlowButton href={CTA.consult} variant="primary" size="md">
          無料相談する
        </GlowButton>
      </div>
    </CinematicScene>
  )
}
