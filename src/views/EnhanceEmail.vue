<template>
  <div class="min-h-screen bg-gray-100 py-24">
    <div class="max-w-5xl mx-auto px-4">
      <div class="bg-white shadow-xl rounded-2xl overflow-hidden">
        <!-- Header Section -->
        <div
          class="bg-gradient-to-r from-blue-500 to-blue-600 py-6 px-8""
        >
          <h1 class="text-3xl font-bold text-white text-center">Enhance Your Email</h1>
          <p class="text-white text-center mt-2">
            Quickly improve the tone, style, and structure
            to make your message stand out.
          </p>
        </div>
        <div class="p-4">
          <textarea
            v-model="emailContent"
            class="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[200px]"
            placeholder="Paste your email content here..."
          ></textarea>
          <div class="mt-4 flex justify-center">
            <button
              @click="enhanceEmail"
              class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg transition duration-300 min-w-[200px] flex items-center justify-center space-x-2"
              :disabled="isLoading"
            >
              <span>{{ isLoading ? 'Enhancing...' : 'Enhance Email' }}</span>
              <div
                v-if="isLoading"
                class="animate-spin center rounded-full h-5 w-5 border-2 border-white border-t-transparent"
              ></div>
            </button>
          </div>

          <!-- Enhanced Email Output -->
          <div v-if="enhancedEmail" class="mt-8">
            <div class="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold text-gray-800">Enhanced Email:</h2>
                <div class="flex space-x-2">
                  <button
                    @click="copyToClipboard(enhancedEmail)"
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
                    @click="downloadEnhancedEmail"
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
                  {{ enhancedEmail }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal Popup -->
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
                  Edit Enhanced Email
                </h3>
                <div class="mt-2">
                  <textarea
                    v-model="editableEmail"
                    class="w-full h-96 p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Edit your enhanced email here..."
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { GoogleGenerativeAI } from '@google/generative-ai'

const emailContent = ref('')
const enhancedEmail = ref('')
const editableEmail = ref('')
const isLoading = ref(false)
const showModal = ref(false)
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

const enhanceEmail = async () => {
  if (!emailContent.value) {
    alert('Please enter email content to enhance.')
    return
  }

  isLoading.value = true
  enhancedEmail.value = '' // Clear previous enhanced email

  try {
    const prompt = `Write a complete email that I can copy and send to the employer using the prompts and emails I provided:\nEmail: \n\n${emailContent.value}\nEnhance prompt:`
    const result = await model.generateContent(prompt)
    enhancedEmail.value = result.response.text() // Get enhanced email from AI
  } catch (error) {
    console.error('Error enhancing email:', error)
    alert('An error occurred while enhancing the email.')
  } finally {
    isLoading.value = false
  }
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('Copied email to clipboard!')
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

const downloadEnhancedEmail = () => {
  const blob = new Blob([enhancedEmail.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'enhanced_email.txt'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const openEditModal = () => {
  editableEmail.value = enhancedEmail.value // Load enhanced email into editableEmail
  showModal.value = true // Show the modal
}

const saveEditedEmail = () => {
  enhancedEmail.value = editableEmail.value // Save changes to enhancedEmail
  showModal.value = false // Close the modal
}
</script>

<style scoped>
/* Add any specific styles for the Enhance Email view here */
</style>
