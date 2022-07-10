<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { computed, onMounted, ref } from 'vue'
import { orientation } from './composables'
import CaptureSelfie from './components/CaptureSelfie.vue'
import CapturePassport from './components/CapturePassport.vue'
import { useCaptureStore, useFaceApiStore, useOcrApiStore } from './store'
import Summary from './components/Summary.vue'

const { isPortrait } = orientation()

const faceApiStore = useFaceApiStore()
const ocrStore = useOcrApiStore()
const captureStore = useCaptureStore()

const hasCapturedSelfie = computed(() => captureStore.face != null && captureStore.face != undefined)
const hasCapturedPassport = computed(() => captureStore.passport != null && captureStore.passport != undefined)

onMounted(() => {

  faceApiStore.initFaceApi()
  ocrStore.initOcrApi()

})
</script>

<template>
  <div v-if="!isPortrait">Please hold the device in portrait mode</div>
  <CaptureSelfie v-else-if="!hasCapturedSelfie" />
  <CapturePassport v-else-if="!hasCapturedPassport" />
  <Summary v-else />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
