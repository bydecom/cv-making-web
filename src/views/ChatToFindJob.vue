<template>
  <div>
    <!-- Loading Indicator -->
    <div v-if="isLoading" class="text-center">
      <p>Loading...</p>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="text-red-500 text-center mb-4">
      {{ error }}
    </div>

    <!-- Chat Input Area -->
    <div class="mb-6 mt-24">
      <textarea
        v-model="chatInput"
        placeholder="Enter your request here..."
        class="w-full h-24 p-2 border rounded"
      ></textarea>
      <button
        @click="submitChat"
        class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Processing...' : 'Get Job Recommendations' }}
      </button>
    </div>

    <!-- Popup Modal for Results -->
    <div
      v-if="showPopup"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-[32rem] shadow-lg rounded-md bg-white">
        <button
          @click="showPopup = false"
          class="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 text-center mb-4">Job Recommendations</h3>

          <!-- Display appropriate message based on the validation -->
          <div v-if="popupMessage" class="text-center mb-4">
            <p>{{ popupMessage }}</p>
          </div>

          <!-- Matching Recruitment IDs -->
          <ul v-if="matchingRecruitmentIds.length" class="list-disc pl-5">
            <li v-for="(job, index) in matchingRecruitmentIds" :key="index">
              <strong>{{ job.title }}</strong> (ID: {{ job.recruitmentId }})
            </li>
          </ul>

          <div class="text-center mt-4">
            <button
              @click="showPopup = false"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
import { ref, onMounted } from 'vue'
import { GoogleGenerativeAI } from '@google/generative-ai'

const businesses = ref([]) // Danh sách businesses
const isLoading = ref(false) // Loading state
const error = ref(null) // Error message
const chatInput = ref('') // User input
const showPopup = ref(false) // Popup visibility
const matchingRecruitmentIds = ref([]) // Matching job IDs
const popupMessage = ref('') // Message to display in the popup
const recruitments = ref([]) // Declare recruitments as a reactive reference

const fetchBusinessData = async () => {
  console.log('Fetching business data...') // Log để kiểm tra
  const url = 'https://intern.pantech.vn/hcmute/api/business/GetBusinessWithRecruitmentsPaging'
  const requestData = {
    totalPage: null,
    totalRecords: null,
    currentPage: 1,
    pageSize: -1,
    orders: [],
    filters: []
  }

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData)
  }

  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`)
    }
    const data = await response.json()
    businesses.value = data.result?.data || [] // Trích xuất danh sách businesses
    extractRecruitments() // Trích xuất danh sách tuyển dụng
  } catch (err) {
    error.value = `Error fetching data: ${err.message}`
  } finally {
    isLoading.value = false
  }
}

const extractRecruitments = () => {
  recruitments.value = businesses.value
    .flatMap((business) => business.recruitments) // Lấy tất cả recruitments từ các businesses
    .filter((recruitment) => recruitment) // Loại bỏ các trường null hoặc undefined
    .map(({ recruitmentId, title, location, type, keySkills, position }) => ({
      recruitmentId,
      title: title || 'N/A',
      location: location || 'N/A',
      type: type || 'N/A',
      keySkills: keySkills || 'N/A',
      position: position || 'N/A'
    }))
}

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

// Function to submit chat input and get job recommendations
const submitChat = async () => {
  if (!chatInput.value) {
    error.value = 'Please enter your request.'
    return
  }

  isLoading.value = true
  error.value = null
  matchingRecruitmentIds.value = [] // Reset matching IDs before processing
  popupMessage.value = '' // Reset popup message before processing

  try {
    const model = genAI.getGenerativeModel({
      model: import.meta.env.VITE_APP_AI_MODEL,
      systemInstruction: `You are a recruitment matcher that validates  find the most suitabl job IDs from a given list of recruitments.

      Your tasks:
      1. Find Jobs Based on User Input
      Validate the Job Search Request:
      Check if the user has provided a specific job search query. A valid request can be:
      A field or specialization (e.g., ReactJS, Data Analyst, IT, Marketing).
      A geographical location (if applicable, e.g., "in New York City" or "remote").
      Additional description (if any, e.g., position,..).
      3. Plan the Job Search:
      Look for job opportunities ONLY relevant to the user’s input.
      Ensure the search aligns with the provided information.
      Try to find at least 5 results If you just find 4 results, only respone that, no addition other jobs that not related to the input.
      For example, when a user enters "data", it only searches for jobs related to the data, not other jobs.
      4. Provide Job Recommendations:

   If the data does not resemble a job find request, return the following JSON object with no codeblock or markdown:
   {
        "isValidRequest" : boolean,
        "matchingJobs": [
    {
      "recruitmentId": string,
      "title": string
    }
  ]
   }
   - recruitmentId is must be the recruitmentId input the provided data, not any field else.
   - isValidRequest: true if the input resembles a request to find or a description of a job, otherwise false.
   - matchingJobs: A list of the top 5 job recruitmentIds and titles ranked by suitability or if it. If no jobs match or the data is not a request, return an empty array.
`
    })
    //Đổi: sửa prompt lại
    const generationConfig = {
      temperature: 0.1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 1024,
      responseMimeType: 'application/json'
    }

    // Start the chat session with the model using the input data
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: 'user',
          parts: [
            {
              text: JSON.stringify({ chatInput: chatInput.value, recruitments: recruitments.value })
            }
          ]
        }
      ]
    })
    //text: JSON.stringify({ chatInput: chatInput.value, recruitments: recruitments.value })
    //chatInput: người dùng nhập vào
    // recruitments: data trích xuất từ data gốc
    //=====================================================================================//
    const result = await chatSession.sendMessage(chatInput.value)
    const content = result.response.text()

    // Log the raw response to check for any text or errors
    console.log('Raw Response:', content)

    // Attempt to parse the response content to JSON
    const parsedData = JSON.parse(content)

    // Check if the response contains the expected structure
    if (parsedData.isValidRequest) {
      matchingRecruitmentIds.value = parsedData.matchingJobs || []
      popupMessage.value = matchingRecruitmentIds.value.length > 0 ? '' : 'No suitable jobs found.'
    } else {
      popupMessage.value = 'This is not a valid request.'
      matchingRecruitmentIds.value = []
    }
    // Đổi: đổi tên biến từ isValidCV thành isValidRequest
    showPopup.value = true // Show the popup with results
  } catch (error) {
    console.error('Error comparing with recruitments:', error)
    error.value = `Failed to get job recommendations: ${error.message}`
  } finally {
    isLoading.value = false
  }
}
onMounted(() => {
  fetchBusinessData()
})
</script>

<style scoped>
/* Add any additional styles here */
</style>
