import { useEffect, useRef } from 'react'
import { gsap, registerGsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

export function ScrollLine() {
  const fillRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    if (reduced || mobile || !fillRef.current) return

    registerGsap()
    const ctx = gsap.context(() => {
      gsap.to(fillRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      })
    })

    return () => ctx.revert()
  }, [reduced, mobile])

  if (reduced || mobile) return null

  return (
    <div
      className="fixed left-5 sm:left-8 top-1/2 -translate-y-1/2 z-50 h-[40vh] w-px bg-navy-900/10"
      aria-hidden
    >
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-cyan-500/60" />
      <div
        ref={fillRef}
        className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-cyan-500/70 to-mint-400/50 origin-top scale-y-0"
      />
    </div>
  )
}
