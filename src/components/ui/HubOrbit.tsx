import { hubFeatures } from '../../data/site'

type Props = { progress: number }

export function HubOrbit({ progress }: Props) {
  const radius = 140

  return (
    <div className="hub-orbit" aria-hidden>
      <svg className="hub-orbit__lines" viewBox="0 0 400 400">
        {hubFeatures.map((_, i) => {
          const rad = ((i / hubFeatures.length) * 360 - 90) * (Math.PI / 180)
          const x2 = 200 + Math.cos(rad) * 150
          const y2 = 200 + Math.sin(rad) * 150
          return (
            <line
              key={i}
              x1={200}
              y1={200}
              x2={x2}
              y2={y2}
              stroke="url(#hubLine)"
              strokeWidth="1"
              opacity={0.15 + progress * 0.7}
            />
          )
        })}
        <defs>
          <linearGradient id="hubLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fff2b8" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>
      <div className="hub-orbit__core">
        <span className="hub-orbit__label">Laxis Hub</span>
      </div>
      {hubFeatures.map((label, i) => {
        const rad = ((i / hubFeatures.length) * 360 - 90) * (Math.PI / 180)
        const x = Math.cos(rad) * radius
        const y = Math.sin(rad) * radius
        const connected = progress > i / hubFeatures.length
        return (
          <div
            key={label}
            className={`hub-orbit__card ${connected ? 'hub-orbit__card--on' : ''}`}
            style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
          >
            {label}
          </div>
        )
      })}
    </div>
  )
}
