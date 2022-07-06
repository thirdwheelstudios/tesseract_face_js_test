import { onMounted, onUnmounted, ref } from 'vue'

export function orientation() {

  const isPortrait = ref(true)

  let mediaMatch = window.matchMedia("(orientation: portrait)")

  const onChange = (e: any) => {
    isPortrait.value = e.matches
  }

  onMounted(() => mediaMatch.addEventListener('change', onChange))
  onUnmounted(() => mediaMatch.removeEventListener('change', onChange))

  return {
    isPortrait
  }
}