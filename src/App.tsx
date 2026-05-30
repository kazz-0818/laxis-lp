import { Suspense, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, ContactShadows } from '@react-three/drei'
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js'
import * as THREE from 'three'
import { enhanceMaterial } from './three/enhanceMaterial'

useGLTF.preload('/models/lightbulb.glb')

const HDRI = '/hdr/citrus_orchard_puresky_2k.exr'
const WHITE = new THREE.Color('#ffffff')

function Environment() {
  const exr = useLoader(EXRLoader, HDRI)
  const { scene, gl } = useThree()

  useEffect(() => {
    exr.mapping = THREE.EquirectangularReflectionMapping
    scene.background = WHITE
    scene.environment = exr
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 1.12
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

  const model = useMemo(() => {
    const root = scene.clone(true)
    root.traverse((c) => {
      if ((c as THREE.Mesh).isMesh) {
        const mesh = c as THREE.Mesh
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        mats.forEach((m) => enhanceMaterial(m, threeScene.environment))
      }
    })
    return root
  }, [scene, threeScene.environment])

  useFrame((_, delta) => {
    model.rotation.y += delta * 0.15
  })

  return (
    <group scale={4.2}>
      <primitive object={model} />
      <pointLight position={[0, 0.4, 0.15]} intensity={2.5} color="#fff9eb" distance={9} />
    </group>
  )
}

export default function App() {
  return (
    <div className="viewport">
      <Canvas
        camera={{ position: [0, 0.04, 2.55], fov: 26 }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2.5)}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Environment />
          <ambientLight intensity={0.9} />
          <directionalLight position={[4, 6, 5]} intensity={1.2} />
          <directionalLight position={[-4, 2, 3]} intensity={0.5} />
          <Lightbulb />
          <ContactShadows position={[0, -1.05, 0]} opacity={0.2} scale={9} blur={2.5} resolution={1024} />
          <OrbitControls enablePan={false} minDistance={2} maxDistance={5} target={[0, 0.05, 0]} />
        </Suspense>
      </Canvas>
    </div>
  )
}
