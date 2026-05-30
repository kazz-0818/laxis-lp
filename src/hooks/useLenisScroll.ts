import Lenis from 'lenis'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { syncScrollDriver } from '../scroll/scrollDriver'

gsap.registerPlugin(ScrollTrigger)

export function useLenisScroll() {
  useEffect(() => {
    const root = document.getElementById('scroll-root')
    if (!root) return

    const content = root.querySelector<HTMLElement>('.scroll-content') ?? root

    const lenis = new Lenis({
      wrapper: root,
      content,
      duration: 1.1,
      smoothWheel: true,
    })

    const onScroll = () => {
      syncScrollDriver()
      ScrollTrigger.update()
    }

    lenis.on('scroll', onScroll)
    root.addEventListener('scroll', onScroll, { passive: true })

    const tick = (time: number) => {
      lenis.raf(time * 1000)
      syncScrollDriver()
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.defaults({ scroller: root })
    ScrollTrigger.scrollerProxy(root, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true })
        }
        return lenis.scroll
      },
      getBoundingClientRect() {
        return root.getBoundingClientRect()
      },
    })

    const resize = () => {
      lenis.resize()
      onScroll()
      ScrollTrigger.refresh()
    }
    window.addEventListener('load', resize)
    window.addEventListener('resize', resize)
    const ro = new ResizeObserver(resize)
    ro.observe(content)
    requestAnimationFrame(resize)

    return () => {
      gsap.ticker.remove(tick)
      root.removeEventListener('scroll', onScroll)
      window.removeEventListener('load', resize)
      window.removeEventListener('resize', resize)
      ro.disconnect()
      lenis.destroy()
      ScrollTrigger.defaults({ scroller: window })
      ScrollTrigger.scrollerProxy(root, {})
    }
  }, [])
}
