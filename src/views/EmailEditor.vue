<template>
  <div class="min-h-screen bg-gray-100 py-24">
    <div class="max-w-5xl mx-auto px-4">
      <div class="bg-white shadow-xl rounded-2xl overflow-hidden">
        <!-- Header Section -->
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 py-6 px-8">
          <h1 class="text-3xl font-bold text-white text-center">Email Cover Letter Generator</h1>
          <p class="text-blue-100 text-center mt-2">
            Create a professional job application email in seconds
          </p>
        </div>

        <div class="p-2">
          <!-- CV Upload Section -->
          <div class="mb-4 mt-4 p-2 border-2 border-dashed border-gray-300 rounded-lg">
            <div class="flex justify-between items-center">
              <label class="block text-gray-700 text-lg font-semibold">
                Upload Your CV
                <span class="text-gray-500 text-sm font-normal">(optional)</span>
              </label>
              <div class="flex items-center space-x-2">
                <input
                  type="file"
                  @change="handleFileUpload"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  class="hidden"
                  ref="fileInput"
                />
                <button
                  @click="$refs.fileInput.click()"
                  class="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                  :disabled="isLoading"
                >
                  {{ isLoading ? 'Processing...' : 'Choose File' }}
                </button>
              </div>
            </div>

            <!-- Loading indicator -->
            <div v-if="isLoading" class="mt-4 flex items-center justify-center">
              <div
                class="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"
              ></div>
              <span class="ml-2 text-gray-600">Processing file...</span>
            </div>

            <!-- CV Preview -->
            <div v-if="cvContent" class="mt-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-sm text-gray-600">CV Content Extracted:</span>
                <button @click="clearCV" class="text-red-500 hover:text-red-600">Clear</button>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 max-h-40 overflow-y-auto">
                {{ cvContent }}
              </div>
            </div>
          </div>

          <!-- Input Section -->
          <div class="grid gap-8 md:grid-cols-2">
            <!-- Job Description Input -->
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <label class="block text-gray-700 text-lg font-semibold mb-3">
                  Job Information
                  <span class="text-red-500">*</span>
                </label>
                <div class="flex space-x-2">
                  <button @click="showJDModal = true" class="ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-blue-600 hover:text-blue-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                  </button>
                  <button @click="fillJobDescription" class="ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-blue-600 hover:text-blue-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <textarea
                v-model="jobDescription"
                class="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[200px]"
                placeholder="E.g.: Company ABC is hiring for the position of Frontend Developer with 2 years of experience...
- Job requirements
- Job description
- Necessary skills
- Location of the job listing"
              ></textarea>
              <p class="text-sm text-gray-500">
                Please provide as much information as possible for the best results
              </p>
            </div>

            <!-- Sample Email Input -->
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <label class="block text-gray-700 text-lg font-semibold mb-3">
                  Sample Email Reference
                  <span class="text-gray-500 text-sm font-normal">(optional)</span>
                </label>
                <button @click="fillSampleEmail" class="ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-blue-600 hover:text-blue-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
              <textarea
                v-model="sampleEmail"
                class="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[200px]"
                placeholder="Paste a sample email here for the AI to reference style and structure..."
              ></textarea>
              <p class="text-sm text-gray-500">
                A sample email will help the AI generate content that matches your desired style
              </p>
            </div>
          </div>

          <!-- Generate Button -->
          <div class="mt-4 mb-4 flex justify-center">
            <button
              @click="generateEmail"
              class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition duration-300 min-w-[200px] flex items-center justify-center space-x-2"
              :disabled="isLoading"
            >
              <span>{{ isLoading ? 'Generating email...' : 'Generate email' }}</span>
              <div
                v-if="isLoading"
                class="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"
              ></div>
            </button>
          </div>

          <!-- Generated Email Output -->
          <div v-if="generatedEmail" class="mt-8">
            <div class="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold text-gray-800">Generated Email:</h2>
                <div class="flex space-x-2">
                  <button
                    @click="copyToClipboard(generatedEmail)"
                    class="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition duration-300 flex items-center space-x-2"
                  >
                    <span>Copy</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="downloadEmail"
                    class="px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition duration-300"
                  >
                    Download
                  </button>
                  <button
                    @click="openEditModal"
                    class="px-4 py-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition duration-300"
                  >
                    Edit
                  </button>
                </div>
              </div>
              <div class="prose max-w-none">
                <div class="bg-white p-6 rounded-lg shadow-inner whitespace-pre-wrap text-gray-700">
                  {{ generatedEmail }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Popup -->
  <div
    v-if="showModal"
    class="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!-- Background overlay -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        @click="showModal = false"
      ></div>

      <!-- Modal panel -->
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                Edit Email
              </h3>
              <div class="mt-2">
                <textarea
                  v-model="editableEmail"
                  class="w-full h-96 p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Edit your email here..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            @click="saveEditedEmail"
          >
            Save Changes
          </button>
          <button
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            @click="showModal = false"
          >
            Close
          </button>
          <button
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            @click="copyToClipboard(editableEmail)"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Add JD Import Modal -->
  <div
    v-if="showJDModal"
    class="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20">
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        @click="showJDModal = false"
      ></div>

      <div class="relative bg-white rounded-lg w-full max-w-2xl p-6">
        <div class="absolute top-4 right-4">
          <button @click="showJDModal = false" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Close</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <h3 class="text-lg font-medium text-gray-900 mb-4">Import Job Description</h3>

        <!-- Tab Navigation -->
        <div class="border-b border-gray-200 mb-4">
          <nav class="flex space-x-4" aria-label="Tabs">
            <button
              v-for="tab in ['URL', 'File']"
              :key="tab"
              @click="activeTab = tab"
              :class="[
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              {{ tab }}
            </button>
          </nav>
        </div>

        <!-- URL Input -->
        <div v-if="activeTab === 'URL'" class="space-y-4">
          <input
            v-model="jobUrl"
            type="url"
            placeholder="Enter PDF URL here (must end with .pdf)"
            class="w-full p-2 border rounded-lg"
          />
          <button
            @click="extractFromUrl"
            :disabled="isProcessing || !jobUrl"
            class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {{ isProcessing ? 'Processing...' : 'Extract PDF Content' }}
          </button>
        </div>

        <!-- File Upload -->
        <div v-else class="space-y-4">
          <div class="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <input
              type="file"
              @change="handleJDFileUpload"
              accept=".pdf,.png,.jpg,.jpeg"
              class="hidden"
              ref="jdFileInput"
            />
            <button
              @click="$refs.jdFileInput.click()"
              class="w-full py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              Choose File
            </button>
          </div>
        </div>

        <!-- Processing Status -->
        <div v-if="isProcessing" class="mt-4">
          <div class="flex items-center justify-center space-x-2">
            <div
              class="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"
            ></div>
            <span class="text-sm text-gray-600">Processing...</span>
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
import { GoogleGenerativeAI } from '@google/generative-ai'

const jobDescription = ref('')
const sampleEmail = ref('')
const generatedEmail = ref('')
const isLoading = ref(false)
const showModal = ref(false)
const editableEmail = ref('')
const cvContent = ref('')
const fileInput = ref(null)
const showJDModal = ref(false)
const activeTab = ref('URL')
const jobUrl = ref('')
const isProcessing = ref(false)
const jdFileInput = ref(null)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

// Function to fill job description with sample text
const fillJobDescription = () => {
  jobDescription.value = `Company ABC is hiring for the position of Frontend Developer with 2 years of experience...
- Job requirements: Proficiency in JavaScript, HTML, CSS
- Job description: Develop user-friendly web applications
- Necessary skills: Teamwork, Communication, Problem-solving
- From Facebook `
}

// Function to fill sample email with sample text
const fillSampleEmail = () => {
  sampleEmail.value = `Dear Hiring Manager,

I am writing to express my interest in the Frontend Developer position at Company ABC. With over 2 years of experience in web development, I am confident in my ability to contribute effectively to your team.

Thank you for considering my application. I look forward to the opportunity to discuss my qualifications further.

Sincerely,
[Your Name]`
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('Copied email to clipboard!')
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

// Function to extract text using OCR
const extractTextFromImage = async (file) => {
  const worker = await createWorker()
  try {
    await worker.loadLanguage('eng')
    await worker.initialize('eng')

    // Convert file to base64
    const base64Image = await new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.readAsDataURL(file)
    })

    const {
      data: { text }
    } = await worker.recognize(base64Image)
    await worker.terminate()
    return text
  } catch (error) {
    console.error('OCR Error:', error)
    await worker.terminate()
    throw error
  }
}

// Function to extract text from PDF
const extractTextFromPDF = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
    let fullText = ''

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)

      // Try to get text content first
      try {
        const textContent = await page.getTextContent()
        const pageText = textContent.items.map((item) => item.str).join(' ')
        if (pageText.trim()) {
          fullText += pageText + '\n'
          continue
        }
      } catch (e) {
        console.warn('Failed to extract text directly, falling back to OCR', e)
      }

      // If text extraction fails or returns empty, try OCR
      try {
        const scale = 1.5
        const viewport = page.getViewport({ scale })
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width

        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise

        // Convert canvas to blob
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
        const ocrText = await extractTextFromImage(blob)
        fullText += ocrText + '\n'
      } catch (e) {
        console.error('OCR fallback failed:', e)
      }
    }

    return fullText.trim()
  } catch (error) {
    console.error('PDF processing error:', error)
    throw error
  }
}

// Thêm hàm clearCV mới
const clearCV = () => {
  cvContent.value = ''
  if (fileInput.value) {
    fileInput.value.value = '' // Reset input file
  }
}

// Handle file upload
const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  isLoading.value = true
  try {
    let text = ''
    const fileType = file.type.toLowerCase()

    if (fileType === 'application/pdf') {
      text = await extractTextFromPDF(file)
    } else if (fileType.startsWith('image/')) {
      text = await extractTextFromImage(file)
    } else {
      // For other file types
      const reader = new FileReader()
      text = await new Promise((resolve) => {
        reader.onload = (e) => resolve(e.target.result)
        reader.readAsText(file)
      })
    }

    if (!text.trim()) {
      throw new Error('No text could be extracted from the file')
    }

    cvContent.value = text
  } catch (error) {
    console.error('Error processing file:', error)
    alert('Error reading file. Please try again.')
    clearCV()
  } finally {
    isLoading.value = false
  }
}

const generateEmail = async () => {
  if (!jobDescription.value) {
    alert('Please enter job description')
    return
  }

  isLoading.value = true
  generatedEmail.value = ''

  try {
    const prompt =
      import.meta.env.VITE_APP_EMAIL_PROMPT +
      `    
    Job information: ${jobDescription.value}
    ${sampleEmail.value ? `Sample email reference: ${sampleEmail.value}` : ''}
    ${cvContent.value ? `CV Content: ${cvContent.value}` : ''}
    "`

    const result = await model.generateContent(prompt)
    const emailContent = result.response.text()

    if (!emailContent) {
      throw new Error('Failed to generate email content')
    }

    generatedEmail.value = emailContent
    editableEmail.value = emailContent
    showModal.value = true
  } catch (error) {
    console.error('Error:', error)
    generatedEmail.value = 'An error occurred while creating the email.'
  } finally {
    isLoading.value = false
  }
}

const saveEditedEmail = () => {
  generatedEmail.value = editableEmail.value
  showModal.value = false
}

// Function to handle JD file upload
const handleJDFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  isProcessing.value = true
  try {
    let text = ''
    const fileType = file.type.toLowerCase()

    if (fileType === 'application/pdf') {
      text = await extractTextFromPDF(file)
    } else if (fileType.startsWith('image/')) {
      text = await extractTextFromImage(file)
    }

    if (!text.trim()) {
      throw new Error('No text could be extracted from the file')
    }

    await processJobDescription(text)
  } catch (error) {
    console.error('Error processing file:', error)
    alert('Error reading file. Please try again.')
  } finally {
    isProcessing.value = false
    showJDModal.value = false
  }
}

// Function to process extracted text using AI
const processJobDescription = async (text) => {
  try {
    const prompt = `Extract and format job description information from the following text. Return in format:
    Company Name: [name]
    Job Requirements: [list]
    Job Description: [text]
    
    Text to process:
    ${text}`

    const result = await model.generateContent(prompt)
    const processedText = result.response.text()

    if (!processedText) {
      throw new Error('Failed to process job description')
    }

    jobDescription.value = processedText
  } catch (error) {
    console.error('Error processing job description:', error)
    // Still use the raw text if AI processing fails
    jobDescription.value = text
  }
}

const extractFromUrl = async () => {
  if (!jobUrl.value) {
    alert('Please enter a valid PDF link.')
    return
  }

  isProcessing.value = true
  try {
    // Fetch PDF directly from URL like ReaderView
    const response = await fetch(jobUrl.value)
    if (!response.ok) {
      throw new Error('Failed to fetch PDF from the link.')
    }

    // Convert response to blob and create File object
    const blob = await response.blob()
    const file = new File([blob], 'loaded.pdf', { type: 'application/pdf' })

    // Extract text from PDF using existing function
    const text = await extractTextFromPDF(file)

    if (!text.trim()) {
      throw new Error('No text could be extracted from the file')
    }

    // Process the extracted text
    await processJobDescription(text)
  } catch (error) {
    console.error('Error loading PDF:', error)
    alert('Error loading PDF from the link.')
  } finally {
    isProcessing.value = false
    showJDModal.value = false
  }
}

// Function to download the generated email as a text file
const downloadEmail = () => {
  const blob = new Blob([generatedEmail.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'generated_email.txt'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Function to open the edit modal and load the generated email
const openEditModal = () => {
  editableEmail.value = generatedEmail.value // Load generated email into editableEmail
  showModal.value = true // Show the modal
}
</script>

<style scoped>
.prose {
  font-size: 1.1rem;
  line-height: 1.75;
}

textarea {
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    'Noto Sans',
    sans-serif;
  resize: vertical;
}

/* Add animation for loading spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Keep old styles and add styles for modal */
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

/* Add transition for modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
