<template>
  <div class="cv-container">
    <Template5 :cvData="cvData" />
  </div>
</template>

<script setup>
import { defineProps, ref, defineExpose } from 'vue' // Import ref here
//import html2pdf from 'html2pdf.js'
import jsPDF from 'jspdf'
import Template5 from './templates/template5.vue'
// Use defineProps directly
const props = defineProps(['cvData', 'image']) // Add image prop
const isExporting = ref(false)
// const imageData = ref('') // New ref to hold the image data

const exportCv = async () => {
  isExporting.value = true
  try {
    const doc = new jsPDF('portrait', 'pt', 'letter') // Tạo file PDF (đơn vị pt, khổ giấy Letter)
    const element = document.querySelector('.cv-container')

    // Thêm nội dung HTML vào file PDF (dạng văn bản)
    doc.html(element, {
      callback: (doc) => {
        doc.save(`${props.cvData.firstName}_${props.cvData.lastName}.pdf`)
      },
      html2canvas: {
        scale: 0.6 // Giảm kích thước xuống 75% so với gốc
      }
    })
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
  bottom: 0px; /* Distance from the bottom */
  right: 0px; /* Distance from the right */
  display: flex;
  justify-content: flex-end;
  margin-top: 0px;
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
