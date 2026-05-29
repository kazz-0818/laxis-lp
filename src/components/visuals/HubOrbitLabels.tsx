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

interface Props {
  gather: number
}

export function HubOrbitLabels({ gather }: Props) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600">
        {features.map((_, i) => {
          const a = (i / features.length) * Math.PI * 2 - Math.PI / 2
          const r0 = 280
          const r1 = 140 + (1 - gather) * 100
          const cx = 400
          const cy = 300
          const x1 = cx + Math.cos(a) * r0
          const y1 = cy + Math.sin(a) * r0 * 0.75
          const x2 = cx + Math.cos(a) * r1
          const y2 = cy + Math.sin(a) * r1 * 0.75
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#22d3ee"
              strokeWidth="1"
              opacity={0.15 + gather * 0.55}
            />
          )
        })}
      </svg>

      {features.map((label, i) => {
        const a = (i / features.length) * Math.PI * 2 - Math.PI / 2
        const r = 38 + (1 - gather) * 14
        const left = 50 + Math.cos(a) * r
        const top = 50 + Math.sin(a) * r * 0.72
        return (
          <span
            key={label}
            className="absolute px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-medium text-navy-900 bg-white/95 border border-white shadow-md pointer-events-auto hover:scale-105 hover:border-cyan-400/60 transition-transform whitespace-nowrap"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              transform: 'translate(-50%, -50%)',
              opacity: 0.5 + gather * 0.5,
            }}
          >
            {label}
          </span>
        )
      })}
    </div>
  )
}
