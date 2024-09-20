<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <h1 class="text-2xl font-semibold mb-6 text-center">Example Page</h1>
          <input type="file" @change="handleFileUpload" accept=".png,.jpg,.jpeg,.pdf" class="mb-4">
          <button @click="runOCR" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Run OCR
          </button>
          <div v-if="result" class="mt-4">
            <h2 class="text-xl font-semibold mb-2">OCR Result:</h2>
            <pre class="bg-gray-100 p-4 rounded whitespace-pre-wrap overflow-auto max-h-96">{{ result }}</pre>
            <button @click="downloadResult" class="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
              Download Result
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { createWorker } from 'tesseract.js';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.mjs';

const result = ref('');
const selectedFile = ref(null);

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];
};

const extractImagesFromPDF = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const images = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.0 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({ canvasContext: context, viewport: viewport }).promise;
    images.push(canvas.toDataURL());
  }

  return images;
};

const runOCR = async () => {
  if (!selectedFile.value) {
    alert('Please select a file first.');
    return;
  }

  try {
    const worker = await createWorker('vie');
    let images = [];

    if (selectedFile.value.type === 'application/pdf') {
      images = await extractImagesFromPDF(selectedFile.value);
    } else {
      images = [URL.createObjectURL(selectedFile.value)];
    }

    let fullText = '';
    for (const image of images) {
      const { data: { text } } = await worker.recognize(image);
      fullText += text + '\n\n';
    }

    result.value = fullText.trim();
    await worker.terminate();
  } catch (error) {
    console.error('OCR Error:', error);
    result.value = 'An error occurred during OCR processing.';
  }
};

const downloadResult = () => {
  const blob = new Blob([result.value], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ocr_result.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
</script>