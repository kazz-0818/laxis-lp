import { useEffect, useState } from 'react'
import { registerGsap, ScrollTrigger } from '../../lib/gsap'
import { CHAPTERS } from '../../lib/chapters'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'
import { cn } from '../../lib/utils'

export function ChapterRail() {
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    if (reduced || mobile) return
    registerGsap()

    const triggers = CHAPTERS.map((ch, i) =>
      ScrollTrigger.create({
        trigger: `#${ch.sectionId}`,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      }),
    )

    return () => triggers.forEach((t) => t.kill())
  }, [reduced, mobile])

  if (reduced || mobile) return null

  return (
    <nav
      className="fixed left-5 sm:left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
      aria-label="章ナビゲーション"
    >
      {CHAPTERS.map((ch, i) => (
        <a
          key={ch.sectionId}
          href={`#${ch.sectionId}`}
          className={cn(
            'group flex items-center gap-2 transition-opacity duration-500',
            active === i ? 'opacity-100' : 'opacity-35 hover:opacity-70',
          )}
        >
          <span
            className={cn(
              'w-1 h-6 rounded-full transition-all duration-500',
              active === i ? 'bg-cyan-500 h-10' : 'bg-navy-900/20',
            )}
          />
          <span className="text-[9px] tracking-[0.25em] text-navy-800/70 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
            {ch.num} {ch.label}
          </span>
        </a>
      ))}
    </nav>
  )
}
