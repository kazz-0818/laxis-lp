import { cn } from '../../lib/utils'

interface Props {
  title: string
  accent?: string
  depth?: number
  className?: string
}

/** 1画面1テーマ用の巨大断片ビジュアル */
export function PainFragmentVisual({ title, accent, depth = 0, className }: Props) {
  return (
    <div
      className={cn('perspective-1200 preserve-3d relative', className)}
      style={{ transform: `translateZ(${depth}px)` }}
      aria-hidden
    >
      <div
        className="relative w-[min(85vw,420px)] aspect-[4/3] rounded-sm border border-slate-200/90 bg-white/90 shadow-[0_40px_80px_-24px_rgba(15,39,68,0.18)] backdrop-blur-sm"
        style={{
          transform: `rotateY(${depth * 0.02}deg) rotateX(${-depth * 0.01}deg)`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-slate-50 to-cyan-50/30" />
        <div className="absolute top-4 left-4 right-4 h-px bg-slate-200" />
        <div className="absolute top-8 left-4 w-16 h-2 bg-slate-100 rounded" />
        <div className="absolute top-14 left-4 w-3/4 h-1.5 bg-slate-100/80 rounded" />
        <div className="absolute bottom-8 left-4 right-4">
          <p className="text-[10px] tracking-[0.4em] text-cyan-600 uppercase mb-2">{accent}</p>
          <p className="font-serif text-2xl sm:text-3xl text-navy-900 font-semibold">{title}</p>
        </div>
        <div className="absolute -right-3 -top-3 w-8 h-8 rounded-full border border-red-300/60 bg-red-50 text-red-500 text-xs flex items-center justify-center font-bold">
          !
        </div>
      </div>
    </div>
  )
}
