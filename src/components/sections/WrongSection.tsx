import { useEffect, useRef, useState } from 'react'
import { gsap, registerGsap } from '../../lib/gsap'
import { SceneFrame } from '../ui/SceneFrame'
import { WrongCollapseVisual } from '../visuals/WrongCollapseVisual'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

export function WrongSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [dissolve, setDissolve] = useState(0)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    if (reduced || mobile || !sectionRef.current) return
    registerGsap()
    const proxy = { v: 0 }
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
        },
      }).to(proxy, {
        v: 1,
        onUpdate: () => setDissolve(proxy.v),
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced, mobile])

  return (
    <div ref={sectionRef}>
      <SceneFrame
        id="wrong"
        chapterNum="03"
        chapterLabel="WRONG"
        tone="muted"
        copyPosition="bottom"
        visual={<WrongCollapseVisual dissolve={dissolve} />}
        headline={
          <>
            「とりあえず
            <br />
            システム化」は、
            <br />
            <span className="text-red-600/90">失敗の元。</span>
          </>
        }
        subline="業務を整理しないまま導入すると、混乱は拡大する。"
        footer={
          <div className="grid sm:grid-cols-2 gap-8 max-w-xl mt-4 text-sm font-light text-navy-800/60">
            <p>既存ツールが、現場に合わない。</p>
            <p>外注先に、業務が伝わらない。</p>
          </div>
        }
      />
    </div>
  )
}
