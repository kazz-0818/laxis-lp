import { cn } from '../../lib/utils'

type Theme = 'dark' | 'light' | 'dim'

interface ChapterShellProps {
  id: string
  chapter: string
  chapterNum: string
  theme?: Theme
  className?: string
  children: React.ReactNode
  minHeight?: string
}

const themes: Record<Theme, string> = {
  dark: 'bg-navy-950 text-white',
  dim: 'bg-navy-900 text-white',
  light: 'bg-slate-50 text-slate-900',
}

export function ChapterShell({
  id,
  chapter,
  chapterNum,
  theme = 'dark',
  className,
  children,
  minHeight = 'min-h-screen',
}: ChapterShellProps) {
  return (
    <section id={id} className={cn('relative overflow-hidden', themes[theme], minHeight, className)}>
      <div className="pointer-events-none absolute top-6 left-5 sm:left-8 lg:left-12 z-20 flex items-center gap-3">
        <span className="text-[10px] sm:text-xs font-bold tracking-[0.35em] text-cyan-400/90">
          {chapterNum}
        </span>
        <span className="h-px w-8 sm:w-12 bg-linear-to-r from-cyan-400/80 to-transparent" />
        <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-slate-500 uppercase">
          {chapter}
        </span>
      </div>
      {children}
    </section>
  )
}
