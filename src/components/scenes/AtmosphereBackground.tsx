type Variant = 'white' | 'sky' | 'mist' | 'muted' | 'hub' | 'warm' | 'dark'

export function AtmosphereBackground({ variant = 'sky' }: { variant?: Variant }) {
  if (variant === 'dark') {
    return (
      <div className="absolute inset-0 bg-linear-to-b from-navy-950 via-navy-900 to-[#0c1929]">
        <div className="absolute inset-0 grid-floor opacity-50" />
        <div className="absolute inset-0 noise" />
      </div>
    )
  }

  if (variant === 'hub') {
    return (
      <div className="absolute inset-0 bg-linear-to-b from-[#eff6ff] via-[#dbeafe] to-[#1e3a5f]">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] glow-orb opacity-80"
          aria-hidden
        />
        <div className="absolute inset-0 grid-floor-light opacity-40" />
        <div className="absolute inset-0 noise" />
      </div>
    )
  }

  if (variant === 'muted') {
    return (
      <div className="absolute inset-0 bg-linear-to-b from-slate-100 via-slate-200 to-[#cbd5e1]">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(15,39,68,0.08), transparent)',
          }}
        />
        <div className="absolute inset-0 noise" />
      </div>
    )
  }

  if (variant === 'warm') {
    return (
      <div className="absolute inset-0 bg-linear-to-b from-white via-slate-50 to-[#e8f4fc]">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 glow-orb-warm opacity-60" aria-hidden />
        <div className="absolute inset-0 noise" />
      </div>
    )
  }

  if (variant === 'white' || variant === 'sky') {
    return (
      <div className="absolute inset-0 bg-linear-to-b from-white via-slate-50 to-[#e0f2fe]">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(100vw,900px)] h-[60vh] glow-orb opacity-70"
          aria-hidden
        />
        <div className="absolute inset-0 grid-floor-light" />
        <div
          className="absolute bottom-0 left-0 right-0 h-1/3 opacity-40"
          style={{
            background: 'linear-gradient(to top, rgba(186,230,253,0.35), transparent)',
          }}
        />
        <div className="absolute inset-0 noise" />
      </div>
    )
  }

  /* mist — 汎用ライト */
  return (
    <div className="absolute inset-0 bg-linear-to-b from-white via-slate-50 to-slate-100">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 60% at 50% 0%, rgba(255,255,255,0.9), transparent 70%)',
        }}
      />
      <div className="absolute inset-0 noise" />
    </div>
  )
}
