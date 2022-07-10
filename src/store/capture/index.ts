import { defineStore } from 'pinia'

export const useCaptureStore = defineStore('capture', {
  state: () => {
    let faceBlob: Blob | null | undefined
    let passportBlob: Blob| null | undefined

    return {
      faceBlob,
      passportBlob,
    }
  },
  getters: {
    face(state) {
      return state.faceBlob
    },
    passport(state) {
        return state.passportBlob
    }
  },
  actions: {
    setFaceBlob(blob: Blob | null) {
        this.faceBlob = blob
    },
    setPassportBlob(blob: Blob | null) {
        this.passportBlob = blob
    }
  },
})