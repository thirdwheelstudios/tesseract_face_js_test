import { defineStore } from 'pinia'
import * as faceAPI from 'face-api.js'

export const useFaceApiStore = defineStore('faceApi', {
  state: () => {
    let apiIsInitialized: boolean | undefined

    return {
      apiIsInitialized,
    }
  },
  getters: {
    isInitialized(state) {
      return state.apiIsInitialized
    },
  },
  actions: {
    async initFaceApi() {
      await faceAPI.nets.tinyFaceDetector.loadFromUri('/models')
      this.apiIsInitialized = true
    },
  },
})