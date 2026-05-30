import { Suspense, useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useGLTF, Float, ContactShadows } from '@react-three/drei'
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js'
import * as THREE from 'three'

useGLTF.preload('/models/lightbulb.glb')

const HDRI = '/hdr/citrus_orchard_puresky_2k.exr'
const MAX_ANISOTROPY = 16

function enhanceMaterial(mat: THREE.Material, envMap: THREE.Texture | null) {
  const applyMap = (tex: THREE.Texture | null | undefined) => {
    if (!tex) return
    tex.anisotropy = MAX_ANISOTROPY
    tex.minFilter = THREE.LinearMipmapLinearFilter
    tex.magFilter = THREE.LinearFilter
    tex.colorSpace = THREE.SRGBColorSpace
    tex.needsUpdate = true
  }

  if (mat instanceof THREE.MeshPhysicalMaterial) {
    applyMap(mat.map)
    applyMap(mat.normalMap)
    applyMap(mat.roughnessMap)
    applyMap(mat.metalnessMap)
    applyMap(mat.emissiveMap)
    mat.envMap = envMap
    mat.envMapIntensity = 1.4
    mat.roughness = Math.min(mat.roughness, 0.12)
    mat.metalness = Math.max(mat.metalness, 0.85)
    if (mat.transmission > 0.01 || mat.name?.toLowerCase().includes('glass')) {
      mat.transmission = 1
      mat.thickness = 0.45
      mat.ior = 1.5
      mat.transparent = true
      mat.opacity = 1
    }
    if (mat.emissive) {
      mat.emissive.set('#ffe58a')
      mat.emissiveIntensity = 2.2
    }
    mat.needsUpdate = true
    return
  }

  if (mat instanceof THREE.MeshStandardMaterial) {
    applyMap(mat.map)
    applyMap(mat.normalMap)
    applyMap(mat.roughnessMap)
    applyMap(mat.metalnessMap)
    applyMap(mat.emissiveMap)
    mat.envMap = envMap
    mat.envMapIntensity = 1.3
    if (mat.emissive) {
      mat.emissive.set('#ffe58a')
      mat.emissiveIntensity = 2
    }
    mat.roughness = Math.min(mat.roughness, 0.2)
    mat.metalness = Math.max(mat.metalness, 0.7)
    mat.needsUpdate = true
  }
}

function HdriBackground() {
  const exr = useLoader(EXRLoader, HDRI)
  const { scene, gl } = useThree()

  useEffect(() => {
    exr.mapping = THREE.EquirectangularReflectionMapping
    exr.colorSpace = THREE.LinearSRGBColorSpace
    scene.background = exr
    scene.environment = exr
    scene.backgroundRotation = new THREE.Euler(0, Math.PI * 0.12, 0)
    scene.environmentRotation = new THREE.Euler(0, Math.PI * 0.12, 0)
    scene.environmentIntensity = 1.1

    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 0.72
    gl.outputColorSpace = THREE.SRGBColorSpace

    return () => {
      scene.background = null
      scene.environment = null
    }
  }, [exr, scene, gl])

  return null
}

function Lightbulb() {
  const { scene } = useGLTF('/models/lightbulb.glb')
  const { scene: threeScene } = useThree()
  const groupRef = useRef<THREE.Group>(null)

  const model = useMemo(() => {
    const root = scene.clone(true)
    const env = threeScene.environment
    root.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        for (const mat of mats) {
          enhanceMaterial(mat, env)
        }
      }
    })
    return root
  }, [scene, threeScene.environment])

  useEffect(() => {
    if (!threeScene.environment) return
    model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        for (const mat of mats) {
          enhanceMaterial(mat, threeScene.environment)
        }
      }
    })
  }, [model, threeScene.environment])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.2) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.05, 0]} scale={3.4}>
      <primitive object={model} />
      <pointLight position={[0, 0.35, 0.15]} intensity={3} color="#fff8e7" distance={6} decay={2} />
      <pointLight position={[0.4, 0.2, 0.5]} intensity={0.8} color="#ffffff" distance={4} />
    </group>
  )
}

function Scene() {
  return (
    <>
      <HdriBackground />
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 5, 4]} intensity={0.85} castShadow color="#ffffff" />
      <directionalLight position={[-2, 2, -2]} intensity={0.25} color="#c8e8ff" />
      <Float speed={0.9} floatIntensity={0.18} rotationIntensity={0.06}>
        <Lightbulb />
      </Float>
      <ContactShadows
        position={[0, -1.08, 0]}
        opacity={0.55}
        scale={7}
        blur={1.8}
        far={3.5}
        resolution={512}
        color="#000000"
      />
    </>
  )
}

export default function App() {
  return (
    <div className="viewport">
      <Canvas
        camera={{ position: [0, 0.12, 2.35], fov: 30, near: 0.1, far: 100 }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2.5)}
        shadows
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <div className="viewport__scrim" aria-hidden />
    </div>
  )
}
