<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { onMounted, ref } from 'vue'
import { orientation } from './composables'
import CaptureSelfie from './components/CaptureSelfie.vue'
import CapturePassport from './components/CapturePassport.vue'
import { useFaceApiStore, useOcrApiStore } from './store'

const { isPortrait } = orientation()

const faceApiStore = useFaceApiStore()
const ocrStore = useOcrApiStore()

const hasCapturedSelfie = ref(false)

onMounted(() => {

  faceApiStore.initFaceApi()
  ocrStore.initOcrApi()

})
</script>

<template>
  <CaptureSelfie v-if="!hasCapturedSelfie" />
  <CapturePassport v-else />
  <div><p>Portrait: {{ isPortrait }}</p></div>
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
