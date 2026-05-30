import { create } from 'zustand'
import type { SceneId } from '../data/site'

export type Vec3 = [number, number, number]

export type Scene3DTarget = {
  position: Vec3
  rotation: Vec3
  scale: number
  lightIntensity: number
  envIntensity: number
  bgZoom: number
  bgBrightness: number
  bgOffsetY: number
}

export const sceneTargets: Record<SceneId, Scene3DTarget> = {
  hero: {
    position: [0, -0.02, 0.15],
    rotation: [0, 0, 0],
    scale: 4.85,
    lightIntensity: 0.15,
    envIntensity: 0.5,
    bgZoom: 1,
    bgBrightness: 0.35,
    bgOffsetY: 0,
  },
  chaos: {
    position: [-0.75, 0.05, -0.35],
    rotation: [0, 0.35, 0],
    scale: 3.1,
    lightIntensity: 0.28,
    envIntensity: 0.55,
    bgZoom: 1.05,
    bgBrightness: 0.38,
    bgOffsetY: -2,
  },
  lightOn: {
    position: [0, -0.02, 0.12],
    rotation: [0, 0.2, 0],
    scale: 5.05,
    lightIntensity: 1,
    envIntensity: 1,
    bgZoom: 1.08,
    bgBrightness: 0.65,
    bgOffsetY: 0,
  },
  organize: {
    position: [0, 0, 0.18],
    rotation: [0, -0.25, 0],
    scale: 4.65,
    lightIntensity: 0.82,
    envIntensity: 0.88,
    bgZoom: 1.1,
    bgBrightness: 0.55,
    bgOffsetY: 1,
  },
  systemize: {
    position: [0, 0.04, 0.2],
    rotation: [0, 0.35, 0],
    scale: 4.5,
    lightIntensity: 0.9,
    envIntensity: 0.92,
    bgZoom: 1.12,
    bgBrightness: 0.58,
    bgOffsetY: 0,
  },
  hub: {
    position: [0, 0.02, 0.28],
    rotation: [0, 0.15, 0],
    scale: 4.35,
    lightIntensity: 1,
    envIntensity: 1.05,
    bgZoom: 1.15,
    bgBrightness: 0.62,
    bgOffsetY: -1,
  },
  dashboard: {
    position: [0.4, -0.18, -0.55],
    rotation: [0.1, 0.65, 0],
    scale: 3.75,
    lightIntensity: 0.55,
    envIntensity: 0.75,
    bgZoom: 1.06,
    bgBrightness: 0.5,
    bgOffsetY: 2,
  },
  cta: {
    position: [0, -0.02, 0.1],
    rotation: [0, 0.1, 0],
    scale: 4.9,
    lightIntensity: 1,
    envIntensity: 1.1,
    bgZoom: 1.02,
    bgBrightness: 0.7,
    bgOffsetY: 0,
  },
}

interface SceneState extends Scene3DTarget {
  currentScene: SceneId
  show3D: boolean
  scrollRotation: number
  chaosProgress: number
  organizeProgress: number
  hubProgress: number
  setCurrentScene: (s: SceneId) => void
  setTarget: (t: Partial<Scene3DTarget>) => void
  setScrollRotation: (v: number) => void
  setChaosProgress: (v: number) => void
  setOrganizeProgress: (v: number) => void
  setHubProgress: (v: number) => void
  setShow3D: (v: boolean) => void
}

export const useSceneStore = create<SceneState>((set) => ({
  ...sceneTargets.hero,
  currentScene: 'hero',
  show3D: true,
  scrollRotation: 0,
  chaosProgress: 0,
  organizeProgress: 0,
  hubProgress: 0,
  setCurrentScene: (currentScene) => set({ currentScene }),
  setTarget: (t) => set(t),
  setScrollRotation: (scrollRotation) => set({ scrollRotation }),
  setChaosProgress: (chaosProgress) => set({ chaosProgress }),
  setOrganizeProgress: (organizeProgress) => set({ organizeProgress }),
  setHubProgress: (hubProgress) => set({ hubProgress }),
  setShow3D: (show3D) => set({ show3D }),
}))
