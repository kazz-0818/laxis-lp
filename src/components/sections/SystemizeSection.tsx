import { useEffect, useRef, useState } from 'react'
import { gsap, registerGsap } from '../../lib/gsap'
import { SceneFrame } from '../ui/SceneFrame'
import { SystemizeOrbitVisual } from '../visuals/SystemizeOrbitVisual'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function SystemizeSection() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !wrapRef.current) return
    registerGsap()
    const proxy = { v: 0 }
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: { trigger: wrapRef.current, start: 'top 70%', end: 'center 30%', scrub: 1 },
      }).to(proxy, { v: 1, onUpdate: () => setProgress(proxy.v) })
    }, wrapRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <div ref={wrapRef}>
      <SceneFrame
        id="systemize"
        chapterNum="05"
        chapterLabel="BUILD"
        tone="sky"
        copyPosition="bottom"
        visual={<SystemizeOrbitVisual progress={progress} />}
        headline={
          <>
            LINE / AI / GAS /
            <br />
            Webで、仕組み化。
          </>
        }
        subline="現場に合ったツールだけを、必要な範囲で。"
      />
    </div>
  )
}
