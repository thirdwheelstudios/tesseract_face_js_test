<script setup lang="ts">
import { ref } from 'vue'
import { useCaptureStore } from '../store'

const captureStore = useCaptureStore()

const selfieImageEle = ref<HTMLImageElement>()
const selfieImageSource = ref(URL.createObjectURL(captureStore.face!))

const passportImageEle = ref<HTMLImageElement>()
const passportImageSource = ref(URL.createObjectURL(captureStore.passport!))

const restartDemo = () => {
    captureStore.$reset()
}

</script>

<template>
   <h1>Capture completed</h1>
    <p>Selfie</p>
    <img ref="selfieImageEle" :src="selfieImageSource" alt="captured selfie image">
    <p>Passport</p>
    <img ref="passportImageEle" :src="passportImageSource" alt="captured passport image">
   <button @click="restartDemo">Restart Demo</button>
</template>

<style scoped>
    img {
        width: 100%;
    }
</style>