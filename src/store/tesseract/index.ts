import { defineStore } from 'pinia'
import Tesseract, { createWorker } from 'tesseract.js'

export const useOcrApiStore = defineStore('ocrApi', {
  state: () => {
    let apiIsInitialized: boolean | undefined
    let worker: Tesseract.Worker | undefined
    let ocrText: string | undefined

    return {
      apiIsInitialized,
      worker,
      ocrText,
    }
  },
  getters: {
    isInitialized(state) {
      return state.apiIsInitialized
    },
    text(state) {
      return state.ocrText
    },
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
    async detectText(canvas: HTMLCanvasElement) {
        if (!this.worker) return

        const { data: { text } } = await this.worker.recognize(canvas)

        this.ocrText = text

        console.log(text)
    },
  },
})