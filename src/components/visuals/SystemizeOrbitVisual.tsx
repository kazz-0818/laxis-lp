const tools = ['LINE', 'GAS', 'Web', 'AI', 'PDF', 'Dashboard']

interface Props {
  progress?: number
}

export function SystemizeOrbitVisual({ progress = 0 }: Props) {
  return (
    <div className="relative w-[min(90vw,520px)] aspect-square max-h-[55vh]" aria-hidden>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-cyan-400/40 bg-white shadow-[0_0_80px_rgba(34,211,238,0.15)] flex items-center justify-center"
          style={{ transform: `scale(${1 + progress * 0.1})` }}
        >
          <span className="text-editorial text-xl sm:text-2xl">整う</span>
        </div>
        {tools.map((t, i) => {
          const a = (i / tools.length) * Math.PI * 2 - Math.PI / 2 + progress * 0.5
          const r = 120 + progress * 20
          return (
            <span
              key={t}
              className="absolute px-4 py-2 rounded-full border border-slate-200 bg-white/95 text-xs font-medium text-navy-800 shadow-md"
              style={{
                left: `calc(50% + ${Math.cos(a) * r}px)`,
                top: `calc(50% + ${Math.sin(a) * r}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {t}
            </span>
          )
        })}
      </div>
    </div>
  )
}
