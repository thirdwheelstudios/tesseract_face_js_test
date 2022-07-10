<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useCaptureStore, useFaceApiStore, useOcrApiStore } from '../store'

const faceStore = useFaceApiStore()
const ocrStore = useOcrApiStore()
const captureStore = useCaptureStore()

const videoEle = ref<HTMLVideoElement>()
const canvasEle = ref<HTMLCanvasElement>()
const mediaStream = ref<MediaStream>()
const interval = ref<number>()
const countdownInterval = ref<number>()
const countdownSeconds = ref(3)

const hasSelection = computed(() => {

    if ((ocrStore.text?.length ?? 0) < 39) return false

    const mrzMatch = ocrStore.text?.match('P<[A-Z]*<{2}[A-Z]*')

    // return faceStore.apiDetections?.length === 1 && mrzMatch && mrzMatch.length > 0
    return mrzMatch && mrzMatch.length > 0
})

onMounted(async () => {

    const constraints = {
        audio: false,
        video: {
            facingMode: 'environment'
        }
    } as MediaStreamConstraints

    mediaStream.value = await navigator.mediaDevices.getUserMedia(constraints)

    interval.value = setInterval(async () => {
        const video = videoEle.value
        const canvas = canvasEle.value

        if (!video || !canvas) return

        const context = canvas.getContext('2d')

        canvas.height = video.videoHeight
        canvas.width = video.videoWidth
        context?.drawImage(video, 0, 0, canvas.width, canvas.height)

        await Promise.all([
            faceStore.detectFaces(canvas),
            ocrStore.detectText(canvas)
        ])
        
    }, 1000)
})

onUnmounted(() => {
    if (interval.value) clearInterval(interval.value)
})

watch(() => hasSelection.value,(value) => {
    if (value) {

        countdownSeconds.value = 3
        countdownInterval.value = setInterval(() => countdownSeconds.value -= 1, 1000)

    } else if (countdownInterval.value) {
        clearInterval(countdownInterval.value)
    }
})

watch(() => countdownSeconds.value, (value) => {
    if (value === 0 && canvasEle.value) {
        canvasEle.value.toBlob((blob) => {
            captureStore.setPassportBlob(blob)
        })
    }
})

</script>

<template>
    <video
      :src-object.prop.camel="mediaStream" 
      autoplay
      ref="videoEle">
    </video>
    <canvas ref="canvasEle"></canvas>
    <div class="overlay" :class="{ 'has-selection': hasSelection }">
        <div v-show="hasSelection && countdownSeconds >= 0">{{ countdownSeconds }}s</div>
    </div>
</template>

<style scoped>
    video {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
        object-fit: fill;
    }

    canvas {
        display: none;
    }

    .overlay {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        height: calc(100% - 5rem);
        width: calc(100% - 5rem);
        border: 2px #fff solid;
        margin: 2.5rem;
        border-radius: 10%;
        transition: border 0.2s ease-in;
    }

    .overlay.has-selection {
        border: 3px green solid;
    }

    .overlay div {
        font-size: 2em;
        font-weight: 700;
        color: #fff;
        margin-top: 100%;
    }
</style>