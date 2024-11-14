<template>
  <div class="min-h-screen bg-gray-100 py-24">
    <div class="max-w-5xl mx-auto px-4 py-4">
      <div class="bg-white shadow-xl rounded-2xl overflow-hidden">
        <!-- Header Section -->
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 py-6 px-8">
          <h1 class="text-3xl font-bold text-white text-center">Email Cover Letter Generator</h1>
          <p class="text-blue-100 text-center mt-2">
            Create a professional job application email in seconds
          </p>
        </div>

        <div class="p-8">
          <!-- Input Section -->
          <div class="grid gap-8 md:grid-cols-2">
            <!-- Job Description Input -->
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <label class="block text-gray-700 text-lg font-semibold mb-3">
                  Job Information
                  <span class="text-red-500">*</span>
                </label>
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
              <textarea
                v-model="jobDescription"
                class="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[200px]"
                placeholder="E.g.: Company ABC is hiring for the position of Frontend Developer with 2 years of experience...
- Job requirements
- Job description
- Necessary skills"
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
          <div class="mt-8 flex justify-center">
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
                <button
                  @click="copyToClipboard"
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
</template>

<script setup>
import { ref } from 'vue'

const jobDescription = ref('')
const sampleEmail = ref('')
const generatedEmail = ref('')
const isLoading = ref(false)
const showModal = ref(false)
const editableEmail = ref('')

// Function to fill job description with sample text
const fillJobDescription = () => {
  jobDescription.value = `Company ABC is hiring for the position of Frontend Developer with 2 years of experience...
- Job requirements: Proficiency in JavaScript, HTML, CSS
- Job description: Develop user-friendly web applications
- Necessary skills: Teamwork, Communication, Problem-solving`
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

const generateEmail = async () => {
  if (!jobDescription.value) {
    alert('Please enter job description')
    return
  }

  isLoading.value = true
  generatedEmail.value = ''

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
          {
            role: 'system',
            content: import.meta.env.VITE_APP_EMAIL_PROMPT
          },
          {
            role: 'user',
            content: `Job information: ${jobDescription.value}\n${sampleEmail.value ? `Sample email reference: ${sampleEmail.value}` : ''}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1024,
        stream: false
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    generatedEmail.value = data.choices[0].message.content
    editableEmail.value = data.choices[0].message.content
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
