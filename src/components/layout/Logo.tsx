import { cn } from '../../lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#hero" className={cn('group leading-none', className)}>
      <span className="block text-lg font-extrabold tracking-tight text-white">LAXIS</span>
      <span className="block text-[10px] font-medium tracking-[0.2em] text-mint-400/90 mt-0.5">
        ラクシス
      </span>
    </a>
  )
}
