import { useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollDriver, syncScrollDriver } from '../../scroll/scrollDriver'

const LOOK_AT = new THREE.Vector3(0, 0.05, 0)
const DISTANCE = 2.55
const HEIGHT = 0.04

/**
 * スクロール連動のカメラ周回。
 * Canvas に camera prop を渡すと R3F が毎レンダーで位置をリセットするため、
 * useFrame 内だけでカメラを動かす。
 */
export function ScrollRig() {
  const { camera } = useThree()

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 26
      camera.near = 0.1
      camera.far = 100
      camera.position.set(0, HEIGHT, DISTANCE)
      camera.lookAt(LOOK_AT)
      camera.updateProjectionMatrix()
    }
  }, [camera])

  useFrame(() => {
    syncScrollDriver()
    const angle = scrollDriver.rotationY
    camera.position.set(Math.sin(angle) * DISTANCE, HEIGHT, Math.cos(angle) * DISTANCE)
    camera.lookAt(LOOK_AT)
  })

  return null
}
