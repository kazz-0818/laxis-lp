import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, RoundedBox, Grid } from '@react-three/drei'
import type { Group, Mesh } from 'three'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface Floating3DSceneProps {
  className?: string
  variant?: 'hero' | 'inline'
}

function FloatingObjects({ hero }: { hero: boolean }) {
  const group = useRef<Group>(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    const scale = hero ? 1.35 : 1
    group.current.scale.setScalar(scale)
    group.current.rotation.y = t * 0.06 + mouse.current.x * 0.12
    group.current.rotation.x = mouse.current.y * 0.08
  })

  return (
    <group ref={group}>
      {hero && (
        <Grid
          position={[0, -2.2, 0]}
          args={[12, 12]}
          cellSize={0.5}
          cellThickness={0.4}
          cellColor="#1e4d7a"
          sectionSize={2}
          sectionThickness={0.8}
          sectionColor="#2dd4bf"
          fadeDistance={14}
          fadeStrength={1.5}
          infiniteGrid
        />
      )}

      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1.2}>
        <RoundedBox args={[hero ? 2.2 : 1.4, hero ? 1.4 : 0.9, 0.1]} radius={0.08} position={[-2.2, 0.5, 0]}>
          <meshStandardMaterial color="#1e4d7a" metalness={0.5} roughness={0.3} />
        </RoundedBox>
      </Float>

      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.4}>
        <RoundedBox args={[hero ? 1.6 : 1, hero ? 1 : 0.65, 0.08]} radius={0.06} position={[2.4, 0.2, 0.3]}>
          <meshStandardMaterial
            color="#0f2744"
            metalness={0.4}
            roughness={0.35}
            emissive="#22d3ee"
            emissiveIntensity={0.08}
          />
        </RoundedBox>
      </Float>

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[1.8, -0.5, 0.4]} rotation={[0.2, 0.5, 0.1]}>
          <boxGeometry args={[hero ? 1 : 0.7, hero ? 1 : 0.7, 0.14]} />
          <meshStandardMaterial
            color="#2dd4bf"
            emissive="#2dd4bf"
            emissiveIntensity={0.25}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      </Float>

      <Float speed={0.9} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh position={[0, hero ? 2 : 1.4, -0.2]}>
          <torusKnotGeometry args={[hero ? 0.55 : 0.35, hero ? 0.12 : 0.08, 64, 12]} />
          <meshStandardMaterial color="#22d3ee" wireframe transparent opacity={0.9} />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.9}>
        <RoundedBox args={[0.7, 0.7, 0.12]} radius={0.05} position={[-0.8, -1.6, 0.5]}>
          <meshStandardMaterial color="#5eead4" metalness={0.35} roughness={0.4} />
        </RoundedBox>
      </Float>

      <Float speed={1.3} rotationIntensity={0.4} floatIntensity={1}>
        <mesh position={[2.6, 1.4, -0.6]}>
          <octahedronGeometry args={[hero ? 0.55 : 0.35, 0]} />
          <MeshDistortMaterial
            color="#06b6d4"
            distort={0.3}
            speed={2}
            metalness={0.5}
            roughness={0.15}
            emissive="#06b6d4"
            emissiveIntensity={0.15}
          />
        </mesh>
      </Float>

      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.7}>
        <mesh position={[-2, -1.2, 0.2]} rotation={[0.1, 0.3, 0]}>
          <boxGeometry args={[0.5, 0.35, 0.06]} />
          <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.2} />
        </mesh>
      </Float>

      <TangledLines hero={hero} />
      <NotificationChip position={[-2.8, -1, 0.8]} hero={hero} />
      <NotificationChip position={[1, -2.2, 0.3]} color="#5eead4" hero={hero} />
      <NotificationChip position={[-0.5, 1.8, 0.6]} color="#a78bfa" hero={hero} label="AI" />
    </group>
  )
}

function TangledLines({ hero }: { hero: boolean }) {
  const ref = useRef<Mesh>(null)
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * 0.12
  })
  const r = hero ? 1.8 : 1.2
  return (
    <group>
      <mesh ref={ref} position={[0, 0, -0.5]}>
        <torusGeometry args={[r, 0.025, 8, 64]} />
        <meshStandardMaterial color="#22d3ee" transparent opacity={0.5} emissive="#22d3ee" emissiveIntensity={0.2} />
      </mesh>
      <mesh rotation={[1.2, 0, 0]}>
        <torusGeometry args={[r * 0.85, 0.02, 8, 48]} />
        <meshStandardMaterial color="#5eead4" transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

function NotificationChip({
  position,
  color = '#22d3ee',
  hero,
}: {
  position: [number, number, number]
  color?: string
  hero?: boolean
  label?: string
}) {
  const w = hero ? 1.2 : 0.9
  return (
    <Float speed={2} floatIntensity={0.5}>
      <RoundedBox args={[w, 0.32, 0.07]} radius={0.1} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
          metalness={0.2}
          roughness={0.3}
        />
      </RoundedBox>
    </Float>
  )
}

function SceneContent({ hero }: { hero: boolean }) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[8, 8, 5]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-5, 3, 2]} intensity={0.6} color="#5eead4" />
      <pointLight position={[0, 2, 3]} intensity={0.8} color="#22d3ee" distance={12} />
      <pointLight position={[-3, -1, 2]} intensity={0.5} color="#2dd4bf" distance={10} />
      <FloatingObjects hero={hero} />
    </>
  )
}

export function Floating3DScene({
  className,
  variant = 'inline',
}: Floating3DSceneProps) {
  const reduced = useReducedMotion()
  const hero = variant === 'hero'

  if (reduced) {
    return (
      <div
        className={`relative flex items-center justify-center ${className ?? ''}`}
        aria-hidden
      >
        <div className="w-full h-full min-h-[280px] rounded-3xl bg-linear-to-br from-navy-800/30 to-cyan-500/15 border border-white/10 flex items-center justify-center glow-mint">
          <div className="grid grid-cols-2 gap-3 p-8">
            {['Dashboard', 'LINE', 'AI', 'Sheet'].map((t) => (
              <div
                key={t}
                className="rounded-xl glass-card px-4 py-3 text-xs font-semibold text-navy-800"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className ?? ''}`}>
      <Canvas
        camera={{
          position: hero ? [0, 0.3, 7] : [0, 0, 5.5],
          fov: hero ? 50 : 45,
        }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="!absolute inset-0 touch-none"
      >
        <Suspense fallback={null}>
          <SceneContent hero={hero} />
        </Suspense>
      </Canvas>
    </div>
  )
}
