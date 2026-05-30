import { Suspense, useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useGLTF, ContactShadows } from '@react-three/drei'
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js'
import * as THREE from 'three'
import { useSceneStore } from '../../store/sceneStore'
import { scrollDriver } from '../../scroll/scrollDriver'
import { ScrollRig } from './ScrollRig'
import { enhanceMaterial } from '../../three/enhanceMaterial'

useGLTF.preload('/models/lightbulb.glb')

const HDRI = '/hdr/citrus_orchard_puresky_2k.exr'
const WHITE = new THREE.Color('#ffffff')

/** 背景は白のみ。EXR は反射用の環境光だけに使う */
function StudioEnvironment() {
  const exr = useLoader(EXRLoader, HDRI)
  const { scene, gl } = useThree()
  const envIntensity = useSceneStore((s) => s.envIntensity)

  useEffect(() => {
    exr.mapping = THREE.EquirectangularReflectionMapping
    scene.background = WHITE
    scene.environment = exr
    scene.backgroundRotation = new THREE.Euler(0, 0.12, 0)
    scene.environmentRotation = new THREE.Euler(0, 0.12, 0)
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 1.12
    gl.outputColorSpace = THREE.SRGBColorSpace
    return () => {
      scene.background = null
      scene.environment = null
    }
  }, [exr, scene, gl])

  useFrame(() => {
    if (scene.environmentIntensity !== undefined) {
      scene.environmentIntensity = envIntensity * 1.35
    }
    const envY = 0.12 + scrollDriver.rotationY * 0.15
    scene.environmentRotation.set(0, envY, 0)
    if (scene.backgroundRotation) scene.backgroundRotation.set(0, envY, 0)
  })

  return null
}

function Lightbulb() {
  const { scene } = useGLTF('/models/lightbulb.glb')
  const groupRef = useRef<THREE.Group>(null)
  const position = useSceneStore((s) => s.position)
  const rotation = useSceneStore((s) => s.rotation)
  const scale = useSceneStore((s) => s.scale)
  const lightIntensity = useSceneStore((s) => s.lightIntensity)
  const { scene: threeScene } = useThree()

  const model = useMemo(() => {
    const root = scene.clone(true)
    root.traverse((c) => {
      if ((c as THREE.Mesh).isMesh) {
        const mesh = c as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        mats.forEach((m) => enhanceMaterial(m, threeScene.environment))
      }
    })
    return root
  }, [scene, threeScene.environment])

  const cur = useRef({
    position: new THREE.Vector3(),
    scale: 3.4,
    light: 0.15,
  })

  useFrame((_, delta) => {
    const g = groupRef.current
    if (!g) return
    const t = Math.min(delta * 5, 1)
    cur.current.position.lerp(new THREE.Vector3(...position), t)
    g.position.copy(cur.current.position)
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, scale, t))
    // 正規の向き（シーンの傾きのみ）。スクロールの回転は ScrollCamera が担当
    g.rotation.x = rotation[0]
    g.rotation.y = rotation[1]
    g.rotation.z = rotation[2]
    cur.current.light = THREE.MathUtils.lerp(cur.current.light, lightIntensity, t)
    model.traverse((c) => {
      if (!(c as THREE.Mesh).isMesh) return
      const mesh = c as THREE.Mesh
      const raw = mesh.material
      const mats = Array.isArray(raw) ? raw : [raw]
      for (const m of mats) {
        if (m instanceof THREE.MeshStandardMaterial && m.emissive) {
          m.emissiveIntensity = 0.35 + cur.current.light * 3.2
        }
      }
    })
  })

  return (
    <group ref={groupRef}>
      <primitive object={model} />
      <pointLight
        position={[0, 0.4, 0.15]}
        intensity={0.6 + lightIntensity * 5}
        color="#fff9eb"
        distance={9}
        decay={2}
      />
    </group>
  )
}

function Scene() {
  return (
    <>
      <ScrollRig />
      <StudioEnvironment />
      <ambientLight intensity={0.92} color="#ffffff" />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.35}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-5, 2, 3]} intensity={0.55} color="#f0f4ff" />
      <directionalLight position={[0, 1, -6]} intensity={0.35} color="#ffffff" />
      <Lightbulb />
      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.22}
        scale={9}
        blur={2.5}
        far={1.2}
        color="#1a1a22"
        resolution={1024}
      />
    </>
  )
}

function getDpr() {
  if (typeof window === 'undefined') return 1
  return Math.min(window.devicePixelRatio, 2.5)
}

export function SceneCanvas() {
  const show3D = useSceneStore((s) => s.show3D)
  if (!show3D) return null

  return (
    <div className="canvas-fixed" aria-hidden>
      <Canvas
        dpr={getDpr()}
        shadows
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
