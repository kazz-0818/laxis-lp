import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { FloatingObjects } from './FloatingObjects'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

interface HeroSceneProps {
  className?: string
  progressRef: React.MutableRefObject<number>
}

function HeroFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="grid grid-cols-2 gap-3 p-6">
        {['Dashboard', 'LINE', 'AI', 'Sheet'].map((t) => (
          <div key={t} className="glass-neon px-5 py-4 rounded-xl text-sm font-semibold text-mint-400">
            {t}
          </div>
        ))}
      </div>
    </div>
  )
}

export function HeroScene({ className, progressRef }: HeroSceneProps) {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  if (reduced || mobile) {
    return (
      <div className={className} aria-hidden>
        <HeroFallback />
      </div>
    )
  }

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0.2, 8], fov: 48 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="!absolute inset-0"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[6, 8, 4]} intensity={1.5} />
          <pointLight position={[0, 3, 2]} intensity={1} color="#22d3ee" distance={15} />
          <pointLight position={[-4, -2, 3]} intensity={0.6} color="#2dd4bf" distance={12} />
          <FloatingObjects mode="chaos" progressRef={progressRef} hero />
        </Suspense>
      </Canvas>
    </div>
  )
}
