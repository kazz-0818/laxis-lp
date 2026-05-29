import { useEffect, useState } from 'react'
import { registerGsap, ScrollTrigger } from '../../lib/gsap'
import { cn } from '../../lib/utils'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

const chapters = [
  { id: 'hero', num: '01', label: 'Chaos' },
  { id: 'problems', num: '02', label: 'Pain' },
  { id: 'failure', num: '03', label: 'Wrong' },
  { id: 'philosophy', num: '04', label: 'Reframe' },
  { id: 'service', num: '05', label: 'Build' },
  { id: 'hub', num: '06', label: 'Hub' },
  { id: 'cases', num: '07', label: 'Result' },
  { id: 'contact', num: '08', label: 'Action' },
]

export function StoryRail() {
  const [active, setActive] = useState('hero')
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    if (reduced || mobile) return

    registerGsap()
    const triggers = chapters.map((ch) =>
      ScrollTrigger.create({
        trigger: `#${ch.id}`,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => setActive(ch.id),
        onEnterBack: () => setActive(ch.id),
      }),
    )

    return () => triggers.forEach((t) => t.kill())
  }, [reduced, mobile])

  if (reduced || mobile) return null

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3"
      aria-label="ストーリー進行"
    >
      {chapters.map((ch) => (
        <a
          key={ch.id}
          href={`#${ch.id}`}
          className={cn(
            'group flex items-center gap-2 justify-end transition-opacity duration-300',
            active === ch.id ? 'opacity-100' : 'opacity-35 hover:opacity-70',
          )}
        >
          <span className="text-[10px] tracking-widest text-slate-400 group-hover:text-mint-400 transition-colors">
            {ch.label}
          </span>
          <span
            className={cn(
              'w-2 h-2 rounded-full border transition-all duration-300',
              active === ch.id
                ? 'bg-mint-400 border-mint-400 scale-125 shadow-[0_0_12px_rgba(45,212,191,0.8)]'
                : 'bg-transparent border-slate-600',
            )}
          />
        </a>
      ))}
    </nav>
  )
}
