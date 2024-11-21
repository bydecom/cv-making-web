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

    <!-- Input for PDF URL -->
    <div class="mb-6 mt-24">
      <input
        type="text"
        v-model="pdfUrl"
        placeholder="Enter PDF/Image URL"
        class="w-full p-2 border rounded"
      />
    </div>

    <!-- File Input for PDF and Image -->
    <div class="mb-6">
      <input
        type="file"
        @change="handleFileUpload"
        accept="application/pdf, image/*"
        class="w-full p-2 border rounded"
      />
    </div>

    <!-- Extract Button -->
    <button
      @click="processUrl"
      class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      :disabled="isLoading"
    >
      {{ isLoading ? 'Processing...' : 'Extract from PDF/Image' }}
    </button>

    <!-- No Recruitments Message -->
    <div v-if="!isLoading && !recruitments.length" class="text-center">
      <p>No recruitments found.</p>
    </div>

    <!-- PDF Content Display as Textarea -->
    <div v-if="pdfContent" class="mt-6">
      <h3 class="text-lg font-medium mb-2">Extracted Content:</h3>
      <textarea
        class="w-full h-48 p-2 border rounded bg-gray-50"
        readonly
        v-model="pdfContent"
      ></textarea>
    </div>

    <!-- Popup Modal -->
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
          <!-- This is the "X" character -->
        </button>
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 text-center mb-4">Result</h3>

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
          <!-- Đổi: show thêm dữ liệu title để check trên UI -->
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

    <!-- Matching Recruitment IDs -->
    <div v-if="matchingRecruitmentIds.length" class="mt-6">
      <h3 class="text-lg font-medium mb-2">Matching Recruitment IDs:</h3>
      <ul class="list-disc pl-5">
        <li v-for="(id, index) in matchingRecruitmentIds" :key="index">
          {{ id }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getDocument } from 'pdfjs-dist/build/pdf' // Import pdf.js
import Tesseract from 'tesseract.js' // Import Tesseract.js for OCR
import { GoogleGenerativeAI } from '@google/generative-ai'

const businesses = ref([]) // Danh sách businesses
const recruitments = ref([]) // Danh sách tuyển dụng đã lọc
const isLoading = ref(true) // Trạng thái loading
const error = ref(null) // Thông báo lỗi
const pdfUrl = ref('') // URL của file PDF
const showPopup = ref(false) // Trạng thái hiển thị popup
const pdfContent = ref('') // Nội dung PDF đã đọc
const matchingRecruitmentIds = ref([]) // Danh sách ID tuyển dụng phù hợp
const popupMessage = ref('') // Thông báo hiển thị trong popup

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

// Fetch data
const fetchBusinessData = async () => {
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

// Hàm trích xuất data cần thiết từ danh sách tuyển dụng
const extractRecruitments = () => {
  recruitments.value = businesses.value
    .flatMap((business) => business.recruitments) // Lấy tất cả recruitments từ các businesses
    .filter((recruitment) => recruitment) // Loại bỏ các trường null hoặc undefined
    .map(({ recruitmentId, title, description, type, keySkills, position }) => ({
      recruitmentId,
      title: title || 'N/A',
      description: description || 'N/A',
      type: type || 'N/A',
      keySkills: keySkills || 'N/A',
      position: position || 'N/A'
    }))
}

// Hàm xử lý file được tải lên
const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (file) {
    isLoading.value = true
    error.value = null
    pdfContent.value = '' // Reset pdfContent before processing
    matchingRecruitmentIds.value = [] // Reset matching IDs before processing
    popupMessage.value = '' // Reset popup message before processing

    try {
      if (file.type === 'application/pdf') {
        // Nếu là file PDF, gọi hàm xử lý PDF
        await processPdfFromFile(file)
      } else if (file.type.startsWith('image/')) {
        // Nếu là file ảnh, gọi hàm xử lý ảnh
        await processImageFile(file)
      } else {
        error.value = 'Please upload a valid PDF or image file.'
      }
    } catch (err) {
      error.value = `Error processing file: ${err.message}`
    } finally {
      isLoading.value = false
    }
  }
}

// Hàm xử lý file PDF
const processPdfFromFile = async (file) => {
  const fileReader = new FileReader()
  fileReader.onload = async (e) => {
    const typedarray = new Uint8Array(e.target.result)
    try {
      const pdf = await getDocument(typedarray).promise // Tải PDF từ file
      const numPages = pdf.numPages
      let textContent = ''

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i)
        const text = await page.getTextContent()
        const textItems = text.items.map((item) => item.str)
        textContent += textItems.join(' ') + ' '
      }

      // Nếu textContent rỗng, chuyển sang OCR
      if (textContent.trim() === '') {
        console.warn('PDF không chứa văn bản thực, chuyển sang OCR...')
        textContent = await extractTextUsingOCR(pdf, numPages) // Gọi OCR
      }

      console.log('Extracted Text from PDF:', textContent)
      pdfContent.value = textContent // Lưu nội dung PDF vào biến pdfContent

      // Gọi hàm để so sánh với dữ liệu tuyển dụng
      await compareWithRecruitments(textContent)

      showPopup.value = true // Hiển thị popup với danh sách tuyển dụng
    } catch (err) {
      error.value = `Error reading PDF: ${err.message}`
    }
  }
  fileReader.readAsArrayBuffer(file) // Đọc file dưới dạng ArrayBuffer
}

// Hàm OCR (nhận diện văn bản từ ảnh PDF)
const extractTextUsingOCR = async (pdf, numPages) => {
  let ocrText = ''

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i)

    // Render trang PDF thành canvas
    const viewport = page.getViewport({ scale: 1 })
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.height = viewport.height
    canvas.width = viewport.width
    await page.render({ canvasContext: context, viewport }).promise

    // Nhận diện văn bản từ canvas bằng Tesseract
    const dataUrl = canvas.toDataURL('image/png')
    const result = await Tesseract.recognize(
      dataUrl,
      'eng', // Ngôn ngữ nhận diện
      {
        logger: (m) => console.log(m) // Ghi log quá trình nhận diện
      }
    )

    ocrText += result.data.text + ' '
  }

  return ocrText
}

// Hàm xử lý file ảnh
const processImageFile = async (file) => {
  isLoading.value = true
  error.value = null
  pdfContent.value = '' // Reset pdfContent before processing
  matchingRecruitmentIds.value = [] // Reset matching IDs before processing
  popupMessage.value = '' // Reset popup message before processing

  try {
    const result = await Tesseract.recognize(
      file,
      'eng', // Ngôn ngữ nhận diện
      {
        logger: (m) => console.log(m) // Ghi log quá trình nhận diện
      }
    )
    const textContent = result.data.text
    console.log('Extracted Text from Image:', textContent)
    pdfContent.value = textContent // Lưu nội dung ảnh vào biến pdfContent

    // Gọi hàm để so sánh với dữ liệu tuyển dụng
    await compareWithRecruitments(textContent)

    showPopup.value = true // Hiển thị popup với danh sách tuyển dụng
  } catch (err) {
    error.value = `Error reading image: ${err.message}`
  } finally {
    isLoading.value = false
  }
}

// Hàm xử lý URL
const processUrl = async () => {
  if (!pdfUrl.value) {
    error.value = 'Please enter a valid PDF/Image URL.'
    return
  }

  isLoading.value = true
  error.value = null
  pdfContent.value = '' // Reset pdfContent before processing
  matchingRecruitmentIds.value = [] // Reset matching IDs before processing
  popupMessage.value = '' // Reset popup message before processing

  try {
    const response = await fetch(pdfUrl.value)
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status}`)
    }

    const contentType = response.headers.get('Content-Type')
    const blob = await response.blob()

    if (contentType === 'application/pdf') {
      await processPdfFromBlob(blob)
    } else if (contentType.startsWith('image/')) {
      await processImageFile(blob)
    } else {
      error.value = 'The URL does not point to a valid PDF or image file.'
    }
  } catch (err) {
    error.value = `Error processing URL: ${err.message}`
  } finally {
    isLoading.value = false
  }
}

// Hàm xử lý PDF từ blob
const processPdfFromBlob = async (blob) => {
  const fileReader = new FileReader()
  fileReader.onload = async (e) => {
    const typedarray = new Uint8Array(e.target.result)
    try {
      const pdf = await getDocument(typedarray).promise // Tải PDF từ blob
      const numPages = pdf.numPages
      let textContent = ''

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i)
        const text = await page.getTextContent()
        const textItems = text.items.map((item) => item.str)
        textContent += textItems.join(' ') + ' '
      }

      console.log('Extracted Text from PDF:', textContent)
      pdfContent.value = textContent // Lưu nội dung PDF vào biến pdfContent

      // Gọi hàm để so sánh với dữ liệu tuyển dụng
      await compareWithRecruitments(textContent)

      showPopup.value = true // Hiển thị popup với danh sách tuyển dụng
    } catch (err) {
      error.value = `Error reading PDF: ${err.message}`
    }
  }
  fileReader.readAsArrayBuffer(blob)
}

// Hàm lấy top 5 công việc phù hợp nhất
const compareWithRecruitments = async (cvData) => {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: `You are a recruitment matcher that validates and analyzes CV data to find the top 5 of most suitable job IDs from a given list of recruitments.
  
  Your tasks:
  1. **Validate the CV data**: First, check if the provided 'cvData' appears to be a valid CV. A valid CV typically includes information such as:
     - Personal details (e.g., name, contact information).
     - Work experience (e.g., job titles, companies, years of experience).
     - Skills (e.g., technical, professional skills).
     - Education (e.g., degrees, certifications).
  
     If the data does not resemble a CV, return the following JSON object:
     {
  "isValidCV": boolean,
  "matchingJobs": [
    {
      "recruitmentId": string,
      "title": string
    }
  ]
}

- isValidCV: true if the input resembles a CV, otherwise false.
- matchingJobs: A list of up to best 5 objects, each containing:
  - recruitmentId: the ID of the matching job.
  - title: the title of the matching job.
- If no jobs match or the data is not a CV, return an empty array.

  `
  })
  // Đổi: Sửa cái propmt lại (ông copy nguyên cái prompt cho nó chuẩn á)
  //==============================================================

  const generationConfig = {
    temperature: 0.1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 1024,
    responseMimeType: 'application/json'
  }

  try {
    // Start the chat session with the model using the CV data
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: 'user',
          parts: [{ text: JSON.stringify({ cvData, recruitments: recruitments.value }) }]
        }
      ]
    })

    const result = await chatSession.sendMessage(cvData)
    const content = result.response.text()

    // Log the raw response to check for any text or errors
    console.log('Raw Response:', content)

    // Attempt to parse the response content to JSON
    const parsedData = JSON.parse(content)

    // Check if the response contains the expected structure
    if (parsedData.isValidCV) {
      matchingRecruitmentIds.value = parsedData.matchingJobs || []
      //===================================================== Đổi: parsedData.matchingIDs thành parsedData.matchingJobs
      popupMessage.value = matchingRecruitmentIds.value.length > 0 ? '' : 'No suitable jobs found.'
    } else {
      popupMessage.value = 'This is not a valid CV.'
      matchingRecruitmentIds.value = []
    }
  } catch (error) {
    console.error('Error comparing with recruitments:', error)
    error.value = `Failed to compare with recruitments: ${error.message}`
  }
}

// Fetch dữ liệu khi component mounted
onMounted(() => {
  fetchBusinessData()
})
</script>

<style scoped>
/* Add any additional styles here */
</style>
