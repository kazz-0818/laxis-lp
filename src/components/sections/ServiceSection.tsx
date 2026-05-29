import { useEffect, useRef } from 'react'
import { ClipboardList, GitBranch, Cog } from 'lucide-react'
import { gsap, registerGsap } from '../../lib/gsap'
import { ChapterShell } from '../ui/ChapterShell'
import { SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const steps = [
  { icon: ClipboardList, title: '業務ヒアリング・整理', desc: 'ムダ・二重入力を洗い出し、現場の実態を可視化。', layer: 'bottom-0 z-10' },
  { icon: GitBranch, title: '業務フロー設計', desc: 'ゼロベースで最適なフローを設計。', layer: 'bottom-8 sm:bottom-12 z-20' },
  { icon: Cog, title: '仕組み化・自動化', desc: 'LINE・GAS・Web・AIで必要な部分だけを構築。', layer: 'bottom-16 sm:bottom-24 z-30' },
]

const tools = ['LINE', 'スプレッドシート', 'GAS', 'Web管理画面', 'AI', 'PDF', 'ダッシュボード']

export function ServiceSection() {
  const stackRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !stackRef.current) return
    registerGsap()
    const layers = stackRef.current.querySelectorAll('[data-layer]')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        layers,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: stackRef.current, start: 'top 75%' },
        },
      )
    })
    return () => ctx.revert()
  }, [reduced])

  return (
    <ChapterShell id={SECTION_IDS.service} chapter="Systemize" chapterNum="05" theme="light" minHeight="min-h-screen">
      <div className="section-pad relative z-10 pt-16">
        <div className="container-narrow">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 leading-tight">
            ゼロから整える、
            <br />
            業務効率化サービス「LAXIS」
          </h2>

          <div ref={stackRef} className="relative mt-14 h-[420px] sm:h-[480px] max-w-xl mx-auto">
            {steps.map((s, i) => (
              <div
                key={s.title}
                data-layer
                className={`absolute left-0 right-0 ${s.layer} glass-light rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl will-change-transform`}
                style={{ transform: `scale(${1 - i * 0.03})` }}
              >
                <s.icon className="text-cyan-600 mb-3" size={28} />
                <h3 className="text-lg font-bold text-navy-900">{s.title}</h3>
                <p className="text-sm text-slate-600 mt-2">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm font-bold text-navy-800 mb-4">使用ツール例</p>
            <div className="flex flex-wrap justify-center gap-2">
              {tools.map((t) => (
                <span
                  key={t}
                  className="px-4 py-2 rounded-full text-sm bg-white border border-slate-200 text-navy-800 shadow-sm hover:border-cyan-400/50 hover:shadow-md transition-all"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ChapterShell>
  )
}
