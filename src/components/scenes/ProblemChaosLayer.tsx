/** Problemセクション：散らばった業務カードの装飾レイヤー */
const floatCards = [
  { label: 'LINE通知', x: '8%', y: '18%', rot: -8, delay: 0 },
  { label: 'Excel転記', x: '72%', y: '22%', rot: 12, delay: 0.4 },
  { label: 'PDF請求', x: '15%', y: '62%', rot: 6, delay: 0.8 },
  { label: '紙カルテ', x: '78%', y: '58%', rot: -14, delay: 1.2 },
  { label: '属人メモ', x: '42%', y: '12%', rot: 4, delay: 0.2 },
  { label: '手作業集計', x: '55%', y: '70%', rot: -6, delay: 1 },
]

export function ProblemChaosLayer({ activeIndex }: { activeIndex?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden" aria-hidden>
      {floatCards.map((c, i) => (
        <div
          key={c.label}
          className="absolute card-float px-3 py-2 text-[10px] sm:text-xs font-medium text-navy-800/70 transition-opacity duration-500"
          style={{
            left: c.x,
            top: c.y,
            ['--rot' as string]: `${c.rot}deg`,
            transform: `rotate(${c.rot}deg)`,
            opacity: activeIndex !== undefined && activeIndex !== i % 5 ? 0.35 : 0.85,
            animation:
              activeIndex === undefined
                ? `float-card 4s ease-in-out ${c.delay}s infinite`
                : undefined,
          }}
        >
          {c.label}
        </div>
      ))}
    </div>
  )
}
