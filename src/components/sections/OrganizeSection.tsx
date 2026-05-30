import { useRef } from 'react'
import { organizeSteps } from '../../data/organizeSteps'
import { SectionLabel } from '../ui/SectionLabel'
import { useSceneStore } from '../../store/sceneStore'

export function OrganizeSection() {
  const ref = useRef<HTMLElement>(null)
  const progress = useSceneStore((s) => s.organizeProgress)

  const activeStep = Math.min(Math.floor(progress * 4), 3)

  return (
    <section
      ref={ref}
      id="organize"
      data-scene="organize"
      className="scene-section scene-pin relative min-h-screen bg-bg-slate"
    >
      <div className="flex min-h-screen items-center py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
          <div>
            <SectionLabel number="04" label="Organize" className="mb-6" />
            <h2 className="text-3xl font-bold leading-tight text-text-primary md:text-4xl">
              今の業務をそのまま
              <br />
              システム化するのではなく、
              <br />
              <span className="text-accent-cyan">まず業務そのものを整えます。</span>
            </h2>
          </div>

          <div className="relative">
            {/* Node graph */}
            <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full opacity-40">
              {organizeSteps.map((_, i) => {
                const x1 = 50 + (i % 2) * 150
                const y1 = 50 + Math.floor(i / 2) * 100
                const x2 = 200 + (i % 3) * 40
                const y2 = 150
                const organized = progress > i * 0.25
                return (
                  <line
                    key={i}
                    x1={organized ? x2 : x1}
                    y1={organized ? y2 : y1}
                    x2={x2}
                    y2={y2}
                    stroke={organized ? '#2dd4bf' : '#8fa3b8'}
                    strokeWidth="1"
                    opacity={organized ? 0.8 : 0.3}
                  />
                )
              })}
            </svg>

            <div className="relative space-y-4">
              {organizeSteps.map((step, i) => (
                <div
                  key={step.step}
                  className={`rounded-xl border p-5 transition-all duration-500 ${
                    i <= activeStep
                      ? 'border-accent-cyan/40 bg-accent-cyan/5 shadow-[0_0_30px_rgba(45,212,191,0.1)]'
                      : 'border-white/10 bg-white/[0.02] opacity-40'
                  }`}
                >
                  <span className="font-mono text-xs text-accent-cyan">{step.step}</span>
                  <h3 className="mt-1 text-base font-semibold text-text-primary">{step.title}</h3>
                  <p className="mt-2 text-xs text-text-muted">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
