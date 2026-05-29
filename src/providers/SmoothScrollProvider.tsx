import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, registerGsap } from '../lib/gsap'
import { ScrollTrigger } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useIsMobile } from '../hooks/useIsMobile'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    registerGsap()

    if (reduced || mobile) {
      ScrollTrigger.refresh()
      return
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [reduced, mobile])

  return <>{children}</>
}
