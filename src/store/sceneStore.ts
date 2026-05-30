import { create } from 'zustand'
import type { SceneId } from '../data/site'

interface SceneState {
  currentScene: SceneId
  lightIntensity: number
  envExposure: number
  chaosProgress: number
  organizeProgress: number
  systemizeProgress: number
  hubProgress: number
  show3D: boolean
  setCurrentScene: (scene: SceneId) => void
  setLightIntensity: (value: number) => void
  setEnvExposure: (value: number) => void
  setChaosProgress: (value: number) => void
  setOrganizeProgress: (value: number) => void
  setSystemizeProgress: (value: number) => void
  setHubProgress: (value: number) => void
  setShow3D: (value: boolean) => void
}

export const useSceneStore = create<SceneState>((set) => ({
  currentScene: 'hero',
  lightIntensity: 0.08,
  envExposure: 0.6,
  chaosProgress: 0,
  organizeProgress: 0,
  systemizeProgress: 0,
  hubProgress: 0,
  show3D: true,
  setCurrentScene: (scene) => set({ currentScene: scene }),
  setLightIntensity: (value) => set({ lightIntensity: value }),
  setEnvExposure: (value) => set({ envExposure: value }),
  setChaosProgress: (value) => set({ chaosProgress: value }),
  setOrganizeProgress: (value) => set({ organizeProgress: value }),
  setSystemizeProgress: (value) => set({ systemizeProgress: value }),
  setHubProgress: (value) => set({ hubProgress: value }),
  setShow3D: (value) => set({ show3D: value }),
}))
