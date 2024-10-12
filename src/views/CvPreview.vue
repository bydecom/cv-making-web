<template>
  <div class="cv-container">
    <Template4 :cvData="cvData" :image="imageData" />
  </div>
</template>

<script setup>
import { defineProps, ref, defineExpose } from 'vue' // Import ref here
import html2pdf from 'html2pdf.js'
import Template4 from './templates/template4.vue'
// Use defineProps directly
const props = defineProps(['cvData', 'image']) // Add image prop
const isExporting = ref(false)
// const imageData = ref('') // New ref to hold the image data

const exportCv = async () => {
  isExporting.value = true
  const element = document.querySelector('.cv-container')
  const options = {
    margin: 0,
    filename: `${props.cvData.firstName}_${props.cvData.lastName}.pdf`,
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  }

  try {
    await html2pdf().from(element).set(options).save()
  } catch (error) {
    console.error('Error exporting CV:', error)
  } finally {
    isExporting.value = false
  }
}

// Expose the exportPDF method
defineExpose({ exportCv }) // This line exposes the exportPDF method
</script>

<style scoped>
.cv-container {
  width: 100%; /* Full width */
  max-width: 100%; /* Ensure it doesn't exceed 100% */
  margin: 0 auto;
  overflow: auto;
  min-height: 850px; /* Adjust this value as needed */
  page-break-after: always; /* Ensure it breaks after the CV */
}

.button-container {
  position: fixed; /* Fix the button at the bottom */
  bottom: 20px; /* Distance from the bottom */
  right: 20px; /* Distance from the right */
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  z-index: 1000; /* Ensure it stays above other content */
}
.export-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.export-button:hover {
  background-color: #0056b3;
}

/* Hide the button when exporting */
.button-container {
  display: none; /* Hide the button when exporting */
}
</style>
