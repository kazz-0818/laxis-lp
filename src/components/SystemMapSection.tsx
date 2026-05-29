import { motion } from 'framer-motion'
import { SceneShell } from './SceneShell'
import { SECTION_IDS } from '../data/site'

const nodes = [
  { id: 'web', label: 'Web', angle: 0 },
  { id: 'line', label: 'LINE', angle: 36 },
  { id: 'form', label: 'Form', angle: 72 },
  { id: 'ai', label: 'AI', angle: 108 },
  { id: 'sheet', label: 'Sheet', angle: 144 },
  { id: 'crm', label: 'CRM', angle: 180 },
  { id: 'dash', label: 'Dashboard', angle: 216 },
  { id: 'pay', label: 'Payment', angle: 252 },
  { id: 'notify', label: 'Notification', angle: 288 },
  { id: 'staff', label: 'Staff', angle: 324 },
]

export function SystemMapSection() {
  const cx = 200
  const cy = 200
  const r = 150

  return (
    <SceneShell id={SECTION_IDS.systemMap} scene="HUB MAP" tone="soft">
      <div className="section-pad min-h-[100svh] flex flex-col justify-center py-20 max-w-4xl mx-auto">
        <h2 className="text-display text-3xl sm:text-5xl text-center mb-4">
          バラバラな業務を、
          <br />
          ひとつの流れに。
        </h2>
        <p className="text-center text-sm text-ink-muted font-light mb-12">LAXISが中枢となり、すべてをつなぎます。</p>

        <motion.div
          className="relative w-full max-w-[400px] mx-auto aspect-square"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {nodes.map((n) => {
              const rad = (n.angle * Math.PI) / 180
              const x = cx + Math.cos(rad) * r
              const y = cy + Math.sin(rad) * r
              return (
                <motion.line
                  key={`line-${n.id}`}
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke="#0891b2"
                  strokeWidth="1"
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 0.35, transition: { duration: 0.5 } },
                  }}
                />
              )
            })}
            <motion.circle
              cx={cx}
              cy={cy}
              r="36"
              fill="#fff"
              stroke="#0891b2"
              strokeWidth="2"
              variants={{
                hidden: { scale: 0, opacity: 0 },
                show: { scale: 1, opacity: 1, transition: { type: 'spring', delay: 0.2 } },
              }}
            />
            <text x={cx} y={cy + 5} textAnchor="middle" fill="#0a1628" fontSize="14" fontWeight="600">
              LAXIS
            </text>
          </svg>

          {nodes.map((n, i) => {
            const rad = (n.angle * Math.PI) / 180
            const x = 50 + Math.cos(rad) * 42
            const y = 50 + Math.sin(rad) * 42
            return (
              <motion.span
                key={n.id}
                className="absolute px-3 py-1.5 rounded-full glass text-[10px] sm:text-xs font-medium text-ink -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  show: { opacity: 1, scale: 1, transition: { delay: 0.15 + i * 0.06 } },
                }}
              >
                {n.label}
              </motion.span>
            )
          })}
        </motion.div>
      </div>
    </SceneShell>
  )
}
