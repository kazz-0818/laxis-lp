import { useSceneStore } from '../../store/sceneStore'

export function SceneBackdrop() {
  const lightIntensity = useSceneStore((s) => s.lightIntensity)
  const show3D = useSceneStore((s) => s.show3D)

  const glow = 0.15 + lightIntensity * 0.35

  return (
    <div className="scene-backdrop" aria-hidden>
      <div
        className="scene-backdrop__image"
        style={{
          backgroundImage: "url('/images/citrus_orchard_bg.webp')",
          opacity: show3D ? 0.35 : 0.55,
        }}
      />
      <div
        className="scene-backdrop__dark"
        style={{
          opacity: 0.92 - lightIntensity * 0.25,
        }}
      />
      <div
        className="scene-backdrop__glow"
        style={{
          opacity: glow,
        }}
      />
      <div className="scene-backdrop__vignette" />
      <div className="scene-backdrop__grain" />
    </div>
  )
}
