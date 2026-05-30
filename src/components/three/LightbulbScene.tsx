import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { useSceneStore } from '../../store/sceneStore'
import { HdriEnvironment } from './HdriEnvironment'

useGLTF.preload('/models/lightbulb.glb')

function GLBBulb({ emissiveIntensity }: { emissiveIntensity: number }) {
  const { scene } = useGLTF('/models/lightbulb.glb')
  const groupRef = useRef<THREE.Group>(null)
  const cloned = useMemo(() => scene.clone(true), [scene])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.08
    }
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const raw = mesh.material
        const mats = Array.isArray(raw) ? raw : [raw]
        for (const mat of mats) {
          if (mat instanceof THREE.MeshStandardMaterial) {
            if (mat.emissive) {
              mat.emissive.set('#ffe58a')
              mat.emissiveIntensity = emissiveIntensity * 2.8
            }
            mat.envMapIntensity = 0.8 + emissiveIntensity * 0.6
            if (mat.metalness > 0.3) mat.metalness = Math.min(mat.metalness, 0.95)
          }
          if (mat instanceof THREE.MeshPhysicalMaterial) {
            mat.transmission = 0.92
            mat.thickness = 0.4
            mat.roughness = Math.max(0.02, mat.roughness * 0.5)
            mat.envMapIntensity = 1.2 + emissiveIntensity * 0.8
          }
        }
      }
    })
  })

  return (
    <group ref={groupRef} scale={2.6}>
      <primitive object={cloned} />
      <pointLight position={[0, 0.25, 0]} intensity={emissiveIntensity * 4} color="#fff2b8" distance={6} />
      <pointLight position={[0, -0.3, 0.5]} intensity={emissiveIntensity * 1.2} color="#2dd4bf" distance={4} />
    </group>
  )
}

function SceneContent() {
  const lightIntensity = useSceneStore((s) => s.lightIntensity)
  const currentScene = useSceneStore((s) => s.currentScene)

  const positionY =
    currentScene === 'hub' ? 0.15 : currentScene === 'dashboard' ? -0.15 : currentScene === 'cta' ? 0.1 : 0

  return (
    <>
      <HdriEnvironment />
      <ambientLight intensity={0.08 + lightIntensity * 0.12} color="#8fa3b8" />
      <directionalLight position={[2, 5, 3]} intensity={0.25 + lightIntensity * 0.35} color="#dde7f0" />
      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.35}>
        <group position={[0, positionY, 0]}>
          <GLBBulb emissiveIntensity={lightIntensity} />
        </group>
      </Float>
      <ContactShadows position={[0, -1.25, 0]} opacity={0.45} scale={9} blur={2.8} far={4} color="#000000" />
    </>
  )
}

export function LightbulbScene() {
  const show3D = useSceneStore((s) => s.show3D)

  if (!show3D) return null

  return (
    <div className="canvas-layer" aria-hidden>
      <Canvas
        camera={{ position: [0, 0.25, 4.8], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}
