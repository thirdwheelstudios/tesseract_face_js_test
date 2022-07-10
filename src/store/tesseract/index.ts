import { defineStore } from 'pinia'
import Tesseract, { createWorker } from 'tesseract.js'

export const useOcrApiStore = defineStore('ocrApi', {
  state: () => {
    let apiIsInitialized: boolean | undefined
    let worker: Tesseract.Worker | undefined
    let ocrText: string | undefined
    let ocrBlob: Blob | null | undefined

    return {
      apiIsInitialized,
      worker,
      ocrText,
      ocrBlob,
    }
  },
  getters: {
    isInitialized(state) {
      return state.apiIsInitialized
    },
    text(state) {
      return state.ocrText
    },
    blob(state) {
      return state.ocrBlob
    }
  },
  actions: {
    async initOcrApi() {

      const worker = createWorker()

      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');

      this.worker = worker

      this.apiIsInitialized = true
    },
    detectText(canvas: HTMLCanvasElement) {
        if (!this.worker) return

        const worker = this.worker

        canvas.toBlob(async (blob) => {
          const { data: { text } } = await worker.recognize(canvas)

          this.ocrText = text
          this.ocrBlob = blob
  
          console.log(text)
        })
    },
  },
})