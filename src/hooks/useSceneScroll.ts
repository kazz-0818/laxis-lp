import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSceneStore, sceneTargets, type Scene3DTarget } from '../store/sceneStore'
import type { SceneId } from '../data/site'

gsap.registerPlugin(ScrollTrigger)

function lerpTarget(a: Scene3DTarget, b: Scene3DTarget, t: number): Scene3DTarget {
  const mix = (x: number, y: number) => x + (y - x) * t
  return {
    position: [
      mix(a.position[0], b.position[0]),
      mix(a.position[1], b.position[1]),
      mix(a.position[2], b.position[2]),
    ],
    rotation: [
      mix(a.rotation[0], b.rotation[0]),
      mix(a.rotation[1], b.rotation[1]),
      mix(a.rotation[2], b.rotation[2]),
    ],
    scale: mix(a.scale, b.scale),
    lightIntensity: mix(a.lightIntensity, b.lightIntensity),
    envIntensity: mix(a.envIntensity, b.envIntensity),
    bgZoom: mix(a.bgZoom, b.bgZoom),
    bgBrightness: mix(a.bgBrightness, b.bgBrightness),
    bgOffsetY: mix(a.bgOffsetY, b.bgOffsetY),
  }
}

const sceneOrder: SceneId[] = [
  'hero', 'chaos', 'lightOn', 'organize', 'systemize', 'hub', 'dashboard', 'cta',
]

import { syncScrollDriver } from '../scroll/scrollDriver'

function getScroller() {
  return document.getElementById('scroll-root') ?? undefined
}

export function useSceneScroll() {
  const setTarget = useSceneStore((s) => s.setTarget)
  const setCurrentScene = useSceneStore((s) => s.setCurrentScene)
  const setChaosProgress = useSceneStore((s) => s.setChaosProgress)
  const setOrganizeProgress = useSceneStore((s) => s.setOrganizeProgress)
  const setHubProgress = useSceneStore((s) => s.setHubProgress)

  useEffect(() => {
    const pin = window.matchMedia('(min-width: 768px)').matches
    const scroller = getScroller()
    if (!scroller) return

    const scrollContent =
      scroller.querySelector<HTMLElement>('.scroll-content') ?? scroller

    ScrollTrigger.create({
      trigger: scrollContent,
      scroller,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0,
      onUpdate: () => syncScrollDriver(),
    })

    sceneOrder.forEach((sceneId, index) => {
      const el = document.querySelector<HTMLElement>(`[data-scene="${sceneId}"]`)
      if (!el) return
      const target = sceneTargets[sceneId]
      const nextId = sceneOrder[index + 1]

      ScrollTrigger.create({
        trigger: el,
        scroller,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          setCurrentScene(sceneId)
          setTarget(target)
        },
        onEnterBack: () => {
          setCurrentScene(sceneId)
          setTarget(target)
        },
      })

      if (nextId) {
        const nextTarget = sceneTargets[nextId]
        ScrollTrigger.create({
          trigger: el,
          scroller,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.65,
          onUpdate: (self) => {
            setTarget(lerpTarget(target, nextTarget, self.progress))
          },
        })
      }

      if (sceneId === 'chaos') {
        ScrollTrigger.create({
          trigger: el,
          scroller,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (s) => setChaosProgress(s.progress),
        })
      }

      if (sceneId === 'organize') {
        ScrollTrigger.create({
          trigger: el,
          scroller,
          start: 'top top',
          end: pin ? '+=180%' : 'bottom top',
          pin: pin,
          scrub: true,
          onUpdate: (s) => setOrganizeProgress(s.progress),
        })
      }

      if (sceneId === 'hub') {
        ScrollTrigger.create({
          trigger: el,
          scroller,
          start: 'top top',
          end: pin ? '+=160%' : 'bottom top',
          pin: pin,
          scrub: true,
          onUpdate: (s) => setHubProgress(s.progress),
        })
      }

      if (sceneId === 'lightOn') {
        const flash = el.querySelector<HTMLElement>('.scene__flash')
        if (flash) {
          ScrollTrigger.create({
            trigger: el,
            scroller,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            onUpdate: (s) => {
              gsap.set(flash, { opacity: 0.08 + s.progress * 0.35 })
            },
          })
        }
      }

      const fragments = el.querySelectorAll<HTMLElement>('[data-frag]')
      if (fragments.length) {
        ScrollTrigger.create({
          trigger: el,
          scroller,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (s) => {
            fragments.forEach((card, i) => {
              const wave = Math.sin(s.progress * Math.PI + i * 0.4) * 8
              gsap.set(card, { y: wave, opacity: 0.25 + s.progress * 0.55 })
            })
          },
        })
      }
    })

    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [
    setTarget,
    setCurrentScene,
    setChaosProgress,
    setOrganizeProgress,
    setHubProgress,
  ])
}

/** 左: 下→上 / 右: 上→下（ベンチマークの逆方向流入） */
export function useSplitSceneCopy(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    const scroller = getScroller()
    if (!el || !scroller) return

    const left = el.querySelectorAll<HTMLElement>('[data-line-left]')
    const right = el.querySelectorAll<HTMLElement>('[data-line-right]')
    const sub = el.querySelectorAll('[data-line-sub]')

    gsap.set(left, { y: 140, opacity: 0 })
    gsap.set(right, { y: -140, opacity: 0 })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        scroller,
        start: 'top bottom',
        end: 'bottom 65%',
        scrub: 0.5,
        onUpdate: (self) => {
          const enter = Math.min(1, self.progress / 0.55)
          left.forEach((line, i) => {
            const offset = 120 + i * 28
            gsap.set(line, {
              y: (1 - enter) * offset,
              opacity: Math.min(1, enter * 1.2),
            })
          })
          right.forEach((line, i) => {
            const offset = 120 + i * 28
            gsap.set(line, {
              y: -((1 - enter) * offset),
              opacity: Math.min(1, enter * 1.2),
            })
          })
        },
      })

      if (sub.length) {
        gsap.fromTo(
          sub,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top 72%',
              end: 'top 52%',
              scrub: 0.5,
            },
          },
        )
      }
    }, el)

    return () => ctx.revert()
  }, [ref])
}

/** サブコピーなど単体行用 */
export function useSceneTypography(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const lines = el.querySelectorAll('[data-line]:not([data-line-left]):not([data-line-right])')
    if (!lines.length) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 72%', toggleActions: 'play none none reverse' },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [ref])
}
