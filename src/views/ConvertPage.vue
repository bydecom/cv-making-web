<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <h1 class="text-2xl font-semibold mb-6 text-center">CV Data Extractor</h1>

          <!-- File Upload Section -->
          <div class="mb-6">
            <input
              type="file"
              @change="handleFileUpload"
              accept=".png,.jpg,.jpeg,.pdf"
              class="w-full p-2 border rounded"
            />
          </div>

          <!-- Language Selection -->
          <select v-model="selectedLanguage" class="mb-6 w-full p-2 border rounded">
            <option value="eng">English</option>
            <option value="vie">Vietnamese</option>
          </select>

          <!-- Extract Button -->
          <button
            @click="processFile"
            class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            :disabled="isProcessing"
          >
            {{ isProcessing ? 'Processing...' : 'Extract CV Data' }}
          </button>

          <!-- Preview Section -->
          <div v-if="extractedData" class="mt-6">
            <pre class="bg-gray-50 p-4 rounded">{{ JSON.stringify(extractedData, null, 2) }}</pre>
            <button
              @click="proceedToEditor"
              class="mt-4 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit CV
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Modal -->
    <div
      v-if="showProgressModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-[32rem] shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 text-center mb-4">Processing CV</h3>

          <!-- Progress Steps -->
          <div class="w-full max-w-md mx-auto mb-8">
            <div class="relative">
              <!-- Progress Line -->
              <div
                class="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-gray-200 w-full"
              ></div>
              <div
                class="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-500 transition-all duration-500"
                :style="{ width: `${progressWidth}%` }"
              ></div>

              <!-- Steps -->
              <div class="relative flex justify-between">
                <template v-for="(step, index) in steps" :key="step.id">
                  <div class="relative z-10">
                    <!-- Step Circle -->
                    <div
                      class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                      :class="[
                        step.status === 'completed'
                          ? 'bg-blue-500'
                          : step.status === 'processing'
                            ? 'bg-blue-500 border-2 border-blue-500'
                            : 'bg-gray-200'
                      ]"
                    >
                      <!-- Check Icon for Completed -->
                      <svg
                        v-if="step.status === 'completed'"
                        class="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <!-- Number for Other States -->
                      <span
                        v-else
                        :class="[step.status === 'processing' ? 'text-white' : 'text-gray-500']"
                        class="text-sm font-semibold"
                      >
                        {{ step.id }}
                      </span>
                    </div>

                    <!-- Step Label -->
                    <div
                      class="absolute -bottom-6 w-max text-xs font-medium text-center"
                      :class="[
                        step.status === 'completed' || step.status === 'processing'
                          ? 'text-blue-500'
                          : 'text-gray-500'
                      ]"
                      :style="{
                        left: '50%',
                        transform: 'translateX(-50%)'
                      }"
                    >
                      {{ step.name }}
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <!-- Current Step Description -->
          <div class="text-center mt-8">
            <p class="text-sm text-gray-600">{{ getCurrentStepDescription() }}</p>
          </div>

          <!-- Error Message -->
          <div v-if="processingError" class="mt-4 text-red-500 text-sm text-center">
            {{ processingError }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { extractTextFromFile } from '../utils/textExtractor'
import { parseTextToCV } from '../utils/cvParser'

const router = useRouter()
const selectedFile = ref(null)
const selectedLanguage = ref('eng')
const isProcessing = ref(false)
const extractedData = ref(null)
const showProgressModal = ref(false)
const processingError = ref(null)

const steps = ref([
  { id: 1, name: 'Upload', status: 'pending' },
  { id: 2, name: 'Extract', status: 'pending' },
  { id: 3, name: 'Parse', status: 'pending' },
  { id: 4, name: 'Done', status: 'pending' }
])

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0]
}

const processFile = async () => {
  if (!selectedFile.value) {
    alert('Please select a file first')
    return
  }

  resetSteps()
  showProgressModal.value = true
  isProcessing.value = true

  try {
    // Step 1: Upload
    updateStepStatus(1, 'processing')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    updateStepStatus(1, 'completed')

    // Step 2: Extract
    updateStepStatus(2, 'processing')
    const extractedText = await extractTextFromFile(selectedFile.value, selectedLanguage.value)
    if (!extractedText) {
      throw new Error('No text was extracted from the file')
    }
    updateStepStatus(2, 'completed')

    // Step 3: Parse
    updateStepStatus(3, 'processing')
    const cvData = await parseTextToCV(extractedText)
    if (!cvData) {
      throw new Error('Failed to parse CV data')
    }
    updateStepStatus(3, 'completed')

    // Step 4: Done
    updateStepStatus(4, 'processing')
    extractedData.value = cvData
    updateStepStatus(4, 'completed')

    // Tự động ẩn modal sau 2 giây
    setTimeout(() => {
      showProgressModal.value = false
    }, 2000)
  } catch (error) {
    console.error('Error processing file:', error)
    processingError.value = error.message
    const currentStep = steps.value.find((step) => step.status === 'processing')
    if (currentStep) {
      currentStep.status = 'failed'
    }
  } finally {
    isProcessing.value = false
  }
}

const proceedToEditor = () => {
  const cvDataString = JSON.stringify(extractedData.value)
  router.push({
    name: 'edit-cv',
    params: { data: encodeURIComponent(cvDataString) }
  })
}

const updateStepStatus = (stepId, status) => {
  const step = steps.value.find((s) => s.id === stepId)
  if (step) {
    step.status = status
    // Automatically complete previous steps
    if (status === 'completed' || status === 'processing') {
      steps.value.forEach((s) => {
        if (s.id < stepId) {
          s.status = 'completed'
        }
      })
    }
  }
}

const resetSteps = () => {
  steps.value.forEach((step) => {
    step.status = 'pending'
  })
  processingError.value = null
}

// Compute progress width for progress bar
const progressWidth = computed(() => {
  const completedSteps = steps.value.filter((step) => step.status === 'completed').length
  const processingStep = steps.value.find((step) => step.status === 'processing')
  const totalSteps = steps.value.length // Không trừ đi 1

  if (processingStep) {
    return Math.min((completedSteps + 0.5) * (100 / totalSteps), 100) // Đảm bảo không vượt quá 100%
  }
  return Math.min(completedSteps * (100 / totalSteps), 100) // Đảm bảo không vượt quá 100%
})

const getCurrentStepDescription = () => {
  const currentStep = steps.value.find((step) => step.status === 'processing')
  if (!currentStep) return ''

  switch (currentStep.id) {
    case 1:
      return 'Uploading file...'
    case 2:
      return 'Extracting text...'
    case 3:
      return 'Parsing text...'
    case 4:
      return 'Done'
    default:
      return ''
  }
}
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}

.bg-gray-100 {
  background-color: #f3f4f6;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}

input[type='file'] {
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Add transition for status changes */
.step-status {
  transition: all 0.3s ease-in-out;
}

/* Status colors */
.status-pending {
  @apply text-gray-400;
}

.status-processing {
  @apply text-blue-500;
}

.status-completed {
  @apply text-green-500;
}

.status-failed {
  @apply text-red-500;
}

/* Add these styles for smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.duration-300 {
  transition-duration: 300ms;
}

.duration-500 {
  transition-duration: 500ms;
}
</style>
