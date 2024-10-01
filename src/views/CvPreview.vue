<template>
  <div class="cv-container">
    <Template3 :cvData="cvData" :image="imageData" />
    <div class="button-container">
      <button v-if="!isExporting" @click="exportPDF" class="export-button">Export PDF</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import Template3 from './templates/template3.vue'
import html2pdf from 'html2pdf.js'

const props = defineProps(['cvData'])
const isExporting = ref(false)
const imageData = ref('') // New ref to hold the image data

const exportPDF = async () => {
  isExporting.value = true
  const element = document.querySelector('.cv-container')
  const options = {
    margin: 0.5,
    filename: `${props.cvData.firstName}_${props.cvData.lastName}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  }

  await html2pdf().from(element).set(options).save()
  isExporting.value = false
}

// Method to update the image data
const updateImage = (newImage) => {
  imageData.value = newImage
}
</script>

<style scoped>
.cv-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  overflow: auto;
  min-height: 600px;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
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
</style>
