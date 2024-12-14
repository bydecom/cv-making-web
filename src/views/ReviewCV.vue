<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <h1 class="text-2xl font-semibold mb-6 text-center">Score Your CV Here</h1>

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

          <!-- Progress Bar -->
          <div class="mt-4">
            <div class="bg-gray-200 rounded-full h-2">
              <div
                class="bg-blue-500 h-2 rounded-full"
                :style="{ width: progressWidth + '%' }"
              ></div>
            </div>
            <p class="text-center mt-1">{{ getCurrentStepDescription() }}</p>
          </div>

          <!-- Preview Section -->
          <div v-if="extractedData" class="mt-6">
            <h2 class="text-lg font-semibold mb-4">Analysis Results:</h2>

            <!-- Content Analysis -->
            <div v-if="extractedData.Content" class="mb-6">
              <h3 class="text-blue-500 font-bold mb-2">Content Analysis</h3>
              <div class="space-y-4">
                <div
                  v-for="(item, index) in extractedData.Content"
                  :key="'content-' + index"
                  class="p-4 bg-gray-50 rounded shadow"
                >
                  <p><strong>Score:</strong> {{ item.score }}</p>
                  <p><strong>Relevance:</strong> {{ item.relevance_to_the_job }}</p>
                  <p><strong>Career Objective:</strong> {{ item.career_objective }}</p>
                  <p><strong>Experience:</strong> {{ item.experience_and_achievements }}</p>
                  <p><strong>Education:</strong> {{ item.education_and_certifications }}</p>
                </div>
              </div>
            </div>

            <!-- Skill Analysis -->
            <div v-if="extractedData.Skill" class="mb-6">
              <h3 class="text-blue-500 font-bold mb-2">Skill Analysis</h3>
              <div class="p-4 bg-gray-50 rounded shadow">
                <p><strong>Score:</strong> {{ extractedData.Skill[0].score }}</p>
                <p><strong>Hard Skills:</strong> {{ extractedData.Skill[0].hard_skill }}</p>
                <p><strong>Soft Skills:</strong> {{ extractedData.Skill[0].soft_skill }}</p>
                <p>
                  <strong>Presentation:</strong> {{ extractedData.Skill[0].presentaion_of_skill }}
                </p>
              </div>
            </div>

            <!-- Formatting and Layout -->
            <div v-if="extractedData.Formatting_and_Layout" class="mb-6">
              <h3 class="text-blue-500 font-bold mb-2">Formatting and Layout</h3>
              <div class="p-4 bg-gray-50 rounded shadow">
                <p><strong>Score:</strong> {{ extractedData.Formatting_and_Layout[0].score }}</p>
                <p>
                  <strong>Structure:</strong> {{ extractedData.Formatting_and_Layout[0].structure }}
                </p>
                <p><strong>Length:</strong> {{ extractedData.Formatting_and_Layout[0].length }}</p>
                <p>
                  <strong>Readability:</strong>
                  {{ extractedData.Formatting_and_Layout[0].readability }}
                </p>
                <p>
                  <strong>Proofreading:</strong>
                  {{ extractedData.Formatting_and_Layout[0].proofreading }}
                </p>
              </div>
            </div>

            <!-- Professionalism -->
            <div v-if="extractedData.Professionalism" class="mb-6">
              <h3 class="text-blue-500 font-bold mb-2">Professionalism</h3>
              <div class="p-4 bg-gray-50 rounded shadow">
                <p><strong>Score:</strong> {{ extractedData.Professionalism[0].score }}</p>
                <p>
                  <strong>Contact Information:</strong>
                  {{ extractedData.Professionalism[0].contact_information }}
                </p>
                <p>
                  <strong>Tone and Style:</strong>
                  {{ extractedData.Professionalism[0].tone_and_style }}
                </p>
                <p>
                  <strong>Authenticity:</strong> {{ extractedData.Professionalism[0].authenticity }}
                </p>
              </div>
            </div>

            <!-- Creativity and Differentiation -->
            <div v-if="extractedData.Creativity_and_Differentiation" class="mb-6">
              <h3 class="text-blue-500 font-bold mb-2">Creativity and Differentiation</h3>
              <div class="p-4 bg-gray-50 rounded shadow">
                <p>
                  <strong>Score:</strong>
                  {{ extractedData.Creativity_and_Differentiation[0].score }}
                </p>
                <p>
                  <strong>Visual Appeal:</strong>
                  {{ extractedData.Creativity_and_Differentiation[0].visual_appeal }}
                </p>
                <p>
                  <strong>Customization:</strong>
                  {{ extractedData.Creativity_and_Differentiation[0].customization }}
                </p>
              </div>
            </div>

            <!-- Proceed to Edit Button -->
            <!-- <button
              @click="proceedToEditor"
              class="mt-4 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit CV
            </button> -->
          </div>

          <!-- Thêm nút bên dưới kết quả -->
          <div v-if="extractedData" class="mt-4 text-center">
            <router-link
              to="/convert"
              class="bg-white text-indigo-800 px-8 py-4 rounded-md text-lg font-semibold hover:bg-indigo-100 transition duration-300"
            >
              Edit your CV now
            </router-link>
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
        <h3 class="text-lg font-medium text-gray-900 text-center mb-4">Processing CV</h3>
        <!-- Add progress steps here as per your current implementation -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { extractTextFromFile } from '../utils/textExtractor'
import { parseTextToCV } from '../utils/cvReview'

const router = useRouter()
const selectedFile = ref(null)
const selectedLanguage = ref('eng')
const isProcessing = ref(false)
const extractedData = ref(null)
const showProgressModal = ref(false)
const processingError = ref(null)
const totalScore = ref(0)

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

    // Automatically hide modal after 2 seconds
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
  if (!extractedData.value) {
    console.error('No extracted data available:', extractedData.value)
    return
  }

  try {
    const cvDataString = JSON.stringify(extractedData.value)
    console.log('CV Data String:', cvDataString) // Check data
    router.push({
      name: 'edit-cv',
      params: { data: encodeURIComponent(cvDataString) }
    })
  } catch (error) {
    console.error('Error during navigation:', error)
  }
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
  const totalSteps = steps.value.length

  if (processingStep) {
    return Math.min((completedSteps + 0.5) * (100 / totalSteps), 100)
  }
  return Math.min(completedSteps * (100 / totalSteps), 100)
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
