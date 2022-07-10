<script setup lang="ts">
import { useCaptureStore } from '../store'

const captureStore = useCaptureStore()

const restartDemo = () => {
    captureStore.$reset()
}

</script>

<template>
   <div>Capture completed</div>
   <button @click="restartDemo">Restart Demo</button>
</template>

<style scoped>

</style>