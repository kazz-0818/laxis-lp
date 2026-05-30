import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function DashboardMock() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(
      el,
      { y: 120, scale: 0.88, rotateX: 8, rotateY: -6, opacity: 0 },
      {
        y: 0,
        scale: 1,
        rotateX: 4,
        rotateY: -6,
        opacity: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 35%', scrub: 0.6 },
      },
    )
    const path = el.querySelector('[data-chart]')
    if (path) {
      const len = (path as SVGPathElement).getTotalLength?.() ?? 400
      gsap.fromTo(
        path,
        { strokeDasharray: len, strokeDashoffset: len },
        {
          strokeDashoffset: 0,
          scrollTrigger: { trigger: el, start: 'top 70%', scrub: 0.5 },
        },
      )
    }
  }, [])

  const kpis = ['今月売上', '粗利', '未入金', '成約数', '対応漏れ']

  return (
    <div ref={ref} className="dash-mock">
      <div className="dash-mock__chrome">
        <span>Laxis Hub Dashboard</span>
      </div>
      <div className="dash-mock__body">
        <div className="dash-mock__kpis">
          {kpis.map((k) => (
            <div key={k} className="dash-mock__kpi">
              <small>{k}</small>
              <strong>—</strong>
            </div>
          ))}
        </div>
        <div className="dash-mock__chart">
          <small>売上推移</small>
          <svg viewBox="0 0 200 60" className="w-full">
            <path
              data-chart
              d="M0,45 L40,40 L80,32 L120,28 L160,18 L200,12"
              fill="none"
              stroke="#2dd4bf"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="dash-mock__log">
          <small>LINE通知 / PDF発行</small>
          <p>予約リマインド送信完了</p>
          <p>請求書 #1042 自動発行</p>
        </div>
      </div>
    </div>
  )
}
