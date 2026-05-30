import { useSceneStore } from '../../store/sceneStore'

export function LightbulbFallback() {
  const lightIntensity = useSceneStore((s) => s.lightIntensity)

  return (
    <div className="canvas-fallback pointer-events-none fixed inset-0 z-[2]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('/images/citrus_orchard_bg.webp')",
          filter: 'blur(20px) saturate(0.3) brightness(0.35)',
        }}
      />
      <div className="absolute inset-0 bg-bg-deep/80" />
      <div
        className="absolute left-1/2 top-[42%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(255,242,184,${0.25 + lightIntensity * 0.35}) 0%, transparent 70%)`,
        }}
      />
      <div className="absolute left-1/2 top-[42%] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-light-warm/50 blur-xl" />
    </div>
  )
}
