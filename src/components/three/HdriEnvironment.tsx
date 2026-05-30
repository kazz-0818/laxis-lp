import { Environment } from '@react-three/drei'
import { useSceneStore } from '../../store/sceneStore'

const HDRI_2K = '/hdr/citrus_orchard_puresky_2k.exr'

export function HdriEnvironment() {
  const lightIntensity = useSceneStore((s) => s.lightIntensity)
  const envExposure = useSceneStore((s) => s.envExposure)

  const envIntensity = 0.25 + lightIntensity * 0.55 * envExposure
  const bgIntensity = 0.08 + lightIntensity * 0.22 * envExposure

  return (
    <Environment
      files={HDRI_2K}
      background
      backgroundBlurriness={0.85}
      backgroundIntensity={bgIntensity}
      backgroundRotation={[0, Math.PI * 0.15, 0]}
      environmentIntensity={envIntensity}
      environmentRotation={[0, Math.PI * 0.15, 0]}
    />
  )
}
