import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSceneStore } from '../store/sceneStore'
import type { SceneId } from '../data/site'

gsap.registerPlugin(ScrollTrigger)

const sceneIntensity: Record<SceneId, number> = {
  hero: 0.25,
  chaos: 0.3,
  lightOn: 0.85,
  organize: 0.75,
  systemize: 0.9,
  hub: 1.0,
  dashboard: 0.7,
  useCase: 0.6,
  pricing: 0.5,
  faq: 0.45,
  cta: 1.0,
}

function useIsPinEnabled() {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(min-width: 768px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useSceneScrollTriggers() {
  const setCurrentScene = useSceneStore((s) => s.setCurrentScene)
  const setLightIntensity = useSceneStore((s) => s.setLightIntensity)
  const setChaosProgress = useSceneStore((s) => s.setChaosProgress)
  const setOrganizeProgress = useSceneStore((s) => s.setOrganizeProgress)
  const setSystemizeProgress = useSceneStore((s) => s.setSystemizeProgress)
  const setHubProgress = useSceneStore((s) => s.setHubProgress)

  useEffect(() => {
    const pinEnabled = useIsPinEnabled()
    const sections = document.querySelectorAll<HTMLElement>('[data-scene]')

    sections.forEach((section) => {
      const scene = section.dataset.scene as SceneId
      if (!scene) return

      ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          setCurrentScene(scene)
          setLightIntensity(sceneIntensity[scene])
        },
        onEnterBack: () => {
          setCurrentScene(scene)
          setLightIntensity(sceneIntensity[scene])
        },
      })

      if (scene === 'hero') {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            setLightIntensity(0.1 + self.progress * 0.3)
          },
        })
      }

      if (scene === 'chaos') {
        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => setChaosProgress(self.progress),
        })
      }

      if (scene === 'organize') {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: pinEnabled ? '+=200%' : 'bottom top',
          pin: pinEnabled,
          scrub: true,
          onUpdate: (self) => setOrganizeProgress(self.progress),
        })
      }

      if (scene === 'systemize') {
        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => setSystemizeProgress(self.progress),
        })
      }

      if (scene === 'hub') {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: pinEnabled ? '+=180%' : 'bottom top',
          pin: pinEnabled,
          scrub: true,
          onUpdate: (self) => setHubProgress(self.progress),
        })
      }
    })

    ScrollTrigger.refresh()

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [
    setCurrentScene,
    setLightIntensity,
    setChaosProgress,
    setOrganizeProgress,
    setSystemizeProgress,
    setHubProgress,
  ])
}

export function useSectionAnimation(ref: RefObject<HTMLElement | null>, delay = 0) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.fromTo(
      el.querySelectorAll('[data-animate]'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%' },
      },
    )
  }, [ref, delay])
}
