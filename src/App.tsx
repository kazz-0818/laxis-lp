import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, Float, ContactShadows, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

useGLTF.preload('/models/lightbulb.glb')

function Lightbulb() {
  const { scene } = useGLTF('/models/lightbulb.glb')
  const groupRef = useRef<THREE.Group>(null)
  const cloned = scene.clone(true)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.15
    }
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const raw = mesh.material
        const mats = Array.isArray(raw) ? raw : [raw]
        for (const mat of mats) {
          if (mat instanceof THREE.MeshStandardMaterial && mat.emissive) {
            mat.emissive.set('#ffe58a')
            mat.emissiveIntensity = 1.5
          }
        }
      }
    })
  })

  return (
    <group ref={groupRef} scale={2.5}>
      <primitive object={cloned} />
      <pointLight position={[0, 0.2, 0]} intensity={2} color="#fff2b8" distance={5} />
    </group>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0.3, 4.5], fov: 42 }} gl={{ antialias: true }}>
      <color attach="background" args={['#05070a']} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 4, 2]} intensity={0.5} />
      <Suspense fallback={null}>
        <Float speed={1.2} floatIntensity={0.5}>
          <Lightbulb />
        </Float>
        <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={8} blur={2} />
        <Environment preset="night" />
      </Suspense>
      <OrbitControls enablePan={false} minDistance={3} maxDistance={8} />
    </Canvas>
  )
}
