import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, RoundedBox, Grid } from '@react-three/drei'
import type { Group } from 'three'

export type SceneMode = 'chaos' | 'organize' | 'hub'

interface FloatingObjectsProps {
  mode?: SceneMode
  progressRef: React.MutableRefObject<number>
  hero?: boolean
}

export function FloatingObjects({ progressRef, hero = false }: FloatingObjectsProps) {
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
    const p = progressRef.current ?? 0
    const scale = hero ? 1.5 - p * 0.35 : 1.1
    group.current.scale.setScalar(scale)
    group.current.rotation.y = t * 0.05 + mouse.current.x * 0.1 * (1 - p * 0.5)
    group.current.rotation.x = mouse.current.y * 0.06
    group.current.position.y = -p * (hero ? 2.5 : 0.8)
    group.current.position.z = -p * 1.2
  })

  const s = hero ? 1.4 : 1

  return (
    <group ref={group}>
      {hero && (
        <Grid
          position={[0, -2.5, 0]}
          args={[16, 16]}
          cellSize={0.55}
          cellThickness={0.4}
          cellColor="#94a3b8"
          sectionSize={2.5}
          sectionThickness={0.8}
          sectionColor="#22d3ee"
          fadeDistance={16}
          infiniteGrid
        />
      )}

      <Float speed={1.3} floatIntensity={1.2}>
        <RoundedBox args={[2.2 * s, 1.3 * s, 0.1]} radius={0.08} position={[-2.4, 0.4, 0]}>
          <meshStandardMaterial color="#e2e8f0" metalness={0.2} roughness={0.4} />
        </RoundedBox>
      </Float>

      <Float speed={1.5} floatIntensity={1.3}>
        <RoundedBox args={[1.2 * s, 1.2 * s, 0.1]} radius={0.06} position={[2.2, 0, 0.4]}>
          <meshStandardMaterial color="#ffffff" emissive="#2dd4bf" emissiveIntensity={0.08} metalness={0.15} roughness={0.35} />
        </RoundedBox>
      </Float>

      <Float speed={1.1} floatIntensity={1}>
        <mesh position={[0.3, 1.8 * s, -0.2]}>
          <torusKnotGeometry args={[0.5 * s, 0.11 * s, 96, 16]} />
          <meshStandardMaterial color="#06b6d4" wireframe opacity={0.5} transparent />
        </mesh>
      </Float>

      <Float speed={1.4} floatIntensity={1.1}>
        <mesh position={[2.5, 1.2, -0.5]}>
          <octahedronGeometry args={[0.45 * s]} />
          <MeshDistortMaterial color="#22d3ee" distort={0.25} speed={2} metalness={0.3} emissive="#22d3ee" emissiveIntensity={0.08} />
        </mesh>
      </Float>

      <Float speed={0.9} floatIntensity={0.8}>
        <RoundedBox args={[0.5 * s, 0.35 * s, 0.06]} radius={0.05} position={[-1.8, -1.4, 0.6]}>
          <meshStandardMaterial color="#f8fafc" emissive="#2dd4bf" emissiveIntensity={0.12} />
        </RoundedBox>
      </Float>

      <Float speed={1.2} floatIntensity={0.9}>
        <RoundedBox args={[1 * s, 0.35 * s, 0.07]} radius={0.08} position={[0.5, -1.8, 0.3]}>
          <meshStandardMaterial color="#ffffff" emissive="#06b6d4" emissiveIntensity={0.1} />
        </RoundedBox>
      </Float>

      <mesh position={[0, 0, -0.6]}>
        <torusGeometry args={[1.6 * s, 0.03, 8, 80]} />
        <meshStandardMaterial color="#0f2744" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}
