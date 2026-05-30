import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useGLTF, Float, ContactShadows } from '@react-three/drei'
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js'
import * as THREE from 'three'

useGLTF.preload('/models/lightbulb.glb')

const HDRI = '/hdr/citrus_orchard_puresky_2k.exr'

function HdriBackground() {
  const exr = useLoader(EXRLoader, HDRI)
  const { scene, gl } = useThree()

  useEffect(() => {
    exr.mapping = THREE.EquirectangularReflectionMapping
    scene.background = exr
    scene.environment = exr
    scene.backgroundRotation = new THREE.Euler(0, Math.PI * 0.12, 0)
    scene.environmentRotation = new THREE.Euler(0, Math.PI * 0.12, 0)
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 0.55
    return () => {
      scene.background = null
      scene.environment = null
    }
  }, [exr, scene, gl])

  return null
}

function Lightbulb() {
  const { scene } = useGLTF('/models/lightbulb.glb')
  const groupRef = useRef<THREE.Group>(null)
  const cloned = scene.clone(true)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.2) * 0.06
    }
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const raw = mesh.material
        const mats = Array.isArray(raw) ? raw : [raw]
        for (const mat of mats) {
          if (mat instanceof THREE.MeshStandardMaterial && mat.emissive) {
            mat.emissive.set('#ffe58a')
            mat.emissiveIntensity = 1.8
          }
        }
      }
    })
  })

  return (
    <group ref={groupRef} position={[0, -0.05, 0]} scale={3.4}>
      <primitive object={cloned} />
      <pointLight position={[0, 0.3, 0]} intensity={2.5} color="#fff2b8" distance={5} />
    </group>
  )
}

function Scene() {
  return (
    <>
      <HdriBackground />
      <ambientLight intensity={0.35} />
      <directionalLight position={[2, 4, 3]} intensity={0.6} color="#ffffff" />
      <Float speed={1} floatIntensity={0.25} rotationIntensity={0.08}>
        <Lightbulb />
      </Float>
      <ContactShadows position={[0, -1.1, 0]} opacity={0.5} scale={6} blur={2.5} far={3} />
    </>
  )
}

export default function App() {
  return (
    <div className="viewport">
      <Canvas
        camera={{ position: [0, 0.12, 2.35], fov: 32, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <div className="viewport__scrim" aria-hidden />
    </div>
  )
}
