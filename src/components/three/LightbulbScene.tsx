import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, Float, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { useSceneStore } from '../../store/sceneStore'

useGLTF.preload('/models/lightbulb.glb')

type LightbulbModelProps = {
  source: 'glb' | 'procedural'
  emissiveIntensity: number
}

function ProceduralBulb({ emissiveIntensity }: { emissiveIntensity: number }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.1
    }
  })

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        metalness: 0,
        roughness: 0.05,
        transmission: 0.95,
        thickness: 0.5,
        transparent: true,
        opacity: 0.85,
      }),
    [],
  )

  const filamentMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#fff2b8',
        emissive: '#ffe58a',
        emissiveIntensity: emissiveIntensity * 3,
      }),
    [emissiveIntensity],
  )

  const baseMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#888888',
        metalness: 0.8,
        roughness: 0.3,
      }),
    [],
  )

  return (
    <group ref={groupRef} scale={1.2}>
      <mesh material={glassMat}>
        <sphereGeometry args={[0.55, 32, 32]} />
      </mesh>
      <mesh position={[0, -0.15, 0]} material={filamentMat}>
        <torusGeometry args={[0.12, 0.015, 8, 32]} />
      </mesh>
      <mesh position={[0, -0.55, 0]} material={baseMat}>
        <cylinderGeometry args={[0.25, 0.3, 0.35, 16]} />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={emissiveIntensity * 2} color="#fff2b8" distance={4} />
    </group>
  )
}

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
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        mats.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial && mat.emissive) {
            mat.emissive.set('#ffe58a')
            mat.emissiveIntensity = emissiveIntensity * 2.5
          }
        })
      }
    })
  })

  return (
    <group ref={groupRef} scale={2.5}>
      <primitive object={cloned} />
      <pointLight position={[0, 0.2, 0]} intensity={emissiveIntensity * 3} color="#fff2b8" distance={5} />
    </group>
  )
}

function LightbulbModel({ source, emissiveIntensity }: LightbulbModelProps) {
  if (source === 'procedural') {
    return <ProceduralBulb emissiveIntensity={emissiveIntensity} />
  }
  return <GLBBulb emissiveIntensity={emissiveIntensity} />
}

function SceneContent() {
  const lightIntensity = useSceneStore((s) => s.lightIntensity)
  const currentScene = useSceneStore((s) => s.currentScene)

  const positionY = currentScene === 'hub' ? 0.2 : currentScene === 'dashboard' ? -0.1 : 0

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[3, 4, 2]} intensity={0.4} color="#dde7f0" />
      <directionalLight position={[-2, 1, -3]} intensity={0.2} color="#2dd4bf" />
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
        <group position={[0, positionY, 0]}>
          <LightbulbModel source="glb" emissiveIntensity={lightIntensity} />
        </group>
      </Float>
      <ContactShadows position={[0, -1.2, 0]} opacity={0.35} scale={8} blur={2.5} far={4} color="#000" />
      <Environment preset="night" />
    </>
  )
}

type LightbulbSceneProps = {
  modelSource?: 'glb' | 'procedural'
}

export function LightbulbScene({ modelSource: _modelSource = 'glb' }: LightbulbSceneProps) {
  const show3D = useSceneStore((s) => s.show3D)

  if (!show3D) return null

  return (
    <div className="canvas-layer" aria-hidden>
      <Canvas
        camera={{ position: [0, 0.3, 4.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}
