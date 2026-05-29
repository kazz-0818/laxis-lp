import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { gsap, registerGsap } from '../../lib/gsap'
import { AtmosphereBackground } from '../scenes/AtmosphereBackground'
import { SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

const HubScene = lazy(() => import('../3d/HubScene').then((m) => ({ default: m.HubScene })))

const features = [
  '専用管理画面',
  '顧客管理',
  '売上・請求',
  'LINE連携',
  '営業管理',
  '予約・受付',
  '在庫・商品',
  'AI活用',
]

export function LaxisHubSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [gather, setGather] = useState(0)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    if (reduced || mobile || !sectionRef.current || !pinRef.current) return

    registerGsap()
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          scrub: 1,
          pin: pinRef.current,
          onUpdate: (self) => setGather(self.progress),
        },
      })
        .fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3 }, 0)
        .fromTo(
          listRef.current?.children ?? [],
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, stagger: 0.04, duration: 0.25 },
          0.2,
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced, mobile])

  const inner = (
    <>
      <div className="absolute inset-0 flex items-center justify-center pt-8">
        <Suspense fallback={null}>
          <HubScene className="absolute inset-0 w-full h-full max-w-4xl mx-auto" gatherProgress={gather} />
        </Suspense>
      </div>

      <div className="relative z-20 h-full flex flex-col justify-between section-pad py-20 sm:py-24">
        <div ref={titleRef} className="text-center pt-12 sm:pt-16">
          <p className="text-xs tracking-[0.45em] text-cyan-700 mb-4">Laxis Hub</p>
          <h2 className="text-editorial text-3xl sm:text-5xl lg:text-6xl leading-[1.1]">
            バラバラな業務を、
            <br />
            <span className="text-shine">ひとつに。</span>
          </h2>
          <p className="mt-4 text-sm text-navy-800/55 font-light max-w-md mx-auto">
            LP内最大の見せ場 — すべての業務がここに集約されます
          </p>
        </div>

        <div
          ref={listRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-3xl mx-auto w-full pb-4"
        >
          {features.map((f) => (
            <div
              key={f}
              className="bg-white/90 backdrop-blur-md border border-white/80 rounded-lg py-3 px-4 text-center text-[11px] sm:text-xs text-navy-900 font-medium shadow-[0_8px_24px_-8px_rgba(15,39,68,0.15)] hover:border-cyan-400/50 hover:text-cyan-700 transition-colors"
            >
              {f}
            </div>
          ))}
        </div>
      </div>
    </>
  )

  if (mobile) {
    return (
      <section id={SECTION_IDS.hub} className="relative min-h-[100svh] scene-hub overflow-hidden section-pad py-24">
        <AtmosphereBackground variant="hub" />
        <div className="absolute top-6 right-5 z-30">
          <span className="pill-tag">HUB · 04</span>
        </div>
        <div className="relative z-10">{inner}</div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id={SECTION_IDS.hub} className="relative h-[220vh]">
      <div ref={pinRef} className="relative h-[100svh] overflow-hidden scene-hub">
        <AtmosphereBackground variant="hub" />
        <div className="absolute top-6 right-5 sm:right-10 z-30">
          <span className="pill-tag">HUB · 04</span>
        </div>
        {inner}
      </div>
    </section>
  )
}
