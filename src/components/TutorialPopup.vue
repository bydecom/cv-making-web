<template>
  <div v-if="showPopup" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black opacity-50" @click="closePopup"></div>

      <!-- Modal -->
      <div class="relative bg-white rounded-lg w-full max-w-4xl p-6">
        <button
          @click="closePopup"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <span class="text-2xl">&times;</span>
        </button>
        <div class="tutorial-container">
          <iframe
            src="https://app.supademo.com/embed/cm3idqoqw021n82qcq87scqqr?embed_v=2"
            loading="lazy"
            title="Supademo Demo"
            allow="clipboard-write"
            frameborder="0"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            allowfullscreen
            class="w-full"
            style="aspect-ratio: 2.048"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showPopup = ref(false)

const closePopup = () => {
  showPopup.value = false
  localStorage.setItem('tutorialShown', 'true')
}

onMounted(() => {
  const tutorialShown = localStorage.getItem('tutorialShown')
  if (!tutorialShown) {
    showPopup.value = true
  }
})
</script>

<style scoped>
.tutorial-container {
  position: relative;
  width: 100%;
  max-height: 80vh;
}

.fixed.inset-0 {
  backdrop-filter: blur(10px);
}
</style>
