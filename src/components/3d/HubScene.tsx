import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, RoundedBox } from '@react-three/drei'
import type { Group } from 'three'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

interface HubSceneProps {
  className?: string
  gatherProgress: number
}

function HubCore({ gather }: { gather: number }) {
  const group = useRef<Group>(null)

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.25
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    const s = 0.8 + gather * 0.35
    group.current.scale.setScalar(s)
  })

  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <MeshDistortMaterial
          color="#0f2744"
          emissive="#2dd4bf"
          emissiveIntensity={0.25 + gather * 0.2}
          metalness={0.6}
          roughness={0.2}
          distort={0.15}
          speed={1.5}
        />
      </mesh>
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#22d3ee" wireframe transparent opacity={0.25 + gather * 0.3} />
      </mesh>
    </group>
  )
}

function OrbitCard({
  angle,
  radius,
  gather,
  color,
}: {
  angle: number
  radius: number
  gather: number
  color: string
}) {
  const ref = useRef<Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const r = radius * (1 - gather * 0.55)
    const a = angle + t * 0.15 * (1 - gather)
    ref.current.position.x = Math.cos(a) * r
    ref.current.position.z = Math.sin(a) * r
    ref.current.position.y = Math.sin(t + angle) * 0.15
  })

  return (
    <Float speed={1.5} floatIntensity={0.4}>
      <group ref={ref}>
        <RoundedBox args={[0.55, 0.3, 0.06]} radius={0.05}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} metalness={0.3} />
        </RoundedBox>
      </group>
    </Float>
  )
}

function HubContent({ gather }: { gather: number }) {
  const colors = ['#22d3ee', '#2dd4bf', '#5eead4', '#06b6d4', '#34d399', '#67e8f9', '#99f6e4', '#a78bfa']
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} />
      <pointLight position={[0, 0, 2]} intensity={1.2} color="#5eead4" />
      <HubCore gather={gather} />
      {colors.map((c, i) => (
        <OrbitCard key={i} angle={(i / 8) * Math.PI * 2} radius={2.8} gather={gather} color={c} />
      ))}
    </>
  )
}

export function HubScene({ className, gatherProgress }: HubSceneProps) {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  if (reduced || mobile) {
    return (
      <div className={`flex items-center justify-center ${className ?? ''}`} aria-hidden>
        <div className="w-32 h-32 rounded-2xl border-2 border-mint-400/50 bg-navy-800 flex items-center justify-center shadow-lg shadow-cyan-500/30">
          <span className="text-mint-400 font-bold text-center text-sm leading-tight">
            Laxis
            <br />
            Hub
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 1.5, 6], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <HubContent gather={gatherProgress} />
        </Suspense>
      </Canvas>
    </div>
  )
}
