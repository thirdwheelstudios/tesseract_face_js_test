<script setup lang="ts">
import { onMounted, ref } from 'vue'

const videoEle = ref<HTMLVideoElement>()
const mediaStream = ref<MediaStream>()

onMounted(async () => {

    const constraints = {
        audio: false,
        video: {

        }
    } as MediaStreamConstraints

    mediaStream.value = await navigator.mediaDevices.getUserMedia(constraints)
})

</script>

<template>
    <video 
      :src-object.prop.camel="mediaStream" 
      autoplay
      ref="videoEle">
    </video>
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
</style>