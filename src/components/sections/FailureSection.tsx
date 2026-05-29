import { useEffect, useRef } from 'react'
import { gsap, registerGsap } from '../../lib/gsap'
import { CinematicScene } from '../ui/CinematicScene'
import { AtmosphereBackground } from '../scenes/AtmosphereBackground'
import { SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const tools = ['SaaS', 'Excel', 'LINE', '紙', 'Chat', 'PDF', '外注', '要件']

export function FailureSection() {
  const clusterRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !clusterRef.current) return
    registerGsap()
    const items = clusterRef.current.querySelectorAll('[data-tool]')
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: { trigger: clusterRef.current, start: 'top 75%', end: 'bottom 25%', scrub: 1 },
      }).to(items, {
        rotation: (i) => (i % 2 ? 18 : -18),
        x: (i) => (i - 3.5) * 45,
        y: (i) => Math.sin(i) * 30,
        opacity: 0.5,
        scale: 0.8,
        stagger: 0.03,
      })
    })
    return () => ctx.revert()
  }, [reduced])

  return (
    <CinematicScene
      id={SECTION_IDS.failure}
      theme="muted"
      tag="WRONG · 02"
      minHeight="min-h-[100svh]"
      background={<AtmosphereBackground variant="muted" />}
      align="center"
    >
      <div className="text-center mb-16">
        <h2 className="text-editorial text-3xl sm:text-5xl lg:text-6xl leading-[1.15]">
          「とりあえず
          <br />
          システム化」は、
          <br />
          <span className="text-red-600/85">失敗の元。</span>
        </h2>
      </div>

      <div ref={clusterRef} className="relative h-48 sm:h-56 mb-16">
        {tools.map((t, i) => (
          <span
            key={t}
            data-tool
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 text-xs sm:text-sm font-medium text-navy-800/80 border border-slate-300/80 bg-white/90 backdrop-blur-sm rounded-full shadow-sm will-change-transform"
            style={{
              transform: `translate(calc(-50% + ${(i - 3.5) * 28}px), calc(-50% + ${Math.sin(i) * 16}px)) rotate(${(i - 4) * 8}deg)`,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <div className="glass-panel text-left">
          <p className="text-editorial text-lg mb-2">既存ツールが合わない</p>
          <p className="text-sm text-navy-800/60 leading-relaxed font-light">
            汎用SaaSは高額で複雑。現場の運用と噛み合わない。
          </p>
        </div>
        <div className="glass-panel text-left">
          <p className="text-editorial text-lg mb-2">外注先に伝えづらい</p>
          <p className="text-sm text-navy-800/60 leading-relaxed font-light">
            属人化した業務が共有できず、ズレたものができる。
          </p>
        </div>
      </div>
    </CinematicScene>
  )
}
