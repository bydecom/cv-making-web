<template>
  <div class="flex bg-gray-100 mt-20 mb-20 w-full">
    <CvEditor
      :cvData="cvData"
      :updateCvData="updateCvData"
      @export-cv="exportCV"
      @update-image="handleImageUpdate"
    />
    <CvPreview ref="cvPreview" :cvData="cvData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CvEditor from './CvEditor1.vue'
import CvPreview from './CvPreview3.vue'

const route = useRoute()
const imageData = ref('')
const cvPreview = ref(null)

// Template data mẫu
const templateData = {
  firstName: 'John',
  lastName: 'Doe',
  jobTitle: 'Software Developer',
  email: 'john.doe@example.com',
  phone: '+1 234 567 890',
  location: 'New York, USA',
  summary:
    'Experienced software developer with a passion for creating efficient and scalable applications.',
  skills: ['JavaScript', 'React', 'Node.js', 'Python'],
  experience: [
    {
      title: 'Senior Developer',
      company: 'Tech Solutions Inc.',
      period: '2018 - Present',
      description: 'Led development of multiple web applications using React and Node.js.'
    },
    {
      title: 'Junior Developer',
      company: 'StartUp Co.',
      period: '2015 - 2018',
      description: 'Assisted in the development of mobile applications using React Native.'
    }
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of Technology',
      year: '2015'
    }
  ],
  achievements: [
    {
      title: 'Best Developer Award',
      detail: 'Recognized for outstanding performance in software development.'
    }
  ],
  projects: [
    {
      title: 'Project Alpha',
      detail: 'Description of Project Alpha.'
    }
  ]
}

// Hàm format data để đảm bảo cấu trúc đúng
const formatCvData = (data) => {
  return {
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    jobTitle: data.jobTitle || '',
    email: data.email || '',
    phone: data.phone || '',
    location: data.location || '',
    summary: data.summary || '',
    skills: Array.isArray(data.skills) ? data.skills : [],
    experience: Array.isArray(data.experience)
      ? data.experience.map((exp) => ({
          title: exp.title || '',
          company: exp.company || '',
          period: exp.period || '',
          description: exp.description || ''
        }))
      : [],
    education: Array.isArray(data.education)
      ? data.education.map((edu) => ({
          degree: edu.degree || '',
          school: edu.school || '',
          year: edu.year || ''
        }))
      : [],
    achievements: Array.isArray(data.achievements)
      ? data.achievements.map((ach) => ({
          title: ach.title || '',
          detail: ach.detail || ''
        }))
      : [],
    projects: Array.isArray(data.projects)
      ? data.projects.map((proj) => ({
          title: proj.title || '',
          detail: proj.detail || ''
        }))
      : []
  }
}

// Khởi tạo cvData với giá trị mặc định
const cvData = ref(formatCvData(templateData))

// Hàm giải mã dữ liệu từ URL
const decodeCvData = (dataString) => {
  try {
    const decoded = JSON.parse(decodeURIComponent(dataString))
    console.log('Decoded CV Data:', decoded) // Kiểm tra dữ liệu đã giải mã
    return formatCvData(decoded)
  } catch (error) {
    console.error('Error decoding CV data:', error)
    return formatCvData({}) // Trả về object rỗng đã format nếu có lỗi
  }
}

// Khởi tạo dữ liệu khi component được mount
onMounted(() => {
  // Kiểm tra xem có data từ URL không
  if (route.params.data) {
    const urlData = decodeCvData(route.params.data)
    cvData.value = urlData
  } else {
    // Nếu không có data từ URL, sử dụng template
    cvData.value = formatCvData(templateData)
  }
})

const updateCvData = (newData) => {
  cvData.value = formatCvData(newData)
}

const handleImageUpdate = (newImage) => {
  imageData.value = newImage
}

const exportCV = () => {
  if (cvPreview.value && typeof cvPreview.value.exportCv === 'function') {
    cvPreview.value.exportCv()
  } else {
    console.error('CvPreview reference is not set or exportCv is not a function.')
  }
}
</script>

<style scoped>
.flex {
  display: flex;
}
.h-screen {
  height: 150vh;
}
.bg-gray-100 {
  background-color: #f7fafc;
}
</style>
