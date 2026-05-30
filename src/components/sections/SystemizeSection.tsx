import { useRef } from 'react'
import { systemTools } from '../../data/systemTools'
import { SectionLabel } from '../ui/SectionLabel'
import { useSceneStore } from '../../store/sceneStore'

export function SystemizeSection() {
  const ref = useRef<HTMLElement>(null)
  const progress = useSceneStore((s) => s.systemizeProgress)

  const radius = 160

  return (
    <section
      ref={ref}
      data-scene="systemize"
      className="scene-section relative flex min-h-screen items-center overflow-hidden bg-bg-navy py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionLabel number="05" label="Systemize" className="mb-6" />
        <h2 className="max-w-2xl text-3xl font-bold text-text-primary md:text-5xl">
          必要な部分だけ、
          <br />
          <span className="text-accent-sky">仕組み化する。</span>
        </h2>
        <p className="mt-4 text-sm text-text-muted md:text-base">
          使い慣れたツールを、会社に合う形でつなぎ直す。
        </p>

        <div className="relative mx-auto mt-16 aspect-square w-full max-w-lg">
          {/* Connection lines */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400">
            {systemTools.map((tool, i) => {
              const rad = ((tool.angle - 90) * Math.PI) / 180
              const x2 = 200 + Math.cos(rad) * 150
              const y2 = 200 + Math.sin(rad) * 150
              const connected = progress > i / systemTools.length
              return (
                <line
                  key={tool.id}
                  x1={200}
                  y1={200}
                  x2={x2}
                  y2={y2}
                  stroke={connected ? '#2dd4bf' : '#8fa3b8'}
                  strokeWidth="1"
                  opacity={connected ? 0.8 : 0.2}
                />
              )
            })}
          </svg>

          {/* Center */}
          <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-light-warm/30 bg-light-warm/10" />

          {/* Orbiting tools */}
          {systemTools.map((tool, i) => {
            const rad = ((tool.angle - 90) * Math.PI) / 180
            const x = Math.cos(rad) * radius
            const y = Math.sin(rad) * radius
            const visible = progress > i / systemTools.length
            return (
              <div
                key={tool.id}
                className={`absolute left-1/2 top-1/2 rounded-lg border px-3 py-2 text-xs font-medium backdrop-blur-sm transition-all duration-500 ${
                  visible
                    ? 'border-accent-cyan/40 bg-accent-cyan/10 text-text-primary'
                    : 'border-white/10 bg-white/[0.03] text-text-muted opacity-40'
                }`}
                style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
              >
                {tool.label}
              </div>
            )
          })}
        </div>
      </div>

      <div className="h-[20vh]" aria-hidden />
    </section>
  )
}
