import * as THREE from 'three'

const MAX_ANISOTROPY = 16

export function enhanceMaterial(mat: THREE.Material, envMap: THREE.Texture | null) {
  const tune = (m: THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial) => {
    ;[m.map, m.normalMap, m.roughnessMap, m.metalnessMap, m.emissiveMap, m.alphaMap].forEach(
      (tex) => {
        if (!tex) return
        tex.anisotropy = MAX_ANISOTROPY
        tex.minFilter = THREE.LinearMipmapLinearFilter
        tex.magFilter = THREE.LinearFilter
        if ('colorSpace' in tex) tex.colorSpace = THREE.SRGBColorSpace
        tex.needsUpdate = true
      },
    )
    m.envMap = envMap
    m.envMapIntensity = envMap ? 2.4 : 1
    m.roughness = Math.min(m.roughness, 0.12)
    if (m.emissive) {
      m.emissive.set('#fff0b0')
      m.emissiveIntensity = 1.5
    }
    m.needsUpdate = true
  }

  if (mat instanceof THREE.MeshPhysicalMaterial) {
    tune(mat)
    if (mat.transmission > 0.01) {
      mat.transmission = 1
      mat.thickness = 0.55
      mat.ior = 1.52
      mat.attenuationColor = new THREE.Color('#fff8e0')
      mat.attenuationDistance = 0.85
    }
    mat.clearcoat = 1
    mat.clearcoatRoughness = 0.04
    mat.roughness = Math.min(mat.roughness, 0.08)
    return
  }
  if (mat instanceof THREE.MeshStandardMaterial) tune(mat)
}
