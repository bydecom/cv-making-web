<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <h1 class="text-2xl font-semibold mb-6 text-center">OCR Text Extractor</h1>
          <input
            type="file"
            @change="handleFileUpload"
            accept=".png,.jpg,.jpeg,.pdf"
            class="mb-4"
          />
          <input
            type="text"
            v-model="pdfLink"
            placeholder="Enter PDF link"
            class="mb-4 w-full p-2 border rounded"
          />
          <button
            @click="loadPdfFromLink"
            class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Load PDF from Link
          </button>
          <select v-model="selectedLanguage" class="mb-4 w-full p-2 border rounded">
            <option value="eng">English</option>
            <option value="vie">Vietnamese</option>
          </select>
          <button
            @click="extractText"
            class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Extract Text
          </button>
          <button
            @click="parseText"
            class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Parsing...' : 'Parse Text' }}
          </button>
          <div v-if="extractedText" class="mt-4 col">
            <h2 class="text-xl font-semibold mb-2">Extracted Text:</h2>
            <pre class="bg-gray-100 p-4 rounded whitespace-pre-wrap overflow-auto max-h-96">{{
              extractedText
            }}</pre>
            <button
              @click="downloadText"
              class="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Download Text
            </button>
          </div>
          <div v-if="parsedText && !isLoading" class="mt-4 col">
            <h2 class="text-xl font-semibold mb-2">Parsed Text:</h2>
            <pre class="bg-gray-100 p-4 rounded whitespace-pre-wrap overflow-auto max-h-96">{{
              parsedText
            }}</pre>
          </div>
          <!-- Loading indicator -->
          <div v-if="isLoading" class="mt-4 text-center">
            <div
              class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"
            ></div>
            <p class="mt-2">Parsing text, please wait...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createWorker } from 'tesseract.js'
import * as pdfjsLib from 'pdfjs-dist'
import 'pdfjs-dist/build/pdf.worker.mjs'

const extractedText = ref('')
const selectedFile = ref(null)
const selectedLanguage = ref('eng')
const parsedText = ref('')
const isLoading = ref(false)
const pdfLink = ref('')

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0]
}

const loadPdfFromLink = async () => {
  if (!pdfLink.value) {
    alert('Please enter a valid PDF link.')
    return
  }
  try {
    const response = await fetch(pdfLink.value)
    if (!response.ok) {
      throw new Error('Failed to fetch PDF from the link.')
    }
    const blob = await response.blob()
    selectedFile.value = new File([blob], 'loaded.pdf', { type: 'application/pdf' })
    alert('PDF loaded successfully from the link.')
  } catch (error) {
    console.error('Error loading PDF:', error)
    alert('Error loading PDF from the link.')
  }
}

const parseText = async () => {
  if (!extractedText.value) {
    alert('Please extract text first.')
    return
  }

  isLoading.value = true
  parsedText.value = ''

  try {
    const response = await fetch('https://api.arliai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ARLIAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'Meta-Llama-3.1-8B-Instruct',
        messages: [
          { role: 'system', content: 'Always respone in JSON form without codeblock' },
          { role: 'user', content: extractedText.value }
        ],
        repetition_penalty: 1.1,
        temperature: 0.7,
        top_p: 0.9,
        top_k: 40,
        max_tokens: 1024,
        stream: false // Đặt là false để nhận toàn bộ phản hồi cùng một lúc
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    parsedText.value = data.choices[0].message.content
  } catch (error) {
    console.error('Error:', error)
    parsedText.value = 'An error occurred during text parsing.'
  } finally {
    isLoading.value = false
  }
}

const extractTextFromPDF = async (file) => {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  let fullText = ''

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const textContent = await page.getTextContent()
    const pageText = textContent.items.map((item) => item.str).join(' ')
    fullText += pageText + '\n'
  }

  return fullText.trim()
}

const extractText = async () => {
  if (!selectedFile.value) {
    // alert('Please select a file first.');
    alert(import.meta.env.VITE_OPENAI_API_KEY)
    return
  }

  try {
    let fullText = ''

    if (selectedFile.value.type === 'application/pdf') {
      fullText = await extractTextFromPDF(selectedFile.value)
    } else {
      // Trường hợp file không phải PDF, ví dụ xử lý hình ảnh
      const worker = await createWorker(selectedLanguage.value)
      const {
        data: { text }
      } = await worker.recognize(URL.createObjectURL(selectedFile.value))
      fullText = text
      await worker.terminate()
    }

    extractedText.value = fullText
  } catch (error) {
    console.error('Error:', error)
    extractedText.value = 'An error occurred during text extraction.'
  }
}

const downloadText = () => {
  const blob = new Blob([extractedText.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'extracted_text.txt'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>
