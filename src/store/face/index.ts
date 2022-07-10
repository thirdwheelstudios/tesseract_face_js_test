import { defineStore } from 'pinia'
import * as faceAPI from 'face-api.js'

export const useFaceApiStore = defineStore('faceApi', {
  state: () => {
    let apiIsInitialized: boolean | undefined
    let apiNet: faceAPI.SsdMobilenetv1 | undefined
    let apiDetections: any[] | undefined

    return {
      apiIsInitialized,
      apiNet,
      apiDetections,
    }
  },
  getters: {
    isInitialized(state) {
      return state.apiIsInitialized
    },
    detections(state) {
        return state.apiDetections
    }
  },
  actions: {
    async initFaceApi() {
        await Promise.all([
          faceAPI.loadSsdMobilenetv1Model('/models'),
          faceAPI.loadTinyFaceDetectorModel('/models'),
          faceAPI.loadMtcnnModel('/models'),
          faceAPI.loadFaceLandmarkModel('/models'),
          faceAPI.loadFaceLandmarkTinyModel('/models'),
          faceAPI.loadFaceRecognitionModel('/models'),
          faceAPI.loadFaceExpressionModel('/models'),
        ])

        this.apiIsInitialized = true
    },

    async detectFaces(input: HTMLCanvasElement) {
        const detections = await faceAPI.detectAllFaces(input, new faceAPI.TinyFaceDetectorOptions())

        this.apiDetections = detections
    }
  },
})