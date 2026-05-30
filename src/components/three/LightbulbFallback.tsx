export function LightbulbFallback() {
  return (
    <div className="canvas-fallback pointer-events-none fixed inset-0 z-[1] flex items-center justify-center">
      <div className="relative h-48 w-48">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,242,184,0.35)_0%,transparent_70%)] blur-xl" />
        <div className="absolute inset-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm" />
        <div className="absolute inset-[38%] rounded-full bg-light-warm/60 blur-md" />
      </div>
    </div>
  )
}
